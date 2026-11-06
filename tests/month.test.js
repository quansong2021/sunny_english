import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { emptyState,validState } from '../backend/state.js';
const context=vm.createContext({});
for(const file of ['data','vocabulary','month-vocabulary','month-lessons','pacing'])vm.runInContext(readFileSync(new URL(`../frontend/${file}.js`,import.meta.url),'utf8'),context);
const {lessons}=vm.runInContext('({lessons})',context);
// Export the dictionary separately because its public name is vocabularyDetails.
const dictionary=vm.runInContext('vocabularyDetails',context);
test('30 complete lessons have valid questions, translations and dictionary coverage',()=>{
  assert.equal(lessons.length,30);assert.equal(lessons.filter(l=>l.category==='工作').length,15);
  assert.equal(new Set(lessons.map(l=>l.id)).size,30);assert.equal(Object.keys(dictionary).length,142);
  for(let index=0;index<30;index++){const l=lessons[index];assert.equal(l.id,index+1);assert.equal(l.words.length,10);assert.equal(new Set(l.words.map(w=>w[0])).size,10);assert.equal(l.prompts.length,5);assert.equal(l.quiz.length,2);assert.ok(l.lines.length>=4);
    for(const line of l.lines)assert.ok(line.every(v=>typeof v==='string'&&v.length));
    for(const prompt of l.prompts)assert.ok(prompt.length===3&&prompt.every(v=>typeof v==='string'&&v.length));
    for(const quiz of l.quiz)assert.ok(quiz[1].length===3&&Number.isInteger(quiz[2])&&quiz[1][quiz[2]]);
    for(const word of l.words){const d=dictionary[word[0]];assert.ok(d,word[0]);assert.ok(d.pos&&d.senses.length&&d.forms&&d.usage,word[0]);assert.ok(d.collocations.length>=2&&d.examples.length>=2,word[0]);for(const pair of [...d.examples,...d.collocations])assert.ok(pair.length===2&&pair.every(v=>typeof v==='string'&&v.length),word[0]);}
  }
});
test('month data accepts lesson 30, old exports, daily plans and resume state; rejects out-of-range content',()=>{
  const s=emptyState();s.done['30-vocab']=true;s.words['30-9']={level:2,due:1900000000000,seen:true};s.answers['30-4']='I want to keep learning.';s.notes['30']='Keep practicing.';s.activity['2026-11-05']=['30-vocab'];s.plans['2026-11-05']={mode:'light',minutes:{'30-vocab':8}};s.resume={lesson:30,section:'vocab',wordIndex:9,promptIndex:4,listenStage:2,revealed:true};assert.equal(validState(s),true);
  const legacy=emptyState();delete legacy.plans;delete legacy.resume;assert.equal(validState(legacy),true);
  assert.equal(validState({...s,done:{'31-vocab':true}}),false);assert.equal(validState({...s,resume:{...s.resume,wordIndex:10}}),false);assert.equal(validState({...s,plans:{'2026-11-05':{mode:'unknown',minutes:{}}}}),false);
});
test('pacing keeps recorded minutes stable, permits later lessons and retains paused progress',()=>{
  const p=vm.runInContext('LearningPace',context),s=emptyState(),date='2026-11-05';s.activity[date]=['8-vocab'];s.plans[date]={mode:'light',minutes:{'8-vocab':8}};
  assert.equal(p.goal(s,date),20);assert.equal(p.minutes(s,date),8);s.plans[date].mode='extra';assert.equal(p.goal(s,date),60);assert.equal(p.minutes(s,date),8);
  s.resume={lesson:24,section:'listening',wordIndex:4,promptIndex:1,listenStage:1,revealed:false};assert.equal(p.nextLesson(lessons,s).id,24);
  s.plans[date].mode='pause';assert.equal(p.goal(s,date),0);assert.equal(p.nextLesson(lessons,s).id,24);assert.equal(p.minutes(s,date),8);assert.equal(p.goal(s,'2026-11-06'),40);
  p.changeMode(s,date,'light');p.changeMode(s,date,'pause');assert.equal(p.goal(s,date),0);p.changeMode(s,date,'resume');assert.equal(p.goal(s,date),20);assert.equal(p.minutes(s,date),8);
  for(const section of ['vocab','listening','speaking','review'])s.done[`24-${section}`]=true;assert.equal(p.nextLesson(lessons,s).id,1);
  for(const l of lessons)for(const section of ['vocab','listening','speaking','review'])s.done[`${l.id}-${section}`]=true;assert.equal(p.nextLesson(lessons,s),null);
});
