import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Facebook, Send, Globe, Clock, Calendar } from 'lucide-react';
import { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitted: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simular envío de formulario
    setTimeout(() => {
      // En una implementación real, aquí iría el código para enviar el formulario a un backend
      setFormState(prev => ({
        ...prev,
        submitted: true
      }));
    }, 1000);
  };

  if (formState.submitted) {
    return (
      <div className="bg-primary/10 p-6 rounded-lg text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">¡Mensaje enviado!</h3>
        <p className="text-foreground/70 mb-4">
          Gracias por contactarnos. Responderemos a tu mensaje lo antes posible.
        </p>
        <button 
          onClick={() => setFormState(prev => ({ ...prev, submitted: false, name: '', email: '', subject: '', message: '' }))}
          className="text-primary hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="tu@email.com"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
          Asunto
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Asunto de tu mensaje"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-2 rounded border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Cuéntanos sobre tu proyecto..."
        ></textarea>
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          Enviar mensaje
          <Send size={16} className="ml-2" />
        </button>
      </div>
    </form>
  );
};

const BlogPost = ({ title, date, imageUrl }) => (
  <div className="flex items-start">
    <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 mr-4">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
    <div>
      <h4 className="font-medium text-primary-foreground hover:text-primary-foreground/80 transition-colors mb-1 line-clamp-2">
        <a href="#">{title}</a>
      </h4>
      <p className="text-xs text-primary-foreground/60 flex items-center">
        <Calendar size={12} className="mr-1" /> {date}
      </p>
    </div>
  </div>
);

interface FooterProps {
  hideContactForm?: boolean;
}

const Footer = ({ hideContactForm = false }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      {/* Sección de contacto - solo se muestra si hideContactForm es false */}
      {!hideContactForm && (
        <div className="bg-white text-foreground py-16">
          <div className="content-container">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
                Contacto
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Tienes un proyecto en mente?
              </h2>
              <p className="text-foreground/70">
                Estamos listos para hacer realidad tu visión digital. Contáctanos hoy mismo para comenzar a trabajar juntos.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <AnimatedSection animation="fade-in-right">
                <div className="bg-white shadow-soft rounded-xl p-8 h-full">
                  <h3 className="text-2xl font-bold mb-6">Envíanos un mensaje</h3>
                  <ContactForm />
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-in-left">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>
                    <ul className="space-y-6">
                      <li className="flex items-start">
                        <div className="mr-4 p-3 bg-primary/10 rounded-lg text-primary">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Ubicación</h4>
                          <p className="text-foreground/70">Calle Principal 123, Madrid, España</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-4 p-3 bg-primary/10 rounded-lg text-primary">
                          <Mail size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Email</h4>
                          <p className="text-foreground/70">
                            <a href="mailto:info@estudio.com" className="hover:text-primary transition-colors">
                              info@estudio.com
                            </a>
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-4 p-3 bg-primary/10 rounded-lg text-primary">
                          <Phone size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Teléfono</h4>
                          <p className="text-foreground/70">
                            <a href="tel:+34611222333" className="hover:text-primary transition-colors">
                              +34 611 222 333
                            </a>
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-4 p-3 bg-primary/10 rounded-lg text-primary">
                          <Clock size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Horario</h4>
                          <p className="text-foreground/70">Lunes a Viernes: 9:00 - 18:00</p>
                          <p className="text-foreground/70">Fin de semana: Cerrado</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Síguenos</h3>
                    <div className="flex space-x-4">
                      <a 
                        href="#" 
                        className="w-10 h-10 rounded-full bg-secondary/70 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                        aria-label="Instagram"
                      >
                        <Instagram size={18} />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 rounded-full bg-secondary/70 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                        aria-label="Twitter"
                      >
                        <Twitter size={18} />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 rounded-full bg-secondary/70 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={18} />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 rounded-full bg-secondary/70 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                        aria-label="Facebook"
                      >
                        <Facebook size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      )}

      {/* Main footer content */}
      <div className="content-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Estudio</h3>
            <p className="text-primary-foreground/80 mb-6">
              Creamos experiencias digitales innovadoras
              que conectan marcas con sus audiencias a
              través de diseño y tecnología avanzada.
            </p>
            <div className="flex flex-col space-y-3">
              <span className="flex items-center text-primary-foreground/70 text-sm">
                <Globe size={16} className="mr-2" /> www.estudio.com
              </span>
              <span className="flex items-center text-primary-foreground/70 text-sm">
                <MapPin size={16} className="mr-2" /> Madrid, España
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center">
                  <span className="w-2 h-2 bg-primary-foreground/30 rounded-full mr-2"></span>
                  Inicio
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center">
                  <span className="w-2 h-2 bg-primary-foreground/30 rounded-full mr-2"></span>
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center">
                  <span className="w-2 h-2 bg-primary-foreground/30 rounded-full mr-2"></span>
                  Servicios
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center">
                  <span className="w-2 h-2 bg-primary-foreground/30 rounded-full mr-2"></span>
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center">
                  <span className="w-2 h-2 bg-primary-foreground/30 rounded-full mr-2"></span>
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Blog posts */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Últimos Artículos</h4>
            <div className="space-y-4">
              <BlogPost 
                title="Tendencias de diseño web para 2023"
                date="15 Mayo, 2023"
                imageUrl="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              />
              <BlogPost 
                title="Cómo mejorar la experiencia de usuario"
                date="3 Abril, 2023"
                imageUrl="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              />
              <BlogPost 
                title="Optimización para motores de búsqueda"
                date="21 Marzo, 2023"
                imageUrl="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              />
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-primary-foreground/80 mb-4">
              Suscríbete para recibir noticias, consejos y ofertas especiales.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="px-4 py-2 rounded-l-md text-foreground focus:outline-none w-full"
                />
                <button 
                  type="submit" 
                  className="bg-white text-primary hover:bg-primary-foreground/10 px-4 rounded-r-md"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
            <p className="text-primary-foreground/60 text-xs">
              Al suscribirte, aceptas nuestra política de privacidad. 
              No enviamos spam.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="content-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/70 text-sm">
              &copy; {currentYear} Estudio Web. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors">
                Aviso Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
