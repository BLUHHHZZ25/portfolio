"use client"

import { useState, useEffect } from "react"
import { Download, Menu, Moon, Sun, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { portfolioData } from "@/app/data"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)

  // Init theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = stored ? stored === "dark" : prefersDark
    setDark(isDark)
    document.documentElement.classList.toggle("dark", isDark)
    document.documentElement.classList.toggle("light", !isDark)
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    document.documentElement.classList.toggle("light", !next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 640) setMenuOpen(false) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "bg-[var(--background)]/80 backdrop-blur border-b border-[var(--border)] shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-mono text-sm font-semibold tracking-tight">
          roger<span className="text-[var(--primary)]">.</span>dev
        </span>

        {/* Desktop links */}
        <ul className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Download Resume — desktop */}
          <a
            href={portfolioData.resume}
            download
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-opacity hover:opacity-80"
            style={{
              background: "linear-gradient(90deg,#3b82f6,#a855f7,#ec4899,#a855f7,#3b82f6)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              border: "1px solid transparent",
              backgroundOrigin: "border-box",
              boxShadow: "inset 0 0 0 1px transparent",
              outline: "1px solid #a855f7",
              outlineOffset: "-1px",
            }}
          >
            <Download className="w-3.5 h-3.5" style={{ color: "#a855f7" }} />
            Resume
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul className="sm:hidden px-6 pb-4 flex flex-col gap-4 bg-[var(--background)]/95 backdrop-blur">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors py-1"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={portfolioData.resume}
              download
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-medium py-1 transition-opacity hover:opacity-80"
              style={{
                background: "linear-gradient(90deg,#3b82f6,#a855f7,#ec4899,#a855f7,#3b82f6)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <Download className="w-4 h-4 shrink-0" style={{ color: "#a855f7" }} />
              Download Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
