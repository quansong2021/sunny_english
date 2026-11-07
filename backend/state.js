export function emptyState() {
  return { name: 'Sunny', goal: 40, done: {}, words: {}, answers: {}, notes: {}, activity: {}, plans: {}, resume: null, savedWords: {} };
}
const record = x => x && typeof x === 'object' && !Array.isArray(x);
const lessonId='(?:[1-9]|[12][0-9]|30)';
const step = new RegExp(`^${lessonId}-(vocab|listening|speaking|review)$`);
const word = new RegExp(`^${lessonId}-[0-9]$`);
const answer = new RegExp(`^${lessonId}-[0-4]$`);
const validDate=k=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(k))return false;const d=new Date(k+'T00:00:00Z');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===k&&k>='1000-01-01';};
const safeEntries = (x, limit, check) => record(x) && Object.keys(x).length <= limit && Object.entries(x).every(([k,v]) => !['__proto__','constructor','prototype'].includes(k) && check(k,v));
export function validState(s) {
  return !!(record(s) && typeof s.name === 'string' && s.name.trim().length > 0 && s.name.length <= 30 && [20,40,60].includes(s.goal)
    && (s.savedWords===undefined||safeEntries(s.savedWords,6000,(k,v)=>/^[a-z]+(?:[' -][a-z]+)*$/.test(k)&&k.length<=120&&record(v)&&Number.isSafeInteger(v.addedAt)&&v.addedAt>=0&&typeof v.meaning==='string'&&v.meaning.length<=1000&&typeof v.sentence==='string'&&v.sentence.length<=2000))
    && safeEntries(s.done,120,(k,v)=>step.test(k)&&typeof v==='boolean')
    && safeEntries(s.words,300,(k,v)=>word.test(k)&&record(v)&&Number.isInteger(v.level)&&v.level>=0&&v.level<=5&&Number.isSafeInteger(v.due)&&v.due>=0&&v.due<=8640000000000000&&typeof v.seen==='boolean')
    && safeEntries(s.answers,150,(k,v)=>answer.test(k)&&typeof v==='string'&&v.length<=20000)
    && safeEntries(s.notes,30,(k,v)=>new RegExp(`^${lessonId}$`).test(k)&&typeof v==='string'&&v.length<=20000)
    && safeEntries(s.activity,20000,(k,v)=>validDate(k)&&Array.isArray(v)&&v.length<=120&&new Set(v).size===v.length&&v.every(id=>typeof id==='string'&&step.test(id)))
    && (s.plans===undefined||safeEntries(s.plans,20000,(date,p)=>validDate(date)&&record(p)&&['light','standard','extra','pause'].includes(p.mode)&&(p.previousMode===undefined||['light','standard','extra'].includes(p.previousMode))&&safeEntries(p.minutes,120,(k,v)=>step.test(k)&&Number.isInteger(v)&&v>=0&&v<=60)))
    && (s.resume===undefined||s.resume===null||(record(s.resume)&&Number.isInteger(s.resume.lesson)&&s.resume.lesson>=1&&s.resume.lesson<=30&&['vocab','listening','speaking','review'].includes(s.resume.section)&&Number.isInteger(s.resume.wordIndex)&&s.resume.wordIndex>=0&&s.resume.wordIndex<10&&Number.isInteger(s.resume.promptIndex)&&s.resume.promptIndex>=0&&s.resume.promptIndex<5&&Number.isInteger(s.resume.listenStage)&&s.resume.listenStage>=0&&s.resume.listenStage<=2&&typeof s.resume.revealed==='boolean')));
}
