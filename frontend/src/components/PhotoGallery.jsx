import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingData } from '../mock';
import { AnimatedSection, StaggeredAnimation } from './ScrollAnimations';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { photos, logos } = weddingData;

  const openLightbox = (photo, index) => {
    setSelectedPhoto({ ...photo, index });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  const navigatePhoto = (direction) => {
    if (!selectedPhoto) return;
    
    const currentIndex = selectedPhoto.index;
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto({ ...photos[newIndex], index: newIndex });
  };

  return (
    <section id="gallery" className="relative py-32 overflow-hidden" style={{ backgroundColor: '#ae9c8f' }}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header with Black Logo - Larger */}
          <AnimatedSection className="text-center mb-24" animation="fade-up">
            <div className="flex items-center justify-center mb-8">
              <img 
                src={logos.black} 
                alt="Axel & Dani Logo" 
                className="w-20 h-20 md:w-24 md:h-24 mr-6 opacity-90"
              />
              <h2 className="text-5xl md:text-7xl font-extralight text-gray-800 tracking-[0.15em]">
                Nuestra Historia
              </h2>
            </div>
            
            <p className="text-xl max-w-3xl mx-auto leading-relaxed font-light" style={{ color: '#2e2e22' }}>
              Cada fotografía cuenta una parte de nuestra historia de amor. 
              Estos momentos especiales nos trajeron hasta aquí, creando memorias que durarán para siempre.
            </p>
          </AnimatedSection>

          {/* Photo Grid with Staggered Animation */}
          <StaggeredAnimation 
            className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
            staggerDelay={100}
          >
            {photos.map((photo, index) => (
              <div 
                key={photo.id}
                className={`group relative overflow-hidden bg-gray-200 cursor-pointer transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 ${
                  index === 0 ? 'md:col-span-2 md:row-span-1' : 
                  index === 3 ? 'md:col-span-1 md:row-span-2' : 
                  'aspect-square'
                }`}
                onClick={() => openLightbox(photo, index)}
              >
                {/* Image */}
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                    index === 0 || index === 3 ? '' : 'aspect-square'
                  }`}
                  loading="lazy"
                />
                
                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Decorative Frame */}
                <div className="absolute inset-2 border-2 border-white/0 group-hover:border-white/30 transition-all duration-500"></div>

                {/* Photo Counter Badge */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {index + 1}/{photos.length}
                </div>

                {/* Hover Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-95 group-hover:scale-100">
                  <div className="text-white text-center">
                    <div className="w-12 h-12 mx-auto mb-2 border-2 border-white/60 flex items-center justify-center">
                      <span className="text-xl">+</span>
                    </div>
                    <p className="text-sm font-light tracking-wide">Ver foto</p>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredAnimation>
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-20 group"
          >
            <div className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20 hover:scale-110 hover:rotate-90">
              <X className="w-7 h-7" />
            </div>
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigatePhoto('prev')}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 group"
          >
            <div className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20 hover:scale-110 hover:-translate-x-1">
              <ChevronLeft className="w-7 h-7" />
            </div>
          </button>

          <button
            onClick={() => navigatePhoto('next')}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 group"
          >
            <div className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20 hover:scale-110 hover:translate-x-1">
              <ChevronRight className="w-7 h-7" />
            </div>
          </button>

          {/* Image Container */}
          <div className="relative max-w-6xl max-h-full mx-auto">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-[80vh] object-contain shadow-2xl animate-in zoom-in duration-500"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-black/70 backdrop-blur-md text-white px-8 py-4 border border-white/10 animate-in slide-in-from-bottom duration-500 delay-300">
                <span className="text-sm font-medium">
                  {selectedPhoto.index + 1} de {photos.length}
                </span>
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={closeLightbox}
          ></div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;