import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {emptyState,validState} from '../backend/state.js';
import {MysqlStore,ConflictError} from '../backend/database.js';
import {createApp} from '../backend/http.js';
const context=vm.createContext({});
for (const asset of ['curriculum-units.js', 'curriculum-foundation.js', 'curriculum-further.js', 'curriculum.js']) {
  vm.runInContext(readFileSync(new URL(`../frontend/${asset}`, import.meta.url), 'utf8'), context);
}
const path=vm.runInContext('LearningPath',context),day=86400000;
const json=x=>JSON.parse(JSON.stringify(x));

test('skipping words preserves existing answers and advances to grammar until restored', () => {
  const state = emptyState();
  const unit = path.units[0];
  const word = path.questions(unit).find(question => question.skill === 'words');
  const start = 1900000000000;
  state.learning.resume = { unit: unit.id, step: 'words', question: word.id };
  path.answer(state, unit, word, word.answer, start);
  path.ensure(state, unit).seen = [0];
  const saved = json(path.progress(state, unit).answers);
  assert.equal(path.setStepSkipped(state, unit, 'words', true), true);
  assert.equal(path.setStepSkipped(state, unit, 'words', true), false);
  assert.equal(path.coverage(state, unit)[0].skipped, true);
  assert.equal(path.coverage(state, unit)[0].complete, false);
  assert.equal(path.recommend(state, start + day).step, 'grammar');
  assert.equal(path.due(state, start + day).length, 0);
  const restored = json(state);
  assert.ok(validState(restored));
  assert.deepEqual(restored.learning.units[unit.id].answers, saved);
  assert.deepEqual(restored.learning.units[unit.id].seen, [0]);
  // Old saves used a standalone word-skip flag.
  delete restored.learning.units[unit.id].skippedSteps;
  restored.learning.units[unit.id].wordsSkipped = true;
  assert.ok(validState(restored));
  assert.equal(path.setStepSkipped(restored, unit, 'words', false), true);
  assert.equal(path.due(restored, start + day)[0].question.id, word.id);
  restored.learning.units[unit.id].wordsSkipped = 'yes';
  assert.equal(validState(restored), false);
});

test('skipped sections and transfer questions leave the original answers intact', () => {
  const state = emptyState();
  const unit = path.units[0];
  const listening = path.questions(unit).filter(question => question.skill === 'listening');
  const transfer = listening.find(question => question.variants);
  const start = 1900000000000;
  for (const question of listening) path.answer(state, unit, question, question.answer, start);
  const saved = json(path.progress(state, unit).answers);
  assert.ok(path.setStepSkipped(state, unit, 'grammar', true));
  assert.ok(path.setStepSkipped(state, unit, 'reading', true));
  assert.ok(path.setQuestionSkipped(state, unit, transfer.id, true));
  assert.equal(path.due(state, start + day).some(item => item.question.id === transfer.id), false);
  assert.ok(path.setStepSkipped(state, unit, 'listening', true));
  assert.equal(path.due(state, start + day).length, 0);
  assert.ok(path.setStepSkipped(state, unit, 'listening', false));
  assert.equal(path.due(state, start + day).length, listening.length - 1);
  assert.ok(path.setQuestionSkipped(state, unit, transfer.id, false));
  assert.equal(path.due(state, start + day).length, listening.length);
  assert.deepEqual(json(path.progress(state, unit).answers), saved);
  assert.equal(path.coverage(state, unit).find(item => item.id === 'grammar').complete, false);
  assert.ok(validState(json(state)));
  assert.equal(path.setStepSkipped(state, unit, 'summary', true), false);
  assert.equal(path.setQuestionSkipped(state, unit, 'g0', true), false);
});

test('a due transfer exercise changes the task and checks the saved variant after reload', () => {
  const state = emptyState();
  const unit = path.units.find(unit => unit.id === 'numbers-and-amounts');
  const question = path.questions(unit).find(question => question.id === 'x0');
  const start = 1900000000000;
  assert.ok(path.answer(state, unit, question, '15', start, 0));
  const beforeDue = path.exercise(question, state.learning.units[unit.id].answers.x0, start + day - 1);
  assert.equal(beforeDue.variant, 0);
  const due = path.exercise(question, state.learning.units[unit.id].answers.x0, start + day);
  assert.equal(due.variant, 1);
  assert.equal(due.entry, undefined);
  assert.equal(due.question.audio, 'The price is fifty dollars.');
  assert.equal(path.answer(state, unit, question, '15', start + day, 1), false);
  const retry = path.exercise(question, state.learning.units[unit.id].answers.x0, start + day);
  assert.equal(retry.variant, 1);
  assert.ok(path.answer(state, unit, question, '50', start + day, 1));
  const restored = json(state);
  assert.ok(validState(restored));
  assert.ok(path.passed(question, restored.learning.units[unit.id].answers.x0));
  assert.equal(path.coverage(restored, unit).find(item => item.id === 'listening').passed, 1);
  restored.learning.units[unit.id].answers.x0.variant = 2;
  assert.equal(validState(restored), false);
});

