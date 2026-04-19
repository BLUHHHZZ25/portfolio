"use client"

import Script from "next/script"
import { useMemo, useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, Calendar } from "lucide-react"
import { portfolioData } from "@/app/data"
import { Button } from "@/components/ui/button"
import { SurfaceCard } from "@/components/ui/surface-card"
import { SectionHeading } from "@/components/ui/section-heading"

// Optional: set NEXT_PUBLIC_FORMSPREE_ID in env to enable the in-page form submit.
// If unset, the form falls back to a mailto: handoff so it still works.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID

type Status = "idle" | "loading" | "success" | "error"

export function Contact() {
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [showCalendar, setShowCalendar] = useState(false)

  const contactItems = useMemo(
    () => [
      { icon: Mail, label: "Email", value: portfolioData.email, href: `mailto:${portfolioData.email}` },
      { icon: Phone, label: "Phone", value: portfolioData.phone, href: `tel:${portfolioData.phone}` },
      { icon: MapPin, label: "Location", value: portfolioData.location, href: undefined },
    ],
    [],
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!FORMSPREE_ID) {
      // Mailto fallback
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
      window.location.href = `mailto:${portfolioData.email}?subject=${subject}&body=${body}`
      setStatus("success")
      return
    }

    setStatus("loading")
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-24 bg-[var(--muted)]/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <SectionHeading
          eyebrow="Reach out"
          title="Contact"
          description="Open to full-time roles, freelance projects, and collaborations. Let's build something great."
        />

        {/* Contact rail */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {contactItems.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <SurfaceCard padded className="h-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
                    <p className="text-sm font-medium truncate">{value}</p>
                  </div>
                </div>
              </SurfaceCard>
            )
            return href ? (
              <a key={label} href={href} className="block focus-visible:outline-none">
                {inner}
              </a>
            ) : (
              <div key={label}>{inner}</div>
            )
          })}
        </div>

        {/* Form */}
        <SurfaceCard padded hover={false} className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <p className="text-xs font-mono text-[var(--primary)] tracking-widest uppercase">
              Send a message
            </p>
            <button
              type="button"
              onClick={() => setShowCalendar(v => !v)}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              {showCalendar ? "Hide scheduler" : "Prefer a call? Book a time"}
            </button>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
              <p className="text-lg font-semibold">Message sent!</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Thanks for reaching out — I&apos;ll get back to you soon.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setStatus("idle")}>
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition resize-none"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send message
                    </>
                  )}
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                  <a href={`mailto:${portfolioData.email}`}>
                    <Mail className="w-4 h-4" />
                    Email directly
                  </a>
                </Button>
              </div>
            </form>
          )}
        </SurfaceCard>

        {/* Collapsible calendar */}
        {showCalendar && (
          <div className="mt-6">
            <SurfaceCard hover={false} className="p-2">
              <div
                className="calendly-inline-widget rounded-xl overflow-hidden w-full"
                data-url={portfolioData.calendly}
                style={{ minWidth: "280px", height: "640px" }}
              />
              <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
              />
            </SurfaceCard>
          </div>
        )}
      </div>
    </section>
  )
}
