"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"
import { portfolioData } from "@/app/data"

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

export function Projects() {
  const isDark = useIsDark()

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase mb-2">Work</p>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project) => (
            <div
              key={project.title}
              style={{
                borderRadius: 20,
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                background: isDark
                  ? "linear-gradient(160deg,#1a1f35 0%,#0d1120 100%)"
                  : "linear-gradient(160deg,#f8fafc 0%,#ffffff 100%)",
                boxShadow: isDark
                  ? "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset"
                  : "0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03) inset",
                overflow: "hidden",
                fontFamily: "'DM Sans', sans-serif",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = isDark
                  ? "0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08) inset"
                  : "0 20px 40px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06) inset"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = isDark
                  ? "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset"
                  : "0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03) inset"
              }}
            >
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: isDark
                      ? "linear-gradient(to bottom, transparent 50%, #0d1120 100%)"
                      : "linear-gradient(to bottom, transparent 50%, #f8fafc 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: isDark ? "#e2e8f0" : "#0f172a",
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)", flexShrink: 0 }}
                    className="hover:text-[var(--primary)] transition-colors mt-0.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.55)",
                  }}
                >
                  {project.description}
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        padding: "3px 10px",
                        borderRadius: 999,
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                        color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
