// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Linear Cursor Prototype - Vanilla JavaScript Loaded');
    
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeCTAButton();
    initializeScrollEffects();
});

// Navigation Functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    activeLink.classList.add('active');
}

// Intersection Observer for scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Validate form
            if (validateContactForm(name, email, message)) {
                // Simulate form submission
                simulateFormSubmission(name, email, message);
            }
        });
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Form validation
function validateContactForm(name, email, message) {
    let isValid = true;
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate name
    if (!name || name.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message || message.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    switch (fieldName) {
        case 'name':
            if (value.length > 0 && value.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters long');
            }
            break;
        case 'email':
            if (value.length > 0) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showFieldError('email', 'Please enter a valid email address');
                }
            }
            break;
        case 'message':
            if (value.length > 0 && value.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters long');
            }
            break;
    }
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#dc2626';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    formGroup.appendChild(errorElement);
    field.style.borderColor = '#dc2626';
}

// Clear field error
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }
    
    field.style.borderColor = '';
}

// Clear all errors
function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// Simulate form submission
function simulateFormSubmission(name, email, message) {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Show success message
        showSuccessMessage(`Thank you, ${name}! Your message has been sent successfully.`);
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        console.log('Form submitted:', { name, email, message });
    }, 2000);
}

// Show success message
function showSuccessMessage(message) {
    const contactSection = document.getElementById('contact');
    
    // Remove existing success message
    const existingSuccess = contactSection.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Create success message
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    successElement.style.cssText = `
        background-color: #dcfce7;
        color: #166534;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        text-align: center;
        border: 1px solid #bbf7d0;
    `;
    
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(successElement, form);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successElement.remove();
    }, 5000);
}

// CTA Button Functionality
function initializeCTAButton() {
    const ctaButton = document.getElementById('cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to features section
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Add a subtle animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
}

// Scroll Effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
    });
    
    // Add smooth transition to header
    header.style.transition = 'transform 0.3s ease';
}

// Update active navigation link based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Feature Cards Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Console welcome message
console.log(`
🚀 Linear Cursor Prototype - Vanilla JavaScript Project
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Features:
  • Responsive Design
  • Smooth Scrolling
  • Form Validation
  • Scroll Animations
  • Interactive Elements

📝 Built with pure HTML, CSS, and JavaScript
🔧 No frameworks or libraries required
`);