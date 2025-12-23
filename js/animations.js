// ===== GSAP Animations (no library dependency version) =====

// Simple scroll reveal animation
function initScrollAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-card, .project-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
                if (!element.classList.contains('animated')) {
                    element.classList.add('animated');
                    
                    // Simple fade-in animation
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 100);
                }
            }
        });
    };
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check
    animateOnScroll();
}

// Hero typing effect
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (!heroTitle) return;
    
    const originalText = 'Decentralized Web';
    let currentText = '';
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        if (isDeleting) {
            currentText = originalText.substring(0, currentText.length - 1);
        } else {
            currentText = originalText.substring(0, currentText.length + 1);
        }
        
        heroTitle.textContent = currentText;
        
        if (!isDeleting && currentText === originalText) {
            // Pause at the end of typing
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            // Start typing again
            typingSpeed = 100;
            isDeleting = false;
        } else {
            // Continue typing/deleting
            typingSpeed = isDeleting ? 50 : 100;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// Floating animation for tech stack badges
function initFloatingAnimations() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        // Staggered floating animation
        item.style.animationDelay = `${index * 0.1}s`;
        
        // Hover effect
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Particle background animation
function initParticleBackground() {
    const animatedBg = document.querySelector('.animated-bg');
    if (!animatedBg) return;
    
    // Create particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        animatedBg.appendChild(particle);
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.3 + 0.1;
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(0, 212, 255, ${opacity});
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: float ${duration}s ease-in-out ${delay}s infinite;
        `;
    }
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: ${Math.random() * 0.3 + 0.1};
            }
            25% {
                transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.2);
            }
            50% {
                transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(0.8);
                opacity: ${Math.random() * 0.6 + 0.2};
            }
            75% {
                transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Interactive mouse follower effect
function initMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);
    
    // Style the follower
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(0, 212, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease;
        mix-blend-mode: difference;
    `;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate follower
    function animateFollower() {
        // Smooth following
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        // Hover effect on interactive elements
        const hoveredElement = document.elementFromPoint(mouseX, mouseY);
        const isInteractive = hoveredElement && (
            hoveredElement.tagName === 'A' ||
            hoveredElement.tagName === 'BUTTON' ||
            hoveredElement.classList.contains('btn') ||
            hoveredElement.classList.contains('social-link') ||
            hoveredElement.classList.contains('project-link')
        );
        
        if (isInteractive) {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.borderColor = 'rgba(0, 212, 255, 0.8)';
        } else {
            follower.style.width = '20px';
            follower.style.height = '20px';
            follower.style.borderColor = 'rgba(0, 212, 255, 0.5)';
        }
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Hide follower when mouse leaves window
    document.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        follower.style.opacity = '1';
    });
}

// Section entrance animations
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Animate elements within the section
                const animateElements = entry.target.querySelectorAll('.animate-on-scroll');
                animateElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('animated');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
        
        // Add animation classes to elements
        const elementsToAnimate = section.querySelectorAll('h2, h3, p, .btn');
        elementsToAnimate.forEach(el => {
            el.classList.add('animate-on-scroll');
        });
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initTypingEffect();
    initFloatingAnimations();
    initParticleBackground();
    initSectionAnimations();
    
    // Optional: Uncomment to enable mouse follower
    // initMouseFollower();
    
    // Add CSS for animations
    const animationStyles = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        section {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        .tech-item {
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes tech-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
});

// Performance optimization: Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            // Update animations only when scroll stops
            const event = new Event('scrollend');
            window.dispatchEvent(event);
        }, 100);
    }
});