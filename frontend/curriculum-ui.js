const pathQuestionPositions=new Map();
function pathReviewNotice() {
  const { units } = LearningPath;
  const reviews = LearningPath.due(state);
  const seen = units.reduce((count, unit) => count + LearningPath.progress(state, unit).seen.length, 0);
  const total = units.reduce((count, unit) => count + unit.words.length, 0);
  const next = reviews[0];
  const action = next
    ? pathAction(next.unit, next.question.skill, '开始复习', next.question.id)
    : '<a class="text-link" href="#plan">查看学习地图</a>';
  return `<section class="panel">
    <h2>学习路线的词汇与复习</h2>
    <p class="muted">已介绍 ${seen} / ${total} 个词汇学习位，${reviews.length} 个知识点可复习。</p>
    ${action}
  </section>`;
}
function pathOpen(unit,step='words',question=null){
  cleanup();const u=LearningPath.units.find(u=>u.id===unit);if(!u)return;
  if(mode()==='pause')LearningPace.changeMode(state,today(),'resume');
  state.learning||={resume:null,units:{}};const previous=state.learning.resume;
  const cursor=question||(previous?.unit===unit&&previous.step===step?previous.question:null);
  state.learning.resume={unit,step,...(cursor?{question:cursor}:{})};
  if(question){const qs=LearningPath.questions(u).filter(q=>q.skill===step);const index=qs.findIndex(q=>q.id===question);if(index>=0)pathQuestionPositions.set(`${unit}-${step}`,index);}
  save();if(location.hash==='#learn')render();else location.hash='learn';window.scrollTo(0,0);
}
function pathAction(u,step,label,question=''){return `<button class="secondary" data-path-unit="${u.id}" data-path-step="${step}" data-path-question="${question}">${label}</button>`;}
function pathUnitList(units, showCoverage = false) {
  return `<div class="path-unit-list">${units.map(unit => {
    const number = LearningPath.units.indexOf(unit) + 1;
    const coverage = LearningPath.coverage(state, unit);
    const complete = coverage.filter(item => item.complete).length;
    const progress = LearningPath.progress(state, unit);
    const total = coverage.reduce((count, item) => count + item.total, 0);
    const passed = coverage.reduce((count, item) => count + item.passed, 0);
    const reviewed = Object.values(progress.answers).filter(answer => answer.level >= 2).length;
    return `<article>
      <span class="path-number">${number}</span>
      <div>
        <h3>${unit.title} <span class="badge">${unit.scene}</span></h3>
        <p>${unit.goal}</p>
        <small>${complete} / ${coverage.length} 项练习完成</small>
        ${showCoverage ? `<small class="path-unit-coverage">词汇 ${progress.seen.length} / ${unit.words.length} · 答对 ${passed} / ${total} · 跨天巩固 ${reviewed} / ${total}</small>` : ''}
      </div>
      <span class="path-unit-actions">
        ${pathAction(unit, 'words', '进入单元')}
        ${pathAction(unit, 'summary', '看进度')}
      </span>
    </article>`;
  }).join('')}</div>`;
}

