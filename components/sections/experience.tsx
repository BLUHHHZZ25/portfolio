"use client"

import { GraduationCap } from "lucide-react"
import { portfolioData } from "@/app/data"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Work Experience */}
        <div className="mb-12">
          <p className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase mb-2">Career</p>
          <h2 className="text-3xl font-bold tracking-tight">Work Experience</h2>
        </div>

        <div className="space-y-1 gap-5 md:flex flex-row md:gap-5 mb-16">
          {portfolioData.experience.map((job, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle className="text-lg">{job.role}</CardTitle>
                    <CardDescription className="text-base font-medium mt-0.5">
                      {job.company}
                    </CardDescription>
                  </div>
                  <span className="text-sm font-mono text-[var(--muted-foreground)] bg-[var(--muted)] px-2.5 py-1 rounded-md whitespace-nowrap">
                    {job.period}
                  </span>
                </div>
              </CardHeader>
              <Separator className="mx-6 w-auto" />
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {job.highlights.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm text-[var(--muted-foreground)]">
                      <span className="text-[var(--primary)] mt-0.5 shrink-0">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Education */}
        <div className="mb-12">
          <p className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase mb-2">Background</p>
          <h2 className="text-3xl font-bold tracking-tight">Education</h2>
        </div>

        <div className="space-y-1 gap-5 md:flex flex-row md:gap-5">
          {portfolioData.education.map((edu, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex gap-3 items-start">
                    <div className="mt-0.5 p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{edu.degree}</CardTitle>
                      <CardDescription className="text-base font-medium mt-0.5">
                        {edu.school}
                      </CardDescription>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-[var(--muted-foreground)] bg-[var(--muted)] px-2.5 py-1 rounded-md whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
