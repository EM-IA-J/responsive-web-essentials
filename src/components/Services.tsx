
import { Code, Layout, Smartphone, Command, Network, Lightbulb } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const ServiceCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <AnimatedSection delay={delay} animation="scale-in">
      <div className="service-card h-full">
        <div className="mb-5 inline-flex p-3 bg-primary/10 rounded-xl text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-foreground/70">{description}</p>
      </div>
    </AnimatedSection>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Layout size={24} />,
      title: "Diseño Web UI/UX",
      description: "Diseños elegantes y funcionales que priorizan la experiencia del usuario y la estética visual.",
      delay: 0
    },
    {
      icon: <Code size={24} />,
      title: "Desarrollo Frontend",
      description: "Implementación técnica perfecta con las tecnologías más modernas para un rendimiento óptimo.",
      delay: 100
    },
    {
      icon: <Command size={24} />,
      title: "Desarrollo Backend",
      description: "Soluciones robustas para gestionar datos, usuarios y funcionalidades avanzadas de forma segura.",
      delay: 200
    },
    {
      icon: <Smartphone size={24} />,
      title: "Diseño Responsive",
      description: "Sitios web que se adaptan perfectamente a todos los dispositivos, desde móviles hasta escritorio.",
      delay: 300
    },
    {
      icon: <Network size={24} />,
      title: "Optimización SEO",
      description: "Estrategias para mejorar la visibilidad en buscadores y aumentar el tráfico orgánico.",
      delay: 400
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Consultoría Digital",
      description: "Asesoramiento estratégico para la transformación digital de tu negocio o proyecto.",
      delay: 500
    }
  ];

  return (
    <section id="services" className="section bg-secondary/50 py-24">
      <div className="content-container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
            Nuestros Servicios
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Soluciones digitales para impulsar tu negocio
          </h2>
          <p className="text-foreground/70">
            Ofrecemos servicios integrales de diseño y desarrollo web, 
            adaptados a las necesidades específicas de cada cliente.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
