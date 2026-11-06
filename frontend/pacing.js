// Pure learning-plan rules, shared by the UI and its focused checks.
const LearningPace = {
  changeMode(state,date,next){state.plans||={};const plan=state.plans[date]||={mode:'standard',minutes:{}};if(next==='pause'&&plan.mode!=='pause')plan.previousMode=plan.mode;const selected=next==='resume'?(plan.previousMode||'standard'):next;if(!['light','standard','extra','pause'].includes(selected))throw Error('Unknown learning mode');plan.mode=selected;return plan;},
  mode(state,date){return state.plans?.[date]?.mode||'standard';},
  goal(state,date){const mode=this.mode(state,date);return mode==='pause'?0:mode==='light'?20:mode==='extra'?60:state.goal;},
  timings(state,date){const goal=this.goal(state,date);return goal===0?[0,0,0,0]:goal===20?[8,5,5,2]:goal===60?[25,15,15,5]:[15,10,10,5];},
  nextLesson(lessons,state){const resume=lessons.find(l=>l.id===state.resume?.lesson);if(resume&&!['vocab','listening','speaking','review'].every(s=>state.done[`${resume.id}-${s}`]))return resume;return lessons.find(l=>!['vocab','listening','speaking','review'].every(s=>state.done[`${l.id}-${s}`]))||null;},
  minutes(state,date){const recorded=state.plans?.[date]?.minutes||{};const base=state.goal===20?[8,5,5,2]:state.goal===60?[25,15,15,5]:[15,10,10,5];return (state.activity[date]||[]).reduce((total,id)=>total+(recorded[id]??base[['vocab','listening','speaking','review'].indexOf(id.split('-')[1])]),0);}
};
