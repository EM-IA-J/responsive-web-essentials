import { useState } from 'react';
import { ExternalLink, Star, ChevronRight, FileImage } from 'lucide-react';
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
          src={`./img/${item.imageUrl}`}
          alt={item.title}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
       
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
    <section id="portfolio" className="section py-24">
      <div className="content-container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
            Explora mis proyectos
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trabajos creativos
          </h2>
          <p className="text-foreground/70">
            Una colección de diseños y proyectos que definen mi estilo y pasión por la creatividad.
            Cada trabajo representa una historia única y una solución personalizada.
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
              <h3 className="text-sm font-medium">Filtrar por especialidad:</h3>
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
              {showSvgProjects ? "Mostrando todos los proyectos" : "Mostrar todos"}
            </button>
          </div>
        </AnimatedSection>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
};

export default Portfolio;
