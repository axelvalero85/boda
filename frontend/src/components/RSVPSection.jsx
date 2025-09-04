import React, { useState } from 'react';
import { Check } from 'lucide-react';
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
        description: "¡Gracias por confirmar tu asistencia!",
      });
      
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
        description: "Hubo un problema al enviar tu respuesta.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 bg-green-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Simple Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extralight text-green-900 mb-6 tracking-wide">
              Acompáñanos
            </h2>
            <div className="w-24 h-px bg-green-600 mx-auto mb-8"></div>
            <p className="text-lg text-green-800 max-w-2xl mx-auto leading-relaxed">
              Tu presencia hará de nuestro día aún más especial. Por favor confirma tu asistencia 
              antes del <span className="font-medium text-green-900">{weddingData.rsvp.deadline}</span>
            </p>
          </div>

          {/* Clean Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-10 border border-green-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-2">
                      Nombre Completo *
                    </label>
                    <Input
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="h-12 border-green-300 focus:border-green-600 focus:ring-green-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 border-green-300 focus:border-green-600 focus:ring-green-600"
                    />
                  </div>
                </div>

                {/* Phone and Attendance */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-2">
                      Teléfono
                    </label>
                    <Input
                      placeholder="Tu número de teléfono"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="h-12 border-green-300 focus:border-green-600 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-2">
                      ¿Asistirás? *
                    </label>
                    <Select onValueChange={(value) => handleInputChange('attendance', value)}>
                      <SelectTrigger className="h-12 border-green-300 focus:border-green-600 focus:ring-green-600">
                        <SelectValue placeholder="Por favor selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="si">Sí, asistiré</SelectItem>
                        <SelectItem value="no">No podré asistir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Guest Details (if attending) */}
                {formData.attendance === 'si' && (
                  <div className="bg-green-50 p-6 rounded-lg space-y-4">
                    <h3 className="text-lg font-medium text-green-800 mb-4">Detalles Adicionales</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-2">
                          Número de invitados
                        </label>
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
                        <div>
                          <label className="block text-sm font-medium text-green-700 mb-2">
                            Nombres de acompañantes
                          </label>
                          <Input
                            placeholder="Nombres de tus invitados"
                            value={formData.guestNames}
                            onChange={(e) => handleInputChange('guestNames', e.target.value)}
                            className="h-12"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        Alergias o restricciones alimentarias
                      </label>
                      <Input
                        placeholder="¿Alguna alergia o restricción alimentaria?"
                        value={formData.allergies}
                        onChange={(e) => handleInputChange('allergies', e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-2">
                    Mensaje especial (opcional)
                  </label>
                  <Textarea
                    placeholder="Comparte un mensaje especial para los novios..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="min-h-24 border-green-300 focus:border-green-600 focus:ring-green-600"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-green-800 hover:bg-green-900 text-white text-lg font-medium tracking-wide transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Check className="w-5 h-5 mr-2" />
                        Enviar RSVP
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;