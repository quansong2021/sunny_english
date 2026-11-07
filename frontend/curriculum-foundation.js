// Keep these unit IDs and question positions stable after release.
const FoundationAdditions = [
  {
    id: 'people-and-roles', prerequisite: 'intro', scene: '通用',
    title: '分清谁在做、跟谁做、东西是谁的',
    goal: '区分 I / me / my 等三种位置，用简单句说明同事、同行者和归属。',
    words: [
      ['me', '我（宾格）', 'Alex is with me.', "Alex 和我在一起。"],
      ['him', '他（宾格）', 'I am with him.', "我和他在一起。"],
      ['her', '她（宾格）；她的', 'Her colleague is with her.', "她的同事和她在一起。"],
      ['us', '我们（宾格）', 'Alex is with us.', "Alex 和我们在一起。"],
      ['them', '他们（宾格）', 'We are with them.', "我们和他们在一起。"],
      ['his', '他的', 'His name is Alex.', "他叫 Alex。"],
      ['its', '它的', 'Its name is Sunny.', "它叫 Sunny。"],
      ['our', '我们的', 'Our guide is here.', "我们的导游在这里。"],
      ['their', '他们的', 'Their guide is here.', "他们的导游在这里。"],
      ['with', '和……一起', 'I am with Alex.', "我和 Alex 在一起。"],
      ['guide', '导游', 'He is our guide.', "他是我们的导游。"],
      ['friend', '朋友', 'She is my friend.', "她是我的朋友。"]
    ],
    pronunciation: '先听 I / me / my 和 we / us / our。在句中听清是谁、跟谁在一起，以及是谁的。',
    grammar: [
      ['主语和宾语的位置', 'I / you / he / she / it / we / they 可以作主语。with 后用 me / you / him / her / it / us / them。you 和 it 的两种形式相同。', 'We are with them.'],
      ['名词前的所属表达', 'my / your / his / her / its / our / their 放在名词前。her 放在名词前表示她的，放在 with 后表示她。', 'Her friend is with her.'],
      ['复习 be 动词', '用 am / is / are 介绍身份或同行关系。先辨认主语，再选 be 动词。', 'They are with us.']
    ],
    passage: ['I am Sunny. Alex is my colleague. He is with me. Our friend Kim is here. She is with us.', '我是 Sunny。Alex 是我的同事。他和我在一起。我们的朋友 Kim 在这里。她和我们在一起。'],
    grammarQuiz: [
      ['Alex is with ___.',['I','me','my'],1,'with 后用 me。'],
      ['___ friend is with us.',['We','Us','Our'],2,'friend 前用 Our 表示归属。'],
      ['I am with ___.',['he','him','his'],1,'with 后用 him。'],
      ['___ is with them.',['She','Her','Their'],0,'主语位置用 She。']
    ],
    readingQuiz: [['谁和 Sunny 在一起？',['Alex','导游','经理'],0,'He is with me 中的 he 指 Alex。'],['Kim 是谁？',['朋友','经理','导游'],0,'Our friend Kim。']],
    listeningQuiz: [['Their guide is with us.','导游是谁的？',['他们的','我们的','你的'],0,'their 修饰 guide。'],['Her friend is with him.','她的朋友和谁在一起？',['他','她','我们'],0,'with him 表示和他一起。']],
    writing: [['写“他和我在一起”。',['He is with me.'],'with 后用 me。'],['用 Our 开头写“我们的导游在这里”。',['Our guide is here.'],'our 放在 guide 前。']],
    speaking: [['介绍一位同行者，再说他和谁在一起。','Alex is my colleague. He is with us.','换成你的同行者，核对主语、宾格和归属。']],
    transfer: ['She is our guide. Her friend is with her.', '她是我们的导游。她的朋友和她在一起。']
  },
  {
    id: 'objects-and-articles', prerequisite: 'people-and-roles', scene: '通用',
    title: '说清一个、几个和哪一个',
    goal: '用 a / an、复数、this / these 和 the 描述随身物品与办公用品。',
    words: [
      ['bag','包','This is a bag.', "这是一个包。"],['apple','苹果','This is an apple.', "这是一个苹果。"],
      ['key','钥匙','These are keys.', "这些是钥匙。"],['box','盒子','These are boxes.', "这些是盒子。"],
      ['card','卡片','This is a card.', "这是一张卡片。"],['file','文件','These are files.', "这些是文件。"],
      ['pen','笔','This is a pen.', "这是一支笔。"],['umbrella','雨伞','This is an umbrella.', "这是一把雨伞。"],
      ['this','这个','This is my key.', "这是我的钥匙。"],['these','这些','These are my keys.', "这些是我的钥匙。"],
      ['that','那个','That is my bag.', "那是我的包。"],['those','那些','Those are my files.', "那些是我的文件。"]
    ],
    pronunciation: '听 key / keys 和 box / boxes。boxes 末尾多一个音节，keys 末尾有 /z/。',
    grammar: [
      ['第一次提到一个东西', '用 a 或 an 加单数名词。听开头的音，a bag 和 an umbrella。', 'This is an umbrella.'],
      ['多个东西', '常见复数加 -s，box 加 -es。this / that 配 is，these / those 配 are。', 'These are boxes.'],
      ['双方都知道是哪一个', '明确指双方都知道的某件物品时用 the。第一次介绍可以说 a key，接着再说 the key。', 'This is a key. The key is in my bag.']
    ],
    passage: ['This is my bag. This is an umbrella. These are my keys. The keys are in my bag. Those are Alex’s files.', '这是我的包。这是一把雨伞。这些是我的钥匙。钥匙在我的包里。那些是 Alex 的文件。'],
    readingQuiz: [['钥匙在哪里？',['包里','办公室','盒子里'],0,'The keys are in my bag。'],['那些文件是谁的？',['Alex 的','Sunny 的','导游的'],0,'Those are Alex’s files。']],
    grammarQuiz: [['This is ___ apple.',['a','an','these'],1,'apple 以元音音素开头。'],['These are ___.',['box','a box','boxes'],2,'these 指多个，box 的复数是 boxes。'],['___ are my keys.',['This','These','That'],1,'these 配 are。'],['This is a key. ___ key is in my bag.',['An','The','These'],1,'key 已经提到，用 the。']],
    listeningQuiz: [['Those are my files.','听到的是什么？',['那些文件','这个文件','这些卡片'],0,'those 是那些，files 是文件。'],['This is an umbrella.','说的是哪件物品？',['雨伞','钥匙','包'],0,'an umbrella。']],
    writing: [['用 This 写“这是一把雨伞”。',['This is an umbrella.'],'umbrella 前用 an。'],['用 These 写“这些是我的钥匙”。',['These are my keys.'],'these + are + 复数。']],
    speaking: [['拿两样物品，先介绍一件，再介绍一组。','This is my card. These are my keys.','把近处的 this / these 换成远处的 that / those。']],
    transfer: ['This is a card. The card is for room eight.', '这是一张卡。这张卡是八号房的。']
  },
  {
    id: 'numbers-to-ten', prerequisite: 'objects-and-articles', scene: '通用',
    title: '听清 0 到 10 和编号',
    goal: '认识 0 到 10，区分数量和编号，能复述房间或柜台号码。',
    words: [
      ['zero','零','The code is one, zero, two.', "编号是 102。"],['one','一','I have one bag.', "我有一个包。"],
      ['two','二','I have two bags.', "我有两个包。"],['three','三','I have three cards.', "我有三张卡片。"],
      ['four','四','This is room four.', "这是四号房。"],['five','五','This is desk five.', "这是五号柜台。"],
      ['six','六','I have six keys.', "我有六把钥匙。"],['seven','七','This is room seven.', "这是七号房。"],
      ['eight','八','I have eight cards.', "我有八张卡片。"],['nine','九','This is desk nine.', "这是九号柜台。"],
      ['ten','十','I have ten files.', "我有十份文件。"],['room','房间','This is room eight.', "这是八号房。"],
      ['desk','柜台；桌子','This is desk two.', "这是二号柜台。"],['code','代码；编号','The code is four, zero, six.', "编号是 406。"]
    ],
    pronunciation: '听 three 和 two 时，留意 three 开头的 /θ/。读编号可以逐位读，例如 408 读 four zero eight。',
    grammar: [
      ['数量放在名词前', 'one bag 表示一件，two bags 表示两件。超过一个时检查名词的复数。', 'I have two bags.'],
      ['编号跟在事物名后', 'room eight 表示八号房。核对编码时，可以把数字逐个说出来。', 'The code is four, zero, eight.']
    ],
    passage: ['This is desk two. My room is room eight. I have two bags and one key. The code is one, zero, six.', '这里是二号柜台。我的房间是八号房。我有两个包和一把钥匙。编号是 106。'],
    grammarQuiz: [['I have one ___.',['bag','bags','two bags'],0,'one 后用单数。'],['I have two ___.',['bag','bags','a bag'],1,'two 后用复数。'],['“八号房”怎么说？',['eight rooms','room eight','room is eight rooms'],1,'编号放在 room 后。'],['哪一个是 four, zero, six？',['460','406','046'],1,'按数字顺序写。']],
    readingQuiz: [['是哪个柜台？',['二号','八号','六号'],0,'desk two。'],['有几个包？',['一个','两个','八个'],1,'two bags。']],
    listeningQuiz: [['The code is seven, zero, four.','编号是多少？',['740','704','407'],1,'seven zero four。'],['I have nine cards.','有几张卡？',['六','九','十'],1,'nine。']],
    writing: [['写“我有两个包”。',['I have two bags.'],'two 后用 bags。'],['写“这是八号房”。',['This is room eight.','This is room 8.'],'room 后加编号。']],
    speaking: [['说出一个三位编号，再说你带了几件行李。','The code is six, zero, one. I have two bags.','让对方复述一次，再确认哪一位听错。']],
    transfer: ['The test code is one, zero, seven.', '测试编号是 107。']
  },
  {
    id: 'numbers-and-amounts', prerequisite: 'numbers-to-ten', scene: '通用',
    title: '听清 11 到 100 和金额',
    goal: '学习 11 到 19、整十与一百，通过组合读出其余两位数。',
    words: [
      ['eleven','十一','I have eleven files.', "我有十一份文件。"],['twelve','十二','I have twelve cards.', "我有十二张卡片。"],
      ['thirteen','十三','This is desk thirteen.', "这是十三号柜台。"],['fourteen','十四','This is room fourteen.', "这是十四号房。"],
      ['fifteen','十五','It is fifteen dollars.', "价格是十五美元。"],['sixteen','十六','It is sixteen dollars.', "价格是十六美元。"],
      ['seventeen','十七','It is seventeen dollars.', "价格是十七美元。"],['eighteen','十八','This is room eighteen.', "这是十八号房。"],
      ['nineteen','十九','I have nineteen cards.', "我有十九张卡片。"],['twenty','二十','It is twenty dollars.', "价格是二十美元。"],
      ['thirty','三十','It is thirty dollars.', "价格是三十美元。"],['forty','四十','It is forty dollars.', "价格是四十美元。"],
      ['fifty','五十','It is fifty dollars.', "价格是五十美元。"],['sixty','六十','It is sixty dollars.', "价格是六十美元。"],
      ['seventy','七十','It is seventy dollars.', "价格是七十美元。"],['eighty','八十','It is eighty dollars.', "价格是八十美元。"],
      ['ninety','九十','It is ninety dollars.', "价格是九十美元。"],['hundred','百','It is one hundred dollars.', "价格是一百美元。"],
      ['dollar','美元','It is one dollar.', "价格是一美元。"],['price','价格','The price is twenty dollars.', "价格是二十美元。"]
    ],
    choiceGroups: [[0,1,2,3,4,5,6,7,8],[9,10,11,12,13,14,15,16,17]],
    pronunciation: '分开听 thirteen / thirty 和 fifteen / fifty，注意 -teen 和 -ty 的重音差异。听到金额后复述确认。',
    grammar: [
      ['先认识十几，再组两位数', '11 和 12 是 eleven、twelve。13 到 19 见词表。21 到 99 的非整十数用整十加个位，如 twenty-one、forty-six、ninety-nine。100 说 one hundred。', 'It is forty-six dollars.'],
      ['金额和单位', 'one dollar 用单数，其他这里练习的整数金额用 dollars。用 How much is it? 问价格。', 'How much is it? It is fifty dollars.']
    ],
    passage: ['This is desk twelve. A card is fifteen dollars. A bag is twenty-three dollars. This is my bag.', '这里是十二号柜台。一张卡十五美元。一个包二十三美元。这是我的包。'],
    grammarQuiz: [['46 怎么读？',['forty-six','fourteen-six','sixty-four'],0,'四十加六。'],['100 怎么读？',['ten','one hundred','one ten'],1,'one hundred。'],['It is one ___.',['dollars','dollar','prices'],1,'one 后用单数。'],['Which is 15?',['fifty','five','fifteen'],2,'fifteen 是十五。']],
    readingQuiz: [['包多少钱？',['15 美元','23 美元','12 美元'],1,'A bag is twenty-three dollars。'],['卡多少钱？',['15 美元','23 美元','12 美元'],0,'A card is fifteen dollars。']],
    listeningQuiz: [['The price is fifty dollars.','价格是多少？',['15 美元','50 美元','5 美元'],1,'fifty 是五十。'],['This is room seventy-two.','房间号是多少？',['27','17','72'],2,'seventy-two 是七十二。']],
    writing: [['用英文单词写“这是 46 美元”。',['It is forty-six dollars.','It is forty six dollars.'],'forty 加 six。'],['问“多少钱？”。',['How much is it?'],'用 How much 问价格。']],
    speaking: [['先问价格，再复述两个金额，确认是 15 还是 50。','How much is it? Is it fifteen dollars or fifty dollars?','换成 13 和 30，注意重音。']],
    transfer: ['I have thirty files.', '我有三十份文件。']
  }
];

