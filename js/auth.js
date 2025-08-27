// Authentication and User Management
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isLoading = false;
        this.init();
    }

    init() {
        this.loadUserFromStorage();
        this.updateHeader();
        this.createDemoUsers();
    }

    createDemoUsers() {
        const storedUsers = JSON.parse(localStorage.getItem('achury_users') || '[]');
        
        // Usuario demo normal
        const demoUserExists = storedUsers.some(u => u.email === 'demo@achuryabogados.com');
        if (!demoUserExists) {
            const demoUser = {
                id: 'demo-001',
                firstName: 'Demo',
                lastName: 'Usuario',
                email: 'demo@achuryabogados.com',
                phone: '+57 300 123 4567',
                identification: '12345678',
                role: 'user',
                caseType: 'seguros',
                registrationDate: new Date().toISOString(),
                isActive: true,
                status: 'approved',
                assignedLawyer: 'Dr. Carlos Achury',
                password: 'demo123'
            };
            storedUsers.push(demoUser);
        }
        
        // Usuario admin demo
        const adminExists = storedUsers.some(u => u.email === 'admin@achuryabogados.com');
        if (!adminExists) {
            const adminUser = {
                id: 'admin-001',
                firstName: 'Carlos',
                lastName: 'Achury',
                email: 'admin@achuryabogados.com',
                phone: '+57 (1) 234-5678',
                identification: '987654321',
                role: 'admin',
                registrationDate: new Date().toISOString(),
                isActive: true,
                password: 'admin123'
            };
            storedUsers.push(adminUser);
        }
        
        localStorage.setItem('achury_users', JSON.stringify(storedUsers));
    }

    loadUserFromStorage() {
        try {
            const storedUser = localStorage.getItem('achury_user');
            const storedSession = localStorage.getItem('achury_session');
            
            if (storedUser && storedSession) {
                const userData = JSON.parse(storedUser);
                const sessionData = JSON.parse(storedSession);
                
                // Verificar si la sesión no ha expirado (7 días)
                const sessionDate = new Date(sessionData.timestamp);
                const now = new Date();
                const daysDiff = (now.getTime() - sessionDate.getTime()) / (1000 * 3600 * 24);
                
                if (daysDiff < 7) {
                    this.currentUser = userData;
                } else {
                    // Sesión expirada
                    this.logout();
                }
            }
        } catch (error) {
            console.error('Error loading user session:', error);
            this.logout();
        }
    }

    async login(email, password) {
        this.isLoading = true;
        this.updateLoadingState();
        
        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Verificar credenciales
            const storedUsers = JSON.parse(localStorage.getItem('achury_users') || '[]');
            const foundUser = storedUsers.find(u => 
                u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );
            
            if (foundUser) {
                const { password: _, ...userWithoutPassword } = foundUser;
                this.currentUser = userWithoutPassword;
                
                // Guardar sesión
                localStorage.setItem('achury_user', JSON.stringify(userWithoutPassword));
                localStorage.setItem('achury_session', JSON.stringify({ 
                    timestamp: new Date().toISOString() 
                }));
                
                this.updateHeader();
                this.showToast('success', '¡Bienvenido!', 
                    `Hola ${foundUser.firstName}, has iniciado sesión correctamente.`);
                
                // Redirigir basado en el rol
                setTimeout(() => {
                    if (foundUser.role === 'admin') {
                        window.location.href = '/admin.html';
                    } else {
                        window.location.href = '/dashboard.html';
                    }
                }, 1000);
                
                return true;
            } else {
                this.showToast('error', 'Credenciales incorrectas', 
                    'Por favor verifica tu email y contraseña.');
                return false;
            }
        } catch (error) {
            this.showToast('error', 'Error al iniciar sesión', 
                'Por favor intenta nuevamente.');
            return false;
        } finally {
            this.isLoading = false;
            this.updateLoadingState();
        }
    }

    async register(userData) {
        this.isLoading = true;
        this.updateLoadingState();
        
        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Verificar si el email ya existe
            const storedUsers = JSON.parse(localStorage.getItem('achury_users') || '[]');
            const emailExists = storedUsers.some(u => 
                u.email.toLowerCase() === userData.email.toLowerCase()
            );
            
            if (emailExists) {
                this.showToast('error', 'Email ya registrado', 
                    'Este email ya está asociado a una cuenta existente.');
                return false;
            }
            
            // Crear nuevo usuario
            const newUser = {
                id: Date.now().toString(),
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone,
                identification: userData.identification,
                role: 'user',
                caseType: userData.caseType,
                registrationDate: new Date().toISOString(),
                isActive: true,
                status: 'pending'
            };
            
            // Guardar en "base de datos"
            const userWithPassword = { ...newUser, password: userData.password };
            storedUsers.push(userWithPassword);
            localStorage.setItem('achury_users', JSON.stringify(storedUsers));
            
            // Iniciar sesión automáticamente
            this.currentUser = newUser;
            localStorage.setItem('achury_user', JSON.stringify(newUser));
            localStorage.setItem('achury_session', JSON.stringify({ 
                timestamp: new Date().toISOString() 
            }));
            
            this.updateHeader();
            this.showToast('success', '¡Registro exitoso!', 
                'Tu cuenta ha sido creada y está pendiente de aprobación.');
            
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1000);
            
            return true;
        } catch (error) {
            this.showToast('error', 'Error al registrar', 
                'Por favor intenta nuevamente.');
            return false;
        } finally {
            this.isLoading = false;
            this.updateLoadingState();
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('achury_user');
        localStorage.removeItem('achury_session');
        this.updateHeader();
        this.showToast('success', 'Sesión cerrada', 
            'Has cerrado sesión correctamente.');
        
        // Redirigir a inicio si estamos en una página protegida
        if (window.location.pathname.includes('dashboard') || 
            window.location.pathname.includes('admin')) {
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    isAdmin() {
        return this.currentUser?.role === 'admin';
    }

    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/login.html';
            return false;
        }
        return true;
    }

    requireAdmin() {
        if (!this.requireAuth()) return false;
        
        if (!this.isAdmin()) {
            this.showToast('error', 'Acceso Denegado', 
                'No tienes permisos para acceder a esta área administrativa.');
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 2000);
            return false;
        }
        return true;
    }

    updateHeader() {
        const authButtons = document.getElementById('authButtons');
        if (!authButtons) return;

        if (this.currentUser) {
            const dashboardLink = this.isAdmin() ? '/admin.html' : '/dashboard.html';
            const dashboardLabel = this.isAdmin() ? 'Panel Admin' : 'Mi Portal';
            const userInitials = `${this.currentUser.firstName[0]}${this.currentUser.lastName[0]}`.toUpperCase();
            
            authButtons.innerHTML = `
                <a href="${dashboardLink}" class="btn btn-ghost">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${this.isAdmin() ? 
                            '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>' :
                            '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 9h6v6H9z"/>'
                        }
                    </svg>
                    ${dashboardLabel}
                </a>
                <div class="user-avatar" onclick="authManager.showUserMenu(event)">
                    <div class="avatar ${this.isAdmin() ? 'admin' : ''}">${userInitials}</div>
                    ${this.isAdmin() ? '<div class="admin-badge">A</div>' : ''}
                </div>
            `;
        } else {
            authButtons.innerHTML = `
                <a href="/login.html" class="btn btn-ghost">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M21 12H9"/>
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
    }

    showUserMenu(event) {
        event.stopPropagation();
        
        // Remover menú existente
        const existingMenu = document.querySelector('.user-menu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        const menu = document.createElement('div');
        menu.className = 'user-menu';
        menu.innerHTML = `
            <div class="user-info">
                <div class="user-name">${this.currentUser.firstName} ${this.currentUser.lastName}</div>
                <div class="user-email">${this.currentUser.email}</div>
                <div class="user-badges">
                    ${this.isAdmin() ? '<span class="badge-admin">Admin</span>' : ''}
                    ${this.currentUser.status ? `<span class="badge-status ${this.currentUser.status}">${this.currentUser.status}</span>` : ''}
                </div>
            </div>
            <div class="menu-divider"></div>
            <a href="${this.isAdmin() ? '/admin.html' : '/dashboard.html'}" class="menu-item">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${this.isAdmin() ? 
                        '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>' :
                        '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 9h6v6H9z"/>'
                    }
                </svg>
                ${this.isAdmin() ? 'Panel Admin' : 'Mi Portal'}
            </a>
            <div class="menu-divider"></div>
            <button class="menu-item logout" onclick="authManager.logout()">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                </svg>
                Cerrar Sesión
            </button>
        `;
        
        document.body.appendChild(menu);
        
        // Posicionar menú
        const rect = event.target.getBoundingClientRect();
        menu.style.top = `${rect.bottom + window.scrollY + 8}px`;
        menu.style.right = `16px`;
        
        // Cerrar menú al hacer click fuera
        setTimeout(() => {
            document.addEventListener('click', () => {
                menu.remove();
            }, { once: true });
        }, 0);
    }

    updateLoadingState() {
        const loadingElements = document.querySelectorAll('.loading-state');
        loadingElements.forEach(el => {
            if (this.isLoading) {
                el.style.display = 'flex';
            } else {
                el.style.display = 'none';
            }
        });
    }

    showToast(type, title, description) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-title">${title}</div>
            <div class="toast-description">${description}</div>
        `;
        
        container.appendChild(toast);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Add styles for user menu and avatar
const authStyles = `
.user-avatar {
    position: relative;
    cursor: pointer;
}

.avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: var(--primary);
    color: var(--primary-foreground);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-weight-medium);
    font-size: 0.875rem;
}

.avatar.admin {
    background-color: #ea580c;
}

.admin-badge {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 1.25rem;
    height: 1.25rem;
    background-color: var(--destructive);
    color: var(--destructive-foreground);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
}

.user-menu {
    position: fixed;
    width: 14rem;
    background: var(--popover);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 100;
    animation: slideIn 0.15s ease;
}

.user-info {
    padding: 0.75rem;
}

.user-name {
    font-weight: var(--font-weight-medium);
    font-size: 0.875rem;
}

.user-email {
    font-size: 0.75rem;
    color: var(--muted-foreground);
    margin-top: 0.25rem;
    word-break: break-all;
}

.user-badges {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.badge-admin, .badge-status {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
}

.badge-admin {
    background-color: #ea580c;
    color: white;
    border-color: #ea580c;
}

.badge-status.approved {
    background-color: var(--primary);
    color: var(--primary-foreground);
}

.badge-status.pending {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
}

.badge-status.rejected {
    background-color: var(--destructive);
    color: var(--destructive-foreground);
}

.menu-divider {
    height: 1px;
    background-color: var(--border);
    margin: 0.25rem 0;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    text-decoration: none;
    color: var(--foreground);
    font-size: 0.875rem;
    border: none;
    background: none;
    cursor: pointer;
    transition: background-color 0.15s ease;
}

.menu-item:hover {
    background-color: var(--accent);
}

.menu-item.logout {
    color: var(--destructive);
}

@keyframes slideOut {
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = authStyles;
document.head.appendChild(styleSheet);