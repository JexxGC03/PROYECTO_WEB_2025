import { Button } from './ui/button';
import { Page } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { assets } from '../assets';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage?: Page;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export function Header({ onNavigate, currentPage = 'inicio', isLoggedIn, onLogout }: HeaderProps) {
  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'equipo', label: 'Equipo' },
    { id: 'contacto', label: 'Contacto' }
  ];

  return (
    <header className="bg-[#6D0111] text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate('inicio')}
        >
          <div className="bg-white text-[#6D0111] p-1 rounded-full h-10 w-10 flex items-center justify-center overflow-hidden">
            <ImageWithFallback
              src={assets.logo}
              alt="Logo Rincón Achury"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg">Rincón Achury</h1>
            <p className="text-xs opacity-90">Abogados S.A.S.</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Page)}
              className={`hover:opacity-80 transition-opacity ${
                currentPage === item.id ? 'border-b-2 border-white pb-1' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-[#6D0111]"
                onClick={() => onNavigate('dashboard')}
              >
                Dashboard
              </Button>
              <Button
                className="bg-white text-[#6D0111] hover:bg-gray-100"
                onClick={onLogout}
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-[#6D0111]"
                onClick={() => onNavigate('login')}
              >
                Iniciar Sesión
              </Button>
              <Button
                className="bg-white text-[#6D0111] hover:bg-gray-100"
                onClick={() => onNavigate('register')}
              >
                Registrarse
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
