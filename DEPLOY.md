# 自行部署与 MySQL 使用说明

## 一键启动应用与 MySQL

先安装并启动 Docker Engine / Docker Desktop 与 Docker Compose v2（支持 `up --wait`）。Windows 使用 Linux 容器模式。通过 Git 克隆的项目需要安装 Git。

解压整个项目，保留目录结构。

Windows 双击 `deploy-windows.cmd`，也可在终端运行：

```powershell
.\deploy-windows.cmd start
```

Linux：

```bash
bash deploy-linux.sh start
```

首次执行会生成 `.env` 和两组不同的数据库连接密码，启动 MySQL 8.4、初始化数据表和个人学习档案，并启动应用。首次需要下载镜像和安装依赖，等待健康检查结束。

访问 `http://localhost:4178`。服务器部署将 localhost 换成服务器 IP，并在防火墙或云安全组允许网站端口。

网页无需账号密码，打开即可使用。`.env` 只需保留给数据库连接及服务配置使用，后续启动不会重新生成数据库密码。Linux 自动将文件权限设为仅当前用户可读写；Windows 使用当前目录权限。不要将真实 `.env` 发给他人或放入代码仓库。

## 一条命令同步代码并更新

Linux：

```bash
sudo bash deploy-linux.sh start
```

Windows：

```powershell
.\deploy-windows.cmd start
```

脚本会检查本地修改，执行 `git pull --ff-only`，然后重新加载更新后的部署逻辑、构建并启动服务。它使用当前分支配置的上游分支，不强制覆盖、不自动合并分叉、不自动暂存本地修改。

如果有未提交修改、缺少上游配置、网络失败或分支无法直接更新，脚本会停止，现有服务不受此次启动命令影响。`.env` 等被忽略的文件不计为本地代码修改。

ZIP 解压目录没有 `.git` 时会提示跳过同步，部署解压出的文件。需要自动获取后续更新时，使用 Git 克隆项目。

### 第一次升级旧脚本

在已经克隆的项目目录执行：

```bash
git pull --ff-only
sudo bash deploy-linux.sh start
```

旧脚本还没有自动拉取功能，因此这次先手动拉取一次。以后只需执行 start。更新完成后刷新网页即可，已有 `.env` 和数据库 volume 都保留，原学习记录继续使用，网站无需密码。

## 常用操作

| 操作 | Windows | Linux |
| --- | --- | --- |
| 拉取最新代码并构建启动 | `deploy-windows.cmd start` | `bash deploy-linux.sh start` |
| 停止 | `deploy-windows.cmd stop` | `bash deploy-linux.sh stop` |
| 重启 | `deploy-windows.cmd restart` | `bash deploy-linux.sh restart` |
| 查看状态 | `deploy-windows.cmd status` | `bash deploy-linux.sh status` |
| 查看日志 | `deploy-windows.cmd logs` | `bash deploy-linux.sh logs` |
| 备份数据库 | `deploy-windows.cmd backup` | `bash deploy-linux.sh backup` |

修改 `.env` 后使用 start，它会同步代码、重新构建并应用配置；restart 只重启现有容器，不拉取代码。自己修改了仓库中的代码时，需要先提交或移走修改，才能运行 start。修改端口可在 `.env` 设置 `APP_PORT=8080` 后再次 start。

旧版 `.env` 中的 `APP_PASSWORD` 已不再使用，可原样保留；不需要删除 `.env` 或重置数据库。`APP_USERNAME` 仅用于定位原来的个人学习档案，默认 sunny。MySQL 初始化密码也只在空数据目录初始化时使用；已有数据时不要重新生成 `.env` 或直接修改数据库密码变量。

## 数据保存与同步

MySQL 使用 `mysql_data` 命名 volume，停止、重启和重建应用不会清空学习数据，脚本不删除 volume。

MySQL 3306 端口默认不向宿主机或公网发布，仅应用容器可以访问。网站免密打开，访问同一部署地址的设备共享该个人档案的学习记录。

| 表 | 内容 |
| --- | --- |
| `users` | 个人档案、称呼、每日目标、数据版本；旧哈希字段仅作兼容 |
| `sessions` | 旧版会话表，免密模式不依赖它 |
| `lesson_progress` | 课程各步骤完成情况 |
| `vocabulary_reviews` | 词汇熟悉程度、下次复习时间 |
| `speaking_answers` | 口语文字回答 |
| `review_notes` | 课程复习笔记 |
| `study_activity` | 每日完成的学习步骤 |
| `learning_preferences` | 每日节奏、已记录时长、上次学习位置 |
| `dictionary_entries` | 内置常用词库与课程词条 |
| `dictionary_metadata` | 词库导入版本，避免每次启动重复导入 |
| `saved_words` | 收藏的生词、释义摘要和原例句 |

