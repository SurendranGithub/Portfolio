import { Children, isValidElement, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  /** Sticky offset of the first card from the top of the viewport (px). */
  topOffset?: number;
  /** Additional offset added per card index — creates the visible "stack" gap. */
  stackOffset?: number;
}

/**
 * React Bits — Scroll Stack.
 * Cards stick at progressively lower top offsets as the user scrolls,
 * stacking on top of each other like a deck of cards.
 */
export function ScrollStack({
  children,
  className,
  topOffset = 96,
  stackOffset = 28,
}: ScrollStackProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div className={cn('relative', className)}>
      {items.map((child, i) => (
        <div
          key={i}
          className="sticky pt-6 first:pt-0"
          style={{ top: `${topOffset + i * stackOffset}px` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

interface ScrollStackItemProps {
  children: ReactNode;
  className?: string;
}

export function ScrollStackItem({ children, className }: ScrollStackItemProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_48px_-24px_hsl(0_0%_0%/0.7)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
