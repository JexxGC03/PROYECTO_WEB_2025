import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { CaseDetails } from '../components/CaseDetails';
import { CaseDocuments } from '../components/CaseDocuments';
import { CaseTasks } from '../components/CaseTasks';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Settings,
  LogOut,
  FolderOpen,
  CheckSquare
} from 'lucide-react';
import { Page } from '../App';

interface DashboardAdminProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userEmail: string;
}

interface Caso {
  id: string;
  numero: string;
  demandante: string;
  demandado: string;
  cliente: string;
  tipo: string;
  numeroProceso: string;
  estado: 'ACTIVO' | 'PENDIENTE' | 'CERRADO';
  prioridad: 'alta' | 'media' | 'baja';
  fecha: string;
  descripcion: string;
  ultimaActuacion?: string;
  fechaUltimaActuacion?: string;
  actuaciones: Actuacion[];
}

interface Actuacion {
  id: string;
  fecha: string;
  descripcion: string;
  agregadoPor: string;
}

export function DashboardAdmin({ onNavigate, onLogout, userEmail }: DashboardAdminProps) {
  const [casos, setCasos] = useState<Caso[]>([
    {
      id: '1',
      numero: 'CASO-2025-001',
      demandante: 'María González Pérez',
      demandado: 'Empresa Tech Solutions SAS',
      cliente: 'María González Pérez',
      tipo: 'Derecho Laboral',
      numeroProceso: 'PROC-2025-001',
      estado: 'ACTIVO',
      prioridad: 'alta',
      fecha: '2025-01-15',
      descripcion: 'Despido injustificado - Requiere audiencia',
      ultimaActuacion: 'Presentación de demanda',
      fechaUltimaActuacion: '2025-01-16',
      actuaciones: [
        {
          id: '1',
          fecha: '2025-01-16',
          descripcion: 'Presentación de demanda',
          agregadoPor: 'María González Pérez'
        }
      ]
    },
    {
      id: '2',
      numero: 'CASO-2025-002',
      demandante: 'Carlos Rodríguez',
      demandado: 'Banco Nacional',
      cliente: 'Carlos Rodríguez',
      tipo: 'Derecho Penal Derivado de Pólizas',
      numeroProceso: 'PROC-2025-002',
      estado: 'PENDIENTE',
      prioridad: 'media',
      fecha: '2025-02-01',
      descripcion: 'Proceso por presunta estafa en seguros - Pendiente de documentación',
      ultimaActuacion: 'Recepción de documentación',
      fechaUltimaActuacion: '2025-02-02',
      actuaciones: [
        {
          id: '2',
          fecha: '2025-02-02',
          descripcion: 'Recepción de documentación',
          agregadoPor: 'Carlos Rodríguez'
        }
      ]
    },
    {
      id: '3',
      numero: 'CASO-2025-003',
      demandante: 'Ana Martínez López',
      demandado: 'José Pérez',
      cliente: 'Ana Martínez López',
      tipo: 'Derecho Civil',
      numeroProceso: 'PROC-2025-003',
      estado: 'ACTIVO',
      prioridad: 'baja',
      fecha: '2025-01-20',
      descripcion: 'Divorcio contencioso - Acuerdo de custodia',
      ultimaActuacion: 'Reunión de conciliación',
      fechaUltimaActuacion: '2025-01-21',
      actuaciones: [
        {
          id: '3',
          fecha: '2025-01-21',
          descripcion: 'Reunión de conciliación',
          agregadoPor: 'Ana Martínez López'
        }
      ]
    },
    {
      id: '4',
      numero: 'CASO-2024-156',
      demandante: 'Empresa Tech Solutions SAS',
      demandado: 'Ministerio de Transporte',
      cliente: 'Empresa Tech Solutions SAS',
      tipo: 'Derecho Administrativo',
      numeroProceso: 'PROC-2024-156',
      estado: 'CERRADO',
      prioridad: 'alta',
      fecha: '2024-12-10',
      descripcion: 'Disputa contractual - Caso resuelto favorablemente',
      ultimaActuacion: 'Firma de acuerdo',
      fechaUltimaActuacion: '2024-12-11',
      actuaciones: [
        {
          id: '4',
          fecha: '2024-12-11',
          descripcion: 'Firma de acuerdo',
          agregadoPor: 'Empresa Tech Solutions SAS'
        }
      ]
    },
    {
      id: '5',
      numero: 'CASO-2025-004',
      demandante: 'client@email.com',
      demandado: 'Seguros Vida',
      cliente: 'client@email.com',
      tipo: 'Derecho de Seguros',
      numeroProceso: 'PROC-2025-004',
      estado: 'ACTIVO',
      prioridad: 'alta',
      fecha: '2025-02-05',
      descripcion: 'Reclamación de seguro médico - En proceso',
      ultimaActuacion: 'Presentación de reclamación',
      fechaUltimaActuacion: '2025-02-06',
      actuaciones: [
        {
          id: '5',
          fecha: '2025-02-06',
          descripcion: 'Presentación de reclamación',
          agregadoPor: 'client@email.com'
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterTipo, setFilterTipo] = useState<string>('todos');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCaso, setSelectedCaso] = useState<Caso | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editCaso, setEditCaso] = useState<Caso | null>(null);
  const [isDocumentsDialogOpen, setIsDocumentsDialogOpen] = useState(false);
  const [isTasksDialogOpen, setIsTasksDialogOpen] = useState(false);

  const [newCaso, setNewCaso] = useState({
    demandante: '',
    demandado: '',
    cliente: '',
    tipo: '',
    numeroProceso: '',
    prioridad: 'media' as 'alta' | 'media' | 'baja',
    descripcion: ''
  });

  const estadoColors = {
    'ACTIVO': 'bg-green-500',
    'PENDIENTE': 'bg-yellow-500',
    'CERRADO': 'bg-gray-500'
  };

  const prioridadColors = {
    alta: 'bg-red-500',
    media: 'bg-orange-500',
    baja: 'bg-blue-500'
  };

  const tiposProceso = [
    'Derecho Civil',
    'Derecho de Seguros',
    'Derecho Laboral',
    'Derecho Médico',
    'Derecho Administrativo',
    'Derecho Penal Derivado de Pólizas'
  ];

  const filteredCasos = casos.filter(caso => {
    const matchesSearch = caso.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.tipo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todos' || caso.estado === filterEstado.toUpperCase();
    const matchesTipo = filterTipo === 'todos' || caso.tipo === filterTipo;
    return matchesSearch && matchesEstado && matchesTipo;
  });

  const handleCreateCaso = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoCaso: Caso = {
      id: String(casos.length + 1),
      numero: `CASO-2025-${String(casos.length + 1).padStart(3, '0')}`,
      demandante: newCaso.demandante,
      demandado: newCaso.demandado,
      cliente: newCaso.cliente,
      tipo: newCaso.tipo,
      numeroProceso: newCaso.numeroProceso || `PROC-2025-${String(casos.length + 1).padStart(3, '0')}`,
      estado: 'ACTIVO',
      prioridad: newCaso.prioridad,
      fecha: new Date().toISOString().split('T')[0],
      descripcion: newCaso.descripcion,
      ultimaActuacion: '',
      fechaUltimaActuacion: '',
      actuaciones: []
    };
    setCasos([...casos, nuevoCaso]);
    setNewCaso({ demandante: '', demandado: '', cliente: '', tipo: '', numeroProceso: '', prioridad: 'media', descripcion: '' });
    setIsDialogOpen(false);
  };

  const handleViewCaso = (caso: Caso) => {
    setSelectedCaso(caso);
    setIsViewDialogOpen(true);
  };

  const handleUpdateCaso = (casoActualizado: Caso) => {
    setCasos(casos.map(c => c.id === casoActualizado.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
  };

  const casosActivos = casos.filter(c => c.estado === 'ACTIVO').length;
  const casosPendientes = casos.filter(c => c.estado === 'PENDIENTE').length;
  const casosAltaPrioridad = casos.filter(c => c.prioridad === 'alta' && c.estado !== 'CERRADO').length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-[#6D0111] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src="/assets/logo.png"
                  alt="Rincón Achury Abogados"
                  className="h-10 w-10 object-contain bg-white rounded-full p-1"
                />
                <div>
                  <h1 className="text-lg">Rincón Achury</h1>
                  <p className="text-xs opacity-90">Panel de Administración</p>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-gray-200 transition-colors border-b-2 border-white pb-1"
                >
                  Casos
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{userEmail}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-200 hover:bg-[#5A0010]"
                onClick={() => onNavigate('configuracion')}
              >
                <Settings className="h-5 w-5" />
              </Button>
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
        {/* Top Bar */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl">Gestión de Casos</h1>
                <p className="text-gray-600">Administre y haga seguimiento a todos sus casos legales</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#6D0111] hover:bg-[#5A0010] text-white">
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="demandante">Demandante</Label>
                        <Input
                          id="demandante"
                          placeholder="Nombre del demandante"
                          value={newCaso.demandante}
                          onChange={(e) => setNewCaso({ ...newCaso, demandante: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="demandado">Demandado</Label>
                        <Input
                          id="demandado"
                          placeholder="Nombre del demandado"
                          value={newCaso.demandado}
                          onChange={(e) => setNewCaso({ ...newCaso, demandado: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cliente">Cliente</Label>
                      <Input
                        id="cliente"
                        placeholder="Nombre completo del cliente o email"
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
                            {tiposProceso.map((tipo) => (
                              <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numeroProceso">Número de Proceso</Label>
                        <Input
                          id="numeroProceso"
                          placeholder="PROC-2025-XXX"
                          value={newCaso.numeroProceso}
                          onChange={(e) => setNewCaso({ ...newCaso, numeroProceso: e.target.value })}
                        />
                      </div>
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
                      <Button type="submit" className="bg-[#6D0111] hover:bg-[#5A0010] text-white">
                        Crear Caso
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
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
                  <FileText className="h-10 w-10 text-[#6D0111] opacity-50" />
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
                <Select value={filterTipo} onValueChange={setFilterTipo}>
                  <SelectTrigger className="w-full md:w-[250px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los tipos</SelectItem>
                    {tiposProceso.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterEstado} onValueChange={setFilterEstado}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="activo">ACTIVO</SelectItem>
                    <SelectItem value="pendiente">PENDIENTE</SelectItem>
                    <SelectItem value="cerrado">CERRADO</SelectItem>
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
                          <Badge className={`${prioridadColors[caso.prioridad]} text-white uppercase`}>
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 md:flex-none"
                        onClick={() => handleViewCaso(caso)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 md:flex-none"
                        onClick={() => {
                          setSelectedCaso(caso);
                          setIsDocumentsDialogOpen(true);
                        }}
                      >
                        <FolderOpen className="h-4 w-4 mr-1" />
                        Documentos
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 md:flex-none"
                        onClick={() => {
                          setSelectedCaso(caso);
                          setIsTasksDialogOpen(true);
                        }}
                      >
                        <CheckSquare className="h-4 w-4 mr-1" />
                        Tareas
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
                  {searchTerm || filterEstado !== 'todos' || filterTipo !== 'todos'
                    ? 'Intente ajustar sus filtros de búsqueda'
                    : 'Comience creando su primer caso'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Case Details Dialog */}
      {selectedCaso && (
        <CaseDetails
          caso={selectedCaso}
          isOpen={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
          isAdmin={true}
          userEmail={userEmail}
          onUpdateCaso={handleUpdateCaso}
        />
      )}

      {/* Case Documents Dialog */}
      {selectedCaso && (
        <CaseDocuments
          caso={selectedCaso}
          isOpen={isDocumentsDialogOpen}
          onClose={() => setIsDocumentsDialogOpen(false)}
          isAdmin={true}
          userEmail={userEmail}
        />
      )}

      {/* Case Tasks Dialog */}
      {selectedCaso && (
        <CaseTasks
          caso={selectedCaso}
          isOpen={isTasksDialogOpen}
          onClose={() => setIsTasksDialogOpen(false)}
          isAdmin={true}
          userEmail={userEmail}
        />
      )}
    </div>
  );
}