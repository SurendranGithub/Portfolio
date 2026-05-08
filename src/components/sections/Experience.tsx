import { Section } from '@/components/layout/Section';
import { FadeIn } from '@/components/react-bits/FadeIn';
import { achievements, experience } from '@/data/experience';

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've built.">
      <ol className="relative space-y-12 border-l border-border/70 pl-6 sm:pl-10">
        {experience.map((item, i) => (
          <FadeIn key={item.id} delay={i * 80}>
            <li className="relative">
              <span
                aria-hidden
                className="absolute -left-[1.7rem] top-2 h-2.5 w-2.5 rounded-full border border-border bg-background sm:-left-[2.7rem]"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.role}
                  <span className="text-muted-foreground"> · {item.company}</span>
                </h3>
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {item.start} — {item.end}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground/80">
                {item.location}
                {item.type && (
                  <>
                    <span aria-hidden className="mx-1.5 text-border">·</span>
                    <span className="capitalize">{item.type.replace('-', ' ')}</span>
                  </>
                )}
              </p>
              <ul className="mt-4 space-y-2">
                {item.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="relative pl-5 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.7rem] before:h-px before:w-3 before:bg-border"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </li>
          </FadeIn>
        ))}
      </ol>

      {achievements.length > 0 && (
        <FadeIn delay={experience.length * 80 + 40}>
          <div className="mt-16 rounded-xl border border-border bg-card/40 p-6 sm:p-8">
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
