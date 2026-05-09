import { useEffect, useRef } from 'react';

interface BlobCursorProps {
  /** Fill colour of every blob. Pass any valid CSS colour. */
  fillColor?: string;
  /** Number of trailing blobs (default 3). */
  trailCount?: number;
  /** Per-blob diameter in px. Length should equal trailCount. */
  sizes?: number[];
  /** Per-blob opacity (0..1). Length should equal trailCount. */
  opacities?: number[];
  /** Stacking context. Defaults above all UI. */
  zIndex?: number;
}

/**
 * React Bits — Blob Cursor.
 * Replaces the system cursor with a stack of trailing blobs that follow the
 * pointer with spring-like easing. A gooey SVG filter merges overlapping
 * blobs into a single fluid shape.
 *
 * Skipped on touch devices and when prefers-reduced-motion is set.
 */
export default function BlobCursor({
  fillColor = '#34d399',
  trailCount = 3,
  sizes = [44, 90, 70],
  opacities = [0.7, 0.45, 0.25],
  zIndex = 9999,
}: BlobCursorProps) {
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (isTouch || reducedMotion) return;

    document.documentElement.classList.add('blob-cursor-active');

    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2;

    const positions = Array.from({ length: trailCount }, () => ({
      x: initX,
      y: initY,
    }));

    let targetX = initX;
    let targetY = initY;
    let visible = false;
    let initialised = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      visible = true;
      if (!initialised) {
        initialised = true;
        positions.forEach((p) => {
          p.x = targetX;
          p.y = targetY;
        });
      }
    };

    const onLeave = () => {
      visible = false;
    };

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);

    let raf = 0;
    const update = () => {
      raf = requestAnimationFrame(update);

      for (let i = 0; i < trailCount; i++) {
        const target =
          i === 0 ? { x: targetX, y: targetY } : positions[i - 1];
        const lerpFactor = i === 0 ? 0.32 : Math.max(0.08, 0.22 - i * 0.04);
        positions[i].x += (target.x - positions[i].x) * lerpFactor;
        positions[i].y += (target.y - positions[i].y) * lerpFactor;

        const el = blobsRef.current[i];
        if (!el) continue;
        const size = sizes[i] ?? sizes[0];
        el.style.transform = `translate3d(${positions[i].x - size / 2}px, ${positions[i].y - size / 2}px, 0)`;
        el.style.opacity = visible
          ? String(opacities[i] ?? opacities[0])
          : '0';
      }
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('blob-cursor-active');
    };
  }, [trailCount, sizes, opacities]);

  return (
    <>
      <svg
        aria-hidden
        className="pointer-events-none fixed left-[-9999px] top-0 h-0 w-0"
      >
        <defs>
          <filter id="blob-cursor-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex,
          filter: 'url(#blob-cursor-goo)',
        }}
      >
        {Array.from({ length: trailCount }, (_, i) => (
          <div
            key={i}
            ref={(el) => {
              blobsRef.current[i] = el;
            }}
            className="absolute left-0 top-0 rounded-full transition-opacity duration-300"
            style={{
              width: `${sizes[i] ?? sizes[0]}px`,
              height: `${sizes[i] ?? sizes[0]}px`,
              backgroundColor: fillColor,
              opacity: 0,
              willChange: 'transform',
            }}
          />
        ))}
      </div>
    </>
  );
}
