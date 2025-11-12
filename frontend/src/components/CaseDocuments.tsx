import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  FileText,
  Upload,
  Download,
  Trash2,
  Edit,
  Search,
  Filter,
  Plus,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Documento {
  id: string;
  nombre: string;
  tipo: string;
  tamano: string;
  fecha: string;
  casoId: string;
}

interface Caso {
  id: string;
  numero: string;
  cliente: string;
  tipo: string;
}

interface CaseDocumentsProps {
  caso: Caso;
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  userEmail: string;
}

export function CaseDocuments({ caso, isOpen, onClose, isAdmin, userEmail }: CaseDocumentsProps) {
  const [documentos, setDocumentos] = useState<Documento[]>([
    {
      id: '1',
      nombre: 'Demanda_Inicial.pdf',
      tipo: 'DEMANDA',
      tamano: '2.5 MB',
      fecha: '2025-01-15',
      casoId: caso.id
    },
    {
      id: '2',
      nombre: 'Pruebas_Documentales.pdf',
      tipo: 'PRUEBA',
      tamano: '5.1 MB',
      fecha: '2025-02-01',
      casoId: caso.id
    },
    {
      id: '3',
      nombre: 'Sentencia_Primera_Instancia.pdf',
      tipo: 'SENTENCIA',
      tamano: '1.8 MB',
      fecha: '2025-03-10',
      casoId: caso.id
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState<string>('todos');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({
    nombre: '',
    tipo: 'DEMANDA'
  });

  const tiposDocumento = [
    'DEMANDA',
    'CONTESTACIÓN',
    'PRUEBA',
    'ALEGATO',
    'SENTENCIA',
    'RECURSO',
    'PODER',
    'OTRO'
  ];

  const filteredDocumentos = documentos.filter(doc => {
    const matchesSearch = doc.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === 'todos' || doc.tipo === filterTipo;
    return matchesSearch && matchesTipo;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoDoc: Documento = {
      id: String(documentos.length + 1),
      nombre: newDoc.nombre,
      tipo: newDoc.tipo,
      tamano: '1.2 MB',
      fecha: new Date().toISOString().split('T')[0],
      casoId: caso.id
    };
    setDocumentos([...documentos, nuevoDoc]);
    setNewDoc({ nombre: '', tipo: 'DEMANDA' });
    setIsUploadDialogOpen(false);
    toast.success('Documento cargado exitosamente');
  };

  const handleDelete = (id: string) => {
    setDocumentos(documentos.filter(doc => doc.id !== id));
    toast.success('Documento eliminado');
  };

  const handleDownload = (nombre: string) => {
    toast.success(`Descargando ${nombre}`);
  };

  const tipoColors: Record<string, string> = {
    'DEMANDA': 'bg-blue-500',
    'CONTESTACIÓN': 'bg-purple-500',
    'PRUEBA': 'bg-green-500',
    'ALEGATO': 'bg-yellow-500',
    'SENTENCIA': 'bg-red-500',
    'RECURSO': 'bg-orange-500',
    'PODER': 'bg-indigo-500',
    'OTRO': 'bg-gray-500'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[1400px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <DialogTitle className="text-2xl">Documentos del Caso</DialogTitle>
              <DialogDescription>
                {caso.numero} - {caso.cliente}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Filtros y búsqueda */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterTipo} onValueChange={setFilterTipo}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  {tiposDocumento.map(tipo => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {isAdmin && (
                <Button
                  className="bg-[#6D0111] hover:bg-[#5A0010] text-white"
                  onClick={() => setIsUploadDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Cargar Documento
                </Button>
              )}
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl text-[#6D0111] mb-1">{documentos.length}</div>
                <div className="text-sm text-gray-600">Total Documentos</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl text-[#6D0111] mb-1">
                  {documentos.filter(d => d.tipo === 'DEMANDA').length}
                </div>
                <div className="text-sm text-gray-600">Demandas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl text-[#6D0111] mb-1">
                  {documentos.filter(d => d.tipo === 'PRUEBA').length}
                </div>
                <div className="text-sm text-gray-600">Pruebas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl text-[#6D0111] mb-1">
                  {documentos.filter(d => d.tipo === 'SENTENCIA').length}
                </div>
                <div className="text-sm text-gray-600">Sentencias</div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de documentos */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 text-sm">Nombre del Archivo</th>
                      <th className="text-left p-4 text-sm">Tipo</th>
                      <th className="text-left p-4 text-sm">Tamaño</th>
                      <th className="text-left p-4 text-sm">Fecha</th>
                      <th className="text-right p-4 text-sm">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocumentos.length > 0 ? (
                      filteredDocumentos.map((doc) => (
                        <tr key={doc.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-gray-100 p-2 rounded">
                                <FileText className="h-5 w-5 text-[#6D0111]" />
                              </div>
                              <span>{doc.nombre}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={`${tipoColors[doc.tipo]} text-white`}>
                              {doc.tipo}
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-600">{doc.tamano}</td>
                          <td className="p-4 text-gray-600">
                            {new Date(doc.fecha).toLocaleDateString('es-ES')}
                          </td>
                          <td className="p-4">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownload(doc.nombre)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Descargar
                              </Button>
                              {isAdmin && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(doc.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">
                          <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No se encontraron documentos</p>
                          {isAdmin && (
                            <Button
                              variant="outline"
                              className="mt-4"
                              onClick={() => setIsUploadDialogOpen(true)}
                            >
                              Cargar primer documento
                            </Button>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {!isAdmin && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm text-blue-900">
                  <strong>Nota:</strong> Los documentos son gestionados por el equipo legal. 
                  Para solicitar documentos adicionales, contacte a su abogado asignado.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Dialog de carga de documento */}
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cargar Nuevo Documento</DialogTitle>
              <DialogDescription>
                Agregue un nuevo documento al caso {caso.numero}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="archivo">Archivo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#6D0111] transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-1">
                    Haga clic para seleccionar o arrastre el archivo aquí
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX hasta 10MB
                  </p>
                  <Input
                    id="archivo"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setNewDoc({ ...newDoc, nombre: file.name });
                      }
                    }}
                  />
                </div>
              </div>

              {newDoc.nombre && (
                <div className="text-sm text-gray-600">
                  Archivo seleccionado: <strong>{newDoc.nombre}</strong>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Documento</Label>
                <Select
                  value={newDoc.tipo}
                  onValueChange={(value) => setNewDoc({ ...newDoc, tipo: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposDocumento.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsUploadDialogOpen(false);
                    setNewDoc({ nombre: '', tipo: 'DEMANDA' });
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#6D0111] hover:bg-[#5A0010] text-white"
                  disabled={!newDoc.nombre}
                >
                  Cargar Documento
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}