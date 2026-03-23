"use client"

import Image from "next/image"
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

function SkillCard({ skill }: { skill: string }) {
  const icon = iconMap[skill]

  return (
    <div
      style={{
        width: 88,
        height: 88,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "linear-gradient(160deg,#1a1f35 0%,#0d1120 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
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
        ;(e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1) inset"
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"
        ;(e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset"
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
            background: "linear-gradient(135deg,#1a1f35,#2a3050)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          {skill.slice(0, 2).toUpperCase()}
        </div>
      )}
      <span
        style={{
          fontSize: 10,
          fontWeight: 500,
          color: "rgba(255,255,255,0.55)",
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
