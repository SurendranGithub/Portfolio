import { Section } from '@/components/layout/Section';
import { FadeIn } from '@/components/react-bits/FadeIn';
import { achievements, experience } from '@/data/experience';

export function Experience() {
  return (
    <Section id="experience" className="py-24 sm:py-28 lg:py-32">
      <FadeIn>
        <h2 className="mb-14 text-balance text-5xl font-bold tracking-tight text-foreground sm:mb-20 sm:text-6xl lg:text-[4.5rem] lg:leading-[0.95]">
          My <span className="text-accent">experience</span>
        </h2>
      </FadeIn>

      <div className="relative">
        <span
          aria-hidden
          className="absolute left-2 top-3 bottom-4 w-px bg-border/80"
        />

        <div className="space-y-14 sm:space-y-16">
          {experience.map((item, i) => (
            <FadeIn key={item.id} delay={i * 100}>
              <article className="grid gap-y-4 sm:grid-cols-[200px_1fr] sm:gap-x-10 lg:grid-cols-[240px_1fr] lg:gap-x-14">
                <div className="flex items-start gap-4 sm:pt-1.5">
                  <span
                    aria-hidden
                    className="relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-border bg-secondary/40"
                  />
                  <time className="text-sm text-muted-foreground sm:text-[0.95rem]">
                    {item.start} – {item.end}
                  </time>
                </div>

                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {item.role}{' '}
                    <span className="text-accent">@{item.company}</span>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.location}
                    {item.type && (
                      <>
                        <span aria-hidden className="mx-2 text-border">
                          ·
                        </span>
                        <span className="capitalize">
                          {item.type.replace('-', ' ')}
                        </span>
                      </>
                    )}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {item.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="relative pl-5 text-base leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>

      {achievements.length > 0 && (
        <FadeIn delay={experience.length * 100 + 50}>
          <div className="mt-16 rounded-xl border border-border bg-card/40 p-6 sm:mt-24 sm:p-8">
            <h3 className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Achievements & Certifications
            </h3>
            <ul className="mt-4 space-y-3">
              {achievements.map((a, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-3 text-sm text-foreground/90"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  <span>
                    <span className="font-medium">{a.title}</span>
                    {a.detail && (
                      <span className="text-muted-foreground"> — {a.detail}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      )}
    </Section>
  );
}
