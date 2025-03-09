import { useState } from 'react';
import { ExternalLink, Star, ChevronRight, Quote, FileImage } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { Link } from 'react-router-dom';
import { portfolioItems } from '@/data/portfolioData';

// Todas las categorías únicas de los items
const categories = ["Todos", ...Array.from(new Set(portfolioItems.map(item => item.category)))];

// Todas las etiquetas únicas
const allTags = Array.from(new Set(portfolioItems.flatMap(item => item.tags)));

const PortfolioCard = ({ item }) => (
  <AnimatedSection animation="scale-in">
    <Link to={`/portfolio/${item.id}`} className="portfolio-item group block">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Badge para proyectos con SVG */}
        {item.svgFiles && (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs flex items-center shadow-lg">
            <FileImage size={14} className="mr-1" />
            Experiencia SVG
          </div>
        )}
        <div className="portfolio-overlay">
          <div className="mt-auto">
            <span className="text-sm text-white/70">{item.category}</span>
            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-white/80 mb-3 line-clamp-2">{item.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-white/20 rounded-full text-xs text-white backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center text-white hover:text-primary-foreground transition-colors text-sm">
              {item.svgFiles ? "Ver experiencia SVG" : "Ver detalles"} <ChevronRight size={14} className="ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  </AnimatedSection>
);

const TestimonialCard = ({ testimonial }) => (
  <AnimatedSection animation="fade-in">
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border/20">
      <div className="flex gap-1 mb-4 text-amber-400">
        {[...Array(testimonial.stars)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      <div className="mb-4 relative">
        <Quote className="absolute -top-2 -left-2 text-primary/10" size={24} />
        <p className="text-foreground/80 italic relative z-10">{testimonial.text}</p>
      </div>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-foreground/60">{testimonial.position}</p>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

const testimonials = [
  {
    id: 1,
    text: "El equipo entendió perfectamente nuestras necesidades y entregó un sitio web que superó nuestras expectativas. El diseño es magnífico y la funcionalidad impecable.",
    name: "Ana Rodríguez",
    position: "CEO de FashionBrand",
    stars: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    text: "La colaboración con este estudio ha sido clave para el éxito de nuestro lanzamiento. Su enfoque estratégico y atención al detalle transformó nuestra presencia digital.",
    name: "Carlos Mendoza",
    position: "Director de Marketing en TechLaunch",
    stars: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    text: "Desde que rediseñaron nuestra web, hemos visto un incremento del 40% en conversiones. Su conocimiento en UX y optimización ha sido invaluable para nuestro negocio.",
    name: "Elena Torres",
    position: "CMO de ConsultPro",
    stars: 5,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 4,
    text: "El proceso de trabajo fue transparente y eficiente. Cumplieron con los plazos y presupuesto acordados, y su soporte post-lanzamiento ha sido excepcional.",
    name: "Javier Sánchez",
    position: "CTO de DataViz",
    stars: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  }
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeTags, setActiveTags] = useState([]);
  const [showAllTags, setShowAllTags] = useState(false);
  const [showSvgProjects, setShowSvgProjects] = useState(false);
  
  const displayedTags = showAllTags ? allTags : allTags.slice(0, 6);

  const handleTagToggle = (tag) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const filteredItems = portfolioItems
    .filter(item => activeCategory === "Todos" || item.category === activeCategory)
    .filter(item => activeTags.length === 0 || activeTags.some(tag => item.tags.includes(tag)))
    .filter(item => !showSvgProjects || (item.svgFiles && item.svgFiles.length > 0));

  return (
    <section id="portfolio" className="section bg-white py-24">
      <div className="content-container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
            Nuestro Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Proyectos destacados
          </h2>
          <p className="text-foreground/70">
            Una muestra de nuestros trabajos más recientes y representativos, 
            que reflejan nuestra pasión por el diseño y la innovación.
            Cada proyecto es único y está diseñado para cumplir objetivos específicos.
          </p>
        </AnimatedSection>

        {/* Category filter */}
        <AnimatedSection className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground/70 hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </AnimatedSection>
        
        {/* Tags filter */}
        <AnimatedSection className="mb-6">
          <div className="bg-secondary/30 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Filtrar por tecnología:</h3>
              <button 
                onClick={() => setShowAllTags(!showAllTags)}
                className="text-primary text-xs font-medium"
              >
                {showAllTags ? "Mostrar menos" : "Mostrar todas"}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {displayedTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activeTags.includes(tag)
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-white text-foreground/70 hover:bg-secondary/50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        {/* SVG Projects Toggle */}
        <AnimatedSection className="mb-12">
          <div className="flex justify-center">
            <button
              onClick={() => setShowSvgProjects(!showSvgProjects)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                showSvgProjects
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground/70 hover:bg-secondary"
              }`}
            >
              <FileImage size={16} className="mr-2" />
              {showSvgProjects ? "Mostrando solo proyectos SVG" : "Mostrar proyectos SVG"}
            </button>
          </div>
        </AnimatedSection>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <PortfolioCard 
                key={item.id} 
                item={item}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-lg text-foreground/70">No se encontraron proyectos con los filtros seleccionados.</p>
              <button 
                onClick={() => {
                  setActiveCategory("Todos");
                  setActiveTags([]);
                  setShowSvgProjects(false);
                }}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
        
        {/* Testimonials */}
        <AnimatedSection className="mb-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-2xl font-bold mb-4">Lo que dicen nuestros clientes</h3>
            <p className="text-foreground/70">
              Opiniones de quienes han confiado en nosotros para sus proyectos digitales
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </AnimatedSection>
        
        {/* CTA */}
        <AnimatedSection>
          <div className="bg-gradient-to-r from-primary/80 to-primary rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">¿Listo para crear tu próximo proyecto?</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos con una solución digital a medida.
            </p>
            <a href="#contact" className="px-6 py-3 bg-white text-primary rounded-full font-medium hover:bg-white/90 transition-colors">
              Hablemos de tu proyecto
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Portfolio;
