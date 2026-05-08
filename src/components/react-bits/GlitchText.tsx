import { type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: ReactNode;
  /** Lower = faster glitching. Default 0.5 matches React Bits' demo. */
  speed?: number;
  /** Toggles the chromatic-aberration text shadows. */
  enableShadows?: boolean;
  /** Only glitch on hover (otherwise glitches continuously). */
  enableOnHover?: boolean;
  className?: string;
}

/**
 * React Bits — Glitch text.
 * Uses two ::before / ::after layers offset on the X axis with red/cyan
 * text-shadows, animated by a clip-path keyframe loop.
 */
export function GlitchText({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className,
}: GlitchTextProps) {
  const style = {
    '--glitch-after-duration': `${speed * 3}s`,
    '--glitch-before-duration': `${speed * 2}s`,
    '--glitch-after-shadow': enableShadows ? '-4px 0 #ff003c' : 'none',
    '--glitch-before-shadow': enableShadows ? '4px 0 #00e0ff' : 'none',
  } as CSSProperties;

  const text = typeof children === 'string' ? children : String(children ?? '');

  return (
    <span
      className={cn('glitch-text', enableOnHover && 'glitch-text--hover', className)}
      style={style}
      data-text={text}
    >
      {children}
    </span>
  );
}