function pathDashboard() {
  const next = LearningPath.recommend(state);
  const unit = next.unit;
  const stage = LearningPath.stages.find(stage => stage.id === unit.stage);
  const stageUnits = LearningPath.units.filter(unit => unit.stage === stage.id);
  const due = LearningPath.due(state);
  const paused = mode() === 'pause';
  const completed = LearningPath.units.filter(unit => LearningPath.complete(state, unit)).length;
  const step = LearningPath.steps.find(([id]) => id === next.step)[1];
  const title = paused ? '今天先休息，位置为你留着' : next.review ? '先巩固，再往前走' : unit.title;
  const goal = paused ? '恢复后可以先做几道复习题，也可以自由选课。' : esc(unit.goal);
  const hint = paused ? '随时恢复' : next.review ? `有 ${due.length} 个知识点可复习` : `下一步：${step}`;
  const action = paused
    ? '<button class="primary" data-mode="resume">恢复今天的学习</button>'
    : pathAction(unit, next.step, '继续学习', next.question || '');
  return pageHeading(`你好，${esc(state.name)}`, '从基础句型到工作和旅游，沿同一条路线逐步练习。') + pacePicker() + `
    <section class="path-hero">
      <div>
        <p class="path-kicker">${stage.title} / 已完成 ${completed} / ${LearningPath.units.length} 个单元</p>
        <h2>${title}</h2>
        <p>${goal}</p>
        <div class="path-next"><span>${hint}</span>${action}</div>
      </div>
      <aside><strong>标准 40 分钟参考</strong><p>复习 8′ → 词汇与句子 12′<br>听读 10′ → 说写 10′</p><small>轻量时挑一小步，状态好再继续。一单元可以分多天学。</small></aside>
    </section>
    <div class="section-heading"><h2>当前阶段的单元</h2><a href="#plan">查看全部阶段</a></div>
    ${pathUnitList(stageUnits)}
    <div class="path-footnote"><a href="#courses">自由探索：30 课场景练习</a><a href="#words">查词与生词本</a></div>`;
}

function pathStageCoverage(stageId) {
  const rows = CourseCoverage.filter(([stage]) => stage === stageId);
  const linked = new Set(rows.flatMap(([, , lessonIds]) => lessonIds));
  for (const unit of FurtherUnits) {
    if (unit.stage === stageId && !linked.has(unit.id)) rows.push([stageId, unit.title, [unit.id], unit.id]);
  }
  return `<details class="path-stage-coverage">
    <summary>查看本阶段知识覆盖</summary>
    ${rows.map(([, topic, lessonIds, practiceId]) => `<div class="path-rule">
      <h3>${esc(topic)}</h3>
      ${lessonIds.length ? `<div class="path-unit-actions">
        ${lessonIds.map(id => {
          const unit = LearningPath.units.find(unit => unit.id === id);
          return pathAction(unit, 'grammar', '讲解 · ' + esc(unit.title));
        }).join('')}
        ${practiceId ? pathAction(LearningPath.units.find(unit => unit.id === practiceId), 'summary', '换题练习') : ''}
      </div>` : '<p class="muted">计划补充</p>'}
    </div>`).join('')}
  </details>`;
}

function pathTransferPractice(unit) {
  const questions = LearningPath.questions(unit).filter(question => question.variants);
  if (!questions.length) return '';
  const { answers } = LearningPath.progress(state, unit);
  return `<h3>换情境练习</h3><div class="path-coverage">
    ${questions.map(question => {
      const entry = answers[question.id];
      const label = question.skill === 'listening' ? '听写关键信息' : '换情境造句';
      let status = '未练习';
      if (entry) {
        if (!LearningPath.passed(question, entry)) status = '待巩固';
        else if (entry.level >= 2) status = '跨天换题已答对';
        else status = '本次已答对';
      }
      return `<div><p>${label} · ${status}</p>${pathAction(unit, question.skill, '开始练习', question.id)}</div>`;
    }).join('')}
  </div>`;
}

function pathSavedWordAction(word) {
  for (const unit of LearningPath.units) {
    const index = unit.words.findIndex(([entry]) => entry.toLowerCase() === word);
    if (index !== -1) return pathAction(unit, 'words', '课程中练习', `w${index}`);
  }
  return '';
}