// Each pair tests the same ability with different information. Pair positions are saved.
const FoundationPractice = {
  intro: [
    ['listening', ['听完输入对方的名字。',['Alex'],'My name is Alex.','My name is Alex.'], ['听完输入对方的名字。',['Kim'],'My name is Kim.','My name is Kim.']],
    ['output', ['用 She 写“她是一名工程师”。',['She is an engineer.'],'She 配 is，engineer 前用 an。'], ['用 He 写“他是一名工程师”。',['He is an engineer.'],'He 配 is，engineer 前用 an。']]
  ],
  'people-and-roles': [
    ['listening', ['输入 with 后听到的词。',['them'],'We are with them.','We are with them.'], ['输入 with 后听到的词。',['us'],'Alex is with us.','Alex is with us.']],
    ['output', ['写“她和我在一起”。',['She is with me.'],'with 后用 me。'], ['写“他和我们在一起”。',['He is with us.'],'with 后用 us。']]
  ],
  'objects-and-articles': [
    ['listening', ['用英文输入听到的物品名称，保留单复数。',['boxes'],'These are boxes.','These are boxes.'], ['用英文输入听到的物品名称，保留单复数。',['keys'],'Those are keys.','Those are keys.']],
    ['output', ['用 That 写“那是一把雨伞”。',['That is an umbrella.'],'that 配 is，umbrella 前用 an。'], ['用 Those 写“那些是盒子”。',['Those are boxes.'],'those 配 are，box 变成 boxes。']]
  ],
  'numbers-to-ten': [
    ['listening', ['用数字输入听到的编号。',['507'],'five, zero, seven','The code is five, zero, seven.'], ['用数字输入听到的编号。',['309'],'three, zero, nine','The code is three, zero, nine.']],
    ['output', ['用英文单词写“我有三张卡”。',['I have three cards.'],'three 后用 cards。'], ['用英文单词写“我有六把钥匙”。',['I have six keys.'],'six 后用 keys。']]
  ],
  'numbers-and-amounts': [
    ['listening', ['用数字输入听到的金额，不带货币单位。',['15'],'fifteen dollars','The price is fifteen dollars.'], ['用数字输入听到的金额，不带货币单位。',['50'],'fifty dollars','The price is fifty dollars.']],
    ['output', ['用英文单词写“这是 37 美元”。',['It is thirty-seven dollars.'],'thirty 加 seven。'], ['用英文单词写“这是 84 美元”。',['It is eighty-four dollars.'],'eighty 加 four。']]
  ],
  week: [
    ['listening', ['用英文输入听到的星期。',['Wednesday'],'I work on Wednesday.','I work on Wednesday.'], ['用英文输入听到的星期。',['Thursday'],'I work on Thursday.','I work on Thursday.']],
    ['output', ['写“她周二工作”。',['She works on Tuesday.'],'she 后用 works，星期前用 on。'], ['写“她周六学习”。',['She studies on Saturday.'],'study 在第三人称单数时变 studies。']]
  ],
  questions: [
    ['listening', ['用英文输入听到的申请状态。',['pending'],'The request is pending.','The request is pending.'], ['用英文输入听到的申请状态。',['approved'],'The request is approved.','The request is approved.']],
    ['output', ['用 Does 开头问“她周一工作吗？”。',['Does she work on Monday?'],'does 后用 work。'], ['用 Does 开头问“他周四工作吗？”。',['Does he work on Thursday?'],'does 后用 work。']]
  ],
  requests: [
    ['listening', ['用英文输入听到的星期。',['Tuesday'],'Can you send the form on Tuesday?','Can you send the form on Tuesday?'], ['用英文输入听到的星期。',['Friday'],'Can you send the form on Friday?','Can you send the form on Friday?']],
    ['output', ['用 Can you 礼貌请对方检查表单。',['Can you check the form, please?','Can you please check the form?'],'Can you + 动词原形。'], ['用 Can you 礼貌请对方发送表单。',['Can you send the form, please?','Can you please send the form?'],'Can you + 动词原形。']]
  ]
};

