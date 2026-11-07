// Each lesson has its own context, collocations, grammar and two transfer forms.
const FurtherUnits = [];
function addPathUnit({ vocabulary, rule, contrast, listening, output, task, turns = [], ...unit }) {
  const words = vocabulary.trim().split('\n').map(line => line.trim().split('|'));
  return FurtherUnits.push({
    ...unit,
    words,
    grammar: [rule, contrast],
    listeningQuiz: [],
    writing: [],
    speaking: [task, ...turns],
    transfer: [task[1], task[2]],
    practice: [['listening', ...listening], ['output', ...output]]
  });
}

addPathUnit({
  id: 'daily-routine', stage: 'arrange', scene: '通用', prerequisite: 'week',
  title: '说清一天的活动与频率', goal: '描述自己或同事一天的习惯，听清先后与频率。',
  vocabulary: `
morning|早晨|in the morning|在早晨
afternoon|下午|in the afternoon|在下午
evening|傍晚；晚上|in the evening|在傍晚
night|夜晚|at night|在夜间
usually|通常|usually leave at eight|通常八点离开
often|经常|often read on the train|经常在火车上看书
sometimes|有时|sometimes eat out|有时在外面吃饭
never|从不|never work at night|从不在晚上工作
wake|醒来|wake up at seven|七点醒来
leave|离开|leave home|离开家
arrive|到达|arrive at the office|到达办公室
start|开始|start work|开始工作
finish|结束|finish work|下班
commute|通勤|commute by train|坐火车通勤
break|休息|take a short break|休息一小会儿
early|早；提前|arrive early|提前到达
late|晚；迟|leave late|很晚才离开
before|在……之前|before breakfast|早餐前
after|在……之后|after work|下班后`,
  pronunciation: '注意 evening 和 afternoon 的重音。听见 usually 或 sometimes 后，接着抓具体动作。',
  passage: ['I usually leave home at eight. I arrive at the office at nine. I often take a short break after lunch. Alex starts work at ten and finishes at six.', '我通常八点离家，九点到办公室。午餐后我经常休息一小会儿。Alex 十点开始工作，六点结束。'],
  rule: ['频率副词的位置','usually、often、sometimes、never 通常放在普通动词前。','I usually leave at eight.'],
  contrast: ['复习第三人称','Alex 作主语时，肯定句用 starts 和 finishes。问习惯时，用 Does Alex start …?。','Alex starts work at ten.'],
  grammarQuiz: [['She often ___ early.',['arrive','arrives','arriving'],1,'she 的肯定句用 arrives。'],['I take a break ___ lunch.',['after','often','arrive'],0,'after lunch 表示午餐后。']],
  readingQuiz: [['我几点到办公室？',['八点','九点','十点'],1,'arrive at the office at nine。'],['Alex 几点结束工作？',['六点','八点','十点'],0,'finishes at six。']],
  listening: [['用数字输入开始工作的整点。',['8'],'starts work at eight。','Kim starts work at eight.'],['用数字输入开始工作的整点。',['10'],'starts work at ten。','Kim starts work at ten.']],
  output: [['用 I usually 写“我通常八点离开”。',['I usually leave at eight.'],'usually 放在 leave 前。'],['用 She often 写“她经常九点到达”。',['She often arrives at nine.'],'often 放在 arrives 前。']],
  task: ['说出你工作日的三个习惯，再问同事几点上班。','I usually leave home at eight. I often take a break after lunch. What time do you start work?','用自己的时间替换示例，再区分自己与同事的动词形式。']
});

addPathUnit({
  id: 'dates-and-deadlines', stage: 'arrange', scene: '工作', prerequisite: 'meeting-time',
  title: '读出日期、时限与序数', goal: '读出 1～31 日，区分某天做和最迟某天前做。',
  vocabulary: `
first|第一|on the first|在一日
second|第二|on the second|在二日
third|第三|on the third|在三日
fourth|第四|on the fourth|在四日
fifth|第五|on the fifth|在五日
eighth|第八|on the eighth|在八日
ninth|第九|on the ninth|在九日
twelfth|第十二|on the twelfth|在十二日
twentieth|第二十|on the twentieth|在二十日
thirtieth|第三十|on the thirtieth|在三十日
date|日期|confirm the date|确认日期
schedule|日程|check the schedule|查看日程
deadline|截止期限|meet the deadline|按时完成
due|到期；应完成的|due by Friday|最迟周五完成
confirm|确认|confirm the date|确认日期
calendar|日历|open the calendar|打开日历
reminder|提醒|set a reminder|设置提醒
midnight|午夜|before midnight|午夜前
noon|正午|by noon|最迟中午
timezone|时区|check the timezone|核对时区`,
  pronunciation: 'fifth 和 twelfth 末尾都有 /θ/。读 21 日时，前面读 twenty，最后读 first。',
  passage: ['Our review is on June 21 at noon. The draft is due by June 20. I set a reminder for June 19. Alex is in another timezone, so I confirm the time with him.', '我们的评审在 6 月 21 日正午。初稿最迟 6 月 20 日交。我设了 6 月 19 日的提醒。Alex 在另一个时区，所以我和他确认时间。'],
  rule: ['日期用序数','1st、2nd、3rd 是 first、second、third。4～19 日中，记住 fifth、eighth、ninth、twelfth，其余常在基数后加 -th。20th 和 30th 是 twentieth、thirtieth。21～29 和 31 日只把末位变成序数。','June 21 is June twenty-first.'],
  contrast: ['on 与 by','on June 21 说明事情发生在哪天，by June 20 说明最迟哪天完成。日期后可接 at noon 指定时刻。','The draft is due by June 20.'],
  grammarQuiz: [['The draft is due ___ Friday. 最迟周五。',['on','in','by'],2,'by 表示最后期限。'],['31st 怎么读？',['thirty-one','thirty-first','thirtieth-one'],1,'末位 one 变 first。']],
  readingQuiz: [['评审是哪天？',['6 月 19 日','6 月 20 日','6 月 21 日'],2,'review is on June 21。'],['提醒设在哪天？',['6 月 19 日','6 月 20 日','6 月 21 日'],0,'a reminder for June 19。']],
  listening: [['用数字输入听到的日期中的日。',['12'],'twelfth 是 12 日。','The draft is due on July twelfth.'],['用数字输入听到的日期中的日。',['31'],'thirty-first 是 31 日。','The draft is due on July thirty-first.']],
  output: [['写“初稿最迟周五交”。',['The draft is due by Friday.'],'by Friday 表示最迟周五。'],['写“评审在周一”。',['The review is on Monday.'],'on Monday 表示在周一。']],
  task: ['告诉同事交付日期和开会日期，再确认时区。','The draft is due by June twentieth. The review is on June twenty-first at noon. Which timezone is that?','用你自己的日期和两个不同的时间点重说一遍。']
});

addPathUnit({
  id: 'shopping-and-paying', stage: 'arrange', scene: '旅游', prerequisite: 'numbers-and-amounts',
  title: '购物、试穿与支付', goal: '问尺码和价格，比较选择并确认支付方式。',
  vocabulary: `
size|尺码|a larger size|更大的尺码
small|小号；小的|a small shirt|一件小号衬衫
medium|中号|a medium size|中号
large|大号；大的|a large jacket|一件大号夹克
shirt|衬衫|try on a shirt|试穿衬衫
jacket|夹克|a blue jacket|一件蓝色夹克
color|颜色|a different color|另一种颜色
fit|合身|it fits well|穿起来很合身
try on|试穿|try on the jacket|试穿那件夹克
fitting room|试衣间|find the fitting room|找试衣间
cash|现金|pay in cash|付现金
change|找零|give change|找零
discount|折扣|ask about a discount|问有没有折扣
total|总额|check the total|核对总价
pay|付款|pay by card|刷卡付款
contactless|非接触式|contactless payment|非接触式支付
receipt|收据|keep the receipt|留好收据
counter|柜台|pay at the counter|到柜台付款`,
  pronunciation: '听价格时注意数字和货币单位。shirt 和 short 的元音不同，可以分别跟读。',
  passage: ['I try on a small jacket, but it is tight. The shop assistant brings a medium one. It fits well. The total is forty dollars. I pay by card and ask for a receipt.', '我试穿了一件小号夹克，有点紧。店员拿来一件中号的，穿起来合身。总价四十美元。我刷卡并索要收据。'],
  rule: ['one 代替前面提过的单数物品','a medium one 里的 one 指前面说过的 jacket。问有没有另一个颜色可用 Do you have this in …?。','Do you have this in blue?'],
  contrast: ['支付搭配','用 by card 表示刷卡，用 in cash 表示付现金。请求收据可用 Can I have a receipt?。','Can I pay by card?'],
  grammarQuiz: [['I need a medium ___.',['one','ones','it'],0,'one 指一件夹克。'],['I pay ___ cash.',['at','in','by'],1,'固定搭配 in cash。']],
  readingQuiz: [['最后哪种尺码合身？',['小号','中号','大号'],1,'the medium one fits well。'],['怎么付款？',['现金','刷卡','没有付款'],1,'pay by card。']],
  listening: [['用数字输入总价。',['40'],'forty 是四十。','The total is forty dollars.'],['用数字输入总价。',['44'],'forty-four 是四十四。','The total is forty-four dollars.']],
  output: [['问“我可以刷卡吗？”',['Can I pay by card?'],'by card。'],['问“我可以付现金吗？”',['Can I pay in cash?'],'in cash。']],
  task: ['试穿不合身，要求另一种尺码，然后付款。','Do you have a larger size? Can I try it on? Can I pay by card?','更换尺码、颜色和支付方式，尝试三轮问答。']
});

