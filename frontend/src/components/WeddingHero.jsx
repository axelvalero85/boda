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
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://customer-assets.emergentagent.com/job_boda-especial/artifacts/jp8noucl_Header.JPG"
          alt="Axel y Dani - Pareja"
          className="w-full h-full object-cover"
        />
        {/* Very subtle overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Names - positioned at shirt pocket height */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8 z-20 text-center text-white transition-all duration-1000 ease-out ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <h1 className="text-5xl md:text-7xl font-extralight tracking-wider">
          {couple.groom} & {couple.bride}
        </h1>
        <p className="text-lg md:text-xl font-light mt-2 opacity-90">
          {couple.weddingDate}
        </p>
      </div>

      {/* Venue info - positioned bottom left */}
      <div className={`absolute bottom-8 left-8 z-20 text-white transition-all duration-1000 ease-out delay-300 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <p className="text-sm md:text-base font-light opacity-80">
          Finca San Gabriel, La Cañada
        </p>
        <p className="text-sm md:text-base font-light opacity-80">
          Estado de México
        </p>
      </div>

      {/* RSVP button - positioned bottom right */}
      <div className={`absolute bottom-8 right-8 z-20 transition-all duration-1000 ease-out delay-500 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <button 
          onClick={() => document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-3 border-2 border-white text-white text-base font-medium tracking-wide uppercase hover:bg-white hover:text-gray-800 transition-all duration-300 hover:scale-105"
        >
          RSVP
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white animate-bounce opacity-60">
        <div className="w-5 h-8 border border-white rounded-full flex justify-center">
          <div className="w-0.5 h-2 bg-white rounded-full mt-1 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default WeddingHero;