// Teach links identify the lesson or lessons covering a topic. Empty links mark planned work.
const CourseCoverage = [
  ['foundation','主格、宾格与名词前的所属',['intro','people-and-roles'],'people-and-roles'],
  ['foundation','be 句式、冠词、指示词和复数',['intro','objects-and-articles'],'objects-and-articles'],
  ['foundation','0～100、编号、金额和数量',['numbers-to-ten','numbers-and-amounts'],'numbers-and-amounts'],
  ['foundation','星期七天、现在时肯定句及第三人称',['week'],'week'],
  ['foundation','状态、现在时的否定和提问、can 请求',['questions','requests'],'requests'],
  ['foundation','音节、重音和常见音素的系统练习',[]],
  ['arrange','十二个月、日期、时刻和改约',['meeting-time']],
  ['arrange','问路、方向和换乘',['getting-around']],
  ['arrange','入住、退房和点餐',['hotel-arrival','ordering-food']],
  ['arrange','1～31 日、时间和截止期限',['dates-and-deadlines'],'dates-and-deadlines'],
  ['arrange','时区换算和更多跨时区沟通',[]],
  ['handle','一般过去时与缺陷报告',['reporting-a-bug']],
  ['handle','描述当前故障、处理住宿问题',['hotel-problem']],
  ['handle','值机及登机信息确认',['airport-check-in']],
  ['handle','过去时、过去进行时与失物说明',['work-yesterday','while-it-happened','lost-property'],'while-it-happened'],
  ['rules','说明审批顺序、条件和例外',['approval-flow','clarifying-rules']],
  ['rules','改签和备选计划',['missed-connection']],
  ['rules','将来表达、权限、范围与数量规则',['future-travel-plans','permissions-and-access','test-scope','amount-and-boundaries'],'amount-and-boundaries'],
  ['negotiate','比较影响、说明理由和提出建议',['prioritizing-issues']],
  ['negotiate','被动表达、投诉和退款沟通',['passive-status-updates','complaint-and-remedy','refund-follow-up'],'complaint-and-remedy'],
  ['exchange','交接进度、负责人及后续事项',['handover']],
  ['exchange','三轮缺陷沟通、中转协商和邮件写作',['bug-triage-conversation','travel-connection-conversation','write-a-work-update'],'bug-triage-conversation']
];