addPathUnit({
  id: 'places-and-directions', stage: 'arrange', scene: '旅游', prerequisite: 'getting-around',
  title: '在地图上定位并核对路线', goal: '区分方位关系，听懂两步路线并复述目的地。',
  vocabulary: `
map|地图|look at the map|看地图
corner|拐角|at the corner|在拐角处
crossing|人行横道；交叉处|at the crossing|在人行横道处
junction|路口；交汇处|at the next junction|在下一个路口
street|街道|cross the street|穿过街道
avenue|大道|walk along the avenue|沿着大道走
bridge|桥|cross the bridge|过桥
square|广场|in the main square|在主广场上
block|街区|walk one block|走一个街区
opposite|在……对面|opposite the bank|在银行对面
between|在……之间|between two shops|在两家商店之间
behind|在……后面|behind the station|在车站后面
beside|在……旁边|beside the café|在咖啡店旁边
near|在……附近|near the entrance|在入口附近
past|经过|walk past the bank|走过银行
along|沿着|walk along this road|沿着这条路走
exit|出口|take exit two|从二号出口出去
pharmacy|药店|find a pharmacy|找一家药店
landmark|地标|look for a landmark|找一个地标`,
  pronunciation: '复述路线时重读 first、second、left、right 和地标名称。',
  passage: ['Leave the station through exit two. Walk past the café and turn left at the first crossing. The pharmacy is opposite the bank, between a bookshop and a small café.', '从车站二号出口出去。经过咖啡店，在第一个横道左转。药店在银行对面，夹在一家书店和一家小咖啡店之间。'],
  rule: ['用地标定位','opposite 表示对面，between A and B 表示两处之间，beside 表示紧挨着。','The pharmacy is opposite the bank.'],
  contrast: ['用动词说步骤','Walk past … 表示经过。Turn left at … 表示到某处左转。先说起点，再给方向。','Walk past the café and turn left at the crossing.'],
  grammarQuiz: [['It is between the café ___ the bank.',['and','with','past'],0,'between A and B。'],['Walk ___ the bank. 经过银行。',['between','opposite','past'],2,'past 表示经过。']],
  readingQuiz: [['从哪个出口走？',['一号','二号','三号'],1,'through exit two。'],['药店和银行的位置关系？',['对面','后面','同一处'],0,'opposite the bank。']],
  listening: [['用英文输入转向。',['left'],'turn left。','Turn left at the first crossing.'],['用英文输入转向。',['right'],'turn right。','Turn right at the second crossing.']],
  output: [['写“药店在银行对面”。',['The pharmacy is opposite the bank.'],'opposite 后直接接地点。'],['写“咖啡店在银行旁边”，用 beside。',['The café is beside the bank.','The cafe is beside the bank.'],'beside 表示紧挨着。']],
  task: ['给第一次来的人指路，请对方复述出口和转弯点。','Take exit two. Walk past the café. Turn left at the first crossing.','换一个出口、方向和地标，确认三项信息。']
});

addPathUnit({
  id:'work-yesterday', stage:'handle', scene:'工作', prerequisite:'daily-routine',
  title:'回顾昨天的任务', goal:'区分现在和过去，说明完成了什么、什么没做。',
  vocabulary:`
yesterday|昨天|yesterday morning|昨天早上
ago|以前|two days ago|两天前
last|上一个；上次的|last week|上周
log|日志|check the log|查看日志
record|记录|record a result|记录结果
run|运行|run a test|运行一次测试
find|发现；找到|find a mismatch|发现一处不一致
fix|修复|fix the issue|修复问题
save|保存|save the file|保存文件
open|打开|open the page|打开页面
close|关闭|close the window|关闭窗口
update|更新|update the report|更新报告
send|发送|send the result|发送结果
receive|收到|receive a message|收到一条消息
complete|完成|complete a task|完成一项任务
compare|对比|compare the two results|对比两份结果
checklist|检查清单|follow the checklist|按清单逐项检查
mismatch|不一致|find a mismatch|发现一处不一致`,
  pronunciation:'过去式 -ed 的尾音不总是一个音节。听 checked、saved、started 的差别。',
  passage:['Yesterday I ran two tests. I found a mismatch and saved the log. I sent the result to Alex. I did not update the checklist.','昨天我跑了两次测试，发现一处不一致并保存了日志。我把结果发给 Alex。检查清单没有更新。'],
  rule:['过去发生的事','规则动词常加 -ed。run → ran、find → found、send → sent 是不规则变化。','I ran two tests yesterday.'],
  contrast:['过去时提问和否定','Did 或 did not 后用原形。','Did you send the result?'],
  grammarQuiz:[['I ___ two tests yesterday.',['run','ran','runs'],1,'yesterday 需要过去时。'],['I did not ___ the report.',['updated','updates','update'],2,'did not 后用原形。']],
  readingQuiz:[['保存了什么？',['日志','会议纪要','航班信息'],0,'saved the log。'],['哪件事没有做？',['发送结果','更新清单','运行测试'],1,'did not update the checklist。']],
  listening:[['输入听到的测试次数（数字）。',['3'],'ran three tests。','I ran three tests yesterday.'],['输入听到的测试次数（数字）。',['6'],'ran six tests。','I ran six tests yesterday.']],
  output:[['写“我昨天保存了日志”。',['I saved the log yesterday.'],'save → saved。'],['写“我昨天发送了结果”。',['I sent the result yesterday.'],'send → sent。']],
  task:['用过去时报告昨天的两件事，再说一件没做的事。','I ran two tests and saved the log. I did not update the checklist.','把示例换成自己的工作。']
});

addPathUnit({
  id:'reproduce-a-defect', stage:'handle', scene:'工作', prerequisite:'reporting-a-bug',
  title:'说明复现条件和关键步骤', goal:'说清环境、数据、步骤和预期实际差异。',
  vocabulary:`
reproduce|复现|reproduce the defect|复现缺陷
defect|缺陷|report a defect|报告一个缺陷
environment|环境|in the test environment|在测试环境中
browser|浏览器|switch browsers|切换浏览器
version|版本|check the version|检查版本
account|账户|use a test account|使用测试账户
input|输入|enter the input|输入测试数据
submit|提交|submit the request|提交申请
refresh|刷新|refresh the page|刷新页面
error|错误|display an error|显示错误
message|消息|read the error message|阅读错误提示
expected|预期的|expected result|预期结果
actual|实际的|actual result|实际结果
screenshot|截图|attach a screenshot|附上一张截图
recording|录屏；录音|send a screen recording|发送一段录屏
step|步骤|follow these steps|按这些步骤操作
consistent|稳定一致的|consistent behavior|一致的行为
intermittent|间歇出现的|an intermittent failure|间歇性故障
trace|追踪记录|check the trace|检查追踪记录
timestamp|时间戳|include a timestamp|附上时间戳`,
  pronunciation:'expected 的重音在第二音节，actual 的重音在第一音节。',
  passage:['The defect occurs in the test environment on version 4. Sign in with a test account and submit a request. The page should show a confirmation, but it displays an error. I attached the log and a screenshot.','缺陷发生在测试环境的第 4 版。用测试账户登录后提交申请。页面应显示确认信息，实际显示错误。我附了日志和截图。'],
  rule:['用祈使句列步骤','用 Sign in、Open、Submit 直接给操作步骤。说明版本、账户和输入数据。','Sign in and submit a request.'],
  contrast:['用 should 对比预期','should 后用原形。用 but 引出实际结果。','It should show a confirmation, but it displays an error.'],
  grammarQuiz:[['It should ___ a confirmation.',['shows','show','showed'],1,'should 后用原形。'],['哪句适合写复现步骤？',['Submit the request.','It submits yesterday.','The request should submitted.'],0,'Submit 开头直接说明操作。']],
  readingQuiz:[['使用哪种账户？',['测试账户','访客账户','管理员账户'],0,'with a test account。'],['实际出现什么？',['确认','空白页','错误'],2,'it displays an error。']],
  listening:[['用数字输入听到的版本号。',['4'],'version four。','I reproduced it on version four.'],['用数字输入听到的版本号。',['7'],'version seven。','I reproduced it on version seven.']],
  output:[['用 should 写“页面应显示确认信息”。',['The page should show a confirmation.'],'should show。'],['用 should 写“系统应保存申请”。',['The system should save the request.'],'should save。']],
  task:['同事无法复现，补充环境和步骤，再说预期与实际。','Use a test account on version four. Submit a request. The page should show a confirmation, but it displays an error.','再说明你的测试数据和发生时间。']
});

addPathUnit({
  id:'lost-property', stage:'handle', scene:'旅游', prerequisite:'work-yesterday',
  title:'报告遗失物品', goal:'说明物品特征、最后看到的地点和时间，留下联系方式。',
  vocabulary:`
lose|丢失|lose a wallet|丢了一个钱包
wallet|钱包|a brown wallet|一个棕色钱包
backpack|双肩包|carry a backpack|背着双肩包
pocket|口袋|in the front pocket|在前面的口袋里
zipper|拉链|a broken zipper|坏了的拉链
label|标签|a name label|姓名标签
strap|带子|a long strap|一条长带子
owner|物主|contact the owner|联系物主
belong|属于|belong to me|属于我
lost property|失物|the lost property office|失物招领处
describe|描述|describe the bag|描述这个包
recognize|认出|recognize the wallet|认出钱包
notice|注意到|notice a missing item|发现有东西丢了
remember|记得|remember the seat number|记得座位号
seat|座位|under the seat|在座位下面
route|线路|check the bus route|查看公交线路
contact details|联系方式|leave contact details|留下联系方式
retrieve|取回|retrieve the bag|取回这个包`,
  pronunciation:'听 seat 与 sit 的元音区别，复述座位编号和物品颜色。',
  passage:['I lost a black backpack on the bus this morning. I last saw it under seat twelve. It has a red strap and a name label. I left my contact details at the lost property office.','我今天上午在公交车上丢了黑色背包，最后一次看到它是在 12 号座位下面。包上有红色带子和姓名标签。我在失物处留下了联系方式。'],
  rule:['最后一次看到的时间','用 I last saw it … 说明最后位置或时间。lost 是 lose 的过去式，saw 是 see 的过去式。','I last saw it under seat twelve.'],
  contrast:['现在仍然存在的特征','描述物品特征用 has。用 It belongs to me 说明归属。','It has a red strap.'],
  grammarQuiz:[['I ___ my wallet yesterday.',['lose','lost','loses'],1,'过去时用 lost。'],['It ___ a red strap.',['have','has','having'],1,'it 配 has。']],
  readingQuiz:[['在哪里最后看到包？',['车站门口','座位下','咖啡店'],1,'under seat twelve。'],['带子是什么颜色？',['黑色','蓝色','红色'],2,'a red strap。']],
  listening:[['用数字输入座位号。',['12'],'seat twelve。','I last saw it under seat twelve.'],['用数字输入座位号。',['23'],'seat twenty-three。','I last saw it under seat twenty-three.']],
  output:[['写“我昨天丢了钱包”。',['I lost my wallet yesterday.'],'lose 的过去式是 lost。'],['写“我昨天丢了背包”。',['I lost my backpack yesterday.'],'lose 的过去式是 lost。']],
  task:['向失物处描述一件物品、特征和最后出现地点。','I lost a black backpack. It has a red strap. I last saw it under seat twelve.','换颜色、交通工具和座位号。']
});

