import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { portfolioItems } from '@/data/portfolioData';
import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/AnimatedSection';
import Portfolio from '@/components/Portfolio';

const Index = () => {
  // Set up intersection observer for animations
  useEffect(() => {
    // This is a fallback for browsers that don't support IntersectionObserver API
    // The AnimatedSection component handles most animations, but this is for any
    // elements with the animate-in-on-scroll class
    const handleScrollAnimation = () => {
      const elements = document.querySelectorAll('.animate-in-on-scroll');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        
        // Add is-visible class when element is in viewport
        if (elementTop < window.innerHeight - elementHeight / 3) {
          element.classList.add('is-visible');
        } else {
          element.classList.remove('is-visible');
        }
      });
    };

    // Initial check
    setTimeout(handleScrollAnimation, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScrollAnimation);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
