import React from 'react';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { weddingData } from '../mock';

const WeddingHero = () => {
  const { couple, venue } = weddingData;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-gray-400 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-gray-400 rotate-12"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-gray-400 rounded-full"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Heart Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
        </div>
        
        {/* Names */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-light text-gray-800 mb-4 tracking-wider">
            {couple.groom}
            <span className="mx-6 text-gray-400">&</span>
            {couple.bride}
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
        </div>
        
        {/* Wedding Date */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Nos Casamos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-700 mb-2">
            {couple.weddingDate}
          </h2>
        </div>
        
        {/* Venue */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-2">
            <MapPin className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Lugar</span>
          </div>
          <p className="text-xl text-gray-700 font-light">
            {venue.name}
          </p>
          <p className="text-gray-600 mt-1">
            {venue.address}
          </p>
        </div>
        
        {/* CTA Button */}
        <div className="mt-12">
          <button 
            onClick={() => document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-12 py-4 text-lg font-medium tracking-wide hover:from-gray-800 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Confirma tu Asistencia
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent"></div>
      </div>
    </section>
  );
};

export default WeddingHero;