import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
] as const;

const ids = links.map((l) => l.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const surface = cn(
    'border bg-background/70 backdrop-blur-xl transition-all duration-300',
    scrolled
      ? 'border-border/80 bg-background/85 shadow-[0_8px_28px_-12px_hsl(0_0%_0%/0.6)]'
      : 'border-border/60',
  );

  return (
    <>
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

          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full text-foreground md:hidden',
              surface,
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

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

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          'fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl transition-opacity duration-300 md:hidden',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        <nav className="flex h-full flex-col items-center justify-center px-6">
          <ul className="flex w-full max-w-sm flex-col gap-2">
            {links.map((link, i) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{
                      transitionDelay: open ? `${100 + i * 50}ms` : '0ms',
                    }}
                    className={cn(
                      'flex items-center justify-between rounded-2xl border border-border/60 bg-secondary/20 px-6 py-4 text-2xl font-semibold tracking-tight transition-all duration-300',
                      isActive
                        ? 'border-accent/60 bg-accent/10 text-foreground'
                        : 'text-muted-foreground hover:border-border hover:text-foreground',
                      open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                    )}
                  >
                    <span>{link.label}</span>
                    <span
                      className={cn(
                        'font-mono text-xs',
                        isActive ? 'text-accent' : 'text-muted-foreground/60',
                      )}
                    >
                      0{i + 1}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
