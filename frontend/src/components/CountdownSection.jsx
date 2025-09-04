import React, { useState, useEffect } from 'react';
import { Clock, Heart, Calendar } from 'lucide-react';

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const weddingDate = new Date('2026-02-07T16:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };

      if (difference > 0) {
        setTimeLeft(timeLeft);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Días', value: timeLeft.days || 0, color: 'from-blue-500 to-blue-600' },
    { label: 'Horas', value: timeLeft.hours || 0, color: 'from-green-500 to-green-600' },
    { label: 'Minutos', value: timeLeft.minutes || 0, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Segundos', value: timeLeft.seconds || 0, color: 'from-red-500 to-red-600' }
  ];

  return (
    <section className="relative py-32 overflow-hidden" id="countdown" style={{ backgroundColor: '#9ca06e' }}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10-10c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Clock className="absolute top-20 left-20 w-5 h-5 text-white/10 animate-pulse" />
        <Heart className="absolute top-40 right-32 w-4 h-4 text-white/10 animate-pulse fill-white/10" />
        <Calendar className="absolute bottom-40 left-32 w-6 h-6 text-white/10 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/10 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-20 transition-all duration-1500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Decorative Icon */}
            <div className="relative inline-block mb-12">
              <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full"></div>
              <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border border-white/30">
                <Clock className="w-10 h-10 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400/80 to-rose-500/80 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-extralight text-white mb-8 tracking-[0.15em]">
              Countdown
            </h2>
            
            {/* Decorative Elements */}
            <div className="flex items-center justify-center space-x-8 mb-10">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/60"></div>
              <Clock className="w-6 h-6 text-white/70" />
              <div className="w-32 h-px bg-gradient-to-r from-white/60 via-white/80 to-white/60"></div>
              <Clock className="w-6 h-6 text-white/70" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/60"></div>
            </div>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              El tiempo vuela cuando estás enamorado. ¡Mira cuánto falta para nuestro gran día!
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {timeUnits.map((unit, index) => (
              <div 
                key={unit.label}
                className={`group relative transition-all duration-700 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/30 hover:scale-105 transition-all duration-500 overflow-hidden">
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Number */}
                    <div className={`text-4xl md:text-6xl font-light text-gray-800 mb-3 transition-all duration-500 group-hover:scale-110`}>
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm md:text-base text-gray-600 font-medium tracking-wide uppercase">
                      {unit.label}
                    </div>
                    
                    {/* Decorative Line */}
                    <div className={`w-12 h-0.5 bg-gradient-to-r ${unit.color} mx-auto mt-4 opacity-70`}></div>
                  </div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-gray-300 opacity-30"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-gray-300 opacity-30"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Message */}
          <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 inline-block border border-white/20">
              <p className="text-white/90 text-lg font-light">
                ¡Cada segundo nos acerca más a nuestro día especial! 💕
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;