"use client"

import Image from "next/image"
import { images } from "@/public/images"
import { SurfaceCard } from "@/components/ui/surface-card"

const topStack = ["React Native", "Next.js", "FastAPI", "AWS"]

export default function ProfileCard() {
  return (
    <SurfaceCard className="w-[320px] p-3 pb-5" hover={false}>
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

      <div className="px-2 pt-4 flex flex-wrap gap-1.5">
        {topStack.map(tech => (
          <span
            key={tech}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--muted)]/50 text-[var(--muted-foreground)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </SurfaceCard>
  )
}
