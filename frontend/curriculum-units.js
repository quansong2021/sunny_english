// Keep unit IDs and exercise order stable: learning records use these keys.
const ExpandedUnits = [
  {
    id: 'meeting-time', prerequisite: 'requests', stage: 'arrange', scene: '工作',
    title: '确认日期与会议时间', goal: '说出十二个月，区分日期和时刻，约定或改约会议。',
    words: [
      ['January', '一月', 'The next meeting is in January.'],
      ['February', '二月', 'The next meeting is in February.'],
      ['March', '三月', 'The next meeting is in March.'],
      ['April', '四月', 'The next meeting is in April.'],
      ['May', '五月', 'The next meeting is in May.'],
      ['June', '六月', 'The next meeting is in June.'],
      ['July', '七月', 'The next meeting is in July.'],
      ['August', '八月', 'The next meeting is in August.'],
      ['September', '九月', 'The next meeting is in September.'],
      ['October', '十月', 'The next meeting is in October.'],
      ['November', '十一月', 'The next meeting is in November.'],
      ['December', '十二月', 'The next meeting is in December.'],
      ['meeting', '会议', 'The meeting is at three.'],
      ['available', '有空的', 'Are you available on May 12?'],
      ['move', '改到；移到', 'Can we move the meeting to three?']
    ],
    choiceGroups: [[0,1,2,3,4,5,6,7,8,9,10,11],[12,13,14]],
    pronunciation: '月份首字母大写，分开听 June 和 July。说 May 12 时，可读成 May twelfth。整点后可加 a.m. 或 p.m. 说明上午或下午。',
    grammar: [
      ['时间介词', '月份用 in，具体日期和星期用 on，时刻用 at。同一句里可以同时说明日期和时刻。', 'The meeting is on May 12 at three.'],
      ['改约和确认', 'Can we move … to …? 用来提议改期。用 Does that work for you? 确认对方是否方便。', 'Can we move the meeting to Friday?']
    ],
    passage: ['Alex: Are you available on May 12 at two? Sunny: Can we move the meeting to three? Alex: Yes. May 12 at three p.m. Sunny: That works for me.', 'Alex：你 5 月 12 日两点有空吗？Sunny：能把会议改到三点吗？Alex：可以。5 月 12 日下午三点。Sunny：我可以。'],
    grammarQuiz: [
      ['The meeting is ___ July.', ['at','in','on'],1,'月份前用 in。'],
      ['We meet ___ May 12.', ['on','in','at'],0,'具体日期前用 on。'],
      ['The call is ___ three.', ['on','in','at'],2,'时刻前用 at。'],
      ['Can we move the meeting ___ Friday?', ['for','to','from'],1,'to 引出改约后的时间。']
    ],
    readingQuiz: [
      ['最后约在几点？',['两点','三点','十二点'],1,'最后确认的是 three p.m.。'],
      ['日期有没有改变？',['改到六月','改到周五','仍是 5 月 12 日'],2,'对话只改变了时刻。']
    ],
    listeningQuiz: [
      ['The meeting is on June the fifth at four.','听到的日期是？',['7 月 5 日','6 月 5 日','6 月 4 日'],1,'June the fifth 是 6 月 5 日。'],
      ['Can we move the call to Friday at ten?','新的通话时间是？',['周五十点','周四十点','周五两点'],0,'Friday at ten。']
    ],
    writing: [
      ['用 The meeting is 开头写“会议在三点”。',['The meeting is at three.','The meeting is at 3.','The meeting is at 3:00.'],'时刻前用 at。'],
      ['用 Can we move 开头问“能把会议改到周五吗？”',['Can we move the meeting to Friday?'],'改约到某天用 to Friday。']
    ],
    speaking: [['用你自己的日期和时间约一次会议。','Are you available on May 12 at two? Can we move the meeting to three?','提议后把最终日期和时刻复述一遍。']],
    transfer: ['My hotel reservation is for May 12.', '旅游时，同样可以用日期确认酒店预订。']
  },
  {
    id: 'getting-around', prerequisite: 'requests', stage: 'arrange', scene: '旅游',
    title: '问路与搭乘公共交通', goal: '问车站怎么走，确认站台、线路和换乘地点。',
    words: [
      ['station','车站','Where is the station?'], ['platform','站台','The train leaves from platform two.'],
      ['ticket','车票','I need a ticket to Central.'], ['line','线路','Take line two.'],
      ['change','换乘','Change at Central.'], ['straight','直走；笔直地','Go straight.'],
      ['left','左边','Turn left at the corner.'], ['entrance','入口','The entrance is next to the shop.']
    ],
    pronunciation: '注意区分 line two 和 platform two，听完数字后复述对应的线路或站台。',
    grammar: [
      ['用 How do I …? 问走法', 'How do I get to …? 用来问怎么到达。问具体位置可用 Where is …?。', 'How do I get to Central Station?'],
      ['用动词开头指路', 'Go、turn、take、change 可以直接放句首。at 指明转弯或换乘的位置。', 'Take line two and change at Central.']
    ],
    passage: ['Traveler: How do I get to the museum? Staff: Take line two from platform three. Change at Central. The museum is next to the station. Traveler: Line two, platform three. Thank you.', '旅客：博物馆怎么去？工作人员：从三号站台搭二号线，在中央站换乘。博物馆就在车站旁边。旅客：二号线，三号站台。谢谢。'],
    grammarQuiz: [
      ['How do I get ___ the station?',['at','to','from'],1,'get to 表示到达某处。'],
      ['___ left at the corner.',['Turns','Turning','Turn'],2,'指路时用动词原形开头。'],
      ['Change ___ Central.',['at','to','of'],0,'at 指明换乘的站点。'],
      ['哪一句在问车站的位置？',['How much is the ticket?','Where is the station?','Which line is this?'],1,'Where is …? 问某处在哪里。']
    ],
    readingQuiz: [['从哪个站台上车？',['二号','三号','四号'],1,'from platform three。'],['在哪里换乘？',['Central','博物馆','入口'],0,'Change at Central.']],
    listeningQuiz: [['Take line three from platform two.','线路和站台分别是？',['二号线，三号站台','三号线，二号站台','三号线，三号站台'],1,'line three 与 platform two。'],['Go straight and turn left at the entrance.','到入口后怎么走？',['右转','直走','左转'],2,'turn left at the entrance。']],
    writing: [['用 How do I 开头问“我怎么去车站？”',['How do I get to the station?'],'get to 后接目的地。'],['用 Turn 开头写“在入口左转”。',['Turn left at the entrance.'],'turn left + at the entrance。']],
    speaking: [['向工作人员询问路线，再复述线路和站台。','How do I get to the museum? Do you mean line two from platform three?','可以换成机场或你计划去的景点。']],
    transfer: ['The meeting room is next to the entrance.', '同一组方位表达可以用来给来访同事指路。']
  },
  {
    id: 'hotel-arrival', prerequisite: 'meeting-time', stage: 'arrange', scene: '旅游',
    title: '酒店入住与确认设施', goal: '说明预订人和入住晚数，确认退房时间、设施和费用。',
    words: [
      ['reservation','预订','I have a reservation for two nights.'], ['check in','办理入住','Can I check in now?'],
      ['check out','办理退房','We check out tomorrow.'], ['night','晚；夜','I am staying for one night.'],
      ['included','包含在内的','Is breakfast included?'], ['deposit','押金','Is there a deposit?'],
      ['elevator','电梯','The elevator is on the left.'], ['front desk','前台','Please ask at the front desk.']
    ],
    pronunciation: 'check in 和 check out 的第二个词不同。听到退房时间后，用 at 加时刻复述。',
    grammar: [
      ['用 for 说明时长', 'for two nights 表示住两晚。预订登记的姓名可用 under the name … 引出。', 'I have a reservation for two nights.'],
      ['用 there is 问设施', 'Is there …? 问有没有某个事物。要确认某项服务是否已含在价格中，可问 Is … included?。', 'Is there an elevator?']
    ],
    passage: ['Guest: I have a reservation under the name Sunny Lee, for two nights. Is breakfast included? Clerk: Yes. Check-out is at eleven. Guest: Is there a deposit? Clerk: No, there is no deposit.', '客人：我以 Sunny Lee 的名字订了两晚。包含早餐吗？前台：包含。退房时间是十一点。客人：要付押金吗？前台：不用。'],
    grammarQuiz: [
      ['I have a reservation ___ two nights.',['at','on','for'],2,'for 加一段时间。'],
      ['___ there an elevator?',['Are','Is','Do'],1,'问一个电梯用 Is there …?。'],
      ['Is breakfast ___?',['included','include','including'],0,'用 is included 确认是否包含。'],
      ['Check-out is ___ eleven.',['on','at','in'],1,'具体时刻用 at。']
    ],
    readingQuiz: [['预订了几晚？',['一晚','两晚','三晚'],1,'for two nights。'],['客人需要交押金吗？',['需要','没有提及','不需要'],2,'前台说 there is no deposit。']],
    listeningQuiz: [['Breakfast is included, but there is a deposit.','哪一项是对的？',['含早餐，需要押金','不含早餐，无押金','含早餐，无押金'],0,'but 后说明有押金。'],['You can check in at three and check out at eleven.','几点退房？',['三点','十一点','十二点'],1,'check out at eleven。']],
    writing: [['写“我预订了两晚”，用 I have a reservation 开头。',['I have a reservation for two nights.','I have a reservation for 2 nights.'],'用 for two nights 说明时长。'],['问“包含早餐吗？”',['Is breakfast included?'],'is included 用于确认服务。']],
    speaking: [['用你的名字模拟入住，确认早餐和退房时间。','I have a reservation under the name Sunny Lee. Is breakfast included? What time is check-out?','说清姓名和晚数，记下答复后复述。']],
    transfer: ['Is the meeting room included in the booking?', '公司订会议室时，也可以用 included 确认服务范围。']
  },
  {
    id: 'ordering-food', prerequisite: 'requests', stage: 'arrange', scene: '旅游',
    title: '点餐、核对配料与结账', goal: '点指定数量的餐食，询问配料并礼貌结账。',
    words: [
      ['menu','菜单','Can I see the menu, please?'], ['order','点餐','Are you ready to order?'],
      ['portion','一份','I would like one portion of rice.'], ['glass','一杯','Can I have a glass of water?'],
      ['bill','账单','Could we have the bill, please?'], ['ingredients','配料','Can you tell me the ingredients?'],
      ['without','不加；没有','Can I have it without onions?'], ['spicy','辣的','Is this dish spicy?']
    ],
    pronunciation: 'I would like 常缩成 I’d like。说数量时，one glass 和 two glasses 的尾音不同。',
    grammar: [
      ['礼貌点单', 'I’d like … 表示想要某样东西。Could I have …? 用来提出礼貌请求。', 'I would like two bowls of soup.'],
      ['用单位说明数量', 'water 等不可数名词可用 a glass of 计量。without 后接想去掉的配料。', 'Could I have a glass of water without ice?']
    ],
    passage: ['Guest: I would like two bowls of soup and a glass of water, please. Is the soup spicy? Server: A little. Guest: Can you make one bowl without chili? Server: Yes. Guest: Great, thank you.', '客人：请来两碗汤和一杯水。汤辣吗？服务员：有一点。客人：能有一碗不加辣椒吗？服务员：可以。客人：太好了，谢谢。'],
    grammarQuiz: [
      ['I would like two ___ of soup.',['bowl','bowls','soups bowl'],1,'two 后用复数 bowls。'],
      ['Could I have a glass ___ water?',['to','at','of'],2,'a glass of water 是一杯水。'],
      ['不加洋葱怎么说？',['without onions','with onions','of onions'],0,'without 表示不加。'],
      ['哪一句适合请服务员拿账单？',['I am the bill.','Could we have the bill?','Where the bill is?'],1,'Could we have …? 是礼貌请求。']
    ],
    readingQuiz: [['客人点了几碗汤？',['一碗','两碗','三碗'],1,'two bowls of soup。'],['其中一碗有什么要求？',['不加辣椒','不加盐','换成米饭'],0,'without chili。']],
    listeningQuiz: [['I would like two portions of rice and one glass of water.','点了多少份米饭？',['一份','两份','三份'],1,'two portions of rice。'],['Could we have the bill, please?','说话者想要什么？',['菜单','账单','一杯水'],1,'the bill 是账单。']],
    writing: [['用 I would like 开头写“我想要一杯水”。',['I would like a glass of water.','I would like one glass of water.','I’d like a glass of water.'],'用 a glass of 说明数量。'],['用 Can I have 开头问“可以给我不加洋葱的吗？”',['Can I have it without onions?'],'without onions 表示不加洋葱。']],
    speaking: [['点两份你喜欢的食物，询问一道菜的配料，再结账。','I would like two bowls of soup. Can you tell me the ingredients? Could we have the bill, please?','先听配料答复，再提出自己的要求。']],
    transfer: ['Could I have a copy of the report, please?', '同一个礼貌请求句型可以用于向同事索取报告。']
  },
  {
    id: 'reporting-a-bug', prerequisite: 'week', stage: 'handle', scene: '工作',
    title: '复述步骤并报告缺陷', goal: '用过去时交代操作和结果，写出可复现的缺陷说明。',
    words: [
      ['submit','提交','I submitted the form.'], ['error','错误','The page showed an error.'],
      ['reproduce','复现','I reproduced the issue twice.'], ['expected','预期的','The expected result was a confirmation.'],
      ['actual','实际的','The actual result was an error.'], ['attachment','附件','I added an attachment.'],
      ['save','保存','The system did not save the request.'], ['screenshot','截图','I took a screenshot.']
    ],
    pronunciation: 'submitted 多一个音节，saved 的末尾较轻。说缺陷时，把操作和结果分成两句。',
    grammar: [
      ['过去的操作和结果', '规则动词常加 -ed，如 submit → submitted。show 的过去式是 showed，take 的过去式是 took。', 'I submitted the form and took a screenshot.'],
      ['用 did 追问或否定', 'Did you …? 询问是否做过某事。did not 后接动词原形。', 'The system did not save the request.']
    ],
    passage: ['Yesterday I added an attachment and submitted the leave request. I expected a confirmation, but the page showed an error. The system did not save the request. I reproduced the issue twice and took a screenshot.', '昨天我加了附件并提交请假申请。我预期看到确认信息，页面却显示错误。系统没有保存申请。我复现了两次，并截了图。'],
    grammarQuiz: [
      ['Yesterday I ___ the form.',['submit','submitted','submits'],1,'yesterday 表示过去发生的操作。'],
      ['The system did not ___ the request.',['saved','saves','save'],2,'did not 后用原形。'],
      ['Did you ___ a screenshot?',['take','took','taken'],0,'did 后用 take。'],
      ['I expected a confirmation, ___ I got an error.',['so','but','because'],1,'but 表示预期与实际的差异。']
    ],
    readingQuiz: [['提交前做了什么？',['加了附件','重启了系统','删除了表单'],0,'added an attachment。'],['申请保存了吗？',['保存了','未保存','没有提及'],1,'did not save the request。']],
    listeningQuiz: [['I submitted the form, but I did not get a confirmation.','提交后没有收到什么？',['附件','确认信息','截图'],1,'did not get a confirmation。'],['I reproduced the issue twice on the test account.','复现了几次？',['一次','两次','三次'],1,'twice 表示两次。']],
    writing: [['用过去时写“我提交了表单”。',['I submitted the form.'],'submit 变成 submitted。'],['用 did not 写“系统没有保存申请”。',['The system did not save the request.'],'did not 后用 save。']],
    speaking: [['报告一个你遇到的 QA 问题，说明步骤、预期和实际结果。','I submitted the form. I expected a confirmation, but the page showed an error.','先说一条操作，再说预期和实际；最后补充能否复现。']],
    transfer: ['I paid for the ticket, but I did not get a confirmation.', '买票后没收到确认时，也可以用同一结构说明经过。']
  },
  {
    id: 'airport-check-in', prerequisite: 'meeting-time', stage: 'handle', scene: '旅游',
    title: '机场值机与登机信息', goal: '说明证件和行李情况，听懂登机口、时间和行李要求。',
    words: [
      ['passport','护照','Here is my passport.'], ['boarding pass','登机牌','Here is your boarding pass.'],
      ['gate','登机口','Please go to gate twelve.'], ['boarding','登机','Boarding starts at seven thirty.'],
      ['baggage','行李','Do you have any baggage to check?'], ['carry-on','随身行李','I only have a carry-on.'],
      ['check a bag','托运行李','I need to check a bag.'], ['security','安检','Please go through security.']
    ],
    pronunciation: '听登机广播时先抓 gate 和 boarding，再核对后面的数字。可用 Do you mean …? 复述确认。',
    grammar: [
      ['用 have / have to', 'I have … 表示持有，I have to … 表示必须做。Do I have to …? 用来确认规定。', 'Do I have to check this bag?'],
      ['用现在时说明时刻表', '描述固定时刻表可用简单现在时。boarding 是单数概念，动词用 starts。', 'Boarding starts at seven thirty.']
    ],
    passage: ['Agent: Can I see your passport? Traveler: Here it is. I only have a carry-on. Do I have to check it? Agent: No. Here is your boarding pass. Boarding starts at seven thirty at gate twelve.', '柜台：能看一下护照吗？旅客：给您。我只有一件随身行李，需要托运吗？柜台：不用。这是登机牌。七点半开始登机，登机口是 12 号。'],
    grammarQuiz: [
      ['Do I have ___ check this bag?',['to','for','at'],0,'have to 后接动词原形。'],
      ['Boarding ___ at seven thirty.',['start','starts','starting'],1,'时刻表可用简单现在时，boarding 配 starts。'],
      ['我只有随身行李怎么说？',['I only have a carry-on.','I have to carry-on.','I only am baggage.'],0,'have 表示有，only 表示只有。'],
      ['哪一句在问是否必须托运？',['Where is my bag?','Do I have to check this bag?','Can I see your boarding pass?'],1,'have to 表示必须。']
    ],
    readingQuiz: [['旅客需要托运行李吗？',['需要','不需要','没有提及'],1,'柜台回答 No。'],['登机口是几号？',['7 号','12 号','30 号'],1,'gate twelve。']],
    listeningQuiz: [['Flight 418 is now boarding at gate twenty.','在哪个登机口登机？',['18 号','20 号','28 号'],1,'gate twenty。'],['Boarding starts at eight fifteen, not eight fifty.','正确的登机时间是？',['8:15','8:50','8:05'],0,'fifteen 是十五，fifty 是五十。']],
    writing: [['用 Do I have to 开头问“我需要托运这个包吗？”',['Do I have to check this bag?'],'have to 后用 check。'],['写“七点半开始登机”，用 Boarding 开头。',['Boarding starts at seven thirty.','Boarding starts at 7:30.'],'starts 用于时刻表，时刻前加 at。']],
    speaking: [['模拟值机，说明你带了什么行李并复述登机口和时间。','I only have a carry-on. Do I have to check it? Do you mean gate twelve at seven thirty?','把数字换一组，重新说完整。']],
    transfer: ['The review starts at nine. Do I have to bring the report?', '确认会议安排和需要携带的材料时，同样可以使用这两个句型。']
  },
  {
    id: 'approval-flow', prerequisite: 'questions', stage: 'handle', scene: '工作',
    title: '解释审批流程与退回原因', goal: '按顺序说明表单流转，并解释待审批、退回和重新提交。',
    words: [
      ['applicant','申请人','The applicant submits the form.'], ['review','审核','The manager reviews the request.'],
      ['approval','审批；批准','The request is waiting for approval.'], ['return','退回','The manager returns the form.'],
      ['reason','原因','Please add the reason.'], ['resubmit','重新提交','The applicant can resubmit the form.'],
      ['missing','缺少的','The attachment is missing.'], ['notify','通知','The system notifies the applicant.']
    ],
    pronunciation: 'approval 的重音在第二音节。说流程时，在 first、then、after that 后稍停一下。',
    grammar: [
      ['按顺序组织步骤', '用 first、then、after that 组织流程。描述日常规则可用简单现在时。', 'First, the applicant submits the form. Then the manager reviews it.'],
      ['用 because 给出原因', 'because 后可以接完整句子。从经理角度说 returns the form，从表单角度说 the form is returned。', 'The form is returned because the attachment is missing.']
    ],
    passage: ['First, the applicant submits the form. Then the manager reviews it. The manager returns the form because the attachment is missing. The system notifies the applicant. After that, the applicant adds the attachment and resubmits the form.', '首先，申请人提交表单。接着经理审核。由于附件缺失，经理退回表单。系统通知申请人。随后申请人添加附件并重新提交。'],
    grammarQuiz: [
      ['The manager ___ the request every morning.',['review','reviewing','reviews'],2,'manager 是第三人称单数，动词用 reviews。'],
      ['The form is returned ___ the attachment is missing.',['because','but','then'],0,'because 引出退回原因。'],
      ['表示“接下来”的连接词是？',['Because','Then','First'],1,'then 表示接着。'],
      ['The applicant can ___ the form.',['resubmits','resubmit','resubmitted'],1,'can 后用动词原形。']
    ],
    readingQuiz: [['经理为什么退回表单？',['附件缺失','找不到审批人','日期错误'],0,'because the attachment is missing。'],['谁重新提交？',['经理','申请人','系统'],1,'the applicant … resubmits。']],
    listeningQuiz: [['First, check the attachment. Then notify the applicant.','先做哪一步？',['通知申请人','检查附件','退回表单'],1,'first 后是 check the attachment。'],['The request is pending because the manager is away.','为何待处理？',['经理不在','附件缺失','表单被删除'],0,'because the manager is away。']],
    writing: [['用 The manager 写“经理审核申请”，描述常规流程。',['The manager reviews the request.'],'第三人称单数用 reviews。'],['用 because 补全意思“由于附件缺失，表单被退回”。',['The form is returned because the attachment is missing.'],'because 后接原因。']],
    speaking: [['用三个短句解释一个审批流程，再补充一个退回原因。','First, the applicant submits the form. Then the manager reviews it. The form is returned because the attachment is missing.','可以换成报销单、入职表单或请假申请。']],
    transfer: ['First, check in. Then go through security.', '旅行中也可以用 first 和 then 复述办事顺序。']
  },
  {
    id: 'hotel-problem', prerequisite: 'reporting-a-bug', stage: 'handle', scene: '旅游',
    title: '反馈住宿问题并请求处理', goal: '说明什么地方出了问题、何时开始，并提出可执行的请求。',
    words: [
      ['air conditioning','空调','The air conditioning is not working.'], ['noise','噪声','There was a lot of noise last night.'],
      ['leak','漏水处；渗漏','There is a leak in the bathroom.'], ['towel','毛巾','Could we have another towel?'],
      ['fix','修理','Could someone fix it today?'], ['move rooms','换房','Could we move rooms?'],
      ['last night','昨晚','The noise started last night.'], ['right away','马上','Can someone come right away?']
    ],
    pronunciation: '听 Could someone …? 时注意后面的动作。描述问题时先慢速说出地点，再补充影响。',
    grammar: [
      ['区分现在的问题和过去的经过', 'is not working 描述现在运转异常。started、was 和 were 交代之前的情况。', 'The air conditioning stopped working last night.'],
      ['请求一个具体动作', 'Could someone + 动词原形询问能否派人处理。Could we + 动词原形适合提议换房。', 'Could someone check it today?']
    ],
    passage: ['Guest: The air conditioning in room 408 is not working. It stopped working last night. Could someone check it today? Clerk: I can send someone at two. Guest: Thank you. Could you call me when the room is ready?', '客人：408 房的空调坏了，昨晚开始的。今天能请人来看一下吗？前台：我可以两点派人过去。客人：谢谢。房间处理好后能打电话告诉我吗？'],
    grammarQuiz: [
      ['The air conditioning ___ working now.',['is not','does not','was not'],0,'现在正在发生的问题用 is not working。'],
      ['It ___ working last night.',['stops','stop','stopped'],2,'last night 指过去，用 stopped。'],
      ['Could someone ___ it today?',['checks','check','checked'],1,'could 后接动词原形。'],
      ['哪句适合请求换房？',['Could we move rooms?','Do rooms move?','We moved yesterday.'],0,'Could we …? 可以礼貌提出请求。']
    ],
    readingQuiz: [['哪个设施出问题？',['浴室水龙头','电梯','空调'],2,'air conditioning。'],['前台说几点派人？',['两点','四点','八点'],0,'send someone at two。']],
    listeningQuiz: [['There is a leak in the bathroom of room 305.','问题发生在哪里？',['305 房浴室','305 房门口','503 房浴室'],0,'bathroom of room 305。'],['Could we move rooms? There was a lot of noise last night.','客人要求什么？',['换房','加毛巾','延迟退房'],0,'move rooms。']],
    writing: [['用 is not working 写“空调坏了”。',['The air conditioning is not working.'],'现在的问题用 is not working。'],['用 Could someone 开头问“今天能请人修一下吗？”',['Could someone fix it today?'],'could 后用 fix。']],
    speaking: [['选择一个住宿问题，说明房号、开始时间，并提出一项请求。','The air conditioning in room 408 is not working. It stopped working last night. Could someone fix it today?','结束前确认处理时间或下一步。']],
    transfer: ['The form is not loading. Could someone check it today?', '同样的说法可用于向同事反馈系统暂时无法使用。']
  },
  {
    id: 'clarifying-rules', prerequisite: 'approval-flow', stage: 'coordinate', scene: '工作',
    title: '澄清需求、条件和例外', goal: '用 if 复述审批规则，核对边界值和例外情况。',
    words: [
      ['rule','规则','Can we confirm the rule?'], ['amount','金额','The amount is exactly five hundred.'],
      ['limit','限额','The limit is five hundred.'], ['above','高于','The amount is above the limit.'],
      ['exactly','正好；恰好','What happens at exactly five hundred?'], ['otherwise','否则','Otherwise, send it to the manager.'],
      ['exception','例外','Is there an exception for urgent requests?'], ['route','转交；路由','The system routes it to HR.']
    ],
    pronunciation: '听金额时留意 above 和 exactly，再把边界值单独复述。正好等于和超过要分清。',
    grammar: [
      ['条件与结果', '用 If + 条件，再接结果。描述每次适用的规则时，两部分都可以用简单现在时。', 'If the amount is above 500, the system routes it to HR.'],
      ['核对边界与例外', 'above 500 表示大于 500。用 What happens if …? 问正好等于或特殊情况下怎么办。', 'What happens if the amount is exactly 500?']
    ],
    passage: ['Sunny: If the amount is above 500, does it go to HR? Alex: Yes. Otherwise, it goes to the manager. Sunny: What happens if the amount is exactly 500? Alex: It goes to the manager. There is no exception for urgent requests.', 'Sunny：如果金额超过 500，就转给 HR 吗？Alex：是的。否则转给经理。Sunny：如果正好 500 呢？Alex：转给经理。紧急申请也没有例外。'],
    grammarQuiz: [
      ['___ the amount is above 500, it goes to HR.',['Then','Because of','If'],2,'if 引出适用条件。'],
      ['above 500 包括哪一个？',['499','500','501'],2,'above 是严格大于。'],
      ['It goes to HR if the amount ___ above 500.',['are','is','be'],1,'amount 为单数，用 is。'],
      ['问“如果没有附件怎么办？”',['What happens if there is no attachment?','What happen there no attachment?','There is no attachment.'],0,'What happens if …? 用于澄清情况。']
    ],
    readingQuiz: [['金额正好 500 时转给谁？',['HR','经理','申请人'],1,'对话明确正好 500 转给经理。'],['紧急申请有例外吗？',['有','没有','没有提及'],1,'There is no exception for urgent requests.']],
    listeningQuiz: [['If the attachment is missing, return the form. Otherwise, send it for approval.','缺附件时怎么做？',['送审','退回表单','批准表单'],1,'return the form。'],['The rule applies to amounts above two hundred.','按这句话，哪个金额适用？',['200','201','199'],1,'above two hundred 表示大于 200。']],
    writing: [['用 If 开头写“如果缺少附件，就退回表单”。',['If the attachment is missing, return the form.'],'if 子句说条件，主句给操作。'],['用 What happens if 问“如果金额正好 500 会怎样？”',['What happens if the amount is exactly 500?','What happens if the amount is exactly five hundred?'],'用 exactly 表示正好等于。']],
    speaking: [['复述一个真实或模拟的审批规则，并提出两个测试边界。','If the amount is above 500, the system routes it to HR. What happens if it is exactly 500? Is there an exception for urgent requests?','把条件、结果和例外分别说清楚。']],
    transfer: ['What happens if my train is delayed?', '旅行时也可以用条件问句确认规则。']
  },
  {
    id: 'missed-connection', prerequisite: 'clarifying-rules', stage: 'coordinate', scene: '旅游',
    title: '行程延误与改签协商', goal: '交代错过衔接的风险，比较可选行程并确认费用。',
    words: [
      ['delay','延误','There is a delay of one hour.'], ['connection','衔接的班次','I may miss my connection.'],
      ['rebook','改订；改签','Can you rebook me on the next flight?'], ['alternative','备选方案','Is there an alternative?'],
      ['direct','直达的','Is there a direct flight?'], ['earlier','更早的','Is there an earlier train?'],
      ['fee','费用','Is there a change fee?'], ['refund','退款','Can I get a refund?']
    ],
    pronunciation: '听懂 earlier 和 later，再核对新行程的日期和时间。询问费用时可以复述总金额。',
    grammar: [
      ['条件下的可能结果', 'If + 现在时描述可能发生的情况，结果可用 will 或 may。may 表示可能。', 'If the flight is delayed, I may miss my connection.'],
      ['比较并提出偏好', 'earlier than 表示比某个时间或方案早。I would prefer … 用来表达偏好。', 'I would prefer the direct flight if there is no extra fee.']
    ],
    passage: ['Traveler: If this flight is delayed another hour, I may miss my connection. Can you rebook me? Agent: There is a direct flight at six and a connecting flight at five. The direct flight has no change fee. Traveler: I would prefer the direct flight.', '旅客：如果这班飞机再晚一小时，我可能赶不上转机。能帮我改签吗？工作人员：六点有直飞，五点有中转航班。直飞不收改签费。旅客：我想选直飞。'],
    grammarQuiz: [
      ['If this flight ___ delayed, I may miss my connection.',['will be','is','are'],1,'这里的 if 条件用一般现在时。'],
      ['I ___ miss my connection. I am not sure.',['may','did','have'],0,'may 表示可能。'],
      ['The five o’clock flight is earlier ___ the six o’clock flight.',['to','that','than'],2,'比较用 earlier than。'],
      ['哪句礼貌表达偏好？',['I would prefer the direct flight.','I prefer than direct.','Direct flight did.'],0,'I would prefer 后接偏好的方案。']
    ],
    readingQuiz: [['几点有直飞？',['五点','六点','七点'],1,'a direct flight at six。'],['旅客最后想选哪一种？',['直飞','中转','退款'],0,'I would prefer the direct flight.']],
    listeningQuiz: [['The earlier train leaves at four, but there is a change fee.','更早的列车有改签费吗？',['没有','有','没有提及'],1,'there is a change fee。'],['If you miss the connection, we can rebook you on the seven o’clock flight.','备选航班几点？',['五点','六点','七点'],2,'the seven o’clock flight。']],
    writing: [['用 If 开头写“如果航班延误，我可能赶不上转机”。',['If the flight is delayed, I may miss my connection.'],'if 从句说条件，may 说明可能结果。'],['用 I would prefer 开头写“我想选直飞航班”。',['I would prefer the direct flight.'],'prefer 后接你的选择。']],
    speaking: [['模拟改签，比较两种方案并确认费用。','Can you rebook me on the next flight? Is there a direct flight? I would prefer the direct flight. Is there a change fee?','补充自己的时间限制，结束时复述最终班次。']],
    transfer: ['If the release is delayed, we may miss the review window.', '工作中也能用条件句提前说明排期风险。']
  },
  {
    id: 'prioritizing-issues', prerequisite: 'approval-flow', stage: 'coordinate', scene: '工作',
    title: '说明影响并协商缺陷优先级', goal: '区分影响和处理顺序，用理由与比较提出处理建议。',
    words: [
      ['impact','影响','What is the impact on employees?'], ['severity','严重程度','The severity is high.'],
      ['priority','优先级','This issue has a higher priority.'], ['block','阻止','It blocks employees from submitting requests.'],
      ['workaround','临时解决方法','There is a workaround.'], ['affect','影响；波及','It affects new employees.'],
      ['release','发布','Can we fix it before the release?'], ['suggest','建议','I suggest fixing it first.']
    ],
    pronunciation: 'severity 和 priority 都有多个音节。描述影响时停在受影响的人群之后，再给建议。',
    grammar: [
      ['建议及理由', 'We should + 动词原形可以提出建议。I suggest + 动词的 -ing 形式也可以表达建议。', 'We should fix it first because it blocks approvals.'],
      ['比较影响', '用 more urgent than 比较紧急程度。说明受影响的人群和是否有临时办法，可以让对方判断优先级。', 'This issue is more urgent than the display issue.']
    ],
    passage: ['The form issue blocks employees from submitting leave requests. There is no workaround. The display issue affects the label, but the form still works. I suggest fixing the form issue first because more people are affected.', '表单缺陷阻止员工提交请假申请，且没有临时解决方法。显示缺陷影响标签，但表单仍可使用。我建议先修表单缺陷，因为影响的人更多。'],
    grammarQuiz: [
      ['We should ___ it before the release.',['fixes','fix','fixed'],1,'should 后用动词原形。'],
      ['I suggest ___ the form issue first.',['fix','to fix','fixing'],2,'suggest 后可接 -ing 形式。'],
      ['This issue is ___ urgent than the label issue.',['more','most','much'],0,'more … than 构成比较。'],
      ['We should fix it first ___ it blocks approvals.',['but','because','than'],1,'because 引出建议的理由。']
    ],
    readingQuiz: [['哪个问题阻止提交？',['表单缺陷','标签显示问题','两个都阻止'],0,'the form issue blocks employees from submitting。'],['为什么先修表单缺陷？',['影响更多人','标签还没翻译','已经发布'],0,'because more people are affected。']],
    listeningQuiz: [['It affects all managers, but there is a workaround.','哪一句符合听到的内容？',['只影响一名经理','影响所有经理，且有临时办法','影响所有经理，但无临时办法'],1,'all managers；there is a workaround。'],['The login issue is more urgent than the display issue.','哪个问题更紧急？',['显示问题','登录问题','一样紧急'],1,'the login issue is more urgent。']],
    writing: [['用 We should 开头写“我们应该先修表单缺陷”。',['We should fix the form issue first.'],'should 后用 fix。'],['用 more urgent than 写“登录问题比显示问题更紧急”。',['The login issue is more urgent than the display issue.'],'用 more urgent than 连接两者。']],
    speaking: [['比较两个 QA 问题，说明影响和临时办法，再建议处理顺序。','The form issue blocks all employees from submitting leave requests. There is no workaround. We should fix it first.','说清影响，再请同事确认优先级。']],
    transfer: ['A direct flight is more convenient than a connecting flight.', '旅游时可以用同样的比较结构说明选择理由。']
  },
  {
    id: 'handover', prerequisite: 'reporting-a-bug', stage: 'coordinate', scene: '工作',
    title: '交接进展与确认下一步', goal: '区分已完成和待完成事项，明确负责人、期限和跟进方式。',
    words: [
      ['handover','交接','Let us review the handover.'], ['completed','完成了；已完成的','I have completed the first round.'],
      ['remaining','剩余的','There are two remaining cases.'], ['owner','负责人','Who is the owner of this task?'],
      ['deadline','截止时间','The deadline is Friday.'], ['verify','核验；验证','Please verify the fix.'],
      ['follow up','跟进','I will follow up tomorrow.'], ['update','更新；进展消息','I will send an update by noon.']
    ],
    pronunciation: 'by Friday 表示最迟到周五，on Friday 表示在周五当天。听到截止时间后把介词和日期一起复述。',
    grammar: [
      ['用完成时报告当前进展', 'have / has + 过去分词可以说明截至现在已经完成的事情。说明确的过去时间时，可用一般过去时。', 'I have completed the first round. I completed it yesterday.'],
      ['明确承诺与期限', 'I will … 可以承诺下一步。by 加时间表示最迟到某时，on 加日期说明在哪天做。', 'I will send an update by Friday.']
    ],
    passage: ['Sunny: I have completed the first round of testing. There are two remaining cases. Alex will verify the fix by Thursday. I will follow up on Friday and send an update by noon. Alex: I will let you know if I find another issue.', 'Sunny：第一轮测试已经完成。还剩两个用例。Alex 最迟周四验证修复。我周五跟进，中午前发一条进展。Alex：如果发现别的问题，我会告诉你。'],
    grammarQuiz: [
      ['I have ___ the first round.',['complete','completed','completing'],1,'have 后接过去分词 completed。'],
      ['I ___ the first round yesterday.',['completed','have completed','complete'],0,'明确说 yesterday 时用一般过去时。'],
      ['I will follow ___ on Friday.',['in','by','up'],2,'follow up 表示跟进。'],
      ['Send the update ___ noon 表示最迟在中午发送。',['on','by','for'],1,'by 表示截止期限。']
    ],
    readingQuiz: [['还剩几个用例？',['两个','三个','四个'],0,'two remaining cases。'],['谁负责验证修复？',['Sunny','Alex','没有指定'],1,'Alex will verify the fix。']],
    listeningQuiz: [['I have finished the retest. I will send the update by Friday.','复测是什么状态？',['计划周五做','已完成','还没开始'],1,'I have finished the retest。'],['Alex will verify the fix by Thursday. I will follow up on Friday.','验证修复最晚到哪天？',['周三','周四','周五'],1,'by Thursday。']],
    writing: [['用 I have 开头写“我已完成第一轮”。',['I have completed the first round.'],'用 have completed 说明已完成。'],['用 I will 写“我最迟周五发一条进展”。',['I will send an update by Friday.'],'by Friday 表示最迟到周五。']],
    speaking: [['做一次简短交接，说出已完成、待处理、负责人和截止时间。','I have completed the first round. Alex will verify the fix by Thursday. I will send an update by Friday.','让对方复述一项行动，确认双方理解一致。']],
    transfer: ['I have checked in. I will meet you at the gate by six.', '和同行者同步进展时，也可以说明已做事项和会合时间。']
  }
];
