# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Portfolio

## Project Overview

Personal portfolio website for **Roger Moore A. Sangol**, Full-Stack Developer. Built with Next.js 16 (App Router), React 19, TypeScript, and TailwindCSS v4.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TailwindCSS v4, Radix UI, Lucide React
- **Animation:** GSAP + `@gsap/react` (`useGSAP`, ScrollTrigger) for scroll reveals and the hero entrance timeline; Framer Motion (`motion/react`) still powers `gradient-text.tsx` (and the now-unused `generate-text-effect.tsx`). Both libraries coexist.
- **Language:** TypeScript
- **Styling utilities:** clsx, tailwind-merge, class-variance-authority

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout — full SEO metadata + Person/WebSite JSON-LD, DM Sans font
│   ├── page.tsx            # Composes all sections; wraps them in <GsapReveal>, mounts <ScrollToTop>
│   ├── globals.css         # Global styles + CSS variables (theme tokens, surface/brand-gradient/reveal)
│   ├── data.ts             # ALL portfolio content — edit only this file for content changes
│   ├── robots.ts           # generates /robots.txt (MetadataRoute.Robots)
│   ├── sitemap.ts          # generates /sitemap.xml (MetadataRoute.Sitemap)
│   ├── opengraph-image.tsx # 1200×630 OG image via next/og ImageResponse (uses portfolioData)
│   ├── icon.tsx            # 32×32 favicon via next/og ImageResponse
│   └── apple-icon.tsx      # 180×180 apple-touch-icon via next/og ImageResponse
│
├── components/
│   ├── sections/           # Page-specific, non-reusable
│   │   ├── navbar.tsx      # Fixed nav with dark/light toggle + mobile hamburger menu (client)
│   │   ├── hero.tsx        # Hero with particles, profile card, social icons (client)
│   │   ├── experience.tsx  # Renders BOTH work experience AND education (server)
│   │   ├── skills.tsx      # Flat skill cards with Devicon logos
│   │   ├── projects.tsx    # Project cards with image, description, tech stack tags
│   │   ├── contact.tsx     # Form + Calendly widget (loaded via next/script lazyOnload) (client)
│   │   └── footer.tsx      # (server)
│   │
│   └── ui/                 # Reusable primitives
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       ├── separator.tsx
│       ├── surface-card.tsx           # Shared card shell — applies .surface / .surface-hover classes
│       ├── section-heading.tsx        # Eyebrow + title + description block used by each section
│       ├── gsap-reveal.tsx            # GSAP ScrollTrigger scroll-reveal wrapper; animates [data-reveal] children (client)
│       ├── scroll-to-top.tsx          # Floating back-to-top button (client)
│       ├── generate-text-effect.tsx   # Framer Motion word-by-word text reveal (currently unused — hero now uses the GSAP timeline)
│       ├── gradient-text.tsx
│       ├── particles.tsx              # Canvas particle background, theme-aware (client)
│       ├── logo.tsx                   # Brand mark: <LogoMark> (monoline-R SVG in a glass chip) + <Logo> (mark + wordmark). Used by navbar & footer
│       └── profile-card.tsx           # Profile photo card + floating logo badges (client)
│
├── public/
│   ├── svgs/
│   │   └── index.ts        # All Devicon SVG URLs (centralized)
│   └── images/
│       └── index.ts        # All image URLs (centralized)
│
└── lib/
    ├── utils.ts            # cn() utility (clsx + tailwind-merge)
    └── logo.ts             # Brand-mark geometry (monogram path, viewBox, gradient stops) — single source shared by logo.tsx AND the next/og routes
