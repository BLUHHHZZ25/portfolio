import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { portfolioData } from "@/app/data"
import { SurfaceCard } from "@/components/ui/surface-card"
import { SectionHeading } from "@/components/ui/section-heading"

export function Projects() {
  const [featured, ...rest] = portfolioData.projects

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Work"
          title="Projects"
          description="A selection of products, freelance builds, and experiments shipped over the past few years."
        />

        {/* Featured */}
        {featured && (
          <SurfaceCard
            as="article"
            className="grid grid-cols-1 md:grid-cols-5 mb-6 group"
            hover={false}
          >
            <div className="relative md:col-span-3 h-64 md:h-auto overflow-hidden">
              <Image
                src={featured.image}
                alt={`${featured.title} — ${featured.stack.slice(0, 3).join(", ")} project screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={false}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-[var(--background)]/80 backdrop-blur border border-[var(--border)]">
                Featured
              </span>
            </div>
            <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center gap-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold leading-tight">{featured.title}</h3>
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${featured.title}`}
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors shrink-0 mt-1"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {featured.stack.map(tech => (
                  <span
                    key={tech}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--muted)]/50 text-[var(--muted-foreground)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </SurfaceCard>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map(project => (
            <SurfaceCard key={project.title} as="article" className="group flex flex-col">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.stack.slice(0, 3).join(", ")} project screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 to-transparent" />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors shrink-0 mt-0.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.map(tech => (
                    <span
                      key={tech}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--muted)]/50 text-[var(--muted-foreground)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  )
}
