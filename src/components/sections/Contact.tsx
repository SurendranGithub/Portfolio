import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { FadeIn } from '@/components/react-bits/FadeIn';
import { profile } from '@/data/profile';

interface ContactLink {
  label: string;
  display: string;
  href: string;
  Icon: typeof Mail;
  external?: boolean;
}

const links: ContactLink[] = [
  {
    label: 'Email',
    display: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
  },
  ...(profile.linkedin
    ? [
        {
          label: 'LinkedIn',
          display: 'Connect on LinkedIn',
          href: profile.linkedin,
          Icon: Linkedin,
          external: true,
        } satisfies ContactLink,
      ]
    : []),
  ...(profile.github
    ? [
        {
          label: 'GitHub',
          display: 'View GitHub profile',
          href: profile.github,
          Icon: Github,
          external: true,
        } satisfies ContactLink,
      ]
    : []),
];

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something.">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <FadeIn>
          <p className="text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I'm currently open to backend roles. If you're hiring, collaborating
            on a side project, or just want to chat about Node.js, AI pipelines,
            or system design — my inbox is open.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center gap-3 rounded-md border border-border bg-secondary/30 px-5 py-3 text-base font-medium text-foreground transition-colors hover:border-border/80 hover:bg-secondary/60"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </a>
        </FadeIn>

        <FadeIn delay={120}>
          <ul className="space-y-2 lg:mt-1">
            {links.map(({ label, display, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-card/40 px-5 py-4 transition-all duration-200 hover:-translate-y-px hover:border-border/40 hover:bg-card/70"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                    <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {label}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-sm text-foreground/90 transition-colors group-hover:text-foreground">
                    {display}
                    <ArrowUpRight className="h-3.5 w-3.5 -translate-x-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </Section>
  );
}
