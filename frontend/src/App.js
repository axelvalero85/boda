import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeddingHero from './components/WeddingHero';
import RSVPSection from './components/RSVPSection';
import PhotoGallery from './components/PhotoGallery';
import { Toaster } from './components/ui/toaster';
import { Gift, MapPin, Clock } from 'lucide-react';
import { weddingData } from './mock';

const GiftSection = () => {
  const { giftRegistry } = weddingData;
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="w-6 h-6 text-gray-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Mesa de Regalos
          </h2>
          <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {giftRegistry.message}
          </p>
          <a
            href={giftRegistry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-gray-700 to-gray-900 text-white px-10 py-4 text-lg font-medium tracking-wide hover:from-gray-800 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Ver Mesa de Regalos
          </a>
        </div>
      </div>
    </section>
  );
};

const VenueSection = () => {
  const { venue, timeline } = weddingData;
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <MapPin className="w-6 h-6 text-gray-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
              Información del Evento
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Venue Info */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-light text-gray-800 mb-4">Lugar</h3>
              <div className="space-y-3">
                <p className="text-xl text-gray-700 font-medium">{venue.name}</p>
                <p className="text-gray-600">{venue.address}</p>
                <p className="text-gray-600 italic">{venue.description}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-gray-600 mr-2" />
                <h3 className="text-2xl font-light text-gray-800">Cronograma</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Ceremonia</span>
                  <span className="font-medium text-gray-800">{timeline.ceremony}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Cóctel</span>
                  <span className="font-medium text-gray-800">{timeline.cocktail}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Recepción</span>
                  <span className="font-medium text-gray-800">{timeline.reception}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Fiesta</span>
                  <span className="font-medium text-gray-800">{timeline.party}</span>
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
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-8">
          <h3 className="text-2xl font-light mb-2">
            {couple.groom} & {couple.bride}
          </h3>
          <p className="text-gray-400">{couple.weddingDate}</p>
        </div>
        <div className="w-24 h-px bg-gray-600 mx-auto mb-6"></div>
        <p className="text-gray-400">
          Gracias por ser parte de nuestro día especial
        </p>
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