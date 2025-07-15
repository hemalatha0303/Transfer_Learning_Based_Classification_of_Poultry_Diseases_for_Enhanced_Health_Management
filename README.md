## Poultry Disease Classification Flask Application

A comprehensive Flask web application for classifying poultry diseases using machine learning and computer vision.

## Features

- 🤖 **AI-Powered Classification**: Advanced machine learning model for disease detection
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔒 **Secure File Upload**: Support for PNG, JPG, JPEG, and GIF formats (max 16MB)
- 📊 **Confidence Scoring**: Reliability indicators for each prediction
- 📈 **Classification History**: Track previous uploads and results
- 🔌 **RESTful API**: Programmatic access for integration
- ⚡ **Fast Processing**: Real-time image analysis and results

## Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "C:\Users\KKEK\OneDrive\Desktop\Classification-of-Poultry-Diseases"
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   ```bash
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application:**
   ```bash
   python app.py
   ```

6. **Open your browser and visit:**
   ```
   http://localhost:5000
   ```

## Project Structure

```
Classification-of-Poultry-Diseases/
├── app.py                              # Main Flask application
├── config.py                           # Configuration settings
├── requirements.txt                    # Python dependencies
├── poultry_diseases_classification.ipynb  # Jupyter notebook
├── README.md                           # Project documentation
├── templates/                          # HTML templates
│   ├── base.html                      # Base template
│   ├── index.html                     # Home page
│   ├── classify.html                  # Classification page
│   ├── result.html                    # Results page
│   ├── history.html                   # History page
│   ├── about.html                     # About page
│   ├── 404.html                       # 404 error page
│   └── 500.html                       # 500 error page
└── static/                            # Static files
    ├── css/
    │   └── style.css                  # Custom CSS styles
    ├── js/
    │   └── main.js                    # JavaScript functionality
    └── uploads/                       # Uploaded images (created automatically)
```

## Usage

### Web Interface

1. **Home Page**: Overview of the system and features
2. **Classify**: Upload images for disease classification
3. **History**: View previous classifications
4. **About**: Learn more about the project and technology

### API Endpoints

#### Classify Image
```
POST /api/classify
Content-Type: multipart/form-data

Parameters:
- file: Image file (PNG, JPG, JPEG, GIF)

Response:
{
    "prediction": "Disease Name",
    "confidence": 95.5,
    "filename": "uploaded_image.jpg",
    "timestamp": "2025-07-08T10:30:00"
}
```

### Example API Usage

```python
import requests

# Upload and classify an image
url = 'http://localhost:5000/api/classify'
files = {'file': open('chicken_image.jpg', 'rb')}

response = requests.post(url, files=files)
result = response.json()

print(f"Prediction: {result['prediction']}")
print(f"Confidence: {result['confidence']}%")
```

## Technology Stack

### Backend
- **Flask**: Web framework
- **Python**: Programming language
- **TensorFlow/Keras**: Machine learning framework
- **OpenCV**: Computer vision library
- **Pillow**: Image processing
- **NumPy**: Numerical computing

### Frontend
- **HTML5/CSS3**: Markup and styling
- **Bootstrap 5**: CSS framework
- **JavaScript**: Client-side functionality
- **Font Awesome**: Icons

## Configuration

The application supports multiple configuration environments:

- **Development**: Debug mode enabled, detailed logging
- **Production**: Optimized for deployment
- **Testing**: Configuration for unit tests

Environment variables:
- `FLASK_ENV`: Set to 'development' or 'production'
- `SECRET_KEY`: Flask secret key (required in production)
- `DATABASE_URL`: Database connection string
- `MODEL_PATH`: Path to the trained model file

## Model Integration

To integrate your trained model:

1. Save your trained model as `models/poultry_disease_model.h5`
2. Create a labels file at `models/labels.json` with class names
3. Update the classification logic in `app.py`

Example model integration:
```python
import tensorflow as tf
import json

# Load model and labels
model = tf.keras.models.load_model('models/poultry_disease_model.h5')
with open('models/labels.json', 'r') as f:
    labels = json.load(f)

# Classify image
def classify_image(image_path):
    # Preprocess image
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    
    # Make prediction
    predictions = model.predict(img_array)
    predicted_class = labels[np.argmax(predictions[0])]
    confidence = float(np.max(predictions[0]) * 100)
    
    return predicted_class, confidence
```

## Deployment

### Local Development
```bash
python app.py
```

### Production Deployment

1. **Using Gunicorn:**
   ```bash
   gunicorn --bind 0.0.0.0:5000 app:app
   ```

2. **Using Docker:**
   ```dockerfile
   FROM python:3.9-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   EXPOSE 5000
   CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
   ```

3. **Environment Variables for Production:**
   ```bash
   export FLASK_ENV=production
   export SECRET_KEY=your-secret-key-here
   export DATABASE_URL=your-database-url
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This AI-powered classification system is designed for educational and research purposes. While the model provides valuable insights, it should not replace professional veterinary diagnosis. Always consult with qualified veterinarians for proper medical advice and treatment.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- TensorFlow team for the machine learning framework
- Flask community for the web framework
- Bootstrap team for the CSS framework
- All contributors to the open-source libraries used in this project
