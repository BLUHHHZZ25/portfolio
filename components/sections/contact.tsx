"use client"

import Script from "next/script"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { portfolioData } from "@/app/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Sign up at https://formspree.io and replace this with your form ID
const FORMSPREE_ID = "YOUR_FORMSPREE_ID"

type Status = "idle" | "loading" | "success" | "error"

export function Contact() {
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
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
    <section id="contact" className="py-24 bg-[var(--muted)]/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase mb-2">Reach out</p>
          <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
          <p className="text-[var(--muted-foreground)] mt-3 max-w-md">
            Open to full-time roles, freelance projects, and collaborations. Let&apos;s build something great.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: Mail, label: "Email", value: portfolioData.email },
            { icon: Phone, label: "Phone", value: portfolioData.phone },
            { icon: MapPin, label: "Location", value: portfolioData.location },
          ].map(({ icon: Icon, label, value }) => (
            <Card key={label}>
              <CardContent className="p-5 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
                  <p className="text-sm font-medium break-all">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-6 sm:p-8">
              <p className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase mb-6">Send a message</p>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                  <p className="text-lg font-semibold">Message sent!</p>
                  <p className="text-sm text-[var(--muted-foreground)]">Thanks for reaching out — I&apos;ll get back to you soon.</p>
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
            </CardContent>
          </Card>

          {/* Calendly */}
          <div>
            <p className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase mb-4">Schedule a call</p>
            <div
              className="calendly-inline-widget rounded-xl overflow-hidden border border-[var(--border)] w-full"
              data-url={portfolioData.calendly}
              style={{ minWidth: "280px", height: "700px" }}
            />
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="lazyOnload"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
