import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingData } from '../mock';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { photos } = weddingData;

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Simple Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-6xl font-extralight text-gray-800 mb-6 tracking-wide">
              Nuestra Historia
            </h2>
            <div className="w-24 h-px bg-gray-400 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Cada fotografía cuenta una parte de nuestra historia de amor. Estos momentos especiales nos trajeron hasta aquí.
            </p>
          </div>

          {/* Clean Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {photos.map((photo, index) => (
              <div 
                key={photo.id}
                className="group relative aspect-square overflow-hidden bg-gray-100 cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
                onClick={() => openLightbox(photo, index)}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Simple Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigatePhoto('prev')}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigatePhoto('next')}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative max-w-5xl max-h-full">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
              {selectedPhoto.index + 1} de {photos.length}
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