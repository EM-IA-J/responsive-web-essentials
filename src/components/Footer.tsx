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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="py-6">
        <div className="content-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">&copy; {currentYear} Andrea Sanguino. Todos los derechos reservados.</p>
            </div>
            
            <div className="flex space-x-4 items-center">
              <a href="#" className="text-primary-foreground hover:text-primary-foreground/80 text-sm">
                Inicio
              </a>
              <a href="#" className="text-primary-foreground hover:text-primary-foreground/80 text-sm">
                CV
              </a>
              <a href="#" className="text-primary-foreground hover:text-primary-foreground/80 text-sm">
                Portfolio
              </a>
              <a href="#" className="flex items-center text-primary-foreground hover:text-primary-foreground/80 text-sm">
                <Globe size={14} className="mr-1" /> www.andreasanguino.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
