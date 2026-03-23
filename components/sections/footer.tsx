"use client"

import { portfolioData } from "@/app/data"

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[var(--muted-foreground)]">
        <span>© {new Date().getFullYear()} {portfolioData.name}</span>
        <span className="font-mono text-xs">Built with Next.js & shadcn/ui</span>
      </div>
    </footer>
  )
}
