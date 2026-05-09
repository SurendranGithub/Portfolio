import { profile } from '@/data/profile';

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="container mx-auto flex max-w-6xl items-center justify-center px-6 text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with care.
        </p>
      </div>
    </footer>
  );
}
