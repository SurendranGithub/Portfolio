import { useEffect, useState } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
] as const;

const ids = links.map((l) => l.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const surface = cn(
    'border bg-background/70 backdrop-blur-xl transition-all duration-300',
    scrolled
      ? 'border-border/80 bg-background/85 shadow-[0_8px_28px_-12px_hsl(0_0%_0%/0.6)]'
      : 'border-border/60',
  );

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-5">
      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="#hero"
          aria-label="Home"
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full font-mono text-sm font-bold tracking-tight text-foreground',
            surface,
          )}
        >
          S<span className="text-accent">.</span>
        </a>

        <nav
          aria-label="Primary"
          className={cn(
            'hidden items-center rounded-full p-1.5 md:flex',
            surface,
          )}
        >
          <ul className="flex items-center">
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      'inline-flex items-center rounded-full px-4 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href="#contact"
          className={cn(
            'inline-flex h-12 items-center rounded-full px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/40',
            surface,
          )}
        >
          Contact
        </a>
      </div>
    </header>
  );
}