test('all stages include complete weekday and month groups and their exercises can persist',()=>{
  const weekdays=path.units.find(u=>u.id==='week').words.slice(0,7).map(w=>w[0]);
  assert.deepEqual(json(weekdays),['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']);
  const week=path.units.find(u=>u.id==='week');assert.ok(path.questions(week).find(q=>q.id==='l6').options.includes('星期六'));
  const months = path.units.find(unit => unit.id === 'meeting-time').words.slice(0, 12).map(word => word[0]);
  assert.deepEqual(json(months), ['January','February','March','April','May','June','July','August','September','October','November','December']);
  assert.equal(path.stages.length, 6);
  assert.equal(path.units.length, 48);
  assert.equal(new Set(path.units.map(unit => unit.id)).size, path.units.length);
  assert.equal(path.units.filter(unit => unit.stage === 'foundation').length, 8);
  for (const stage of path.stages) assert.equal(path.units.filter(unit => unit.stage === stage.id).length, 8);
  const coverage = vm.runInContext('CourseCoverage', context);
  for (const [stage, , lessonIds, practiceId] of coverage) {
    assert.ok(path.stages.some(item => item.id === stage));
    for (const id of lessonIds) assert.ok(path.units.some(unit => unit.id === id && unit.stage === stage), id);
    if (practiceId) assert.ok(path.questions(path.units.find(unit => unit.id === practiceId)).some(question => question.variants));
  }
  const s=emptyState();
  for(const u of path.units){
    assert.ok(!u.prerequisite||path.units.findIndex(x=>x.id===u.prerequisite)<path.units.indexOf(u));
    const questions=path.questions(u);assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
    for(const w of u.words){assert.equal(w.length,3);assert.ok(w.every(Boolean));}
    const p=path.ensure(s,u);p.seen=u.words.map((_,i)=>i);p.spoken=u.speaking.map((_,i)=>i);
    for(const q of questions){assert.ok(q.answer&&q.why);if(q.options){assert.equal(new Set(q.options).size,q.options.length);assert.ok(q.options.includes(q.answer));}path.answer(s,u,q,q.answer,1000);assert.equal(validState(json(s)),true,`${u.id}/${q.id}`);}
    assert.equal(path.complete(s,u),true);s.learning.resume={unit:u.id,step:'summary'};assert.equal(validState(json(s)),true);
  }
});

test('viewing words or self-rating speaking never substitutes for listening, grammar or writing evidence',()=>{
  const s=emptyState(),u=path.units[0],p=path.ensure(s,u);p.seen=u.words.map((_,i)=>i);p.spoken=[0];
  assert.equal(path.complete(s,u),false);assert.equal(path.coverage(s,u).find(c=>c.id==='listening').passed,0);
  const q=path.questions(u).find(q=>q.skill==='grammar');path.answer(s,u,q,'wrong',1000);assert.equal(path.coverage(s,u).find(c=>c.id==='grammar').passed,0);
  assert.equal(path.recommend(s,1001).review,true);assert.equal(path.recommend(s,1001).step,'grammar');
  const written=path.questions(u).find(q=>q.skill==='output');assert.equal(path.correct(written,"I'm an engineer!"),true);assert.equal(path.correct(written,'I engineer'),false);
});

test('review intervals advance across due dates, repeated clicks cannot inflate evidence, and mistakes reset it',()=>{
  const s=emptyState(),u=path.units.find(unit => unit.id === 'week'),q=path.questions(u)[0],start=1900000000000;
  path.answer(s,u,q,q.answer,start);let a=s.learning.units.week.answers[q.id];assert.equal(a.level,1);assert.equal(a.due,start+day);
  path.answer(s,u,q,q.answer,start+1000);a=s.learning.units.week.answers[q.id];assert.equal(a.level,1);assert.equal(a.due,start+day);
  assert.equal(path.due(s,start+day-1).length,0);assert.equal(path.due(s,start+day).length,1);
  path.answer(s,u,q,q.answer,start+day);a=s.learning.units.week.answers[q.id];assert.equal(a.level,2);assert.equal(a.due,start+4*day);
  path.answer(s,u,q,'wrong',start+day+1000);a=s.learning.units.week.answers[q.id];assert.equal(a.level,0);assert.equal(a.due,start+day+1000);
  s.plans['2026-11-07']={mode:'pause',minutes:{}};assert.equal(path.due(s,start+day+2000).length,1);assert.equal(validState(s),true);
});

test('paused learning resumes the chosen step and question without resetting to earlier unfinished steps',()=>{
  const s=emptyState();s.learning.resume={unit:'week',step:'listening',question:'l6'};s.plans['2026-11-07']={mode:'pause',minutes:{}};
  const next=path.recommend(s,1000);assert.equal(next.unit.id,'week');assert.equal(next.step,'listening');assert.equal(next.question,'l6');assert.equal(validState(s),true);
});

