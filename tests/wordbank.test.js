import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wordbank,seedWordbank,wordbankVersion } from '../backend/wordbank.js';
import { createApp } from '../backend/http.js';
import { emptyState,validState } from '../backend/state.js';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
test('graded topics cover weekdays, months and every listed word can be looked up',()=>{
  const context=vm.createContext({});vm.runInContext(readFileSync(new URL('../frontend/word-topics.js',import.meta.url),'utf8')+';this.topics=WordTopics',context);const topics=context.topics;
  assert.equal(topics.length,16);assert.equal(topics.find(t=>t.id==='weekdays').words.length,7);assert.equal(topics.find(t=>t.id==='months').words.length,12);
  assert.deepEqual([...new Set(topics.map(t=>t.level))],[1,2,3]);
  for(const topic of topics){assert.ok(topic.note&&topic.example.length===2);for(const [word,meaning]of topic.words){assert.ok(meaning);assert.ok(wordbank.lookup(word),word);}}
  assert.ok(wordbank.lookup('May').senses.some(s=>s.includes('五月')));assert.ok(wordbank.lookup('Thursday').senses.some(s=>s.includes('四')));
});
test('the complete expanded bank is seeded before its version is marked ready',async()=>{
  let count=0,marked=false,committed=false;
  const connection={beginTransaction:async()=>{},query:async(sql,[rows])=>{assert.ok(rows.length<=200);count+=rows.length;},execute:async(sql,[key,version])=>{assert.equal(count,wordbank.search().total);assert.equal(version,wordbankVersion);marked=true;},commit:async()=>{assert.equal(marked,true);committed=true;},rollback:async()=>{},release(){}};
  await seedWordbank({execute:async()=>[[]],getConnection:async()=>connection});assert.equal(committed,true);
});
test('wordbank includes common words, course detail, contractions and inflected forms',()=>{
  assert.ok(wordbank.search().total>=100000);
  for(const word of ['the','is','testing','approved','colleagues',"I'm",'responsible','contingency','interoperability','reconciliation','ergonomics','restructuring'])assert.ok(wordbank.lookup(word),word);
  assert.ok(wordbank.lookup('responsible').detail.collocations.length>=3);
  assert.equal(wordbank.lookup('RESPONSIBLE').word,'responsible');assert.equal(wordbank.lookup('<script>'),null);
  assert.equal(wordbank.search('',40,40).items.length,40);assert.notEqual(wordbank.search().items[0].word,wordbank.search('',40,40).items[0].word);
  assert.ok(wordbank.search('同事').items.some(e=>e.word==='colleague'));assert.equal(wordbank.search('xxneverfoundzz').matched,0);
});
test('new saved words round trip through state API without changing course position',async t=>{
  let saved=emptyState(),revision=0;saved.resume={lesson:8,section:'vocab',wordIndex:2,promptIndex:0,listenStage:0,revealed:true};
  const original=structuredClone(saved.resume),store={load:async()=>({state:structuredClone(saved),revision}),save:async(id,next)=>{saved=next;return ++revision;}};
  const server=createApp(store,{passwordlessUser:{id:1,username:'sunny'}});await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>new Promise(r=>{server.closeAllConnections();server.close(r);}));const base=`http://127.0.0.1:${server.address().port}`;
  const lookup=await fetch(base+'/api/lexicon/lookup?word=colleagues');assert.equal(lookup.status,200);assert.ok((await lookup.json()).senses.length);
  assert.equal((await fetch(base+'/api/lexicon/lookup?word=xxneverfoundzz')).status,404);
  const bank=await (await fetch(base+'/api/lexicon?q=employee')).json();assert.ok(bank.items.some(e=>e.word==='employee'));
  saved.savedWords.colleague={addedAt:Date.now(),meaning:'同事',sentence:'My colleague is testing a form.'};assert.equal(validState(saved),true);
  assert.equal((await fetch(base+'/api/state',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:saved,revision:0})})).status,200);
  const loaded=await (await fetch(base+'/api/state')).json();assert.deepEqual(loaded.state.resume,original);assert.equal(loaded.state.savedWords.colleague.meaning,'同事');
  assert.equal(validState({...saved,savedWords:{'<script>':saved.savedWords.colleague}}),false);
});
test('dictionary seed skips an unchanged version and rolls back a failed import',async()=>{
  await seedWordbank({execute:async()=>[[{version:wordbankVersion}]],getConnection(){throw Error('Should skip unchanged seed');}});
  let rollback=false,released=false;const connection={beginTransaction:async()=>{},query:async()=>{throw Error('database unavailable');},rollback:async()=>{rollback=true;},release(){released=true;}};
  await assert.rejects(seedWordbank({execute:async()=>[[]],getConnection:async()=>connection}),/database unavailable/);assert.equal(rollback,true);assert.equal(released,true);
});