addPathUnit({
  id:'while-it-happened', stage:'handle', scene:'通用', prerequisite:'work-yesterday',
  title:'说明当时正在做什么', goal:'用过去进行时交代背景，用一般过去时说明突然发生的事。',
  vocabulary:`
while|当……正在……时|while I was waiting|我正在等的时候
when|当……时|when the screen went blank|屏幕变空白时
suddenly|突然|suddenly stop|突然停止
during|在……期间|during the trip|在旅途中
happen|发生|what happened|发生了什么
wait|等候|wait for the train|等火车
load|加载|load the page|加载页面
freeze|卡住；冻结|the screen freezes|屏幕卡住了
crash|崩溃|the app crashed|应用崩溃了
blank|空白的|a blank screen|空白屏幕
restart|重启|restart the device|重启设备
connection|连接|lose the connection|连接断开
signal|信号|a weak signal|信号较弱
interrupt|打断|interrupt the upload|打断上传
continue|继续|continue the test|继续测试
upload|上传|upload a file|上传文件
network|网络|check the network|检查网络
device|设备|restart the device|重启设备`,
  pronunciation:'was / were 在连贯语流里可能轻读，注意后面的 -ing 动词和事件动词。',
  passage:['I was uploading a file when the screen went blank. While Alex was checking the network, I restarted the device. After that, the page loaded again.','我正在上传文件时屏幕变成空白。Alex 检查网络时，我重启了设备。之后页面重新加载了。'],
  rule:['过去正在进行的背景','was / were + 动词-ing 表示过去某时正在进行的动作。','I was uploading a file.'],
  contrast:['背景和事件并列','when 引出突然发生的事件时，常用一般过去时。while 可引出持续背景。','I was uploading a file when the screen went blank.'],
  grammarQuiz:[['I was ___ a file.',['upload','uploading','uploaded'],1,'was + uploading。'],['The screen ___ blank when I clicked the button.',['went','going','go'],0,'went 表示突然发生的事件。']],
  readingQuiz:[['当时正在做什么？',['上传文件','下载报告','关闭设备'],0,'was uploading a file。'],['谁检查网络？',['Sunny','Alex','都没有'],1,'Alex was checking the network。']],
  listening:[['输入听到的 -ing 动作。',['uploading'],'was uploading。','I was uploading a file when the app crashed.'],['输入听到的 -ing 动作。',['waiting'],'was waiting。','I was waiting for the train when my phone froze.']],
  output:[['写“我当时正在上传文件”。',['I was uploading a file.'],'was + uploading。'],['写“我当时正在等火车”。',['I was waiting for the train.'],'was + waiting。']],
  task:['回想一次故障，先说背景再说发生的事情。','I was uploading a file when the screen went blank.','换成候车、付款或登录的背景。']
});

addPathUnit({
  id:'exchange-a-purchase', stage:'handle', scene:'旅游', prerequisite:'shopping-and-paying',
  title:'带着收据申请换货', goal:'说明购买时间与物品问题，并提出清楚的换货请求。',
  vocabulary:`
exchange|换货|exchange this item|换这件商品
refund|退款|ask for a refund|要求退款
return|退回；退货|return the jacket|退掉这件夹克
item|商品；物品|a damaged item|一件破损的商品
damaged|破损的|a damaged zipper|损坏的拉链
faulty|有故障的|a faulty charger|故障充电器
charger|充电器|a phone charger|手机充电器
packaging|包装|keep the packaging|保留包装
original|原来的|original packaging|原包装
purchase|购买；所购物品|proof of purchase|购买凭证
replace|更换|replace the charger|更换充电器
replacement|替换品|offer a replacement|提供一件替换品
refund method|退款方式|confirm the refund method|确认退款方式
receipt number|收据编号|read the receipt number|读出收据编号
unused|未使用的|an unused item|未使用的商品
wrong|错误的|the wrong size|错误的尺码
tear|破口；撕裂|a tear in the sleeve|袖子上的破口
sleeve|袖子|a damaged sleeve|破损的袖子`,
  pronunciation:'refund 作名词时常重读前一音节。说清楚希望换货还是退款。',
  passage:['I bought this jacket yesterday. There is a tear in the sleeve. I brought the receipt and the original packaging. I would like to exchange it for the same size.','我昨天买了这件夹克，袖子有个破口。我带来了收据和原包装，想换同样尺码的一件。'],
  rule:['购买经过用过去时','buy → bought，bring → brought。用 yesterday 或 last week 说明时间。','I bought it yesterday.'],
  contrast:['说明希望如何处理','I would like to + 动词原形。用 exchange A for B 表示用 A 换 B。','I would like to exchange it for the same size.'],
  grammarQuiz:[['I ___ this charger yesterday.',['buy','bought','buys'],1,'buy 的过去式是 bought。'],['I would like ___ exchange it.',['to','for','at'],0,'would like to do。']],
  readingQuiz:[['哪里破了？',['袖子','包装','收据'],0,'a tear in the sleeve。'],['想换什么？',['更小的','同样尺码','现金'],1,'the same size。']],
  listening:[['用英文输入对方提出的处理方式（exchange 或 refund）。',['exchange'],'offer an exchange。','We can offer an exchange.'],['用英文输入对方提出的处理方式（exchange 或 refund）。',['refund'],'offer a refund。','We can offer a refund.']],
  output:[['写“我昨天买了这件夹克”。',['I bought this jacket yesterday.'],'buy → bought。'],['写“我昨天买了这个充电器”。',['I bought this charger yesterday.'],'buy → bought。']],
  task:['向店员说明何时购买、物品哪里坏了、希望怎么处理。','I bought this jacket yesterday. There is a tear in the sleeve. I would like to exchange it.','换成充电器故障，尝试提出退款请求。']
});

addPathUnit({
  id:'future-travel-plans',stage:'rules',scene:'旅游',prerequisite:'places-and-directions',
  title:'说明行程计划和临时决定',goal:'区分已有计划与当下决定，复述行程和备用安排。',
  vocabulary:`
plan|计划|make a plan|制订计划
itinerary|行程单|check the itinerary|查看行程单
visit|参观|visit the museum|参观博物馆
stay|住宿；停留|stay for two nights|住两晚
depart|出发（动词）|depart at noon|正午出发
departure|出发（名词）|departure time|出发时间
arrival|到达|arrival time|到达时间
transfer|换乘；接送|arrange a transfer|安排接送
destination|目的地|reach the destination|抵达目的地
reserve|预订|reserve a seat|预订座位
overnight|过夜的|an overnight stay|住一晚
round trip|往返行程|book a round trip|预订往返行程
one-way|单程的|a one-way ticket|一张单程票
flexible|灵活的|a flexible schedule|灵活的日程
backup|备用的|a backup plan|备用方案
book|预订|book a room|预订房间
later|稍后|call back later|晚一点回电话
tomorrow|明天|leave tomorrow|明天离开`,
  pronunciation:'把时间和目的地分开说。听见 going to 后，抓后面的主要动作。',
  passage:['We are going to visit the museum tomorrow. Our train departs at nine. The museum is closed in the morning, so we will visit the park first.','我们原计划明天参观博物馆。火车九点出发。博物馆上午不开放，所以我们决定先去公园。'],
  rule:['已有安排','be going to + 原形可表达已有计划。','We are going to visit the museum.'],
  contrast:['当下决定与时刻表','will 可表达当下的决定，固定时刻表可用一般现在时。','The train departs at nine. We will visit the park first.'],
  grammarQuiz:[['We are going ___ stay two nights.',['to','at','for'],0,'going to + stay。'],['I will ___ a room.',['book','books','booked'],0,'will 后用原形。']],
  readingQuiz:[['火车何时出发？',['八点','九点','十点'],1,'departs at nine。'],['决定先去哪？',['博物馆','机场','公园'],2,'visit the park first。']],
  listening:[['输入停留的晚数。',['2'],'two nights。','We are going to stay for two nights.'],['输入停留的晚数。',['4'],'four nights。','We are going to stay for four nights.']],
  output:[['用 going to 写“我们计划明天离开”。',['We are going to leave tomorrow.'],'are going to + leave。'],['用 going to 写“我们计划明天预订房间”。',['We are going to book a room tomorrow.'],'are going to + book。']],
  task:['说出原行程，遇到景点关闭后提出备用安排。','We are going to visit the museum. It is closed in the morning, so we will visit the park first.','换成你自己的交通时间和景点。']
});

addPathUnit({
  id:'permissions-and-access',stage:'rules',scene:'工作',prerequisite:'approval-flow',
  title:'说明权限、角色与例外',goal:'区分必须、可以和禁止，核对哪些角色能访问哪些信息。',
  vocabulary:`
permission|权限|grant permission|授予权限
access|访问权|request access|申请访问权限
role|角色|assign a role|分配角色
administrator|管理员|contact the administrator|联系管理员
viewer|查看者|add a viewer|添加一名查看者
editor|编辑者|assign an editor|指定一名编辑者
grant|授予|grant access|授予访问权限
deny|拒绝|deny access|拒绝访问
restrict|限制|restrict editing|限制编辑
authorize|授权|authorize a request|授权一项申请
private|私密的|a private record|私密记录
public|公开的|a public page|公开页面
only|仅限|only administrators|仅限管理员
required|必需的|a required field|必填字段
optional|可选的|an optional field|选填字段
exception|例外|an approved exception|获批的例外
policy|规则；政策|check the policy|查看规则
credential|凭据|protect credentials|保护凭据
audit|审计|an audit log|审计日志`,
  pronunciation:'区分 must 与 must not。复述时把具体角色和动作一起说出来。',
  passage:['Viewers can read records but cannot edit them. Editors can update records. Only administrators can grant access. Editors must add a reason before changing a private record.','查看者可读记录但不能编辑。编辑者可更新记录。只有管理员能授予权限。编辑者修改私密记录前必须填写原因。'],
  rule:['区分许可和义务','can 表示许可，cannot 或 must not 表示不允许，must 表示必须。','Editors must add a reason.'],
  contrast:['把规则限制到角色','Only + 角色 表示只有该角色可以做某事。','Only administrators can grant access.'],
  grammarQuiz:[['只有管理员可以授予访问权。',['Only administrators can grant access.','Administrators cannot grant access.','All viewers can grant access.'],0,'only 限定角色。'],['Editors must ___ a reason.',['adds','added','add'],2,'must 后用原形。']],
  readingQuiz:[['谁可以授予访问权限？',['查看者','编辑者','管理员'],2,'Only administrators。'],['编辑私密记录前要做什么？',['删除记录','填写原因','更改角色'],1,'add a reason。']],
  listening:[['用英文输入允许操作的角色（复数）。',['editors'],'only editors。','Only editors can update the record.'],['用英文输入允许操作的角色（复数）。',['administrators'],'only administrators。','Only administrators can update the record.']],
  output:[['写“查看者不能编辑记录”，用 cannot。',['Viewers cannot edit records.'],'cannot + edit。'],['写“编辑者必须填写原因”。',['Editors must add a reason.'],'must + add。']],
  task:['给开发同事说明两个角色的权限，再问一种例外。','Viewers can read records. Editors can update them. Can a viewer edit a record in any case?','换成你熟悉的 HR 系统角色。']
});