前端显示「待保存」，接口成功后显示「已保存到服务器」。网络失败可点击状态按钮重试；离开页面前提示尚未保存。多端同时修改出现冲突时，先在学习偏好导出当前记录，再载入服务器记录，按需重新导入。

旧版纯前端记录可从旧页面导出 JSON，在新版「学习偏好 → 导入记录」。不同域名的浏览器本地记录不会自动迁移。录音当前仅页面回听，不上传数据库。

## 30 课与弹性节奏

课程编号是顺序，不绑定日历截止日期。可以直接进入任意一课，按内容类型或课次范围筛选。

- 轻量：20 分钟，建议 5 个词、2 个口语问题；其余保留到下次。
- 按计划：使用学习偏好中的每日目标，默认 40 分钟。
- 状态不错：60 分钟，也可直接继续下一课，不强制完成额外课程。
- 今天暂缓：不计新任务、不自动完成课程，保留位置；恢复后回到原节奏。下一天默认回到日常目标，不生成补交任务。

已完成步骤按当时的计划分钟记录，改变节奏不会重新计算这些步骤。词汇在多课重复出现时共享熟悉程度和复习时间。

升级后启动程序会自动创建 `learning_preferences` 表，不修改已有表结构。旧版 7 课的数据和旧 JSON 导入文件仍可使用。

词库版本还会自动创建字典及生词表，导入随代码打包的词库；无需手动导入 SQL 或访问外部词典 API。基础释义由后端本地缓存提供，收藏的数据仍写入 MySQL。词库首次导入可能多花几秒，等待脚本显示 Ready 即可。

## 备份与恢复

backup 命令生成 `backups/sunny-时间.sql`，包含账号和学习数据。请另存一份到服务器以外，同时保留 `.env`。

Linux 恢复示例：先备份当前数据，再执行以下命令。

```bash
bash deploy-linux.sh stop
docker compose --env-file .env up -d --wait mysql
docker compose --env-file .env exec -T mysql sh -c \
  'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" exec mysql --default-character-set=utf8mb4 -u root sunny_english' \
  < backups/你的备份.sql
bash deploy-linux.sh start
```

恢复会以备份表和记录替换当前内容，恢复后直接打开网站即可继续使用备份中的学习记录。恢复命令在容器内部使用数据库管理员账号执行。不要执行 `docker compose down -v`，它会删除数据库 volume。

## 连接独立 MySQL

也可以使用服务器上独立安装的 MySQL 8.x。数据库管理员先创建数据库和应用专用账号：

```sql
CREATE DATABASE sunny_english CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER 'sunny'@'localhost' IDENTIFIED BY '替换为独立数据库密码';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, REFERENCES
ON sunny_english.* TO 'sunny'@'localhost';
```

应用直接运行在同一台服务器时，`.env` 填写：

```dotenv
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=sunny_english
DB_USER=sunny
DB_PASSWORD=你的数据库密码
APP_USERNAME=sunny
```

安装 Node.js 22 或更高版本，执行 `npm ci`、`npm start`，默认监听 3000。数据表会在首次启动时创建。长期运行可用 systemd 或现有进程管理工具管理 Node。

当前 Compose 固定使用配套 MySQL 容器。如果要保留应用容器并连接外部 MySQL，需修改 compose.yaml 中 app 的 `DB_HOST`、账号和 `depends_on`；仅改 `.env` 中 DB_HOST 不会覆盖 Compose 中固定的 mysql 地址。

等确定服务器的 Linux 发行版后，再按实际环境进行 MySQL 安装、服务管理和备份配置。

## 域名与 HTTPS

域名访问可通过 HTTPS 提供加密连接。使用服务器 Nginx 将域名代理到应用端口，参考 `deploy/nginx.conf.example`，替换域名和证书路径再启用。

使用宿主机 Nginx 时，在 `.env` 设置：

```dotenv
BIND_ADDRESS=127.0.0.1
```

再次 start 后通过 HTTPS 域名访问。网站不需要登录。HTTPS 也用于远程设备的麦克风权限。证书与 DNS 等服务器和域名确定后配置，脚本不自动更改它们。

参考：[Docker Compose 环境变量](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/)、[MySQL 官方容器部署说明](https://dev.mysql.com/doc/refman/8.4/en/docker-mysql-getting-started.html)。
