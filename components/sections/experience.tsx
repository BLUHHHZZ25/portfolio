import { Briefcase, GraduationCap } from "lucide-react"
import { portfolioData } from "@/app/data"
import { SurfaceCard } from "@/components/ui/surface-card"
import { SectionHeading } from "@/components/ui/section-heading"

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Career"
          title="Work Experience"
          description="Full-time and freelance work shipping production apps, APIs, and websites."
        />

        {/* Timeline — work */}
        <ol className="relative border-l border-[var(--border)] ml-3 md:ml-4 space-y-6 mb-20">
          {portfolioData.experience.map((job, i) => (
            <li key={i} className="relative pl-6 md:pl-8">
              <span
                aria-hidden="true"
                className="absolute -left-[11px] md:-left-[13px] top-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full brand-gradient-bg ring-4 ring-[var(--background)] flex items-center justify-center"
              >
                <Briefcase className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
              </span>

              <SurfaceCard padded hover={false}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold leading-tight">{job.role}</h3>
                    <p className="text-sm font-medium text-[var(--muted-foreground)] mt-0.5">
                      {job.company}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--muted-foreground)] bg-[var(--muted)] px-2.5 py-1 rounded-md whitespace-nowrap">
                    {job.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {job.highlights.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-sm text-[var(--muted-foreground)] leading-relaxed"
                    >
                      <span className="text-[var(--primary)] mt-0.5 shrink-0" aria-hidden="true">
                        ▸
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SurfaceCard>
            </li>
          ))}
        </ol>

        <SectionHeading
          eyebrow="Background"
          title="Education"
        />

        {/* Timeline — education */}
        <ol className="relative border-l border-[var(--border)] ml-3 md:ml-4 space-y-6">
          {portfolioData.education.map((edu, i) => (
            <li key={i} className="relative pl-6 md:pl-8">
              <span
                aria-hidden="true"
                className="absolute -left-[11px] md:-left-[13px] top-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/40 ring-4 ring-[var(--background)] flex items-center justify-center"
              >
                <GraduationCap className="w-2.5 h-2.5 md:w-3 md:h-3 text-[var(--primary)]" />
              </span>

              <SurfaceCard padded hover={false}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold leading-tight">{edu.degree}</h3>
                    <p className="text-sm font-medium text-[var(--muted-foreground)] mt-0.5">
                      {edu.school}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--muted-foreground)] bg-[var(--muted)] px-2.5 py-1 rounded-md whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>
              </SurfaceCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
