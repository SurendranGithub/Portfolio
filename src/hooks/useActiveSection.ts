import { useEffect, useState } from 'react';

/**
 * Track which section is currently in view based on scroll position.
 * Returns the id of the topmost section above the offset line.
 */
export function useActiveSection(ids: readonly string[], offset = 96) {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY + offset + 1;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids, offset]);

  return active;
}
