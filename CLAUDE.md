# Portfolio – CLAUDE.md

## Project Overview

Personal portfolio website for **Roger Moore A. Sangol**, Full-Stack Developer. Built with Next.js 16 (App Router), React 19, TypeScript, and TailwindCSS v4.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TailwindCSS v4, Radix UI, Lucide React
- **Language:** TypeScript
- **Styling utilities:** clsx, tailwind-merge, class-variance-authority

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout (unchanged)
│   ├── page.tsx            # Composes all sections
│   ├── globals.css         # Global styles
│   └── data.ts             # All portfolio content (unchanged)
│
├── components/
│   ├── sections/           # Page-specific, non-reusable
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── experience.tsx
│   │   ├── skills.tsx
│   │   ├── education.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   │
│   └── ui/                 # Reusable primitives (from ui.tsx)
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       └── ...             # whatever else is in ui.tsx
│
└── lib/
    └── utils.ts            # cn() and other utilities
```

## Key Conventions

- **All content lives in `app/data.ts`** — when updating portfolio info (experience, skills, education, bio), edit only that file.
- Components are colocated: sections in `sections.tsx`, primitives in `ui.tsx`.
- No separate `components/` folder — keep it flat unless the project grows significantly.
- Use `cn()` from `utils.ts` for conditional class merging (clsx + tailwind-merge).

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Notes

- This is a single-page portfolio — no routing beyond `/`.
- No backend, database, or API routes.
- Deployment target: Vercel.
