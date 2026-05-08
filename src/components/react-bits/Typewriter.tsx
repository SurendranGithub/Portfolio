import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps {
  text: string;
  /** Time per character (ms). */
  speed?: number;
  /** Delay before typing begins (ms). */
  startDelay?: number;
  className?: string;
}

/**
 * Types out a string one character at a time.
 * Mirrors a terminal-style reveal — pure setTimeout, no animation library.
 */
export function Typewriter({
  text,
  speed = 70,
  startDelay = 0,
  className,
}: TypewriterProps) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    setShown('');
    let i = 0;
    let tickTimer: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      i += 1;
      setShown(text.slice(0, i));
      if (i < text.length) {
        tickTimer = setTimeout(tick, speed);
      }
    };

    const startTimer = setTimeout(tick, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (tickTimer) clearTimeout(tickTimer);
    };
  }, [text, speed, startDelay]);

  return <span className={cn(className)}>{shown}</span>;
}
