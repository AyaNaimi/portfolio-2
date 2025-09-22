"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Filter } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Plateforme e-commerce complète avec gestion des commandes, paiements Stripe, et interface d'administration avancée.",
    image: "/modern-ecommerce-dashboard.png",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    category: "Full-Stack",
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Application de gestion de tâches collaborative avec temps réel, notifications et analytics.",
    image: "/task-management-interface.png",
    technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
    category: "Full-Stack",
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "Générateur de contenu IA avec interface moderne et intégration OpenAI pour la création automatisée.",
    image: "/ai-content-generator-interface.png",
    technologies: ["React", "OpenAI", "TailwindCSS", "Vercel"],
    category: "Frontend",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Real-time Chat API",
    description: "API de chat temps réel avec authentification JWT, salles privées et historique des messages.",
    image: "/chat-application-interface.png",
    technologies: ["Node.js", "Socket.io", "MongoDB", "JWT"],
    category: "Backend",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Portfolio Designer",
    description: "Outil de création de portfolios avec templates personnalisables et export automatique.",
    image: "/portfolio-design-tool.jpg",
    technologies: ["Vue.js", "Nuxt", "Supabase", "CSS"],
    category: "Frontend",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Analytics Dashboard",
    description: "Dashboard d'analytics avec visualisations interactives et rapports automatisés en temps réel.",
    image: "/analytics-dashboard-charts.png",
    technologies: ["React", "D3.js", "Express", "Redis"],
    category: "Full-Stack",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
]

const categories = ["Tous", "Full-Stack", "Frontend", "Backend"]

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [filteredProjects, setFilteredProjects] = useState(projects)
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

  useEffect(() => {
    if (selectedCategory === "Tous") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === selectedCategory))
    }
  }, [selectedCategory])

  return (
    <section ref={sectionRef} id="projects" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 text-gradient transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Mes projets
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Découvrez une sélection de mes réalisations, des applications web modernes aux APIs robustes.
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`glass transition-all duration-300 ${
                selectedCategory === category
                  ? "gradient-violet-cyan text-white"
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3
            className={`text-2xl font-bold mb-8 text-foreground transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            Projets phares
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects
              .filter((project) => project.featured)
              .map((project, index) => (
                <Card
                  key={project.id}
                  className={`glass overflow-hidden animate-tilt group transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" variant="secondary" className="glass">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="glass">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 text-foreground">{project.title}</h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className=" text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3
            className={`text-2xl font-bold mb-8 text-foreground transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            Autres réalisations
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects
              .filter((project) => !project.featured)
              .map((project, index) => (
                <Card
                  key={project.id}
                  className={`glass overflow-hidden animate-tilt group transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" variant="secondary" className="glass">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="glass">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-2 text-foreground">{project.title}</h4>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className=" text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="glass text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-lg text-muted-foreground mb-6">Intéressé par mon travail ?</p>
          <Button size="lg" className="gradient-violet-cyan text-white hover:opacity-90 transition-opacity">
            Voir tous mes projets sur GitHub
          </Button>
        </div>
      </div>
    </section>
  )
}
