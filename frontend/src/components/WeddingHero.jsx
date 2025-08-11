import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Heart, Sparkles } from 'lucide-react';
import { weddingData } from '../mock';

const WeddingHero = () => {
  const { couple, venue } = weddingData;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-gray-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-gray-400 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Glass Morphism Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-gray-100/20 backdrop-blur-sm"></div>
      
      {/* Main Content Container with Glass Effect */}
      <div className={`relative z-20 text-center max-w-6xl mx-auto px-8 transition-all duration-1500 ease-out ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Decorative Top Element */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent h-px top-1/2 transform -translate-y-1/2"></div>
          <div className="relative bg-gradient-to-br from-gray-600 to-gray-800 w-20 h-20 mx-auto rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20 backdrop-blur-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
            <Heart className="w-10 h-10 text-white fill-white drop-shadow-lg relative z-10" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-gray-400 animate-pulse" />
          </div>
        </div>
        
        {/* Names with Elegant Typography */}
        <div className="mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/5 to-transparent blur-xl"></div>
          <h1 className="relative text-7xl md:text-9xl font-extralight text-gray-800 mb-6 tracking-widest">
            <span className="inline-block transform transition-all duration-700 hover:scale-105 cursor-default">
              {couple.groom}
            </span>
            <span className="mx-8 text-gray-300 font-thin relative">
              &
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400/0 via-gray-400/20 to-gray-400/0 blur-sm"></div>
            </span>
            <span className="inline-block transform transition-all duration-700 hover:scale-105 cursor-default">
              {couple.bride}
            </span>
          </h1>
          
          {/* Decorative Lines */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-400"></div>
            <div className="w-3 h-3 border-2 border-gray-400 rotate-45"></div>
            <div className="w-32 h-px bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400"></div>
            <div className="w-3 h-3 border-2 border-gray-400 rotate-45"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-400"></div>
          </div>
        </div>
        
        {/* Wedding Details Card */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-12 mb-16 mx-auto max-w-3xl relative overflow-hidden">
          {/* Card Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-gray-100/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-300/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-400/10 to-transparent rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            {/* Wedding Date */}
            <div className="mb-10">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em] border-b border-gray-300 pb-1">Nos Casamos</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-3 tracking-wide">
                {couple.weddingDate}
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
            </div>
            
            {/* Venue */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em] border-b border-gray-300 pb-1">Lugar</span>
                </div>
              </div>
              <p className="text-2xl text-gray-800 font-light mb-2">
                {venue.name}
              </p>
              <p className="text-gray-600 text-lg">
                {venue.address}
              </p>
            </div>
          </div>
        </div>
        
        {/* Elegant CTA Button */}
        <div className="relative">
          <button 
            onClick={() => document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white px-16 py-6 text-xl font-medium tracking-[0.1em] uppercase overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-gray-500/25 border border-gray-600/20"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/50 to-transparent group-hover:from-gray-500/50"></div>
            <span className="relative z-10 flex items-center justify-center space-x-3">
              <span>Confirma tu Asistencia</span>
              <div className="w-2 h-2 bg-white rounded-full group-hover:scale-125 transition-transform duration-300"></div>
            </span>
          </button>
        </div>
      </div>
      
      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Descubre más</div>
        </div>
      </div>
    </section>
  );
};

export default WeddingHero;