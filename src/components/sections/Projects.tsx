import { ArrowUpRight, Github } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { FadeIn } from '@/components/react-bits/FadeIn';
import {
  ScrollStack,
  ScrollStackItem,
} from '@/components/react-bits/ScrollStack';
import { projects } from '@/data/projects';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const indexLabel = String(index + 1).padStart(2, '0');

  return (
    <div className="flex min-h-[420px] flex-col p-8 sm:min-h-[460px] sm:p-12 lg:min-h-[500px] lg:p-16">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
        <span className="text-accent">{indexLabel}</span>
        <span aria-hidden className="h-px w-6 bg-border" />
        <span>{project.tagline}</span>
      </div>

      <h3 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
        {project.name}
      </h3>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
        {project.description}
      </p>

      <div className="mt-auto pt-10">
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-md border border-border/70 bg-secondary/40 px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-foreground/80"
            >
              {s}
            </li>
          ))}
        </ul>

        {(project.github || project.demo) && (
          <div className="mt-6 flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                <ArrowUpRight className="h-4 w-4" />
                Live
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <Section id="projects" className="py-24 sm:py-28 lg:py-32">
      <FadeIn>
        <div className="mb-14 flex flex-col gap-4 sm:mb-20">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[0.95]">
            Selected <span className="text-accent">projects</span>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A few things I've shipped — backend systems, AI-integrated workflows, and full-stack platforms.
          </p>
        </div>
      </FadeIn>

      <ScrollStack topOffset={96} stackOffset={32}>
        {projects.map((project, i) => (
          <ScrollStackItem key={project.id}>
            <ProjectCard project={project} index={i} />
          </ScrollStackItem>
        ))}
      </ScrollStack>

      <div aria-hidden className="h-32" />
    </Section>
  );
}
