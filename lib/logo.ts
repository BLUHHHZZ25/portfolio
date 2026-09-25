// Single source of truth for the brand mark geometry, shared by the React
// <Logo> component and the next/og routes (icon, apple-icon, opengraph-image)
// so the monogram is pixel-identical everywhere.
//
// A monoline "R": vertical stem, a D-shaped bowl on the top half, and a
// diagonal leg — drawn in a 32×32 space, centered with even margins so it
// stays legible down to favicon size.
export const LOGO_VIEWBOX = 32

export const LOGO_R_PATH = "M11 9 V23 M11 9 H16.5 a5 5 0 0 1 0 10 H11 M14.5 19 L21 23.5"

// Brand gradient stops (blue → purple → pink), matching --brand-gradient.
export const BRAND_STOPS = [
  { offset: "0%", color: "#3b82f6" },
  { offset: "50%", color: "#a855f7" },
  { offset: "100%", color: "#ec4899" },
] as const
