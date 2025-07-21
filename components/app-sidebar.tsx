"use client"

import { useState, useEffect } from "react"
import { Home, User, FolderOpen, Briefcase, Mail, MessageSquare, ChevronRight } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

const menuItems = [
  { title: "Accueil", icon: Home, href: "#home" },
  { title: "À propos", icon: User, href: "#about" },
  { title: "Projets", icon: FolderOpen, href: "#projects" },
  { title: "Services", icon: Briefcase, href: "#services" },
  { title: "Contact", icon: Mail, href: "#contact" },
  { title: "Avis", icon: MessageSquare, href: "#reviews" },
]

export function AppSidebar() {
  const [activeSection, setActiveSection] = useState("home")
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="group/sidebar" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Sidebar
        collapsible="icon"
        className={`
          border-r-0 bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl
          transition-all duration-300 ease-in-out
          ${isHovered ? "w-64" : "w-16"}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>

        <SidebarHeader className={`relative z-10 transition-all duration-300 ${isHovered ? "p-6" : "p-2"}`}>
          <div className="flex items-center gap-4 group">
            <div className="relative flex-shrink-0">
              <div
                className={`rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105 ${isHovered ? "w-12 h-12" : "w-10 h-10"}`}
              >
                <span
                  className={`text-white font-bold ${isHovered ? "text-xl" : "text-lg"} transition-all duration-300`}
                >
                  A
                </span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>

            <div
              className={`flex-1 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}
            >
              <h2 className="font-bold text-lg bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-300 whitespace-nowrap">
                Alex Dubois
              </h2>
              <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300 whitespace-nowrap">
                Full-Stack Developer
              </p>
              <div className="w-full h-0.5 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="relative z-10 flex-1">
          <SidebarGroup className="flex-1">
            <SidebarGroupContent className="flex-1">
              <SidebarMenu className="space-y-2 px-2 flex-1">
                {menuItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => scrollToSection(item.href)}
                        tooltip={!isHovered ? item.title : undefined}
                        className={`
                          relative group h-12 rounded-xl transition-all duration-300 overflow-hidden
                          ${isHovered ? "justify-start px-3" : "justify-center px-0 w-12 mx-auto"}
                          ${
                            isActive
                              ? "bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 text-white shadow-lg shadow-purple-500/10 border border-purple-500/30"
                              : "hover:bg-gradient-to-r hover:from-cyan-500/10 hover:via-purple-500/10 hover:to-pink-500/10 text-slate-300 hover:text-white border border-transparent hover:border-purple-500/20"
                          }
                        `}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div
                          className={`
                          absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          ${isActive ? "opacity-100" : ""}
                        `}
                        ></div>

                        <div
                          className={`
                          rounded-lg flex items-center justify-center transition-all duration-300 relative z-10 flex-shrink-0
                          ${isHovered ? "w-8 h-8" : "w-6 h-6"}
                          ${
                            isActive
                              ? "bg-gradient-to-br from-cyan-400 to-purple-500 text-white shadow-lg"
                              : "bg-slate-700/50 group-hover:bg-gradient-to-br group-hover:from-cyan-400/80 group-hover:to-purple-500/80 group-hover:text-white"
                          }
                        `}
                        >
                          <item.icon className={`transition-all duration-300 ${isHovered ? "w-4 h-4" : "w-4 h-4"}`} />
                        </div>

                        <span
                          className={`
                            font-medium relative z-10 text-left whitespace-nowrap transition-all duration-300
                            ${isHovered ? "opacity-100 translate-x-0 ml-3" : "opacity-0 -translate-x-4 ml-0 w-0 overflow-hidden"}
                          `}
                        >
                          {item.title}
                        </span>

                        <ChevronRight
                          className={`
                          w-4 h-4 transition-all duration-300 relative z-10 flex-shrink-0
                          ${isHovered ? "opacity-100 translate-x-0 ml-auto" : "opacity-0 -translate-x-4 w-0 overflow-hidden"}
                          ${isActive ? "text-cyan-300" : "text-slate-500 group-hover:text-purple-300"}
                        `}
                        />

                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-r-full"></div>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className={`relative z-10 transition-all duration-300 ${isHovered ? "p-6" : "p-2"}`}>
          <div className="space-y-4">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>

            <div className={`transition-all duration-300 ${isHovered ? "" : "flex justify-center"}`}>
              <ThemeToggle isCollapsed={!isHovered} />
            </div>

            <div
              className={`text-center transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-300 font-medium whitespace-nowrap">Disponible</span>
              </div>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}