function pathMap() {
  const { stages, units } = LearningPath;
  const entries = new Set(units.flatMap(unit => unit.words.map(([word]) => word.toLowerCase()))).size;
  return pageHeading('学习地图', `${stages.length} 个阶段 · ${units.length} 个可学单元 · ${entries} 个去重词汇与短语。`) + `
    <section class="panel">
      <h2>课程建设路线</h2>
      <p>先逐步覆盖约 1,200～1,500 个基础词，完整主线目标约 3,000 个核心词，后续扩展到约 5,000 个。搭配和短语另行统计。</p>
      <p class="muted">展开各阶段的知识覆盖，可以查看讲解所在单元和待补内容。</p>
      <div class="path-unit-actions" aria-label="跳到课程阶段">
        ${stages.map(stage => `<button class="secondary" data-path-stage-jump="${stage.id}">${stage.title}</button>`).join('')}
      </div>
    </section>
    ${stages.map(stage => `
      <section class="panel" aria-labelledby="stage-${stage.id}">
        <h2 id="stage-${stage.id}" tabindex="-1">${stage.title}</h2>
        <p class="muted">${stage.content}</p>
        ${pathStageCoverage(stage.id)}
        ${pathUnitList(units.filter(unit => unit.stage === stage.id), true)}
      </section>
    `).join('')}
    <section class="panel">
      <h2>怎样安排下一步？</h2>
      <p>首页优先推荐到期复习，再继续未完成的单元。点“看进度”可查看词汇、语法、听读、说写的覆盖情况。</p>
      <p class="muted">每道题答对后分别安排约 1、3、7、14、30 天的复习。口语练习可录音回听并自评。</p>
      <a href="#today" class="text-link">回到今日学习</a>
    </section>`;
}
function pathQuestion(u,skill){
  const qs=LearningPath.questions(u).filter(q=>q.skill===skill),key=`${u.id}-${skill}`,p=LearningPath.progress(state,u);
  let index=pathQuestionPositions.get(key);if(index===undefined){index=qs.findIndex(q=>q.id===state.learning?.resume?.question);if(index<0)index=qs.findIndex(q=>p.answers[q.id]?.due<=Date.now());if(index<0)index=qs.findIndex(q=>!LearningPath.passed(q,p.answers[q.id]));if(index<0)index=0;}
  index=Math.max(0,Math.min(qs.length-1,index));pathQuestionPositions.set(key,index);const original = qs[index];
  const { question: q, entry: a, variant } = LearningPath.exercise(original, p.answers[original.id]);
  const ok = LearningPath.passed(original, a);
  const isTransfer = variant !== undefined;
  const title = isTransfer ? (q.audio ? '听写关键信息' : '换情境造句') : (skill === 'output' ? '句子小练习' : '检验一下');
  const label = q.audio ? '输入听到的信息' : '输入英语句子';
  return `<section class="panel path-exercise"><div class="path-exercise-head"><h3>${title}</h3><span>${index+1} / ${qs.length}</span></div>${q.audio?`<div class="path-audio"><button class="primary" data-path-hear="${esc(q.audio)}">♫ 播放题目</button><button class="secondary" data-path-hear="${esc(q.audio)}" data-slow="true">慢速听</button></div><p class="muted">使用设备英语语音。听不清可重播；无法播放时先学习其他部分，听辨记录会保留为未完成。</p>`:''}
    <form id="path-question" data-q="${q.id}" data-variant="${variant ?? 0}"><fieldset><legend>${esc(q.prompt)}</legend>${q.options?q.options.map((option,i)=>`<label class="path-choice"><input type="radio" name="value" value="${esc(option)}" required ${a?.value===option?'checked':''}><span>${esc(option)}</span></label>`).join(''):`<label class="path-writing-label">${label}<input name="value" maxlength="500" autocomplete="off" required value="${esc(a?.value||'')}" placeholder="${q.audio ? '听完再输入' : '试着自己写一句'}"></label><p class="muted">${q.audio ? '可以重播，再输入题目要求的关键信息。' : '此处核对指定句式。开放表达可在下方口语练习中进行。'}</p>`}<button class="primary" type="submit">检查答案</button></fieldset></form>
    <div id="path-feedback" role="status">${a?`<div class="feedback">${ok?'✓ 当前回答正确':'还需要巩固'}<br>${esc(q.why)}${!ok?`<br>参考：${esc(q.answer)}`:''}<br><small>${ok?'后续会安排跨天复习；当前答对不等于已长期掌握。':'理解后请重新作答，系统不会自动替你通过。'}</small></div>`:''}</div>
    <div class="path-question-nav"><button class="secondary" data-path-qindex="${index-1}" ${index===0?'disabled':''}>上一题</button><label>选择题目 <select id="path-qselect">${qs.map((item,i)=>`<option value="${i}" ${i===index?'selected':''}>${i+1} · ${p.answers[item.id]?(LearningPath.passed(item,p.answers[item.id])?'已答对':'待巩固'):'未作答'}</option>`).join('')}</select></label><button class="secondary" data-path-qindex="${index+1}" ${index===qs.length-1?'disabled':''}>下一题</button></div></section>`;
}
function pathWords(u){const p=LearningPath.progress(state,u);return `<section class="panel path-anchor"><h2>先听读一小段</h2><p class="muted">这一单元围绕下面的短文学习。先听大意，再逐句理解，最后换成自己的信息。</p><div class="path-audio"><button class="primary" data-path-hear="${esc(u.passage[0])}">♫ 听本课短文</button><button class="secondary" data-path-hear="${esc(u.passage[0])}" data-slow="true">慢速听</button></div>${wordSentence(u.passage[0])}<details><summary>看中文帮助理解</summary><p>${u.passage[1]}</p></details></section><section class="panel"><h2>这一组，完整认识</h2><p>${esc(u.pronunciation)}</p><p class="muted">已介绍 ${p.seen.length} / ${u.words.length} 个词。点词可看更多释义；“已介绍”只记录你看过，并不标记掌握。</p><div class="path-word-grid">${u.words.map(([en,zh,example],i)=>`<article><div class="path-word-heading"><button class="sentence-word" data-lookup="${esc(en)}" data-context="${esc(example)}" data-hint="${esc(zh)}">${esc(en)}</button><button class="audio-btn" data-say="${esc(en)}" aria-label="播放 ${esc(en)}">♫</button></div><p>${esc(zh)}</p>${wordSentence(example)}<label class="path-seen"><input type="checkbox" data-path-seen="${i}" ${p.seen.includes(i)?'checked':''}> 已看释义和例句</label></article>`).join('')}</div></section>`+pathQuestion(u,'words');}
function pathGrammar(u){return `<section class="panel"><h2>知道怎么说，也知道为什么</h2>${u.grammar.map(([title,note,en])=>`<article class="path-rule"><h3>${title}</h3><p>${note}</p>${wordSentence(en)}<button class="audio-btn" data-say="${esc(en)}" aria-label="播放语法例句">♫</button></article>`).join('')}</section>`+pathQuestion(u,'grammar');}
function pathOutput(unit) {
  const progress = LearningPath.progress(state, unit);
  const rounds = unit.speaking.map(([prompt, reference, tip, cue], index) => `
    <article class="path-rule">
      <h3>${esc(prompt)}</h3>
      ${cue ? `<button class="secondary" data-say="${esc(cue)}">听对方说 · 第 ${index + 1} 轮</button>
        <details><summary>看对方说了什么</summary>${wordSentence(cue)}</details>` : ''}
      <details>
        <summary>看参考表达</summary>
        ${wordSentence(reference)}
        <button class="secondary" data-say="${esc(reference)}">听参考</button>
        <p>${esc(tip)}</p>
      </details>
      <label class="path-seen">
        <input type="checkbox" data-path-spoken="${index}" ${progress.spoken.includes(index) ? 'checked' : ''}>
        我已尝试自己表达（自评）
      </label>
    </article>`).join('');
  const draft = unit.draftPrompt ? `<section class="panel">
    <h2>写一段完整消息</h2>
    <label class="path-writing-label" for="path-draft">${esc(unit.draftPrompt)}</label>
    <textarea id="path-draft" rows="5" maxlength="3000" lang="en">${esc(progress.draft || '')}</textarea>
    <p class="muted">草稿会自动保存。写完后核对事项、时间和下一步。</p>
  </section>` : '';
  return pathQuestion(unit, 'output') + draft + `
    <section class="panel">
      <h2>${unit.speaking.length > 1 ? '逐轮接话' : '把句子变成自己的话'}</h2>
      <p class="muted">先独立说，再打开参考。口语练习用录音回听与自评记录。</p>
      ${rounds}
      <div class="actions">
        <button class="secondary" id="record">● 录下来回听</button>
        <button class="secondary" id="stop-record" disabled>停止录音</button>
      </div>
      <p id="record-status" class="muted">录音仅供当前页面回听，不上传、不保存。</p>
      <audio id="record-audio" class="hidden" controls></audio>
    </section>`;
}
function pathSummary(u){const p=LearningPath.progress(state,u),coverage=LearningPath.coverage(state,u),due=LearningPath.due(state).filter(x=>x.unit.id===u.id),next=LearningPath.units[LearningPath.units.indexOf(u)+1];return `<section class="panel"><h2>${LearningPath.complete(state,u)?'基础练习已完成，继续巩固':'看看还差哪一小步'}</h2><p class="muted">完成练习不等于掌握所有用法。下面分别展示当前答题表现和口语自评。</p><div class="path-coverage">${coverage.map(c=>`<div><div><h3>${c.label}</h3><p>当前答对 ${c.passed} / ${c.total}${c.seen!==null?` · 已介绍 ${c.seen} / ${u.words.length}`:''}${c.spoken!==null?` · 口语自评 ${c.spoken} / ${u.speaking.length}`:''}</p></div>${pathAction(u,c.id,c.complete?'再练一遍':'继续补齐')}</div>`).join('')}</div>${pathTransferPractice(u)}<h3>这一单元的复习</h3><p>${due.length?`${due.length} 个知识点已到复习时间，先做几题就好。`:'暂时没有到期题目。首次答对后，系统会按知识点安排跨天复习。'}</p>${due.length?pathAction(u,due[0].question.skill,'开始复习',due[0].question.id):''}<p class="muted">口语自评不会计入答题正确率，听力也不会因为播放过就自动通过。</p>${next?`<div class="actions">${pathAction(next,'words',LearningPath.complete(state,u)?'进入下一单元':'先看看下一单元')}</div>`:'<p>你已到达学习路线的最后一个单元。可以到学习地图补齐其他练习，或继续复习。</p>'}</section>`;}
function pathView(){const resume=state.learning?.resume||LearningPath.recommend(state),u=LearningPath.units.find(u=>u.id===(resume.unit?.id||resume.unit))||LearningPath.units[0],step=resume.step||'words',p=LearningPath.units.find(x=>x.id===u.prerequisite),stepIndex=LearningPath.steps.findIndex(s=>s[0]===step);const stage=LearningPath.stages.find(stage=>stage.id===u.stage);return pageHeading(u.title,`${stage.title} · ${u.scene} · ${u.goal}`)+`
  <div class="path-unit-switch" aria-label="选择当前阶段单元">${LearningPath.units.filter(unit=>unit.stage===u.stage).map(unit=>`<button class="${unit.id===u.id?'active':''}" data-path-unit="${unit.id}" data-path-step="words">${LearningPath.units.indexOf(unit)+1}. ${unit.title}</button>`).join('')}<a href="#plan" class="secondary">全部阶段</a></div>
  ${p&&!LearningPath.complete(state,p)?`<p class="path-prerequisite">这一单元会用到“${p.title}”的基础。${pathAction(p,'summary','查看前置练习')}</p>`:''}
  <div class="tabs path-step-tabs" aria-label="单元学习步骤">${LearningPath.steps.map(([id,label])=>`<button class="${step===id?'active':''}" data-path-unit="${u.id}" data-path-step="${id}">${label}</button>`).join('')}</div>
  <div class="path-learning-layout"><div>${step==='words'?pathWords(u):step==='grammar'?pathGrammar(u):step==='listening'?pathQuestion(u,'listening'):step==='reading'?`<section class="panel"><h2>读一小段</h2>${wordSentence(u.passage[0])}<details><summary>读完再看中文</summary><p>${u.passage[1]}</p></details></section>`+pathQuestion(u,'reading'):step==='output'?pathOutput(u):pathSummary(u)}<div class="path-bottom"><button class="secondary" id="path-pause">暂缓并保留位置</button>${stepIndex<LearningPath.steps.length-1?pathAction(u,LearningPath.steps[stepIndex+1][0],'继续下一步'):''}</div></div><aside><section class="panel"><h3>把基础用起来</h3>${wordSentence(u.transfer[0])}<p class="muted">${u.transfer[1]}</p><button class="secondary" data-say="${esc(u.transfer[0])}">听一遍</button><p class="review-note">一单元可以分多次完成。点击下一步只切换内容，不会自动通过练习。</p><a href="#plan" class="text-link">查看覆盖地图</a></section></aside></div>`;}
