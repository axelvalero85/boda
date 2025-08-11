import React, { useEffect, useState } from 'react';
import { weddingData } from '../mock';

const WeddingHero = () => {
  const { couple, venue } = weddingData;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="wedding" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1656103743142-229f0adaf068?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwb3V0ZG9vcnxlbnwwfHx8fDE3NTQ5MzIxOTh8MA&ixlib=rb-4.1.0&q=85"
          alt="Axel y Dani - Pareja"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className={`relative z-20 text-center text-white max-w-4xl mx-auto px-8 transition-all duration-1000 ease-out ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Names */}
        <h1 className="text-6xl md:text-8xl font-extralight mb-8 tracking-wider">
          {couple.groom} & {couple.bride}
        </h1>
        
        {/* Wedding Details */}
        <div className="mb-12 space-y-2">
          <p className="text-xl md:text-2xl font-light tracking-wide">
            {couple.weddingDate}
          </p>
          <p className="text-lg md:text-xl font-light opacity-90">
            {venue.name}, {venue.address}
          </p>
        </div>
        
        {/* CTA Button */}
        <button 
          onClick={() => document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' })}
          className="px-12 py-4 border-2 border-white text-white text-lg font-medium tracking-wide uppercase hover:bg-white hover:text-gray-800 transition-all duration-300 hover:scale-105"
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