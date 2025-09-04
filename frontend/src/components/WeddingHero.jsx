import React, { useEffect, useState } from 'react';
import { weddingData } from '../mock';

const WeddingHero = () => {
  const { couple, venue } = weddingData;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="wedding" className="relative min-h-screen flex items-end justify-center overflow-hidden">
      {/* Hero Background Image - Adjusted for mobile to show both subjects */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://customer-assets.emergentagent.com/job_boda-especial/artifacts/jp8noucl_Header.JPG"
          alt="Axel y Dani - Pareja"
          className="w-full h-full object-cover object-center md:object-center"
          style={{
            objectPosition: 'center center'
          }}
        />
        {/* Sophisticated Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Floating Elements */}
        <div className="absolute top-20 left-20 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-32 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-ping delay-700"></div>
        
        {/* Geometric Decorations */}
        <div className="absolute top-24 right-24 w-8 h-8 border border-white/10 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-24 left-24 w-6 h-6 border border-white/10 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Names - Clean, no decorative elements */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-4 z-20 text-center text-white transition-all duration-1500 ease-out ${
        isLoaded ? 'translate-y-4 opacity-100' : 'translate-y-14 opacity-0'
      }`}>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extralight tracking-[0.2em] mb-2 px-4">
          {couple.groom} & {couple.bride}
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl font-light mt-4 opacity-90 tracking-widest px-4">
          {couple.weddingDate}
        </p>
      </div>

      {/* Enhanced Venue info - positioned bottom left, responsive */}
      <div className={`absolute bottom-8 left-4 md:left-8 z-20 text-white transition-all duration-1000 ease-out delay-300 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="bg-black/20 backdrop-blur-md p-3 md:p-4 border border-white/10">
          <p className="text-xs sm:text-sm md:text-base font-light opacity-90 tracking-wide">
            Finca San Gabriel, La Cañada
          </p>
          <p className="text-xs sm:text-sm md:text-base font-light opacity-80">
            Estado de México
          </p>
        </div>
      </div>

      {/* Enhanced RSVP button - positioned bottom right, responsive */}
      <div className={`absolute bottom-8 right-4 md:right-8 z-20 transition-all duration-1000 ease-out delay-500 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <button 
          onClick={() => document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' })}
          className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 md:px-8 py-2 md:py-3 text-sm md:text-base font-medium tracking-widest uppercase transition-all duration-500 hover:scale-105 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span className="relative z-10">RSVP</span>
        </button>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce opacity-70">
        <div className="flex flex-col items-center">
          <div className="w-5 h-8 border border-white/40 flex justify-center mb-2">
            <div className="w-0.5 h-2 bg-white/60 mt-1.5 animate-pulse"></div>
          </div>
          <div className="text-xs tracking-widest opacity-60">SCROLL</div>
        </div>
      </div>
    </section>
  );
};

export default WeddingHero;