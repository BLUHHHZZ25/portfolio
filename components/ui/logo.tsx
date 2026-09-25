"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"
import { LOGO_R_PATH } from "@/lib/logo"

/**
 * Brand mark: a monoline "R" monogram set in a frosted brand-gradient chip.
 * Self-contained SVG (fixed gradients, not theme tokens) so it reads on any
 * background — transparent navbar, footer, OG image. Matches the next/og routes.
 * Gradient ids are per-instance (useId) so multiple <Logo>s on one page don't
 * collide into duplicate DOM ids.
 */
export function LogoMark({ className, title = "roger.dev" }: { className?: string; title?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "")
  const brandId = `logoBrand-${uid}`
  const glossId = `logoGloss-${uid}`
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id={brandId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id={glossId} x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Gradient chip + glass gloss + inner highlight ring */}
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill={`url(#${brandId})`} />
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill={`url(#${glossId})`} />
      <rect
        x="1.25"
        y="1.25"
        width="29.5"
        height="29.5"
        rx="7.75"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.28"
        strokeWidth="1"
      />
      {/* Monogram */}
      <path
        d={LOGO_R_PATH}
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Mark + "roger.dev" wordmark, used in the navbar and footer. */
export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="w-8 h-8 shrink-0 rounded-[8.5px] shadow-sm transition-[filter,transform] duration-200 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_4px_12px_rgba(168,85,247,0.45)]" />
      {showWordmark && (
        <span className="font-mono text-sm font-semibold tracking-tight">
          roger<span className="brand-gradient-text">.dev</span>
        </span>
      )}
    </span>
  )
}
