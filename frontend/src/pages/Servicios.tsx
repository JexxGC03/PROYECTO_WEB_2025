import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  Scale, 
  Shield, 
  Stethoscope, 
  Briefcase, 
  Users, 
  FileText,
  Gavel,
  CheckCircle
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Page } from '../App';

interface ServiciosProps {
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Servicios({ onNavigate, isLoggedIn, onLogout }: ServiciosProps) {
  const servicios = [
    {
      icon: Shield,
      title: 'Derecho de Seguros',
      description: 'Asesoría especializada en reclamaciones de seguros, contratos y disputas con aseguradoras.',
      features: [
        'Reclamaciones de seguros de vida',
        'Seguros de accidentes y vehículos',
        'Seguros médicos y de salud',
        'Litigios contra aseguradoras'
      ]
    },
    {
      icon: Stethoscope,
      title: 'Derecho Médico',
      description: 'Defensa en casos de mala praxis médica y responsabilidad profesional sanitaria.',
      features: [
        'Mala praxis médica',
        'Negligencia hospitalaria',
        'Responsabilidad profesional médica',
        'Indemnizaciones por daños médicos'
      ]
    },
    {
      icon: Briefcase,
      title: 'Derecho Laboral',
      description: 'Protección de los derechos de trabajadores en todas las áreas laborales.',
      features: [
        'Despidos injustificados',
        'Acoso laboral',
        'Contratos de trabajo',
        'Liquidaciones y prestaciones sociales'
      ]
    },
    {
      icon: Scale,
      title: 'Derecho Civil',
      description: 'Asesoría integral en asuntos civiles, contratos y responsabilidad civil.',
      features: [
        'Derecho de familia y sucesiones',
        'Contratos civiles',
        'Responsabilidad civil',
        'Derecho de propiedad'
      ]
    },
    {
      icon: FileText,
      title: 'Derecho Administrativo',
      description: 'Representación en procesos ante entidades públicas y contratación estatal.',
      features: [
        'Contratación estatal',
        'Procesos administrativos',
        'Acciones de nulidad',
        'Responsabilidad del Estado'
      ]
    },
    {
      icon: Gavel,
      title: 'Derecho Penal Derivado de Pólizas',
      description: 'Defensa penal especializada en casos relacionados con reclamaciones de seguros.',
      features: [
        'Fraude en reclamaciones de seguros',
        'Defensa penal en casos de pólizas',
        'Estafas relacionadas con seguros',
        'Asesoría preventiva en seguros'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onNavigate={onNavigate} 
        currentPage="servicios" 
        isLoggedIn={isLoggedIn} 
        onLogout={onLogout}
      />

      {/* Hero Section */}
      <section className="relative bg-[#6D0111] text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758519288417-d359ac3c494d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc2MjgxMTIwNnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Legal team"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl mb-6">Nuestros Servicios Legales</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Soluciones jurídicas integrales adaptadas a sus necesidades específicas
          </p>
        </div>
      </section>

      {/* Servicios Detallados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio, index) => {
              const Icon = servicio.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="bg-[#6D0111] text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl mb-4">{servicio.title}</h3>
                    <p className="text-gray-600 mb-6">{servicio.description}</p>
                    <ul className="space-y-3">
                      {servicio.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#6D0111] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full mt-6 bg-[#6D0111] hover:bg-[#5A0010] text-white"
                      onClick={() => onNavigate('contacto')}
                    >
                      Consultar
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">¿Por Qué Confiar en Nosotros?</h2>
            <p className="text-gray-600 text-lg">Razones que nos hacen diferentes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-[#6D0111] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="mb-2">Equipo Experto</h3>
                <p className="text-gray-600 text-sm">Abogados especializados en cada área del derecho</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-[#6D0111] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="mb-2">Confidencialidad</h3>
                <p className="text-gray-600 text-sm">Protección absoluta de su información</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-[#6D0111] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="mb-2">Resultados Comprobados</h3>
                <p className="text-gray-600 text-sm">96% de tasa de éxito en nuestros casos</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-[#6D0111] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8" />
                </div>
                <h3 className="mb-2">Atención Personalizada</h3>
                <p className="text-gray-600 text-sm">Seguimiento constante de su caso</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6D0111] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            ¿Necesita Asesoría Legal Especializada?
          </h2>
          <p className="text-xl mb-8">
            Contáctenos hoy para una consulta inicial sin compromiso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-[#6D0111] hover:bg-gray-100 px-8 py-6 text-lg"
              onClick={() => onNavigate('contacto')}
            >
              Agendar Cita
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#6D0111] px-8 py-6 text-lg"
            >
              Llamar: +57 (1) 234-5678
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}