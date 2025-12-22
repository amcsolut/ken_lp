/**
 * KEN - Versão Simplificada do JavaScript (Sem Dependências Externas)
 * Use este arquivo se houver problemas com as bibliotecas CDN
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ==========================================
    // NAVBAR FUNCTIONALITY
    // ==========================================

    const navbar = document.getElementById('mainNavbar');

    // Handle navbar background on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // SMOOTH SCROLLING (Nativo)
    // ==========================================

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // TYPING EFFECT SIMPLES
    // ==========================================

    function simpleTypingEffect() {
        const typingElement = document.getElementById('typing');
        if (!typingElement) return;

        const words = ['Transformação', 'Mentoria', 'Paixão'];
        const colors = ['#a98f75'];
        let currentWordIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[currentWordIndex];
            const currentColor = colors[currentWordIndex];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            typingElement.style.color = currentColor;

            let delay = isDeleting ? 50 : 100;

            if (!isDeleting && currentCharIndex === currentWord.length) {
                delay = 2000;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % words.length;
            }

            setTimeout(type, delay);
        }

        type();
    }

    simpleTypingEffect();

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================

    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Smooth scroll to top
        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // MOBILE MENU
    // ==========================================

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // Close mobile menu when link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // ==========================================
    // SIMPLE FADE-IN ANIMATION
    // ==========================================

    function fadeInOnScroll() {
        const elements = document.querySelectorAll('.fade-in, [data-aos]');

        elements.forEach(function (element) {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize styles for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in, [data-aos]');
    fadeElements.forEach(function (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Run once on load

   
    // ==========================================
    // BUTTON HOVER EFFECTS
    // ==========================================

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function (btn) {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // ==========================================
    // CARD HOVER EFFECTS
    // ==========================================

    const cards = document.querySelectorAll('.pilar-card, .fundamento-card, .founder-card, .event-card');
    cards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // ==========================================
    // NAVBAR ACTIVE SECTION
    // ==========================================

    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 50;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection);

    // ==========================================
    // FORM HANDLING (se existir)
    // ==========================================

    const forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Formulário enviado! (Esta é uma demonstração)');
        });
    });

    // ==========================================
    // ERROR HANDLING PARA IMAGENS
    // ==========================================

    const images = document.querySelectorAll('img');
    images.forEach(function (img) {
        img.addEventListener('error', function () {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2Yzc1N2QiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW0gbsOjbyBlbmNvbnRyYWRhPC90ZXh0Pgo8L3N2Zz4=';
        });
    });

    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================

    console.log('%c🚀 KEN - Kingdom Enterprise Network (Versão Simplificada)', 'color: #a98f75; font-size: 18px; font-weight: bold;');
    console.log('%cVersão sem dependências externas carregada com sucesso!', 'color: #242b48; font-size: 12px;');

    // ==========================================
    // PERFORMANCE MONITOR
    // ==========================================

    // Log do tempo de carregamento
    window.addEventListener('load', function () {
        const loadTime = performance.now();
        console.log(`Página carregada em ${Math.round(loadTime)}ms`);
    });

});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function para otimização
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

// Throttle function para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ==========================================
// POLYFILLS (para browsers mais antigos)
// ==========================================

// Polyfill para Element.closest()
if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Polyfill para Element.matches()
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
}



/*=============================================
    =           Magnific Popup             =
=============================================*/

    // Função para inicializar o Magnific Popup
    function initializeMagnificPopup() {
        console.log("Inicializando Magnific Popup nos elementos .popup-video");

        // Remove inicializações anteriores
        $('.popup-video').off('click.magnificPopup');

        // Inicializa para vídeos
        $('.popup-video').magnificPopup({
            type: 'iframe'
        });
    }

    $(document).on('click', '.popup-video', function (e) {
        e.preventDefault(); // Impede o comportamento padrão

        $(this).magnificPopup({
            type: 'iframe',
            items: {
                src: $(this).attr('href')
            }
        }).magnificPopup('open');
    });
