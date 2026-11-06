// Local passwordless preview only. Production continues to use MySQL.
import { readFile,writeFile,rename,mkdir } from 'node:fs/promises';
import { createApp } from '../backend/http.js';
import { hashPassword } from '../backend/auth.js';
import { emptyState,validState } from '../backend/state.js';
import { ConflictError } from '../backend/database.js';
const user={id:1,username:'preview',password_hash:await hashPassword('preview-only-12345')},sessions=new Map();let stored={state:emptyState(),revision:0};
const statePath=new URL('../outputs/local-preview-state.json',import.meta.url),temporaryPath=new URL('../outputs/local-preview-state.json.tmp',import.meta.url);
await mkdir(new URL('../outputs/',import.meta.url),{recursive:true});
try{const saved=JSON.parse(await readFile(statePath,'utf8'));if(!validState(saved.state)||!Number.isInteger(saved.revision)||saved.revision<0)throw Error('Invalid local preview data');stored={state:{plans:{},resume:null,...saved.state},revision:saved.revision};}catch(e){if(e.code!=='ENOENT')throw e;}
let saveQueue=Promise.resolve();
const store={health:async()=>{},findUser:async n=>n===user.username?user:null,createSession:async h=>sessions.set(h,user),session:async h=>sessions.get(h),deleteSession:async h=>sessions.delete(h),load:async()=>structuredClone(stored),save(id,state,revision){const operation=saveQueue.catch(()=>{}).then(async()=>{if(revision!==stored.revision)throw new ConflictError();const next={state:structuredClone(state),revision:revision+1};await writeFile(temporaryPath,JSON.stringify(next),'utf8');await rename(temporaryPath,statePath);stored=next;return stored.revision;});saveQueue=operation;return operation;}};
createApp(store,{passwordlessUser:user}).listen(4179,'127.0.0.1',()=>console.log('Passwordless local preview: http://127.0.0.1:4179 (local file storage)'));
