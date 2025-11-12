import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { UserPlus } from 'lucide-react';

interface RegisterProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard' | 'documents') => void;
}

export function Register({ onNavigate }: RegisterProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de registro
    onNavigate('login');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={onNavigate} isLoggedIn={false} />

      <div className="flex-1 bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <div className="bg-[#8B1538] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
              <CardDescription>
                Complete el formulario para registrarse en nuestro sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      type="text"
                      placeholder="Nombre"
                      value={formData.nombre}
                      onChange={(e) => handleChange('nombre', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input
                      id="apellido"
                      type="text"
                      placeholder="Apellido"
                      value={formData.apellido}
                      onChange={(e) => handleChange('apellido', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    placeholder="+57 300 123 4567"
                    value={formData.telefono}
                    onChange={(e) => handleChange('telefono', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="terms" className="mt-1 rounded" required />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Acepto los términos y condiciones del servicio, así como la política de privacidad 
                    y el tratamiento de mis datos personales.
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#8B1538] hover:bg-[#6B0F28] text-white"
                >
                  Registrarse
                </Button>

                <div className="text-center text-sm text-gray-600">
                  ¿Ya tiene una cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('login')}
                    className="text-[#8B1538] hover:underline"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
