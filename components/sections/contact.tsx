"use client"

import Script from "next/script"
import { Mail, Phone, MapPin } from "lucide-react"
import { portfolioData } from "@/app/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-[var(--muted)]/40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase mb-2">Reach out</p>
          <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
          <p className="text-[var(--muted-foreground)] mt-3 max-w-md">
            Open to full-time roles, freelance projects, and collaborations. Let&apos;s build something great.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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

        <div className="flex flex-wrap gap-3 mb-10">
          <Button size="lg" asChild>
            <a href={`mailto:${portfolioData.email}`}>
              <Mail className="w-4 h-4" />
              Send me an email
            </a>
          </Button>
        </div>

        <div>
          <p className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase mb-4">Schedule a call</p>
          <div
            className="calendly-inline-widget rounded-xl overflow-hidden border border-[var(--border)]"
            data-url={portfolioData.calendly}
            style={{ minWidth: "320px", height: "700px" }}
          />
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="lazyOnload"
          />
        </div>
      </div>
    </section>
  )
}
