@echo off
cd /d "%~dp0"
echo Starting local web server for AngularJS Demo...
echo Server running at http://localhost:8000
echo.

set "PY_EXE=C:\Users\anj\AppData\Local\Python\bin\python.exe"

if exist "%PY_EXE%" (
    start http://localhost:8000
    "%PY_EXE%" server.py
) else (
    start http://localhost:8000
    python server.py
)
pause
