import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowLeft, ChevronLeft, ChevronRight, Image, Video, FileImage } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { portfolioItems, PortfolioItem } from '@/data/portfolioData';

// Enumeración para los tipos de contenido multimedia
enum MediaType {
  SVG = 'svg',
  IMAGE = 'image',
  VIDEO = 'video'
}

// Tipo para los elementos multimedia
interface MediaItem {
  type: MediaType;
  src: string;
  content?: string; // Para SVGs que se cargan como texto
}

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Timer para ocultar los controles
  let hideControlsTimer: NodeJS.Timeout | null = null;

  // Obtener los datos del proyecto
  useEffect(() => {
    setLoading(true);
    const foundProject = portfolioItems.find(item => item.id.toString() === projectId);
    setProject(foundProject || null);
    setMediaItems([]);
    setCurrentMediaIndex(0);
    setLoadError(false);
    setLoading(false);
  }, [projectId]);

  // Cargar todos los elementos multimedia del proyecto
  useEffect(() => {
    if (!project) return;

    const loadAllMedia = async () => {
      try {
        const mediaCollection: MediaItem[] = [];
        
        // Cargar SVGs
        if (project.svgFiles && project.svgFiles.length > 0) {
          const loadedSvgs = await Promise.all(
            project.svgFiles.map(async (svgFileName) => {
              try {
                const response = await fetch(`./svg/${svgFileName}`);
                const svgContent = await response.text();
                return {
                  type: MediaType.SVG,
                  src: `./svg/${svgFileName}`,
                  content: svgContent
                };
              } catch (error) {
                console.error(`Error al cargar SVG ${svgFileName}:`, error);
                return null;
              }
            })
          );
          
          // Filtrar los SVGs que se cargaron correctamente
          mediaCollection.push(...loadedSvgs.filter(svg => svg !== null) as MediaItem[]);
        }
        
        // Añadir imágenes adicionales
        if (project.additionalImages && project.additionalImages.length > 0) {
          const imageItems = project.additionalImages.map(imageName => ({
            type: MediaType.IMAGE,
            src: `./img/${imageName}`
          }));
          mediaCollection.push(...imageItems);
        }
        
        // Añadir videos
        if (project.videos && project.videos.length > 0) {
          const videoItems = project.videos.map(videoName => ({
            type: MediaType.VIDEO,
            src: `./videos/${videoName}`
          }));
          mediaCollection.push(...videoItems);
        }
        
        setMediaItems(mediaCollection);
        setLoadError(mediaCollection.length === 0);
      } catch (error) {
        console.error('Error al cargar los elementos multimedia:', error);
        setLoadError(true);
      }
    };

    loadAllMedia();
  }, [project]);

  // Función para navegar al elemento multimedia anterior
  const goToPreviousMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  // Función para navegar al elemento multimedia siguiente
  const goToNextMedia = () => {
    if (mediaItems.length > 0 && currentMediaIndex < mediaItems.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextMedia();
      } else if (e.key === 'ArrowLeft') {
        goToPreviousMedia();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentMediaIndex, mediaItems.length]);

  // Renderizar el elemento multimedia actual
  const renderCurrentMedia = () => {
    if (mediaItems.length === 0 || loadError) {
      return (
        <div className="w-full h-screen flex items-center justify-center text-white">
          <p className="text-xl">No se pudo cargar el contenido multimedia para este proyecto.</p>
        </div>
      );
    }

    const currentMedia = mediaItems[currentMediaIndex];
    
    switch (currentMedia.type) {
      case MediaType.SVG:
        return (
          <div 
            className="h-screen w-full"
            dangerouslySetInnerHTML={{ __html: currentMedia.content || '' }}
          />
        );
      
      case MediaType.IMAGE:
        return (
          <div className="h-screen w-full flex items-center justify-center bg-black">
            <img 
              src={currentMedia.src} 
              alt={project?.title} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        );
      
      case MediaType.VIDEO:
        return (
          <div className="h-screen w-full flex items-center justify-center bg-black">
            <video 
              src={currentMedia.src} 
              controls 
              autoPlay 
              className="max-h-full max-w-full"
            >
              Tu navegador no soporta la reproducción de videos.
            </video>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-screen flex items-center justify-center text-white">
            <p className="text-xl">Tipo de contenido no soportado.</p>
          </div>
        );
    }
  };

  // Obtener el ícono correspondiente al tipo de medio actual
  const getCurrentMediaTypeIcon = () => {
    if (mediaItems.length === 0) return null;
    
    const currentMedia = mediaItems[currentMediaIndex];
    switch (currentMedia.type) {
      case MediaType.SVG:
        return <FileImage size={16} className="mr-1" />;
      case MediaType.IMAGE:
        return <Image size={16} className="mr-1" />;
      case MediaType.VIDEO:
        return <Video size={16} className="mr-1" />;
      default:
        return null;
    }
  };

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
        {/* Mostrar el elemento multimedia actual */}
        {renderCurrentMedia()}
        
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
              
              {mediaItems.length > 1 && (
                <p className="text-white/60 text-sm mt-2 flex items-center">
                  {getCurrentMediaTypeIcon()}
                  Usa las flechas para navegar entre elementos
                  <span className="ml-2">({currentMediaIndex + 1}/{mediaItems.length})</span>
                </p>
              )}
            </AnimatedSection>
          </div>
        </div>
        
        {/* Botones de navegación entre elementos multimedia */}
        {mediaItems.length > 1 && (
          <div 
            className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-500"
            style={{ opacity: showControls ? 1 : 0 }}
          >
            {/* Botón anterior */}
            {currentMediaIndex > 0 && (
              <button
                onClick={goToPreviousMedia}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors pointer-events-auto"
                aria-label="Elemento anterior"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            
            {/* Botón siguiente */}
            {currentMediaIndex < mediaItems.length - 1 && (
              <button
                onClick={goToNextMedia}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors pointer-events-auto"
                aria-label="Siguiente elemento"
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