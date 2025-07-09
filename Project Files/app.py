from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
from werkzeug.utils import secure_filename
import os
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.secret_key = 'dev-key-12345'

# Configuration
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')

@app.route('/about')
def about():
    """About page"""
    return render_template('about.html')

@app.route('/classify', methods=['GET', 'POST'])
def classify():
    """Image classification page"""
    if request.method == 'POST':
        # Check if file was uploaded
        if 'file' not in request.files:
            flash('No file selected')
            return redirect(request.url)
        
        file = request.files['file']
        
        if file.filename == '':
            flash('No file selected')
            return redirect(request.url)
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # Add timestamp to prevent filename conflicts
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_')
            filename = timestamp + filename
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            # TODO: add actual model prediction here
            result = {
                'filename': filename,
                'prediction': 'Healthy',
                'confidence': 87.3,
                'filepath': filepath
            }
            
            return render_template('result.html', result=result)
        else:
            flash('Invalid file type. Please upload PNG, JPG or JPEG files.')
    
    return render_template('classify.html')

@app.route('/api/classify', methods=['POST'])
def api_classify():
    """API endpoint for classification"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '' or not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file'}), 400
        
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_')
        filename = timestamp + filename
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Mock classification result - replace with your actual model
        result = {
            'prediction': 'Healthy',
            'confidence': 87.3,
            'filename': filename,
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Classification error: {str(e)}")
        return jsonify({'error': 'Classification failed'}), 500

@app.route('/history')
def history():
    """View classification history"""
    # This would typically come from a database
    # For now, we'll show uploaded files
    uploads = []
    if os.path.exists(UPLOAD_FOLDER):
        for filename in os.listdir(UPLOAD_FOLDER):
            if allowed_file(filename):
                uploads.append({
                    'filename': filename,
                    'upload_time': datetime.fromtimestamp(
                        os.path.getctime(os.path.join(UPLOAD_FOLDER, filename))
                    ).strftime('%Y-%m-%d %H:%M:%S')
                })
    
    return render_template('history.html', uploads=uploads)

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
