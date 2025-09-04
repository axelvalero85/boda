import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';

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

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/20 shadow-xl' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isScrolled ? 'bg-gray-100' : 'bg-white/20 backdrop-blur-sm border border-white/30'
              }`}>
                <Heart className={`w-4 h-4 transition-colors duration-300 ${
                  isScrolled ? 'text-gray-400 fill-gray-400' : 'text-white fill-white'
                }`} />
              </div>
              <div className="text-xl font-light tracking-[0.15em]">
                <span className={`transition-colors duration-300 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}>
                  Axel & Dani
                </span>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {[
                { id: 'wedding', label: 'Boda' },
                { id: 'gallery', label: 'Galería' },
                { id: 'venue', label: 'Ubicación' },
                { id: 'gifts', label: 'Regalos' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 hover:scale-105 group ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-gray-800' : 'bg-white'
                  }`}></div>
                </button>
              ))}
              
              <button 
                onClick={() => scrollToSection('rsvp')}
                className={`relative px-8 py-3 text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 hover:scale-105 overflow-hidden group ${
                  isScrolled 
                    ? 'border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white' 
                    : 'border-2 border-white text-white hover:bg-white hover:text-gray-800'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <span className="relative z-10">RSVP</span>
              </button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-3 rounded-full transition-all duration-300 ${
                isScrolled ? 'text-gray-800 bg-gray-100' : 'text-white bg-white/20 backdrop-blur-sm border border-white/30'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 w-80 h-full bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-8 pt-24">
            {/* Menu Header */}
            <div className="flex items-center justify-center mb-12">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              </div>
            </div>

            <div className="space-y-8">
              {[
                { id: 'wedding', label: 'Boda' },
                { id: 'gallery', label: 'Galería' },
                { id: 'venue', label: 'Ubicación' },
                { id: 'gifts', label: 'Regalos' }
              ].map((item, index) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-xl font-medium text-gray-800 hover:text-gray-600 transition-all duration-300 transform hover:translate-x-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </button>
              ))}
              
              <button 
                onClick={() => scrollToSection('rsvp')}
                className="w-full text-left px-8 py-4 border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 mt-8"
              >
                RSVP
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;