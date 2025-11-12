import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter,
  Download,
  Eye,
  Trash2,
  File,
  FolderOpen,
  Calendar,
  User
} from 'lucide-react';
import { Page } from '../App';

interface DocumentManagementProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

interface Documento {
  id: string;
  nombre: string;
  categoria: string;
  caso: string;
  tipo: string;
  tamaño: string;
  fecha: string;
  subidoPor: string;
}

export function DocumentManagement({ onNavigate, onLogout }: DocumentManagementProps) {
  const [documentos, setDocumentos] = useState<Documento[]>([
    {
      id: '1',
      nombre: 'Demanda_Laboral_MGonzalez.pdf',
      categoria: 'Demandas',
      caso: 'CASO-2025-001',
      tipo: 'PDF',
      tamaño: '2.4 MB',
      fecha: '2025-01-15',
      subidoPor: 'Dr. Juan Pérez'
    },
    {
      id: '2',
      nombre: 'Contrato_Trabajo_MGonzalez.pdf',
      categoria: 'Contratos',
      caso: 'CASO-2025-001',
      tipo: 'PDF',
      tamaño: '1.8 MB',
      fecha: '2025-01-15',
      subidoPor: 'Dr. Juan Pérez'
    },
    {
      id: '3',
      nombre: 'Pruebas_Despido.zip',
      categoria: 'Evidencias',
      caso: 'CASO-2025-001',
      tipo: 'ZIP',
      tamaño: '15.2 MB',
      fecha: '2025-01-18',
      subidoPor: 'Asistente Legal'
    },
    {
      id: '4',
      nombre: 'Escrito_Defensa_CRodriguez.docx',
      categoria: 'Escritos',
      caso: 'CASO-2025-002',
      tipo: 'DOCX',
      tamaño: '890 KB',
      fecha: '2025-02-01',
      subidoPor: 'Dra. Ana López'
    },
    {
      id: '5',
      nombre: 'Sentencia_TechSolutions.pdf',
      categoria: 'Sentencias',
      caso: 'CASO-2024-156',
      tipo: 'PDF',
      tamaño: '3.1 MB',
      fecha: '2024-12-10',
      subidoPor: 'Dr. Carlos Ramírez'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState<string>('todas');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newDocumento, setNewDocumento] = useState({
    nombre: '',
    categoria: '',
    caso: '',
    archivo: null as File | null
  });

  const categorias = ['Demandas', 'Contratos', 'Evidencias', 'Escritos', 'Sentencias', 'Poderes', 'Otros'];

  const filteredDocumentos = documentos.filter(doc => {
    const matchesSearch = doc.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.caso.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = filterCategoria === 'todas' || doc.categoria === filterCategoria;
    return matchesSearch && matchesCategoria;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewDocumento({ ...newDocumento, archivo: e.target.files[0] });
    }
  };

  const handleUploadDocumento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocumento.archivo) return;

    const nuevoDoc: Documento = {
      id: String(documentos.length + 1),
      nombre: newDocumento.archivo.name,
      categoria: newDocumento.categoria,
      caso: newDocumento.caso,
      tipo: newDocumento.archivo.name.split('.').pop()?.toUpperCase() || 'FILE',
      tamaño: (newDocumento.archivo.size / 1024 / 1024).toFixed(2) + ' MB',
      fecha: new Date().toISOString().split('T')[0],
      subidoPor: 'Usuario Actual'
    };

    setDocumentos([...documentos, nuevoDoc]);
    setNewDocumento({ nombre: '', categoria: '', caso: '', archivo: null });
    setIsDialogOpen(false);
  };

  const getIconColor = (tipo: string) => {
    switch (tipo) {
      case 'PDF': return 'text-red-600';
      case 'DOCX': case 'DOC': return 'text-blue-600';
      case 'ZIP': case 'RAR': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={onNavigate} isLoggedIn={true} onLogout={onLogout} />

      <div className="flex-1 bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl">Gestión Documental</h1>
                <p className="text-gray-600">Administre todos los documentos relacionados con sus casos</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => onNavigate('dashboard')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Casos
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#6D0111] hover:bg-[#5A0010] text-white">
                      <Upload className="h-4 w-4 mr-2" />
                      Subir Documento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl">
                    <DialogHeader>
                      <DialogTitle>Subir Nuevo Documento</DialogTitle>
                      <DialogDescription>
                        Adjunte y clasifique el documento legal
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUploadDocumento} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="archivo">Archivo</Label>
                        <Input
                          id="archivo"
                          type="file"
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.jpeg,.png"
                          required
                        />
                        <p className="text-xs text-gray-500">
                          Formatos aceptados: PDF, DOC, DOCX, ZIP, RAR, JPG, PNG
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="categoria">Categoría</Label>
                        <Select
                          value={newDocumento.categoria}
                          onValueChange={(value) => setNewDocumento({ ...newDocumento, categoria: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categorias.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="caso">Caso Asociado</Label>
                        <Select
                          value={newDocumento.caso}
                          onValueChange={(value) => setNewDocumento({ ...newDocumento, caso: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione caso" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CASO-2025-001">CASO-2025-001 - María González</SelectItem>
                            <SelectItem value="CASO-2025-002">CASO-2025-002 - Carlos Rodríguez</SelectItem>
                            <SelectItem value="CASO-2025-003">CASO-2025-003 - Ana Martínez</SelectItem>
                            <SelectItem value="CASO-2024-156">CASO-2024-156 - Tech Solutions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit" className="bg-[#6D0111] hover:bg-[#5A0010] text-white">
                          <Upload className="h-4 w-4 mr-2" />
                          Subir Documento
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Documentos</p>
                    <p className="text-3xl">{documentos.length}</p>
                  </div>
                  <File className="h-10 w-10 text-[#6D0111] opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Categorías</p>
                    <p className="text-3xl">{categorias.length}</p>
                  </div>
                  <FolderOpen className="h-10 w-10 text-blue-600 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Documentos PDF</p>
                    <p className="text-3xl text-red-600">
                      {documentos.filter(d => d.tipo === 'PDF').length}
                    </p>
                  </div>
                  <FileText className="h-10 w-10 text-red-600 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Este Mes</p>
                    <p className="text-3xl text-green-600">
                      {documentos.filter(d => d.fecha.startsWith('2025-01') || d.fecha.startsWith('2025-02')).length}
                    </p>
                  </div>
                  <Calendar className="h-10 w-10 text-green-600 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por nombre de archivo o caso..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterCategoria} onValueChange={setFilterCategoria}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las categorías</SelectItem>
                    {categorias.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Documents List */}
          <div className="space-y-4">
            {filteredDocumentos.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 bg-gray-100 rounded-lg ${getIconColor(doc.tipo)}`}>
                        <File className="h-8 w-8" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 truncate">{doc.nombre}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <FolderOpen className="h-4 w-4" />
                            <span>{doc.categoria}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span>{doc.caso}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(doc.fecha).toLocaleDateString('es-ES')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{doc.subidoPor}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {doc.tipo} • {doc.tamaño}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocumentos.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl mb-2">No se encontraron documentos</h3>
                <p className="text-gray-600">
                  {searchTerm || filterCategoria !== 'todas'
                    ? 'Intente ajustar sus filtros de búsqueda'
                    : 'Comience subiendo su primer documento'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}