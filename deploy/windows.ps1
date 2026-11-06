param([ValidateSet('start','stop','restart','status','logs','backup')][string]$Action='start')
$ErrorActionPreference='Stop'
$projectRoot=Split-Path -Parent $PSScriptRoot
Push-Location -LiteralPath $projectRoot
try {
  if ($Action -eq 'start') {
    if (Test-Path -LiteralPath '.git') {
      if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'Git is required to update this checkout.' }
      $repoRoot=& git rev-parse --show-toplevel
      if ($LASTEXITCODE -ne 0) { throw 'Could not read the repository root.' }
      if ([IO.Path]::GetFullPath($repoRoot) -ne [IO.Path]::GetFullPath($projectRoot)) { throw 'Unexpected repository root.' }
      $changes=& git status --porcelain --untracked-files=normal
      if ($LASTEXITCODE -ne 0) { throw 'Could not check local changes.' }
      if ($changes) { throw 'Local changes found. Commit or move them before updating. No files were overwritten.' }
      $upstream=& git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}'
      if ($LASTEXITCODE -ne 0) { throw 'No upstream branch. Configure the branch tracking remote first.' }
      Write-Host "Updating source from $upstream..."
      & git pull --ff-only
      if ($LASTEXITCODE -ne 0) { throw 'Git update failed. Deployment was not started.' }
    } else {
      Write-Host 'Source archive detected; no Git repository to update. Deploying the extracted files.'
    }
  }
  # Invoke the current worker after pull; the updater itself was parsed before pull.
  & (Join-Path $PSScriptRoot 'windows-run.ps1') -Action $Action
  if ($LASTEXITCODE -ne 0) { throw 'Deployment failed.' }
} catch { Write-Host $_.Exception.Message -ForegroundColor Red; exit 1 }
finally { Pop-Location }
