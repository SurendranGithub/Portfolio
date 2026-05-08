import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ShuffleTextProps {
  text: string;
  className?: string;
  /** Total cycling duration per character (ms) */
  duration?: number;
  /** Delay between each character starting (ms) */
  stagger?: number;
  /** Initial delay before the first character begins (ms) */
  delay?: number;
  /** How often each character swaps to a new random glyph during cycling (ms) */
  swapInterval?: number;
  /** Pool of characters used during cycling */
  charset?: string;
}

const DEFAULT_CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * React Bits — Shuffle text animation.
 * Each character cycles through random glyphs before settling on the final letter,
 * staggered left-to-right. Pure DOM, no animation library.
 */
export function ShuffleText({
  text,
  className,
  duration = 450,
  stagger = 55,
  delay = 0,
  swapInterval = 40,
  charset = DEFAULT_CHARSET,
}: ShuffleTextProps) {
  const [display, setDisplay] = useState<string[]>(() =>
    text.split('').map((c) => (c === ' ' ? ' ' : ' ')),
  );

  useEffect(() => {
    const chars = text.split('');
    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    setDisplay(chars.map((c) => (c === ' ' ? ' ' : ' ')));

    chars.forEach((char, i) => {
      if (char === ' ') {
        const t = setTimeout(() => {
          setDisplay((prev) => {
            const next = [...prev];
            next[i] = ' ';
            return next;
          });
        }, delay + i * stagger);
        timers.push(t);
        return;
      }

      const startAt = delay + i * stagger;

      const startTimer = setTimeout(() => {
        const intervalId = setInterval(() => {
          setDisplay((prev) => {
            const next = [...prev];
            next[i] = charset[Math.floor(Math.random() * charset.length)];
            return next;
          });
        }, swapInterval);
        intervals.push(intervalId);

        const stopTimer = setTimeout(() => {
          clearInterval(intervalId);
          setDisplay((prev) => {
            const next = [...prev];
            next[i] = char;
            return next;
          });
        }, duration);
        timers.push(stopTimer);
      }, startAt);

      timers.push(startTimer);
    });

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [text, duration, stagger, delay, swapInterval, charset]);

  return (
    <span className={cn('inline-block', className)} aria-label={text}>
      {display.map((c, i) => (
        <span key={i} className="inline-block" aria-hidden="true">
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  );
}
