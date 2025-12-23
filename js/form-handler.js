// ===== Form Validation & Submission =====

class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.setupRealTimeValidation();
    }
    
    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Skip honeypot field
        if (field.id === 'website') return true;
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Text length validation
        if (field.type === 'textarea' && value.length < 10) {
            isValid = false;
            errorMessage = 'Please provide more details (minimum 10 characters)';
        }
        
        // Update field state
        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }
        
        return isValid;
    }
    
    showError(field, message) {
        this.clearError(field);
        
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #FF2E7A;
            font-size: 0.8rem;
            margin-top: 0.3rem;
        `;
        
        field.parentNode.appendChild(errorElement);
    }
    
    clearError(field) {
        field.classList.remove('error');
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const fields = this.form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showFormError('Please fix the errors in the form.');
            return;
        }
        
        // Check honeypot (spam prevention)
        const honeypot = this.form.querySelector('#website');
        if (honeypot && honeypot.value) {
            // Bot detected - silently fail
            console.log('Bot detected via honeypot');
            this.showFormSuccess(); // Show fake success to bots
            return;
        }
        
        // Prepare form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // In production, replace this with your actual API endpoint
            await this.sendToAPI(data);
            
            // Show success
            this.showFormSuccess();
            this.form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormError('Failed to send message. Please try again or contact me directly.');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async sendToAPI(data) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In a real application, you would send the data to your backend
        // Example using Fetch API:
        
        const response = await fetch('https://formspree.io/f/xlgrpgve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response.json();
        
        
        // For demo purposes, simulate successful submission
        console.log('Form data:', data);
        return { success: true };
    }
    
    showFormSuccess(message = 'Message sent successfully! I\'ll get back to you soon.') {
        const statusElement = document.getElementById('formStatus') || this.createStatusElement();
        statusElement.textContent = message;
        statusElement.className = 'form-status success';
        statusElement.style.display = 'block';
        
        // Scroll to status element
        statusElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 5000);
    }
    
    showFormError(message) {
        const statusElement = document.getElementById('formStatus') || this.createStatusElement();
        statusElement.textContent = message;
        statusElement.className = 'form-status error';
        statusElement.style.display = 'block';
        
        // Scroll to status element
        statusElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    createStatusElement() {
        const statusElement = document.createElement('div');
        statusElement.id = 'formStatus';
        this.form.insertBefore(statusElement, this.form.querySelector('button[type="submit"]'));
        return statusElement;
    }
}

// ===== Contact Form =====
const contactFormHandler = new FormHandler('contactForm');

// ===== File Upload Enhancement (if needed) =====
function initFileUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        const label = input.nextElementSibling;
        
        input.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name || 'No file chosen';
            if (label && label.tagName === 'LABEL') {
                label.textContent = fileName;
            }
        });
    });
}

// ===== Character Counter for Textareas =====
function initCharacterCounters() {
    const textareas = document.querySelectorAll('textarea[maxlength]');
    
    textareas.forEach(textarea => {
        const maxLength = parseInt(textarea.getAttribute('maxlength'));
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            font-size: 0.8rem;
            color: var(--text-muted);
            text-align: right;
            margin-top: 0.3rem;
        `;
        
        textarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const currentLength = textarea.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength * 0.9) {
                counter.style.color = '#FF2E7A';
            } else if (currentLength > maxLength * 0.75) {
                counter.style.color = '#FFA500';
            } else {
                counter.style.color = 'var(--text-muted)';
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        updateCounter(); // Initial update
    });
}

// ===== Form Auto-save (for longer forms) =====
function initAutoSave() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        const formId = form.id || 'form_' + Math.random().toString(36).substr(2, 9);
        
        // Load saved data
        const savedData = localStorage.getItem(`form_${formId}`);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                inputs.forEach(input => {
                    if (data[input.name]) {
                        input.value = data[input.name];
                    }
                });
                
                // Show restore message
                const restoreMsg = document.createElement('div');
                restoreMsg.className = 'restore-message';
                restoreMsg.textContent = 'Previous data restored';
                restoreMsg.style.cssText = `
                    background: rgba(0, 212, 255, 0.1);
                    border: 1px solid var(--primary);
                    color: var(--primary);
                    padding: 0.5rem 1rem;
                    border-radius: var(--border-radius-sm);
                    margin-bottom: 1rem;
                    font-size: 0.9rem;
                `;
                
                form.insertBefore(restoreMsg, form.firstChild);
                
                // Remove message after 3 seconds
                setTimeout(() => restoreMsg.remove(), 3000);
            } catch (e) {
                console.error('Failed to restore form data:', e);
            }
        }
        
        // Save on input
        function saveFormData() {
            const data = {};
            inputs.forEach(input => {
                if (input.name && !input.type.includes('password')) {
                    data[input.name] = input.value;
                }
            });
            
            localStorage.setItem(`form_${formId}`, JSON.stringify(data));
        }
        
        inputs.forEach(input => {
            input.addEventListener('input', saveFormData);
        });
        
        // Clear saved data on successful submission
        form.addEventListener('submit', () => {
            setTimeout(() => {
                localStorage.removeItem(`form_${formId}`);
            }, 1000);
        });
    });
}

// ===== Initialize all form enhancements =====
document.addEventListener('DOMContentLoaded', () => {
    initFileUpload();
    initCharacterCounters();
    initAutoSave();
    
    // Add CSS for form enhancements
    const formStyles = `
        .error {
            border-color: #FF2E7A !important;
            background: rgba(255, 46, 122, 0.05) !important;
        }
        
        input:focus.error,
        textarea:focus.error,
        select:focus.error {
            box-shadow: 0 0 0 2px rgba(255, 46, 122, 0.2);
        }
        
        .form-status {
            padding: 1rem;
            border-radius: var(--border-radius-sm);
            margin: 1rem 0;
            font-weight: 500;
            display: none;
        }
        
        .form-status.success {
            background: rgba(0, 255, 0, 0.1);
            border: 1px solid #00ff00;
            color: #00ff00;
            display: block;
        }
        
        .form-status.error {
            background: rgba(255, 0, 0, 0.1);
            border: 1px solid #ff0000;
            color: #ff0000;
            display: block;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = formStyles;
    document.head.appendChild(styleSheet);
});

// ===== Export for module usage (optional) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormHandler };
}