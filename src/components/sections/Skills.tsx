import { Section } from '@/components/layout/Section';
import { FadeIn } from '@/components/react-bits/FadeIn';
import { MagicBento, MagicBentoCard } from '@/components/react-bits/MagicBento';
import { skillGroups } from '@/data/skills';
import { cn } from '@/lib/utils';

// Bento span pattern matched to skillGroups order:
// Backend (2) + Databases (1) | Cloud (2) + AI&LLMs (1) | Frontend (1) + CS Fund (2)
const BENTO_SPANS = [
  'sm:col-span-2',
  'sm:col-span-1',
  'sm:col-span-2',
  'sm:col-span-1',
  'sm:col-span-1',
  'sm:col-span-2',
] as const;

export function Skills() {
  return (
    <Section id="skills" className="py-24 sm:py-28 lg:py-32">
      <FadeIn>
        <div className="mb-14 flex flex-col gap-4 sm:mb-20">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[0.95]">
            My <span className="text-accent">toolkit</span>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A pragmatic stack — what holds up in production, not what's trending.
          </p>
        </div>
      </FadeIn>

      <MagicBento className="grid auto-rows-[1fr] gap-3 sm:grid-cols-3 sm:gap-4">
        {skillGroups.map((group, i) => (
          <FadeIn
            key={group.category}
            delay={i * 60}
            className={cn('h-full', BENTO_SPANS[i])}
          >
            <MagicBentoCard className="h-full p-6 sm:p-8">
              <div className="flex h-full flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span aria-hidden className="h-px w-6 bg-border/70" />
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {group.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem]">
                  {group.category}
                </h3>

                <ul className="mt-auto flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-border/70 bg-secondary/40 px-2.5 py-1 text-xs font-medium text-foreground/90 transition-colors group-hover/card:border-border"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </MagicBentoCard>
          </FadeIn>
        ))}
      </MagicBento>
    </Section>
  );
}