```

## Key Conventions

- **All content lives in `app/data.ts`** — experience, skills, education, bio, projects, and social links all live in the single `portfolioData` export. Never hardcode content in components. The SEO files (`layout.tsx`, `opengraph-image.tsx`) also read from `portfolioData`, so content edits propagate to metadata/JSON-LD automatically.
- **`CONTENTS.md` is the human-readable source of truth for that content** — a mirror of `portfolioData` (profile, bio, experience, education, skills, projects, socials). When a content detail is wrong, fix `CONTENTS.md` first, then update `app/data.ts` (and any SEO metadata in `app/layout.tsx`) to match. Note: it reflects the site's own data only — not reconciled against LinkedIn, which blocks automated fetching (HTTP 999).
- **All external asset URLs live in `public/svgs/index.ts` and `public/images/index.ts`** — import `svgs` or `images` from there instead of hardcoding URLs in components.
- **Theme system** — dark/light mode is class-based (`.dark` / `.light` on `<html>`). Toggled by the navbar button, persisted in `localStorage`, with `prefers-color-scheme` as the fallback. **Prefer CSS variables over hardcoded colors** — the theme swaps via CSS custom properties defined in `globals.css` (`--surface-gradient`, `--surface-shadow`, `--brand-gradient`, `--primary`, etc.) under `.dark` / `:root:not(.light)`, so most components need no JS to be theme-aware. Only components that render outside the CSS cascade (e.g. the `<canvas>` in `particles.tsx`) still use the `MutationObserver`/`useIsDark()` hook.
- **Shared card style is the `.surface` CSS class (glassmorphism), not per-component gradients.** Use the `<SurfaceCard>` primitive (or the `.surface` / `.surface-hover` classes directly) for profile card, skill cards, project cards, etc. `.surface` is frosted glass: a translucent fill + `backdrop-filter` blur + translucent border + inner top highlight, all from `--surface-*` tokens (`--surface-gradient`, `--surface-border`, `--surface-shadow`, `--surface-blur`). Light mode keeps the fill opaque enough (`rgba(255,255,255,0.72)`) for 4.5:1 text contrast; dark mode uses `rgba(255,255,255,0.03–0.08)`. Never re-hardcode these inline. Non-card glass has two helpers: `.glass-nav` (navbar + mobile menu) and `.glass-input` (form fields), both theme-aware via `color-mix(... var(--background) ...)`. The frosted look depends on the ambient brand-color mesh painted on `body` (fixed `radial-gradient`s) — that's what the blur refracts, so don't remove it.
- **Section chrome is shared too:** wrap each section's header in `<SectionHeading eyebrow title description>`. Scroll reveals are driven by the `<GsapReveal>` wrapper in `page.tsx`: it uses GSAP `ScrollTrigger.batch` to fade/slide in every descendant marked `data-reveal` (SectionHeading's eyebrow/title/description and each `SurfaceCard`) as it enters the viewport. To make a new element reveal on scroll, add `data-reveal` to it — no per-component JS. Brand gradient text/background use the `.brand-gradient-text` / `.brand-gradient-bg` utility classes.
- **Animation conventions:** all GSAP runs through `@gsap/react`'s `useGSAP` (auto-scoped cleanup, layout-effect init so nothing flashes and content stays visible with JS off) and is gated on `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` so reduced-motion users get no tweens. The hero (`hero.tsx`) runs its own on-mount `gsap.from` timeline over `[data-hero]` elements; scroll sections use `[data-reveal]` via `<GsapReveal>`.
- Use `cn()` from `lib/utils.ts` for conditional class merging.

## Theme Pattern

Most components stay theme-aware purely through CSS variables (see above) and need no hook. The exception is canvas/JS-drawn components — currently only `particles.tsx` — which read the theme imperatively via this hook and re-render on class changes:

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
2. `<main>` contains: `<SpeedInsights />`, `<Hero />` (about / intro, wrapped in `<Particles>` canvas), then `<Experience />`, `<Skills />`, `<Projects />`, `<Contact />` — each wrapped in `<GsapReveal>` for scroll-in animation. `<Experience />` renders work experience + education in one component.
3. `<Footer />` — sits **outside** `<main>` (the body is a flex column so the footer stays at the bottom).
4. `<ScrollToTop />` — floating back-to-top button, fixed position.

## Navbar Links

About · Experience · Skills · Projects · Contact

## SEO & Metadata

SEO is handled entirely through Next.js App Router file conventions — there is no `next-sitemap` or third-party SEO lib.

- **Canonical site URL is `https://www.murrzzz.xyz`.** It is hardcoded as a `siteUrl` const in `layout.tsx`, `robots.ts`, and `sitemap.ts` — if the domain changes, update **all three**.
- `layout.tsx` exports a full `metadata` object (title template, description, keywords, `openGraph`, `twitter`, `robots`, `alternates.canonical`) plus two inline `application/ld+json` blocks: a `Person` and a `WebSite` schema, both populated from `portfolioData`.
- `opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx` generate images at request/build time via `next/og`'s `ImageResponse` — they are **React components rendered to PNG**, not static image files. Keep them Edge-safe (inline styles only; no DOM/browser APIs). They render the brand monogram as inline `<svg>` using `LOGO_R_PATH` from `lib/logo.ts` (the same path `components/ui/logo.tsx` uses), so the mark stays identical across favicon, apple-icon, OG, navbar, and footer — edit the geometry in `lib/logo.ts`, never in one route.
- `robots.ts` and `sitemap.ts` return `MetadataRoute.Robots` / `MetadataRoute.Sitemap` and are served at `/robots.txt` and `/sitemap.xml`.

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
- Deployment target: Vercel. Uses `@vercel/speed-insights/next` mounted in `app/page.tsx`.
- `next.config.ts` whitelists three hosts for `next/image`: `cdn.jsdelivr.net` (Devicons), `images.unsplash.com`, and `fmblbxbwvaemmzhuiwou.supabase.co` (resume PDF + project/profile images). AVIF/WebP formats enabled — if you add a new remote image host, add it to `remotePatterns`.
- **`dangerouslyAllowSVG: true` is required and intentional** — every tech/brand logo (Devicon, plus self-hosted marks in `public/brand/`) is an SVG, and `next/image` returns **400 for SVGs** without it (this silently broke the Skills logos before it was added). It's safe because all SVG sources are trusted; the accompanying `contentSecurityPolicy` sandboxes served files. Don't remove it, and only add SVGs from sources you trust.
- **`public/brand/`** holds self-hosted brand SVGs (WordPress, Elementor) for marks not in Devicon. Duda has no official SVG anywhere standard — drop `public/brand/duda.svg` and add its entry in `profile-card.tsx` to complete the floating-badge set.
- `public/svgs/index.ts` and `public/images/index.ts` are TypeScript modules imported by components, not static assets served by Next.js.
- Fonts: DM Sans is loaded via `next/font/google` in `app/layout.tsx` and exposed as the `--font-dm-sans` CSS variable. Do NOT re-introduce `@import url('...fonts.googleapis.com...')` inside inline `<style>` tags — they are render-blocking and duplicate the font load.

