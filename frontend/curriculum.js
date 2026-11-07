// Unit and question IDs are stable persistence keys.
const LearningPath = (() => {
  const steps = [['words','课文与词汇'],['grammar','句子与语法'],['listening','听懂信息'],['reading','读懂短文'],['output','自己表达'],['summary','覆盖与复习']];
  const foundationUnits = [
    {
      id:'intro', title:'介绍自己和身边的人', goal:'用简单句介绍自己、同事和团队，分清 I / my 与 am / is / are。', prerequisite:null,
      words:[['I','我','I am Sunny.'],['you','你；你们','You are on my team.'],['he','他','He is an engineer.'],['she','她','She is my colleague.'],['it','它','It is a team.'],['we','我们','We are colleagues.'],['they','他们；她们；它们','They are engineers.'],['my','我的','My name is Sunny.'],['your','你的；你们的','Your name is Alex.'],['name','名字','My name is Sunny.'],['engineer','工程师','I am an engineer.'],['colleague','同事','She is my colleague.'],['team','团队','We are a team.']],
      pronunciation:'I 要大写。am / is / are 在句中通常轻读；先听整句，再把自己的名字和身份替换进去。单词发音可逐个播放，音标可点词查看。',
      grammar:[
        ['句子先有骨架','介绍身份可以用“主语 + am / is / are + 身份”。I 配 am；he / she / it 配 is；you / we / they 配 are。','I am an engineer.'],
        ['“我”和“我的”不一样','I 可以做主语；my 后面接名词。you / your 同理。不能用 My am Sunny. 表达“我是 Sunny”。','My name is Sunny.'],
        ['一个身份怎么说','单数职业名词前通常用 a / an。看后面单词开头的发音：an engineer，a colleague。','She is an engineer.']
      ],
      grammarQuiz:[['I ___ Sunny.',['am','is','are'],0,'I 配 am。'],['They ___ my colleagues.',['am','is','are'],2,'they 配 are；同事不止一人用 colleagues。'],['___ name is Alex.',['I','My','Me'],1,'name 前用表示所属的 my。'],['She is ___ engineer.',['a','an','are'],1,'engineer 以元音音素开头，用 an。']],
      passage:['My name is Sunny. I am an engineer. Alex is my colleague. We are a team.','我叫 Sunny。我是一名工程师。Alex 是我的同事。我们是一个团队。'],
      readingQuiz:[['Who is Alex?',['Sunny’s colleague','Sunny’s name','A place'],0,'Alex is my colleague. 说明 Alex 是同事。'],['Which sentence introduces a job?',['My name is Sunny.','I am an engineer.','We are a team.'],1,'an engineer 表示职业。']],
      listeningQuiz:[['We are a team.','听到的人称是？',['我','我们','他们'],1,'we 表示我们。']],
      writing:[['用 I 开头写“我是一名工程师”。',['I am an engineer.'], 'I + am + an engineer。'],['写“他们是我的同事”。',['They are my colleagues.'],'They 配 are；colleagues 是复数。']],
      speaking:[['介绍你自己，再介绍一位同事。','My name is Sunny. I am an engineer. Alex is my colleague.','先用自己的信息说，再对照参考。可以把 engineer 换成 QA engineer。']],
      transfer:['I am a QA engineer. I test HR systems.','我是一名 QA 工程师，测试 HR 系统。第二句的动作表达将在下一单元展开。']
    },
    {
      id:'week', title:'说清一周的安排', goal:'完整认识七天，读懂每周安排，用简单现在时描述固定活动。', prerequisite:'intro',
      choiceGroups:[[0,1,2,3,4,5,6]],
      words:[['Monday','星期一','I work on Monday.'],['Tuesday','星期二','I work on Tuesday.'],['Wednesday','星期三','I work on Wednesday.'],['Thursday','星期四','I work on Thursday.'],['Friday','星期五','I work on Friday.'],['Saturday','星期六','I study on Saturday.'],['Sunday','星期日','I rest on Sunday.'],['work','工作','We work on Monday.'],['study','学习','I study on Saturday.'],['rest','休息','I rest on Sunday.'],['every','每一；每个','I study every day.'],['day','天；一天','I work every day.']],
      pronunciation:'Tuesday 和 Thursday 分开听；Wednesday 的拼写和读音不完全对应。先慢速跟读，再按随机题目听辨，不只按顺序背七天。',
      grammar:[['固定活动用简单现在时','说日常习惯，可以用 I / you / we / they + 动词原形。不要在普通动作动词前加 am。','I work on Monday.'],['换成 he / she 时','第三人称单数的肯定句，动词通常加 -s；study 变 studies。先练 work → works，再看特殊拼写。','She works on Friday.'],['星期和频率','在具体星期几用 on，星期首字母大写。every day 表示每天，前面不用 on。on Monday 可以指某个周一；on Mondays 常表示每周一。','I study every day.']],
      grammarQuiz:[['I ___ on Monday.',['work','am work','works'],0,'普通动作句用 I work，不加 am。'],['She ___ on Friday.',['work','works','are work'],1,'she 后的肯定句用 works。'],['We rest ___ Sunday.',['in','at','on'],2,'星期前用 on。'],['I study ___.',['on every day','every day','in every day'],1,'every day 前不用介词。']],
      passage:['I work on Monday and Tuesday. Alex works on Friday. I study on Saturday. I rest on Sunday.','我周一和周二工作。Alex 周五工作。我周六学习，周日休息。'],
      readingQuiz:[['When does Sunny study?',['Friday','Saturday','Sunday'],1,'I study on Saturday.'],['What does Sunny do on Sunday?',['Work','Study','Rest'],2,'I rest on Sunday.']],
      listeningQuiz:[['I rest on Sunday.','休息安排在哪天？',['Saturday','Sunday','Monday'],1,'听关键词 Sunday；容易与 Saturday 混淆时分别重听。'],['She works on Friday.','听到的是谁的活动？',['我','她','我们'],1,'She 表示她；works 与第三人称单数搭配。']],
      writing:[['写“我周日休息”。',['I rest on Sunday.'],'I + rest + on Sunday。'],['用 She 写“她周五工作”。',['She works on Friday.'],'She 后用 works。']],
      speaking:[['不看参考，说出周一到周日，再说两天的真实安排。','Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. I work on Monday. I rest on Sunday.','说错哪天就单独重听那天；安排用自己的信息。']],
      transfer:['I test HR systems on Monday.','我周一测试 HR 系统。把 work 替换成 test HR systems，就能描述工作安排。']
    },
    {
      id:'questions', title:'询问信息与当前状态', goal:'区分身份/状态句与动作句，能够提问、否定并理解审批状态。', prerequisite:'week',
      words:[['request','请求；申请','The request is pending.'],['pending','待处理的','The request is pending.'],['approved','已批准的','The request is approved.'],['rejected','已拒绝的','The request is rejected.'],['ready','准备好的','Are you ready?'],['check','检查；确认','I check the request.'],['manager','经理','She is my manager.'],['who','谁','Who is your manager?'],['where','哪里','Where do you work?'],['not','不；没有','It is not ready.']],
      pronunciation:'听否定时留意 not / don’t / doesn’t。它们短，但会改变整个句子的意思；听不确定时先请对方重复。',
      grammar:[['状态句：移动 be，或加 not','The request is pending. 提问时把 is 放到前面；否定在 is 后加 not。这里先把 approved / rejected 当作状态表达，更完整的被动语态留到后续学习。','Is the request pending?'],['动作句：借助 do / does','I work… → Do you work…?；She works… → Does she work…? 用 does 后，动作动词恢复原形。','Does she work on Friday?'],['否定和简短回答','I do not work…；She does not work…。do not = don’t；does not = doesn’t。回答 Do you…? 可用 Yes, I do. / No, I don’t.','I do not work on Sunday.'],['问谁、问哪里','Who is…? 用来询问身份；Where do you work? 用来询问工作地点。避免把 Is you work…? 当动作问句。','Who is your manager?']],
      grammarQuiz:[['___ the request pending?',['Do','Is','Does'],1,'pending 是状态，这里用 is 提问。'],['Does she ___ on Friday?',['works','work','working'],1,'does 后动词用原形。'],['I ___ work on Sunday.',['am not','do not','is not'],1,'普通动作的否定用 do not。'],['___ do you work? — In Shanghai.',['Who','Where','Is'],1,'地点用 where 提问。']],
      passage:['The request is pending. Alex is my manager. She checks requests on Monday. She does not work on Sunday.','申请待处理。Alex 是我的经理。她周一检查申请，周日不工作。'],
      readingQuiz:[['Is the request approved?',['Yes','No, it is pending.','No, it is rejected.'],1,'pending 与 approved 不同。'],['Does Alex work on Sunday?',['Yes, she does.','No, she does not.','The text does not say.'],1,'She does not work on Sunday.']],
      listeningQuiz:[['The request is not ready.','申请准备好了吗？',['已准备好','未准备好','已拒绝'],1,'not ready 表示未准备好，不等于 rejected。'],['Do you work on Sunday?','对方在做什么？',['说明自己的工作','询问你周日是否工作','询问你的身份'],1,'Do you work…? 是动作问句。']],
      writing:[['写“这份申请待处理”。',['The request is pending.'],'The request + is + pending。'],['用完整形式（不用缩写）写“她周日不工作”。',['She does not work on Sunday.'],'does not 后用 work。']],
      speaking:[['问一位同事周五是否工作，再询问申请是否待处理。','Do you work on Friday? Is the request pending?','动作问题用 do，状态问题用 is。试着给出肯定和否定回答。']],
      transfer:['Is the request pending? Who is the approver?','申请待处理吗？审批人是谁？同样的问句结构可以用于真实流程确认。']
    },
    {
      id:'requests', title:'提出请求并确认理解', goal:'用 can 表达能力和请求，没听懂时能请人重复，能礼貌确认。', prerequisite:'questions',
      words:[['can','能；可以','I can help.'],['help','帮助','Can you help me?'],['repeat','重复','Can you repeat that, please?'],['slowly','慢慢地','Can you speak slowly, please?'],['please','请','Please help me.'],['understand','理解；听懂','I understand.'],['mean','意思是','Do you mean Monday?'],['send','发送','Can you send the form?'],['form','表单','Can you check the form?'],['again','再一次','Can you say that again?']],
      pronunciation:'请求句中 can 常轻读，句末的 please 可以让语气更礼貌。先说清楚，再逐步连贯；不必为了速度吞掉关键词。',
      grammar:[['can 后接动词原形','I / she / they 后都用 can + 动词原形，不加 to，也不因 she 加 -s。','She can help.'],['提问与否定','把 can 放到主语前形成问句。否定用 cannot / can’t。Can you…? 既能询问能力，也常用于请求。','Can you help me?'],['听不懂也能继续交流','请人重复、慢一点说，再用 Do you mean…? 确认信息。先核对日期或对象，避免假装听懂。','Do you mean Monday?']],
      grammarQuiz:[['She can ___ me.',['helps','to help','help'],2,'can 后用动词原形。'],['___ you repeat that, please?',['Can','Are','Does'],0,'Can you…? 可以礼貌提出请求。'],['I ___ understand.',['am not','cannot','does not'],1,'cannot 后直接接 understand。'],['确认“你是指周一吗？”',['Do you mean Monday?','You Monday?','Are you mean Monday?'],0,'mean 是动作动词，这里用 do 提问。']],
      passage:['Sunny: Can you send the form, please? Alex: On Monday. Sunny: Can you repeat that, please? Alex: On Monday. Sunny: Do you mean Monday? Alex: Yes.','Sunny：请把表单发给我，可以吗？Alex：周一。Sunny：请再说一遍，可以吗？Alex：周一。Sunny：你是指周一吗？Alex：是的。'],
      readingQuiz:[['What does Sunny request?',['A form','A team','A manager'],0,'send the form 表示发送表单。'],['Why does Sunny say “Do you mean Monday?”',['To confirm the day','To reject the form','To introduce a colleague'],0,'这里是在确认日期。']],
      listeningQuiz:[['Can you speak slowly, please?','这句话请求对方做什么？',['快一点说','慢一点说','发送表单'],1,'slowly 表示慢慢地。'],['Do you mean Monday?','对方在确认什么？',['时间是周一吗','表单已批准吗','是否需要帮助'],0,'mean Monday 在这里用于确认日期。']],
      writing:[['礼貌请求对方重复：用 Can 开头，包含 please。',['Can you repeat that, please?','Can you please repeat that?'],'Can you + repeat that + please。'],['确认“你是指周一吗？”',['Do you mean Monday?'],'Do you mean + 要确认的信息。']],
      speaking:[['模拟没听清同事的安排：请对方重复，然后确认星期。','Can you repeat that, please? Do you mean Monday?','先听或读一遍参考，合上参考，用另一个星期重新说。']],
      transfer:['Can you check the form, please?','请帮忙检查这份表单，可以吗？同样的请求结构也能用于日常求助。']
    }
  ];
  const units = [
    ...foundationUnits.map(unit => ({ ...unit, stage: 'foundation', scene: '通用' })),
    ...ExpandedUnits
  ];
  const stages = [
    { id: 'foundation', title: '01 起步 · 组成简单句', content: '介绍人物、说一周的安排、询问状态、提出请求。' },
    { id: 'arrange', title: '02 安排 · 约时间和出行', content: '确认月份、日期和时刻，再练约会议、问路、入住和点餐。' },
    { id: 'handle', title: '03 处理 · 描述经过与问题', content: '用过去时和顺序词说明发生了什么，练缺陷报告、审批流转、值机和住宿反馈。' },
    { id: 'coordinate', title: '04 协商 · 讨论条件和下一步', content: '澄清规则与边界、比较改签方案、协商缺陷优先级并完成交接。' }
  ];
  const normalize=s=>String(s).toLowerCase().replace(/[’‘]/g,"'").replace(/\bi'm\b/g,'i am').replace(/\bthey're\b/g,'they are').replace(/\bdon't\b/g,'do not').replace(/\bdoesn't\b/g,'does not').replace(/\bcan't\b/g,'cannot').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  function choices(u,index){const pool=u.choiceGroups?.find(g=>g.includes(index))||u.words.map((_,i)=>i),position=pool.indexOf(index),group=[index,pool[(position+1)%pool.length],pool[(position+pool.length-1)%pool.length]];const rotate=index%3;return [...group.slice(rotate),...group.slice(0,rotate)].map(i=>u.words[i][1]);}
  function questions(u){
    return [
      ...u.words.map((w,i)=>({id:`w${i}`,skill:'words',prompt:`${w[0]} 的本课含义是？`,options:choices(u,i),answer:w[1],why:w[2]})),
      ...u.words.map((w,i)=>({id:`l${i}`,skill:'listening',prompt:'播放单词，选择听到的意思。',audio:w[0],options:choices(u,i),answer:w[1],why:`${w[0]}：${w[1]}`})),
      ...u.grammarQuiz.map((q,i)=>({id:`g${i}`,skill:'grammar',prompt:q[0],options:q[1],answer:q[1][q[2]],why:q[3]})),
      ...u.readingQuiz.map((q,i)=>({id:`r${i}`,skill:'reading',prompt:q[0],options:q[1],answer:q[1][q[2]],why:q[3]})),
      ...u.listeningQuiz.map((q,i)=>({id:`a${i}`,skill:'listening',prompt:q[1],audio:q[0],options:q[2],answer:q[2][q[3]],why:q[4]})),
      ...u.writing.map((q,i)=>({id:`o${i}`,skill:'output',prompt:q[0],accepted:q[1],answer:q[1][0],why:q[2]}))
    ];
  }
  const correct=(q,value)=>q.accepted?q.accepted.some(a=>normalize(a)===normalize(value)):value===q.answer;
  function progress(state,u){return state.learning?.units?.[u.id]||{seen:[],answers:{},spoken:[]};}
  function coverage(state,u){const p=progress(state,u),qs=questions(u);return steps.filter(([id])=>id!=='summary').map(([id,label])=>{const selected=qs.filter(q=>q.skill===id),passed=selected.filter(q=>p.answers[q.id]&&correct(q,p.answers[q.id].value)).length;return {id,label,passed,total:selected.length,seen:id==='words'?p.seen.length:null,spoken:id==='output'?p.spoken.length:null,complete:passed===selected.length&&(id!=='words'||p.seen.length===u.words.length)&&(id!=='output'||p.spoken.length===u.speaking.length)};});}
  const complete=(s,u)=>coverage(s,u).every(c=>c.complete);
  function due(state,now=Date.now()){return units.flatMap(u=>{const p=progress(state,u);return questions(u).filter(q=>p.answers[q.id]&&p.answers[q.id].due<=now).map(q=>({unit:u,question:q,entry:p.answers[q.id]}));}).sort((a,b)=>a.entry.due-b.entry.due);}
  function recommend(state,now=Date.now()){
    const reviews=due(state,now);if(reviews.length)return {unit:reviews[0].unit,step:reviews[0].question.skill,question:reviews[0].question.id,review:true};
    const resumed=units.find(u=>u.id===state.learning?.resume?.unit);
    if(resumed&&!complete(state,resumed))return {unit:resumed,step:state.learning.resume.step,question:state.learning.resume.question,review:false};
    const u=units.find(u=>!complete(state,u));
    if(!u)return {unit:units[units.length-1],step:'summary',review:false};
    return {unit:u,step:coverage(state,u).find(c=>!c.complete)?.id||'summary',review:false};
  }
  function ensure(state,u){state.learning||={resume:null,units:{}};state.learning.units[u.id]||={seen:[],answers:{},spoken:[]};return state.learning.units[u.id];}
  function answer(state,u,q,value,now=Date.now()){
    const p=ensure(state,u),old=p.answers[q.id],ok=correct(q,value),sameWindow=old&&correct(q,old.value)&&now<old.due;
    const level=ok?(sameWindow?old.level:Math.min((old?.level||0)+1,5)):0;
    p.answers[q.id]={value,at:now,level,due:ok?(sameWindow?old.due:now+[1,3,7,14,30][level-1]*86400000):now};return ok;
  }
  return {units,steps,stages,normalize,questions,correct,progress,coverage,complete,due,recommend,ensure,answer};
})();
