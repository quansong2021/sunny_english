# Sunny English

独立部署的个人英语学习网站：JavaScript 前端 + Node.js 后端 + MySQL 8.4。

网页免密码，打开即用。使用同一部署地址的设备共享一份个人学习记录。

支持例句点词：点击课程例句、听力文本、口语题目中的英文词，就能在弹窗查释义、播放发音或加入生词本，不离开当前课程。词条中的例句也可继续点词，并可返回上一个词。

「单词与复习 → 常用词库」提供 100,308 个英汉词条和短语，支持中英文搜索及分页；「我的生词」保留收藏与当时的例句。词库包含按 ECDICT 词频筛选的 100,000 个词条以及课程、主题词组补充，课程自编详细词条优先显示。词形变化可用于查询复数、过去式等形式；未收录的词可跳转有道。

词库随代码打包，启动时无需从外部下载。在 MySQL 部署中会自动导入 `dictionary_entries`，内容版本未变时跳过导入；运行时使用同一份只读词库缓存查询。个人生词保存在 `saved_words`，随学习记录一起备份、导入和导出。本地预览继续保存到本地文件。

基础词库来源：[ECDICT](https://github.com/skywind3000/ECDICT)，MIT 授权文本见 `third-party/ECDICT-LICENSE.txt`。数据快照版本和处理脚本见 `scripts/build-wordbank.py`；需要重建时安装 Node.js 与 Python，然后运行该脚本。ECDICT 内容可能包含旧式音标和专业释义，课程例句与词频标签不代表实时语料排名。

- 首页沿一条基础学习路线推进，HR、审批与 QA 场景嵌入相应基础表达，不单独分成学习主线。
- 学习地图提供 4 个阶段、16 个单元。起步后依次练安排与出行、描述经过与处理问题、协商与交接。工作和旅游各有 6 个应用单元，基础阶段完整覆盖一周七天，安排阶段完整覆盖十二个月。
- 每单元先以原创短文串联学习，再提供词汇与发音、句子与语法、听辨、短文阅读、指定句式写作、口语自评和覆盖记录。
- 记录“已介绍”、各类题目当前答对数、口语自评和跨天巩固，分别呈现；点击下一步或播放语音不会自动完成练习。
- 每道题独立安排约 1、3、7、14、30 天的复习。短时间重复答对不会增加巩固次数；错题重置该题的复习间隔。优先推荐到期题，再继续基础练习。
- 标准 40 分钟参考：复习 8、词汇与句子 12、听读 10、说写 10；支持轻量、加强和暂停。一单元可分多天，切换节奏不清空记录。
- 原有 30 课保留为“场景练习”：工作、日常与出国自由探索，旧课程进度保留。
- “词汇主题”是辅助查阅，不代表学校年级分级，也不自动计入课程覆盖。大词库用于查词，不是要求逐个背完的课程清单。
- MySQL 新增 `curriculum_progress` 表保存单元位置、题目位置、覆盖与复习记录；与其他学习数据一起通过版本号和事务保存，支持导出、导入和备份。旧导入文件没有该字段时从空的基础路线开始。
- 英语播放使用浏览器 Speech Synthesis；录音使用 MediaRecorder，仅在页面内回听，不上传。口语目前为自评，没有接入 AI 发音或自由表达评分。
- 写作题用于指定句式核对，接受列出的参考变体并忽略大小写和常见标点；不是开放作文语义评分。

## 一键部署

先安装并启动 Docker，确保支持 Docker Compose v2 和 Linux 容器。通过 Git 克隆的项目还需要 Git。

- Windows：双击 `deploy-windows.cmd`。
- Linux：在项目目录运行 `bash deploy-linux.sh`。

在 Git 仓库中，启动脚本会先检查本地修改，再执行 `git pull --ff-only` 拉取当前分支的最新代码，然后加载更新后的部署逻辑，重新构建并启动服务。同步失败或有未提交修改时停止部署，不覆盖本地内容。

使用 ZIP 解压的目录没有 Git 信息时，会提示跳过代码同步并部署当前文件。`.env`、学习记录和备份已被 Git 忽略，保留它们不影响更新。

首次执行自动生成数据库连接密码到 `.env`，启动 MySQL、创建数据库表和个人学习档案，再启动网站。健康检查通过后才会显示 Ready。

访问 `http://localhost:4178`；服务器部署则使用 `http://服务器IP:4178`。直接进入学习首页，无需账号密码。

详细操作见 [部署与 MySQL 说明](DEPLOY.md)。

## 项目结构

```text
frontend/             页面、课程内容、数据同步交互
backend/              个人学习数据接口、MySQL 数据访问
backend/schema.sql    数据表结构（启动时自动创建）
deploy/               Windows 脚本与 Nginx HTTPS 配置示例
tests/                接口检查、MySQL 集成检查、临时 UI 预览
compose.yaml          应用 + MySQL，数据库持久化到 volume
deploy-windows.cmd    Windows 一键入口
deploy-linux.sh       Linux 一键入口
```

前端与后端独立分目录，由 Node.js 同域提供页面和 API。首周课程在 `frontend/data.js`，后续课程在 `frontend/month-lessons.js`，用户数据在 MySQL 的结构化表中。

词汇详细资料在 `frontend/vocabulary.js` 和 `frontend/month-vocabulary.js`，节奏规则在 `frontend/pacing.js`。释义与例句为课程整理，英美朗读使用设备合成语音，音色取决于设备支持。

## 本地免密预览

安装依赖后执行 `npm run preview`，访问 `http://127.0.0.1:4179`，无需账号密码。

本地预览将记录保存到 `outputs/local-preview-state.json`，刷新和重启会恢复。正式部署仍使用 MySQL。这个本地文件不包含在部署包中。

## 本地开发（已经有 MySQL）

创建数据库与专用账号，按 `.env.example` 填写 `.env`。安装 Node.js 22 或更高版本，执行 `npm ci`、`npm start`，访问 `http://localhost:3000`。

`APP_USERNAME` 是内部学习档案标识，默认 sunny，用于兼容已有数据，不是网页登录账号。已有 `.env` 中的 `APP_PASSWORD` 会被忽略，无需更改数据库密码。

## 接口

| 方法与路径 | 用途 |
| --- | --- |
| `GET /api/health` | 服务与数据库健康检查 |
| `GET /api/profile` | 获取个人学习档案，无需登录 |
| `GET /api/state` | 读取个人学习数据与版本号 |
| `PUT /api/state` | 带版本号保存，冲突返回 409 |

每次保存使用数据库事务，多个页面的旧版本不会覆盖较新数据。更新会继续使用原个人档案，保留已有学习进度；旧版账号表及密码哈希仅为数据兼容保留，不用于网页登录。

## 内容与检查

直接相关检查：`node --test tests/curriculum.test.js tests/api.test.js tests/month.test.js tests/wordbank.test.js`。覆盖课程词组完整性、答题与复习规则、旧记录兼容、免密接口、持久化事务及大词库。数据库事务检查使用替身，不替代真实 MySQL 检查。

真实 MySQL 检查：准备独立测试数据库，将 `.env` 的 `DB_NAME` 改为以 `_test` 结尾的库名，再运行 `npm run test:mysql`。检查只清理自己创建的测试账号，不删除数据库。不要对正式学习数据库运行测试。

当前开发机没有 Docker 或 MySQL，未实际启动数据库容器或执行真实 MySQL 检查。UI 联调使用 `tests/preview-server.js` 的本地文件存储，该预览服务不会用于正式部署。语音与录音依赖浏览器和设备支持。

隔离页面验收可运行 `node tests/preview-server.js --isolated`，地址为 `http://127.0.0.1:4180`，记录单独保存到忽略的 `outputs/qa-preview-state.json`，不会混入正常本地学习记录。
