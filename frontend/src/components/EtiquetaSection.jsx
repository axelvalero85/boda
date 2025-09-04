import React from 'react';
import { AnimatedSection } from './ScrollAnimations';

const EtiquetaSection = () => {
  return (
    <section className="relative py-32 overflow-hidden geometric-pattern-original" id="etiqueta" style={{ backgroundColor: '#ae9c8f' }}>
      {/* Original geometric background pattern overlay */}
      <div className="absolute inset-0 geometric-pattern-subtle"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-20" animation="fade-up">
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-800 mb-8 tracking-[0.15em]">
              Etiqueta
            </h2>
            
            <p className="text-xl max-w-3xl mx-auto leading-relaxed font-light mb-12" style={{ color: '#2e2e22' }}>
              Queremos que te sientas cómodo y elegante en nuestro día especial.
            </p>
          </AnimatedSection>

          {/* Dress Code Card with enhanced animations */}
          <AnimatedSection 
            className="max-w-3xl mx-auto" 
            animation="scale-up" 
            delay={300}
          >
            <div className="relative bg-white/90 backdrop-blur-xl p-12 shadow-2xl border border-gray-300 overflow-hidden hover:shadow-3xl hover:bg-white/95 transition-all duration-500 group">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/20 via-transparent to-gray-50/10"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-200/10 to-transparent blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-200/10 to-transparent blur-xl group-hover:blur-sm transition-all duration-500"></div>
              
              <div className="relative z-10 text-center">
                {/* Main Dress Code */}
                <div className="mb-8">
                  <h3 className="text-4xl md:text-5xl font-light mb-4 tracking-wide transition-all duration-300 group-hover:scale-105" style={{ color: '#2e2e22' }}>
                    Formal
                  </h3>
                  
                  {/* Decorative Line */}
                  <div className="w-32 h-0.5 bg-gray-400 mx-auto mb-8 transition-all duration-300 group-hover:w-40"></div>
                </div>

                {/* Additional Details */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="bg-gray-50/50 p-6 border border-gray-200/50 hover:bg-gray-50/70 transition-all duration-300 transform hover:-translate-y-1">
                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#2e2e22' }}>
                      Para Ellas
                    </h4>
                    <p className="leading-relaxed" style={{ color: '#2e2e22' }}>
                      Vestido largo o midi elegante. Colores sugeridos: tonos neutros, pasteles o colores clásicos.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50/50 p-6 border border-gray-200/50 hover:bg-gray-50/70 transition-all duration-300 transform hover:-translate-y-1">
                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#2e2e22' }}>
                      Para Ellos
                    </h4>
                    <p className="leading-relaxed" style={{ color: '#2e2e22' }}>
                      Traje completo con corbata o pajarita. Camisa formal y zapatos de vestir. Colores clásicos preferidos.
                    </p>
                  </div>
                </div>

                {/* Note */}
                <div className="mt-8 p-4 bg-white/50 border-l-4 border-gray-400 hover:border-gray-500 transition-all duration-300">
                  <p className="text-sm italic" style={{ color: '#2e2e22' }}>
                    ¡Por la noche hará frío lleva abrigo!
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default EtiquetaSection;