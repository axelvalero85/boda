import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Camera } from 'lucide-react';
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
    <section id="gallery" className="relative py-32 overflow-hidden" style={{ backgroundColor: '#86895d' }}>
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-16 w-4 h-4 text-white/10 animate-pulse fill-white/10" />
        <Heart className="absolute top-40 right-20 w-3 h-3 text-white/10 animate-pulse fill-white/10 delay-300" />
        <Heart className="absolute bottom-40 left-24 w-5 h-5 text-white/10 animate-pulse fill-white/10 delay-700" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/10 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Elegant Header with Animations */}
          <div className={`text-center mb-24 transition-all duration-1500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Decorative Icon */}
            <div className="relative inline-block mb-12">
              <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full"></div>
              <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border border-white/30">
                <Camera className="w-10 h-10 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-rose-400/80 to-pink-500/80 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-extralight text-white mb-8 tracking-[0.15em]">
              Nuestra
              <span className="block mt-2 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">
                Historia
              </span>
            </h2>
            
            {/* Decorative Elements */}
            <div className="flex items-center justify-center space-x-8 mb-10">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/60"></div>
              <Heart className="w-6 h-6 text-gray-300 fill-gray-300" />
              <div className="w-32 h-px bg-gradient-to-r from-white/60 via-white/80 to-white/60"></div>
              <Heart className="w-6 h-6 text-gray-300 fill-gray-300" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/60"></div>
            </div>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              Cada fotografía cuenta una parte de nuestra historia de amor. 
              Estos momentos especiales nos trajeron hasta aquí, creando memorias que durarán para siempre.
            </p>
          </div>

          {/* Enhanced Photo Grid with Masonry-like Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {photos.map((photo, index) => (
              <div 
                key={photo.id}
                className={`group relative overflow-hidden bg-white/20 cursor-pointer transition-all duration-700 hover:shadow-2xl rounded-2xl ${
                  index === 0 ? 'md:col-span-2 md:row-span-1' : 
                  index === 3 ? 'md:col-span-1 md:row-span-2' : 
                  'aspect-square'
                }`}
                onClick={() => openLightbox(photo, index)}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
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
                
                {/* Sophisticated Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Hover Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl border border-white/20">
                    <Camera className="w-8 h-8 text-gray-800" />
                  </div>
                </div>

                {/* Decorative Frame */}
                <div className="absolute inset-2 border-2 border-white/0 group-hover:border-white/30 rounded-xl transition-all duration-500"></div>

                {/* Photo Counter Badge */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {index + 1}/{photos.length}
                </div>
              </div>
            ))}
          </div>
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
            <div className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20 hover:scale-110">
              <X className="w-7 h-7" />
            </div>
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigatePhoto('prev')}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 group"
          >
            <div className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20 hover:scale-110">
              <ChevronLeft className="w-7 h-7" />
            </div>
          </button>

          <button
            onClick={() => navigatePhoto('next')}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 group"
          >
            <div className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20 hover:scale-110">
              <ChevronRight className="w-7 h-7" />
            </div>
          </button>

          {/* Image Container */}
          <div className="relative max-w-6xl max-h-full mx-auto">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-xl"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-black/70 backdrop-blur-md text-white px-8 py-4 rounded-full border border-white/10 flex items-center space-x-4">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span className="text-sm font-medium">
                  {selectedPhoto.index + 1} de {photos.length}
                </span>
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
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