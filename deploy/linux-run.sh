#!/usr/bin/env bash
set -euo pipefail
project_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd -- "$project_root"
action="${1:-start}"
case "$action" in start|stop|restart|status|logs|backup) ;; *) printf 'Usage: bash deploy-linux.sh [start|stop|restart|status|logs|backup]\n' >&2; exit 1 ;; esac
command -v docker >/dev/null 2>&1 || { printf 'Install Docker Engine and Docker Compose v2 first.\n' >&2; exit 1; }
docker info >/dev/null 2>&1 || { printf 'Docker is not running, or your account cannot access it.\n' >&2; exit 1; }
docker compose version >/dev/null 2>&1 || { printf 'Docker Compose v2 is required.\n' >&2; exit 1; }
if [[ ! -f .env ]]; then
  [[ "$action" == start ]] || { printf 'Run bash deploy-linux.sh start first.\n' >&2; exit 1; }
  secret() { od -An -N24 -tx1 /dev/urandom | tr -d ' \n'; }
  (umask 077; set -o noclobber; cat > .env <<EOF
APP_PORT=4178
BIND_ADDRESS=0.0.0.0
APP_USERNAME=sunny
MYSQL_ROOT_PASSWORD=$(secret)
DB_PASSWORD=$(secret)
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=sunny_english
DB_USER=sunny
EOF
  )
  printf 'Created .env with database credentials. Website opens without a login.\n'
fi
compose=(docker compose --env-file .env -f compose.yaml)
case "$action" in
  start) "${compose[@]}" up -d --build --wait --wait-timeout 900 ;;
  stop) "${compose[@]}" stop ;;
  restart) "${compose[@]}" restart ;;
  status) "${compose[@]}" ps ;;
  logs) "${compose[@]}" logs --tail 100 -f ;;
  backup)
    mkdir -p backups
    backup_path="backups/sunny-$(date +%Y%m%d-%H%M%S).sql"
    (umask 077; "${compose[@]}" exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_PASSWORD" exec mysqldump --no-tablespaces --single-transaction --default-character-set=utf8mb4 -u sunny sunny_english' > "$backup_path.partial")
    mv -- "$backup_path.partial" "$backup_path"
    printf 'Backup saved: %s/%s\n' "$project_root" "$backup_path"
    ;;
esac
if [[ "$action" == start ]]; then
  site_port="$(sed -n 's/^APP_PORT=//p' .env | tr -d '\r')"
  printf 'Ready: http://localhost:%s\n' "${site_port:-4178}"
  printf 'No login required. Use server IP when accessing remotely.\n'
fi
