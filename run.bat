@echo off
REM Poultry Disease Classification - Windows Startup Script

echo Starting Poultry Disease Classification Flask Application...

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install/upgrade dependencies
echo Installing dependencies...
python -m pip install --upgrade pip
pip install -r requirements.txt

REM Create necessary directories
echo Creating directories...
if not exist "static\uploads" mkdir static\uploads
if not exist "logs" mkdir logs
if not exist "models" mkdir models

REM Set environment variables
set FLASK_ENV=development
set FLASK_APP=app.py

REM Start the application
echo Starting Flask application...
echo Visit http://localhost:5000 to access the application
echo Press Ctrl+C to stop the server

python app.py

pause
