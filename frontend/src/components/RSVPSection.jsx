import React, { useState } from 'react';
import { Check, Users, Mail, Phone, Star, Sparkles } from 'lucide-react';
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
    <section id="rsvp" className="relative py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.05'%3E%3Cpath d='M50 50c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm-20 0c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm-20 0c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <Star className="absolute top-20 left-20 w-4 h-4 text-gray-300 animate-pulse" />
        <Sparkles className="absolute top-40 right-32 w-6 h-6 text-gray-200 animate-ping" />
        <Star className="absolute bottom-40 left-40 w-3 h-3 text-gray-300 animate-pulse delay-300" />
        <div className="absolute top-60 right-1/4 w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Elegant Header */}
          <div className="text-center mb-20 relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/30 to-transparent blur-3xl"></div>
            
            <div className="relative">
              <div className="inline-flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                    <Users className="w-8 h-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-extralight text-gray-800 mb-6 tracking-wide">
                Confirma tu
                <span className="block text-6xl md:text-8xl bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent font-light">
                  Asistencia
                </span>
              </h2>
              
              {/* Decorative Elements */}
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-400"></div>
                <div className="w-4 h-4 border-2 border-gray-400 rotate-45 bg-white"></div>
                <div className="w-24 h-0.5 bg-gradient-to-r from-gray-400 to-gray-500"></div>
                <div className="w-4 h-4 border-2 border-gray-400 rotate-45 bg-white"></div>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-gray-400"></div>
              </div>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Tu presencia hará de nuestro día aún más especial. Por favor confirma tu asistencia 
                antes del <span className="font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">{weddingData.rsvp.deadline}</span>
              </p>
            </div>
          </div>

          {/* Premium Form Container */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl overflow-hidden relative">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-gray-100/10"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-200/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gray-300/15 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10 p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Primary Info Row */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 block">
                        Nombre Completo *
                      </label>
                      <div className="relative">
                        <Input
                          placeholder="Tu nombre completo"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="h-14 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-lg transition-all duration-300 focus:border-gray-400 focus:bg-white/70 focus:shadow-lg pl-4"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/0 via-gray-100/20 to-gray-100/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 block">
                        Email *
                      </label>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="h-14 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-lg transition-all duration-300 focus:border-gray-400 focus:bg-white/70 focus:shadow-lg pl-4"
                        />
                        <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Secondary Info Row */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 block">
                        Teléfono
                      </label>
                      <div className="relative">
                        <Input
                          placeholder="Tu número de teléfono"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="h-14 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-lg transition-all duration-300 focus:border-gray-400 focus:bg-white/70 focus:shadow-lg pl-4"
                        />
                        <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="group">
                      <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 block">
                        ¿Asistirás? *
                      </label>
                      <Select onValueChange={(value) => handleInputChange('attendance', value)}>
                        <SelectTrigger className="h-14 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-lg transition-all duration-300 focus:border-gray-400 focus:bg-white/70 focus:shadow-lg">
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-xl">
                          <SelectItem value="si" className="text-lg py-3 hover:bg-gray-50">Sí, asistiré</SelectItem>
                          <SelectItem value="no" className="text-lg py-3 hover:bg-gray-50">No podré asistir</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Guest Details (Conditional) */}
                  {formData.attendance === 'si' && (
                    <div className="bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/30 space-y-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">¡Excelente! Detalles adicionales</h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="group">
                          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 block">
                            Número de invitados
                          </label>
                          <Select onValueChange={(value) => handleInputChange('guests', value)} defaultValue="1">
                            <SelectTrigger className="h-12 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl">
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
                          <div className="group">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 block">
                              Nombres de acompañantes
                            </label>
                            <Input
                              placeholder="Nombres de tus invitados"
                              value={formData.guestNames}
                              onChange={(e) => handleInputChange('guestNames', e.target.value)}
                              className="h-12 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl"
                            />
                          </div>
                        )}
                      </div>

                      <div className="group">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 block">
                          Alergias o restricciones alimentarias
                        </label>
                        <Input
                          placeholder="Menciona cualquier alergia o restricción"
                          value={formData.allergies}
                          onChange={(e) => handleInputChange('allergies', e.target.value)}
                          className="h-12 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl"
                        />
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  <div className="group">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 block">
                      Mensaje especial (opcional)
                    </label>
                    <div className="relative">
                      <Textarea
                        placeholder="Comparte un mensaje especial para los novios..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="min-h-32 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-lg transition-all duration-300 focus:border-gray-400 focus:bg-white/70 focus:shadow-lg p-4 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full h-16 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-black text-white text-xl font-medium tracking-wide transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-gray-500/30 border-0 rounded-2xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-3">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Enviando...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-3 relative z-10">
                          <Check className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                          <span>Confirmar Asistencia</span>
                          <div className="w-3 h-3 bg-white rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;