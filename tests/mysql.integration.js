import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { createPool,initialize,MysqlStore,ConflictError } from '../backend/database.js';
import { emptyState } from '../backend/state.js';
test('real MySQL round trip, transaction conflict, and account isolation',async()=>{
  assert.match(process.env.DB_NAME||'',/_test$/,'Use a dedicated DB_NAME ending in _test. Never point this check at the production database.');
  const pool=createPool(),username=`check_${randomBytes(8).toString('hex')}`;let user;
  try{
    await initialize(pool,{...process.env,APP_USERNAME:username,APP_PASSWORD:randomBytes(24).toString('hex')});const store=new MysqlStore(pool);user=await store.findUser(username);
    const original=await store.load(user.id);assert.equal(original.revision,0);
    const state=emptyState();state.name='测试 🌱';state.goal=20;state.done['3-vocab']=true;state.words['3-0']={level:1,due:1900000000000,seen:true};state.answers['3-0']='I test HR systems.';state.notes['3']='审批人';state.activity['2026-11-05']=['3-vocab'];state.plans['2026-11-05']={mode:'pause',minutes:{'3-vocab':8}};state.resume={lesson:30,section:'review',wordIndex:9,promptIndex:4,listenStage:2,revealed:true};
    assert.equal(await store.save(user.id,state,0),1);assert.deepEqual(await store.load(user.id),{state,revision:1});
    await assert.rejects(store.save(user.id,emptyState(),0),ConflictError);assert.deepEqual(await store.load(user.id),{state,revision:1});
    await store.save(user.id,emptyState(),1);assert.deepEqual(await store.load(user.id),{state:emptyState(),revision:2});
  }finally{if(user)await pool.execute('DELETE FROM users WHERE id=?',[user.id]);await pool.end();}
});
