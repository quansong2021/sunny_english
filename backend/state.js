export function emptyState() {
  return { name: 'Sunny', goal: 40, done: {}, words: {}, answers: {}, notes: {}, activity: {}, plans: {}, resume: null, savedWords: {}, learning:{resume:null,units:{}} };
}
const record = x => x && typeof x === 'object' && !Array.isArray(x);
const lessonId='(?:[1-9]|[12][0-9]|30)';
const step = new RegExp(`^${lessonId}-(vocab|listening|speaking|review)$`);
const word = new RegExp(`^${lessonId}-[0-9]$`);
const answer = new RegExp(`^${lessonId}-[0-4]$`);
const validDate=k=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(k))return false;const d=new Date(k+'T00:00:00Z');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===k&&k>='1000-01-01';};
const safeEntries = (x, limit, check) => record(x) && Object.keys(x).length <= limit && Object.entries(x).every(([k,v]) => !['__proto__','constructor','prototype'].includes(k) && check(k,v));
const standardPathUnit = { words: 8, audio: 2 };
// These bounds mirror the published extension units. The course test checks their saved keys.
const furtherPathUnits = Object.fromEntries([
  ['daily-routine', 19, 1],
  ['dates-and-deadlines', 20, 1],
  ['shopping-and-paying', 18, 1],
  ['places-and-directions', 19, 1],
  ['work-yesterday', 18, 1],
  ['reproduce-a-defect', 20, 1],
  ['lost-property', 18, 1],
  ['while-it-happened', 18, 1],
  ['exchange-a-purchase', 18, 1],
  ['future-travel-plans', 18, 1],
  ['permissions-and-access', 19, 1],
  ['amount-and-boundaries', 19, 1],
  ['baggage-and-options', 18, 1],
  ['test-scope', 18, 1],
  ['compare-travel-options', 18, 1],
  ['passive-status-updates', 18, 1],
  ['hotel-booking-mismatch', 18, 1],
  ['test-progress', 19, 1],
  ['complaint-and-remedy', 18, 1],
  ['resolve-a-disagreement', 18, 1],
  ['refund-follow-up', 18, 1],
  ['bug-triage-conversation', 18, 3],
  ['travel-connection-conversation', 18, 3],
  ['write-a-work-update', 18, 3],
  ['change-a-reservation-message', 18, 3],
  ['handover-with-a-blocker', 18, 3],
  ['day-trip-change', 18, 3],
  ['decision-and-meeting-minutes', 18, 3],
].map(([id, words, spoken]) => [id, { words, spoken, grammar: 2, writing: 0, audio: 0, practice: true }]));
const pathUnits = {
  ...furtherPathUnits,
  intro: { words: 13, audio: 1, practice: true },
  'people-and-roles': { words: 12, audio: 2, practice: true },
  'objects-and-articles': { words: 12, audio: 2, practice: true },
  'numbers-to-ten': { words: 14, audio: 2, practice: true },
  'numbers-and-amounts': { words: 20, audio: 2, practice: true },
  week: { words: 12, audio: 2, practice: true },
  questions: { words: 10, audio: 2, practice: true },
  requests: { words: 10, audio: 2, practice: true },
  'meeting-time': { words: 15, audio: 2 },
  'getting-around': standardPathUnit,
  'hotel-arrival': standardPathUnit,
  'ordering-food': standardPathUnit,
  'reporting-a-bug': standardPathUnit,
  'airport-check-in': standardPathUnit,
  'approval-flow': standardPathUnit,
  'hotel-problem': standardPathUnit,
  'clarifying-rules': standardPathUnit,
  'missed-connection': standardPathUnit,
  'prioritizing-issues': standardPathUnit,
  handover: standardPathUnit
};
const pathSteps=['words','grammar','listening','reading','output','summary'];
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
function validPathQuestion(id,key,step){
  if (!Object.hasOwn(pathUnits, id)) return false;
  if (key === 'x0' || key === 'x1') {
    const skill = key === 'x0' ? 'listening' : 'output';
    return pathUnits[id].practice === true && (!step || step === skill);
  }
  const match=typeof key==='string'&&/^([wlgrao])(\d{1,2})$/.exec(key);if(!match)return false;
  const spec=pathUnits[id],limit={w:spec.words,l:spec.words,g:spec.grammar??4,r:2,a:spec.audio,o:spec.writing??2}[match[1]],skill={w:'words',l:'listening',g:'grammar',r:'reading',a:'listening',o:'output'}[match[1]];
  return String(Number(match[2]))===match[2]&&Number(match[2])<limit&&(!step||step===skill);
}
export function validLearning(p){
  const indices=(v,max)=>Array.isArray(v)&&v.length<=max&&new Set(v).size===v.length&&v.every(i=>Number.isInteger(i)&&i>=0&&i<max);
  return !!(record(p)&&(p.resume===null||(record(p.resume)&&Object.hasOwn(pathUnits,p.resume.unit)&&pathSteps.includes(p.resume.step)&&(p.resume.question===undefined||validPathQuestion(p.resume.unit,p.resume.question,p.resume.step))))&&safeEntries(p.units,Object.keys(pathUnits).length,(id,u)=>{
    if(!Object.hasOwn(pathUnits,id)||!record(u))return false;const spec=pathUnits[id];
    if (u.draft !== undefined && (typeof u.draft !== 'string' || u.draft.length > 3000)) return false;
    const questionCount = 2 * spec.words + (spec.grammar ?? 4) + 2 + (spec.writing ?? 2) + spec.audio + (spec.practice ? 2 : 0);
    return indices(u.seen,spec.words)&&indices(u.spoken,spec.spoken??1)&&safeEntries(u.answers,questionCount,(key,a)=>{
      return validPathQuestion(id,key)&&record(a)&&typeof a.value==='string'&&a.value.length<=500&&time(a.at)&&time(a.due)&&Number.isInteger(a.level)&&a.level>=0&&a.level<=5
        && (a.variant === undefined || ((key === 'x0' || key === 'x1') && [0, 1].includes(a.variant)));
    });
  }));
}
export function validState(s) {
  return !!(record(s) && typeof s.name === 'string' && s.name.trim().length > 0 && s.name.length <= 30 && [20,40,60].includes(s.goal)
    && (s.learning===undefined||validLearning(s.learning))
    && (s.savedWords===undefined||safeEntries(s.savedWords,6000,(k,v)=>/^[a-z]+(?:[' -][a-z]+)*$/.test(k)&&k.length<=120&&record(v)&&Number.isSafeInteger(v.addedAt)&&v.addedAt>=0&&typeof v.meaning==='string'&&v.meaning.length<=1000&&typeof v.sentence==='string'&&v.sentence.length<=2000))
    && safeEntries(s.done,120,(k,v)=>step.test(k)&&typeof v==='boolean')
    && safeEntries(s.words,300,(k,v)=>word.test(k)&&record(v)&&Number.isInteger(v.level)&&v.level>=0&&v.level<=5&&Number.isSafeInteger(v.due)&&v.due>=0&&v.due<=8640000000000000&&typeof v.seen==='boolean')
    && safeEntries(s.answers,150,(k,v)=>answer.test(k)&&typeof v==='string'&&v.length<=20000)
    && safeEntries(s.notes,30,(k,v)=>new RegExp(`^${lessonId}$`).test(k)&&typeof v==='string'&&v.length<=20000)
    && safeEntries(s.activity,20000,(k,v)=>validDate(k)&&Array.isArray(v)&&v.length<=120&&new Set(v).size===v.length&&v.every(id=>typeof id==='string'&&step.test(id)))
    && (s.plans===undefined||safeEntries(s.plans,20000,(date,p)=>validDate(date)&&record(p)&&['light','standard','extra','pause'].includes(p.mode)&&(p.previousMode===undefined||['light','standard','extra'].includes(p.previousMode))&&safeEntries(p.minutes,120,(k,v)=>step.test(k)&&Number.isInteger(v)&&v>=0&&v<=60)))
    && (s.resume===undefined||s.resume===null||(record(s.resume)&&Number.isInteger(s.resume.lesson)&&s.resume.lesson>=1&&s.resume.lesson<=30&&['vocab','listening','speaking','review'].includes(s.resume.section)&&Number.isInteger(s.resume.wordIndex)&&s.resume.wordIndex>=0&&s.resume.wordIndex<10&&Number.isInteger(s.resume.promptIndex)&&s.resume.promptIndex>=0&&s.resume.promptIndex<5&&Number.isInteger(s.resume.listenStage)&&s.resume.listenStage>=0&&s.resume.listenStage<=2&&typeof s.resume.revealed==='boolean')));
}
