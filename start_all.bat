@echo off
echo ===================================================================
echo   DAKSETU – SMART EXPORT ASSISTANT (SIH Problem DGKN-2026-09)
echo   Starting Full-Stack AI Prototype (Backend + Frontend)
echo ===================================================================

start "DakSetu Backend (FastAPI)" cmd /k "%~dp0start_backend.bat"
timeout /t 2 /nobreak >nul
start "DakSetu Frontend (React/Vite)" cmd /k "%~dp0start_frontend.bat"

echo.
echo Both servers launched!
echo - Backend API: http://localhost:8000 (Interactive Docs: http://localhost:8000/docs)
echo - Frontend UI: http://localhost:5173
echo.
