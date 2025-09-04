import React, { useEffect, useRef, useState } from 'react';

// Hook for scroll-triggered animations inspired by tonaltonal.com
export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// Animated Section Wrapper
export const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0,
  animation = 'fade-up' 
}) => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  
  const animationClasses = {
    'fade-up': `transform transition-all duration-1000 ease-out ${
      isVisible 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-8 opacity-0'
    }`,
    'fade-in': `transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`,
    'scale-up': `transform transition-all duration-1000 ease-out ${
      isVisible 
        ? 'scale-100 opacity-100' 
        : 'scale-95 opacity-0'
    }`,
    'slide-left': `transform transition-all duration-1000 ease-out ${
      isVisible 
        ? 'translate-x-0 opacity-100' 
        : 'translate-x-8 opacity-0'
    }`,
    'slide-right': `transform transition-all duration-1000 ease-out ${
      isVisible 
        ? 'translate-x-0 opacity-100' 
        : '-translate-x-8 opacity-0'
    }`
  };

  return (
    <div 
      ref={ref}
      className={`${animationClasses[animation]} ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Staggered Children Animation
export const StaggeredAnimation = ({ 
  children, 
  className = '', 
  staggerDelay = 200 
}) => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
          style={{ 
            transitionDelay: `${index * staggerDelay}ms`
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Parallax Effect Component
export const ParallaxElement = ({ 
  children, 
  speed = 0.5, 
  className = '' 
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffsetY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offsetY}px)`
      }}
    >
      {children}
    </div>
  );
};

export default {
  useScrollAnimation,
  AnimatedSection,
  StaggeredAnimation,
  ParallaxElement
};