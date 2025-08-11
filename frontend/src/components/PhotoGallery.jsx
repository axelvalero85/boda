import React, { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Heart, Star, Sparkles } from 'lucide-react';
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
    <section className="relative py-32 bg-gradient-to-br from-slate-100 via-gray-50 to-slate-50 overflow-hidden">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' fill-rule='nonzero'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <Heart className="absolute top-32 left-16 w-5 h-5 text-rose-200 animate-pulse fill-rose-200" />
        <Star className="absolute top-20 right-24 w-4 h-4 text-amber-200 animate-ping fill-amber-200" />
        <Sparkles className="absolute bottom-40 left-32 w-6 h-6 text-blue-200 animate-pulse" />
        <div className="absolute top-1/2 right-16 w-3 h-3 bg-pink-200 rounded-full animate-bounce"></div>
        <Heart className="absolute bottom-32 right-40 w-4 h-4 text-purple-200 animate-pulse fill-purple-200" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Sophisticated Header */}
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200/30 to-transparent blur-2xl"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50 backdrop-blur-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent rounded-full"></div>
                <Camera className="w-10 h-10 text-gray-600 relative z-10" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-800 mb-6 tracking-wide">
              Nuestra
              <span className="block text-6xl md:text-8xl bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent font-light">
                Historia
              </span>
            </h2>
            
            {/* Decorative Lines */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-rose-300"></div>
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <div className="w-32 h-0.5 bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300"></div>
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-rose-300"></div>
            </div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cada fotografía cuenta una parte de nuestra historia de amor. 
              Estos momentos especiales nos trajeron hasta aquí, creando memorias que durarán para siempre.
            </p>
          </div>

          {/* Premium Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {photos.map((photo, index) => (
              <div 
                key={photo.id}
                className={`group relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] rounded-2xl ${
                  index % 3 === 0 ? 'md:col-span-1 md:row-span-1' : 
                  index % 5 === 0 ? 'md:col-span-2 md:row-span-1' : 
                  'md:col-span-1 md:row-span-1'
                }`}
                onClick={() => openLightbox(photo, index)}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Image */}
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Hover Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl border border-white/20">
                    <Camera className="w-8 h-8 text-gray-800" />
                  </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100"></div>
                <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-300"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-400"></div>

                {/* Photo Number */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Lightbox Modal */}
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
              <div className="bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/10 flex items-center space-x-4">
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