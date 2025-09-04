import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import WeddingHero from './components/WeddingHero';
import CountdownSection from './components/CountdownSection';
import RSVPSection from './components/RSVPSection';
import PhotoGallery from './components/PhotoGallery';
import EtiquetaSection from './components/EtiquetaSection';
import { Toaster } from './components/ui/toaster';
import { Gift, MapPin, Clock } from 'lucide-react';
import { weddingData } from './mock';

const GiftSection = () => {
  const { giftRegistry } = weddingData;
  
  return (
    <section id="gifts" className="py-20" style={{ backgroundColor: '#9ca06e' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Simple Header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              Mesa de Regalos
            </h2>
            <div className="w-24 h-px bg-white/60 mx-auto mb-8"></div>
          </div>

          {/* Message Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-12 mb-12 shadow-lg border border-white/20">
            <p className="text-lg text-gray-800 mb-8 leading-relaxed max-w-2xl mx-auto">
              {giftRegistry.message}
            </p>
            
            <a
              href={giftRegistry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 border-2 border-gray-800 text-gray-800 text-lg font-medium tracking-wide uppercase hover:bg-gray-800 hover:text-white transition-all duration-300"
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
    <section id="venue" className="py-20" style={{ backgroundColor: '#86895d' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              Detalles del Evento
            </h2>
            <div className="w-24 h-px bg-white/60 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Venue Info */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 text-gray-700 mr-3" />
                <h3 className="text-2xl font-light text-gray-900">Ubicación</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-xl text-gray-800 font-medium">{venue.name}</p>
                <p className="text-gray-700">{venue.address}</p>
                <p className="text-gray-700 italic">{venue.description}</p>
                
                {/* Google Maps Link */}
                <div className="pt-4">
                  <a
                    href="https://www.google.com/maps/dir//Av+Lomas+de+San+Juan+San+Juan+Yautepec+1000,+52767+La+Ca%C3%B1ada,+M%C3%A9x./@19.3280767,-99.4457452,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85d207ff6633297b:0x209ab36d9cc15444!2m2!1d-99.3633345!2d19.328085?entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium tracking-wide uppercase rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Ver en Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-gray-700 mr-3" />
                <h3 className="text-2xl font-light text-gray-900">Cronograma</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { event: 'Ceremonia', time: timeline.ceremony },
                  { event: 'Cóctel', time: timeline.cocktail },
                  { event: 'Recepción', time: timeline.reception },
                  { event: 'Fiesta', time: timeline.party }
                ].map((item, index) => (
                  <div key={item.event} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-700">{item.event}</span>
                    <span className="font-medium text-gray-800">{item.time}</span>
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
      <CountdownSection />
      <PhotoGallery />
      <EtiquetaSection />
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