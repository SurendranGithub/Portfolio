import { useEffect, useRef, useState } from 'react';

interface Options {
  /** Viewport position (0-1) where progress reaches 0 — element top at this line. */
  startEdge?: number;
  /** Viewport position (0-1) where progress reaches 1 — element bottom at this line. */
  endEdge?: number;
}

/**
 * Returns scroll progress (0..1) of an element passing through the viewport.
 * Updates via requestAnimationFrame on scroll, so it stays in lockstep
 * with the user's input without dropping frames.
 */
export function useScrollProgress<T extends HTMLElement>(
  options: Options = {},
) {
  const { startEdge = 0.75, endEdge = 0.25 } = options;
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * startEdge;
      const end = vh * endEdge;
      const traveled = start - rect.top;
      const total = rect.height + (start - end);
      const p = total > 0 ? Math.max(0, Math.min(1, traveled / total)) : 0;
      setProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [startEdge, endEdge]);

  return { ref, progress } as const;
}
