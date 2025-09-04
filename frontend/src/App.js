import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import WeddingHero from './components/WeddingHero';
import RSVPSection from './components/RSVPSection';
import PhotoGallery from './components/PhotoGallery';
import { Toaster } from './components/ui/toaster';
import { Gift, MapPin, Clock } from 'lucide-react';
import { weddingData } from './mock';

const GiftSection = () => {
  const { giftRegistry } = weddingData;
  
  return (
    <section id="gifts" className="py-20 bg-green-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Simple Header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-extralight text-green-900 mb-6 tracking-wide">
              Mesa de Regalos
            </h2>
            <div className="w-24 h-px bg-green-600 mx-auto mb-8"></div>
          </div>

          {/* Message Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-12 mb-12 shadow-lg border border-green-200">
            <p className="text-lg text-green-800 mb-8 leading-relaxed max-w-2xl mx-auto">
              {giftRegistry.message}
            </p>
            
            <a
              href={giftRegistry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 border-2 border-green-800 text-green-800 text-lg font-medium tracking-wide uppercase hover:bg-green-800 hover:text-white transition-all duration-300"
            >
              <div className="flex items-center justify-center space-x-3">
                <Gift className="w-5 h-5" />
                <span>Ver Mesa de Regalos</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const VenueSection = () => {
  const { venue, timeline } = weddingData;
  
  return (
    <section id="venue" className="py-20 bg-amber-100">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extralight text-amber-900 mb-6 tracking-wide">
              Detalles del Evento
            </h2>
            <div className="w-24 h-px bg-amber-600 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Venue Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-amber-200">
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 text-amber-700 mr-3" />
                <h3 className="text-2xl font-light text-amber-900">Ubicación</h3>
              </div>
              
              <div className="space-y-3">
                <p className="text-xl text-amber-800 font-medium">{venue.name}</p>
                <p className="text-amber-700">{venue.address}</p>
                <p className="text-amber-700 italic">{venue.description}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-amber-200">
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-amber-700 mr-3" />
                <h3 className="text-2xl font-light text-amber-900">Cronograma</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { event: 'Ceremonia', time: timeline.ceremony },
                  { event: 'Cóctel', time: timeline.cocktail },
                  { event: 'Recepción', time: timeline.reception },
                  { event: 'Fiesta', time: timeline.party }
                ].map((item, index) => (
                  <div key={item.event} className="flex justify-between items-center py-2 border-b border-amber-200 last:border-b-0">
                    <span className="text-amber-700">{item.event}</span>
                    <span className="font-medium text-amber-800">{item.time}</span>
                  </div>
                ))}
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
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-light mb-2 tracking-wide">
            {couple.groom} & {couple.bride}
          </h3>
          <p className="text-gray-400 mb-8">{couple.weddingDate}</p>
          <div className="w-24 h-px bg-gray-600 mx-auto mb-6"></div>
          <p className="text-gray-400 leading-relaxed">
            Gracias por ser parte de nuestro día especial
          </p>
        </div>
      </div>
    </footer>
  );
};

const WeddingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <WeddingHero />
      <PhotoGallery />
      <VenueSection />
      <GiftSection />
      <RSVPSection />
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