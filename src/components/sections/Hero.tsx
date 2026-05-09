import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { FadeIn } from '@/components/react-bits/FadeIn';
import Particles from '@/components/react-bits/Particles';
import { Typewriter } from '@/components/react-bits/Typewriter';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

function formatTime(d: Date) {
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((n) => String(n).padStart(2, '0'))
    .join(':');
}

function Clock() {
  const [time, setTime] = useState(() => formatTime(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <time
      className="font-mono text-xs tabular-nums tracking-[0.18em] text-muted-foreground sm:text-sm"
      aria-label={`Local time ${time}`}
    >
      {time}
    </time>
  );
}

function Avatar() {
  const [errored, setErrored] = useState(false);
  return (
    <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border border-border bg-card shadow-[0_0_0_4px_hsl(var(--background))] sm:h-24 sm:w-24">
      {!errored ? (
        <img
          src="/avatar.jpg"
          alt={profile.name}
          onError={() => setErrored(true)}
          className="h-full w-full object-cover grayscale"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-secondary/40 font-mono text-2xl font-medium text-muted-foreground">
          {profile.name.charAt(0)}
        </div>
      )}
    </div>
  );
}

interface SocialLink {
  label: string;
  href: string;
  external?: boolean;
}

function buildSocials(): SocialLink[] {
  const items: SocialLink[] = [
    { label: 'E-mail', href: `mailto:${profile.email}` },
  ];
  if (profile.linkedin)
    items.push({ label: 'LinkedIn', href: profile.linkedin, external: true });
  if (profile.github)
    items.push({ label: 'GitHub', href: profile.github, external: true });
  return items;
}

export function Hero() {
  const socials = buildSocials();

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Particles
          className="h-full w-full"
          particleColors={['#ffffff', '#ffffff', '#ffffff', '#34d399']}
          particleCount={250}
          particleSpread={12}
          speed={0.1}
          particleBaseSize={130}
          alphaParticles
          moveParticlesOnHover
          particleHoverFactor={0.5}
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

      <div className="absolute right-6 top-24 hidden sm:right-10 sm:top-28 sm:block">
        <Clock />
      </div>

      <div className="container mx-auto max-w-3xl px-6 pt-24 text-center sm:pt-20">
        <FadeIn delay={50}>
          <Avatar />
        </FadeIn>

        <FadeIn delay={150}>
          <p className="mt-6 text-base text-muted-foreground sm:text-lg">
            Hi, I'm{' '}
            <span className="font-semibold text-foreground">Surendran</span>
            <span className="text-accent">.</span>
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <h1
            className={cn(
              'mx-auto mt-6 max-w-2xl text-balance font-bold uppercase leading-[1.04] tracking-[-0.01em] text-foreground',
              'text-[2rem] sm:text-5xl md:text-[3.5rem] lg:text-[4rem]',
            )}
          >
            <span className="text-foreground/90">I build </span>
            <span className="text-accent">reliable backends</span>
            <span className="text-foreground/90"> and </span>
            <span className="text-accent">AI-integrated</span>
            <span className="text-foreground/90"> products</span>
            <span className="text-accent">.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={750}>
          <div
            className="mt-7 inline-flex items-center gap-2 font-mono text-sm text-accent"
            aria-label={`Currently working as ${profile.role}`}
          >
            <span aria-hidden>&gt;</span>
            <Typewriter text={profile.role} startDelay={1000} speed={75} />
            <span
              aria-hidden
              className="inline-block h-4 w-[0.55rem] animate-blink bg-accent align-middle"
            />
          </div>
        </FadeIn>

        <FadeIn delay={1100}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            {socials.map((s, i) => (
              <li key={s.label} className="flex items-center gap-3">
                <a
                  href={s.href}
                  target={s.external ? '_blank' : undefined}
                  rel={s.external ? 'noreferrer' : undefined}
                  className="transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
                {i < socials.length - 1 && (
                  <span aria-hidden className="text-accent">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={1300}>
          <a
            href="#about"
            aria-label="Scroll to next section"
            className="group mt-14 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_0_0_6px_hsl(var(--background))] transition-all duration-300 hover:scale-105 sm:h-16 sm:w-16"
          >
            <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </FadeIn>
      </div>

      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground/60 sm:bottom-8"
      >
        scroll for more
      </div>
    </section>
  );
}
