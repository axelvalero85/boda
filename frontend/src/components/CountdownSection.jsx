import React, { useState, useEffect } from 'react';
import { AnimatedSection, StaggeredAnimation } from './ScrollAnimations';
import { weddingData } from '../mock';

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const { logos } = weddingData;

  useEffect(() => {
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
    <section className="relative py-32 overflow-hidden" id="countdown" style={{ backgroundColor: '#ae9c8f' }}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header with Black Logo - Larger */}
          <AnimatedSection className="text-center mb-20" animation="fade-up">
            <div className="flex items-center justify-center mb-8">
              <img 
                src={logos.black} 
                alt="Axel & Dani Logo" 
                className="w-20 h-20 md:w-24 md:h-24 mr-6 opacity-90"
              />
              <h2 className="text-5xl md:text-7xl font-extralight text-gray-800 tracking-[0.15em]">
                Countdown
              </h2>
            </div>
            
            <p className="text-xl max-w-3xl mx-auto leading-relaxed font-light" style={{ color: '#2e2e22' }}>
              El tiempo vuela cuando estás enamorado. ¡Mira cuánto falta para nuestro gran día!
            </p>
          </AnimatedSection>

          {/* Countdown Timer with Staggered Animation */}
          <StaggeredAnimation 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            staggerDelay={150}
          >
            {timeUnits.map((unit) => (
              <div key={unit.label} className="group relative">
                <div className="relative bg-white/90 backdrop-blur-xl p-6 shadow-lg border border-gray-300 hover:scale-105 transition-all duration-500 overflow-hidden hover:shadow-2xl">
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Number */}
                    <div className="text-3xl md:text-4xl font-light mb-2 transition-all duration-500 group-hover:scale-110" style={{ color: '#2e2e22' }}>
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                    
                    {/* Label */}
                    <div className="text-xs md:text-sm font-medium tracking-wide uppercase" style={{ color: '#2e2e22' }}>
                      {unit.label}
                    </div>
                    
                    {/* Decorative Line */}
                    <div className="w-8 h-0.5 bg-gray-400 mx-auto mt-3 transition-all duration-300 group-hover:w-12"></div>
                  </div>
                  
                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-gray-300 opacity-30"></div>
                  <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-gray-300 opacity-30"></div>
                </div>
              </div>
            ))}
          </StaggeredAnimation>

          {/* Message with enhanced animation */}
          <AnimatedSection 
            className="text-center mt-16" 
            animation="fade-up" 
            delay={600}
          >
            <div className="bg-white/60 backdrop-blur-sm px-8 py-4 inline-block border border-gray-300 hover:bg-white/70 transition-all duration-300">
              <p className="text-lg font-light" style={{ color: '#2e2e22' }}>
                Ya casiiiiiiii!
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;