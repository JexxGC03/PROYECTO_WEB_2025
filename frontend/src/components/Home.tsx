import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Scale, FileText, Users, Clock, Award, Shield } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard' | 'documents') => void;
  isLoggedIn: boolean;
}

export function Home({ onNavigate, isLoggedIn }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={onNavigate} isLoggedIn={isLoggedIn} />

      {/* Hero Section */}
      <section className="bg-[#8B1538] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl mb-6">¿Necesita Asesoría Legal Inmediata?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contáctenos ahora para una evaluación profesional de su caso. Le brindamos opciones claras
            y estrategias efectivas para defender sus derechos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-[#8B1538] hover:bg-gray-100 px-8 py-6 text-lg"
              onClick={() => onNavigate('register')}
            >
              Agendar Cita
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#8B1538] px-8 py-6 text-lg"
            >
              Llamar Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Nuestras Especialidades</h2>
            <p className="text-gray-600 text-lg">Cobertura integral en las principales áreas del derecho</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {[
              'Derecho de Seguros',
              'Derecho Médico',
              'Derecho Penal',
              'Derecho Laboral',
              'Derecho Comercial',
              'Consultoría Jurídica'
            ].map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Scale className="h-8 w-8 mx-auto text-[#8B1538]" />
                  </div>
                  <h3 className="mb-2">{service}</h3>
                  <a href="#" className="text-[#8B1538] text-sm hover:underline">Ver más →</a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-[#8B1538] hover:bg-[#6B0F28] text-white px-8">
              Ver Todos los Servicios
            </Button>
          </div>
        </div>
      </section>

      {/* Por Qué Elegirnos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-center mb-12">¿Por Qué Elegirnos?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-[#8B1538] text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">96%</span>
                </div>
                <h3 className="mb-2">Tasa de Éxito Comprobada</h3>
                <p className="text-gray-600">Resultados excepcionales en la defensa de nuestros clientes</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-[#8B1538] text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">24/7</span>
                </div>
                <h3 className="mb-2">Disponibilidad Total</h3>
                <p className="text-gray-600">Atención permanente para atender sus necesidades legales</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-[#8B1538] text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">+25</span>
                </div>
                <h3 className="mb-2">Años de Experiencia</h3>
                <p className="text-gray-600">Trayectoria sólida en el ejercicio del derecho</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hero Alternativo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#8B1538] text-sm mb-2">EXPERTOS EN MÚLTIPLES ÁREAS DEL DERECHO</p>
              <h2 className="text-3xl md:text-4xl mb-6">
                Defendemos sus <span className="text-[#8B1538]">Derechos</span> con Excelencia Legal
              </h2>
              <p className="text-gray-600 mb-6">
                Achury Abogados S.A.S. es un aliado legal integral. Especializados en derecho de seguros, 
                derecho médico, derecho penal y consultoría jurídica con resultados comprobados.
              </p>
              <div className="flex gap-4 mb-8">
                <Button className="bg-[#8B1538] hover:bg-[#6B0F28] text-white">
                  Consulta Inmediata
                </Button>
                <Button variant="outline" className="border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white">
                  Conocer Servicios
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl text-[#8B1538] mb-1">1000+</p>
                  <p className="text-sm text-gray-600">Casos Exitosos</p>
                </div>
                <div>
                  <p className="text-3xl text-[#8B1538] mb-1">96%</p>
                  <p className="text-sm text-gray-600">Tasa de Éxito</p>
                </div>
                <div>
                  <p className="text-3xl text-[#8B1538] mb-1">24/7</p>
                  <p className="text-sm text-gray-600">Atención</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-200 rounded-lg overflow-hidden aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"
                  alt="Legal services"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-[#8B1538] text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  <span>Respuesta Inmediata Atención personalizada 24/7</span>
                </div>
              </div>
            </div>
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
                <FileText className="h-16 w-16 mx-auto mb-4 text-[#8B1538]" />
                <h3 className="text-2xl mb-3">Gestión de Casos</h3>
                <p className="text-gray-600 mb-6">
                  Administre todos sus casos legales en un solo lugar. Seguimiento completo del estado, 
                  fechas importantes y actualizaciones en tiempo real.
                </p>
                <Button 
                  className="bg-[#8B1538] hover:bg-[#6B0F28] text-white w-full"
                  onClick={() => isLoggedIn ? onNavigate('dashboard') : onNavigate('login')}
                >
                  Acceder a Casos
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-[#8B1538]" />
                <h3 className="text-2xl mb-3">Gestión Documental</h3>
                <p className="text-gray-600 mb-6">
                  Almacene, organice y acceda a todos sus documentos legales de forma segura. 
                  Sistema de categorización inteligente y búsqueda avanzada.
                </p>
                <Button 
                  className="bg-[#8B1538] hover:bg-[#6B0F28] text-white w-full"
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
