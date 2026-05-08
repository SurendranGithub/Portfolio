import { ArrowUpRight, Github } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { FadeIn } from '@/components/react-bits/FadeIn';
import { projects } from '@/data/projects';

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Selected work."
      description="A few projects I've shipped — backend systems, AI-integrated workflows, and full-stack platforms."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((p, i) => (
          <FadeIn key={p.id} delay={i * 80}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/40 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border/40 hover:bg-card/60 sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <header className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.name} on GitHub`}
                      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.name} live demo`}
                      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </header>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground/80">
                    Problem
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.problem}
                  </p>
                </div>
                <div>
                  <h4 className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground/80">
                    Impact
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.impact}
                  </p>
                </div>
              </div>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-border/70 bg-secondary/30 px-2 py-0.5 text-[0.7rem] font-medium text-foreground/80"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
