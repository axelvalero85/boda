import React, { useState } from 'react';
import { Check, Users, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { saveRSVP, weddingData } from '../mock';

const RSVPSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: '',
    guests: '1',
    guestNames: '',
    allergies: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.attendance) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await saveRSVP(formData);
      toast({
        title: "¡RSVP Enviado!",
        description: "Gracias por confirmar tu asistencia. ¡Te esperamos!",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        attendance: '',
        guests: '1',
        guestNames: '',
        allergies: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu respuesta. Intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
              Confirma tu Asistencia
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tu presencia hará de nuestro día aún más especial. Por favor confirma tu asistencia 
              antes del <span className="font-medium text-gray-800">{weddingData.rsvp.deadline}</span>
            </p>
          </div>

          {/* RSVP Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nombre Completo *</label>
                  <Input
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email *</label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Teléfono</label>
                  <Input
                    placeholder="Tu número de teléfono"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">¿Asistirás? *</label>
                  <Select onValueChange={(value) => handleInputChange('attendance', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="si">Sí, asistiré</SelectItem>
                      <SelectItem value="no">No podré asistir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.attendance === 'si' && (
                <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Número de invitados</label>
                      <Select onValueChange={(value) => handleInputChange('guests', value)} defaultValue="1">
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Solo yo</SelectItem>
                          <SelectItem value="2">2 personas</SelectItem>
                          <SelectItem value="3">3 personas</SelectItem>
                          <SelectItem value="4">4 personas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {parseInt(formData.guests) > 1 && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nombres de acompañantes</label>
                        <Input
                          placeholder="Nombres de tus invitados"
                          value={formData.guestNames}
                          onChange={(e) => handleInputChange('guestNames', e.target.value)}
                          className="h-12"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Alergias o restricciones alimentarias</label>
                    <Input
                      placeholder="Menciona cualquier alergia o restricción"
                      value={formData.allergies}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mensaje especial (opcional)</label>
                <Textarea
                  placeholder="Comparte un mensaje especial para los novios..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="min-h-24"
                />
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gray-800 hover:bg-gray-900 text-white text-lg font-medium tracking-wide transition-colors duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      Confirmar Asistencia
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;