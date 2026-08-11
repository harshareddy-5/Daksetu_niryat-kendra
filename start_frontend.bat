@echo off
echo =======================================================
echo  Starting DAKSETU - Kiosk & PWA Frontend (Vite + React)
echo =======================================================
cd /d "%~dp0frontend"
call npm install
call npm run dev
pause