test('old exports remain valid and unknown units, question keys, unsafe timestamps and invalid indices are rejected',()=>{
  const legacy=emptyState();delete legacy.learning;assert.equal(validState(legacy),true);
  const s=emptyState(),u=path.units[0],q=path.questions(u)[0];path.answer(s,u,q,q.answer,1000);
  for(const mutate of [
    s=>s.learning.units.intro.seen.push(13),s=>s.learning.units.intro.seen.push(1,1),
    s=>s.learning.units.other=s.learning.units.intro,s=>s.learning.resume={unit:'intro',step:'bad'},
    s=>s.learning.resume={unit:'intro',step:'words',question:'l0'},s=>s.learning.resume={unit:'intro',step:'words',question:'w99'},
    s=>s.learning.units.intro.answers.w99=s.learning.units.intro.answers.w0,
    s=>s.learning.units.intro.answers.w0.due=Infinity,s=>s.learning.units.intro.answers.w0.value='x'.repeat(501),
    s=>s.learning.units.intro.answers.w0.level=6
  ]){const copy=structuredClone(s);mutate(copy);assert.equal(validState(copy),false);}
});

test('MySQL store includes curriculum data in the same revision transaction and restores JSON on load',async()=>{
  const s=emptyState();s.done['3-vocab']=true;s.learning.resume={unit:'week',step:'grammar'};const u=path.units.find(unit => unit.id === 'week');path.answer(s,u,path.questions(u)[0],'星期一',1000);
  let revision=0,storedLearning=null,commits=0,rollbacks=0;const statements=[];
  const connection={beginTransaction:async()=>{},commit:async()=>{commits++;},rollback:async()=>{rollbacks++;},release(){},query:async(sql,values)=>{statements.push([sql,values]);return [[]];},execute:async(sql,values)=>{
    statements.push([sql,values]);
    if(sql.startsWith('SELECT revision'))return [[{revision}]];
    if(sql.startsWith('UPDATE users')){revision++;return [{}];}
    if(sql.startsWith('INSERT INTO curriculum_progress')){storedLearning=values[1];return [{}];}
    if(sql.startsWith('SELECT display_name'))return [[{display_name:'Sunny',daily_goal:40,revision}]];
    if(sql.startsWith('SELECT progress FROM curriculum_progress'))return [[{progress:storedLearning}]];
    if(sql.startsWith('SELECT * FROM lesson_progress'))return [[{step_key:'3-vocab',completed:1}]];
    return [[]];
  }};
  const store=new MysqlStore({getConnection:async()=>connection});assert.equal(await store.save(17,s,0),1);
  assert.equal(commits,1);assert.deepEqual((await store.load(17)).state,json(s));assert.equal(commits,2);
  assert.ok(statements.some(([sql,values])=>sql.startsWith('INSERT INTO curriculum_progress')&&values[0]===17));
  await assert.rejects(store.save(17,emptyState(),0),ConflictError);assert.equal(rollbacks,1);assert.equal(commits,2);
});

test('passwordless HTTP roundtrip preserves curriculum with old progress; serves all new learning assets',async t=>{
  let saved=emptyState(),revision=0;const store={load:async()=>({state:structuredClone(saved),revision}),save:async(id,s,r)=>{assert.equal(r,revision);saved=structuredClone(s);return ++revision;}};
  const server=createApp(store,{passwordlessUser:{id:17,username:'sunny'}});await new Promise(r=>server.listen(0,'127.0.0.1',r));
  t.after(()=>new Promise(r=>{server.closeAllConnections();server.close(r);}));const base=`http://127.0.0.1:${server.address().port}`;
  saved.done['30-vocab']=true;const next=structuredClone(saved),u=path.units.find(unit => unit.id === 'week');path.answer(next,u,path.questions(u).find(q=>q.id==='l6'),'星期日',1000);
  const travel = path.units.find(unit => unit.id === 'missed-connection');
  next.learning.resume = { unit: travel.id, step: 'listening', question: 'a1' };
  path.answer(next, travel, path.questions(travel).find(q => q.id === 'a1'), '七点', 1000);
  const response=await fetch(base+'/api/state',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:next,revision})});assert.equal(response.status,200);
  assert.deepEqual((await (await fetch(base+'/api/state')).json()).state,json(next));
  for(const asset of ['curriculum-units.js','curriculum-foundation.js','curriculum-further.js','curriculum.js','curriculum-ui.js','curriculum.css','mobile.css']){const r=await fetch(base+'/'+asset);assert.equal(r.status,200);assert.ok((await r.text()).length>100);}
  const invalid=structuredClone(next);invalid.learning.units.week.seen=[99];assert.equal((await fetch(base+'/api/state',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:invalid,revision})})).status,400);
});
