// ===== DOM Elements =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const backToTopBtn = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const scrollProgress = document.getElementById('scrollProgress');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// ===== Mobile Menu Toggle =====
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when clicking on links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Back to Top Button =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Theme Toggle =====
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animate toggle
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 200);
});

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// ===== Scroll Progress Bar =====
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('#header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Form Submission Handler =====
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const formStatus = document.getElementById('formStatus');
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // In a real application, you would send this data to your backend
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status success';
            formStatus.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
            
        } catch (error) {
            // Show error message
            formStatus.textContent = 'Something went wrong. Please try again or contact me directly via email.';
            formStatus.className = 'form-status error';
            formStatus.style.display = 'block';
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== Newsletter Form Handler =====
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Simple email validation
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success (in a real app, you'd show a proper notification)
            alert('Thank you for subscribing! You\'ll receive updates about Web3 and blockchain development.');
            
            // Reset form
            newsletterForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// ===== Skill Progress Animation on Scroll =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressItems = entry.target.querySelectorAll('.progress-item');
            progressItems.forEach(item => {
                const progressFill = item.querySelector('.progress-fill');
                const width = progressFill.style.width;
                progressFill.style.width = '0%';
                
                setTimeout(() => {
                    progressFill.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

// Observe skills progress section
const skillsProgressSection = document.querySelector('.skills-progress');
if (skillsProgressSection) {
    observer.observe(skillsProgressSection);
}

// ===== Initialize Tooltips =====
const techItems = document.querySelectorAll('.tech-item[data-tooltip]');
techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = item.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        const rect = item.getBoundingClientRect();
        tooltip.style.position = 'absolute';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        
        item._tooltip = tooltip;
    });
    
    item.addEventListener('mouseleave', () => {
        if (item._tooltip) {
            item._tooltip.remove();
            delete item._tooltip;
        }
    });
});

// ===== Initialize with console welcome =====
console.log(`
%c🔧 Build3rDAO Portfolio 🔧
%c
Welcome to my Web3 Developer Portfolio!
Feel free to explore the code and connect with me.

📧 Email: build3rdao@gmail.com
🐦 Twitter: @build3rdao
💻 GitHub: #github.com/build3rdao

Let's build the decentralized future together! 🚀
`, 
'color: #00D4FF; font-size: 18px; font-weight: bold;',
'color: #B0B8FF; font-size: 14px;'
);

// ===== Window Load Complete =====
window.addEventListener('load', () => {
    // Add loaded class for animations
    document.body.classList.add('loaded');
    
    // Remove the placeholder SVG if real image loads successfully
    const developerImg = document.querySelector('.developer-img');
    if (developerImg && developerImg.src.includes('data:image/svg+xml')) {
        developerImg.onload = function() {
            if (!this.src.includes('data:image/svg+xml')) {
                this.style.opacity = '0';
                setTimeout(() => {
                    this.style.transition = 'opacity 0.5s ease';
                    this.style.opacity = '1';
                }, 100);
            }
        };
    }
});