import { useEffect, useRef, useState } from 'react';

/**
 * Observe when an element enters the viewport.
 * Sets `inView` to true once and disconnects — animations are
 * one-shot to keep things calm.
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const optsRef = useRef(options);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px', ...optsRef.current },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView } as const;
}
