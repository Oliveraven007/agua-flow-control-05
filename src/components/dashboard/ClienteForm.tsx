
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, MapPin } from 'lucide-react';
import { Cliente } from '@/lib/database';
import LocationSelector from '@/components/common/LocationSelector';

interface ClienteFormProps {
  cliente?: Cliente | null;
  onSubmit: (cliente: any) => void;
  onCancel: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ cliente, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    descripcion: ''
  });
  const [showLocationSelector, setShowLocationSelector] = useState(false);

  useEffect(() => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        descripcion: cliente.descripcion || ''
      });
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDireccionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      direccion: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.direccion || !formData.telefono) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }

    onSubmit(formData);
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{cliente ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre Completo *</Label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez González"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección *</Label>
              <div className="relative flex gap-2">
                <Input
                  id="direccion"
                  name="direccion"
                  type="text"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Ej: Calle Principal #123, Cercado de Arequipa"
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLocationSelector(true)}
                  className="px-3"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                📍 Toca el ícono de ubicación para seleccionar desde el mapa
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: 555-0123"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción (Opcional)</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Ej: Cliente frecuente, prefiere entrega en la mañana..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {cliente ? 'Actualizar Cliente' : 'Registrar Cliente'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <LocationSelector
        isOpen={showLocationSelector}
        onClose={() => setShowLocationSelector(false)}
        onSelectLocation={handleDireccionChange}
        currentValue={formData.direccion}
      />
    </>
  );
};

export default ClienteForm;
