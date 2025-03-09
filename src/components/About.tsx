
import AnimatedSection from './AnimatedSection';

const About = () => {
  return (
    <section id="about" className="section bg-white py-24">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image column */}
          <AnimatedSection animation="fade-in-right" className="order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-soft">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Equipo de trabajo colaborando en la oficina" 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 border border-primary/20 rounded-xl -z-10"></div>
            </div>
          </AnimatedSection>

          {/* Content column */}
          <AnimatedSection animation="fade-in-left" className="order-1 lg:order-2">
            <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
              Sobre Nosotros
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Innovación y excelencia en cada proyecto digital
            </h2>
            <p className="text-foreground/80 mb-6">
              Somos un estudio creativo especializado en diseño y desarrollo web premium. 
              Con más de 10 años de experiencia, combinamos estrategia, diseño y tecnología 
              para crear experiencias digitales excepcionales.
            </p>
            <p className="text-foreground/80 mb-8">
              Nuestro enfoque centrado en el usuario y la atención meticulosa a cada detalle 
              nos permite ofrecer soluciones que no solo se ven impresionantes, sino que también 
              cumplen objetivos comerciales concretos.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-1">10+</p>
                <p className="text-sm text-foreground/60">Años de experiencia</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-1">200+</p>
                <p className="text-sm text-foreground/60">Proyectos completados</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-1">50+</p>
                <p className="text-sm text-foreground/60">Clientes satisfechos</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
