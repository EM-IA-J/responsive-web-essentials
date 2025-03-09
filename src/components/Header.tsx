
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Reset body overflow when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled ? 'glass-effect' : 'bg-transparent'
      )}
    >
      <div className="content-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-2xl font-display font-bold">
            Estudio
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="nav-item active">Inicio</a>
            <a href="#about" className="nav-item">Sobre Nosotros</a>
            <a href="#services" className="nav-item">Servicios</a>
            <a href="#portfolio" className="nav-item">Portfolio</a>
            <a href="#contact" className="nav-item">Contacto</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          'fixed inset-0 pt-20 bg-background z-40 transition-transform duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col items-center gap-6 p-6">
          <a 
            href="#home" 
            className="text-xl py-3 w-full text-center border-b border-border/20" 
            onClick={toggleMobileMenu}
          >
            Inicio
          </a>
          <a 
            href="#about" 
            className="text-xl py-3 w-full text-center border-b border-border/20" 
            onClick={toggleMobileMenu}
          >
            Sobre Nosotros
          </a>
          <a 
            href="#services" 
            className="text-xl py-3 w-full text-center border-b border-border/20" 
            onClick={toggleMobileMenu}
          >
            Servicios
          </a>
          <a 
            href="#portfolio" 
            className="text-xl py-3 w-full text-center border-b border-border/20" 
            onClick={toggleMobileMenu}
          >
            Portfolio
          </a>
          <a 
            href="#contact" 
            className="text-xl py-3 w-full text-center" 
            onClick={toggleMobileMenu}
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
