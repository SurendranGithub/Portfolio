import { useEffect, useRef } from 'react';
import { Color, Polyline, Renderer, Transform, Vec3 } from 'ogl';
import { cn } from '@/lib/utils';

interface RibbonsProps {
  colors?: string[];
  baseSpring?: number;
  baseFriction?: number;
  baseThickness?: number;
  offsetFactor?: number;
  pointCount?: number;
  speedMultiplier?: number;
  enableFade?: boolean;
  enableShaderEffect?: boolean;
  effectAmplitude?: number;
  className?: string;
}

const vertexShader = /* glsl */ `
  precision highp float;

  attribute vec3 position;
  attribute vec3 next;
  attribute vec3 prev;
  attribute vec2 uv;
  attribute float side;

  uniform vec2 uResolution;
  uniform float uDPR;
  uniform float uThickness;
  uniform float uTime;
  uniform float uEnableShaderEffect;
  uniform float uEffectAmplitude;

  varying vec2 vUV;

  vec4 getPosition() {
    vec4 current = vec4(position, 1.0);
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 nextScreen = next.xy * aspect;
    vec2 prevScreen = prev.xy * aspect;
    vec2 tangent = normalize(nextScreen - prevScreen);
    vec2 normal = vec2(-tangent.y, tangent.x);
    normal /= aspect;
    normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
    float dist = length(nextScreen - prevScreen);
    normal *= smoothstep(0.0, 0.02, dist);
    float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
    float pixelWidth = current.w * pixelWidthRatio;
    normal *= pixelWidth * uThickness;
    current.xy -= normal * side;
    if (uEnableShaderEffect > 0.5) {
      current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
    }
    return current;
  }

  void main() {
    vUV = uv;
    gl_Position = getPosition();
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uEnableFade;

  varying vec2 vUV;

  void main() {
    float fadeFactor = 1.0;
    if (uEnableFade > 0.5) {
      fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.x);
    }
    gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
  }
`;

/**
 * React Bits — Ribbons.
 * Spring-driven polyline trails following the cursor.
 */
export default function Ribbons({
  colors = ['#34d399', '#10b981', '#06b6d4'],
  baseSpring = 0.03,
  baseFriction = 0.9,
  baseThickness = 30,
  offsetFactor = 0.05,
  pointCount = 50,
  speedMultiplier = 0.6,
  enableFade = false,
  enableShaderEffect = false,
  effectAmplitude = 2,
  className,
}: RibbonsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    Object.assign(gl.canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
    });
    container.appendChild(gl.canvas);

    const scene = new Transform();

    const lines = colors.map((color) => {
      const points: Vec3[] = [];
      for (let i = 0; i < pointCount; i++) points.push(new Vec3());

      const polyline = new Polyline(gl, {
        points,
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uColor: { value: new Color(color) },
          uThickness: { value: baseThickness },
          uOpacity: { value: 1 },
          uTime: { value: 0 },
          uEnableFade: { value: enableFade ? 1 : 0 },
          uEnableShaderEffect: { value: enableShaderEffect ? 1 : 0 },
          uEffectAmplitude: { value: effectAmplitude },
        },
      });
      polyline.mesh.setParent(scene);

      return {
        polyline,
        points,
        spring: baseSpring + (Math.random() - 0.5) * 0.05,
        friction: baseFriction + (Math.random() - 0.5) * 0.05,
        mouseVelocity: new Vec3(),
        mouseOffset: new Vec3(
          (Math.random() - 0.5) * offsetFactor * 2,
          (Math.random() - 0.5) * offsetFactor * 2,
          0,
        ),
      };
    });

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      lines.forEach((line) => line.polyline.resize());
    };
    window.addEventListener('resize', resize);
    resize();

    const mouse = new Vec3();
    const tmp = new Vec3();

    const onMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if (e instanceof TouchEvent && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;
      mouse.set(x, y, 0);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });

    let raf = 0;
    const update = (t: number) => {
      raf = requestAnimationFrame(update);

      lines.forEach((line) => {
        tmp
          .copy(mouse)
          .add(line.mouseOffset)
          .sub(line.points[0])
          .multiply(line.spring);
        line.mouseVelocity.add(tmp).multiply(line.friction);
        line.points[0].add(line.mouseVelocity);

        for (let i = 1; i < line.points.length; i++) {
          line.points[i].lerp(
            line.points[i - 1],
            speedMultiplier * (1 - (i - 1) * 0.005),
          );
        }

        line.polyline.program.uniforms.uTime.value = t * 0.001;
        line.polyline.updateGeometry();
      });

      renderer.render({ scene });
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    JSON.stringify(colors),
    baseSpring,
    baseFriction,
    baseThickness,
    offsetFactor,
    pointCount,
    speedMultiplier,
    enableFade,
    enableShaderEffect,
    effectAmplitude,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn('relative h-full w-full', className)}
    />
  );
}
