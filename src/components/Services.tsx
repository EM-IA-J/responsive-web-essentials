import { Code, Layout, Smartphone, Command, Network, Lightbulb, PlusCircle, MinusCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useState } from 'react';

const ServiceCard = ({ icon, title, description, benefits, delay = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <AnimatedSection delay={delay} animation="scale-in">
      <div className="service-card h-full bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-border/30">
        <div className="mb-5 inline-flex p-3 bg-primary/10 rounded-xl text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-foreground/70 mb-4">{description}</p>
        
        {/* Expandable benefits */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-sm font-medium text-primary mb-3"
        >
          {isExpanded ? (
            <>
              <MinusCircle size={16} className="mr-1" />
              Ocultar detalles
            </>
          ) : (
            <>
              <PlusCircle size={16} className="mr-1" />
              Ver detalles
            </>
          )}
        </button>
        
        {isExpanded && (
          <div className="mt-3 animate-fade-in">
            <h4 className="text-sm font-semibold mb-2">Lo que ofrecemos:</h4>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary text-lg leading-none mr-2">•</span>
                  <span className="text-sm text-foreground/70">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
};

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-border/30 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-lg font-medium">{question}</h3>
        {isOpen ? (
          <MinusCircle size={20} className="text-primary flex-shrink-0" />
        ) : (
          <PlusCircle size={20} className="text-primary flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-foreground/70 animate-fade-in">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Layout size={24} />,
      title: "Diseño Web UI/UX",
      description: "Diseños elegantes y funcionales que priorizan la experiencia del usuario y la estética visual para captar y retener visitantes.",
      benefits: [
        "Investigación de usuario y análisis de competencia",
        "Wireframes y prototipos interactivos",
        "Sistemas de diseño coherentes y escalables",
        "Tests de usabilidad y optimización continua",
        "Diseños adaptados a la identidad de marca"
      ],
      delay: 0
    },
    {
      icon: <Code size={24} />,
      title: "Desarrollo Frontend",
      description: "Implementación técnica perfecta con las tecnologías más modernas para un rendimiento óptimo y una experiencia de usuario fluida.",
      benefits: [
        "Desarrollo con React, Vue, Angular o tecnologías modernas",
        "Código limpio, mantenible y bien documentado",
        "Optimización de rendimiento y tiempos de carga",
        "Animaciones y transiciones fluidas",
        "Integración con sistemas de gestión de contenidos"
      ],
      delay: 100
    },
    {
      icon: <Command size={24} />,
      title: "Desarrollo Backend",
      description: "Soluciones robustas para gestionar datos, usuarios y funcionalidades avanzadas de forma segura y eficiente para tu aplicación.",
      benefits: [
        "APIs RESTful y GraphQL bien estructuradas",
        "Integración con servicios y APIs de terceros",
        "Bases de datos relacionales y NoSQL",
        "Autenticación y autorización seguras",
        "Escalabilidad y optimización de rendimiento"
      ],
      delay: 200
    },
    {
      icon: <Smartphone size={24} />,
      title: "Diseño Responsive",
      description: "Sitios web que se adaptan perfectamente a todos los dispositivos, desde móviles hasta escritorio, garantizando una experiencia consistente.",
      benefits: [
        "Estrategia 'mobile-first' para todos los desarrollos",
        "Pruebas en múltiples dispositivos y navegadores",
        "Optimización de imágenes y recursos para dispositivos móviles",
        "Accesibilidad en todas las pantallas",
        "Velocidad de carga optimizada para conexiones móviles"
      ],
      delay: 300
    },
    {
      icon: <Network size={24} />,
      title: "Optimización SEO",
      description: "Estrategias para mejorar la visibilidad en buscadores y aumentar el tráfico orgánico, posicionando tu web en los primeros resultados.",
      benefits: [
        "Auditorías SEO completas y plan de acción",
        "Optimización de palabras clave y contenido",
        "Optimización técnica (velocidad, estructura, etiquetas)",
        "Estrategia de backlinks y autoridad de dominio",
        "Seguimiento y reportes de posicionamiento"
      ],
      delay: 400
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Consultoría Digital",
      description: "Asesoramiento estratégico para la transformación digital de tu negocio o proyecto, ayudándote a tomar decisiones basadas en datos.",
      benefits: [
        "Análisis de necesidades digitales del negocio",
        "Planificación estratégica para presencia digital",
        "Recomendaciones para mejora de conversión",
        "Selección de tecnologías y plataformas",
        "Roadmap de implementación y crecimiento"
      ],
      delay: 500
    }
  ];

  const faqs = [
    {
      question: "¿Cuánto tiempo tarda en desarrollarse un proyecto web?",
      answer: "El tiempo de desarrollo varía según la complejidad del proyecto. Un sitio web básico puede estar listo en 2-3 semanas, mientras que proyectos más complejos como tiendas online o aplicaciones web pueden llevar de 2 a 4 meses. Siempre proporcionamos un cronograma detallado al inicio del proyecto."
    },
    {
      question: "¿Qué tecnologías utilizan para el desarrollo?",
      answer: "Utilizamos tecnologías modernas y de alto rendimiento como React, Vue.js, Next.js para frontend; Node.js, PHP, Python para backend; y sistemas de gestión de bases de datos como MongoDB, MySQL o PostgreSQL. La elección de tecnologías se adapta a las necesidades específicas de cada proyecto."
    },
    {
      question: "¿Incluyen mantenimiento después del lanzamiento?",
      answer: "Sí, ofrecemos planes de mantenimiento mensuales que incluyen actualizaciones de seguridad, corrección de errores, pequeñas modificaciones y soporte técnico. Estos planes son opcionales pero recomendados para mantener tu sitio web seguro y actualizado."
    },
    {
      question: "¿Cómo garantizan la calidad del código y diseño?",
      answer: "Seguimos metodologías ágiles con revisiones periódicas, implementamos pruebas automatizadas, realizamos auditorías de código, y trabajamos con estándares de diseño y desarrollo. Además, todos nuestros proyectos pasan por fases de testing rigurosas antes de la entrega final."
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
            Nuestro enfoque personalizado garantiza resultados que superan expectativas.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              benefits={service.benefits}
              delay={service.delay}
            />
          ))}
        </div>
        
        {/* Proceso de trabajo */}
        <AnimatedSection className="mb-20">
          <div className="bg-white p-8 rounded-2xl border border-border/30">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-2xl font-bold mb-4">Nuestro proceso de trabajo</h3>
              <p className="text-foreground/70">
                Seguimos una metodología estructurada para asegurar resultados óptimos en cada proyecto
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">1</div>
                <div className="pt-8 pb-4 px-4 bg-secondary/30 rounded-lg h-full">
                  <h4 className="font-semibold mb-2">Descubrimiento</h4>
                  <p className="text-sm text-foreground/70">Analizamos tus necesidades, objetivos y el mercado para definir la estrategia digital óptima.</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">2</div>
                <div className="pt-8 pb-4 px-4 bg-secondary/30 rounded-lg h-full">
                  <h4 className="font-semibold mb-2">Diseño</h4>
                  <p className="text-sm text-foreground/70">Creamos wireframes y diseños visuales que reflejan tu marca y optimizan la experiencia del usuario.</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">3</div>
                <div className="pt-8 pb-4 px-4 bg-secondary/30 rounded-lg h-full">
                  <h4 className="font-semibold mb-2">Desarrollo</h4>
                  <p className="text-sm text-foreground/70">Implementamos el diseño con código limpio y eficiente, integrando todas las funcionalidades requeridas.</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">4</div>
                <div className="pt-8 pb-4 px-4 bg-secondary/30 rounded-lg h-full">
                  <h4 className="font-semibold mb-2">Lanzamiento</h4>
                  <p className="text-sm text-foreground/70">Realizamos pruebas exhaustivas, optimizamos y lanzamos tu proyecto con soporte continuo.</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Preguntas frecuentes */}
        <AnimatedSection className="mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-4">Preguntas frecuentes</h3>
              <p className="text-foreground/70">
                Respuestas a las dudas más comunes sobre nuestros servicios
              </p>
            </div>
            
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <FAQ key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        {/* CTA */}
        <AnimatedSection animation="fade-in">
          <div className="bg-primary/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar tu proyecto?</h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Contáctanos hoy mismo para una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
            </p>
            <a href="#contact" className="btn-primary">Solicitar presupuesto</a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
