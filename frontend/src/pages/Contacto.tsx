import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent } from '../components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Page } from '../App';
import { toast } from 'sonner@2.0.3';

interface ContactoProps {
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Contacto({ onNavigate, isLoggedIn, onLogout }: ContactoProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.');
    setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onNavigate={onNavigate} 
        currentPage="contacto" 
        isLoggedIn={isLoggedIn} 
        onLogout={onLogout}
      />

      {/* Hero Section */}
      <section className="relative bg-[#6D0111] text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="/assets/handshake.jpg"
            alt="Contacto"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl mb-6">Contáctenos</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Estamos aquí para ayudarle. Contáctenos por cualquier consulta legal
          </p>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-[#6D0111] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="mb-2">Ubicación</h3>
                <p className="text-gray-600 text-sm">
                  Carrera 7 # 71-21<br />
                  Torre A, Piso 10<br />
                  Bogotá D.C., Colombia
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-[#6D0111] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="mb-2">Teléfonos</h3>
                <p className="text-gray-700 text-sm">
                  Oficina: +57 (1) 234-5678<br />
                  Móvil: +57 300 123 4567<br />
                  Línea de Atención Prioritaria
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-[#6D0111] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="mb-2">Email</h3>
                <p className="text-gray-600 text-sm">
                  info@rinconachury.com<br />
                  contacto@rinconachury.com<br />
                  Respuesta en 24 horas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-[#6D0111] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="mb-2">Horario</h3>
                <p className="text-gray-600 text-sm">
                  Lun - Vie: 8:00 - 18:00<br />
                  Sábados: 9:00 - 13:00<br />
                  Casos Urgentes: Atención Inmediata
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Formulario de Contacto */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl mb-6">Envíenos un Mensaje</h2>
              <p className="text-gray-600 mb-8">
                Complete el siguiente formulario y nos pondremos en contacto con usted lo antes posible
                para atender su consulta legal.
              </p>

              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre Completo *</Label>
                      <Input
                        id="nombre"
                        type="text"
                        placeholder="Ingrese su nombre completo"
                        value={formData.nombre}
                        onChange={(e) => handleChange('nombre', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
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
                      <Label htmlFor="telefono">Teléfono *</Label>
                      <Input
                        id="telefono"
                        type="tel"
                        placeholder="+57 300 123 4567"
                        value={formData.telefono}
                        onChange={(e) => handleChange('telefono', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="asunto">Asunto *</Label>
                      <Select
                        value={formData.asunto}
                        onValueChange={(value) => handleChange('asunto', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el tipo de consulta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Derecho de Seguros">Derecho de Seguros</SelectItem>
                          <SelectItem value="Derecho Médico">Derecho Médico</SelectItem>
                          <SelectItem value="Derecho Penal">Derecho Penal</SelectItem>
                          <SelectItem value="Derecho Laboral">Derecho Laboral</SelectItem>
                          <SelectItem value="Derecho Comercial">Derecho Comercial</SelectItem>
                          <SelectItem value="Consultoría Jurídica">Consultoría Jurídica</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Mensaje *</Label>
                      <Textarea
                        id="mensaje"
                        placeholder="Describa brevemente su consulta legal..."
                        value={formData.mensaje}
                        onChange={(e) => handleChange('mensaje', e.target.value)}
                        rows={6}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#6D0111] hover:bg-[#5A0010] text-white py-6 text-lg"
                    >
                      Enviar Mensaje
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Al enviar este formulario, acepta nuestra política de privacidad y tratamiento de datos personales.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl mb-6">Ubicación</h2>
              <p className="text-gray-600 mb-6">
                Visítenos en nuestras oficinas ubicadas en el centro de Bogotá, 
                con fácil acceso y parqueadero disponible.
              </p>

              {/* Mapa placeholder */}
              <Card className="mb-8">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6223573993594!2d-74.05825908523663!3d4.652993796620344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a3a9f6b0001%3A0x0!2zNMKwMzknMTAuOCJOIDc0wrAwMyczMC4wIlc!5e0!3m2!1ses!2sco!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación Rincón Achury Abogados"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl mb-4">¿Por qué elegirnos?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6D0111] mt-1">✓</span>
                    <span className="text-gray-700">Primera consulta sin costo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6D0111] mt-1">✓</span>
                    <span className="text-gray-700">Respuesta en menos de 24 horas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6D0111] mt-1">✓</span>
                    <span className="text-gray-700">Atención personalizada y confidencial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6D0111] mt-1">✓</span>
                    <span className="text-gray-700">Equipo multidisciplinario de expertos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6D0111] mt-1">✓</span>
                    <span className="text-gray-700">Respuesta rápida para casos urgentes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6D0111] mt-1">✓</span>
                    <span className="text-gray-700">Línea prioritaria para casos urgentes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Emergencias */}
      <section className="py-16 bg-[#6D0111] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            ¿Necesita Atención Legal Urgente?
          </h2>
          <p className="text-xl mb-8">
            Contamos con atención prioritaria para casos que requieren respuesta inmediata
          </p>
          <Button 
            className="bg-white text-[#6D0111] hover:bg-gray-100 px-8 py-6 text-lg"
          >
            <Phone className="h-5 w-5 mr-2" />
            Llamar: +57 300 123 4567
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}