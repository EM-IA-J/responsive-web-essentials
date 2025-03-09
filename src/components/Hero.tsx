import { Award, Clock, CheckCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Hero = () => {
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
        <div className="absolute top-[20%] right-[15%] w-[25%] h-[25%] bg-primary/5 rounded-full animate-float blur-3xl opacity-50" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-[15%] right-[10%] w-[35%] h-[30%] bg-primary/5 rounded-full animate-pulse-soft blur-3xl opacity-60" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Hero image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/img/paginaprincipal (1).jpg" 
          alt="Imagen Principal" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="content-container relative z-10">
        <div className="flex flex-col items-center text-center">
          <AnimatedSection>
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
              Diseño Web Premium & Desarrollo Avanzado
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl">
              Transformamos ideas en <span className="text-primary">experiencias digitales</span> extraordinarias
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl">
              Especializados en diseño web y desarrollo de aplicaciones de alto nivel, 
              brindamos soluciones personalizadas que combinan estética impecable con 
              funcionalidad avanzada para impulsar el crecimiento de tu negocio.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
              <a href="#contact" className="btn-primary rounded-full">
                Contactar ahora
              </a>
              <a href="#portfolio" className="btn-outline rounded-full">
                Ver nuestro trabajo
              </a>
            </div>
          </AnimatedSection>

          {/* Características destacadas */}
          <AnimatedSection delay={800}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 max-w-4xl">
              <div className="flex items-center bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-border/30">
                <Award className="text-primary mr-3" size={24} />
                <div>
                  <h3 className="font-semibold text-sm">Calidad Premium</h3>
                  <p className="text-xs text-foreground/70">Diseño y código de excelencia</p>
                </div>
              </div>
              <div className="flex items-center bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-border/30">
                <Clock className="text-primary mr-3" size={24} />
                <div>
                  <h3 className="font-semibold text-sm">Entrega Puntual</h3>
                  <p className="text-xs text-foreground/70">Cumplimos con los plazos</p>
                </div>
              </div>
              <div className="flex items-center bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-border/30">
                <CheckCircle className="text-primary mr-3" size={24} />
                <div>
                  <h3 className="font-semibold text-sm">Soporte Continuo</h3>
                  <p className="text-xs text-foreground/70">Asistencia post-proyecto</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
