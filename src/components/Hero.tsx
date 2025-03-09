
import { ArrowDown } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-secondary/50"
    >
      {/* Abstract shapes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full animate-float blur-3xl opacity-70"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full animate-float blur-3xl opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[30%] -left-[5%] w-[30%] h-[30%] bg-primary/5 rounded-full animate-pulse-soft blur-3xl opacity-60" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="content-container relative z-10">
        <div className="flex flex-col items-center text-center">
          <AnimatedSection>
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
              Diseño Web Premium
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl">
              Creamos experiencias digitales que marcan la diferencia
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl">
              Especializados en diseño web y desarrollo de aplicaciones de alto nivel, 
              brindamos soluciones a medida para empresas y profesionales exigentes.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a href="#contact" className="btn-primary rounded-full">
                Contactar ahora
              </a>
              <a href="#portfolio" className="btn-outline rounded-full">
                Ver nuestro trabajo
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll down indicator */}
      <button 
        onClick={scrollToNext}
        aria-label="Desplazarse hacia abajo"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-border/50 bg-background/50 backdrop-blur hover:bg-background/80 transition-all animate-pulse-soft"
      >
        <ArrowDown size={20} />
      </button>
    </section>
  );
};

export default Hero;
