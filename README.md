# Sunny English

独立部署的个人英语学习网站：JavaScript 前端 + Node.js 后端 + MySQL 8.4。

网页免密码，打开即用。使用同一部署地址的设备共享一份个人学习记录。

- 每天 40 分钟：词汇 15、听力 10、口语 10、复习 5。
- 第一个月 30 课：15 课工作英语、15 课日常与出国；30 段对话、60 道听力题、150 个口语问题。
- 300 个词汇练习位，覆盖 142 个不同词条与短语，后续课程穿插复习前面学过的词。
- 词条包含词性、常用释义、搭配、双语例句、用法提醒、词形变化与发音入口；首周词条另含英美音标。responsible 另含词族及用法对比。可跳转有道查词。
- 首页可选择轻量、按计划、状态不错、今天暂缓。30 课始终开放，可提前学后面的课。
- 轻量建议 20 分钟、5 个词、2 个口语问题；状态不错为 60 分钟，可继续下一课；暂停保留课程位置，恢复时延续之前的节奏。
- 工作场景含 HR 系统介绍、请假审批、报销表单、权限、审批节点与通知。
- MySQL 保存学习进度、单词复习、口语文字回答、笔记和每日记录；支持备份导入和导出。
- 英语播放使用浏览器 Speech Synthesis；录音使用 MediaRecorder，仅在页面内回听。没有接入 AI 评分。
- 浏览器首次录音需要用户允许麦克风。录音不会上传。

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

`npm test` 检查免密读取与保存、旧档案复用、数据校验、冲突处理及旧接口兼容，使用内存存储替身。

真实 MySQL 检查：准备独立测试数据库，将 `.env` 的 `DB_NAME` 改为以 `_test` 结尾的库名，再运行 `npm run test:mysql`。检查只清理自己创建的测试账号，不删除数据库。不要对正式学习数据库运行测试。

当前开发机没有 Docker 或 MySQL，未实际启动数据库容器或执行真实 MySQL 检查。UI 联调使用 `tests/preview-server.js` 的本地文件存储，该预览服务不会用于正式部署。语音与录音依赖浏览器和设备支持。
