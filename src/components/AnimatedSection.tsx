
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  animation?: 'fade-in' | 'fade-in-right' | 'fade-in-left' | 'scale-in';
  once?: boolean;
}

const AnimatedSection = ({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  animation = 'fade-in',
  once = true,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold, once]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        {
          'opacity-0 translate-y-8': animation === 'fade-in' && !isVisible,
          'opacity-0 translate-x-8': animation === 'fade-in-right' && !isVisible, 
          'opacity-0 -translate-x-8': animation === 'fade-in-left' && !isVisible,
          'opacity-0 scale-95': animation === 'scale-in' && !isVisible,
          'opacity-100 translate-y-0 translate-x-0 scale-100': isVisible
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
