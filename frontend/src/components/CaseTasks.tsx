import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { 
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Edit,
  Calendar,
  ArrowLeft,
  Clock,
  AlertCircle,
  Upload,
  FileText,
  Download,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DocumentoAdjunto {
  id: string;
  nombre: string;
  tipo: string;
  fechaCarga: string;
  cargadoPor: string;
  url: string;
}

interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  fechaVencimiento: string;
  prioridad: 'alta' | 'media' | 'baja';
  estado: 'pendiente' | 'en_proceso' | 'completada';
  asignadoA: string;
  casoId: string;
  requiereDocumento?: boolean;
  documentosAdjuntos?: DocumentoAdjunto[];
}

interface Caso {
  id: string;
  numero: string;
  cliente: string;
  tipo: string;
}

interface CaseTasksProps {
  caso: Caso;
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  userEmail: string;
}

export function CaseTasks({ caso, isOpen, onClose, isAdmin, userEmail }: CaseTasksProps) {
  const [tareas, setTareas] = useState<Tarea[]>([
    {
      id: '1',
      titulo: 'Revisar documentación inicial',
      descripcion: 'Verificar que todos los documentos estén completos y correctamente firmados',
      fechaVencimiento: '2025-11-15',
      prioridad: 'alta',
      estado: 'completada',
      asignadoA: 'admin@raa.com',
      casoId: caso.id,
      requiereDocumento: false
    },
    {
      id: '2',
      titulo: 'Preparar alegatos de conclusión',
      descripcion: 'Redactar alegatos finales para presentar ante el juez',
      fechaVencimiento: '2025-11-20',
      prioridad: 'alta',
      estado: 'en_proceso',
      asignadoA: 'admin@raa.com',
      casoId: caso.id,
      requiereDocumento: false
    },
    {
      id: '3',
      titulo: 'Subir cédula de ciudadanía',
      descripcion: 'Por favor suba una copia escaneada de su cédula de ciudadanía por ambos lados',
      fechaVencimiento: '2025-11-18',
      prioridad: 'alta',
      estado: 'pendiente',
      asignadoA: userEmail,
      casoId: caso.id,
      requiereDocumento: true,
      documentosAdjuntos: []
    },
    {
      id: '4',
      titulo: 'Subir contrato de trabajo',
      descripcion: 'Necesitamos el contrato de trabajo original firmado',
      fechaVencimiento: '2025-11-25',
      prioridad: 'media',
      estado: 'pendiente',
      asignadoA: userEmail,
      casoId: caso.id,
      requiereDocumento: true,
      documentosAdjuntos: []
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTarea, setEditingTarea] = useState<Tarea | null>(null);
  const [newTarea, setNewTarea] = useState({
    titulo: '',
    descripcion: '',
    fechaVencimiento: '',
    prioridad: 'media' as 'alta' | 'media' | 'baja',
    asignadoA: 'admin@raa.com',
    requiereDocumento: false
  });

  const handleCreateTarea = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaTarea: Tarea = {
      id: String(Date.now()),
      titulo: newTarea.titulo,
      descripcion: newTarea.descripcion,
      fechaVencimiento: newTarea.fechaVencimiento,
      prioridad: newTarea.prioridad,
      estado: 'pendiente',
      asignadoA: newTarea.asignadoA,
      casoId: caso.id,
      requiereDocumento: newTarea.requiereDocumento,
      documentosAdjuntos: []
    };
    setTareas([...tareas, nuevaTarea]);
    setNewTarea({
      titulo: '',
      descripcion: '',
      fechaVencimiento: '',
      prioridad: 'media',
      asignadoA: 'admin@raa.com',
      requiereDocumento: false
    });
    setIsCreateDialogOpen(false);
    toast.success('Tarea creada exitosamente');
  };

  const handleEditTarea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTarea) return;
    
    setTareas(tareas.map(tarea => 
      tarea.id === editingTarea.id ? editingTarea : tarea
    ));
    setEditingTarea(null);
    setIsEditDialogOpen(false);
    toast.success('Tarea actualizada exitosamente');
  };

  const handleToggleEstado = (tareaId: string) => {
    setTareas(tareas.map(tarea => {
      if (tarea.id === tareaId) {
        const newEstado = tarea.estado === 'completada' ? 'pendiente' : 'completada';
        return { ...tarea, estado: newEstado };
      }
      return tarea;
    }));
    toast.success('Estado de tarea actualizado');
  };

  const handleDeleteTarea = (tareaId: string) => {
    setTareas(tareas.filter(t => t.id !== tareaId));
    toast.success('Tarea eliminada');
  };

  const handleUploadDocument = (tareaId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simular subida de archivo
    const nuevoDocumento: DocumentoAdjunto = {
      id: String(Date.now()),
      nombre: file.name,
      tipo: file.type,
      fechaCarga: new Date().toISOString(),
      cargadoPor: userEmail,
      url: URL.createObjectURL(file)
    };

    setTareas(tareas.map(tarea => {
      if (tarea.id === tareaId) {
        return {
          ...tarea,
          documentosAdjuntos: [...(tarea.documentosAdjuntos || []), nuevoDocumento]
        };
      }
      return tarea;
    }));

    toast.success('Documento subido exitosamente');
    // Reset input
    event.target.value = '';
  };

  const handleDeleteDocument = (tareaId: string, documentoId: string) => {
    setTareas(tareas.map(tarea => {
      if (tarea.id === tareaId) {
        return {
          ...tarea,
          documentosAdjuntos: tarea.documentosAdjuntos?.filter(d => d.id !== documentoId)
        };
      }
      return tarea;
    }));
    toast.success('Documento eliminado');
  };

  const prioridadColors = {
    alta: 'bg-red-500',
    media: 'bg-orange-500',
    baja: 'bg-blue-500'
  };

  const estadoColors = {
    pendiente: 'bg-yellow-500',
    en_proceso: 'bg-blue-500',
    completada: 'bg-green-500'
  };

  const tareasCompletadas = tareas.filter(t => t.estado === 'completada').length;
  const tareasPendientes = tareas.filter(t => t.estado !== 'completada').length;
  const tareasVencidas = tareas.filter(t => 
    new Date(t.fechaVencimiento) < new Date() && t.estado !== 'completada'
  ).length;

  // Agrupar tareas por estado
  const tareasPorEstado = {
    pendiente: tareas.filter(t => t.estado === 'pendiente'),
    en_proceso: tareas.filter(t => t.estado === 'en_proceso'),
    completada: tareas.filter(t => t.estado === 'completada')
  };

  const renderTareaCard = (tarea: Tarea, borderColor?: string) => (
    <Card key={tarea.id} className={`hover:shadow-md transition-shadow ${borderColor || ''} ${tarea.estado === 'completada' ? 'bg-green-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="pt-1">
            {isAdmin || tarea.asignadoA === userEmail ? (
              <Checkbox
                checked={tarea.estado === 'completada'}
                onCheckedChange={() => handleToggleEstado(tarea.id)}
                className="h-5 w-5"
              />
            ) : (
              tarea.estado === 'completada' ? 
                <CheckSquare className="h-5 w-5 text-green-600" /> :
                <Square className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h4 className={`text-base ${tarea.estado === 'completada' ? 'line-through text-gray-600' : ''}`}>
                {tarea.titulo}
              </h4>
              <div className="flex gap-2">
                <Badge className={`${prioridadColors[tarea.prioridad]} text-white text-xs`}>
                  {tarea.prioridad.toUpperCase()}
                </Badge>
                {tarea.requiereDocumento && (
                  <Badge className="bg-purple-500 text-white text-xs">
                    <Upload className="h-3 w-3 mr-1" />
                    REQUIERE DOC
                  </Badge>
                )}
              </div>
            </div>
            <p className={`text-sm mb-3 ${tarea.estado === 'completada' ? 'text-gray-500' : 'text-gray-600'}`}>
              {tarea.descripcion}
            </p>
            
            {/* Sección de documentos adjuntos */}
            {tarea.requiereDocumento && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 -mx-4 px-6">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-600" />
                    Documentos Adjuntos
                  </h5>
                  {(isAdmin || tarea.asignadoA === userEmail) && tarea.estado !== 'completada' && (
                    <Label htmlFor={`file-${tarea.id}`} className="cursor-pointer">
                      <div className="flex items-center gap-1 text-xs bg-[#6D0111] text-white px-3 py-1.5 rounded hover:bg-[#5A0010] transition-colors">
                        <Upload className="h-3 w-3" />
                        Subir
                      </div>
                      <Input
                        id={`file-${tarea.id}`}
                        type="file"
                        className="hidden"
                        onChange={(e) => handleUploadDocument(tarea.id, e)}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </Label>
                  )}
                </div>
                
                {tarea.documentosAdjuntos && tarea.documentosAdjuntos.length > 0 ? (
                  <div className="space-y-2">
                    {tarea.documentosAdjuntos.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="h-5 w-5 text-[#6D0111] flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{doc.nombre}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(doc.fechaCarga).toLocaleDateString('es-ES')} - {doc.cargadoPor}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => window.open(doc.url, '_blank')}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          {(isAdmin || doc.cargadoPor === userEmail) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteDocument(tarea.id, doc.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 text-center py-3">
                    No hay documentos adjuntos
                  </p>
                )}
              </div>
            )}

            {/* Información de fecha y acciones del admin */}
            <div className="flex items-center justify-between text-sm mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Vence: {new Date(tarea.fechaVencimiento).toLocaleDateString('es-ES')}
                </span>
                {new Date(tarea.fechaVencimiento) < new Date() && tarea.estado !== 'completada' && (
                  <Badge className="bg-red-500 text-white text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Vencida
                  </Badge>
                )}
                <span className="text-gray-500">
                  Asignado a: {tarea.asignadoA === 'admin@raa.com' ? 'Equipo Legal' : 'Cliente'}
                </span>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setEditingTarea(tarea);
                      setIsEditDialogOpen(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTarea(tarea.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
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
                <DialogTitle className="text-2xl">Tareas del Caso</DialogTitle>
                <DialogDescription>
                  {caso.numero} - {caso.cliente}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {/* Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl text-[#6D0111] mb-1">{tareas.length}</div>
                  <div className="text-sm text-gray-600">Total Tareas</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl text-yellow-600 mb-1">{tareasPendientes}</div>
                  <div className="text-sm text-gray-600">Pendientes</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl text-green-600 mb-1">{tareasCompletadas}</div>
                  <div className="text-sm text-gray-600">Completadas</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl text-red-600 mb-1">{tareasVencidas}</div>
                  <div className="text-sm text-gray-600">Vencidas</div>
                </CardContent>
              </Card>
            </div>

            {/* Botón crear tarea */}
            {isAdmin && (
              <div className="flex justify-end">
                <Button
                  className="bg-[#6D0111] hover:bg-[#5A0010] text-white"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Tarea
                </Button>
              </div>
            )}

            {/* Tareas por estado */}
            <div className="space-y-6">
              {/* Pendientes */}
              <div>
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  Pendientes ({tareasPorEstado.pendiente.length})
                </h3>
                <div className="space-y-3">
                  {tareasPorEstado.pendiente.map(tarea => renderTareaCard(tarea))}
                  {tareasPorEstado.pendiente.length === 0 && (
                    <Card className="border-dashed">
                      <CardContent className="p-8 text-center text-gray-500">
                        No hay tareas pendientes
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* En Proceso */}
              <div>
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-blue-600" />
                  En Proceso ({tareasPorEstado.en_proceso.length})
                </h3>
                <div className="space-y-3">
                  {tareasPorEstado.en_proceso.map(tarea => renderTareaCard(tarea, 'border-l-4 border-blue-500'))}
                  {tareasPorEstado.en_proceso.length === 0 && (
                    <Card className="border-dashed">
                      <CardContent className="p-8 text-center text-gray-500">
                        No hay tareas en proceso
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Completadas */}
              <div>
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-green-600" />
                  Completadas ({tareasPorEstado.completada.length})
                </h3>
                <div className="space-y-3">
                  {tareasPorEstado.completada.map(tarea => renderTareaCard(tarea))}
                  {tareasPorEstado.completada.length === 0 && (
                    <Card className="border-dashed">
                      <CardContent className="p-8 text-center text-gray-500">
                        No hay tareas completadas
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            {!isAdmin && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Nota:</strong> Solo puede marcar como completadas las tareas asignadas a usted y subir documentos en las tareas que lo requieran.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Dialog crear tarea */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nueva Tarea</DialogTitle>
                <DialogDescription>
                  Crear una nueva tarea para el caso {caso.numero}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateTarea} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título de la Tarea *</Label>
                  <Input
                    id="titulo"
                    placeholder="Ej: Revisar documentación"
                    value={newTarea.titulo}
                    onChange={(e) => setNewTarea({ ...newTarea, titulo: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción *</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Describa la tarea en detalle..."
                    value={newTarea.descripcion}
                    onChange={(e) => setNewTarea({ ...newTarea, descripcion: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prioridad">Prioridad</Label>
                    <Select
                      value={newTarea.prioridad}
                      onValueChange={(value: any) => setNewTarea({ ...newTarea, prioridad: value })}
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
                    <Label htmlFor="fecha">Fecha de Vencimiento *</Label>
                    <Input
                      id="fecha"
                      type="date"
                      value={newTarea.fechaVencimiento}
                      onChange={(e) => setNewTarea({ ...newTarea, fechaVencimiento: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asignado">Asignar a</Label>
                  <Select
                    value={newTarea.asignadoA}
                    onValueChange={(value) => setNewTarea({ ...newTarea, asignadoA: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin@raa.com">Equipo Legal</SelectItem>
                      {userEmail !== 'admin@raa.com' && (
                        <SelectItem value={userEmail}>Cliente ({userEmail})</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="requiereDoc"
                    checked={newTarea.requiereDocumento}
                    onCheckedChange={(checked) => setNewTarea({ ...newTarea, requiereDocumento: checked as boolean })}
                  />
                  <Label htmlFor="requiereDoc" className="cursor-pointer">
                    Esta tarea requiere que el cliente suba documentos
                  </Label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#6D0111] hover:bg-[#5A0010] text-white"
                  >
                    Crear Tarea
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Dialog editar tarea */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Tarea</DialogTitle>
                <DialogDescription>
                  Modificar la tarea del caso {caso.numero}
                </DialogDescription>
              </DialogHeader>

              {editingTarea && (
                <form onSubmit={handleEditTarea} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-titulo">Título de la Tarea *</Label>
                    <Input
                      id="edit-titulo"
                      placeholder="Ej: Revisar documentación"
                      value={editingTarea.titulo}
                      onChange={(e) => setEditingTarea({ ...editingTarea, titulo: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-descripcion">Descripción *</Label>
                    <Textarea
                      id="edit-descripcion"
                      placeholder="Describa la tarea en detalle..."
                      value={editingTarea.descripcion}
                      onChange={(e) => setEditingTarea({ ...editingTarea, descripcion: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-prioridad">Prioridad</Label>
                      <Select
                        value={editingTarea.prioridad}
                        onValueChange={(value: any) => setEditingTarea({ ...editingTarea, prioridad: value })}
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
                      <Label htmlFor="edit-fecha">Fecha de Vencimiento *</Label>
                      <Input
                        id="edit-fecha"
                        type="date"
                        value={editingTarea.fechaVencimiento}
                        onChange={(e) => setEditingTarea({ ...editingTarea, fechaVencimiento: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-estado">Estado</Label>
                    <Select
                      value={editingTarea.estado}
                      onValueChange={(value: any) => setEditingTarea({ ...editingTarea, estado: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="en_proceso">En Proceso</SelectItem>
                        <SelectItem value="completada">Completada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-asignado">Asignar a</Label>
                    <Select
                      value={editingTarea.asignadoA}
                      onValueChange={(value) => setEditingTarea({ ...editingTarea, asignadoA: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin@raa.com">Equipo Legal</SelectItem>
                        {userEmail !== 'admin@raa.com' && (
                          <SelectItem value={userEmail}>Cliente ({userEmail})</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="edit-requiereDoc"
                      checked={editingTarea.requiereDocumento || false}
                      onCheckedChange={(checked) => setEditingTarea({ ...editingTarea, requiereDocumento: checked as boolean })}
                    />
                    <Label htmlFor="edit-requiereDoc" className="cursor-pointer">
                      Esta tarea requiere que el cliente suba documentos
                    </Label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditDialogOpen(false);
                        setEditingTarea(null);
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#6D0111] hover:bg-[#5A0010] text-white"
                    >
                      Guardar Cambios
                    </Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </DialogContent>
      </Dialog>
    </>
  );
}