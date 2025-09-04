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
import { AnimatedSection } from './components/ScrollAnimations';

const GiftSection = () => {
  const { giftRegistry, logos } = weddingData;
  
  return (
    <section id="gifts" className="py-20 geometric-pattern-original" style={{ backgroundColor: '#ae9c8f' }}>
      {/* Original geometric background pattern overlay */}
      <div className="absolute inset-0 geometric-pattern-subtle"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header with Black Logo - Larger */}
          <AnimatedSection className="mb-16" animation="fade-up">
            <div className="flex items-center justify-center mb-8">
              <img 
                src={logos.black} 
                alt="Axel & Dani Logo" 
                className="w-24 h-24 md:w-28 md:h-28 mr-6 opacity-90"
              />
              <h2 className="text-4xl md:text-6xl font-extralight text-gray-800 tracking-wide">
                Mesa de Regalos
              </h2>
            </div>
            <div className="w-24 h-px bg-gray-400 mx-auto mb-8"></div>
          </AnimatedSection>

          {/* Message Card */}
          <AnimatedSection animation="scale-up" delay={200}>
            <div className="bg-white/90 backdrop-blur-sm p-12 mb-12 shadow-lg border border-gray-300 hover:shadow-2xl transition-all duration-500">
              <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: '#2e2e22' }}>
                {giftRegistry.message}
              </p>
              
              <a
                href={giftRegistry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 border-2 text-lg font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105"
                style={{ 
                  borderColor: '#917955', 
                  color: '#917955',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#917955';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#917955';
                }}
              >
                <div className="flex items-center justify-center space-x-3">
                  <Gift className="w-5 h-5" />
                  <span>Ver Mesa de Regalos</span>
                </div>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

const VenueSection = () => {
  const { venue, timeline, logos } = weddingData;
  
  return (
    <section id="venue" className="py-20 geometric-pattern-original" style={{ backgroundColor: '#ae9c8f' }}>
      {/* Original geometric background pattern overlay */}
      <div className="absolute inset-0 geometric-pattern-subtle"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header with Black Logo - Larger */}
          <AnimatedSection className="text-center mb-16" animation="fade-up">
            <div className="flex items-center justify-center mb-8">
              <img 
                src={logos.black} 
                alt="Axel & Dani Logo" 
                className="w-24 h-24 md:w-28 md:h-28 mr-6 opacity-90"
              />
              <h2 className="text-4xl md:text-6xl font-extralight text-gray-800 tracking-wide">
                Detalles del Evento
              </h2>
            </div>
            <div className="w-24 h-px bg-gray-400 mx-auto mb-8"></div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Venue Info */}
            <AnimatedSection animation="slide-left" delay={200}>
              <div className="bg-white/90 backdrop-blur-sm shadow-lg p-8 border border-gray-300 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <MapPin className="w-6 h-6 text-gray-700 mr-3" />
                  <h3 className="text-2xl font-light text-gray-900">Ubicación</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  <p className="text-xl font-medium" style={{ color: '#2e2e22' }}>{venue.name}</p>
                  <p style={{ color: '#2e2e22' }}>{venue.address}</p>
                  <p className="italic" style={{ color: '#2e2e22' }}>{venue.description}</p>
                </div>

                {/* Directions */}
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200">
                  <h4 className="text-lg font-semibold mb-3" style={{ color: '#2e2e22' }}>
                    Indicaciones
                  </h4>
                  
                  <div className="space-y-4 text-sm" style={{ color: '#2e2e22' }}>
                    <div>
                      <h5 className="font-semibold mb-2">Vía de Cuota:</h5>
                      <p className="leading-relaxed">
                        Desde la CDMX, puedes tomar la carretera rumbo a Santa Fe por carriles centrales 
                        que te llevarán directo hasta la desviación a Huixquilucan. Posteriormente, y antes 
                        de las vías de tren, tomarás la primera desviación a la derecha por carretera a San 
                        Juan Yautepec. Después de 2 km, en el lado izquierdo encontrarás la Finca San 
                        Gabriel. Es un portón muy grande, con un letrero de piedra.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2">Vía Libre:</h5>
                      <p className="text-xs italic mb-2">(Los buscadores normalmente no la marcan)</p>
                      <p className="leading-relaxed">
                        Desde la CDMX, puedes tomar la carretera rumbo al Yaqui, Cuajimalpa. Sigue hasta 
                        la caseta de La Venta —sin tomarla— por el lado derecho, está la entrada a la Libre. 
                        Pasarás la Pila, y al llegar a la Marquesa verás un puente el cual no tomarás, 
                        sino que te irás por cualquiera de los lados. Darás vuelta a la derecha, cruzarás un 
                        puente, y antes de las vías de tren, tomarás la primera desviación a la derecha por 
                        carretera a San Juan Yautepec. Después de 2 km, en el lado izquierdo encontrarás la 
                        Finca San Gabriel. Es un portón muy grande, con un letrero de piedra.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Google Maps Link */}
                <div>
                  <a
                    href="https://www.google.com/maps/dir//Av+Lomas+de+San+Juan+San+Juan+Yautepec+1000,+52767+La+Ca%C3%B1ada,+M%C3%A9x./@19.3280767,-99.4457452,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85d207ff6633297b:0x209ab36d9cc15444!2m2!1d-99.3633345!2d19.328085?entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 px-6 py-3 text-white text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#917955' }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#7a6747';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#917955';
                    }}
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Ver en Google Maps</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Timeline */}
            <AnimatedSection animation="slide-right" delay={400}>
              <div className="bg-white/90 backdrop-blur-sm shadow-lg p-8 border border-gray-300 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <Clock className="w-6 h-6 text-gray-700 mr-3" />
                  <h3 className="text-2xl font-light text-gray-900">Cronograma</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {[
                    { event: 'Ceremonia', time: timeline.ceremony },
                    { event: 'Comida', time: timeline.reception },
                    { event: 'Cóctel', time: timeline.cocktail },
                    { event: 'Fiesta', time: timeline.party }
                  ].map((item, index) => (
                    <div key={item.event} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-all duration-200">
                      <span style={{ color: '#2e2e22' }}>{item.event}</span>
                      <span className="font-medium" style={{ color: '#2e2e22' }}>{item.time}</span>
                    </div>
                  ))}
                </div>

                {/* Larger black logo at bottom of timeline */}
                <div className="flex justify-center pt-4">
                  <img 
                    src={logos.black} 
                    alt="Axel & Dani Logo" 
                    className="w-16 h-16 opacity-70"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { couple, logos } = weddingData;
  
  return (
    <footer className="text-white py-16" style={{ backgroundColor: '#917955' }}>
      <div className="container mx-auto px-6 text-center">
        <AnimatedSection className="max-w-2xl mx-auto" animation="fade-up">
          {/* Black Logo in Footer - keep same size as requested */}
          <div className="mb-8">
            <img 
              src={logos.black} 
              alt="Axel & Dani Logo" 
              className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 opacity-90"
            />
          </div>
          
          <h3 className="text-2xl font-light mb-2 tracking-wide">
            {couple.groom} & {couple.bride}
          </h3>
          <p className="text-white/80 mb-8">{couple.weddingDate}</p>
          <div className="w-24 h-px bg-white/60 mx-auto mb-6"></div>
          <p className="text-white/80 leading-relaxed">
            Gracias por ser parte de nuestro día especial
          </p>
        </AnimatedSection>
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