@echo off
echo =======================================================
echo  Starting DAKSETU - Dak Ghar Niryat Kendra AI Backend
echo =======================================================
cd /d "%~dp0backend"
python -m pip install -r requirements.txt
python run.py
pause
