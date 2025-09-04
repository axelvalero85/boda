import React from 'react';
import { AnimatedSection } from './ScrollAnimations';

const EtiquetaSection = () => {
  return (
    <section className="relative py-32 overflow-hidden" id="etiqueta" style={{ backgroundColor: '#ae9c8f' }}>
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2L74 40h-2zm4 0l4-4v2L78 40h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header with Tonal-inspired animations */}
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