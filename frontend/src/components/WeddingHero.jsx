import React, { useEffect, useState } from 'react';
import { weddingData } from '../mock';

const WeddingHero = () => {
  const { couple, venue } = weddingData;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="wedding" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://customer-assets.emergentagent.com/job_boda-especial/artifacts/wjw341lu_b7a4541b-5ad6-43df-9945-69d829a0e463.JPG"
          alt="Axel y Dani - Pareja"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content positioned to the left */}
      <div className={`relative z-20 text-white max-w-lg mx-auto md:mx-0 md:ml-16 px-8 md:px-0 transition-all duration-1000 ease-out ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Names */}
        <h1 className="text-5xl md:text-7xl font-extralight mb-6 tracking-wider leading-tight">
          {couple.groom} & {couple.bride}
        </h1>
        
        {/* Wedding Date */}
        <div className="mb-8 space-y-3">
          <p className="text-xl md:text-2xl font-light tracking-wide">
            {couple.weddingDate}
          </p>
          <p className="text-lg md:text-xl font-light opacity-90">
            {venue.name}
          </p>
          <p className="text-base md:text-lg font-light opacity-80">
            {venue.address}
          </p>
        </div>
        
        {/* CTA Button */}
        <button 
          onClick={() => document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' })}
          className="px-10 py-3 border-2 border-white text-white text-lg font-medium tracking-wide uppercase hover:bg-white hover:text-gray-800 transition-all duration-300 hover:scale-105"
        >
          RSVP
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default WeddingHero;