function bindLearningPath(){
  document.querySelectorAll('[data-path-unit]').forEach(b=>b.onclick=()=>pathOpen(b.dataset.pathUnit,b.dataset.pathStep,b.dataset.pathQuestion));
  for (const button of document.querySelectorAll('[data-path-stage-jump]')) {
    button.onclick = () => {
      const heading = document.getElementById('stage-' + button.dataset.pathStageJump);
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: 'start' });
    };
  }
  if(location.hash!=='#learn')return;
  const u=LearningPath.units.find(u=>u.id===state.learning?.resume?.unit)||LearningPath.recommend(state).unit,step=state.learning?.resume?.step||LearningPath.recommend(state).step,key=`${u.id}-${step}`;
  document.querySelectorAll('[data-path-seen]').forEach(b=>b.onchange=()=>{const p=LearningPath.ensure(state,u),n=Number(b.dataset.pathSeen);p.seen=b.checked?[...new Set([...p.seen,n])]:p.seen.filter(i=>i!==n);save();render();});
  document.querySelectorAll('[data-path-spoken]').forEach(b=>b.onchange=()=>{const p=LearningPath.ensure(state,u),n=Number(b.dataset.pathSpoken);p.spoken=b.checked?[...new Set([...p.spoken,n])]:p.spoken.filter(i=>i!==n);save();render();});
  document.querySelectorAll('[data-path-hear]').forEach(b=>b.onclick=()=>speak(b.dataset.pathHear,b.dataset.slow==='true'));
  const move=index=>{pathQuestionPositions.set(key,Number(index));state.learning||={resume:null,units:{}};state.learning.resume={unit:u.id,step,question:LearningPath.questions(u).filter(q=>q.skill===step)[Number(index)].id};save();cleanup();render();};
  document.querySelectorAll('[data-path-qindex]').forEach(b=>b.onclick=()=>move(b.dataset.pathQindex));
  document.querySelector('#path-qselect')?.addEventListener('change',e=>move(e.target.value));
  document.querySelector('#path-draft')?.addEventListener('input', event => {
    LearningPath.ensure(state, u).draft = event.target.value;
    save();
  });
  document.querySelector('#path-question')?.addEventListener('submit',e=>{e.preventDefault();const q=LearningPath.questions(u).find(q=>q.id===e.target.dataset.q),value=new FormData(e.target).get('value');LearningPath.answer(state,u,q,value,Date.now(),Number(e.target.dataset.variant));save();render();});
  document.querySelector('#path-pause')?.addEventListener('click',()=>{setMode('pause');location.hash='today';});
}
