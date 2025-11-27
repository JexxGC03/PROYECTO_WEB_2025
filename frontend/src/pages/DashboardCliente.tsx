import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { CaseDetails } from '../components/CaseDetails';
import { CaseDocuments } from '../components/CaseDocuments';
import { CaseTasks } from '../components/CaseTasks';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { 
  FileText, 
  Search, 
  Filter,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
  Settings,
  LogOut,
  FolderOpen,
  CheckSquare
} from 'lucide-react';
import { Page } from '../App';
import { ApiCase, apiListCases } from '../lib/api';

interface DashboardClienteProps {
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
  resumen: string;
}

const statusApiToUi: Record<ApiCase['status'], Caso['estado']> = {
  OPEN: 'PENDIENTE',
  IN_PROGRESS: 'ACTIVO',
  RESOLVED: 'PENDIENTE',
  CLOSED: 'CERRADO'
};

const priorityApiToUi: Record<ApiCase['priority'], Caso['prioridad']> = {
  LOW: 'baja',
  MEDIUM: 'media',
  HIGH: 'alta',
  URGENT: 'alta'
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
  resumen: apiCase.description || '',
});

export function DashboardCliente({ onNavigate, onLogout, userEmail, accessToken }: DashboardClienteProps) {
  const [casos, setCasos] = useState<Caso[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterTipo, setFilterTipo] = useState<string>('todos');
  const [selectedCaso, setSelectedCaso] = useState<Caso | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDocumentsDialogOpen, setIsDocumentsDialogOpen] = useState(false);
  const [isTasksDialogOpen, setIsTasksDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await apiListCases(accessToken);
        const mapped = res.data
          .filter((c) => c.client?.email === userEmail || c.client?.name?.toLowerCase() === userEmail.toLowerCase())
          .map(mapApiCaseToUi);
        setCasos(mapped);
      } catch (err) {
        setError((err as Error).message || 'No se pudieron cargar tus casos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, [accessToken, userEmail]);

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
    const matchesSearch = caso.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.tipo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todos' || caso.estado === filterEstado;
    const matchesTipo = filterTipo === 'todos' || caso.tipo === filterTipo;
    return matchesSearch && matchesEstado && matchesTipo;
  }), [casos, searchTerm, filterEstado, filterTipo]);

  const casosActivos = casos.filter(c => c.estado === 'ACTIVO').length;
  const casosPendientes = casos.filter(c => c.estado === 'PENDIENTE').length;
  const casosAltaPrioridad = casos.filter(c => c.prioridad === 'alta' && c.estado !== 'CERRADO').length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Cargando tus casos desde el servidor...</p>
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
                  <p className="text-xs opacity-90">Portal del Cliente</p>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-gray-200 transition-colors border-b-2 border-white pb-1"
                >
                  Mis Casos
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
            <div>
              <h1 className="text-2xl">Mis Casos</h1>
              <p className="text-gray-600">Consulte el estado y detalles de sus casos legales</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Mis Casos</p>
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
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por número de caso o tipo..."
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

          {/* Cases List - Solo Resumen */}
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            {!error && filteredCasos.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center text-gray-600">
                  No hay casos asociados a tu usuario todavía.
                </CardContent>
              </Card>
            )}
            {filteredCasos.map((caso) => (
              <Card key={caso.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg mb-1">{caso.numero}</h3>
                          <div className="flex gap-2 mb-2">
                            <Badge className={`${estadoColors[caso.estado]} text-white`}>
                              {caso.estado}
                            </Badge>
                            <Badge className={`${prioridadColors[caso.prioridad]} text-white uppercase`}>
                              Prioridad {caso.prioridad}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-50 border-l-4 border-[#6D0111] p-4 mb-3">
                        <h4 className="text-sm mb-1 text-[#6D0111]">Resumen del Caso:</h4>
                        <p className="text-sm text-gray-700">{caso.resumen}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{caso.tipo}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Fecha de inicio: {new Date(caso.fecha).toLocaleDateString('es-ES')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 md:flex-none bg-[#6D0111] text-white hover:bg-[#5A0010]"
                        onClick={() => {
                          setSelectedCaso(caso);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
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
                        <FileText className="h-4 w-4 mr-1" />
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Información Importante */}
          <Card className="mt-8 bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="mb-2 text-amber-900">Información Importante</h3>
                  <p className="text-sm text-amber-800">
                    Para el correcto avance de su caso, por favor haga clic en los botones <strong>Documentos</strong> y <strong>Tareas</strong> en cada caso para revisar y completar las acciones necesarias.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Case Details Dialog */}
        {selectedCaso && (
          <CaseDetails
            caso={{
              id: selectedCaso.id,
              numero: selectedCaso.numero,
              demandante: selectedCaso.demandante,
              demandado: selectedCaso.demandado,
              cliente: selectedCaso.cliente,
              tipo: selectedCaso.tipo,
              numeroProceso: selectedCaso.numeroProceso,
              estado: selectedCaso.estado,
              prioridad: selectedCaso.prioridad,
              fecha: selectedCaso.fecha,
              descripcion: selectedCaso.descripcion
            }}
            isOpen={isViewDialogOpen}
            onClose={() => setIsViewDialogOpen(false)}
            isAdmin={false}
          />
        )}

        {/* Case Documents Dialog */}
        {selectedCaso && (
          <CaseDocuments
            caso={{
              id: selectedCaso.id,
              numero: selectedCaso.numero,
              cliente: selectedCaso.cliente,
              tipo: selectedCaso.tipo
            }}
            isOpen={isDocumentsDialogOpen}
            onClose={() => setIsDocumentsDialogOpen(false)}
            isAdmin={false}
            userEmail={userEmail}
          />
        )}

        {/* Case Tasks Dialog */}
        {selectedCaso && (
          <CaseTasks
            caso={{
              id: selectedCaso.id,
              numero: selectedCaso.numero,
              cliente: selectedCaso.cliente,
              tipo: selectedCaso.tipo
            }}
            isOpen={isTasksDialogOpen}
            onClose={() => setIsTasksDialogOpen(false)}
            isAdmin={false}
            userEmail={userEmail}
          />
        )}
      </div>
    </div>
  );
}