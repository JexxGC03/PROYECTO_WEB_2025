// Main application JavaScript - Complete functionality
(function() {
    'use strict';

    // Application state management
    const AppState = {
        currentUser: null,
        isAdmin: false,
        isLoggedIn: false,
        
        init() {
            this.loadUserFromStorage();
            this.updateUI();
        },
        
        loadUserFromStorage() {
            const userData = localStorage.getItem('currentUser');
            if (userData) {
                this.currentUser = JSON.parse(userData);
                this.isLoggedIn = true;
                this.isAdmin = this.currentUser.role === 'admin';
            }
        },
        
        setUser(user) {
            this.currentUser = user;
            this.isLoggedIn = true;
            this.isAdmin = user.role === 'admin';
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.updateUI();
        },
        
        logout() {
            this.currentUser = null;
            this.isLoggedIn = false;
            this.isAdmin = false;
            localStorage.removeItem('currentUser');
            this.updateUI();
        },
        
        updateUI() {
            this.updateAuthButtons();
            this.updateNavigation();
        },
        
        updateAuthButtons() {
            const desktopButtons = document.getElementById('authButtons');
            const mobileButtons = document.getElementById('mobileAuthButtons');
            
            if (!desktopButtons && !mobileButtons) return;
            
            let buttonsHTML = '';
            
            if (this.isLoggedIn) {
                const dashboardUrl = this.isAdmin ? '/admin.html' : '/dashboard.html';
                const dashboardText = this.isAdmin ? 'Panel Admin' : 'Mi Portal';
                
                buttonsHTML = `
                    <a href="${dashboardUrl}" class="btn btn-outline">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <path d="M9 9h6v6H9z"/>
                        </svg>
                        ${dashboardText}
                    </a>
                    <button id="logoutBtn" class="btn btn-primary">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16,17 21,12 16,7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Cerrar Sesión
                    </button>
                `;
            } else {
                buttonsHTML = `
                    <a href="/login.html" class="btn btn-outline">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                            <polyline points="10,17 15,12 10,7"/>
                            <line x1="15" y1="12" x2="3" y2="12"/>
                        </svg>
                        Iniciar Sesión
                    </a>
                    <a href="/registro.html" class="btn btn-primary">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="8.5" cy="7" r="4"/>
                            <line x1="20" y1="8" x2="20" y2="14"/>
                            <line x1="23" y1="11" x2="17" y2="11"/>
                        </svg>
                        Registrarse
                    </a>
                `;
            }
            
            if (desktopButtons) {
                desktopButtons.innerHTML = buttonsHTML;
            }
            
            if (mobileButtons) {
                const mobileHTML = buttonsHTML.replace(/btn-outline/g, 'mobile-btn btn-outline')
                                             .replace(/btn-primary/g, 'mobile-btn btn-primary');
                mobileButtons.innerHTML = mobileHTML;
            }
            
            // Attach logout event listener
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    this.logout();
                    window.location.href = '/';
                });
            }
        },
        
        updateNavigation() {
            // Update active navigation links
            const currentPath = window.location.pathname;
            const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                link.classList.remove('active');
                
                if (href === '/' && (currentPath === '/' || currentPath === '/index.html')) {
                    link.classList.add('active');
                } else if (href !== '/' && currentPath.includes(href.replace('.html', ''))) {
                    link.classList.add('active');
                }
            });
        }
    };

    // Toast notifications
    const Toast = {
        show(message, type = 'success') {
            const container = document.getElementById('toastContainer');
            if (!container) return;
            
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `
                <div class="toast-title">${type === 'success' ? 'Éxito' : 'Error'}</div>
                <div class="toast-description">${message}</div>
            `;
            
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 4000);
        }
    };

    // Mobile menu functionality
    const MobileMenu = {
        init() {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            
            if (mobileMenuBtn && mobileMenu) {
                mobileMenuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('open');
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                        mobileMenu.classList.remove('open');
                    }
                });
            }
        }
    };

    // Tab functionality for dashboard pages
    const Tabs = {
        init() {
            const tabTriggers = document.querySelectorAll('.tab-trigger');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabTriggers.forEach(trigger => {
                trigger.addEventListener('click', () => {
                    const tabId = trigger.getAttribute('data-tab');
                    
                    // Update triggers
                    tabTriggers.forEach(t => t.classList.remove('active'));
                    trigger.classList.add('active');
                    
                    // Update content
                    tabContents.forEach(content => {
                        content.classList.remove('active');
                        if (content.getAttribute('data-tab') === tabId) {
                            content.classList.add('active');
                        }
                    });
                });
            });
        }
    };

    // Form handling
    const Forms = {
        init() {
            this.initRegistrationForm();
            this.initLoginForm();
        },
        
        initRegistrationForm() {
            const form = document.getElementById('registerForm');
            if (!form) return;
            
            let currentStep = 1;
            const totalSteps = 3;
            
            const nextBtn = document.getElementById('nextBtn');
            const prevBtn = document.getElementById('prevBtn');
            const submitBtn = document.getElementById('submitBtn');
            
            const updateStep = (step) => {
                // Update step indicator
                document.getElementById('currentStep').textContent = step;
                
                // Update progress bar
                const progress = (step / totalSteps) * 100;
                document.getElementById('progressBar').style.width = `${progress}%`;
                
                // Show/hide steps
                document.querySelectorAll('.form-step').forEach((stepEl, index) => {
                    stepEl.classList.toggle('active', index + 1 === step);
                });
                
                // Update buttons
                prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
                nextBtn.style.display = step === totalSteps ? 'none' : 'block';
                submitBtn.style.display = step === totalSteps ? 'block' : 'none';
            };
            
            nextBtn?.addEventListener('click', () => {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateStep(currentStep);
                }
            });
            
            prevBtn?.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateStep(currentStep);
                }
            });
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                
                const userData = {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    identification: formData.get('identification'),
                    caseType: formData.get('caseType'),
                    caseDescription: formData.get('caseDescription'),
                    urgencyLevel: formData.get('urgencyLevel'),
                    preferredContact: formData.get('preferredContact'),
                    role: 'user',
                    status: 'pending'
                };
                
                // Simulate registration
                setTimeout(() => {
                    localStorage.setItem('pendingUser', JSON.stringify(userData));
                    Toast.show('Registro completado. Su solicitud está siendo revisada.');
                    window.location.href = '/login.html';
                }, 1000);
            });
        },
        
        initLoginForm() {
            const form = document.getElementById('loginForm');
            if (!form) return;
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                
                const email = formData.get('email');
                const password = formData.get('password');
                
                // Demo users for testing
                const demoUsers = [
                    {
                        email: 'admin@achuryabogados.com',
                        password: 'admin123',
                        role: 'admin',
                        firstName: 'Admin',
                        lastName: 'Achury',
                        status: 'approved'
                    },
                    {
                        email: 'demo@achuryabogados.com',
                        password: 'demo123',
                        role: 'user',
                        firstName: 'Usuario',
                        lastName: 'Demo',
                        status: 'approved'
                    }
                ];
                
                const user = demoUsers.find(u => u.email === email && u.password === password);
                
                if (user) {
                    AppState.setUser(user);
                    Toast.show('Sesión iniciada correctamente');
                    
                    setTimeout(() => {
                        const redirectUrl = user.role === 'admin' ? '/admin.html' : '/dashboard.html';
                        window.location.href = redirectUrl;
                    }, 1000);
                } else {
                    Toast.show('Credenciales inválidas', 'error');
                }
            });
        }
    };

    // Page-specific functionality
    const PageManager = {
        init() {
            const currentPage = this.getCurrentPage();
            
            switch (currentPage) {
                case 'home':
                    this.initHomePage();
                    break;
                case 'dashboard':
                case 'admin':
                    this.initDashboardPage();
                    break;
            }
        },
        
        getCurrentPage() {
            const path = window.location.pathname;
            if (path === '/' || path === '/index.html') return 'home';
            if (path.includes('dashboard')) return 'dashboard';
            if (path.includes('admin')) return 'admin';
            return 'other';
        },
        
        initHomePage() {
            // Animate counters
            const counters = document.querySelectorAll('.stat-number');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                    }
                });
            });
            
            counters.forEach(counter => observer.observe(counter));
        },
        
        initDashboardPage() {
            // Load user data
            if (AppState.currentUser) {
                const userNameElements = document.querySelectorAll('.user-name');
                const userEmailElements = document.querySelectorAll('.user-email');
                
                userNameElements.forEach(el => {
                    el.textContent = `${AppState.currentUser.firstName} ${AppState.currentUser.lastName}`;
                });
                
                userEmailElements.forEach(el => {
                    el.textContent = AppState.currentUser.email;
                });
                
                // Update status badge
                const statusBadge = document.getElementById('userStatus');
                if (statusBadge) {
                    statusBadge.textContent = AppState.currentUser.status === 'approved' ? 'Aprobado' : 'Pendiente';
                    statusBadge.className = `status-badge ${AppState.currentUser.status}`;
                }
            }
        },
        
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
    };

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        AppState.init();
        MobileMenu.init();
        Tabs.init();
        Forms.init();
        PageManager.init();
    });

    // Export for global access
    window.AppState = AppState;
    window.Toast = Toast;

})();