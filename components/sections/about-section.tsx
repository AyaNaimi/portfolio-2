"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Code, Coffee } from "lucide-react"

const timeline = [
  // {
  //   year: "2024",
  //   title: "Lead Developer",
  //   company: "TechCorp Solutions",
  //   description: "Direction technique d'une équipe de 5 développeurs, architecture de solutions cloud-native.",
  // },
  {
    year: "2026",
    title: "Full-Stack Developer",
    company: "ISGI",
    description: "Développement d'applications React/Node.js .",
  },
  {
    year: "2025",
    title: "1 ére année en developpement digital",
    company: "ISGI",
    description: "Savoir les base de programmation.",},
  {
    year: "2024",
    title: "baccalauréat",
    company: "École Alwiaame",
    description: "baccalauréat en sciences physiques",
  },
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 background-transparent">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 text-gradient transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            À propos de moi
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Développeur passionné avec  la création d'applications web modernes et
            performantes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Info */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <Card className="glass p-8 animate-tilt">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Qui suis-je ?</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Passionné par les technologies web depuis mes études, j'ai développé une expertise complète en
                développement full-stack. J'aime créer des solutions élégantes qui allient performance technique et
                expérience utilisateur exceptionnelle.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-foreground">casablanca, Morocco</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-foreground">1+ années d'expérience</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-primary" />
                  <span className="text-foreground">3+ projets réalisés</span>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="h-5 w-5 text-primary" />
                  <span className="text-foreground">∞ cafés consommés</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  React Expert
                </Badge>
                <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                  Node.js
                </Badge>
                <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                  TypeScript
                </Badge>
              </div>
            </Card>
          </div>

          {/* Timeline */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-2xl font-bold mb-8 text-foreground">Mon parcours</h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative pl-8 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  {/* Timeline line */}
                  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-primary to-secondary" />
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary transform -translate-x-1/2" />

                  <Card className="glass p-6 hover:bg-primary/5 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-primary border-primary/50">
                        {item.year}
                      </Badge>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                    </div>
                    <p className="text-secondary font-medium mb-2">{item.company}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