## Performance gotchas (learned the hard way)

- **Never pass `unoptimized` to `next/image`** in projects/skills/profile cards unless there's a specific reason — it bypasses AVIF/WebP conversion, sizing, and caching and is the main way this site has regressed in the past.
- **Keep `<Particles quantity>` ≤ ~100.** The canvas animation in `hero.tsx` runs in `requestAnimationFrame`; large counts tank INP/TBT.
- **`backdrop-filter` (glass) is GPU-costly — keep the blur radius modest and the count bounded.** Every `.surface`/`.glass-*` element blurs what's behind it; the current design already applies it to ~12 cards + navbar + inputs. Don't crank `--surface-blur` past ~20px or add glass to many new small elements, and avoid animating a blurred element's size/position (repaints the blur each frame).
- **Mouse tracking in `particles.tsx` must use refs, not React state.** Using `useState` for mouse position re-renders the whole Particles tree on every `mousemove` and causes severe jank.
- **Prefer CSS variables over `useIsDark()`.** The `.surface`/token approach means most cards are theme-aware with zero JS. Only reach for `useIsDark()` when drawing to `<canvas>` (particles). If you must use it in a section, hoist it to the section root and pass `isDark` down — calling it per-card creates N `MutationObserver`s.
- **Only use `"use client"` when a component actually has client state/effects.** Server components (no directive — keep it that way): sections `experience.tsx`, `skills.tsx`, `projects.tsx`, `footer.tsx`, and ui `surface-card.tsx`, `section-heading.tsx`. Everything else with interactivity/effects (`navbar`, `hero`, `contact`, `gsap-reveal`, `scroll-to-top`, `particles`, `profile-card`, and the small ui primitives) is client.
