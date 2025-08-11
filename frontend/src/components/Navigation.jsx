import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/20 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-xl font-light tracking-wide">
              <span className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                Axel & Dani
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('wedding')}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-gray-900' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Wedding
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-gray-900' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('venue')}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-gray-900' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Location
              </button>
              <button 
                onClick={() => scrollToSection('gifts')}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-gray-900' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Gifts
              </button>
              <button 
                onClick={() => scrollToSection('rsvp')}
                className={`px-6 py-2 border-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white' 
                    : 'border-white text-white hover:bg-white hover:text-gray-800'
                }`}
              >
                RSVP
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 w-64 h-full bg-white shadow-2xl transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 pt-20">
            <div className="space-y-6">
              <button 
                onClick={() => scrollToSection('wedding')}
                className="block w-full text-left text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200"
              >
                Wedding
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="block w-full text-left text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('venue')}
                className="block w-full text-left text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200"
              >
                Location
              </button>
              <button 
                onClick={() => scrollToSection('gifts')}
                className="block w-full text-left text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200"
              >
                Gifts
              </button>
              <button 
                onClick={() => scrollToSection('rsvp')}
                className="block w-full text-left px-6 py-3 border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 mt-6"
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