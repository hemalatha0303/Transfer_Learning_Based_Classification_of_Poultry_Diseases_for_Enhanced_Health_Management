#!/bin/bash

# Poultry Disease Classification - Startup Script

echo "Starting Poultry Disease Classification Flask Application..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install/upgrade dependencies
echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create necessary directories
echo "Creating directories..."
mkdir -p static/uploads
mkdir -p logs
mkdir -p models

# Set environment variables
export FLASK_ENV=development
export FLASK_APP=app.py

# Start the application
echo "Starting Flask application..."
echo "Visit http://localhost:5000 to access the application"
echo "Press Ctrl+C to stop the server"

python app.py
