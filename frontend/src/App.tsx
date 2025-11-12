import { useState } from 'react';
import { Inicio } from './pages/Inicio';
import { Servicios } from './pages/Servicios';
import { Equipo } from './pages/Equipo';
import { Contacto } from './pages/Contacto';
import { Auth } from './pages/Auth';
import { DashboardAdmin } from './pages/DashboardAdmin';
import { DashboardCliente } from './pages/DashboardCliente';
import { Configuracion } from './pages/Configuracion';

export type Page = 'inicio' | 'servicios' | 'equipo' | 'contacto' | 'login' | 'register' | 'dashboard' | 'configuracion';
export type UserRole = 'admin' | 'client' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('inicio');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (role: 'admin' | 'client', email: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserEmail(email);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserEmail('');
    setCurrentPage('inicio');
  };

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
        return userRole === 'admin' ? <DashboardAdmin onNavigate={setCurrentPage} onLogout={handleLogout} userEmail={userEmail} /> : <DashboardCliente onNavigate={setCurrentPage} onLogout={handleLogout} userEmail={userEmail} />;
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