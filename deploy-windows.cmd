@echo off
setlocal
where pwsh.exe >nul 2>nul
if errorlevel 1 (
  powershell.exe -NoProfile -ExecutionPolicy RemoteSigned -File "%~dp0deploy\windows.ps1" %*
) else (
  pwsh.exe -NoProfile -ExecutionPolicy RemoteSigned -File "%~dp0deploy\windows.ps1" %*
)
set "result=%errorlevel%"
if not "%result%"=="0" pause
if "%result%"=="0" if "%~1"=="" pause
exit /b %result%
