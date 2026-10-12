@echo off
REM Host the static production build (out\) locally.
REM Usage: double-click start.bat (port 3000), or: start.bat 4000

setlocal
set PORT=%~1
if "%PORT%"=="" set PORT=3000

if not exist "out\index.html" (
  echo No production build found in out\. Building first...
  where npm >nul 2>nul
  if errorlevel 1 (
    if exist "C:\Program Files\nodejs\npm.cmd" (
      call "C:\Program Files\nodejs\npm.cmd" run build
    ) else (
      echo Node.js not found. Install it from https://nodejs.org/
      pause
      exit /b 1
    )
  ) else (
    call npm run build
  )
  if errorlevel 1 (
    echo Build failed. Aborting.
    pause
    exit /b 1
  )
)

where node >nul 2>nul
if errorlevel 1 (
  if exist "C:\Program Files\nodejs\node.exe" (
    set "NODE_BIN=C:\Program Files\nodejs\node.exe"
  ) else (
    echo Node.js not found. Install it from https://nodejs.org/
    pause
    exit /b 1
  )
) else (
  set NODE_BIN=node
)

echo Serving out\ at http://localhost:%PORT%
"%NODE_BIN%" scripts\serve.js
