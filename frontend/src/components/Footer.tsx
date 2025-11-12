import { Scale, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y Descripción */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white text-[#6D0111] p-2 rounded">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <h3>Rincón Achury</h3>
                <p className="text-xs opacity-80">Abogados S.A.S.</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Bufete de abogados especializado en múltiples áreas del derecho, comprometidos con la excelencia legal y la defensa de sus derechos.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-500">⚖️</span>
                <span>Colegio de Abogados de Bogotá</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-500">✓</span>
                <span>Certificado ISO 9001:2015</span>
              </div>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-yellow-500 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Inicio</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Servicios</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Equipo</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Testimonios</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Servicios Legales */}
          <div>
            <h3 className="text-yellow-500 mb-4">Servicios Legales</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Derecho de Seguros</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Derecho Médico</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Derecho Penal</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Derecho Laboral</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Derecho Comercial</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Consultoría Jurídica</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-yellow-500 mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1">📍</span>
                <span>Carrera 7 # 71-21, Torre A, Piso 10<br />Bogotá D.C., Colombia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+57 (1) 234-5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@rinconachury.com</span>
              </li>
            </ul>
            
            <div className="mt-4">
              <p className="text-yellow-500 text-sm mb-2">Línea de Emergencia</p>
              <p className="text-lg">+57 300 123 4567</p>
            </div>

            <div className="mt-4">
              <p className="text-sm mb-3">Síguenos</p>
              <div className="flex gap-3">
                <a href="#" className="bg-gray-600 hover:bg-[#6D0111] p-2 rounded transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="bg-gray-600 hover:bg-[#6D0111] p-2 rounded transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="bg-gray-600 hover:bg-[#6D0111] p-2 rounded transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="bg-gray-600 hover:bg-[#6D0111] p-2 rounded transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm opacity-70">
          <p>© 2025 Rincón Achury Abogados S.A.S. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}