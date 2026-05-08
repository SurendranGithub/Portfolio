import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { FadeIn } from './FadeIn';
import { cn } from '@/lib/utils';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delayBase?: number;
  delayStep?: number;
  y?: number;
}

/**
 * Wraps each direct child in a FadeIn with an incrementing delay.
 * The wrapper preserves layout slots in grids/flex containers since
 * FadeIn itself renders as a block.
 */
export function StaggerContainer({
  children,
  className,
  delayBase = 0,
  delayStep = 80,
  y = 14,
}: StaggerProps) {
  return (
    <div className={cn(className)}>
      {Children.toArray(children).map((child, i) => {
        if (!isValidElement(child)) return child;
        return (
          <FadeIn
            key={(child as ReactElement).key ?? i}
            delay={delayBase + i * delayStep}
            y={y}
          >
            {child}
          </FadeIn>
        );
      })}
    </div>
  );
}