addPathUnit({
  id:'amount-and-boundaries',stage:'rules',scene:'工作',prerequisite:'clarifying-rules',
  title:'说明数量限制和边界值',goal:'核对最少、最多、超过和包含端点的条件。',
  vocabulary:`
minimum|最小值|the minimum amount|最小金额
maximum|最大值|the maximum amount|最大金额
limit|限制|set a limit|设置上限
threshold|阈值|reach the threshold|达到阈值
exactly|正好|exactly ten|正好十个
at least|至少|at least five|至少五个
at most|至多|at most ten|至多十个
up to|最多到|up to ten items|最多十件
fewer|更少的（可数）|fewer than five requests|少于五份申请
less|更少的（量）|less than ten dollars|不到十美元
above|高于|above the limit|超过上限
below|低于|below the minimum|低于最小值
inclusive|包含端点的|inclusive range|包含端点的范围
exclusive|不含端点的|exclusive limit|不包含端点的限制
range|范围|within the range|在范围内
quantity|数量|enter the quantity|输入数量
boundary|边界|test the boundary|测试边界
reject|拒绝；拦截|reject an invalid value|拒绝无效值
valid|有效的|a valid quantity|有效数量`,
  pronunciation:'听到 at least 和 at most 时，把数字和限制一起复述。',
  passage:['The form accepts at least one item and at most ten items. A quantity of ten is valid. If the quantity is above ten, the form rejects it.','表单接受至少一件、最多十件。十件有效。若数量超过十件，表单会拦截。'],
  rule:['比较词决定是否包含端点','at least five 包含五，more than five 不包含五。at most ten 包含十。','The form accepts at most ten items.'],
  contrast:['用 if 说明边界行为','先说条件，再说系统行为。','If the quantity is above ten, the form rejects it.'],
  grammarQuiz:[['at most ten 包含哪个值？',['11','10','12'],1,'最多十件，包含十。'],['If it ___ the limit, show a warning.',['exceed','exceeds','exceeded'],1,'一般现在时，it 配 exceeds。']],
  readingQuiz:[['数量为十是否有效？',['有效','无效','没有说明'],0,'A quantity of ten is valid。'],['超过十件会怎样？',['允许','拦截','自动改成十'],1,'the form rejects it。']],
  listening:[['用数字输入听到的上限。',['10'],'at most ten。','The form accepts at most ten items.'],['用数字输入听到的上限。',['8'],'at most eight。','The form accepts at most eight items.']],
  output:[['写“最多十件”，用 The limit is 开头。',['The limit is ten items.'],'limit + 数量。'],['写“数量为十是有效的”。',['A quantity of ten is valid.'],'A quantity of ten 是单数主语。']],
  task:['说明一个规则，分别问低于、等于和超过上限时会怎样。','The form accepts at most ten items. Is ten valid? What happens if I enter eleven?','把边界换成你自己的测试数据。']
});

addPathUnit({
  id:'baggage-and-options',stage:'rules',scene:'旅游',prerequisite:'airport-check-in',
  title:'询问行李限制与备选方案',goal:'从柜台答复里抓住重量、费用和可以选择的动作。',
  vocabulary:`
baggage|行李（总称）|check baggage|托运行李
carry-on|随身行李|one carry-on|一件随身行李
suitcase|行李箱|weigh a suitcase|给行李箱称重
weight|重量|a weight limit|重量限制
kilogram|千克|twenty kilograms|二十千克
weigh|称重；重达|weigh the bag|给这个包称重
extra|额外的|an extra bag|额外的一件行李
allowance|允许额度|a baggage allowance|行李额度
overweight|超重的|an overweight bag|一件超重行李
fee|费用|pay a fee|支付费用
include|包括|include one bag|包含一件行李
exclude|不包括|exclude extra bags|不包含额外行李
option|选项|choose an option|选一个方案
repack|重新打包|repack the suitcase|重新打包行李箱
remove|取出|remove a few items|取出几件东西
charge|收费|charge an extra fee|额外收费
scale|秤|put the bag on the scale|把包放在秤上
personal item|随身小件|one personal item|一件随身小件`,
  pronunciation:'kilogram 的重音靠前。听柜台说 limit、fee 后记下数值，再复述。',
  passage:['My ticket includes one checked bag. The bag weighs twenty-two kilograms. The agent says the limit for this ticket is twenty. I can repack the bag or pay an extra fee.','我的这张票包含一件托运行李。行李重二十二千克。柜台说这张票的上限是二十千克。我可以重新打包，也可以付额外费用。'],
  rule:['不可数的 baggage','baggage 表示行李总称，数件用 bag 或 piece of baggage。','My ticket includes one checked bag.'],
  contrast:['提出两个选项','or 连接两个可选动作。用 Can I …? 追问是否可以选择。','Can I repack the bag or pay an extra fee?'],
  grammarQuiz:[['one checked ___',['baggages','bag','bags'],1,'一件用 one bag。'],['I can repack ___ pay a fee.',['but','while','or'],2,'or 表示两种选择。']],
  readingQuiz:[['这张票的重量上限？',['20 千克','22 千克','25 千克'],0,'the limit for this ticket is twenty。'],['可以选择什么？',['重打包或付费','退款或改日期','只能离开'],0,'repack or pay。']],
  listening:[['用数字输入这张票的重量上限。',['20'],'twenty kilograms。','Your baggage limit is twenty kilograms.'],['用数字输入这张票的重量上限。',['23'],'twenty-three kilograms。','Your baggage limit is twenty-three kilograms.']],
  output:[['问“我可以重新打包吗？”',['Can I repack the bag?'],'Can I + repack。'],['问“我可以支付额外费用吗？”',['Can I pay an extra fee?'],'Can I + pay。']],
  task:['听到行李超重后，核对上限，再选择重新打包或询问费用。','What is the weight limit for this ticket? Can I repack my bag? How much is the extra fee?','以对话里对方给出的条件为准，复述你的选择。']
});

addPathUnit({
  id:'test-scope',stage:'rules',scene:'工作',prerequisite:'permissions-and-access',
  title:'确认测试范围和排除项',goal:'明确本轮要测的内容、暂缓项和进入下一步的条件。',
  vocabulary:`
scope|范围|define the scope|界定范围
requirement|需求|review a requirement|审阅一条需求
feature|功能|test the feature|测试这项功能
module|模块|the payroll module|薪资模块
scenario|场景|a test scenario|一个测试场景
coverage|覆盖范围|check the coverage|检查覆盖范围
exclude|排除|exclude the old page|排除旧页面
include|包含|include the new form|纳入新表单
assumption|假设|state the assumption|说明假设
constraint|约束|a time constraint|时间限制
dependency|依赖项|a test dependency|测试依赖项
environment|环境|prepare the environment|准备测试环境
eligible|符合条件的|an eligible request|一份符合条件的申请
condition|条件|meet a condition|满足条件
criterion|标准|a pass criterion|通过标准
baseline|基线|compare with the baseline|与基线对比
scope change|范围变更|discuss a scope change|讨论范围变更
defer|推迟|defer a scenario|推迟某个场景的测试`,
  pronunciation:'scope 的尾音 /p/ 与 scoped 的 /pt/ 不同。听清 included 和 excluded 的开头。',
  passage:['This round includes the new request form and the approval page. It excludes the old report. We can start when the test account is ready. If the scope changes, we will update the checklist.','本轮包含新申请表和审批页，排除旧报表。测试账户就绪后可以开始。如果范围变更，我们会更新清单。'],
  rule:['用 include / exclude 列范围','This round includes … 或 excludes …，用同一种句型并排说明。','This round excludes the old report.'],
  contrast:['用 if 约定未来动作','if 从句用一般现在时，主句可用 will。','If the scope changes, we will update the checklist.'],
  grammarQuiz:[['If the scope ___, we will update it.',['changes','will change','changing'],0,'if 条件从句常用现在时。'],['This round ___ the old report. 表示排除。',['includes','excludes','requires'],1,'exclude 表示排除。']],
  readingQuiz:[['本轮测哪个表单？',['旧报表','新申请表','都不测'],1,'includes the new request form。'],['什么时候可以开始？',['账户就绪','周五','范围扩大'],0,'when the test account is ready。']],
  listening:[['输入听到的范围动作（includes 或 excludes）。',['includes'],'includes。','This round includes the payroll module.'],['输入听到的范围动作（includes 或 excludes）。',['excludes'],'excludes。','This round excludes the payroll module.']],
  output:[['写“本轮包括审批页”。',['This round includes the approval page.'],'round 配 includes。'],['写“本轮排除旧报表”。',['This round excludes the old report.'],'round 配 excludes。']],
  task:['列出两项本轮测试、一项排除项和一个开始条件。','This round includes the request form and the approval page. It excludes the old report. We can start when the account is ready.','把内容换成你当前项目。']
});

