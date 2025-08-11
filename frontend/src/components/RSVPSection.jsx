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
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await saveRSVP(formData);
      toast({
        title: "RSVP Sent!",
        description: "Thank you for confirming your attendance!",
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
        description: "There was a problem sending your response.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Simple Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extralight text-gray-800 mb-6 tracking-wide">
              Please Join Us
            </h2>
            <div className="w-24 h-px bg-gray-400 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your presence will make our day even more special. Please confirm your attendance 
              before <span className="font-medium text-gray-800">{weddingData.rsvp.deadline}</span>
            </p>
          </div>

          {/* Clean Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="h-12 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    />
                  </div>
                </div>

                {/* Phone and Attendance */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <Input
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="h-12 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Will you attend? *
                    </label>
                    <Select onValueChange={(value) => handleInputChange('attendance', value)}>
                      <SelectTrigger className="h-12 border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                        <SelectValue placeholder="Please select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="si">Yes, I'll be there</SelectItem>
                        <SelectItem value="no">Sorry, can't make it</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Guest Details (if attending) */}
                {formData.attendance === 'si' && (
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Details</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of guests
                        </label>
                        <Select onValueChange={(value) => handleInputChange('guests', value)} defaultValue="1">
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Just me</SelectItem>
                            <SelectItem value="2">2 people</SelectItem>
                            <SelectItem value="3">3 people</SelectItem>
                            <SelectItem value="4">4 people</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {parseInt(formData.guests) > 1 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Guest names
                          </label>
                          <Input
                            placeholder="Names of your guests"
                            value={formData.guestNames}
                            onChange={(e) => handleInputChange('guestNames', e.target.value)}
                            className="h-12"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dietary restrictions or allergies
                      </label>
                      <Input
                        placeholder="Any allergies or dietary needs?"
                        value={formData.allergies}
                        onChange={(e) => handleInputChange('allergies', e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special message (optional)
                  </label>
                  <Textarea
                    placeholder="Share a special message for the couple..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="min-h-24 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gray-800 hover:bg-gray-900 text-white text-lg font-medium tracking-wide transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Check className="w-5 h-5 mr-2" />
                        Send RSVP
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