import { Section } from '@/components/layout/Section';
import { FadeIn } from '@/components/react-bits/FadeIn';
import { skillGroups } from '@/data/skills';

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I reach for."
      description="A pragmatic stack — what holds up in production, not what's trending."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <FadeIn key={group.category} delay={i * 60}>
            <div className="group h-full rounded-xl border border-border bg-card/40 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border/40 hover:bg-card/60">
              <h3 className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-border/70 bg-secondary/40 px-2.5 py-1 text-xs font-medium text-foreground/90 transition-colors group-hover:border-border"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
