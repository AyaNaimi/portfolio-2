"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProjectCarousel } from "@/components/project-carousel"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { ExternalLink, Github, Eye, Heart, Star, Grid, List } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  status: "Terminé" | "En cours" | "Planifié"
  featured: boolean
  views: number
  likes: number
  githubUrl: string
  liveUrl: string
}

const initialProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Plateforme e-commerce complète avec paiement intégré et dashboard admin",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    status: "Terminé",
    featured: true,
    views: 1250,
    likes: 89,
    githubUrl: "https://github.com/alexdubois/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Application de gestion de tâches collaborative avec temps réel",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
    status: "En cours",
    featured: false,
    views: 890,
    likes: 67,
    githubUrl: "https://github.com/alexdubois/task-manager",
    liveUrl: "https://task-manager-demo.vercel.app",
  },
  {
    id: "3",
    title: "Portfolio Designer",
    description: "Portfolio interactif pour designer avec animations avancées",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Vue.js", "Three.js", "GSAP", "Nuxt"],
    status: "Terminé",
    featured: true,
    views: 2100,
    likes: 156,
    githubUrl: "https://github.com/alexdubois/portfolio-designer",
    liveUrl: "https://portfolio-designer-demo.vercel.app",
  },
]

export function ProjectsSection() {
  const [projects, setProjects] = useLocalStorage<Project[]>("portfolio-projects", initialProjects)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel")

  useEffect(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    setFilteredProjects(filtered)
  }, [projects, searchTerm, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Terminé":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "En cours":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Planifié":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const handleLinkClick = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  const handleLikeProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === projectId ? { ...project, likes: project.likes + 1 } : project)),
    )
  }

  const handleViewProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === projectId ? { ...project, views: project.views + 1 } : project)),
    )
  }

  return (
    <section id="projects" className="py-20 px-6 bg-slate-900/50" style={{borderRadius:"20px"}}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-fade-in-up">
            Mes Projets
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-8 animate-fade-in-up"></div>

          <div className="flex flex-col lg:flex-row gap-4 justify-center items-center max-w-4xl mx-auto mb-8">
            <Input
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:flex-1 bg-slate-800/50 border-purple-500/20 text-white placeholder:text-gray-400 transition-all duration-300 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48 bg-slate-800/50 border-purple-500/20 text-white transition-all duration-300 hover:border-purple-500/40">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-purple-500/20">
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Terminé">Terminé</SelectItem>
                <SelectItem value="En cours">En cours</SelectItem>
                <SelectItem value="Planifié">Planifié</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center gap-2 mb-8">
            <Button
              variant={viewMode === "carousel" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("carousel")}
              className={`transition-all duration-300 ${
                viewMode === "carousel"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  : "border-purple-500/20 hover:bg-purple-500/10 bg-transparent text-gray-300"
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              Carousel
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  : "border-purple-500/20 hover:bg-purple-500/10 bg-transparent text-gray-300"
              }`}
            >
              <Grid className="w-4 h-4 mr-2" />
              Grille
            </Button>
          </div>
        </div>

        {/* Carousel View */}
        {viewMode === "carousel" && (
          <div className="animate-fade-in-up">
            <ProjectCarousel
              projects={filteredProjects}
              onProjectClick={(project) => {
                handleViewProject(project.id)
              }}
            />
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 animate-fade-in-up">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    onClick={() => handleViewProject(project.id)}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {project.featured && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge
                    className={`absolute top-3 right-3 ${getStatusColor(project.status)} transition-all duration-300 group-hover:scale-110`}
                  >
                    {project.status}
                  </Badge>

                  {/* Action Buttons */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleLinkClick(project.liveUrl)}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 hover:scale-110 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleLinkClick(project.githubUrl)}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 hover:scale-110 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-300 text-xs hover:border-cyan-400/50 hover:text-cyan-200 transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${techIndex * 50}ms` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleViewProject(project.id)}
                        className="flex items-center gap-1 hover:text-cyan-400 transition-colors duration-300 group/stat"
                      >
                        <Eye className="w-4 h-4 group-hover/stat:animate-pulse" />
                        {project.views}
                      </button>
                      <button
                        onClick={() => handleLikeProject(project.id)}
                        className="flex items-center gap-1 hover:text-red-400 transition-colors duration-300 group/like"
                      >
                        <Heart className="w-4 h-4 group-hover/like:animate-pulse group-hover/like:fill-red-400" />
                        {project.likes}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLinkClick(project.liveUrl)}
                      className="flex-1 border-purple-500/20 hover:bg-purple-500/10 bg-transparent hover:border-purple-400/40 transition-all duration-300 hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Voir le site
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLinkClick(project.githubUrl)}
                      className="flex-1 border-purple-500/20 hover:bg-purple-500/10 bg-transparent hover:border-purple-400/40 transition-all duration-300 hover:scale-105"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code source
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <p className="text-gray-400 text-lg">Aucun projet trouvé pour les critères sélectionnés.</p>
          </div>
        )}
      </div>
    </section>
  )
}
