import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navigationItems = [
    { id: 'wedding', label: 'Boda', icon: '💒' },
    { id: 'countdown', label: 'Countdown', icon: '⏰' },
    { id: 'gallery', label: 'Galería', icon: '📸' },
    { id: 'etiqueta', label: 'Etiqueta', icon: '👔' },
    { id: 'venue', label: 'Ubicación', icon: '📍' },
    { id: 'gifts', label: 'Regalos', icon: '🎁' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/20 shadow-xl' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-lg md:text-xl font-light tracking-[0.15em]">
              <span className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                Axel & Dani
              </span>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {navigationItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 hover:scale-105 group ${
                    isScrolled 
                      ? 'hover:text-gray-900' 
                      : 'text-white/90 hover:text-white'
                  }`}
                  style={{ color: isScrolled ? '#2e2e22' : undefined }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-gray-800' : 'bg-white'
                  }`}></div>
                </button>
              ))}
              
              <button 
                onClick={() => scrollToSection('rsvp')}
                className={`relative px-6 md:px-8 py-2 md:py-3 text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 hover:scale-105 overflow-hidden group ${
                  isScrolled 
                    ? 'border-2 hover:bg-gray-800 hover:text-white' 
                    : 'border-2 border-white text-white hover:bg-white hover:text-gray-800'
                }`}
                style={{ 
                  borderColor: isScrolled ? '#2e2e22' : 'white',
                  color: isScrolled ? '#2e2e22' : 'white'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <span className="relative z-10">RSVP</span>
              </button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 md:p-3 transition-all duration-300 ${
                isScrolled ? 'bg-gray-100' : 'bg-white/20 backdrop-blur-sm border border-white/30'
              }`}
              style={{ color: isScrolled ? '#2e2e22' : 'white' }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu - Full Screen with Smooth Animations */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Background Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/95 to-black/90 backdrop-blur-xl transition-all duration-700 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
        }`} onClick={() => setIsMobileMenuOpen(false)}></div>
        
        {/* Menu Content */}
        <div className={`relative w-full h-full flex flex-col justify-center items-center text-center transform transition-all duration-700 ${
          isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          {/* Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Items */}
          <div className="space-y-8 px-8">
            {navigationItems.map((item, index) => (
              <div
                key={item.id}
                className={`transform transition-all duration-700 ${
                  isMobileMenuOpen 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <button 
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center justify-center space-x-4 w-full max-w-xs mx-auto bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xl font-light tracking-[0.1em]">{item.label}</span>
                  <ChevronRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>
            ))}
            
            {/* RSVP Button */}
            <div
              className={`transform transition-all duration-700 ${
                isMobileMenuOpen 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${navigationItems.length * 100 + 200}ms` }}
            >
              <button 
                onClick={() => scrollToSection('rsvp')}
                className="w-full max-w-xs mx-auto bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border-2 border-white/30 text-white p-6 text-xl font-medium tracking-[0.1em] uppercase transition-all duration-300 hover:from-white/30 hover:to-white/20 hover:border-white/50 hover:scale-105 mt-8"
              >
                <div className="flex items-center justify-center space-x-3">
                  <span>💌</span>
                  <span>CONFIRMAR ASISTENCIA</span>
                </div>
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </>
  );
};

export default Navigation;