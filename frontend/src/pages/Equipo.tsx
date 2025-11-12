import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Page } from '../App';

interface EquipoProps {
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Equipo({ onNavigate, isLoggedIn, onLogout }: EquipoProps) {
  const teamMembers = [
    {
      name: 'Dr. Juan Carlos Rincón',
      role: 'Socio Fundador',
      specialty: 'Derecho de Seguros y Derecho Médico',
      image: 'https://images.unsplash.com/photo-1658249682516-c7789d418978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBsYXd5ZXJ8ZW58MXx8fHwxNzYyOTAzOTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Más de 25 años de experiencia en derecho de seguros. Especialista en reclamaciones complejas y litigios contra aseguradoras.',
      education: [
        'Abogado - Universidad Nacional de Colombia',
        'Especialización en Derecho de Seguros - Universidad Externado',
        'Maestría en Derecho Médico - Universidad de los Andes'
      ],
      email: 'jc.rincon@rinconachury.com',
      phone: '+57 300 111 2222'
    },
    {
      name: 'Dra. María Fernanda Achury',
      role: 'Socia Fundadora',
      specialty: 'Derecho Penal y Derecho Laboral',
      image: 'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGxhd3llcnxlbnwxfHx8fDE3NjI4ODQ4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Reconocida penalista con amplia trayectoria en defensa penal y derecho laboral. Especialista en casos de alta complejidad.',
      education: [
        'Abogada - Universidad del Rosario',
        'Especialización en Derecho Penal - Universidad Javeriana',
        'Especialización en Derecho Laboral - Universidad Nacional'
      ],
      email: 'mf.achury@rinconachury.com',
      phone: '+57 300 333 4444'
    },
    {
      name: 'Dr. Carlos Andrés Ramírez',
      role: 'Socio Senior',
      specialty: 'Derecho Comercial y Corporativo',
      image: 'https://images.unsplash.com/photo-1658249682516-c7789d418978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBsYXd5ZXJ8ZW58MXx8fHwxNzYyOTAzOTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Experto en derecho empresarial, fusiones y adquisiciones. Asesor de importantes compañías nacionales e internacionales.',
      education: [
        'Abogado - Universidad de los Andes',
        'Especialización en Derecho Comercial - Universidad Externado',
        'MBA - INALDE Business School'
      ],
      email: 'ca.ramirez@rinconachury.com',
      phone: '+57 300 555 6666'
    },
    {
      name: 'Dra. Ana María López',
      role: 'Asociada Senior',
      specialty: 'Derecho Civil y de Familia',
      image: 'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGxhd3llcnxlbnwxfHx8fDE3NjI4ODQ4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Especialista en derecho de familia, sucesiones y procesos civiles. Enfoque empático y soluciones efectivas.',
      education: [
        'Abogada - Universidad Javeriana',
        'Especialización en Derecho de Familia - Universidad del Rosario',
        'Diplomado en Conciliación y Mediación'
      ],
      email: 'am.lopez@rinconachury.com',
      phone: '+57 300 777 8888'
    },
    {
      name: 'Dr. Jorge Esteban Vargas',
      role: 'Asociado',
      specialty: 'Derecho Administrativo',
      image: 'https://images.unsplash.com/photo-1658249682516-c7789d418978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBsYXd5ZXJ8ZW58MXx8fHwxNzYyOTAzOTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Experto en contratación estatal y procesos administrativos. Asesor en licitaciones públicas y relaciones con el Estado.',
      education: [
        'Abogado - Universidad Nacional de Colombia',
        'Especialización en Derecho Administrativo - Universidad Externado',
        'Diplomado en Contratación Estatal'
      ],
      email: 'je.vargas@rinconachury.com',
      phone: '+57 300 999 0000'
    },
    {
      name: 'Dra. Laura Patricia Moreno',
      role: 'Asociada',
      specialty: 'Derecho Ambiental y Sostenibilidad',
      image: 'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGxhd3llcnxlbnwxfHx8fDE3NjI4ODQ4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Especialista en derecho ambiental y compliance. Asesora empresas en temas de sostenibilidad y cumplimiento normativo.',
      education: [
        'Abogada - Universidad de los Andes',
        'Especialización en Derecho Ambiental - Universidad del Rosario',
        'Diplomado en Compliance y Gobierno Corporativo'
      ],
      email: 'lp.moreno@rinconachury.com',
      phone: '+57 300 111 2223'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onNavigate={onNavigate} 
        currentPage="equipo" 
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
          <h1 className="text-4xl md:text-5xl mb-6">Nuestro Equipo Legal</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Profesionales altamente capacitados comprometidos con la excelencia legal y la defensa de sus derechos
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gray-200 overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-1">{member.name}</h3>
                    <p className="text-[#6D0111] mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-4">{member.specialty}</p>
                    <p className="text-sm text-gray-700 mb-4">{member.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Formación Académica:</p>
                      <ul className="space-y-1">
                        {member.education.map((edu, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-[#6D0111] mt-1">•</span>
                            <span>{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 pt-4 border-t">
                      <a 
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#6D0111] transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        {member.email}
                      </a>
                      <a 
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#6D0111] transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Nuestros Valores</h2>
            <p className="text-gray-600 text-lg">Principios que guían nuestro trabajo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="mb-2">Integridad</h3>
                <p className="text-gray-600 text-sm">Actuamos con honestidad y transparencia en cada caso</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="mb-2">Excelencia</h3>
                <p className="text-gray-600 text-sm">Compromiso con la calidad en cada servicio legal</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="mb-2">Compromiso</h3>
                <p className="text-gray-600 text-sm">Dedicación total a la defensa de sus derechos</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="mb-2">Profesionalismo</h3>
                <p className="text-gray-600 text-sm">Experiencia y especialización en cada área</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#6D0111] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            ¿Desea Conocer Más Sobre Nuestro Equipo?
          </h2>
          <p className="text-xl mb-8">
            Contáctenos para una reunión y conozca personalmente a nuestros abogados
          </p>
          <Button 
            className="bg-white text-[#6D0111] hover:bg-gray-100 px-8 py-6 text-lg"
            onClick={() => onNavigate('contacto')}
          >
            Agendar Reunión
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
