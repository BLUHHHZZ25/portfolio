import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Experience } from "@/components/sections/experience"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { Reveal } from "@/components/ui/reveal"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <SpeedInsights />
        <Hero />
        <Reveal><Experience /></Reveal>
        <Reveal><Skills /></Reveal>
        <Reveal><Projects /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
