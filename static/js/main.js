// Main JavaScript file for Poultry Disease Classification

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize file upload enhancements
    initializeFileUpload();
    
    // Initialize progress bars
    initializeProgressBars();
    
    // Initialize tooltips and popovers
    initializeBootstrapComponents();
});

// Initialize fade-in animations for cards
function initializeAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Enhanced file upload functionality
function initializeFileUpload() {
    const fileInput = document.getElementById('file');
    const uploadForm = document.getElementById('uploadForm');
    
    if (fileInput) {
        // File preview functionality
        fileInput.addEventListener('change', handleFileSelect);
        
        // Drag and drop functionality
        const uploadArea = fileInput.closest('.card-body');
        if (uploadArea) {
            uploadArea.addEventListener('dragover', handleDragOver);
            uploadArea.addEventListener('dragleave', handleDragLeave);
            uploadArea.addEventListener('drop', handleFileDrop);
        }
    }
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleFormSubmit);
    }
}

// Handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        validateAndPreviewFile(file);
    }
}

// Handle drag over
function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
}

// Handle drag leave
function handleDragLeave(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
}

// Handle file drop
function handleFileDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const fileInput = document.getElementById('file');
        fileInput.files = files;
        validateAndPreviewFile(files[0]);
    }
}

// Validate and preview file
function validateAndPreviewFile(file) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const maxSize = 16 * 1024 * 1024; // 16MB
    
    if (!allowedTypes.includes(file.type)) {
        showAlert('Invalid file type. Please upload PNG, JPG, JPEG, or GIF files.', 'danger');
        return;
    }
    
    if (file.size > maxSize) {
        showAlert('File too large. Please upload files smaller than 16MB.', 'danger');
        return;
    }
    
    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('preview');
        const imagePreview = document.getElementById('imagePreview');
        
        if (preview && imagePreview) {
            preview.src = e.target.result;
            imagePreview.style.display = 'block';
            imagePreview.classList.add('slide-up');
        }
    };
    reader.readAsDataURL(file);
}

// Handle form submission
function handleFormSubmit(event) {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Analyzing...';
        submitBtn.disabled = true;
        
        // Add loading class to form
        event.target.classList.add('loading');
    }
}

// Initialize progress bars with animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Initialize Bootstrap components
function initializeBootstrapComponents() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Show alert messages
function showAlert(message, type = 'info') {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show`;
    alertContainer.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertContainer, container.firstChild);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertContainer.parentNode) {
                alertContainer.remove();
            }
        }, 5000);
    }
}

// API functions for programmatic access
class ClassificationAPI {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
    }
    
    async classifyImage(file) {
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const response = await fetch(`${this.baseUrl}/api/classify`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Classification API error:', error);
            throw error;
        }
    }
}

// Export API class for use in other scripts
window.ClassificationAPI = ClassificationAPI;

// Utility functions
const Utils = {
    // Format file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            showAlert('Copied to clipboard!', 'success');
        } catch (err) {
            console.error('Failed to copy: ', err);
            showAlert('Failed to copy to clipboard', 'danger');
        }
    }
};

// Export utilities
window.Utils = Utils;
