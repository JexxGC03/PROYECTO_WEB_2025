import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  X,
  Calendar,
  FileText,
  User,
  AlertTriangle,
  Plus,
  Clock,
  Edit
} from 'lucide-react';

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
  actuaciones?: Actuacion[];
}

interface Actuacion {
  id: string;
  fecha: string;
  descripcion: string;
  agregadoPor: string;
}

interface CaseDetailsProps {
  caso: Caso;
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  userEmail?: string;
  onUpdateCaso?: (caso: Caso) => void;
}

export function CaseDetails({ caso, isOpen, onClose, isAdmin, userEmail, onUpdateCaso }: CaseDetailsProps) {
  const [isEditingEstado, setIsEditingEstado] = useState(false);
  const [estadoEdit, setEstadoEdit] = useState(caso.estado);
  const [isAddingActuacion, setIsAddingActuacion] = useState(false);
  const [newActuacion, setNewActuacion] = useState('');
  const [isEditingCaso, setIsEditingCaso] = useState(false);
  const [editedCaso, setEditedCaso] = useState<Caso>(caso);

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

  const handleUpdateEstado = () => {
    const casoActualizado = { ...caso, estado: estadoEdit };
    onUpdateCaso && onUpdateCaso(casoActualizado);
    setIsEditingEstado(false);
  };

  const handleUpdateCaso = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCaso && onUpdateCaso(editedCaso);
    setIsEditingCaso(false);
  };

  const handleAddActuacion = () => {
    if (newActuacion.trim()) {
      const nuevaActuacion: Actuacion = {
        id: String(caso.actuaciones?.length + 1 || 1),
        fecha: new Date().toISOString().split('T')[0],
        descripcion: newActuacion,
        agregadoPor: userEmail || ''
      };
      
      const casoActualizado = {
        ...caso,
        actuaciones: [...caso.actuaciones || [], nuevaActuacion],
        ultimaActuacion: newActuacion,
        fechaUltimaActuacion: nuevaActuacion.fecha
      };
      
      onUpdateCaso && onUpdateCaso(casoActualizado);
      setNewActuacion('');
      setIsAddingActuacion(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl">{caso.numero}</DialogTitle>
                <DialogDescription>Detalles completos del caso legal</DialogDescription>
              </div>
              <div className="flex gap-2">
                {isAdmin && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#6D0111] text-[#6D0111] hover:bg-[#6D0111] hover:text-white"
                    onClick={() => {
                      setEditedCaso(caso);
                      setIsEditingCaso(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Caso
                  </Button>
                )}
                <Badge className={`${estadoColors[caso.estado]} text-white`}>
                  {caso.estado}
                </Badge>
                <Badge className={`${prioridadColors[caso.prioridad]} text-white uppercase`}>
                  Prioridad {caso.prioridad}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {/* Información General */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#6D0111]" />
                  Información General
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Demandante</Label>
                    <p className="mt-1">{caso.demandante}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Demandado</Label>
                    <p className="mt-1">{caso.demandado}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Cliente</Label>
                    <p className="mt-1">{caso.cliente}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Tipo de Caso</Label>
                    <p className="mt-1">{caso.tipo}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Número de Proceso</Label>
                    <p className="mt-1">{caso.numeroProceso}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Fecha de Inicio</Label>
                    <p className="mt-1 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(caso.fecha).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="text-gray-600">Descripción</Label>
                  <p className="mt-1 text-gray-700">{caso.descripcion}</p>
                </div>
              </CardContent>
            </Card>

            {/* Estado del Caso */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg flex items-center gap-2 text-blue-900">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                    Estado del Caso
                  </h3>
                  {isAdmin && !isEditingEstado && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-100"
                      onClick={() => setIsEditingEstado(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Cambiar Estado
                    </Button>
                  )}
                </div>

                {isEditingEstado ? (
                  <div className="space-y-3 bg-white p-4 rounded-lg">
                    <Label>Seleccione el nuevo estado</Label>
                    <Select value={estadoEdit} onValueChange={(value: any) => setEstadoEdit(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVO">ACTIVO</SelectItem>
                        <SelectItem value="PENDIENTE">PENDIENTE</SelectItem>
                        <SelectItem value="CERRADO">CERRADO</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-[#6D0111] hover:bg-[#5A0010] text-white"
                        onClick={handleUpdateEstado}
                      >
                        Guardar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEstadoEdit(caso.estado);
                          setIsEditingEstado(false);
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Badge className={`${estadoColors[caso.estado]} text-white text-base px-4 py-2`}>
                        {caso.estado}
                      </Badge>
                      <span className="text-gray-600 text-sm">Estado actual del proceso</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Última Actuación */}
            {caso.ultimaActuacion && (
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-6">
                  <h3 className="mb-3 text-lg flex items-center gap-2 text-amber-900">
                    <Clock className="h-5 w-5 text-amber-600" />
                    Última Actuación
                  </h3>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-gray-700">{caso.ultimaActuacion}</p>
                      <span className="text-sm text-gray-500">
                        {caso.fechaUltimaActuacion ? new Date(caso.fechaUltimaActuacion).toLocaleDateString('es-ES') : ''}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actuaciones */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#6D0111]" />
                    Historial de Actuaciones
                  </h3>
                  {isAdmin && (
                    <Button
                      size="sm"
                      className="bg-[#6D0111] hover:bg-[#5A0010] text-white"
                      onClick={() => setIsAddingActuacion(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Actuación
                    </Button>
                  )}
                </div>

                {isAddingActuacion && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
                    <Label>Nueva Actuación</Label>
                    <Textarea
                      placeholder="Describa la actuación realizada..."
                      value={newActuacion}
                      onChange={(e) => setNewActuacion(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        className="bg-[#6D0111] hover:bg-[#5A0010] text-white"
                        onClick={handleAddActuacion}
                      >
                        Guardar
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setNewActuacion('');
                          setIsAddingActuacion(false);
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {caso.actuaciones && caso.actuaciones.length > 0 ? (
                    caso.actuaciones.map((actuacion) => (
                      <div key={actuacion.id} className="border-l-4 border-[#6D0111] pl-4 py-3 bg-gray-50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-gray-700">{actuacion.descripcion}</p>
                          <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                            {new Date(actuacion.fecha).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <User className="h-3 w-3" />
                          <span>Agregado por: {actuacion.agregadoPor}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No hay actuaciones registradas aún</p>
                      {isAdmin && <p className="text-sm">Agregue la primera actuación usando el botón superior</p>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {!isAdmin && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Nota:</strong> Este caso está siendo gestionado por nuestro equipo legal. 
                    Las actuaciones son agregadas por los administradores a medida que se realizan avances en su proceso.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Edición de Caso */}
      <Dialog open={isEditingCaso} onOpenChange={setIsEditingCaso}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Caso</DialogTitle>
            <DialogDescription>
              Modificar la información del caso {caso.numero}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdateCaso} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-numero">Número de Caso *</Label>
                <Input
                  id="edit-numero"
                  value={editedCaso.numero}
                  onChange={(e) => setEditedCaso({ ...editedCaso, numero: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-numeroProceso">Número de Proceso *</Label>
                <Input
                  id="edit-numeroProceso"
                  value={editedCaso.numeroProceso}
                  onChange={(e) => setEditedCaso({ ...editedCaso, numeroProceso: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-demandante">Demandante *</Label>
                <Input
                  id="edit-demandante"
                  value={editedCaso.demandante}
                  onChange={(e) => setEditedCaso({ ...editedCaso, demandante: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-demandado">Demandado *</Label>
                <Input
                  id="edit-demandado"
                  value={editedCaso.demandado}
                  onChange={(e) => setEditedCaso({ ...editedCaso, demandado: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-cliente">Cliente *</Label>
                <Input
                  id="edit-cliente"
                  value={editedCaso.cliente}
                  onChange={(e) => setEditedCaso({ ...editedCaso, cliente: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-tipo">Tipo de Caso *</Label>
                <Select
                  value={editedCaso.tipo}
                  onValueChange={(value) => setEditedCaso({ ...editedCaso, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Derecho Laboral">Derecho Laboral</SelectItem>
                    <SelectItem value="Derecho Penal Derivado de Pólizas">Derecho Penal Derivado de Pólizas</SelectItem>
                    <SelectItem value="Derecho Civil">Derecho Civil</SelectItem>
                    <SelectItem value="Derecho Comercial">Derecho Comercial</SelectItem>
                    <SelectItem value="Derecho Familia">Derecho Familia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-estado">Estado *</Label>
                <Select
                  value={editedCaso.estado}
                  onValueChange={(value: any) => setEditedCaso({ ...editedCaso, estado: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVO">ACTIVO</SelectItem>
                    <SelectItem value="PENDIENTE">PENDIENTE</SelectItem>
                    <SelectItem value="CERRADO">CERRADO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-prioridad">Prioridad *</Label>
                <Select
                  value={editedCaso.prioridad}
                  onValueChange={(value: any) => setEditedCaso({ ...editedCaso, prioridad: value })}
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

              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-fecha">Fecha de Inicio</Label>
                <Input
                  id="edit-fecha"
                  type="date"
                  value={editedCaso.fecha}
                  onChange={(e) => setEditedCaso({ ...editedCaso, fecha: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-descripcion">Descripción</Label>
                <Textarea
                  id="edit-descripcion"
                  value={editedCaso.descripcion}
                  onChange={(e) => setEditedCaso({ ...editedCaso, descripcion: e.target.value })}
                  rows={4}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditingCaso(false);
                  setEditedCaso(caso);
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
        </DialogContent>
      </Dialog>
    </>
  );
}