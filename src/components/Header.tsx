import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if dark mode is enabled on load
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="content-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-primary">
            And<span className="text-foreground">Drew</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
              Inicio
            </Link>
            <Link to="/servicios" className={`nav-item ${isActive("/servicios") ? "active" : ""}`}>
              Servicios
            </Link>
            <Link to="/portfolio" className={`nav-item ${isActive("/portfolio") ? "active" : ""}`}>
              Portfolio
            </Link>
            <Link to="/nosotros" className={`nav-item ${isActive("/nosotros") ? "active" : ""}`}>
              Nosotros
            </Link>
            <Link
              to="/contacto"
              className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-full text-sm font-medium transition-colors"
            >
              Contacto <ChevronRight size={16} className="inline ml-1" />
            </Link>
            
            {/* Dark mode switch */}
            <button 
              onClick={toggleDarkMode} 
              className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Mobile menu button and dark mode switch for mobile */}
          <div className="md:hidden flex items-center gap-2">
            {/* Dark mode switch for mobile */}
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
              className="text-foreground p-2 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "60px" }}
      >
        <div className="flex flex-col p-6 space-y-4">
          <Link
            to="/"
            className={`text-lg font-medium px-4 py-3 rounded-lg ${
              isActive("/") ? "bg-primary/10 text-primary" : "text-foreground"
            }`}
          >
            Inicio
          </Link>
          <Link
            to="/servicios"
            className={`text-lg font-medium px-4 py-3 rounded-lg ${
              isActive("/servicios") ? "bg-primary/10 text-primary" : "text-foreground"
            }`}
          >
            Servicios
          </Link>
          <Link
            to="/portfolio"
            className={`text-lg font-medium px-4 py-3 rounded-lg ${
              isActive("/portfolio") ? "bg-primary/10 text-primary" : "text-foreground"
            }`}
          >
            Portfolio
          </Link>
          <Link
            to="/nosotros"
            className={`text-lg font-medium px-4 py-3 rounded-lg ${
              isActive("/nosotros") ? "bg-primary/10 text-primary" : "text-foreground"
            }`}
          >
            Nosotros
          </Link>
          <Link
            to="/contacto"
            className="bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-4 rounded-lg text-center font-medium mt-4"
          >
            Contacto
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
