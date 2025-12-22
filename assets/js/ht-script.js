// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) - Só se existir
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Initialize all functions
    initProgressBar();
    initNavbar();
    initBackToTop();
    initSmoothScrolling();
    initGallery();
    initCardHoverEffects();
    initIntersectionObserver();
    initPerformanceOptimizations();
    initCustomCursor();
    fixViewportHeight();
});

// Progress Bar Functionality
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return; // Verificação se existe
    
    function updateProgressBar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar(); // Initial call
}

// Navbar Functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return; // Verificação se existe
    
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial call
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return; // Verificação se existe
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    toggleBackToTop(); // Initial call
}

// Smooth Scrolling for Navigation Links (CORRIGIDO - removi duplicação)
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Se for só "#", ignora
            if (this.getAttribute('href') === '#') return;

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Gallery Functionality
function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.className = 'gallery-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            // Create enlarged image
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                transform: scale(0.8);
                transition: transform 0.3s ease;
            `;
            
            modal.appendChild(enlargedImg);
            document.body.appendChild(modal);
            
            // Animate in
            setTimeout(() => {
                modal.style.opacity = '1';
                enlargedImg.style.transform = 'scale(1)';
            }, 10);
            
            // Close modal on click
            modal.addEventListener('click', function() {
                modal.style.opacity = '0';
                enlargedImg.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
        });
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elementsToObserve = document.querySelectorAll(
        '.hero-card, .feature-card, .speaker-card, .schedule-card, .ticket-feature-card'
    );
    
    elementsToObserve.forEach(el => observer.observe(el));
}

// Card Hover Effects (CORRIGIDO - Removido conflito com CSS responsivo)
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.hero-card, .feature-card, .speaker-card, .ticket-feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Só aplica hover em dispositivos com mouse (não touch)
            if (window.matchMedia('(hover: hover)').matches) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.matchMedia('(hover: hover)').matches) {
                this.style.transform = '';
            }
        });
    });
}

// Performance Optimization
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Add custom cursor effect for interactive elements
function initCustomCursor() {
    // Só aplica em dispositivos com mouse
    if (window.matchMedia('(hover: hover)').matches) {
        const interactiveElements = document.querySelectorAll('a, button, .gallery-img');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                document.body.style.cursor = 'pointer';
            });
            
            element.addEventListener('mouseleave', function() {
                document.body.style.cursor = 'default';
            });
        });
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.gallery-modal, .ticket-modal');
        modals.forEach(modal => modal.remove());
    }
    
    // Space or Enter on buttons
    if ((e.key === ' ' || e.key === 'Enter') && e.target.classList.contains('btn-cta')) {
        e.preventDefault();
        e.target.click();
    }
});

// // Add viewport height fix for mobile (CORRIGIDO - Melhor handling)
// function fixViewportHeight() {
//     // Fix for mobile viewport height issues
//     const vh = window.innerHeight * 0.01;
//     document.documentElement.style.setProperty('--vh', `${vh}px`);
    
//     // Update CSS custom property for hero section height
//     const heroSection = document.querySelector('.hero-section');
//     if (heroSection && window.innerWidth <= 768) {
//         // Em mobile, usar altura calculada ao invés de 100vh
//         heroSection.style.minHeight = `calc(${window.innerHeight}px - 80px)`;
//     }
// }

// Add debounce function for performance
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


// Use debounced resize handler
const debouncedViewportFix = debounce(fixViewportHeight, 100);
window.addEventListener('resize', debouncedViewportFix);

// Add orientation change handler for mobile
window.addEventListener('orientationchange', function() {
    // Delay to ensure proper viewport calculation after orientation change
    setTimeout(fixViewportHeight, 500);
});

// Remove problematic functions that were causing conflicts
// Removed: initTicketButtons, initParallax, initTypingAnimation, initLoadingAnimation

// Success Message (mantido mas com verificação)
function showSuccessMessage(message = 'Mensagem enviada com sucesso!') {
    const messageEl = document.createElement('div');
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color, #80726B);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    messageEl.innerHTML = `
        <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
        ${message}
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(messageEl)) {
                document.body.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}


// Export functions for potential use in other scripts (CORRIGIDO)
window.KENConference = {
    showSuccessMessage,
    fixViewportHeight
};