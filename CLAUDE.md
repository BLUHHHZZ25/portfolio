# Portfolio – CLAUDE.md

## Project Overview

Personal portfolio website for **Roger Moore A. Sangol**, Full-Stack Developer. Built with Next.js 16 (App Router), React 19, TypeScript, and TailwindCSS v4.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TailwindCSS v4, Radix UI, Lucide React, Framer Motion (`motion/react`)
- **Language:** TypeScript
- **Styling utilities:** clsx, tailwind-merge, class-variance-authority

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Composes all sections in order
│   ├── globals.css         # Global styles + CSS variables for light/dark theme
│   └── data.ts             # ALL portfolio content — edit only this file for content changes
│
├── components/
│   ├── sections/           # Page-specific, non-reusable
│   │   ├── navbar.tsx      # Fixed nav with dark/light toggle + mobile hamburger menu
│   │   ├── hero.tsx        # Hero with particles, profile card, social icons
│   │   ├── experience.tsx
│   │   ├── skills.tsx      # Flat skill cards with Devicon logos
│   │   ├── projects.tsx    # Project cards with image, description, tech stack tags
│   │   ├── education.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   │
│   └── ui/                 # Reusable primitives
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       ├── separator.tsx
│       ├── generate-text-effect.tsx  # Animated word-by-word text reveal
│       ├── gradient-text.tsx
│       ├── particles.tsx             # Canvas particle background, theme-aware
│       └── profile-card.tsx          # Animated profile photo card
│
├── public/
│   ├── svgs/
│   │   └── index.ts        # All Devicon SVG URLs (centralized)
│   └── images/
│       └── index.ts        # All image URLs (centralized)
│
└── lib/
    └── utils.ts            # cn() utility (clsx + tailwind-merge)
```

## Key Conventions

- **All content lives in `app/data.ts`** — experience, skills, education, bio, projects, and social links all live here. Never hardcode content in components.
- **All external asset URLs live in `public/svgs/index.ts` and `public/images/index.ts`** — import `svgs` or `images` from there instead of hardcoding URLs in components.
- **Theme system** — dark/light mode is class-based (`.dark` / `.light` on `<html>`). Toggled by the navbar button, persisted in `localStorage`, with `prefers-color-scheme` as the fallback. Components that use hardcoded colors must use a `MutationObserver` on `documentElement` to react to class changes.
- Use `cn()` from `lib/utils.ts` for conditional class merging.
- Profile card, skill cards, and project cards all share the same visual style: dark gradient (`#1a1f35 → #0d1120`) in dark mode, light grey gradient (`#f8fafc → #ffffff`) in light mode, with matching border and shadow tokens.

## Theme Pattern

Components with hardcoded styles use this hook to stay in sync with the theme toggle:

```ts
function useIsDark() {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])
  return isDark
}
```

## Section Order (page.tsx)

1. `<Navbar />`
2. `<Hero />` — about / intro
3. `<Experience />`
4. `<Skills />`
5. `<Projects />`
6. `<Education />`
7. `<Contact />`
8. `<Footer />`

## Navbar Links

About · Experience · Skills · Projects · Education · Contact

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Notes

- Single-page portfolio — no routing beyond `/`.
- No backend, database, or API routes.
- Deployment target: Vercel.
- `next.config.ts` whitelists `cdn.jsdelivr.net` (Devicons) and `images.unsplash.com` for `next/image`.
- `public/svgs/index.ts` and `public/images/index.ts` are TypeScript modules imported by components, not static assets served by Next.js.