addPathUnit({
  id:'compare-travel-options',stage:'negotiate',scene:'旅游',prerequisite:'future-travel-plans',
  title:'比较路线与取舍',goal:'比较时间、价格和便利程度，解释自己的选择。',
  vocabulary:`
compare|比较|compare two routes|比较两条路线
convenient|方便的|a convenient route|一条方便的路线
direct|直达的|a direct train|一趟直达列车
indirect|非直达的|an indirect route|一条需要中转的路线
cheap|便宜的|a cheap ticket|一张便宜的票
expensive|昂贵的|an expensive hotel|一家价格高的酒店
fast|快的|a fast train|一趟快车
slow|慢的|a slow bus|一辆速度慢的巴士
comfortable|舒服的|a comfortable seat|一个舒适的座位
crowded|拥挤的|a crowded train|一趟拥挤的列车
distance|距离|a short distance|一小段距离
duration|持续时间|the duration of the trip|行程耗时
fare|车费|compare fares|比较车费
budget|预算|within the budget|在预算内
prefer|更喜欢|prefer the train|更喜欢坐火车
trade-off|取舍|a trade-off between time and cost|在时间和费用之间取舍
worth|值得|worth the extra cost|值得多花这笔钱
alternative|备选方案|a cheaper alternative|一个更便宜的方案`,
  pronunciation:'比较句重读 cheaper、faster、more convenient，并听清 than 后的参照物。',
  passage:['The bus is cheaper than the train, but it takes two hours longer. The train is direct and more convenient. I prefer the train because I need to arrive before noon.','大巴比火车便宜，但多花两小时。火车直达，也更方便。我更想坐火车，因为我需要中午前到。'],
  rule:['两种比较形式','短形容词常用 -er + than，较长形容词常用 more + 形容词 + than。','The bus is cheaper than the train.'],
  contrast:['用 because 说明取舍','先说 prefer A，再用 because 给出实际原因。','I prefer the train because it is direct.'],
  grammarQuiz:[['The train is ___ than the bus.',['fast','faster','fastest'],1,'faster than。'],['This route is ___ convenient.',['more','many','muchest'],0,'more convenient。']],
  readingQuiz:[['便宜的是哪个？',['大巴','火车','一样'],0,'The bus is cheaper。'],['为什么选火车？',['中午前需到达','座位更大','无需买票'],0,'need to arrive before noon。']],
  listening:[['输入听到的更快的交通工具。',['train'],'the train is faster。','The train is faster than the bus.'],['输入听到的更便宜的交通工具。',['bus'],'the bus is cheaper。','The bus is cheaper than the train.']],
  output:[['写“大巴比火车便宜”。',['The bus is cheaper than the train.'],'cheaper than。'],['写“火车比大巴快”。',['The train is faster than the bus.'],'faster than。']],
  task:['比较两种交通方式，并解释你为什么选其中一个。','The bus is cheaper, but the train is faster. I prefer the train because I need to arrive before noon.','换成两家酒店或两趟航班。']
});

addPathUnit({
  id:'passive-status-updates',stage:'negotiate',scene:'工作',prerequisite:'approval-flow',
  title:'从事项本身说明审批和处理状态',goal:'用被动句说明谁做了什么，区分流程规则与已发生动作。',
  vocabulary:`
approve|批准|approve a request|批准一份申请
reviewer|审核人|contact the reviewer|联系审核人
approver|审批人|assign an approver|指定审批人
review|审核|review a document|审核一份文件
process|处理；流程|process an application|处理一份申请
assign|分配|assign a ticket|分配一张工单
route|转交|route it to HR|把它转交给人力部门
notify|通知|notify the requester|通知申请人
archive|归档|archive the record|归档记录
retain|保留|retain the history|保留历史记录
flag|标记|flag a duplicate|标记一个重复项
duplicate|重复项|remove a duplicate|移除一个重复项
requester|申请人|notify the requester|通知申请人
automatically|自动地|send it automatically|自动发送
manually|手动地|update it manually|手动更新
attachment|附件|include an attachment|附上一个附件
submission|提交件|review a submission|审核一份提交件
approval chain|审批链|check the approval chain|检查审批链`,
  pronunciation:'读 is reviewed 和 was reviewed 时，要让时态词 is / was 可辨认。',
  passage:['Every request is reviewed by HR. The attachment is stored automatically. This request was approved yesterday. The requester was notified by email.','每份申请由人力审核，附件自动保存。这份申请昨天已获批准，申请人已通过邮件收到通知。'],
  rule:['被动语态的结构','be + 过去分词。用 is / are 描述流程，用 was / were 描述过去动作。','The request was approved yesterday.'],
  contrast:['按需说明执行者','需要时用 by + 执行者。by email 描述通知方式。','Every request is reviewed by HR.'],
  grammarQuiz:[['The request was ___ yesterday.',['approve','approved','approves'],1,'was + approved。'],['The files ___ stored automatically.',['is','are','be'],1,'files 是复数。']],
  readingQuiz:[['谁审核申请？',['HR','申请人','无人审核'],0,'reviewed by HR。'],['用什么方式通知？',['电话','邮件','口头'],1,'by email。']],
  listening:[['输入听到的处理动作（approved 或 rejected）。',['approved'],'was approved。','The request was approved yesterday.'],['输入听到的处理动作（approved 或 rejected）。',['rejected'],'was rejected。','The request was rejected yesterday.']],
  output:[['写“这份申请昨天已被批准”。',['The request was approved yesterday.'],'was + approved。'],['写“附件会自动保存”，用一般现在时。',['The attachment is stored automatically.'],'is + stored。']],
  task:['解释审批流程，再报告一个昨天处理的申请。','Every request is reviewed by HR. This request was approved yesterday.','换成报销单，说明谁处理、何时处理。']
});

addPathUnit({
  id:'hotel-booking-mismatch',stage:'negotiate',scene:'旅游',prerequisite:'hotel-arrival',
  title:'处理酒店找不到预订',goal:'给出订单证据，追问核对结果并协商替代房型。',
  vocabulary:`
booking|预订|check the booking|核对预订
confirmation|确认信息|show the confirmation|出示确认信息
reference|编号；参考|a booking reference|一个预订编号
reservation|预订记录|find a reservation|找到一份预订记录
platform|平台|the booking platform|预订平台
guest|住客|the guest name|住客姓名
surname|姓|under my surname|用我的姓预订的
spelling|拼写|confirm the spelling|确认拼写
twin room|双床房|book a twin room|预订双床房
double room|大床房|offer a double room|提供大床房
available|有空房的；可用的|a room is available|有空房
sold out|售罄|the hotel is sold out|酒店已满房
upgrade|升级|offer a free upgrade|提供免费升级
rate|房价|at the same rate|按同样的房价
deposit|押金|pay a deposit|支付押金
confirm|确认|confirm the reservation|确认预订
search|查找|search by reference|按编号查询
resolve|解决|resolve the mismatch|解决信息不一致的问题`,
  pronunciation:'说预订号时逐位念。听 twin 和 double，确认床型及价格。',
  passage:['The hotel cannot find my booking by surname. I show the confirmation and read the reference number. The clerk finds the reservation, but no twin room is available. I ask whether a double room is available at the same rate.','酒店按姓氏查不到预订。我出示确认信息并读出编号。前台找到了记录，但没有双床房。我询问有没有同价的大床房。'],
  rule:['按哪项信息查询','search by surname 或 by reference 表示按该条件查询。','Could you search by reference?'],
  contrast:['用 whether 询问是否','I would like to know whether … 后用陈述语序。','I would like to know whether a double room is available.'],
  grammarQuiz:[['Could you search ___ reference?',['on','by','with'],1,'by 表示查询方式。'],['I would like to know whether a double room ___ available.',['is','are','be'],0,'单数 room 配 is。']],
  readingQuiz:[['先按什么查找失败？',['姓氏','日期','预订号'],0,'cannot find by surname。'],['哪种房没有？',['大床房','双床房','都没有'],1,'no twin room is available。']],
  listening:[['输入听到的可用房型（twin 或 double）。',['double'],'a double room is available。','A double room is available at the same rate.'],['输入听到的可用房型（twin 或 double）。',['twin'],'a twin room is available。','A twin room is available at the same rate.']],
  output:[['问“您能按预订号查吗？”，用 by reference。',['Could you search by reference?'],'search by reference。'],['问“您能按姓氏查吗？”，用 by surname。',['Could you search by surname?'],'search by surname。']],
  task:['前台说找不到预订。提供订单号，随后对照替代房型和价格。','I have a confirmation. Could you search by reference? Is a double room available at the same rate?','用一组虚构信息练习，最后复述房型和房价。']
});

addPathUnit({
  id:'test-progress',stage:'negotiate',scene:'工作',prerequisite:'reporting-a-bug',
  title:'说明到目前为止的测试进度',goal:'区分有明确过去时间的事件与截至现在的进度。',
  vocabulary:`
progress|进展|report progress|汇报进展
so far|到目前为止|passed so far|截至目前已通过
already|已经|already finished|已经完成
yet|尚；已经（用于疑问否定）|not finished yet|还没完成
still|仍然|still open|仍未关闭
pass|通过|pass the check|通过检查
fail|失败|fail a test|未通过测试
remain|仍然存在|two issues remain|仍有两个问题
blocked|受阻的|a blocked test|一项受阻的测试
blocker|阻碍|remove a blocker|解除一个阻塞项
batch|批次|run a batch|跑一批测试
suite|测试套件|run a test suite|运行一套测试
rerun|重新运行|rerun the tests|重新运行测试
verify|验证|verify the fix|验证修复
regression|回归测试|run regression tests|运行回归测试
result|结果|report the results|汇报结果
remaining|剩余的|remaining cases|剩余用例
complete|完成|complete the checks|完成检查
status update|进度更新|give a status update|同步一下进度`,
  pronunciation:'have 和 has 常轻读。听清数字与 passed、failed、blocked。',
  passage:['We have completed twelve checks so far. Two have failed. We have not verified the fix yet. I ran the first batch yesterday, and Alex will rerun the failed checks today.','截至目前我们完成了十二项检查，两项失败。修复尚未验证。我昨天跑了第一批，Alex 今天会重跑失败项。'],
  rule:['截至现在的进展','have / has + 过去分词。so far 常用来说明截至目前。','We have completed twelve checks so far.'],
  contrast:['明确过去时间用过去时','有 yesterday 这样的明确过去时间时，用 I ran … yesterday。','I ran the first batch yesterday.'],
  grammarQuiz:[['We have not ___ the fix yet.',['verify','verified','verifies'],1,'have + verified。'],['I ___ the batch yesterday.',['have run','ran','running'],1,'yesterday 用过去时。']],
  readingQuiz:[['目前完成多少检查？',['10','12','14'],1,'completed twelve。'],['是否已验证修复？',['已验证','尚未验证','未知'],1,'not verified yet。']],
  listening:[['输入已完成的检查数。',['12'],'completed twelve checks。','We have completed twelve checks so far.'],['输入已完成的检查数。',['18'],'completed eighteen checks。','We have completed eighteen checks so far.']],
  output:[['写“我们还没有验证修复”。',['We have not verified the fix yet.','We haven’t verified the fix yet.'],'have not + verified + yet。'],['写“我昨天运行了第一批”。',['I ran the first batch yesterday.'],'yesterday 用 ran。']],
  task:['报告已完成数、失败数、剩余事项和下一步。','We have completed twelve checks so far. Two have failed. We have not verified the fix yet.','换数字，并说明谁会重跑。']
});

