"use client"

import Image from "next/image"
import { images } from "@/public/images"
import { svgs } from "@/public/svgs"
import { cn } from "@/lib/utils"
import { SurfaceCard } from "@/components/ui/surface-card"

// Decorative floating badges around the photo, spread evenly around the
// perimeter. Theme-aware frosted chips (.glass-badge). `mono` flags a near-black
// brand mark (Next.js, WordPress, Elementor) that gets inverted to light in dark
// mode so it stays visible on the dark chip.
// Duda has no official SVG in Devicon/Simple Icons — drop the file at
// public/brand/duda.svg and add a { src: "/brand/duda.svg", … mono: true } entry.
const badges: { src: string; alt: string; pos: string; size: string; delay: string; mono?: boolean }[] = [
  { src: svgs.react, alt: "React", pos: "-top-5 -left-5", size: "w-14 h-14", delay: "0s" },
  { src: svgs.nextjs, alt: "Next.js", pos: "-top-6 right-10", size: "w-12 h-12", delay: "0.6s", mono: true },
  { src: "/brand/elementor.svg", alt: "Elementor", pos: "top-14 -right-6", size: "w-12 h-12", delay: "1.2s", mono: true },
  { src: svgs.typescript, alt: "TypeScript", pos: "-bottom-4 -right-5", size: "w-12 h-12", delay: "1.8s" },
  { src: "/brand/wordpress.svg", alt: "WordPress", pos: "-bottom-5 left-8", size: "w-12 h-12", delay: "2.4s", mono: true },
  { src: svgs.fastapi, alt: "FastAPI", pos: "top-1/2 -left-7", size: "w-12 h-12", delay: "3s" },
]

export default function ProfileCard() {
  return (
    <div className="relative w-[320px] mx-auto">
      {/* Soft brand glow behind the card for depth */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] blur-2xl brand-gradient-bg opacity-20"
      />

      <SurfaceCard className="w-[320px] p-3" hover={false}>
        <div className="relative h-[360px] rounded-xl overflow-hidden bg-[#e86c2c]">
          <Image
            src={images.profile}
            alt="Roger Moore Sangol — Full-Stack Developer"
            fill
            sizes="320px"
            priority
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          {/* Availability pill */}
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur border border-white/15">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 pulse-dot" />
              <span className="relative rounded-full w-2 h-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-medium tracking-wide text-white">
              Available for work
            </span>
          </div>
        </div>
      </SurfaceCard>

      {/* Floating logo badges */}
      {badges.map(badge => (
        <span
          key={badge.alt}
          aria-hidden="true"
          style={{ animationDelay: badge.delay }}
          className={cn(
            "float-badge glass-badge absolute z-20 flex items-center justify-center rounded-2xl",
            badge.size,
            badge.pos,
          )}
        >
          <Image
            src={badge.src}
            alt=""
            width={26}
            height={26}
            loading="lazy"
            className={cn(badge.mono && "badge-mono-logo")}
          />
        </span>
      ))}
    </div>
  )
}
