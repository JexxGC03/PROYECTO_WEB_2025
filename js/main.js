// Main JavaScript functionality
class App {
    constructor() {
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initNavigation();
        this.initAnimations();
        this.initPageSpecificFeatures();
    }

    initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('open');
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenu.classList.remove('open');
                }
            });

            // Close mobile menu when clicking on links
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                });
            });
        }
    }

    initNavigation() {
        // Update active navigation links based on current page
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === '/' && currentPath === '/') {
                link.classList.add('active');
            } else if (href !== '/' && currentPath.includes(href.replace('.html', ''))) {
                link.classList.add('active');
            }
        });
    }

    initAnimations() {
        // Intersection Observer for animations
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-fade-in-left');
        
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) translateX(0)';
                    }
                });
            }, { threshold: 0.1 });

            animatedElements.forEach(el => {
                // Set initial state
                el.style.opacity = '0';
                if (el.classList.contains('animate-fade-in-up')) {
                    el.style.transform = 'translateY(20px)';
                } else if (el.classList.contains('animate-fade-in-left')) {
                    el.style.transform = 'translateX(20px)';
                }
                
                observer.observe(el);
            });
        }
    }

    initPageSpecificFeatures() {
        const path = window.location.pathname;
        
        if (path.includes('login')) {
            this.initLoginPage();
        } else if (path.includes('registro')) {
            this.initRegisterPage();
        } else if (path.includes('dashboard')) {
            this.initDashboardPage();
        } else if (path.includes('admin')) {
            this.initAdminPage();
        }
    }

    initLoginPage() {
        const loginForm = document.getElementById('loginForm');
        if (!loginForm) return;

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(loginForm);
            const email = formData.get('email');
            const password = formData.get('password');
            
            if (this.validateLoginForm(email, password)) {
                await authManager.login(email, password);
            }
        });

        // Demo login buttons
        const demoUserBtn = document.getElementById('demoUserLogin');
        const demoAdminBtn = document.getElementById('demoAdminLogin');
        
        if (demoUserBtn) {
            demoUserBtn.addEventListener('click', async () => {
                await authManager.login('demo@achuryabogados.com', 'demo123');
            });
        }
        
        if (demoAdminBtn) {
            demoAdminBtn.addEventListener('click', async () => {
                await authManager.login('admin@achuryabogados.com', 'admin123');
            });
        }

        // Toggle password visibility
        const togglePasswordBtns = document.querySelectorAll('.toggle-password');
        togglePasswordBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.previousElementSibling;
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                
                const icon = btn.querySelector('svg');
                if (type === 'text') {
                    icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
                } else {
                    icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
                }
            });
        });
    }

    initRegisterPage() {
        const registerForm = document.getElementById('registerForm');
        if (!registerForm) return;

        let currentStep = 1;
        const totalSteps = 3;

        // Step navigation
        const nextBtns = document.querySelectorAll('.btn-next');
        const prevBtns = document.querySelectorAll('.btn-prev');
        
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.validateStep(currentStep)) {
                    currentStep = Math.min(currentStep + 1, totalSteps);
                    this.updateStep(currentStep);
                }
            });
        });
        
        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentStep = Math.max(currentStep - 1, 1);
                this.updateStep(currentStep);
            });
        });

        // Form submission
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (this.validateStep(3)) {
                const formData = new FormData(registerForm);
                const userData = {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    identification: formData.get('identification'),
                    password: formData.get('password'),
                    caseType: formData.get('caseType'),
                    caseDescription: formData.get('caseDescription'),
                    urgencyLevel: formData.get('urgencyLevel')
                };
                
                await authManager.register(userData);
            }
        });
    }

    initDashboardPage() {
        // Check authentication
        if (!authManager.requireAuth()) return;
        
        // Initialize dashboard tabs
        this.initTabs();
        
        // Load user data
        this.loadUserDashboard();
    }

    initAdminPage() {
        // Check admin authorization
        if (!authManager.requireAdmin()) return;
        
        // Initialize admin tabs
        this.initTabs();
        
        // Load admin data
        this.loadAdminDashboard();
    }

    initTabs() {
        const tabTriggers = document.querySelectorAll('.tab-trigger');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const targetTab = trigger.getAttribute('data-tab');
                
                // Update active trigger
                tabTriggers.forEach(t => t.classList.remove('active'));
                trigger.classList.add('active');
                
                // Update active content
                tabContents.forEach(content => {
                    if (content.getAttribute('data-tab') === targetTab) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }

    validateLoginForm(email, password) {
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        if (!email || !email.includes('@')) {
            this.showFieldError('email', 'Por favor ingresa un email válido');
            isValid = false;
        }
        
        if (!password || password.length < 6) {
            this.showFieldError('password', 'La contraseña debe tener al menos 6 caracteres');
            isValid = false;
        }
        
        return isValid;
    }

    validateStep(step) {
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        let isValid = true;
        
        if (step === 1) {
            const firstName = document.querySelector('input[name="firstName"]')?.value;
            const lastName = document.querySelector('input[name="lastName"]')?.value;
            const email = document.querySelector('input[name="email"]')?.value;
            const phone = document.querySelector('input[name="phone"]')?.value;
            const identification = document.querySelector('input[name="identification"]')?.value;
            const password = document.querySelector('input[name="password"]')?.value;
            const confirmPassword = document.querySelector('input[name="confirmPassword"]')?.value;
            
            if (!firstName) {
                this.showFieldError('firstName', 'Nombre es requerido');
                isValid = false;
            }
            if (!lastName) {
                this.showFieldError('lastName', 'Apellido es requerido');
                isValid = false;
            }
            if (!email || !email.includes('@')) {
                this.showFieldError('email', 'Email válido es requerido');
                isValid = false;
            }
            if (!phone) {
                this.showFieldError('phone', 'Teléfono es requerido');
                isValid = false;
            }
            if (!identification) {
                this.showFieldError('identification', 'Identificación es requerida');
                isValid = false;
            }
            if (!password || password.length < 6) {
                this.showFieldError('password', 'Contraseña debe tener al menos 6 caracteres');
                isValid = false;
            }
            if (password !== confirmPassword) {
                this.showFieldError('confirmPassword', 'Las contraseñas no coinciden');
                isValid = false;
            }
        }
        
        if (step === 2) {
            const caseType = document.querySelector('input[name="caseType"]:checked')?.value;
            const caseDescription = document.querySelector('textarea[name="caseDescription"]')?.value;
            const urgencyLevel = document.querySelector('input[name="urgencyLevel"]:checked')?.value;
            
            if (!caseType) {
                this.showFieldError('caseType', 'Selecciona un tipo de caso');
                isValid = false;
            }
            if (!caseDescription) {
                this.showFieldError('caseDescription', 'Descripción del caso es requerida');
                isValid = false;
            }
            if (!urgencyLevel) {
                this.showFieldError('urgencyLevel', 'Selecciona un nivel de urgencia');
                isValid = false;
            }
        }
        
        if (step === 3) {
            const preferredContact = document.querySelector('input[name="preferredContact"]:checked')?.value;
            const termsAccepted = document.querySelector('input[name="termsAccepted"]')?.checked;
            const privacyAccepted = document.querySelector('input[name="privacyAccepted"]')?.checked;
            
            if (!preferredContact) {
                this.showFieldError('preferredContact', 'Selecciona un método de contacto');
                isValid = false;
            }
            if (!termsAccepted) {
                this.showFieldError('termsAccepted', 'Debes aceptar los términos y condiciones');
                isValid = false;
            }
            if (!privacyAccepted) {
                this.showFieldError('privacyAccepted', 'Debes aceptar la política de privacidad');
                isValid = false;
            }
        }
        
        return isValid;
    }

    updateStep(step) {
        // Update progress bar
        const progress = (step / 3) * 100;
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        // Update step indicator
        const stepIndicator = document.querySelector('.step-indicator');
        if (stepIndicator) {
            stepIndicator.textContent = `Paso ${step} de 3`;
        }
        
        // Show/hide steps
        document.querySelectorAll('.form-step').forEach((stepEl, index) => {
            if (index + 1 === step) {
                stepEl.style.display = 'block';
            } else {
                stepEl.style.display = 'none';
            }
        });
        
        // Update navigation buttons
        const prevBtn = document.querySelector('.btn-prev');
        const nextBtn = document.querySelector('.btn-next');
        const submitBtn = document.querySelector('.btn-submit');
        
        if (prevBtn) {
            prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
        }
        
        if (nextBtn && submitBtn) {
            if (step === 3) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'inline-flex';
            } else {
                nextBtn.style.display = 'inline-flex';
                submitBtn.style.display = 'none';
            }
        }
    }

    showFieldError(fieldName, message) {
        const field = document.querySelector(`input[name="${fieldName}"], textarea[name="${fieldName}"], select[name="${fieldName}"]`);
        if (!field) return;
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = 'var(--destructive)';
        error.style.fontSize = '0.875rem';
        error.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(error);
        field.style.borderColor = 'var(--destructive)';
        
        // Remove error when field is modified
        field.addEventListener('input', () => {
            error.remove();
            field.style.borderColor = '';
        }, { once: true });
    }

    loadUserDashboard() {
        const user = authManager.currentUser;
        if (!user) return;
        
        // Update user info in dashboard
        const userNameElements = document.querySelectorAll('.user-name');
        userNameElements.forEach(el => {
            el.textContent = `${user.firstName} ${user.lastName}`;
        });
        
        const userEmailElements = document.querySelectorAll('.user-email');
        userEmailElements.forEach(el => {
            el.textContent = user.email;
        });
        
        // Load case data and other user-specific content
        this.loadCaseData(user);
    }

    loadAdminDashboard() {
        const user = authManager.currentUser;
        if (!user) return;
        
        // Load admin-specific data
        this.loadAdminStats();
        this.loadClientsList();
        this.loadServicesList();
        this.loadNotifications();
    }

    loadCaseData(user) {
        // Simulate case data based on user status
        const caseData = {
            caseNumber: "AC-2024-001",
            status: user.status === 'approved' ? "En progreso" : user.status === 'pending' ? "Pendiente de aprobación" : "Rechazado",
            progress: user.status === 'approved' ? 65 : 0,
            lawyer: user.assignedLawyer || "Por asignar",
            nextAppointment: user.status === 'approved' ? "2024-01-15" : null,
            documentsCount: user.status === 'approved' ? 8 : 0
        };
        
        // Update case info in dashboard
        Object.keys(caseData).forEach(key => {
            const elements = document.querySelectorAll(`[data-case="${key}"]`);
            elements.forEach(el => {
                if (key === 'progress' && el.tagName === 'DIV') {
                    el.style.width = `${caseData[key]}%`;
                } else {
                    el.textContent = caseData[key];
                }
            });
        });
    }

    loadAdminStats() {
        // Load admin statistics from localStorage
        const users = JSON.parse(localStorage.getItem('achury_users') || '[]');
        const clients = users.filter(u => u.role === 'user');
        
        const stats = {
            totalClients: clients.length,
            pendingClients: clients.filter(c => c.status === 'pending').length,
            approvedClients: clients.filter(c => c.status === 'approved').length,
            activeServices: 3 // Hardcoded for demo
        };
        
        // Update stats in dashboard
        Object.keys(stats).forEach(key => {
            const elements = document.querySelectorAll(`[data-stat="${key}"]`);
            elements.forEach(el => {
                el.textContent = stats[key];
            });
        });
    }

    loadClientsList() {
        // Load and display clients list for admin
        const users = JSON.parse(localStorage.getItem('achury_users') || '[]');
        const clients = users.filter(u => u.role === 'user');
        
        const clientsList = document.getElementById('clientsList');
        if (!clientsList) return;
        
        clientsList.innerHTML = clients.map(client => `
            <div class="client-item">
                <div class="client-info">
                    <div class="client-name">${client.firstName} ${client.lastName}</div>
                    <div class="client-email">${client.email}</div>
                    <div class="client-case">${this.getCaseTypeName(client.caseType)}</div>
                </div>
                <div class="client-status">
                    <span class="status-badge ${client.status}">${client.status}</span>
                </div>
                <div class="client-actions">
                    ${client.status === 'pending' ? `
                        <button class="btn btn-sm btn-outline" onclick="app.approveClient('${client.id}')">Aprobar</button>
                        <button class="btn btn-sm btn-outline" onclick="app.rejectClient('${client.id}')">Rechazar</button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    loadServicesList() {
        // Load services from localStorage or use defaults
        const services = JSON.parse(localStorage.getItem('achury_services') || JSON.stringify([
            {
                id: '1',
                title: 'Derecho de Seguros',
                description: 'Especialización en reclamaciones de seguros automotrices, de salud, hogar y comerciales.',
                icon: '🛡️',
                category: 'seguros',
                isActive: true
            },
            {
                id: '2',
                title: 'Derecho Médico',
                description: 'Asesoría integral en responsabilidad médica, negligencia hospitalaria y derechos de los pacientes.',
                icon: '🏥',
                category: 'medico',
                isActive: true
            },
            {
                id: '3',
                title: 'Derecho Penal',
                description: 'Defensa penal especializada con amplia experiencia en todas las etapas del proceso penal.',
                icon: '⚖️',
                category: 'penal',
                isActive: true
            }
        ]));
        
        const servicesList = document.getElementById('servicesList');
        if (!servicesList) return;
        
        servicesList.innerHTML = services.map(service => `
            <div class="service-item">
                <div class="service-icon">${service.icon}</div>
                <div class="service-info">
                    <div class="service-name">${service.title}</div>
                    <div class="service-description">${service.description}</div>
                    <div class="service-meta">
                        <span class="category-badge">${service.category}</span>
                        <span class="status-badge ${service.isActive ? 'active' : 'inactive'}">
                            ${service.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                    </div>
                </div>
                <div class="service-actions">
                    <button class="btn btn-sm btn-outline" onclick="app.editService('${service.id}')">Editar</button>
                    <button class="btn btn-sm btn-outline destructive" onclick="app.deleteService('${service.id}')">Eliminar</button>
                </div>
            </div>
        `).join('');
    }

    loadNotifications() {
        // Load notifications from localStorage or use defaults
        const notifications = JSON.parse(localStorage.getItem('achury_notifications') || JSON.stringify([
            {
                id: '1',
                title: 'Audiencia programada',
                description: 'Audiencia de conciliación - Caso AC-2024-001',
                type: 'hearing',
                date: '2024-01-20',
                clientId: 'demo-001',
                isRead: false
            },
            {
                id: '2',
                title: 'Plazo de respuesta',
                description: 'Vence plazo para responder demanda - Caso AC-2024-002',
                type: 'deadline',
                date: '2024-01-18',
                isRead: false
            }
        ]));
        
        const notificationsList = document.getElementById('notificationsList');
        if (!notificationsList) return;
        
        notificationsList.innerHTML = notifications.map(notification => `
            <div class="notification-item ${notification.isRead ? 'read' : 'unread'}">
                <div class="notification-type ${notification.type}">
                    ${this.getNotificationIcon(notification.type)}
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-description">${notification.description}</div>
                    <div class="notification-date">${notification.date}</div>
                </div>
                ${!notification.isRead ? '<div class="notification-badge"></div>' : ''}
            </div>
        `).join('');
    }

    getCaseTypeName(type) {
        const types = {
            'seguros': 'Derecho de Seguros',
            'medico': 'Derecho Médico',
            'penal': 'Derecho Penal',
            'criminologia': 'Ciencias Penales y Criminológicas',
            'procesal': 'Derecho Procesal',
            'consultoria': 'Consultoría Legal'
        };
        return types[type] || 'Asesoría Legal';
    }

    getNotificationIcon(type) {
        const icons = {
            'deadline': '⏰',
            'hearing': '📅',
            'meeting': '👥',
            'document': '📄'
        };
        return icons[type] || '📋';
    }

    approveClient(clientId) {
        const users = JSON.parse(localStorage.getItem('achury_users') || '[]');
        const userIndex = users.findIndex(u => u.id === clientId);
        
        if (userIndex !== -1) {
            users[userIndex].status = 'approved';
            users[userIndex].assignedLawyer = 'Dr. Carlos Achury';
            localStorage.setItem('achury_users', JSON.stringify(users));
            
            authManager.showToast('success', 'Cliente aprobado', 'El cliente ha sido aprobado exitosamente.');
            this.loadClientsList();
            this.loadAdminStats();
        }
    }

    rejectClient(clientId) {
        const users = JSON.parse(localStorage.getItem('achury_users') || '[]');
        const userIndex = users.findIndex(u => u.id === clientId);
        
        if (userIndex !== -1) {
            users[userIndex].status = 'rejected';
            localStorage.setItem('achury_users', JSON.stringify(users));
            
            authManager.showToast('success', 'Cliente rechazado', 'El registro del cliente ha sido rechazado.');
            this.loadClientsList();
            this.loadAdminStats();
        }
    }

    editService(serviceId) {
        authManager.showToast('info', 'Función no disponible', 'La edición de servicios estará disponible próximamente.');
    }

    deleteService(serviceId) {
        if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
            let services = JSON.parse(localStorage.getItem('achury_services') || '[]');
            services = services.filter(s => s.id !== serviceId);
            localStorage.setItem('achury_services', JSON.stringify(services));
            
            authManager.showToast('success', 'Servicio eliminado', 'El servicio ha sido eliminado exitosamente.');
            this.loadServicesList();
        }
    }
}

// Initialize the app
const app = new App();

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

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    app.initNavigation();
});