addPathUnit({
  id:'complaint-and-remedy',stage:'negotiate',scene:'旅游',prerequisite:'hotel-problem',
  title:'礼貌投诉并提出解决办法',goal:'给出具体问题和影响，再确认对方能提供的处理方案。',
  vocabulary:`
complaint|投诉|make a complaint|提出投诉
issue|问题|explain the issue|解释这个问题
noise|噪音|noise from the corridor|走廊传来的噪音
corridor|走廊|in the corridor|在走廊里
heater|暖气；加热器|a broken heater|坏了的暖气设备
leak|漏水|a leak in the bathroom|浴室里的漏水处
repair|修理|arrange a repair|安排维修
move|换房；移动|move to another room|换到另一间房
quiet|安静的|a quieter room|一间更安静的房
inconvenience|不便|apologize for the inconvenience|为造成的不便道歉
apologize|道歉|apologize for the delay|为延误道歉
offer|提供|offer a replacement|提供一件替换品
solution|解决办法|suggest a solution|提出一个解决办法
partial|部分的|a partial refund|部分退款
compensation|补偿|ask about compensation|询问补偿
response|答复|wait for a response|等候答复
reasonable|合理的|a reasonable solution|合理的解决方案
supervisor|主管|speak to a supervisor|和主管谈一下`,
  pronunciation:'语气放缓，清楚重读问题、房号、时间和希望的处理结果。',
  passage:['The heater in my room stopped working last night. I reported it this morning, but it has not been repaired. I ask for a quieter room with working heating. The clerk offers to move me before six.','我房间的暖气昨晚坏了。我今早报修，但还没修好。我要求换一间安静、供暖正常的房间。前台说可以六点前安排。'],
  rule:['先说事实，再提出请求','先用过去时交代发生的事，再用 Could you …? 提出可执行的请求。','Could you move me to another room?'],
  contrast:['核对具体承诺','offer to + 动词原形，确认最迟时间可用 by。','Could you confirm whether I can move by six?'],
  grammarQuiz:[['Could you ___ the heater?',['repair','repaired','repairs'],0,'could 后接原形。'],['The clerk offers ___ move me.',['on','to','at'],1,'offer to do。']],
  readingQuiz:[['坏掉的是哪个设备？',['暖气','冰箱','门锁'],0,'the heater stopped working。'],['计划几点前换房？',['四点','六点','八点'],1,'before six。']],
  listening:[['用数字输入答复中的最晚整点。',['6'],'by six。','We can move you by six.'],['用数字输入答复中的最晚整点。',['7'],'by seven。','We can move you by seven.']],
  output:[['礼貌问“能帮我换房吗？”',['Could you move me to another room?'],'Could you + move。'],['礼貌问“您能修一下暖气吗？”',['Could you repair the heater?'],'Could you + repair。']],
  task:['说明房间问题和已经做过的沟通，请对方给出处理时间。','The heater stopped working last night. Could you move me to another room? What time can I move?','如果对方没有房间，继续问能否修理以及何时修好。']
});

addPathUnit({
  id:'resolve-a-disagreement',stage:'negotiate',scene:'工作',prerequisite:'prioritizing-issues',
  title:'说明分歧并达成处理顺序',goal:'用证据回应分歧，礼貌提出折中方案。',
  vocabulary:`
disagree|有分歧|disagree about priority|对优先级有分歧
agree|同意|agree on the next step|就下一步达成一致
concern|担忧|raise a concern|提出担忧
evidence|证据|share the evidence|分享证据
impact|影响|explain the impact|解释影响
urgent|紧急的|an urgent issue|紧急问题
minor|轻微的|a minor display issue|轻微的显示问题
severe|严重的|a severe failure|严重的故障
workaround|临时绕过办法|use a workaround|采用临时绕过办法
proposal|提议|review a proposal|审阅一项提议
compromise|折中|find a compromise|找到折中方案
recommend|建议|recommend a retest|建议复测
suggest|提议|suggest a short retest|建议做一次简短的复测
instead|改为|retest it instead|改为复测它
reasonable|合理的|a reasonable proposal|合理的提议
decision|决定|record a decision|记录决定
priority|优先级|set a priority|设定优先级
reconsider|重新考虑|reconsider the priority|重新考虑优先级`,
  pronunciation:'先停顿，再说 My concern is …。重读影响范围和明确的处理顺序。',
  passage:['Alex thinks the defect is minor because it affects one page. I explain that it blocks every approval on that page. We agree to retest the workaround today and reconsider the priority tomorrow.','Alex 认为缺陷只影响一页，所以不严重。我解释它会阻塞该页上的所有审批。我们同意今天复测绕过办法，明天重新评估优先级。'],
  rule:['先接住对方的理由','用 I see your point, but … 表示理解，再给不同证据。','I see your point, but it blocks every approval.'],
  contrast:['用 agree on / agree to','agree on + 事项，agree to + 动作。','We agree to retest the workaround.'],
  grammarQuiz:[['We agree ___ retest the fix.',['on','to','at'],1,'agree to do。'],['We agree ___ the next step.',['to','in','on'],2,'agree on + 事项。']],
  readingQuiz:[['缺陷阻塞什么？',['所有该页审批','所有登录','只影响字体'],0,'blocks every approval。'],['今天先做什么？',['发布','复测绕过办法','关闭缺陷'],1,'retest the workaround today。']],
  listening:[['输入听到的动作（retest 或 release）。',['retest'],'agree to retest。','We agree to retest it today.'],['输入听到的动作（retest 或 release）。',['release'],'agree to release。','We agree to release it tomorrow.']],
  output:[['写“我们同意复测这个修复”。',['We agree to retest the fix.'],'agree to retest。'],['写“我们就下一步达成一致”。',['We agree on the next step.'],'agree on the next step。']],
  task:['先复述对方的观点，再给你的证据和可接受的下一步。','I see your point, but it blocks approvals. Could we retest the workaround first?','换成你遇到过的优先级争议。']
});

addPathUnit({
  id:'refund-follow-up',stage:'negotiate',scene:'旅游',prerequisite:'exchange-a-purchase',
  title:'确认退款金额和到账安排',goal:'核对全部或部分退款、处理方式和跟进时间。',
  vocabulary:`
refund|退款|request a refund|申请退款
full|全额的|a full refund|全额退款
partial|部分的|a partial refund|部分退款
amount|金额|confirm the amount|确认金额
method|方式|the payment method|付款方式
transaction|交易|find a transaction|找到一笔交易
statement|账单|check a card statement|查看银行卡账单
cardholder|持卡人|confirm the cardholder|确认持卡人
processing|处理中的；处理|processing time|处理时间
business day|工作日|three business days|三个工作日
credited|已入账的|credited to the card|已退回到卡里
balance|余额|check the balance|查看余额
difference|差额|pay the difference|补差价
deduction|扣款|explain the deduction|说明扣款
cancellation|取消|a cancellation confirmation|取消确认信息
written|书面的|written confirmation|书面确认
reference number|参考编号|keep the reference number|留好参考编号
follow up|跟进|follow up next week|下周跟进`,
  pronunciation:'先听金额，再听 full / partial、card / cash 和处理时间。',
  passage:['The store offers a partial refund of thirty dollars. The refund will go back to the original card. I ask for written confirmation and a reference number. The assistant says it should appear within three business days.','商店提出部分退款三十美元，原路退回原卡。我索要书面确认和编号。店员说预计三个工作日内到账。'],
  rule:['问金额和方式','How much will …? 问金额，Will it go back to …? 核对去向。','Will the refund go back to the original card?'],
  contrast:['区分 within 和 after','within three business days 表示三工作日内，after three business days 表示三工作日后。','It should appear within three business days.'],
  grammarQuiz:[['It will go back ___ the original card.',['to','at','of'],0,'go back to。'],['“三个工作日内”怎么说？',['after three business days','within three business days','on three business days'],1,'within 表示时限内。']],
  readingQuiz:[['退多少？',['全额','30 美元','3 美元'],1,'a partial refund of thirty dollars。'],['原路退到哪里？',['现金','新卡','原卡'],2,'the original card。']],
  listening:[['用数字输入退款金额。',['30'],'a refund of thirty dollars。','We can offer a refund of thirty dollars.'],['用数字输入退款金额。',['45'],'a refund of forty-five dollars。','We can offer a refund of forty-five dollars.']],
  output:[['问“您能确认金额吗？”',['Could you confirm the amount?'],'confirm the amount。'],['问“您能确认退款方式吗？”',['Could you confirm the refund method?'],'confirm the refund method。']],
  task:['对方同意退款，追问金额、方式和何时跟进。','Could you confirm the amount? Will it go back to the original card? When should I follow up?','用一组虚构的金额与时间复述确认。']
});

addPathUnit({
  id:'bug-triage-conversation',stage:'exchange',scene:'工作',prerequisite:'resolve-a-disagreement',
  title:'模拟缺陷评审中的三轮沟通',goal:'依次说明问题、回应无法复现、确认负责人和期限。',
  vocabulary:`
triage|分诊；初步分类|a bug triage meeting|缺陷评审会
reporter|报告人|ask the reporter|询问报告人
assignee|被指派人|set the assignee|指定处理人
severity|严重程度|assess severity|评估严重程度
reproduction|复现|reproduction steps|复现步骤
specific|具体的|a specific account|某个特定账户
isolated|孤立的|an isolated case|个别案例
reliable|可靠的|a reliable test|可靠的测试
affected|受影响的|affected users|受影响的用户
frequency|频率|record the frequency|记录发生频率
mitigate|减轻影响|mitigate the impact|减轻影响
workaround|绕行方案|try a workaround|尝试绕过办法
investigate|调查|investigate the failure|调查故障
ownership|负责归属|confirm ownership|确认由谁负责
deadline|截止日期|confirm the deadline|确认截止时间
next step|下一步|agree on the next step|就下一步达成一致
track|跟踪|track the issue|跟踪问题
retest|复测|retest the fix|复测修复`,
  pronunciation:'先给一句总结，再停顿回答追问。重读版本、受影响范围和负责人。',
  passage:['The request form fails only for new accounts. Alex cannot reproduce the issue with an old account. Sunny sends a new test account. Alex agrees to investigate, and Sunny will retest the fix on Friday.','申请表只对新账户失败。Alex 用老账户无法复现。Sunny 发了一个新的测试账户。Alex 同意调查，Sunny 周五复测修复。'],
  rule:['用 only 限定复现条件','only for new accounts 表示仅在新账户上出现。把范围放到句尾说明。','It fails only for new accounts.'],
  contrast:['用 will + 原形明确下一步','用人名做主语，并带上日期。','Sunny will retest the fix on Friday.'],
  grammarQuiz:[['Sunny will ___ the fix.',['retested','retest','retests'],1,'will 后接原形。'],['仅对新账户失败。',['It fails only for new accounts.','It fails for every account.','It never fails.'],0,'only for 限定范围。']],
  readingQuiz:[['Alex 用什么账户没有复现？',['老账户','新账户','访客账户'],0,'with an old account。'],['谁周五复测？',['Alex','Sunny','未定'],1,'Sunny will retest。']],
  listening:[['输入负责调查的名字。',['Alex'],'Alex will investigate。','Alex will investigate the failure.'],['输入负责调查的名字。',['Kim'],'Kim will investigate。','Kim will investigate the failure.']],
  output:[['写“它只对新账户失败”。',['It fails only for new accounts.'],'only for new accounts。'],['写“Kim 周五会复测修复”。',['Kim will retest the fix on Friday.'],'will + retest，on Friday。']],
  task:['第一轮，说明现象和影响范围。','The request form fails only for new accounts.','按自己的项目替换表单和账户。','What is the issue, and who is affected?'],
  turns:[
    ['第二轮，回应对方无法复现。','Did you use a new account? I can send you a test account.','补充最关键的复现条件。','I cannot reproduce it with my account.'],
    ['第三轮，确认调查和复测分工。','Can you investigate it today? I will retest the fix on Friday.','说出负责人和时间。','Who will investigate it, and when can we retest?']
  ]
});

