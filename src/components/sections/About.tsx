import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { BlurText } from '@/components/react-bits/BlurText';
import { FadeIn } from '@/components/react-bits/FadeIn';
import { profile } from '@/data/profile';

export function About() {
  return (
    <Section id="about" className="py-24 sm:py-28 lg:py-32">
      <div className="grid items-center gap-y-10 text-center lg:grid-cols-[minmax(0,400px)_1fr] lg:items-start lg:gap-x-16 lg:gap-y-0 lg:text-left">
        <div>
          <FadeIn>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[0.95]">
              About <span className="text-accent">Me</span>
            </h2>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="mt-8 flex items-center justify-center gap-2 lg:mt-10 lg:justify-start">
              <Button asChild size="lg" className="h-14 rounded-xl px-6 text-base">
                <a href="#contact">Let's Contact</a>
              </Button>
              <Button asChild size="icon" className="h-14 w-14 rounded-xl">
                <a href="#contact" aria-label="Open contact section">
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>

        <div className="lg:pt-2">
          <p className="mx-auto max-w-xl text-balance text-base leading-[1.65] text-muted-foreground sm:text-lg lg:mx-0 lg:max-w-none lg:text-xl">
            <BlurText
              text={profile.about}
              animateBy="word"
              step={28}
              duration={700}
              blur={8}
              direction="bottom"
              className="block"
            />
          </p>
        </div>
      </div>
    </Section>
  );
}
