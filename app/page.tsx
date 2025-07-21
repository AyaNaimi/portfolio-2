"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { ReviewsSection } from "@/components/reviews-section"
import { AdminPanel } from "@/components/admin-panel"
import { Chatbot } from "@/components/chatbot"
import { FloatingButtons } from "@/components/floating-buttons"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Desktop Sidebar */}
          <MobileNav />

          <SidebarInset className="lg:ml-0">
            <main className="flex-1">
              <HeroSection />
              <AboutSection />
              <ProjectsSection />
              <ServicesSection />
              <ContactSection />
              <ReviewsSection />
            </main>
          </SidebarInset>

          <FloatingButtons onAdminOpen={() => setIsAdminOpen(true)} onChatOpen={() => setIsChatOpen(true)} />

          <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

          <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

          <Toaster />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
