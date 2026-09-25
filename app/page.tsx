import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Experience } from "@/components/sections/experience"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { GsapReveal } from "@/components/ui/gsap-reveal"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <SpeedInsights />
        <Hero />
        <GsapReveal><Experience /></GsapReveal>
        <GsapReveal><Skills /></GsapReveal>
        <GsapReveal><Projects /></GsapReveal>
        <GsapReveal><Contact /></GsapReveal>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
