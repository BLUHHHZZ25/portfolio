"use client"

import { portfolioData } from "@/app/data"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-[var(--muted)]/40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase mb-2">Stack</p>
          <h2 className="text-3xl font-bold tracking-tight">Tech Skills</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(portfolioData.skills).map(([category, items]) => (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge key={skill} variant="secondary" className="font-normal">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
