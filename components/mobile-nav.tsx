"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Home, User, FolderOpen, Briefcase, Mail, MessageSquare } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const menuItems = [
  { title: "Accueil", icon: Home, href: "#home" },
  { title: "À propos", icon: User, href: "#about" },
  { title: "Projets", icon: FolderOpen, href: "#projects" },
  { title: "Services", icon: Briefcase, href: "#services" },
  { title: "Contact", icon: Mail, href: "#contact" },
  { title: "Avis", icon: MessageSquare, href: "#reviews" },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <>
      {/* Fixed mobile header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
Aya Naimi              </h2>
            </div>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-purple-500/20 rounded-xl">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-gradient-to-b from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-xl border-l border-purple-500/20 p-0"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-bold">A</span>
                      </div>
                      <div>
                        <h2 className="font-bold text-lg text-white">Aya Naimi</h2>
                        <p className="text-sm text-slate-400">Full-Stack Developer</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 p-4">
                  <nav className="space-y-2">
                    {menuItems.map((item) => (
                      <Button
                        key={item.title}
                        variant="ghost"
                        onClick={() => scrollToSection(item.href)}
                        className="w-full justify-start h-12 text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 rounded-xl transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-700/50 group-hover:bg-gradient-to-br group-hover:from-cyan-400/80 group-hover:to-purple-500/80 flex items-center justify-center mr-3 transition-all duration-300">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </Button>
                    ))}
                  </nav>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-purple-500/20">
                  <ThemeToggle />
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-300 font-medium">Disponible</span>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  )
}
