"use client"

import { GraduationCap } from "lucide-react"
import { portfolioData } from "@/app/data"
import { Card, CardContent } from "@/components/ui/card"

export function Education() {
  return (
    <section id="education" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase mb-2">Background</p>
          <h2 className="text-3xl font-bold tracking-tight">Education</h2>
        </div>

        <div className="space-y-4">
          {portfolioData.education.map((edu, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="mt-0.5 p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{edu.school}</p>
                    </div>
                    <span className="text-sm font-mono text-[var(--muted-foreground)] bg-[var(--muted)] px-2.5 py-1 rounded-md whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
