"use client"

import { Mail, MapPin } from "lucide-react"
import { portfolioData } from "@/app/data"
import { Button } from "@/components/ui/button"
import GradientText from "../ui/gradient-text"
import { Particles } from "../ui/particles"
import TextGenerateEffect from "../ui/generate-text-effect"

export function Hero() {
  return (
    <Particles quantity={400} color="#ffffff">
      <section id="about" className="min-h-screen flex items-center pt-16">
        <div className="max-w-4xl mx-auto px-6 py-24 w-full">
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase">
                  Hello, I&apos;m
                </p>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                  <GradientText text={portfolioData.name}/>
                </h1>
                <p className="text-2xl md:text-3xl text-[var(--muted-foreground)] font-light">
                  {portfolioData.title}
                </p>
              </div>

              <p className="text-base text-[var(--muted-foreground)] max-w-xl leading-relaxed">
                <TextGenerateEffect words={portfolioData.bio}/>
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {portfolioData.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {portfolioData.email}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild>
                  <a href="#contact">Get in touch</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#experience">View work</a>
                </Button>
              </div>
            </div>
        </div>
      </section>
    </Particles>
  )
}
