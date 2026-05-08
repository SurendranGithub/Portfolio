import { type CSSProperties, type ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

/**
 * React Bits-style entrance reveal — opacity + translateY with a calm ease.
 * Triggers once when the element enters the viewport.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 600,
  y = 12,
  className,
}: FadeInProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const style: CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    transitionDelay: `${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
    willChange: 'opacity, transform',
  };

  return (
    <div ref={ref} style={style} className={cn(className)}>
      {children}
    </div>
  );
}
