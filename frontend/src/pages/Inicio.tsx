import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Scale, FileText, Users, Award, Shield, Star, Quote } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Page } from '../App';

interface InicioProps {
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
}

export function Inicio({ onNavigate, isLoggedIn }: InicioProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={onNavigate} currentPage="inicio" isLoggedIn={isLoggedIn} />

      {/* Hero Section */}
      <section className="relative bg-[#6D0111] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYXd5ZXJzJTIwb2ZmaWNlfGVufDF8fHx8MTc2Mjg5NTk4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Law Office"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl mb-6">¿Necesita Asesoría Legal Inmediata?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contáctenos ahora para una evaluación profesional de su caso. Le brindamos opciones claras
            y estrategias efectivas para defender sus derechos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-[#6D0111] text-white hover:bg-[#5A0010] px-8 py-6 text-lg"
              onClick={() => onNavigate('contacto')}
            >
              Agendar Cita
            </Button>
            <Button 
              className="bg-[#6D0111] text-white hover:bg-[#5A0010] px-8 py-6 text-lg"
            >
              Llamar Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-[#6D0111] text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">96%</span>
                </div>
                <h3 className="mb-2">Tasa de Éxito Comprobada</h3>
                <p className="text-gray-600">Resultados excepcionales en la defensa de nuestros clientes</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-[#6D0111] text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10" />
                </div>
                <h3 className="mb-2">Confianza y Dedicación</h3>
                <p className="text-gray-600">Compromiso total con la defensa de sus intereses legales</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-[#6D0111] text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">+25</span>
                </div>
                <h3 className="mb-2">Años de Experiencia</h3>
                <p className="text-gray-600">Trayectoria sólida en el ejercicio del derecho</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section con Imagen */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#6D0111] text-sm mb-2">EXPERTOS EN MÚLTIPLES ÁREAS DEL DERECHO</p>
              <h2 className="text-3xl md:text-4xl mb-6">
                Defendemos sus <span className="text-[#6D0111]">Derechos</span> con Excelencia Legal
              </h2>
              <p className="text-gray-600 mb-6">
                Rincón Achury Abogados S.A.S. es su aliado legal integral. Especializados en derecho de seguros, 
                derecho médico, derecho penal y consultoría jurídica con resultados comprobados.
              </p>
              <div className="flex gap-4 mb-8">
                <Button 
                  className="bg-[#6D0111] hover:bg-[#5A0010] text-white"
                  onClick={() => onNavigate('contacto')}
                >
                  Consulta Inmediata
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#6D0111] text-[#6D0111] hover:bg-[#6D0111] hover:text-white"
                  onClick={() => onNavigate('servicios')}
                >
                  Conocer Servicios
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl text-[#6D0111] mb-1">1000+</p>
                  <p className="text-sm text-gray-600">Casos Exitosos</p>
                </div>
                <div>
                  <p className="text-3xl text-[#6D0111] mb-1">+25</p>
                  <p className="text-sm text-gray-600">Años de Experiencia</p>
                </div>
                <div>
                  <p className="text-3xl text-[#6D0111] mb-1">100%</p>
                  <p className="text-sm text-gray-600">Compromiso</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-200 rounded-lg overflow-hidden aspect-[4/3]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1635845080335-dcfe06a0fcf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBvZmZpY2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjI4ODc2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Law office interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-[#6D0111] text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  <span>Atención Personalizada y Profesional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Nuestras Especialidades</h2>
            <p className="text-gray-600 text-lg">Cobertura integral en las principales áreas del derecho</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {[
              'Derecho de Seguros',
              'Derecho Médico',
              'Derecho Laboral',
              'Derecho Civil',
              'Derecho Administrativo',
              'Derecho Penal'
            ].map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Scale className="h-8 w-8 mx-auto text-[#6D0111]" />
                  </div>
                  <h3 className="mb-2">{service}</h3>
                  <button
                    onClick={() => onNavigate('servicios')}
                    className="text-[#6D0111] text-sm hover:underline"
                  >
                    Ver más →
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              className="bg-[#6D0111] hover:bg-[#5A0010] text-white px-8"
              onClick={() => onNavigate('servicios')}
            >
              Ver Todos los Servicios
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Lo Que Dicen Nuestros Clientes</h2>
            <p className="text-gray-600 text-lg">Testimonios reales de clientes satisfechos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'María González',
                role: 'Cliente Derecho Laboral',
                text: 'Excelente servicio legal. Me ayudaron a resolver mi caso de despido injustificado de manera profesional y obtuvimos un resultado favorable. Muy recomendados.',
                rating: 5
              },
              {
                name: 'Carlos Rodríguez',
                role: 'Empresario',
                text: 'El equipo de Rincón Achury nos ha brindado asesoría legal constante para nuestra empresa. Son profesionales, confiables y siempre disponibles cuando los necesitamos.',
                rating: 5
              },
              {
                name: 'Ana Martínez',
                role: 'Cliente Derecho Civil',
                text: 'Agradezco enormemente el apoyo durante mi proceso de divorcio. Fueron empáticos, claros y me guiaron en cada paso. Quedé muy satisfecha con el resultado.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <Quote className="h-10 w-10 text-[#6D0111] opacity-20" />
                  </div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">{testimonial.text}</p>
                  <div>
                    <p className="text-[#6D0111]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros Clientes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Nuestros Clientes</h2>
            <p className="text-gray-600 text-lg">Empresas líderes que confían en nosotros</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: 'Seguros Bolívar', logo: 'SB' },
              { name: 'Sura', logo: 'SURA' },
              { name: 'Liberty Seguros', logo: 'LS' },
              { name: 'Allianz', logo: 'AZ' },
              { name: 'Mapfre', logo: 'MP' },
              { name: 'Positiva', logo: 'PS' },
              { name: 'AXA Colpatria', logo: 'AXA' },
              { name: 'HDI Seguros', logo: 'HDI' },
              { name: 'Equidad Seguros', logo: 'EQ' },
              { name: 'Estado Seguros', logo: 'ES' },
              { name: 'Solidaria', logo: 'SL' },
              { name: 'Mundial', logo: 'MU' }
            ].map((cliente, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <CardContent className="p-6 flex flex-col items-center justify-center aspect-square">
                  <div className="bg-[#6D0111] text-white w-20 h-20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#5A0010] transition-colors">
                    <span className="text-xl">{cliente.logo}</span>
                  </div>
                  <p className="text-xs text-center text-gray-600">{cliente.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Más de 100 empresas y organizaciones confían en nuestros servicios legales
            </p>
            <Button 
              className="bg-[#6D0111] hover:bg-[#5A0010] text-white"
              onClick={() => onNavigate('contacto')}
            >
              Conviértase en Nuestro Cliente
            </Button>
          </div>
        </div>
      </section>

      {/* Sistema de Gestión */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Sistema de Gestión Legal</h2>
            <p className="text-gray-600 text-lg">Gestione sus casos y documentos de manera eficiente</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-[#6D0111]" />
                <h3 className="text-2xl mb-3">Gestión de Casos</h3>
                <p className="text-gray-600 mb-6">
                  Administre todos sus casos legales en un solo lugar. Seguimiento completo del estado, 
                  fechas importantes y actualizaciones en tiempo real.
                </p>
                <Button 
                  className="bg-[#6D0111] hover:bg-[#5A0010] text-white w-full"
                  onClick={() => isLoggedIn ? onNavigate('dashboard') : onNavigate('login')}
                >
                  Acceder a Casos
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-[#6D0111]" />
                <h3 className="text-2xl mb-3">Gestión Documental</h3>
                <p className="text-gray-600 mb-6">
                  Almacene, organice y acceda a todos sus documentos legales de forma segura. 
                  Sistema de categorización inteligente y búsqueda avanzada.
                </p>
                <Button 
                  className="bg-[#6D0111] hover:bg-[#5A0010] text-white w-full"
                  onClick={() => isLoggedIn ? onNavigate('documents') : onNavigate('login')}
                >
                  Acceder a Documentos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}