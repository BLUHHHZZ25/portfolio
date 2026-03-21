import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Experience } from "@/components/sections/experience"
import { Skills } from "@/components/sections/skills"
import { Education } from "@/components/sections/education"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
