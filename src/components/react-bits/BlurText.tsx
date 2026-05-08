import { type CSSProperties } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface BlurTextProps {
  text: string;
  className?: string;
  /** Initial delay before the first element starts (ms). */
  delay?: number;
  /** Delay added between successive elements (ms). */
  step?: number;
  /** Animate the text word-by-word or letter-by-letter. */
  animateBy?: 'word' | 'char';
  /** Whether elements drift in from above ("top") or below ("bottom"). */
  direction?: 'top' | 'bottom';
  /** Per-element transition duration (ms). */
  duration?: number;
  /** Initial blur radius in pixels. */
  blur?: number;
}

/**
 * React Bits — Blur text reveal.
 * Each word/character fades in with a blur and translation, staggered
 * across the run. Triggers once when the element enters the viewport.
 */
export function BlurText({
  text,
  className,
  delay = 0,
  step = 80,
  animateBy = 'word',
  direction = 'top',
  duration = 800,
  blur = 10,
}: BlurTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.2 });
  const tokens = animateBy === 'word' ? text.split(' ') : Array.from(text);
  const offset = direction === 'top' ? '-0.5em' : '0.5em';

  return (
    <span ref={ref} className={cn('inline-block', className)} aria-label={text}>
      {tokens.map((t, i) => {
        const style: CSSProperties = {
          display: 'inline-block',
          transitionProperty: 'opacity, transform, filter',
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDelay: `${delay + i * step}ms`,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : `translateY(${offset})`,
          filter: inView ? 'blur(0)' : `blur(${blur}px)`,
          willChange: 'opacity, transform, filter',
        };
        return (
          <span key={i} style={style} aria-hidden="true">
            {t}
            {animateBy === 'word' && i < tokens.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
}
