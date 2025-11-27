import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Scale, Mail, Lock, User, Phone, Building2, ArrowLeft, AlertCircle } from 'lucide-react';
import { Page } from '../App';
import { Alert, AlertDescription } from '../components/ui/alert';
import { apiLogin, apiRegister } from '../lib/api';

interface AuthProps {
  onLogin: (token: string, userRole: 'admin' | 'client', userEmail: string) => void;
  onNavigate: (page: Page) => void;
}

export function Auth({ onLogin, onNavigate }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    company: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('La contraseña debe tener al menos 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una letra mayúscula');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una letra minúscula');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('La contraseña debe contener al menos un número');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('La contraseña debe contener al menos un carácter especial (!@#$%^&*...)');
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    if (isLogin) {
      try {
        const res = await apiLogin(formData.email, formData.password);
        const role = res.user.role === 'ADMIN' || res.user.role === 'AGENT' ? 'admin' : 'client';
        onLogin(res.accessToken, role, res.user.email);
      } catch (error) {
        setErrors([(error as Error).message || 'No se pudo iniciar sesión']);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const passwordErrors = validatePassword(formData.password);

      if (passwordErrors.length > 0) {
        setErrors(passwordErrors);
        setIsSubmitting(false);
        return;
      }

      try {
        await apiRegister(formData.name, formData.email, formData.password);
        const loginRes = await apiLogin(formData.email, formData.password);
        const role = loginRes.user.role === 'ADMIN' || loginRes.user.role === 'AGENT' ? 'admin' : 'client';
        onLogin(loginRes.accessToken, role, loginRes.user.email);
      } catch (error) {
        setErrors([(error as Error).message || 'No se pudo registrar la cuenta']);
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image (Login) / Form (Register) */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          isLogin ? 'order-1' : 'order-2'
        } hidden lg:flex lg:w-1/2 relative bg-[#6D0111] overflow-hidden`}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1684335286201-2715b660eb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjI4MzU4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Law Office"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <Scale className="h-20 w-20 mb-6" />
          <h1 className="text-5xl mb-4">Rincón Achury</h1>
          <p className="text-xl text-center max-w-md opacity-90">
            Abogados
          </p>
          <div className="mt-12 space-y-4 max-w-md">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1">Experiencia Profesional</h3>
                <p className="text-sm opacity-80">Más de 20 años defendiendo sus derechos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1">Casos Exitosos</h3>
                <p className="text-sm opacity-80">Miles de casos resueltos satisfactoriamente</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form (Login) / Image (Register) */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          isLogin ? 'order-2' : 'order-1'
        } w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50`}
      >
        <div className="w-full max-w-md">
          {/* Back to Home Button */}
          <Button
            variant="ghost"
            className="mb-8 text-gray-600 hover:text-[#6D0111]"
            onClick={() => onNavigate('inicio')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Button>

          {/* Logo for Mobile */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Scale className="h-12 w-12 text-[#6D0111] mr-3" />
            <div>
              <h1 className="text-2xl text-[#6D0111]">Rincón Achury</h1>
              <p className="text-sm text-gray-600">Abogados</p>
            </div>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              {/* Toggle Tabs */}
              <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${
                    isLogin
                      ? 'bg-white text-[#6D0111] shadow'
                      : 'text-gray-600 hover:text-[#6D0111]'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${
                    !isLogin
                      ? 'bg-white text-[#6D0111] shadow'
                      : 'text-gray-600 hover:text-[#6D0111]'
                  }`}
                >
                  Registrarse
                </button>
              </div>

              {/* Form Title */}
              <div className="text-center mb-6">
                <h2 className="text-2xl text-[#6D0111] mb-2">
                  {isLogin ? '¡Bienvenido de nuevo!' : 'Crear cuenta'}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isLogin
                    ? 'Ingresa tus credenciales para acceder'
                    : 'Completa el formulario para registrarte'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Register-only fields with transition */}
                <div
                  className={`space-y-4 transition-all duration-300 overflow-hidden ${
                    isLogin ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
                  }`}
                >
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[#6D0111]" />
                      Nombre completo
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Ingresa tu nombre completo"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#6D0111]" />
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Ingresa tu teléfono"
                      value={formData.phone}
                      onChange={handleChange}
                      required={!isLogin}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-[#6D0111]" />
                      Empresa (opcional)
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Nombre de tu empresa"
                      value={formData.company}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Common fields */}
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#6D0111]" />
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#6D0111]" />
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                {/* Login-only forgot password */}
                {isLogin && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-[#6D0111] hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#6D0111] hover:bg-[#5A0010] text-white py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </Button>

                {/* Register-only terms */}
                {!isLogin && (
                  <p className="text-xs text-center text-gray-500 mt-4">
                    Al registrarte, aceptas nuestros{' '}
                    <button type="button" className="text-[#6D0111] hover:underline">
                      Términos y Condiciones
                    </button>{' '}
                    y{' '}
                    <button type="button" className="text-[#6D0111] hover:underline">
                      Política de Privacidad
                    </button>
                  </p>
                )}
              </form>

              {/* Errors */}
              {errors.length > 0 && (
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    {errors.map((error, index) => (
                      <p key={index} className="text-sm text-red-500">
                        {error}
                      </p>
                    ))}
                  </AlertDescription>
                </Alert>
              )}

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">o</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => alert('Integración con Google próximamente')}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continuar con Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => alert('Integración con Microsoft próximamente')}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
                  </svg>
                  Continuar con Microsoft
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Necesitas ayuda?{' '}
            <button
              onClick={() => onNavigate('contacto')}
              className="text-[#6D0111] hover:underline"
            >
              Contáctanos
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}