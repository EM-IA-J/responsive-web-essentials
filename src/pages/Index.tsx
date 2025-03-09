import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectCarousel from '@/components/ProjectCarousel';
import Footer from '@/components/Footer';
import { portfolioItems } from '@/data/portfolioData';
import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/AnimatedSection';

// Filtrar solo los proyectos especiales (Brillabruja, EdChang, M12)
const specialProjects = portfolioItems.filter(project => [1, 2, 3].includes(project.id));

const Index = () => {
  // Set up intersection observer for animations
  useEffect(() => {
    // This is a fallback for browsers that don't support IntersectionObserver API
    // The AnimatedSection component handles most animations, but this is for any
    // elements with the animate-in-on-scroll class
    const handleScrollAnimation = () => {
      const elements = document.querySelectorAll('.animate-in-on-scroll');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        
        // Add is-visible class when element is in viewport
        if (elementTop < window.innerHeight - elementHeight / 3) {
          element.classList.add('is-visible');
        } else {
          element.classList.remove('is-visible');
        }
      });
    };

    // Initial check
    setTimeout(handleScrollAnimation, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScrollAnimation);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <ProjectCarousel />
        
        {/* Sección de proyectos destacados con SVG */}
        <section className="py-24 bg-gradient-to-b from-white to-secondary/20">
          <div className="content-container">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
                Portfolio de proyectos
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Explora nuestras creaciones interactivas
              </h2>
              <p className="text-foreground/70">
                Estos proyectos especiales presentan diseños SVG únicos a pantalla completa. 
                Haz clic en cualquiera de ellos para descubrir más.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specialProjects.map((project, index) => (
                <AnimatedSection key={project.id} delay={index * 100} animation="scale-in">
                  <Link 
                    to={`/portfolio/${project.id}`}
                    className="block group overflow-hidden rounded-xl shadow-lg relative aspect-square hover:shadow-xl transition-all"
                  >
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-white/80 mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.svgFiles && (
                          <span className="px-2 py-1 bg-primary/80 rounded-full text-xs text-white">
                            {project.svgFiles.length} {project.svgFiles.length === 1 ? 'SVG' : 'SVGs'}
                          </span>
                        )}
                      </div>
                      <span className="inline-block py-2 px-4 bg-white text-primary rounded-full text-sm font-medium">
                        Ver Experiencia SVG
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/portfolio" 
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                Ver todos los proyectos del portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
