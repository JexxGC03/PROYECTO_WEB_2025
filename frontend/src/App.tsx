import { useEffect, useState } from 'react';
import { Inicio } from './pages/Inicio';
import { Servicios } from './pages/Servicios';
import { Equipo } from './pages/Equipo';
import { Contacto } from './pages/Contacto';
import { Auth } from './pages/Auth';
import { DashboardAdmin } from './pages/DashboardAdmin';
import { DashboardCliente } from './pages/DashboardCliente';
import { Configuracion } from './pages/Configuracion';
import { apiMe } from './lib/api';

export type Page = 'inicio' | 'servicios' | 'equipo' | 'contacto' | 'login' | 'register' | 'dashboard' | 'configuracion';
export type UserRole = 'admin' | 'client' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('inicio');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userEmail, setUserEmail] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('accessToken'));
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      if (!accessToken) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const user = await apiMe(accessToken);
        setIsLoggedIn(true);
        const role = user.role === 'ADMIN' || user.role === 'AGENT' ? 'admin' : 'client';
        setUserRole(role);
        setUserEmail(user.email);
      } catch (err) {
        console.error('No se pudo validar la sesión', err);
        handleLogout();
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkSession();
  }, [accessToken]);

  const handleLogin = (token: string, role: 'admin' | 'client', email: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserEmail(email);
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserEmail('');
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    setCurrentPage('inicio');
  };

  useEffect(() => {
    if (!isLoggedIn && ['dashboard', 'configuracion'].includes(currentPage)) {
      setCurrentPage('login');
    }
  }, [isLoggedIn, currentPage]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Verificando sesión...</p>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <Inicio onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} />;
      case 'servicios':
        return <Servicios onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
      case 'equipo':
        return <Equipo onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
      case 'contacto':
        return <Contacto onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
      case 'login':
        return <Auth onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'register':
        return <Auth onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'dashboard':
        return userRole === 'admin' ? (
          <DashboardAdmin
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            userEmail={userEmail}
            accessToken={accessToken ?? ''}
          />
        ) : (
          <DashboardCliente
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            userEmail={userEmail}
            accessToken={accessToken ?? ''}
          />
        );
      case 'configuracion':
        return <Configuracion onNavigate={setCurrentPage} onLogout={handleLogout} userEmail={userEmail} />;
      default:
        return <Inicio onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
}
