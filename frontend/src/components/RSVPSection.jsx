import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { saveRSVP, weddingData } from '../mock';
import { AnimatedSection, StaggeredAnimation } from './ScrollAnimations';

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
    transport: '',
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
        transport: '',
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
    <section id="rsvp" className="py-20" style={{ backgroundColor: '#ae9c8f' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header with Tonal-inspired animations */}
          <AnimatedSection className="text-center mb-16" animation="fade-up">
            <h2 className="text-4xl md:text-6xl font-extralight text-gray-800 mb-6 tracking-wide">
              Acompáñanos
            </h2>
            <div className="w-24 h-px bg-gray-400 mx-auto mb-8"></div>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#2e2e22' }}>
              Tu presencia hará de nuestro día aún más especial. Por favor confirma tu asistencia 
              antes del <span className="font-medium text-gray-800">{weddingData.rsvp.deadline}</span>
            </p>
          </AnimatedSection>

          {/* Enhanced Form with animations */}
          <AnimatedSection 
            className="max-w-2xl mx-auto" 
            animation="scale-up" 
            delay={200}
          >
            <div className="bg-white/95 backdrop-blur-sm shadow-lg p-10 border border-gray-300 hover:shadow-2xl transition-all duration-500 group">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <StaggeredAnimation 
                  className="grid md:grid-cols-2 gap-6"
                  staggerDelay={100}
                >
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e22' }}>
                      Nombre Completo *
                    </label>
                    <Input
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="h-12 border-gray-300 focus:border-gray-600 focus:ring-gray-600 transition-all duration-300 hover:border-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e22' }}>
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 border-gray-300 focus:border-gray-600 focus:ring-gray-600 transition-all duration-300 hover:border-gray-400"
                    />
                  </div>
                </StaggeredAnimation>

                {/* Phone and Attendance */}
                <StaggeredAnimation 
                  className="grid md:grid-cols-2 gap-6"
                  staggerDelay={100}
                >
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e22' }}>
                      Teléfono
                    </label>
                    <Input
                      placeholder="Tu número de teléfono"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="h-12 border-gray-300 focus:border-gray-600 focus:ring-gray-600 transition-all duration-300 hover:border-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e22' }}>
                      ¿Asistirás? *
                    </label>
                    <select
                      value={formData.attendance}
                      onChange={(e) => handleInputChange('attendance', e.target.value)}
                      className="h-12 w-full border border-gray-300 focus:border-gray-600 focus:ring-gray-600 transition-all duration-300 hover:border-gray-400 px-3 py-2 bg-white"
                      style={{ color: '#2e2e22' }}
                    >
                      <option value="" disabled>Por favor selecciona</option>
                      <option value="si">Sí, asistiré</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </div>
                </StaggeredAnimation>

                {/* Guest Details (if attending) */}
                {formData.attendance === 'si' && (
                  <AnimatedSection 
                    className="bg-gray-50 p-6 space-y-4 border border-gray-200" 
                    animation="fade-up"
                  >
                    <h3 className="text-lg font-medium mb-4" style={{ color: '#2e2e22' }}>Detalles Adicionales</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e22' }}>
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
                          <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e22' }}>
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
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e22' }}>
                        Alergias o restricciones alimentarias
                      </label>
                      <Input
                        placeholder="¿Alguna alergia o restricción alimentaria?"
                        value={formData.allergies}
                        onChange={(e) => handleInputChange('allergies', e.target.value)}
                        className="h-12"
                      />
                    </div>

                    {/* Transport Option */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e22' }}>
                        Servicio de Transporte
                      </label>
                      <div className="mb-3 p-3 bg-blue-50 border border-blue-200">
                        <p className="text-sm" style={{ color: '#2e2e22' }}>
                          Para tu comodidad, contaremos con servicios de camionetas desde algunos puntos de la ciudad hasta la locación y de regreso. Háznoslo saber si te gustaría utilizar este servicio.
                        </p>
                      </div>
                      <Select onValueChange={(value) => handleInputChange('transport', value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="¿Te interesa el servicio de transporte?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">Sí, me interesa el transporte</SelectItem>
                          <SelectItem value="no">No, tengo transporte propio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </AnimatedSection>
                )}

                {/* Message */}
                <AnimatedSection animation="fade-up" delay={300}>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e22' }}>
                    Mensaje especial (opcional)
                  </label>
                  <Textarea
                    placeholder="Comparte un mensaje especial para los novios..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="min-h-24 border-gray-300 focus:border-gray-600 focus:ring-gray-600 transition-all duration-300 hover:border-gray-400"
                  />
                </AnimatedSection>

                {/* Submit Button */}
                <AnimatedSection className="pt-6" animation="fade-up" delay={400}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-white text-lg font-medium tracking-wide transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#917955' }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) e.target.style.backgroundColor = '#7a6747';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) e.target.style.backgroundColor = '#917955';
                    }}
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
                </AnimatedSection>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;