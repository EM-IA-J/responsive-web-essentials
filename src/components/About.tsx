import AnimatedSection from './AnimatedSection';
import { Heart, Zap, Shield, Users, CheckCircle } from 'lucide-react';

interface ValueProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueProps) => (
  <div className="flex items-start">
    <div className="mr-4 mt-1 text-primary">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </div>
  </div>
);

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  delay?: number;
}

const TeamMember = ({ name, role, image, delay = 0 }: TeamMemberProps) => (
  <AnimatedSection delay={delay} animation="scale-in">
    <div className="text-center">
      <div className="relative mb-4 mx-auto w-40 h-40 overflow-hidden rounded-full border-4 border-white shadow-md">
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-foreground/70 text-sm">{role}</p>
    </div>
  </AnimatedSection>
);

const About = () => {
  const values = [
    {
      icon: <Heart size={24} />,
      title: "Pasión por la excelencia",
      description: "Nos esforzamos por superar expectativas en cada proyecto, buscando constantemente innovar y mejorar nuestros estándares."
    },
    {
      icon: <Zap size={24} />,
      title: "Innovación continua",
      description: "Nos mantenemos al día con las últimas tecnologías y tendencias para ofrecer soluciones digitales de vanguardia."
    },
    {
      icon: <Shield size={24} />,
      title: "Compromiso y confianza",
      description: "Construimos relaciones basadas en la transparencia, la honestidad y el cumplimiento de nuestras promesas."
    },
    {
      icon: <Users size={24} />,
      title: "Enfoque colaborativo",
      description: "Trabajamos estrechamente con nuestros clientes, considerándolos parte integral del proceso creativo."
    }
  ];

  const teamMembers = [
    {
      name: "María González",
      role: "Director Creativo",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      delay: 0
    },
    {
      name: "Alejandro Rodríguez",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      delay: 100
    },
    {
      name: "Laura Martínez",
      role: "UX/UI Designer",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      delay: 200
    },
    {
      name: "Carlos Sánchez",
      role: "Backend Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      delay: 300
    }
  ];

  const technologies = [
    "React", "Next.js", "Vue.js", "Node.js", "Express", "MongoDB", 
    "PostgreSQL", "Tailwind CSS", "TypeScript", "PHP", "Laravel", "WordPress"
  ];

  return (
    <section id="about" className="section bg-white py-24">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
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

        {/* Nuestra historia */}
        <AnimatedSection className="mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">Nuestra historia</h3>
            <p className="text-foreground/80 mb-4">
              Fundada en 2013, nuestra agencia comenzó como un pequeño equipo de diseñadores y desarrolladores con una visión compartida: 
              crear soluciones digitales que combinaran excelencia técnica y diseño excepcional.
            </p>
            <p className="text-foreground/80 mb-4">
              A lo largo de los años, hemos crecido hasta convertirnos en un estudio reconocido, trabajando con clientes de diversos 
              sectores, desde startups emergentes hasta empresas consolidadas. Nuestro compromiso con la calidad y la innovación 
              ha sido el motor de nuestro crecimiento.
            </p>
            <p className="text-foreground/80">
              Hoy, contamos con un equipo multidisciplinar de profesionales apasionados que comparten nuestra misión de transformar 
              ideas en experiencias digitales memorables que generan resultados tangibles para nuestros clientes.
            </p>
          </div>
        </AnimatedSection>
        
        {/* Nuestros valores */}
        <AnimatedSection className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Nuestros valores</h3>
            <p className="text-foreground/80">
              Estos principios guían nuestro trabajo diario y definen nuestra cultura empresarial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {values.map((value, index) => (
              <ValueCard 
                key={index} 
                icon={value.icon} 
                title={value.title} 
                description={value.description} 
              />
            ))}
          </div>
        </AnimatedSection>
        
        {/* Nuestro equipo */}
        <AnimatedSection className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Nuestro equipo</h3>
            <p className="text-foreground/80">
              Profesionales apasionados que aportan su experiencia y creatividad a cada proyecto
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <TeamMember 
                key={index} 
                name={member.name} 
                role={member.role} 
                image={member.image} 
                delay={member.delay} 
              />
            ))}
          </div>
        </AnimatedSection>
        
        {/* Tecnologías */}
        <AnimatedSection className="mb-10">
          <div className="bg-secondary/30 p-8 rounded-2xl">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Tecnologías que utilizamos</h3>
              <p className="text-foreground/80">
                Trabajamos con las herramientas y tecnologías más avanzadas para garantizar la mejor calidad
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, index) => (
                <div key={index} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground shadow-sm">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        {/* Por qué elegirnos */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto mt-16">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-4">¿Por qué elegirnos?</h3>
              <p className="text-foreground/80">
                Razones por las que somos la mejor opción para tu próximo proyecto digital
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  title: "Enfoque personalizado",
                  description: "Entendemos que cada proyecto es único y adaptamos nuestras soluciones a tus necesidades específicas."
                },
                {
                  title: "Resultados medibles",
                  description: "Nos enfocamos en crear sitios web que no solo se vean bien, sino que generen resultados comerciales concretos."
                },
                {
                  title: "Soporte continuo",
                  description: "Nuestro compromiso no termina con el lanzamiento; ofrecemos soporte y mantenimiento para asegurar el éxito a largo plazo."
                },
                {
                  title: "Comunicación transparente",
                  description: "Mantenemos una comunicación clara y constante durante todo el proceso, asegurando que estés informado en cada etapa."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-foreground/70 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;
