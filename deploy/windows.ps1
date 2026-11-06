param([ValidateSet('start','stop','restart','status','logs','backup')][string]$Action='start')
$ErrorActionPreference='Stop'
$projectRoot=Split-Path -Parent $PSScriptRoot
Push-Location -LiteralPath $projectRoot
try {
  if (-not (Get-Command docker -ErrorAction SilentlyContinue)) { throw 'Install Docker Desktop (Linux containers) and start it first.' }
  & docker info *> $null
  if ($LASTEXITCODE -ne 0) { throw 'Docker is not running or is not accessible.' }
  & docker compose version *> $null
  if ($LASTEXITCODE -ne 0) { throw 'Docker Compose v2 is required.' }
  if (-not (Test-Path -LiteralPath '.env')) {
    if ($Action -ne 'start') { throw 'Run deploy-windows.cmd start first.' }
    function New-Secret {
      $bytes=New-Object byte[] 24
      $rng=[Security.Cryptography.RandomNumberGenerator]::Create()
      try { $rng.GetBytes($bytes) } finally { $rng.Dispose() }
      return ([BitConverter]::ToString($bytes)).Replace('-','').ToLowerInvariant()
    }
    $settings=@('APP_PORT=4178','BIND_ADDRESS=0.0.0.0','APP_USERNAME=sunny',('MYSQL_ROOT_PASSWORD='+(New-Secret)),('DB_PASSWORD='+(New-Secret)),'DB_HOST=127.0.0.1','DB_PORT=3306','DB_NAME=sunny_english','DB_USER=sunny')
    $envPath=Join-Path $projectRoot '.env'
    $file=[IO.File]::Open($envPath,[IO.FileMode]::CreateNew,[IO.FileAccess]::Write,[IO.FileShare]::None)
    try { $bytes=[Text.UTF8Encoding]::new($false).GetBytes(($settings -join "`n")+"`n");$file.Write($bytes,0,$bytes.Length) } finally { $file.Dispose() }
    Write-Host 'Created .env with database credentials. Website opens without a login.'
  }
  $composeArgs=@('compose','--env-file','.env','-f','compose.yaml')
  switch ($Action) {
    'start' { & docker @composeArgs up -d --build --wait --wait-timeout 180 }
    'stop' { & docker @composeArgs stop }
    'restart' { & docker @composeArgs restart }
    'status' { & docker @composeArgs ps }
    'logs' { & docker @composeArgs logs --tail 100 -f }
    'backup' {
      New-Item -ItemType Directory -Path 'backups' -Force | Out-Null
      & docker @composeArgs exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_PASSWORD" exec mysqldump --no-tablespaces --single-transaction --default-character-set=utf8mb4 -u sunny sunny_english > /tmp/sunny-backup.sql'
      if ($LASTEXITCODE -ne 0) { throw 'MySQL backup failed.' }
      $backupPath=Join-Path $projectRoot ('backups/sunny-'+(Get-Date -Format 'yyyyMMdd-HHmmss')+'.sql')
      & docker @composeArgs cp 'mysql:/tmp/sunny-backup.sql' $backupPath
      if ($LASTEXITCODE -ne 0) { throw 'Copying the backup failed.' }
      & docker @composeArgs exec -T mysql rm -f /tmp/sunny-backup.sql
      if ($LASTEXITCODE -ne 0) { throw 'Backup copied, but temporary backup cleanup failed.' }
      Write-Host "Backup saved: $backupPath"
    }
  }
  if ($LASTEXITCODE -ne 0) { throw 'Command failed. Check Docker, port conflicts, and service logs.' }
  if ($Action -eq 'start') {
    $portLine=Get-Content -LiteralPath '.env' | Where-Object { $_ -match '^APP_PORT=' } | Select-Object -First 1
    $sitePort=if($portLine){($portLine -split '=',2)[1].Trim()}else{'4178'}
    Write-Host "Ready: http://localhost:$sitePort"
    Write-Host 'No login required. Use server IP when accessing remotely.'
  }
} catch { Write-Host $_.Exception.Message -ForegroundColor Red; exit 1 }
finally { Pop-Location }
