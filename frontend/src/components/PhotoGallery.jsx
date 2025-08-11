import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingData } from '../mock';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { photos } = weddingData;

  const openLightbox = (photo, index) => {
    setSelectedPhoto({ ...photo, index });
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <Camera className="w-6 h-6 text-gray-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
              Nuestra Historia
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada fotografía cuenta una parte de nuestra historia de amor. 
              Estos momentos especiales nos trajeron hasta aquí.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {photos.map((photo, index) => (
              <div 
                key={photo.id}
                className="group relative aspect-square overflow-hidden bg-gray-200 cursor-pointer transition-all duration-300 hover:shadow-xl"
                onClick={() => openLightbox(photo, index)}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-800" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigatePhoto('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigatePhoto('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
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