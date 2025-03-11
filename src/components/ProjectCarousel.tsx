import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { Link } from 'react-router-dom';
import { portfolioItems } from '@/data/portfolioData';

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolioItems.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + portfolioItems.length) % portfolioItems.length);
  }, []);

  // Autoplay cuando no está en hover
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [goToNext, isHovering]);

  const currentProject = portfolioItems[currentIndex];
  const nextProject = portfolioItems[(currentIndex + 1) % portfolioItems.length];
  const prevProject = portfolioItems[(currentIndex - 1 + portfolioItems.length) % portfolioItems.length];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/30 to-transparent">
      <div className="content-container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
            Proyectos Destacados
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nuestro trabajo más reciente
          </h2>
          <p className="text-foreground/70">
            Explora algunos de nuestros proyectos más interesantes y descubre cómo
            podemos ayudarte a crear una experiencia digital excepcional.
          </p>
        </AnimatedSection>

        {/* Carousel */}
        <div 
          className="relative overflow-hidden rounded-2xl shadow-xl mx-auto max-w-6xl aspect-[16/9] mb-10"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Previous and Next buttons */}
          <button 
            onClick={goToPrevious} 
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            aria-label="Proyecto anterior"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            aria-label="Proyecto siguiente"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Track */}
          <div className="h-full flex relative">
            {/* Previous Project (small) */}
            <div className="hidden md:block absolute left-0 w-1/5 h-full opacity-50 transform -translate-x-1/2 z-0">
              <img 
                src={`./img/${prevProject.imageUrl}`} 
                alt={prevProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
            
            {/* Current Project */}
            <div className="w-full h-full relative z-10">
              <img 
                src={`./img/${currentProject.imageUrl}`} 
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10">
                <div className="max-w-3xl">
                  <span className="inline-block mb-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                    {currentProject.category}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">{currentProject.title}</h3>
                  <p className="text-white/80 mb-6 max-w-2xl">{currentProject.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    {currentProject.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      to={`/portfolio/${currentProject.id}`}
                      className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center transition-colors"
                    >
                      Ver detalles
                    </Link>
                    <a
                      href={currentProject.link}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center transition-colors"
                    >
                      Visitar sitio <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Next Project (small) */}
            <div className="hidden md:block absolute right-0 w-1/5 h-full opacity-50 transform translate-x-1/2 z-0">
              <img 
                src={`./img/${nextProject.imageUrl}`} 
                alt={nextProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
          </div>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-primary' : 'bg-white/50'
                }`}
                aria-label={`Ir al proyecto ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <Link 
            to="/portfolio"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Ver todos los proyectos
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel; 