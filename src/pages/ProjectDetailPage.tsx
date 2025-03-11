import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { portfolioItems } from '@/data/portfolioData';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [svgContents, setSvgContents] = useState([]);
  const [hasSvgError, setHasSvgError] = useState(false);
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef(null);

  // Timer para ocultar los controles
  let hideControlsTimer = null;

  // Obtener los datos del proyecto
  useEffect(() => {
    setLoading(true);
    const foundProject = portfolioItems.find(item => item.id.toString() === projectId);
    setProject(foundProject || null);
    setSvgContents([]);
    setCurrentSvgIndex(0);
    setLoading(false);
  }, [projectId]);

  // Cargar todos los SVGs del proyecto
  useEffect(() => {
    if (!project) return;

    const loadAllSvgs = async () => {
      try {
        // Si el proyecto tiene archivos SVG específicos
        if (project.svgFiles && project.svgFiles.length > 0) {
          const loadedSvgs = await Promise.all(
            project.svgFiles.map(async (svgFileName) => {
              const response = await fetch(`./svg/${svgFileName}`);
              return await response.text();
            })
          );
          
          setSvgContents(loadedSvgs);
          setHasSvgError(false);
        } else {
          // Si no hay archivos SVG específicos, mostrar un mensaje de error
          setHasSvgError(true);
        }
      } catch (error) {
        console.error('Error al cargar los SVGs:', error);
        setHasSvgError(true);
      }
    };

    loadAllSvgs();
  }, [project]);

  // Función para navegar al SVG anterior
  const goToPreviousSvg = () => {
    if (currentSvgIndex > 0) {
      setCurrentSvgIndex(currentSvgIndex - 1);
    }
  };

  // Función para navegar al SVG siguiente
  const goToNextSvg = () => {
    if (svgContents.length > 0 && currentSvgIndex < svgContents.length - 1) {
      setCurrentSvgIndex(currentSvgIndex + 1);
    }
  };

  // Función para mostrar/ocultar los controles al mover el ratón
  const handleMouseMove = () => {
    setShowControls(true);
    
    // Limpiar el timer anterior si existe
    if (hideControlsTimer) {
      clearTimeout(hideControlsTimer);
    }
    
    // Establecer un nuevo timer para ocultar los controles después de 3 segundos
    hideControlsTimer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Configurar el event listener para el movimiento del ratón
  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('mousemove', handleMouseMove);
      
      // Mostrar controles inicialmente y configurar el timer para ocultarlos
      setShowControls(true);
      hideControlsTimer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
        if (hideControlsTimer) {
          clearTimeout(hideControlsTimer);
        }
      };
    }
  }, []);

  // Añadir listeners de teclado para navegación con flechas
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNextSvg();
      } else if (e.key === 'ArrowLeft') {
        goToPreviousSvg();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSvgIndex, svgContents.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary/5">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Proyecto no encontrado</h1>
            <p className="text-foreground/70 mb-6">El proyecto que buscas no existe o ha sido eliminado.</p>
            <button 
              onClick={() => navigate('/portfolio')}
              className="btn-primary"
            >
              Volver al portfolio
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main 
        ref={containerRef}
        className="flex-1 bg-black relative no-scrollbar"
      >
        {/* Mostrar SVG actual */}
        {hasSvgError ? (
          <div className="w-full h-screen flex items-center justify-center text-white">
            <p className="text-xl">No se pudo cargar el SVG para este proyecto.</p>
          </div>
        ) : (
          svgContents.length > 0 && (
            <div 
              className="h-screen w-full"
              dangerouslySetInnerHTML={{ __html: svgContents[currentSvgIndex] }}
            />
          )
        )}
        
        {/* Overlay con información del proyecto - visible según showControls */}
        <div 
          className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-10 transition-opacity duration-500"
          style={{ opacity: showControls ? 1 : 0 }}
        >
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="fade-in">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h1>
                  <p className="text-white/80 mb-4 max-w-2xl">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => navigate('/portfolio')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center transition-colors text-white"
                >
                  <ArrowLeft size={18} className="mr-2" /> Volver al portfolio
                </button>
              </div>
              
              {project.svgFiles && project.svgFiles.length > 1 && (
                <p className="text-white/60 text-sm mt-2">
                  Usa las flechas para navegar entre SVGs
                  <span className="ml-2">({currentSvgIndex + 1}/{project.svgFiles.length})</span>
                </p>
              )}
            </AnimatedSection>
          </div>
        </div>
        
        {/* Botones de navegación entre SVGs */}
        {project.svgFiles && project.svgFiles.length > 1 && (
          <div 
            className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-500"
            style={{ opacity: showControls ? 1 : 0 }}
          >
            {/* Botón anterior */}
            {currentSvgIndex > 0 && (
              <button
                onClick={goToPreviousSvg}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors pointer-events-auto"
                aria-label="SVG anterior"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            
            {/* Botón siguiente */}
            {currentSvgIndex < svgContents.length - 1 && (
              <button
                onClick={goToNextSvg}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors pointer-events-auto"
                aria-label="Siguiente SVG"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectDetailPage; 