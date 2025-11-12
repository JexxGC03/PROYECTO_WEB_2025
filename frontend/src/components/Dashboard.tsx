import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard' | 'documents') => void;
  onLogout: () => void;
}

interface Caso {
  id: string;
  numero: string;
  cliente: string;
  tipo: string;
  estado: 'activo' | 'pendiente' | 'cerrado';
  prioridad: 'alta' | 'media' | 'baja';
  fecha: string;
  descripcion: string;
}

export function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const [casos, setCasos] = useState<Caso[]>([
    {
      id: '1',
      numero: 'CASO-2025-001',
      cliente: 'María González Pérez',
      tipo: 'Derecho Laboral',
      estado: 'activo',
      prioridad: 'alta',
      fecha: '2025-01-15',
      descripcion: 'Despido injustificado - Requiere audiencia'
    },
    {
      id: '2',
      numero: 'CASO-2025-002',
      cliente: 'Carlos Rodríguez',
      tipo: 'Derecho Penal',
      estado: 'pendiente',
      prioridad: 'media',
      fecha: '2025-02-01',
      descripcion: 'Proceso por presunta estafa - Pendiente de documentación'
    },
    {
      id: '3',
      numero: 'CASO-2025-003',
      cliente: 'Ana Martínez López',
      tipo: 'Derecho Civil',
      estado: 'activo',
      prioridad: 'baja',
      fecha: '2025-01-20',
      descripcion: 'Divorcio contencioso - Acuerdo de custodia'
    },
    {
      id: '4',
      numero: 'CASO-2024-156',
      cliente: 'Empresa Tech Solutions SAS',
      tipo: 'Derecho Comercial',
      estado: 'cerrado',
      prioridad: 'alta',
      fecha: '2024-12-10',
      descripcion: 'Disputa contractual - Caso resuelto favorablemente'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCaso, setSelectedCaso] = useState<Caso | null>(null);

  const [newCaso, setNewCaso] = useState({
    cliente: '',
    tipo: '',
    prioridad: 'media' as 'alta' | 'media' | 'baja',
    descripcion: ''
  });

  const estadoColors = {
    activo: 'bg-green-500',
    pendiente: 'bg-yellow-500',
    cerrado: 'bg-gray-500'
  };

  const prioridadColors = {
    alta: 'bg-red-500',
    media: 'bg-orange-500',
    baja: 'bg-blue-500'
  };

  const filteredCasos = casos.filter(caso => {
    const matchesSearch = caso.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.tipo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todos' || caso.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  const handleCreateCaso = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoCaso: Caso = {
      id: String(casos.length + 1),
      numero: `CASO-2025-${String(casos.length + 1).padStart(3, '0')}`,
      cliente: newCaso.cliente,
      tipo: newCaso.tipo,
      estado: 'activo',
      prioridad: newCaso.prioridad,
      fecha: new Date().toISOString().split('T')[0],
      descripcion: newCaso.descripcion
    };
    setCasos([...casos, nuevoCaso]);
    setNewCaso({ cliente: '', tipo: '', prioridad: 'media', descripcion: '' });
    setIsDialogOpen(false);
  };

  const casosActivos = casos.filter(c => c.estado === 'activo').length;
  const casosPendientes = casos.filter(c => c.estado === 'pendiente').length;
  const casosAltaPrioridad = casos.filter(c => c.prioridad === 'alta' && c.estado !== 'cerrado').length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={onNavigate} isLoggedIn={true} onLogout={onLogout} />

      <div className="flex-1 bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl">Gestión de Casos</h1>
                <p className="text-gray-600">Administre y haga seguimiento a todos sus casos legales</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => onNavigate('documents')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Documentos
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#8B1538] hover:bg-[#6B0F28] text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo Caso
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Crear Nuevo Caso</DialogTitle>
                      <DialogDescription>
                        Complete la información del nuevo caso legal
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateCaso} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cliente">Cliente</Label>
                        <Input
                          id="cliente"
                          placeholder="Nombre completo del cliente"
                          value={newCaso.cliente}
                          onChange={(e) => setNewCaso({ ...newCaso, cliente: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tipo">Tipo de Caso</Label>
                          <Select
                            value={newCaso.tipo}
                            onValueChange={(value) => setNewCaso({ ...newCaso, tipo: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Derecho Laboral">Derecho Laboral</SelectItem>
                              <SelectItem value="Derecho Penal">Derecho Penal</SelectItem>
                              <SelectItem value="Derecho Civil">Derecho Civil</SelectItem>
                              <SelectItem value="Derecho Comercial">Derecho Comercial</SelectItem>
                              <SelectItem value="Derecho Médico">Derecho Médico</SelectItem>
                              <SelectItem value="Derecho de Seguros">Derecho de Seguros</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="prioridad">Prioridad</Label>
                          <Select
                            value={newCaso.prioridad}
                            onValueChange={(value: 'alta' | 'media' | 'baja') => setNewCaso({ ...newCaso, prioridad: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="alta">Alta</SelectItem>
                              <SelectItem value="media">Media</SelectItem>
                              <SelectItem value="baja">Baja</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Textarea
                          id="descripcion"
                          placeholder="Descripción detallada del caso..."
                          value={newCaso.descripcion}
                          onChange={(e) => setNewCaso({ ...newCaso, descripcion: e.target.value })}
                          rows={4}
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit" className="bg-[#8B1538] hover:bg-[#6B0F28] text-white">
                          Crear Caso
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
                    <p className="text-sm text-gray-600 mb-1">Total de Casos</p>
                    <p className="text-3xl">{casos.length}</p>
                  </div>
                  <FileText className="h-10 w-10 text-[#8B1538] opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Casos Activos</p>
                    <p className="text-3xl text-green-600">{casosActivos}</p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-green-600 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Casos Pendientes</p>
                    <p className="text-3xl text-yellow-600">{casosPendientes}</p>
                  </div>
                  <Clock className="h-10 w-10 text-yellow-600 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Alta Prioridad</p>
                    <p className="text-3xl text-red-600">{casosAltaPrioridad}</p>
                  </div>
                  <AlertCircle className="h-10 w-10 text-red-600 opacity-50" />
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
                    placeholder="Buscar por cliente, número de caso o tipo..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterEstado} onValueChange={setFilterEstado}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="activo">Activos</SelectItem>
                    <SelectItem value="pendiente">Pendientes</SelectItem>
                    <SelectItem value="cerrado">Cerrados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Cases List */}
          <div className="space-y-4">
            {filteredCasos.map((caso) => (
              <Card key={caso.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg mb-1">{caso.numero}</h3>
                          <p className="text-gray-600 mb-2">{caso.cliente}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={`${estadoColors[caso.estado]} text-white`}>
                            {caso.estado}
                          </Badge>
                          <Badge className={`${prioridadColors[caso.prioridad]} text-white`}>
                            {caso.prioridad}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{caso.descripcion}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{caso.tipo}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(caso.fecha).toLocaleDateString('es-ES')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2">
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 md:flex-none text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCasos.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl mb-2">No se encontraron casos</h3>
                <p className="text-gray-600">
                  {searchTerm || filterEstado !== 'todos'
                    ? 'Intente ajustar sus filtros de búsqueda'
                    : 'Comience creando su primer caso'}
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
