import { useEffect, useMemo, useState } from 'react';
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
import { ApiCase, apiCreateCase, apiListCases, apiUpdateCase } from '../lib/api';

interface DashboardAdminProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userEmail: string;
  accessToken: string;
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

const statusApiToUi: Record<ApiCase['status'], Caso['estado']> = {
  OPEN: 'PENDIENTE',
  IN_PROGRESS: 'ACTIVO',
  RESOLVED: 'PENDIENTE',
  CLOSED: 'CERRADO'
};

const statusUiToApi: Record<Caso['estado'], ApiCase['status']> = {
  ACTIVO: 'IN_PROGRESS',
  PENDIENTE: 'OPEN',
  CERRADO: 'CLOSED'
};

const priorityApiToUi: Record<ApiCase['priority'], Caso['prioridad']> = {
  LOW: 'baja',
  MEDIUM: 'media',
  HIGH: 'alta',
  URGENT: 'alta'
};

const priorityUiToApi: Record<Caso['prioridad'], ApiCase['priority']> = {
  baja: 'LOW',
  media: 'MEDIUM',
  alta: 'HIGH'
};

const mapApiCaseToUi = (apiCase: ApiCase): Caso => ({
  id: apiCase._id,
  numero: apiCase.caseNumber,
  demandante: apiCase.plaintiff?.name ?? '',
  demandado: apiCase.defendant?.name ?? '',
  cliente: apiCase.client?.name || apiCase.client?.email || 'Sin cliente',
  tipo: apiCase.caseType,
  numeroProceso: apiCase.caseNumber,
  estado: statusApiToUi[apiCase.status] ?? 'PENDIENTE',
  prioridad: priorityApiToUi[apiCase.priority] ?? 'media',
  fecha: apiCase.createdAt || new Date().toISOString(),
  descripcion: apiCase.description || '',
  ultimaActuacion: undefined,
  fechaUltimaActuacion: undefined,
  actuaciones: [],
});

export function DashboardAdmin({ onNavigate, onLogout, userEmail, accessToken }: DashboardAdminProps) {
  const [casos, setCasos] = useState<Caso[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    tipo: 'CIVIL',
    numeroProceso: '',
    prioridad: 'media' as 'alta' | 'media' | 'baja',
    descripcion: ''
  });

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await apiListCases(accessToken);
        setCasos(res.data.map(mapApiCaseToUi));
      } catch (err) {
        setError((err as Error).message || 'No se pudieron cargar los casos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, [accessToken]);

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
    { value: 'CIVIL', label: 'Derecho Civil' },
    { value: 'PENAL', label: 'Derecho Penal' },
    { value: 'LABORAL', label: 'Derecho Laboral' },
    { value: 'FAMILIA', label: 'Derecho de Familia' },
    { value: 'ADMINISTRATIVO', label: 'Derecho Administrativo' },
    { value: 'OTRO', label: 'Otro' },
  ];

  const filteredCasos = useMemo(() => casos.filter(caso => {
    const matchesSearch = caso.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.tipo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todos' || caso.estado === filterEstado;
    const matchesTipo = filterTipo === 'todos' || caso.tipo === filterTipo;
    return matchesSearch && matchesEstado && matchesTipo;
  }), [casos, searchTerm, filterEstado, filterTipo]);

  const handleCreateCaso = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const created = await apiCreateCase({
        plaintiffName: newCaso.demandante,
        defendantName: newCaso.demandado,
        client: newCaso.cliente,
        caseType: newCaso.tipo,
        caseNumber: newCaso.numeroProceso || `PROC-${Date.now()}`,
        priority: priorityUiToApi[newCaso.prioridad],
        description: newCaso.descripcion,
      }, accessToken);

      setCasos([mapApiCaseToUi(created), ...casos]);
      setNewCaso({ demandante: '', demandado: '', cliente: '', tipo: 'CIVIL', numeroProceso: '', prioridad: 'media', descripcion: '' });
      setIsDialogOpen(false);
    } catch (err) {
      setError((err as Error).message || 'No se pudo crear el caso');
    }
  };

  const handleViewCaso = (caso: Caso) => {
    setSelectedCaso(caso);
    setIsViewDialogOpen(true);
  };

  const handleUpdateCaso = async (casoActualizado: Caso) => {
    setCasos(casos.map(c => c.id === casoActualizado.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
    try {
      await apiUpdateCase(casoActualizado.id, {
        plaintiffName: casoActualizado.demandante,
        defendantName: casoActualizado.demandado,
        client: casoActualizado.cliente,
        caseType: casoActualizado.tipo,
        caseNumber: casoActualizado.numeroProceso,
        priority: priorityUiToApi[casoActualizado.prioridad],
        status: statusUiToApi[casoActualizado.estado],
        description: casoActualizado.descripcion,
      }, accessToken);
    } catch (err) {
      setError((err as Error).message || 'No se pudo actualizar el caso');
    }
  };

  const casosActivos = casos.filter(c => c.estado === 'ACTIVO').length;
  const casosPendientes = casos.filter(c => c.estado === 'PENDIENTE').length;
  const casosAltaPrioridad = casos.filter(c => c.prioridad === 'alta' && c.estado !== 'CERRADO').length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Cargando casos desde el servidor...</p>
      </div>
    );
  }

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
                              <SelectItem key={tipo.value} value={tipo.value}>{tipo.label}</SelectItem>
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
                      <SelectItem key={tipo.value} value={tipo.value}>{tipo.label}</SelectItem>
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
                    <SelectItem value="ACTIVO">ACTIVO</SelectItem>
                    <SelectItem value="PENDIENTE">PENDIENTE</SelectItem>
                    <SelectItem value="CERRADO">CERRADO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Cases List */}
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            {!error && filteredCasos.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center text-gray-600">
                  No hay casos para mostrar con los filtros actuales.
                </CardContent>
              </Card>
            )}
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