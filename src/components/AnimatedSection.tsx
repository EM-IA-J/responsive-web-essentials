import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-in-right' | 'fade-in-left' | 'scale-in' | 'fade-in-down';
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const AnimatedSection = ({
  children,
  animation = 'fade-in',
  delay = 0,
  threshold = 0.1,
  className = '',
  once = true,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Cuando el elemento es visible, establece isVisible a true
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          // Si once es true, deja de observar después de que se haya visto
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          // Si once es false, hace toggle del estado visible/no visible
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [delay, threshold, once]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        'transition-all duration-700 ease-out',
        {
          'opacity-0 translate-y-8': animation === 'fade-in' && !isVisible,
          'opacity-0 translate-x-8': animation === 'fade-in-right' && !isVisible, 
          'opacity-0 -translate-x-8': animation === 'fade-in-left' && !isVisible,
          'opacity-0 scale-95': animation === 'scale-in' && !isVisible,
          'opacity-0 -translate-y-10': animation === 'fade-in-down' && !isVisible,
          'opacity-100 translate-y-0 translate-x-0 scale-100': isVisible
        },
        className
      )}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
