import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from 'node:http';
import { createApp } from '../backend/http.js';
import { emptyState,validState } from '../backend/state.js';
import { hashPassword,verifyPassword } from '../backend/auth.js';
import { ConflictError } from '../backend/database.js';

test('local preview opens without a password and only accepts localhost hosts',async t=>{
  const store={load:async()=>({state:emptyState(),revision:0})};
  const server=createApp(store,{localPreviewUser:{id:1,username:'preview'}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  t.after(()=>new Promise(r=>{server.closeAllConnections();server.close(r);}));
  const base=`http://127.0.0.1:${server.address().port}`;
  assert.deepEqual(await (await fetch(base+'/api/auth/me')).json(),{username:'preview',passwordless:true});
  assert.equal((await fetch(base+'/api/state')).status,200);
  const nonLocalStatus=await new Promise((resolve,reject)=>get(base+'/api/state',{headers:{Host:'other.example'}},r=>{r.resume();resolve(r.statusCode);}).on('error',reject));
  assert.equal(nonLocalStatus,401);
});

test('learning schema rejects malformed imports without throwing',()=>{
  assert.equal(validState(emptyState()),true);
  for(const patch of [{goal:1},{name:''},{done:{'1-vocab':'yes'}},{words:{'1-0':{level:6,due:1,seen:true}}},{answers:{'1-8':'bad'}},{activity:{'2026-99-99':['1-vocab']}},{activity:{'2026-02-30':['1-vocab']}},{activity:{'2026-11-05':['1-vocab','1-vocab']}}])assert.equal(validState({...emptyState(),...patch}),false);
  assert.equal(validState({...emptyState(),notes:JSON.parse('{"__proto__":"bad"}')}),false);
});
test('passwords are salted and checked without storing plaintext',async()=>{
  const h=await hashPassword('test-only-password');assert.equal(await verifyPassword('test-only-password',h),true);assert.equal(await verifyPassword('wrong',h),false);assert.notEqual(h,await hashPassword('test-only-password'));
});
test('API requires login, isolates accounts, persists state, and rejects stale writes',async t=>{
  const users=[{id:1,username:'sunny',password_hash:await hashPassword('test-only-password')},{id:2,username:'other',password_hash:await hashPassword('test-only-password')}];
  const sessions=new Map(),states=new Map(users.map(u=>[u.id,{state:emptyState(),revision:0}]));
  const store={health:async()=>{},findUser:async name=>users.find(u=>u.username===name),createSession:async(hash,id)=>sessions.set(hash,users.find(u=>u.id===id)),session:async hash=>sessions.get(hash),deleteSession:async hash=>sessions.delete(hash),load:async id=>structuredClone(states.get(id)),save:async(id,state,revision)=>{if(states.get(id).revision!==revision)throw new ConflictError();states.set(id,{state:structuredClone(state),revision:revision+1});return revision+1;}};
  const server=createApp(store,{logError:()=>{}});await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>new Promise(r=>{server.closeAllConnections();server.close(r);}));const base=`http://127.0.0.1:${server.address().port}`;
  const request=(path,{cookie,body,method='GET',origin}={})=>fetch(base+path,{method,headers:{'Content-Type':'application/json',...(cookie?{cookie}:{}),...(origin?{origin}:{})},...(body!==undefined?{body:JSON.stringify(body)}:{})});
  assert.equal((await request('/api/state')).status,401);
  assert.equal((await request('/api/auth/login',{method:'POST',body:{username:'sunny',password:'wrong'}})).status,401);
  assert.equal((await request('/api/auth/login',{method:'POST',origin:'https://other.example',body:{username:'sunny',password:'test-only-password'}})).status,403);
  const login=await request('/api/auth/login',{method:'POST',body:{username:'sunny',password:'test-only-password'}});assert.equal(login.status,200);const cookie=login.headers.get('set-cookie').split(';')[0];assert.match(login.headers.get('set-cookie'),/HttpOnly/);assert.equal(sessions.size,1);assert.ok(!sessions.has(cookie.split('=')[1]));
  const state=emptyState();state.name='测试 Sunny';state.done['3-vocab']=true;state.words['3-0']={level:2,due:1900000000000,seen:true};state.answers['3-0']='I test leave requests.';state.notes['3']='审批状态';state.activity['2026-11-05']=['3-vocab'];state.plans['2026-11-05']={mode:'light',minutes:{'3-vocab':8}};state.resume={lesson:30,section:'speaking',wordIndex:9,promptIndex:2,listenStage:1,revealed:true};
  assert.equal((await request('/api/state',{method:'PUT',cookie,body:{revision:0,state}})).status,200);
  assert.deepEqual(await (await request('/api/state',{cookie})).json(),{state,revision:1});
  assert.equal((await request('/api/state',{method:'PUT',cookie,body:{revision:0,state:emptyState()}})).status,409);
  assert.equal((await request('/api/state',{method:'PUT',cookie,body:{revision:1,state:{...state,goal:0}}})).status,400);
  const other=await request('/api/auth/login',{method:'POST',body:{username:'other',password:'test-only-password'}});const otherCookie=other.headers.get('set-cookie').split(';')[0];assert.equal((await (await request('/api/state',{cookie:otherCookie})).json()).revision,0);
  assert.equal((await request('/.env')).status,404);assert.equal((await request('/backend/schema.sql')).status,404);assert.equal((await request('/')).status,200);
  assert.equal((await request('/api/auth/logout',{method:'POST',cookie,body:{}})).status,200);assert.equal((await request('/api/state',{cookie})).status,401);
});
