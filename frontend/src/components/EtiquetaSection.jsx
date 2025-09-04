import React, { useEffect, useState } from 'react';

const EtiquetaSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden" id="etiqueta" style={{ backgroundColor: '#d6d6c6' }}>
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2L74 40h-2zm4 0l4-4v2L78 40h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-20 transition-all duration-1500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-800 mb-8 tracking-[0.15em]">
              Etiqueta
            </h2>
            
            {/* Decorative Elements */}
            <div className="flex items-center justify-center space-x-8 mb-10">
              <div className="w-16 h-px bg-gray-400"></div>
              <div className="w-32 h-px bg-gray-400"></div>
              <div className="w-16 h-px bg-gray-400"></div>
            </div>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light mb-12">
              Queremos que te sientas cómodo y elegante en nuestro día especial.
            </p>
          </div>

          {/* Dress Code Card */}
          <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-gray-300 overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/20 via-transparent to-gray-50/10"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-200/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-200/10 to-transparent rounded-full blur-xl"></div>
              
              <div className="relative z-10 text-center">
                {/* Main Dress Code */}
                <div className="mb-8">
                  <h3 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-wide">
                    Formal
                  </h3>
                  
                  {/* Decorative Line */}
                  <div className="w-32 h-0.5 bg-gray-400 mx-auto mb-8"></div>
                </div>

                {/* Additional Details */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-200/50">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Para Ellas
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Vestido largo o midi elegante. Colores sugeridos: tonos neutros, pasteles o colores clásicos.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-200/50">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Para Ellos
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Traje completo con corbata o pajarita. Camisa formal y zapatos de vestir. Colores clásicos preferidos.
                    </p>
                  </div>
                </div>

                {/* Note */}
                <div className="mt-8 p-4 bg-white/50 rounded-lg border-l-4 border-gray-400">
                  <p className="text-gray-600 text-sm italic">
                    ¡Lo más importante es que te sientas cómodo y celebres con nosotros!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EtiquetaSection;