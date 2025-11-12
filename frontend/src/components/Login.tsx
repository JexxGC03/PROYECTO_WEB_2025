import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard' | 'documents') => void;
}

export function Login({ onLogin, onNavigate }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    onLogin();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={onNavigate} isLoggedIn={false} />

      <div className="flex-1 bg-gray-50 py-16">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <div className="bg-[#8B1538] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
              <CardDescription>
                Acceda a su cuenta para gestionar casos y documentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Recordarme</span>
                  </label>
                  <a href="#" className="text-[#8B1538] hover:underline">
                    ¿Olvidó su contraseña?
                  </a>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#8B1538] hover:bg-[#6B0F28] text-white"
                >
                  Iniciar Sesión
                </Button>

                <div className="text-center text-sm text-gray-600">
                  ¿No tiene una cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('register')}
                    className="text-[#8B1538] hover:underline"
                  >
                    Registrarse
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Al iniciar sesión, acepta nuestros términos de servicio y política de privacidad.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
