"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { portfolioData } from "@/app/data"
import { svgs } from "@/public/svgs"

const iconMap: Record<string, string> = {
  JavaScript:    svgs.javascript,
  TypeScript:    svgs.typescript,
  Python:        svgs.python,
  React:         svgs.react,
  "React Native": svgs.react,
  "Next.js":     svgs.nextjs,
  HTML5:         svgs.html5,
  CSS:           svgs.css3,
  TailwindCSS:   svgs.tailwindcss,
  Bootstrap:     svgs.bootstrap,
  jQuery:        svgs.jquery,
  "Node.js":     svgs.nodejs,
  "Express.js":  svgs.express,
  FastAPI:       svgs.fastapi,
  PostgreSQL:    svgs.postgresql,
  MySQL:         svgs.mysql,
  Jest:          svgs.jest,
  Redux:         svgs.redux,
  WordPress:     svgs.wordpress,
  Webflow:       svgs.webflow,
}

const allSkills = Object.values(portfolioData.skills).flat()

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

function SkillCard({ skill }: { skill: string }) {
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
      style={{
        width: 88,
        height: 88,
        borderRadius: 16,
        border,
        background: bg,
        boxShadow: shadow,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
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
        <Image src={icon} alt={skill} width={30} height={30} unoptimized />
      ) : (
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: fallbackBg,
            border: fallbackBorder,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
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
          padding: "0 6px",
        }}
      >
        {skill}
      </span>
    </div>
  )
}

export function Skills() {
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
        <div className="flex flex-wrap gap-3">
          {allSkills.map((skill, i) => (
            <div
              key={skill}
              className="skill-card-anim"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
