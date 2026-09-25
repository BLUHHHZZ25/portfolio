"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

type GsapRevealProps = {
  children: React.ReactNode
  className?: string
  as?: "div" | "section"
}

/**
 * Scroll-triggered reveal driven by GSAP ScrollTrigger.
 * Animates every descendant marked `data-reveal` up + fade as it enters the
 * viewport, staggering elements that enter together. Replaces the old
 * IntersectionObserver <Reveal>. Reduced motion is honored via gsap.matchMedia:
 * under it, no tweens are created and content renders at its natural state.
 */
export function GsapReveal({ children, className, as: As = "div" }: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current)
      if (items.length === 0) return

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Set the hidden start state during useGSAP's layout effect (before paint)
        // so nothing flashes; elements below the fold stay hidden until scrolled to.
        gsap.set(items, { opacity: 0, y: 28 })
        ScrollTrigger.batch(items, {
          start: "top 88%",
          onEnter: batch =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
              overwrite: true,
            }),
        })
      })
    },
    { scope: ref },
  )

  return (
    <As ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </As>
  )
}