addPathUnit({
  id:'travel-connection-conversation',stage:'exchange',scene:'旅游',prerequisite:'missed-connection',
  title:'模拟中转受阻后的三轮沟通',goal:'报告无法赶上中转，比较改签选项，核对新行程。',
  vocabulary:`
delay|延误|a long delay|长时间延误
connection|中转衔接|miss a connection|错过中转
connecting flight|中转航班|catch a connecting flight|赶上中转航班
reroute|改道；改签路线|reroute a passenger|为乘客改签路线
rebook|重新订票|rebook on a later flight|改签到较晚的航班
available seat|可用座位|check for an available seat|查询是否有空座
standby|候补|join the standby list|加入候补名单
final destination|最终目的地|reach the final destination|抵达最终目的地
terminal|航站楼|change terminals|换航站楼
transfer desk|转机服务台|visit the transfer desk|前往转机服务台
boarding pass|登机牌|print a new boarding pass|打印新的登机牌
baggage tag|行李牌|keep the baggage tag|留好行李牌
overnight|过夜|stay overnight|过夜
earliest|最早的|the earliest flight|最早的航班
latest|最晚的|the latest departure|最晚的出发时间
confirmed|已确认的|a confirmed seat|一个确认的座位
depart|起飞；出发|depart at six|六点出发
arrive|到达|arrive before noon|在正午前到达`,
  pronunciation:'区分 depart 和 arrive，核对时间时说明是哪一段行程。',
  passage:['My first flight is delayed, so I will miss the connection. The agent offers a standby seat at six or a confirmed seat at eight. I choose the confirmed seat and check the terminal.','第一段航班延误，我会错过中转。工作人员给了六点的候补和八点的确认座位。我选择确认座位，并核对航站楼。'],
  rule:['用 so 说明结果','先说明延误，再用 so 引出后果。','The flight is delayed, so I will miss my connection.'],
  contrast:['二选一时说清条件','用 or 串起选项，choose + 名词明确自己的决定。','I choose the confirmed seat.'],
  grammarQuiz:[['The flight is delayed, ___ I will miss my connection.',['so','than','during'],0,'so 表示结果。'],['I choose ___ confirmed seat.',['a','these','many'],0,'seat 是单数。']],
  readingQuiz:[['哪个时间是候补？',['六点','八点','十点'],0,'standby at six。'],['最后选了哪种？',['候补','确认座位','不再飞'],1,'choose the confirmed seat。']],
  listening:[['输入确认航班的整点。',['8'],'confirmed flight at eight。','There is a confirmed seat on the flight at eight.'],['输入确认航班的整点。',['9'],'confirmed flight at nine。','There is a confirmed seat on the flight at nine.']],
  output:[['写“我会错过中转”。',['I will miss my connection.'],'will + miss。'],['写“我选确认的座位”。',['I choose the confirmed seat.'],'choose the confirmed seat。']],
  task:['第一轮，说清为什么赶不上中转。','My first flight is delayed, so I will miss my connection.','说明是第一段航班延误。','What happened to your connection?'],
  turns:[
    ['第二轮，询问是否有确认座位。','Is there a confirmed seat on a later flight?','区分候补和确认的座位。','I can put you on standby for the flight at six.'],
    ['第三轮，选八点的座位并核对航站楼。','I will take the confirmed seat at eight. Which terminal does it depart from?','复述时间、座位状态和航站楼。','There is a confirmed seat at eight. Would you like it?']
  ]
});

addPathUnit({
  id:'write-a-work-update',stage:'exchange',scene:'工作',prerequisite:'test-progress',
  title:'写一条清楚的工作进展消息',goal:'用简短消息交代完成项、风险、请求和期限。',
  draftPrompt:'写 3～5 句英文，交代已完成的检查、阻塞项、希望对方做的事和期限。',
  vocabulary:`
subject|主题|a clear subject|清楚的主题
summary|摘要|write a summary|写一份摘要
recipient|收件人|choose the recipient|选择收件人
draft|草稿|prepare a draft|准备草稿
message|消息|send a message|发送一条消息
reply|回复|reply to the message|回复消息
attach|附上|attach the report|附上报告
attachment|附件|check the attachment|检查附件
link|链接|share a link|分享链接
request|请求|make a request|提出请求
action item|行动事项|list the action items|列出行动项
pending|待处理的|a pending task|待处理任务
risk|风险|flag a risk|标出一项风险
owner|负责人|confirm the owner|确认负责人
clarification|澄清|ask for clarification|请求澄清
brief|简短的|a brief update|简短的进展更新
regards|致意|best regards|谨致问候
status|状态|current status|当前状态`,
  pronunciation:'读消息时在完成项、风险和请求之间停顿。',
  passage:['Hi Alex, we have completed the first test round. One approval check is still blocked. Could you confirm the account role by noon? I have attached the test log. Thanks, Sunny.','Alex 你好，我们已完成第一轮测试。一项审批检查仍受阻。你能在中午前确认账户角色吗？我附上了测试日志。谢谢，Sunny。'],
  rule:['把请求写成可执行动作','Could you + 原形，接具体事项和期限。','Could you confirm the account role by noon?'],
  contrast:['区分已完成与仍受阻','用 have completed 表示已完成，用 still blocked 表示状态未变。','One approval check is still blocked.'],
  grammarQuiz:[['I have ___ the log.',['attach','attached','attaches'],1,'have + 过去分词。'],['Could you confirm the role ___ noon?',['by','for','into'],0,'by + 时间表示期限。']],
  readingQuiz:[['什么仍然受阻？',['一项审批检查','全部登录测试','发送日志'],0,'One approval check is still blocked。'],['附了什么？',['会议纪要','测试日志','图片'],1,'attached the test log。']],
  listening:[['输入听到的期限词（noon 或 Friday）。',['noon'],'by noon。','Could you confirm the role by noon?'],['输入听到的期限词（noon 或 Friday）。',['Friday'],'by Friday。','Could you confirm the role by Friday?']],
  output:[['写“我附上了测试日志”，用现在完成时。',['I have attached the test log.'],'have attached。'],['写“你能在中午前确认角色吗？”',['Could you confirm the role by noon?'],'Could you + confirm。']],
  task:['给同事写一条三句进展消息，再读出来。','We have completed the first round. One check is blocked. Could you confirm the role by noon?','将示例中的事项、请求和期限换成自己的。','Can you send a brief update on the test round?'],
  turns:[
    ['对方问还缺什么。回答所需信息。','We need the account role before we can finish the approval check.','指出是哪个信息阻塞了测试。','What information do you still need?'],
    ['对方答应中午前处理。复述承诺并说明下一步。','Thanks. I will rerun the check after you confirm the role.','明确先后顺序。','I will confirm the role by noon.']
  ]
});

addPathUnit({
  id:'change-a-reservation-message',stage:'exchange',scene:'旅游',prerequisite:'hotel-booking-mismatch',
  title:'写改订消息并核对对方回复',goal:'写清原订单、想改的日期、入住人数及价格问题。',
  draftPrompt:'写一条给酒店的英文消息，说明原入住日期、新日期、人数和需要确认的费用。',
  vocabulary:`
reservation|预订|confirm the reservation|确认预订
modify|修改|modify a booking|修改预订
amend|修订|amend the dates|修改日期
arrival|抵达|arrival date|抵达日期
departure|离开|departure date|离开日期
occupancy|入住人数|confirm room occupancy|确认房间入住人数
adult|成人|two adults|两位成人
child|儿童|one child|一名儿童
availability|可用情况|check availability|查是否有空房
confirmation|确认|ask for confirmation|请求确认
extra charge|额外收费|confirm the extra charge|确认额外收费
difference|差额|pay the difference|补差价
keep|保留|keep the same room|保留同一间房
extend|延长|extend the stay|延长住宿
shorten|缩短|shorten the stay|缩短住宿
original booking|原订单|keep the original booking|保留原订单
revised|修订后的|the revised dates|修改后的日期
guest name|住客姓名|include the guest name|填上住客姓名`,
  pronunciation:'读日期时加月份。复述两段日期时，把原日期和新日期分成两句。',
  passage:['Hello, I have a booking for two adults from June 12 to June 14. I would like to move it one day later. Is the same room available from June 13 to June 15? Please let me know if there is an extra charge.','您好，我订了两位成人 6 月 12 日至 14 日入住。我想顺延一天。13 日至 15 日还能订同样房型吗？请告知有无额外费用。'],
  rule:['用 from … to … 写日期范围','from 引出开始日期，to 引出结束日期。','I have a booking from June 12 to June 14.'],
  contrast:['用 if 引出需要确认的信息','Please let me know if … 用于请对方告知是否有某个情况。','Please let me know if there is an extra charge.'],
  grammarQuiz:[['I would like ___ modify the booking.',['in','for','to'],2,'would like to + 原形。'],['from June 13 ___ June 15',['to','at','on'],0,'from … to …。']],
  readingQuiz:[['新入住日是哪天？',['6 月 12 日','6 月 13 日','6 月 15 日'],1,'from June 13 to June 15。'],['几位成人？',['一位','两位','三位'],1,'two adults。']],
  listening:[['用数字输入新的入住日。',['13'],'June thirteenth。','Your new arrival date is June thirteenth.'],['用数字输入新的入住日。',['16'],'June sixteenth。','Your new arrival date is June sixteenth.']],
  output:[['写“我想修改预订”。',['I would like to modify the booking.'],'would like to modify。'],['写“请告诉我是否有额外费用”。',['Please let me know if there is an extra charge.'],'let me know if。']],
  task:['写消息说明原订单和新日期，请酒店确认房型。','I have a booking from June 12 to June 14. Is the same room available from June 13 to June 15?','加上人数，并说明要保持原房型。','Which booking would you like to change?'],
  turns:[
    ['对方说有房，但可能加价。追问总额。','Could you confirm the total price for the revised dates?','确认总价，而不是只问单晚价格。','The room is available, but the rate may change.'],
    ['对方给出价格，复述新日期后请他发确认。','The new dates are June 13 to June 15. Could you send a revised confirmation?','核对起止日期和确认邮件。','The total is two hundred dollars for June 13 to June 15.']
  ]
});

