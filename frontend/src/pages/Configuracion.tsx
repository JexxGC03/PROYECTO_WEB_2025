import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Settings, LogOut, User, Mail, Lock, Bell, Shield, ArrowLeft } from 'lucide-react';
import { Page } from '../App';

interface ConfiguracionProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userEmail: string;
}

export function Configuracion({ onNavigate, onLogout, userEmail }: ConfiguracionProps) {
  const [formData, setFormData] = useState({
    nombre: userEmail === 'admin@raa.com' ? 'Administrador' : 'Cliente',
    email: userEmail,
    telefono: userEmail === 'admin@raa.com' ? '+57 300 123 4567' : '+57 311 987 6543',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Perfil actualizado correctamente');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    alert('Contraseña cambiada correctamente');
    setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-[#6D0111] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-200 hover:bg-[#5A0010]"
                onClick={() => onNavigate('dashboard')}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver
              </Button>
              <h1 className="text-xl">Configuración</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{userEmail}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-200 hover:bg-[#5A0010]"
                onClick={onLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Configuración de la Cuenta</h1>
            <p className="text-gray-600">Administre su información personal y preferencias</p>
          </div>

          <div className="space-y-6">
            {/* Información Personal */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#6D0111] p-2 rounded-lg">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl">Información Personal</h2>
                </div>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre Completo</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-[#6D0111] hover:bg-[#5A0010] text-white">
                      Guardar Cambios
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Cambiar Contraseña */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#6D0111] p-2 rounded-lg">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl">Seguridad</h2>
                </div>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña Actual</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nueva Contraseña</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
                    <p className="mb-2">La contraseña debe cumplir con:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Mínimo 8 caracteres</li>
                      <li>Al menos una letra mayúscula</li>
                      <li>Al menos una letra minúscula</li>
                      <li>Al menos un número</li>
                      <li>Al menos un carácter especial (!@#$%^&*...)</li>
                    </ul>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-[#6D0111] hover:bg-[#5A0010] text-white">
                      Cambiar Contraseña
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Notificaciones */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#6D0111] p-2 rounded-lg">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl">Notificaciones</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="mb-1">Notificaciones por Email</p>
                      <p className="text-sm text-gray-600">Recibir actualizaciones de casos por correo electrónico</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                      className="w-5 h-5 text-[#6D0111] cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="mb-1">Notificaciones por SMS</p>
                      <p className="text-sm text-gray-600">Recibir alertas importantes por mensaje de texto</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                      className="w-5 h-5 text-[#6D0111] cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="mb-1">Notificaciones Push</p>
                      <p className="text-sm text-gray-600">Recibir notificaciones en tiempo real en el navegador</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                      className="w-5 h-5 text-[#6D0111] cursor-pointer"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información de la Cuenta */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#6D0111] p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl">Información de la Cuenta</h2>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span className="text-gray-600">Tipo de cuenta:</span>
                    <span className="capitalize">
                      {userEmail === 'admin@raa.com' ? 'Administrador' : 'Cliente'}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span className="text-gray-600">Email:</span>
                    <span>{userEmail}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span className="text-gray-600">Estado:</span>
                    <span className="text-green-600">Activa</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span className="text-gray-600">Última sesión:</span>
                    <span>{new Date().toLocaleString('es-ES')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cerrar Sesión */}
            <Card className="border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1 text-red-600">Cerrar Sesión</h3>
                    <p className="text-sm text-gray-600">Salir de su cuenta en este dispositivo</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50"
                    onClick={onLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
