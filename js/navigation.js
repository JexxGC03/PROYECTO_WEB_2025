// Navigation and Routing for HTML pages
class Router {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '/index.html': 'index.html',
            '/servicios.html': 'servicios.html',
            '/equipo.html': 'equipo.html', 
            '/testimonios.html': 'testimonios.html',
            '/login.html': 'login.html',
            '/registro.html': 'registro.html',
            '/dashboard.html': 'dashboard.html',
            '/admin.html': 'admin.html',
            '/404.html': '404.html'
        };
        
        this.init();
    }

    init() {
        this.handleNavigation();
        this.updateActiveLinks();
        this.setupErrorHandling();
    }

    handleNavigation() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.updateActiveLinks();
        });

        // Handle clicks on navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link && this.isInternalLink(link.href)) {
                this.updateActiveLinks();
            }
        });
    }

    isInternalLink(href) {
        return href.startsWith(window.location.origin) || 
               href.startsWith('/') || 
               href.startsWith('./') ||
               href.startsWith('../');
    }

    updateActiveLinks() {
        const currentPath = window.location.pathname;
        
        // Update desktop navigation
        const desktopLinks = document.querySelectorAll('.nav-desktop .nav-link');
        desktopLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', this.isActivePath(href, currentPath));
        });

        // Update mobile navigation
        const mobileLinks = document.querySelectorAll('.mobile-nav .mobile-nav-link');
        mobileLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', this.isActivePath(href, currentPath));
        });
    }

    isActivePath(href, currentPath) {
        if (href === '/' && currentPath === '/') return true;
        if (href === '/' && currentPath === '/index.html') return true;
        if (href !== '/' && currentPath.includes(href.replace('.html', ''))) return true;
        if (href === currentPath) return true;
        return false;
    }

    setupErrorHandling() {
        // Handle 404 errors for missing pages
        window.addEventListener('error', (e) => {
            if (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
                console.warn('Resource not found:', e.target.src || e.target.href);
            }
        });
    }

    // Navigate programmatically
    navigate(path) {
        if (this.routes[path]) {
            window.location.href = path;
        } else {
            window.location.href = '/404.html';
        }
    }

    // Go back
    goBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            this.navigate('/');
        }
    }
}

// Page-specific functionality
class PageManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') return 'home';
        if (path.includes('servicios')) return 'services';
        if (path.includes('equipo')) return 'team';
        if (path.includes('testimonios')) return 'testimonials';
        if (path.includes('login')) return 'login';
        if (path.includes('registro')) return 'register';
        if (path.includes('dashboard')) return 'dashboard';
        if (path.includes('admin')) return 'admin';
        if (path.includes('404')) return 'error';
        return 'unknown';
    }

    init() {
        this.initPageSpecificFeatures();
        this.initSmoothScrolling();
        this.initLazyLoading();
    }

    initPageSpecificFeatures() {
        switch (this.currentPage) {
            case 'home':
                this.initHomePageFeatures();
                break;
            case 'services':
                this.initServicesPageFeatures();
                break;
            case 'team':
                this.initTeamPageFeatures();
                break;
            case 'testimonials':
                this.initTestimonialsPageFeatures();
                break;
            case 'error':
                this.initErrorPageFeatures();
                break;
        }
    }

    initHomePageFeatures() {
        // Initialize home page specific features
        this.startHeroAnimations();
        this.initCounterAnimations();
    }

    initServicesPageFeatures() {
        // Initialize services page specific features
        this.initServiceCards();
    }

    initTeamPageFeatures() {
        // Initialize team page specific features
        this.initTeamMemberCards();
    }

    initTestimonialsPageFeatures() {
        // Initialize testimonials page specific features
        this.initTestimonialCards();
        this.initStatsCounters();
    }

    initErrorPageFeatures() {
        // Initialize error page specific features
        this.initErrorPageAnimations();
    }

    startHeroAnimations() {
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-fade-in-left');
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) translateX(0)';
            }, index * 200);
        });
    }

    initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/\d/g, '');
        
        if (isNaN(number)) return;

        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    }

    initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-0.5rem) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    initTeamMemberCards() {
        const memberCards = document.querySelectorAll('.team-member');
        memberCards.forEach(card => {
            const image = card.querySelector('.member-img');
            if (image) {
                card.addEventListener('mouseenter', () => {
                    image.style.transform = 'scale(1.1)';
                });
                
                card.addEventListener('mouseleave', () => {
                    image.style.transform = 'scale(1)';
                });
            }
        });
    }

    initTestimonialCards() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            // Add staggered animation
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-fade-in-up');
        });
    }

    initStatsCounters() {
        const statsNumbers = document.querySelectorAll('.stat-card .stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsNumbers.forEach(stat => observer.observe(stat));
    }

    initErrorPageFeatures() {
        // Add error page specific animations
        const errorIcon = document.querySelector('.error-icon');
        if (errorIcon) {
            errorIcon.style.animation = 'float 3s ease-in-out infinite';
        }
    }

    initSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    initLazyLoading() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize navigation and page management
const router = new Router();
const pageManager = new PageManager();

// Export for use in other files
window.router = router;
window.pageManager = pageManager;