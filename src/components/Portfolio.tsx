
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const portfolioItems = [
  {
    id: 1,
    title: "Tienda Online Premium",
    category: "Ecommerce",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 2,
    title: "Aplicación de Finanzas",
    category: "App Web",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 3,
    title: "Web Corporativa",
    category: "Sitio Web",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 4,
    title: "Dashboard Interactivo",
    category: "Aplicación",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 5,
    title: "Landing Page Producto",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 6,
    title: "Blog de Contenidos",
    category: "Sitio Web",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#"
  }
];

const categories = ["Todos", "Sitio Web", "Ecommerce", "Aplicación", "Marketing", "App Web"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredItems = activeCategory === "Todos"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

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
          </p>
        </AnimatedSection>

        {/* Category filter */}
        <AnimatedSection className="flex flex-wrap items-center justify-center gap-3 mb-12">
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

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 100} animation="scale-in">
              <div className="portfolio-item group">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="portfolio-overlay">
                  <div className="mt-auto">
                    <span className="text-sm text-white/70">{item.category}</span>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <a
                      href={item.link}
                      className="inline-flex items-center text-white hover:text-primary-foreground transition-colors text-sm"
                    >
                      Ver proyecto <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
