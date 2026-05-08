import { profile } from '@/data/profile';

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="container mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with care.
        </p>
        <p className="text-xs uppercase tracking-[0.2em]">
          React · TypeScript · Tailwind · shadcn/ui
        </p>
      </div>
    </footer>
  );
}
