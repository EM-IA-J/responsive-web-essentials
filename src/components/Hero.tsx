import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const slides = [
    "./svg/and_drew_3.svg",
    "./svg/and_drew.svg"
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide(current => (current === 0 ? 1 : 0));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(current => (current === 0 ? 1 : 0));
  }, []);
  
  // Transición automática
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [nextSlide, isHovering]);

  useEffect(() => {
    // Detectar el scroll para animar la opacidad del Hero
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const opacity = Math.max(0, 1 - scrollPosition / (viewportHeight * 0.6));
        
        heroSection.style.opacity = opacity.toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-secondary/50 transition-opacity duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Abstract shapes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl opacity-70 transition-all duration-1000 ${currentSlide === 0 ? 'animate-float' : 'animate-pulse-soft'}`}></div>
        <div className={`absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl opacity-40 transition-all duration-1000 ${currentSlide === 0 ? 'animate-float' : 'animate-pulse-soft'}`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-[30%] -left-[5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-3xl opacity-60 transition-all duration-1000 ${currentSlide === 0 ? 'animate-pulse-soft' : 'animate-float'}`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-[20%] right-[15%] w-[25%] h-[25%] bg-primary/5 rounded-full blur-3xl opacity-50 transition-all duration-1000 ${currentSlide === 0 ? 'animate-float' : 'animate-pulse-soft'}`} style={{ animationDelay: '3s' }}></div>
        <div className={`absolute bottom-[15%] right-[10%] w-[35%] h-[30%] bg-primary/5 rounded-full blur-3xl opacity-60 transition-all duration-1000 ${currentSlide === 0 ? 'animate-pulse-soft' : 'animate-float'}`} style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Carrusel de imágenes */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                currentSlide === index 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-100'
              }`}
            >
              <img 
                src={slide} 
                alt={`Imagen ${index + 1}`} 
                className={`w-full h-full object-contain`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controles del carrusel */}
      <button 
        onClick={currentSlide === 0 ? nextSlide : prevSlide}
        className={`absolute ${currentSlide === 0 ? 'right-8' : 'left-8'} top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300`}
        aria-label={currentSlide === 0 ? "Siguiente imagen" : "Imagen anterior"}
      >
        {currentSlide === 0 ? (
          <ChevronRight className="w-6 h-6 text-white" />
        ) : (
          <ChevronLeft className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Indicadores de posición */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white scale-100' 
                : 'bg-white/50 scale-75 hover:scale-90 hover:bg-white/70'
            }`}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
