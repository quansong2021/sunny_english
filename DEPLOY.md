# 自行部署与 MySQL 使用说明

## 一键启动应用与 MySQL

先安装并启动 Docker Engine / Docker Desktop 与 Docker Compose v2（支持 `up --wait`）。Windows 使用 Linux 容器模式。

解压整个项目，保留目录结构。

Windows 双击 `deploy-windows.cmd`，也可在终端运行：

```powershell
.\deploy-windows.cmd start
```

Linux：

```bash
bash deploy-linux.sh start
```

首次执行会生成 `.env` 和三组不同的随机密码，启动 MySQL 8.4、初始化数据表和个人账号，并启动应用。首次需要下载镜像和安装依赖，等待健康检查结束。

访问 `http://localhost:4178`。服务器部署将 localhost 换成服务器 IP，并在防火墙或云安全组允许网站端口。

用编辑器打开 `.env`，查看 `APP_USERNAME` 和 `APP_PASSWORD` 后登录。保留该文件，后续启动不会重新生成密码。Linux 自动将文件权限设为仅当前用户可读写；Windows 使用当前目录权限。不要将真实 `.env` 发给他人或放入代码仓库。

## 常用操作

| 操作 | Windows | Linux |
| --- | --- | --- |
| 启动 / 更新代码 | `deploy-windows.cmd start` | `bash deploy-linux.sh start` |
| 停止 | `deploy-windows.cmd stop` | `bash deploy-linux.sh stop` |
| 重启 | `deploy-windows.cmd restart` | `bash deploy-linux.sh restart` |
| 查看状态 | `deploy-windows.cmd status` | `bash deploy-linux.sh status` |
| 查看日志 | `deploy-windows.cmd logs` | `bash deploy-linux.sh logs` |
| 备份数据库 | `deploy-windows.cmd backup` | `bash deploy-linux.sh backup` |

修改代码或 `.env` 后使用 start，它会重新构建并应用配置；restart 只重启现有容器。修改端口可在 `.env` 设置 `APP_PORT=8080` 后再次 start。

`APP_PASSWORD` 仅在首次创建账号时生效，修改它不会重置已有登录密码。MySQL 初始化密码也只在空数据目录初始化时使用；已有数据时不要重新生成 `.env` 或直接修改数据库密码变量。

## 数据保存与同步

MySQL 使用 `mysql_data` 命名 volume，停止、重启和重建应用不会清空学习数据，脚本不删除 volume。

MySQL 3306 端口默认不向宿主机或公网发布，仅应用容器可以访问。网站提供个人账号登录，没有公开注册入口。

| 表 | 内容 |
| --- | --- |
| `users` | 账号、密码哈希、称呼、每日目标、数据版本 |
| `sessions` | 登录会话与到期时间 |
| `lesson_progress` | 课程各步骤完成情况 |
| `vocabulary_reviews` | 词汇熟悉程度、下次复习时间 |
| `speaking_answers` | 口语文字回答 |
| `review_notes` | 课程复习笔记 |
| `study_activity` | 每日完成的学习步骤 |
| `learning_preferences` | 每日节奏、已记录时长、上次学习位置 |

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

恢复会以备份表和记录替换当前内容，恢复后使用备份时的登录密码。恢复命令在容器内部使用数据库管理员账号执行。不要执行 `docker compose down -v`，它会删除数据库 volume。

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
APP_PASSWORD=首次创建账号使用的至少12位密码
COOKIE_SECURE=false
```

安装 Node.js 22 或更高版本，执行 `npm ci`、`npm start`，默认监听 3000。数据表会在首次启动时创建。长期运行可用 systemd 或现有进程管理工具管理 Node。

当前 Compose 固定使用配套 MySQL 容器。如果要保留应用容器并连接外部 MySQL，需修改 compose.yaml 中 app 的 `DB_HOST`、账号和 `depends_on`；仅改 `.env` 中 DB_HOST 不会覆盖 Compose 中固定的 mysql 地址。

等确定服务器的 Linux 发行版后，再按实际环境进行 MySQL 安装、服务管理和备份配置。

## 域名与 HTTPS

公网使用请通过 HTTPS 登录。使用服务器 Nginx 将域名代理到应用端口，参考 `deploy/nginx.conf.example`，替换域名和证书路径再启用。

使用宿主机 Nginx 时，在 `.env` 设置：

```dotenv
BIND_ADDRESS=127.0.0.1
COOKIE_SECURE=true
```

再次 start 后通过 HTTPS 域名访问。`COOKIE_SECURE=true` 时不通过普通 HTTP 地址登录。HTTPS 也用于远程设备的麦克风权限。证书与 DNS 等服务器和域名确定后配置，脚本不自动更改它们。

参考：[Docker Compose 环境变量](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/)、[MySQL 官方容器部署说明](https://dev.mysql.com/doc/refman/8.4/en/docker-mysql-getting-started.html)。
