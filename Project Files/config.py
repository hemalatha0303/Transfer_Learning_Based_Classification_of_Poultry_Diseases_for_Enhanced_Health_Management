import os
from datetime import timedelta

class Config:
    """Base configuration class"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here-change-in-production'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    UPLOAD_FOLDER = 'static/uploads'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    
    # Database configuration (for future use)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///poultry_classification.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Session configuration
    PERMANENT_SESSION_LIFETIME = timedelta(hours=24)
    
    # Model configuration
    MODEL_PATH = os.environ.get('MODEL_PATH') or 'models/poultry_disease_model.h5'
    MODEL_LABELS = os.environ.get('MODEL_LABELS') or 'models/labels.json'
    
    # Logging configuration
    LOG_LEVEL = os.environ.get('LOG_LEVEL') or 'INFO'
    LOG_FILE = os.environ.get('LOG_FILE') or 'logs/app.log'

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    ENV = 'development'

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    ENV = 'production'
    SECRET_KEY = os.environ.get('SECRET_KEY')
    
    # Ensure secret key is set in production
    if not SECRET_KEY:
        raise ValueError("SECRET_KEY environment variable must be set in production")

class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
