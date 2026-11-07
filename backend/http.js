import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { hashPassword, verifyPassword, newToken, tokenHash } from './auth.js';
import { validState } from './state.js';
import { ConflictError } from './database.js';
import { wordbank } from './wordbank.js';
const dummyHash=await hashPassword(newToken());
const assets=new Map([['/',['index.html','text/html; charset=utf-8']],['/index.html',['index.html','text/html; charset=utf-8']],['/style.css',['style.css','text/css; charset=utf-8']],['/app.js',['app.js','text/javascript; charset=utf-8']],['/data.js',['data.js','text/javascript; charset=utf-8']],['/vocabulary.js',['vocabulary.js','text/javascript; charset=utf-8']]]);
for(const file of ['month-vocabulary.js','month-lessons.js','pacing.js','wordbank-ui.js','word-topics.js','curriculum.js','curriculum-ui.js']) assets.set('/'+file,[file,'text/javascript; charset=utf-8']);
assets.set('/wordbank.css',['wordbank.css','text/css; charset=utf-8']);
assets.set('/curriculum.css',['curriculum.css','text/css; charset=utf-8']);
class HttpError extends Error {constructor(status,message){super(message);this.status=status;}}
async function jsonBody(req){
  if(!(req.headers['content-type']||'').startsWith('application/json'))throw new HttpError(415,'请使用 JSON 请求。');
  if(Number(req.headers['content-length'])>2*1024*1024)throw new HttpError(413,'数据文件过大。');
  let size=0;const chunks=[];for await(const b of req){size+=b.length;if(size>2*1024*1024)throw new HttpError(413,'数据文件过大。');chunks.push(b);}
  try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new HttpError(400,'JSON 格式不正确。');}
}
export function createApp(store,{secureCookie=false,logError=console.error,localPreviewUser=null,passwordlessUser=null}={}){
  const attempts=new Map();
  const cookie=(token,expire=false)=>`sunny_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${expire?0:604800}${secureCookie?'; Secure':''}`;
  const server=createServer(async(req,res)=>{
    res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');res.setHeader('X-Frame-Options','DENY');
    res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; media-src 'self' blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    const send=(status,body)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(body));};
    try{
      const path=new URL(req.url,'http://localhost').pathname;
      if(path.startsWith('/api/')&&!['GET','HEAD'].includes(req.method)){
        const origin=req.headers.origin;
        if(origin&&new URL(origin).host!==req.headers.host)throw new HttpError(403,'请从本站页面提交。');
        if(req.headers['sec-fetch-site']==='cross-site')throw new HttpError(403,'请从本站页面提交。');
      }
      if(path==='/api/health'&&req.method==='GET'){await store.health();send(200,{ok:true});return;}
      if(path==='/api/auth/login'&&req.method==='POST'){
        if(passwordlessUser){send(200,{username:passwordlessUser.username,passwordless:true});return;}
        const now=Date.now(),ip=req.socket.remoteAddress;
        for(const [k,v] of attempts)if(v.until<now)attempts.delete(k);
        if(attempts.size>10000)throw new HttpError(429,'登录请求过多，请稍后再试。');
        const a=attempts.get(ip)||{count:0,until:now+900000};if(a.count>=10)throw new HttpError(429,'尝试次数过多，请 15 分钟后重试。');a.count++;attempts.set(ip,a);
        const b=await jsonBody(req);if(!b||typeof b.username!=='string'||b.username.length>64||typeof b.password!=='string'||b.password.length>1024)throw new HttpError(400,'请填写账号和密码。');
        const user=await store.findUser(b.username),ok=await verifyPassword(b.password,user?.password_hash||dummyHash);
        if(!user||!ok)throw new HttpError(401,'账号或密码不正确。');
        const token=newToken();await store.createSession(tokenHash(token),user.id,new Date(now+604800000));res.setHeader('Set-Cookie',cookie(token));attempts.delete(ip);send(200,{username:user.username});return;
      }
      if(path.startsWith('/api/')){
        const token=(req.headers.cookie||'').match(/(?:^|;\s*)sunny_session=([a-f0-9]{64})(?:;|$)/)?.[1];
        const localHost=/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(req.headers.host||'');
        const localAddress=['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress);
        const preview=localPreviewUser&&localHost&&localAddress;
        const user=passwordlessUser||(preview?localPreviewUser:token?await store.session(tokenHash(token)):null);
        if(!user)throw new HttpError(401,'请先登录。');
        if(path==='/api/lexicon/lookup'&&req.method==='GET'){const entry=wordbank.lookup(new URL(req.url,'http://localhost').searchParams.get('word'));if(!entry)throw new HttpError(404,'词库暂未收录这个词，可以使用有道查词。');send(200,entry);return;}
        if(path==='/api/lexicon'&&req.method==='GET'){const params=new URL(req.url,'http://localhost').searchParams;send(200,wordbank.search(params.get('q'),params.get('offset'),params.get('limit')));return;}
        if((path==='/api/auth/me'||path==='/api/profile')&&req.method==='GET'){send(200,{username:user.username,passwordless:!!(passwordlessUser||preview)});return;}
        if(path==='/api/auth/logout'&&req.method==='POST'){if(token&&!passwordlessUser)await store.deleteSession(tokenHash(token));res.setHeader('Set-Cookie',cookie('',true));send(200,{ok:true});return;}
        if(path==='/api/state'&&req.method==='GET'){send(200,await store.load(user.id));return;}
        if(path==='/api/state'&&req.method==='PUT'){
          const b=await jsonBody(req);if(!b||!Number.isInteger(b.revision)||b.revision<0||!validState(b.state))throw new HttpError(400,'学习数据格式不正确。');
          const revision=await store.save(user.id,b.state,b.revision);send(200,{revision});return;
        }
        throw new HttpError(404,'接口不存在。');
      }
      const asset=assets.get(path);if(!asset||!['GET','HEAD'].includes(req.method))throw new HttpError(404,'页面不存在。');
      const data=await readFile(new URL(`../frontend/${asset[0]}`,import.meta.url));res.writeHead(200,{'Content-Type':asset[1],'Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:data);
    }catch(e){if(e instanceof ConflictError){send(409,{error:'其他页面已经更新过数据。请先导出当前记录，再刷新或重新导入。'});return;}if(!e.status)logError('Request failed:',e.code||e.name);if(!res.headersSent)send(e.status||503,{error:e.status?e.message:'服务暂时不可用，请稍后重试。'});else res.end();}
  });
  server.requestTimeout=30000;server.headersTimeout=15000;return server;
}
