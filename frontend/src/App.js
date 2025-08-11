import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeddingHero from './components/WeddingHero';
import RSVPSection from './components/RSVPSection';
import PhotoGallery from './components/PhotoGallery';
import { Toaster } from './components/ui/toaster';
import { Gift, MapPin, Clock, Star, Sparkles, Heart } from 'lucide-react';
import { weddingData } from './mock';

const GiftSection = () => {
  const { giftRegistry } = weddingData;
  
  return (
    <section className="relative py-32 bg-gradient-to-br from-white via-slate-50 to-gray-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.04'%3E%3Cpath d='M60 60c16.569 0 30-13.431 30-30S76.569 0 60 0 30 13.431 30 30s13.431 30 30 30zm0-10c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <Gift className="absolute top-20 left-20 w-6 h-6 text-emerald-200 animate-pulse" />
        <Star className="absolute top-40 right-32 w-5 h-5 text-yellow-200 animate-ping fill-yellow-200" />
        <Sparkles className="absolute bottom-40 left-40 w-7 h-7 text-blue-200 animate-pulse" />
        <Heart className="absolute bottom-32 right-24 w-5 h-5 text-pink-200 animate-pulse fill-pink-200" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Elegant Header */}
          <div className="mb-16">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                  <Gift className="w-10 h-10 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-800 mb-6 tracking-wide">
              Mesa de
              <span className="block text-6xl md:text-8xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent font-light">
                Regalos
              </span>
            </h2>
            
            {/* Decorative Elements */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-emerald-300"></div>
              <Gift className="w-5 h-5 text-emerald-500" />
              <div className="w-32 h-0.5 bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-300"></div>
              <Gift className="w-5 h-5 text-emerald-500" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-emerald-300"></div>
            </div>
          </div>

          {/* Message Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-12 mb-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-green-50/30"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                {giftRegistry.message}
              </p>
              
              <a
                href={giftRegistry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white px-12 py-6 text-xl font-medium tracking-wide overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-emerald-500/25 rounded-2xl border border-emerald-600/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/50 to-transparent group-hover:from-emerald-400/50"></div>
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <Gift className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span>Ver Mesa de Regalos</span>
                  <div className="w-3 h-3 bg-white rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VenueSection = () => {
  const { venue, timeline } = weddingData;
  
  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.04'%3E%3Cpath d='M50 50L25 25v50h50V25L50 50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <MapPin className="absolute top-24 left-24 w-6 h-6 text-blue-200 animate-pulse" />
        <Clock className="absolute top-32 right-32 w-5 h-5 text-purple-200 animate-ping" />
        <Star className="absolute bottom-40 left-32 w-4 h-4 text-amber-200 animate-pulse fill-amber-200" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                  <MapPin className="w-10 h-10 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-800 mb-6 tracking-wide">
              Información del
              <span className="block text-6xl md:text-8xl bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 bg-clip-text text-transparent font-light">
                Evento
              </span>
            </h2>
            
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-300"></div>
              <MapPin className="w-5 h-5 text-blue-500" />
              <div className="w-32 h-0.5 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300"></div>
              <Clock className="w-5 h-5 text-purple-500" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-300"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Venue Info */}
            <div className="group bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 relative overflow-hidden hover:shadow-3xl transition-all duration-500">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-sky-50/30"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sky-200/15 to-transparent rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-light text-gray-800">Lugar</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-2xl text-gray-800 font-medium">{venue.name}</p>
                  <p className="text-gray-600 text-lg">{venue.address}</p>
                  <p className="text-gray-600 italic leading-relaxed">{venue.description}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="group bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 relative overflow-hidden hover:shadow-3xl transition-all duration-500">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/30"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200/15 to-transparent rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-light text-gray-800">Cronograma</h3>
                </div>
                
                <div className="space-y-6">
                  {[
                    { event: 'Ceremonia', time: timeline.ceremony },
                    { event: 'Cóctel', time: timeline.cocktail },
                    { event: 'Recepción', time: timeline.reception },
                    { event: 'Fiesta', time: timeline.party }
                  ].map((item, index) => (
                    <div key={item.event} className="flex justify-between items-center py-3 border-b border-gray-200/50 group-hover:border-gray-300/70 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"></div>
                        <span className="text-gray-700 text-lg">{item.event}</span>
                      </div>
                      <span className="font-semibold text-gray-800 text-lg bg-gray-100/50 px-4 py-1 rounded-full">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { couple } = weddingData;
  
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zM10 30c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden">
        <Heart className="absolute top-12 left-20 w-4 h-4 text-white/10 animate-pulse fill-white/10" />
        <Heart className="absolute top-32 right-32 w-3 h-3 text-white/10 animate-pulse fill-white/10" />
        <Heart className="absolute bottom-20 left-40 w-5 h-5 text-white/10 animate-pulse fill-white/10" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Heart className="w-8 h-8 text-white/70 fill-white/70" />
              </div>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">
              {couple.groom} 
              <span className="mx-4 text-white/50">&</span> 
              {couple.bride}
            </h3>
            <p className="text-white/70 text-xl mb-8">{couple.weddingDate}</p>
            
            {/* Decorative Line */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/30"></div>
              <div className="w-2 h-2 bg-white/30 rounded-full"></div>
              <div className="w-32 h-px bg-gradient-to-r from-white/30 via-white/50 to-white/30"></div>
              <div className="w-2 h-2 bg-white/30 rounded-full"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/30"></div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-white/80 text-lg leading-relaxed">
              Gracias por ser parte de nuestro día especial. Tu presencia y amor hacen que este momento sea aún más memorable.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-2">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-pulse" />
                <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse delay-200" />
                <Heart className="w-5 h-5 text-red-400 fill-red-400 animate-pulse delay-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WeddingPage = () => {
  return (
    <div className="min-h-screen">
      <WeddingHero />
      <RSVPSection />
      <PhotoGallery />
      <GiftSection />
      <VenueSection />
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeddingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;