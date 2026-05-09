import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MagicBentoProps {
  children: ReactNode;
  className?: string;
}

/**
 * React Bits — Magic Bento.
 * Wraps a grid of cards. A subtle global spotlight follows the cursor
 * across the entire grid; each card additionally has its own cursor-tracking
 * highlight + animated border glow.
 */
export function MagicBento({ children, className }: MagicBentoProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--bento-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--bento-y', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={ref} className={cn('group/bento relative isolate', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100"
        style={{
          background:
            'radial-gradient(circle 520px at var(--bento-x, 50%) var(--bento-y, 50%), hsl(var(--accent) / 0.06), transparent 60%)',
        }}
      />
      {children}
    </div>
  );
}

interface MagicBentoCardProps {
  children: ReactNode;
  className?: string;
}

export function MagicBentoCard({ children, className }: MagicBentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--card-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--card-y', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'group/card relative overflow-hidden rounded-2xl border border-border bg-card/40 transition-colors duration-300 hover:border-border/70',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            'radial-gradient(circle 260px at var(--card-x, 50%) var(--card-y, 50%), hsl(var(--accent) / 0.12), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            'radial-gradient(circle 240px at var(--card-x, 50%) var(--card-y, 50%), hsl(var(--accent) / 0.5), transparent 60%)',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
