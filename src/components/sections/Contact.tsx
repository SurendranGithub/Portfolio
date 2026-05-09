import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/react-bits/FadeIn';
import Ribbons from '@/components/react-bits/Ribbons';
import { profile } from '@/data/profile';

interface ContactSocial {
  label: string;
  href: string;
  Icon: typeof Mail;
}

function buildSocials(): ContactSocial[] {
  const items: ContactSocial[] = [];
  if (profile.linkedin)
    items.push({ label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin });
  if (profile.github)
    items.push({ label: 'GitHub', href: profile.github, Icon: Github });
  return items;
}

export function Contact() {
  const socials = buildSocials();

  return (
    <Section
      id="contact"
      className="relative isolate flex min-h-[80vh] items-center overflow-hidden py-24 sm:min-h-[85vh] sm:py-28 lg:py-32"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Ribbons
          colors={['#34d399', '#10b981', '#0ea5e9']}
          baseThickness={28}
          baseSpring={0.025}
          baseFriction={0.92}
          speedMultiplier={0.55}
          pointCount={50}
          offsetFactor={0.08}
          enableFade
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/40 to-background"
      />

      <div className="relative mx-auto w-full max-w-3xl text-center">
        <FadeIn>
          <span className="font-mono text-xs uppercase tracking-[0.32em] text-muted-foreground">
            Contact
          </span>
        </FadeIn>

        <FadeIn delay={100}>
          <h2 className="mt-8 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-[5rem] lg:leading-[0.95]">
            Let's <span className="text-accent">build</span> something.
          </h2>
        </FadeIn>

        <FadeIn delay={250}>
          <p className="mx-auto mt-10 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:mt-12 sm:text-lg">
            Reach out to me today and let's discuss how I can help you achieve
            your goal.
          </p>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:mt-14 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-xl px-7 text-base"
            >
              <a href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" />
                {profile.email}
                <ArrowUpRight className="h-4 w-4 opacity-70" />
              </a>
            </Button>
          </div>
        </FadeIn>

        {socials.length > 0 && (
          <FadeIn delay={520}>
            <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground sm:mt-16">
              {socials.map((s, i) => (
                <li key={s.label} className="flex items-center gap-5">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-2 transition-colors hover:text-foreground"
                  >
                    <s.Icon className="h-3.5 w-3.5 transition-colors group-hover/link:text-accent" />
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
        )}
      </div>
    </Section>
  );
}
