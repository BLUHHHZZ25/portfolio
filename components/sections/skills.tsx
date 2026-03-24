"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { portfolioData } from "@/app/data"
import { svgs } from "@/public/svgs"
import { Card, CardContent } from "@/components/ui/card"

const iconMap: Record<string, string> = {
  JavaScript:     svgs.javascript,
  TypeScript:     svgs.typescript,
  Python:         svgs.python,
  React:          svgs.react,
  "React Native": svgs.react,
  "Next.js":      svgs.nextjs,
  HTML5:          svgs.html5,
  CSS:            svgs.css3,
  TailwindCSS:    svgs.tailwindcss,
  Bootstrap:      svgs.bootstrap,
  jQuery:         svgs.jquery,
  "Node.js":      svgs.nodejs,
  "Express.js":   svgs.express,
  FastAPI:        svgs.fastapi,
  PostgreSQL:     svgs.postgresql,
  MySQL:          svgs.mysql,
  Jest:           svgs.jest,
  Redux:          svgs.redux,
  Zustand:        svgs.zustand,
  WordPress:      svgs.wordpress,
  Webflow:        svgs.webflow,
  PHP:            svgs.php,
  Supabase:       svgs.supabase,
  Firebase:       svgs.firebase,
  Cloudflare:     svgs.cloudflare,
}

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

function SkillCard({ skill, index }: { skill: string; index: number }) {
  const icon = iconMap[skill]
  const isDark = useIsDark()

  const bg = isDark
    ? "linear-gradient(160deg,#1a1f35 0%,#0d1120 100%)"
    : "linear-gradient(160deg,#f8fafc 0%,#ffffff 100%)"
  const border = isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)"
  const shadow = isDark
    ? "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset"
    : "0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03) inset"
  const shadowHover = isDark
    ? "0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1) inset"
    : "0 16px 32px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06) inset"
  const labelColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)"
  const fallbackBg = isDark ? "linear-gradient(135deg,#1a1f35,#2a3050)" : "linear-gradient(135deg,#e2e8f0,#f1f5f9)"
  const fallbackBorder = isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)"
  const fallbackColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"

  return (
    <div
      className="skill-card-anim"
      style={{
        animationDelay: `${index * 35}ms`,
        width: 80,
        height: 80,
        borderRadius: 16,
        border,
        background: bg,
        boxShadow: shadow,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        cursor: "default",
        fontFamily: "'DM Sans', sans-serif",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = shadowHover
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = shadow
      }}
    >
      {icon ? (
        <Image src={icon} alt={skill} width={28} height={28} unoptimized />
      ) : (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: fallbackBg,
            border: fallbackBorder,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 700,
            color: fallbackColor,
          }}
        >
          {skill.slice(0, 2).toUpperCase()}
        </div>
      )}
      <span
        style={{
          fontSize: 10,
          fontWeight: 500,
          color: labelColor,
          textAlign: "center",
          lineHeight: 1.2,
          padding: "0 5px",
        }}
      >
        {skill}
      </span>
    </div>
  )
}

function CategoryCard({ category, skills, startIndex }: { category: string; skills: string[]; startIndex: number }) {
  return (
    <Card className="h-full">
      <CardContent className="p-5 sm:p-6">
        <p className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest mb-4 pb-2 border-b border-[var(--border)]">
          {category}
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <SkillCard key={skill} skill={skill} index={startIndex + i} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function Skills() {
  const categories = Object.entries(portfolioData.skills)
  let globalIndex = 0

  return (
    <section id="skills" className="py-24 bg-[var(--muted)]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase mb-2">Stack</p>
          <h2 className="text-3xl font-bold tracking-tight">Tech Skills</h2>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
          @keyframes skillFadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .skill-card-anim {
            animation: skillFadeUp 0.5s ease both;
          }
        `}</style>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(([category, skills]) => {
            const start = globalIndex
            globalIndex += skills.length
            return (
              <CategoryCard
                key={category}
                category={category}
                skills={skills}
                startIndex={start}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
