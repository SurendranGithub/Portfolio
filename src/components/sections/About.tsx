import { Section } from '@/components/layout/Section';
import { FadeIn } from '@/components/react-bits/FadeIn';
import { profile } from '@/data/profile';
import { education } from '@/data/experience';

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Backend developer with a product mindset."
    >
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <FadeIn>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="rounded-xl border border-border bg-card/40 p-6">
            <h3 className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Education
            </h3>
            <p className="mt-4 text-base font-medium text-foreground">
              {education.degree}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {education.institution}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span>
                {education.start} — {education.end}
              </span>
              {education.cgpa && (
                <>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-border" />
                  <span>CGPA {education.cgpa}</span>
                </>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
