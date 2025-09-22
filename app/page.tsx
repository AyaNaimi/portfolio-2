import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ContactSection } from "@/components/sections/contact-section"
import PixelBlast from "@/components/PixelBlast"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="absolute inset-0 z-[-1]">
        <PixelBlast className="" style={{}} />
      </div>
      <br /><br />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
