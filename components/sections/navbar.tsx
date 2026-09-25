"use client"

import { useEffect, useState } from "react"
import { Download, Menu, Moon, Sun, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { portfolioData } from "@/app/data"
import { Logo } from "@/components/ui/logo"

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [activeId, setActiveId] = useState<string>("about")

  useEffect(() => {
    // The pre-paint script in layout.tsx already resolved and applied the theme
    // to <html>; mirror that into React state. It can't run during SSR, so it
    // must live in an effect rather than a state initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.classList.contains("dark"))
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
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Scroll-spy
  useEffect(() => {
    const sections = navLinks
      .map(l => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveId(visible.target.id)
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "glass-nav shadow-sm"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#about"
          aria-label="Home"
          className="group inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          <Logo />
        </a>

        {/* Desktop links */}
        <ul className="hidden sm:flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = activeId === link.id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative text-sm px-3 py-1.5 rounded-md transition-colors",
                    isActive
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full brand-gradient-bg"
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={portfolioData.resume}
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white brand-gradient-bg shadow-sm hover:opacity-90 transition-opacity"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            className="sm:hidden p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="sm:hidden px-6 pb-4 flex flex-col gap-1 glass-nav">
          {navLinks.map(link => {
            const isActive = activeId === link.id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block text-sm py-2 px-2 rounded-md transition-colors",
                    isActive
                      ? "text-[var(--foreground)] bg-[var(--muted)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                  )}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
          <li>
            <a
              href={portfolioData.resume}
              download
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 mt-2 px-3 py-2 rounded-md text-sm font-semibold text-white brand-gradient-bg"
            >
              <Download className="w-4 h-4 shrink-0" />
              Download Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
