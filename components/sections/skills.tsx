"use client"

import Image from "next/image"
import { portfolioData } from "@/app/data"

const iconMap: Record<string, string> = {
  // Languages
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  // Frontend
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  HTML5: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  TailwindCSS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  Bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
  jQuery: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg",
  // Backend
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  // Databases
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  // Tools & Cloud
  Jest: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg",
  Redux: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
  // CMS & Builders
  WordPress: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg",
  Webflow: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webflow/webflow-original.svg",
}

const allSkills = Object.values(portfolioData.skills).flat()

function SkillCard({ skill }: { skill: string }) {
  const icon = iconMap[skill]

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 hover:bg-[var(--muted)] transition-colors w-24 h-24">
      {icon ? (
        <Image src={icon} alt={skill} width={32} height={32} unoptimized />
      ) : (
        <div className="w-8 h-8 rounded-md bg-[var(--muted)] flex items-center justify-center text-xs font-bold text-[var(--muted-foreground)]">
          {skill.slice(0, 2).toUpperCase()}
        </div>
      )}
      <span className="text-[11px] font-medium text-center text-[var(--muted-foreground)] leading-tight line-clamp-2">
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

        <div className="flex flex-wrap gap-3">
          {allSkills.map((skill) => (
            <SkillCard key={skill} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
