import { ArrowDown, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlurText } from '@/components/react-bits/BlurText';
import { FadeIn } from '@/components/react-bits/FadeIn';
import Particles from '@/components/react-bits/Particles';
import { profile } from '@/data/profile';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Particles
          className="h-full w-full"
          particleColors={['#ffffff', '#ffffff', '#ffffff', '#34d399']}
          particleCount={300}
          particleSpread={12}
          speed={0.12}
          particleBaseSize={150}
          alphaParticles
          moveParticlesOnHover
          particleHoverFactor={0.6}
          sizeRandomness={1}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,hsl(var(--accent)/0.08),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-background"
      />

      <div className="container mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-balance text-6xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[7rem]">
          <BlurText
            text="Surendran"
            delay={150}
            step={140}
            duration={900}
            blur={12}
            direction="top"
          />
        </h1>

        <FadeIn delay={1300} y={8}>
          <div
            aria-hidden
            className="mt-10 flex items-center justify-center gap-4 text-[0.7rem] uppercase tracking-[0.5em] text-muted-foreground"
          >
            <span className="h-px w-10 bg-border" />
            <span>{profile.role}</span>
            <span className="h-px w-10 bg-border" />
          </div>
          <p className="sr-only">{profile.role}</p>
        </FadeIn>

        <FadeIn delay={1500} y={8}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <a href="#projects">
                View my work
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground/60 sm:block"
      >
        scroll
      </div>
    </section>
  );
}
