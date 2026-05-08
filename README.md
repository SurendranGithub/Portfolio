# Surendran B R — Portfolio

A modern, dark-themed personal portfolio built with React, TypeScript, Tailwind CSS, and shadcn/ui primitives. Content is fully data-driven — UI components render from typed data files, making it easy to update without touching JSX.

## Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v3 with CSS variables (shadcn/ui theming)
- **Primitives:** shadcn/ui (hand-rolled — `Button`, `Badge`, `Card`)
- **Icons:** lucide-react
- **Animations:** React Bits-style fade/blur reveals via `IntersectionObserver` + CSS transitions (no heavy motion library)

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

Vite serves on `http://localhost:5173`.

## Project structure

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── layout/         # Navbar, Footer, Section shell
│   ├── react-bits/     # FadeIn, BlurText, StaggerContainer
│   ├── sections/       # Hero, About, Skills, Projects, Experience, Contact
│   └── ui/             # shadcn primitives — Button, Badge, Card
├── data/               # Source of truth for all content
│   ├── profile.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── experience.ts
├── hooks/              # useInView, useActiveSection
├── lib/                # cn() utility
└── types/              # Shared TypeScript types
```

## Updating content

All copy lives in [`src/data/`](src/data/). Components render from these files — you should not need to edit JSX to change wording.

### 1. Profile, tagline, contact details

Edit [src/data/profile.ts](src/data/profile.ts).

| Field | What to update |
| --- | --- |
| `name`, `role`, `location`, `email`, `phone` | Already populated from your resume. |
| `linkedin` | **Replace the placeholder** with your full LinkedIn URL (e.g. `https://www.linkedin.com/in/your-handle`). |
| `github` | **Replace the placeholder** with your full GitHub URL (e.g. `https://github.com/your-handle`). |
| `tagline` | One-liner shown in the hero. |
| `about` | Array of paragraphs rendered in the About section. |
| `status` | Pill text in the hero (e.g. "Available for backend roles"). |

### 2. Projects

Edit [src/data/projects.ts](src/data/projects.ts).

Each project is typed with: `name`, `tagline`, `description`, `problem`, `impact`, `stack[]`, `github?`, `demo?`, `featured?`.

If a project doesn't have a public repo or demo yet, leave `github`/`demo` as empty strings — the corresponding icon link is hidden automatically.

### 3. Skills

Edit [src/data/skills.ts](src/data/skills.ts). Skills are grouped by category. Add or rearrange categories freely.

### 4. Experience, education, achievements

Edit [src/data/experience.ts](src/data/experience.ts). Three exports:

- `experience` — array of roles
- `education` — single education record
- `achievements` — array of awards / publications

### 5. Hero CTA buttons

The hero has two CTAs hard-coded to `#projects` and `mailto:`. Edit [src/components/sections/Hero.tsx](src/components/sections/Hero.tsx) if you want to point them elsewhere (e.g. a resume PDF).

### 6. Resume PDF (optional)

Drop a `Surendran.pdf` (or any name) in [public/](public/) and reference it from `Hero.tsx` as a third CTA, e.g.:

```tsx
<Button asChild variant="ghost">
  <a href="/Surendran.pdf" target="_blank" rel="noreferrer">Download CV</a>
</Button>
```

## Design tokens

Tokens live in [src/index.css](src/index.css) under `:root` as HSL CSS variables, consumed by [tailwind.config.js](tailwind.config.js). Notable variables:

- `--background` — page background (zinc-950)
- `--card` — card background
- `--border` — border color
- `--accent` — single accent (emerald-400) used sparingly on status dots and bullets
- `--radius` — global radius

To shift the accent (e.g. to violet or amber), only `--accent` and `--ring` need to change.

## Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`)
- Focus-visible rings on interactive elements
- `prefers-reduced-motion` is respected — the `useInView` hook still mounts content; transitions degrade gracefully because they're CSS.
- Color contrast meets WCAG AA in dark mode.

## Performance notes

- Single bundle, no runtime CSS-in-JS
- Animations are CSS transitions triggered once via `IntersectionObserver` — no continuous render loops
- Inter is preconnected and lazily loaded from Google Fonts
- No motion library — total dependency footprint is minimal

## License

Personal use. Feel free to fork as a template.