addPathUnit({
  id:'handover-with-a-blocker',stage:'exchange',scene:'工作',prerequisite:'handover',
  title:'完成有阻塞项的测试交接',goal:'交代已测、未测、阻塞、证据和接手动作。',
  vocabulary:`
handover|交接|give a handover|做一次交接
completed|已完成的|completed cases|已完成的用例
outstanding|未完成的|an outstanding task|未完成的任务
blocked|受阻的|a blocked check|受阻的检查项
dependency|依赖|document a dependency|记录一项依赖
unblock|解除阻塞|unblock the test|解除测试阻塞
resume|恢复|resume testing|恢复测试
take over|接手|take over the task|接手任务
follow-up|后续跟进|schedule a follow-up|安排后续跟进
artifact|产物|share the test artifacts|分享测试产物
test data|测试数据|prepare test data|准备测试数据
checklist|核对清单|update the checklist|更新核对清单
notes|笔记；记录|read the handover notes|阅读交接记录
owner|负责人|assign an owner|指定负责人
target date|目标日期|confirm a target date|确认目标日期
open question|待确认的问题|an open question|待确认的问题
sign-off|确认通过|request sign-off|请求签字确认
reopen|重新打开|reopen a defect|重新打开缺陷`,
  pronunciation:'按完成项、受阻项、接手动作分三段，重读依赖条件。',
  passage:['I have completed the payroll checks. The approval checks are blocked because the test account is inactive. The notes include the expected results. Once the account is active, Kim will resume testing.','薪资检查已完成。审批检查因测试账户未激活而受阻。交接记录中有预期结果。账户激活后，Kim 将继续测试。'],
  rule:['用 because 交代阻塞原因','The checks are blocked because … 后接完整原因。','The approval checks are blocked because the account is inactive.'],
  contrast:['用 once 连接解除条件与下一步','once + 一般现在时，主句用 will 表示下一步。','Once the account is active, Kim will resume testing.'],
  grammarQuiz:[['Once the account ___ active, Kim will resume testing.',['will be','is','being'],1,'once 条件部分用一般现在时。'],['The checks are blocked ___ the account is inactive.',['but','because','than'],1,'because 给出原因。']],
  readingQuiz:[['哪项已完成？',['薪资检查','审批检查','账户激活'],0,'completed the payroll checks。'],['谁会继续？',['Sunny','Alex','Kim'],2,'Kim will resume testing。']],
  listening:[['输入接手人的名字。',['Kim'],'Kim will resume testing。','Kim will resume testing after the account is active.'],['输入接手人的名字。',['Alex'],'Alex will resume testing。','Alex will resume testing after the account is active.']],
  output:[['写“审批检查受阻了”。',['The approval checks are blocked.'],'checks 配 are。'],['写“Kim 会恢复测试”。',['Kim will resume testing.'],'will + resume。']],
  task:['交代已完成项和阻塞项。','I have completed the payroll checks. The approval checks are blocked because the account is inactive.','至少说出一个原因。','What is finished and what is still blocked?'],
  turns:[
    ['对方问证据在哪，指明交接记录。','The expected results are in the handover notes.','说出可供接手的人查看的材料。','Where can I find the expected results?'],
    ['对方确认账户快好了，约定接手动作。','Once the account is active, Kim will resume testing.','复述条件和负责人。','The account should be active soon. Who will take over?']
  ]
});

addPathUnit({
  id:'day-trip-change',stage:'exchange',scene:'旅游',prerequisite:'compare-travel-options',
  title:'把一日行程的变动讲给同伴',goal:'说明原计划、变化、备选路线和新的集合安排。',
  vocabulary:`
meeting point|集合点|confirm the meeting point|确认集合地点
entrance|入口|meet at the main entrance|在主入口集合
venue|地点|change the venue|更改地点
opening hours|开放时间|check the opening hours|查看开放时间
closed|关闭的|closed in the morning|上午不开放
reschedule|重新安排|reschedule the visit|重新安排参观
cancel|取消|cancel a tour|取消一次游览
alternative|替代方案|find an alternative|找一个备选方案
instead|改为|go there instead|改去那里
nearby|附近的|a nearby café|附近的一家咖啡店
walkable|步行可达的|a walkable route|步行可走的路线
estimated|估计的|estimated arrival time|预计到达时间
allow|预留|allow extra time|预留额外时间
group|小组|tell the group|告知小组成员
split up|分开行动|split up for lunch|分开吃午饭
regroup|重新集合|regroup at noon|中午重新集合
bring|携带|bring your ticket|带上你的票
update|更新|send an update|发一条更新`,
  pronunciation:'给出新集合时间和地点后，请对方复述，分别确认两个信息。',
  passage:['The museum is closed in the morning, so we will go to the park instead. It is near the station. We will regroup at the main entrance at noon. Please bring your ticket for the afternoon visit.','博物馆上午关闭，所以我们改去公园，就在车站附近。中午在主入口重新集合。请带好下午参观的门票。'],
  rule:['用 instead 表达替换','句末 instead 指用新的行动替代前面的安排。','We will go to the park instead.'],
  contrast:['分别给地点和时间','at the main entrance 给地点，at noon 给时间。','We will regroup at the main entrance at noon.'],
  grammarQuiz:[['We will ___ at noon.',['regroup','regrouped','regroups'],0,'will 后用原形。'],['请带票。',['Please bring your ticket.','Your ticket will please.','Please brought your ticket.'],0,'祈使句用 bring。']],
  readingQuiz:[['上午改去哪里？',['公园','机场','博物馆'],0,'go to the park instead。'],['几点集合？',['早上','中午','晚上'],1,'at noon。']],
  listening:[['输入听到的集合时间（noon 或 one）。',['noon'],'at noon。','We will regroup at the entrance at noon.'],['输入听到的集合时间（noon 或 one）。',['one'],'at one。','We will regroup at the entrance at one.']],
  output:[['写“我们改去公园”。',['We will go to the park instead.'],'instead 放句末。'],['写“我们中午重新集合”。',['We will regroup at noon.'],'at noon。']],
  task:['告诉同伴为什么要改计划。','The museum is closed in the morning, so we will go to the park instead.','说出变化和原因。','Why are we changing the plan?'],
  turns:[
    ['同伴问重新集合地点和时间。','We will regroup at the main entrance at noon.','先说地点再说时间。','Where and when should we meet again?'],
    ['同伴说错了时间，礼貌纠正。','We will meet at noon. Please bring your ticket.','纠正一项信息，再提醒所需物品。','So we meet at one, right?']
  ]
});

addPathUnit({
  id:'decision-and-meeting-minutes',stage:'exchange',scene:'工作',prerequisite:'write-a-work-update',
  title:'会议结尾确认决定并写纪要',goal:'区分决定、待定和行动项，并用纪要确认负责人。',
  draftPrompt:'写三条英文纪要，分别记录已定事项、待定问题、负责人和行动期限。',
  vocabulary:`
agenda|议程|share the agenda|分享议程
minutes|会议纪要|write the minutes|撰写会议纪要
decision|决定（名词）|record the decision|记录决定
decide|作决定|decide on a date|确定一个日期
agreement|一致意见|reach an agreement|达成一致
unresolved|未解决的|an unresolved question|一个未解决的问题
pending decision|待定事项|list a pending decision|列出一项待定事项
action item|行动项|assign an action item|分配一项行动任务
responsible|负责的|responsible for testing|负责测试
participant|与会者|notify the participants|通知与会者
note|笔记；记录|take notes|做笔记
circulate|传阅；发送|circulate the minutes|把纪要发给大家
review|审阅|review the minutes|审阅纪要
finalize|定稿|finalize the plan|敲定方案
due date|到期日|set a due date|设定截止日期
feedback|反馈|ask for feedback|征求反馈
recap|简要回顾|recap the decision|回顾决定
confirm|确认|confirm the owner|确认负责人`,
  pronunciation:'会议最后逐条念决定、负责人和期限。不要把未定事项念成已定事项。',
  passage:['We decided to keep the current release date. Alex will verify the approval fix by Thursday. The test data question is still unresolved. Sunny will circulate the minutes today and ask the team to confirm the action items.','我们决定保留当前发布日期。Alex 将在周四前验证审批修复。测试数据问题还没解决。Sunny 今天会发送纪要，请团队确认行动项。'],
  rule:['用 decided to 写已定动作','decided to + 原形可以报告会议里已经作出的决定。','We decided to keep the current release date.'],
  contrast:['用 is still unresolved 标明待定','把待定事项单列。用 will + 原形指明谁接下来做什么。','The test data question is still unresolved.'],
  grammarQuiz:[['We decided ___ keep the date.',['at','to','for'],1,'decided to + keep。'],['The question ___ still unresolved.',['is','will','have'],0,'is + 状态。']],
  readingQuiz:[['发布日期有什么变化？',['保留','推迟','提前'],0,'keep the current release date。'],['哪项还未解决？',['测试数据','纪要格式','发布日期'],0,'The test data question is still unresolved。']],
  listening:[['输入负责验证修复的人。',['Alex'],'Alex will verify。','Alex will verify the approval fix by Thursday.'],['输入负责验证修复的人。',['Kim'],'Kim will verify。','Kim will verify the approval fix by Thursday.']],
  output:[['写“我们决定保留当前日期”。',['We decided to keep the current date.'],'decided to keep。'],['写“这个问题还没解决”，用 unresolved。',['The question is still unresolved.'],'still + unresolved。']],
  task:['口头总结会议决定。','We decided to keep the current release date.','把决定写成纪要的第一句。','Can you recap what we decided?'],
  turns:[
    ['对方问行动项。给出负责人和期限。','Alex will verify the approval fix by Thursday.','在纪要中把人名和日期写全。','Who will verify the fix, and by when?'],
    ['对方误以为测试数据已解决，补充待定事项。','The test data question is still unresolved. I will list it in the minutes.','标明待定事项并说明会记录。','Are all the questions resolved now?']
  ]
});
