import React, { useState, useEffect } from 'react';

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
    { label: 'Días', value: timeLeft.days || 0 },
    { label: 'Horas', value: timeLeft.hours || 0 },
    { label: 'Minutos', value: timeLeft.minutes || 0 },
    { label: 'Segundos', value: timeLeft.seconds || 0 }
  ];

  return (
    <section className="relative py-32 overflow-hidden" id="countdown" style={{ backgroundColor: '#d6d6c6' }}>
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10-10c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-20 transition-all duration-1500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-800 mb-8 tracking-[0.15em]">
              Countdown
            </h2>
            
            {/* Decorative Elements */}
            <div className="flex items-center justify-center space-x-8 mb-10">
              <div className="w-16 h-px bg-gray-400"></div>
              <div className="w-32 h-px bg-gray-400"></div>
              <div className="w-16 h-px bg-gray-400"></div>
            </div>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
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
                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-300 hover:scale-105 transition-all duration-500 overflow-hidden">
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Number */}
                    <div className="text-4xl md:text-6xl font-light text-gray-800 mb-3 transition-all duration-500 group-hover:scale-110">
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm md:text-base text-gray-600 font-medium tracking-wide uppercase">
                      {unit.label}
                    </div>
                    
                    {/* Decorative Line */}
                    <div className="w-12 h-0.5 bg-gray-400 mx-auto mt-4"></div>
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
            <div className="bg-white/60 backdrop-blur-sm rounded-full px-8 py-4 inline-block border border-gray-300">
              <p className="text-gray-800 text-lg font-light">
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