import Image from "next/image"
import { portfolioData } from "@/app/data"
import { svgs } from "@/public/svgs"
import { SurfaceCard } from "@/components/ui/surface-card"
import { SectionHeading } from "@/components/ui/section-heading"

const iconMap: Record<string, string> = {
  JavaScript: svgs.javascript,
  TypeScript: svgs.typescript,
  Python: svgs.python,
  React: svgs.react,
  "React Native": svgs.react,
  "Next.js": svgs.nextjs,
  HTML5: svgs.html5,
  CSS: svgs.css3,
  TailwindCSS: svgs.tailwindcss,
  Bootstrap: svgs.bootstrap,
  jQuery: svgs.jquery,
  "Node.js": svgs.nodejs,
  "Express.js": svgs.express,
  FastAPI: svgs.fastapi,
  PostgreSQL: svgs.postgresql,
  MySQL: svgs.mysql,
  Jest: svgs.jest,
  Redux: svgs.redux,
  Zustand: svgs.zustand,
  WordPress: svgs.wordpress,
  Webflow: svgs.webflow,
  PHP: svgs.php,
  Supabase: svgs.supabase,
  Firebase: svgs.firebase,
  Cloudflare: svgs.cloudflare,
}

const categoryAccent: Record<string, string> = {
  Languages: "#f59e0b",
  Frontend: "#3b82f6",
  Backend: "#10b981",
  Databases: "#8b5cf6",
  "Tools & Cloud": "#ec4899",
  "CMS & Builders": "#06b6d4",
}

function SkillPill({ skill }: { skill: string }) {
  const icon = iconMap[skill]
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--background)]/60 backdrop-blur text-sm font-medium transition-colors hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]/50">
      {icon ? (
        <Image src={icon} alt="" width={18} height={18} loading="lazy" aria-hidden="true" />
      ) : (
        <span className="inline-flex w-[18px] h-[18px] items-center justify-center rounded bg-[var(--muted)] text-[9px] font-bold text-[var(--muted-foreground)]">
          {skill.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-[var(--foreground)]">{skill}</span>
    </div>
  )
}

export function Skills() {
  const categories = Object.entries(portfolioData.skills)

  return (
    <section id="skills" className="py-24 bg-[var(--muted)]/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionHeading
          eyebrow="Stack"
          title="Tech Skills"
          description="The tools I reach for across mobile, web, backend, and cloud work."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(([category, skills]) => (
            <SurfaceCard key={category} padded className="relative" hover={false}>
              <span
                aria-hidden="true"
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
                style={{ background: categoryAccent[category] ?? "var(--primary)" }}
              />
              <div className="flex items-center gap-2 mb-4">
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full"
                  style={{ background: categoryAccent[category] ?? "var(--primary)" }}
                />
                <p className="text-xs font-mono uppercase tracking-widest text-[var(--foreground)]">
                  {category}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <SkillPill key={skill} skill={skill} />
                ))}
              </div>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  )
}
