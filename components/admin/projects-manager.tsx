"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, ExternalLink, Github, Save, X } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  demoUrl: string
  githubUrl: string
  featured: boolean
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    image: "",
    technologies: [],
    category: "Full-Stack",
    demoUrl: "",
    githubUrl: "",
    featured: false,
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: Project[] = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
      toast({ title: "Erreur", description: "Échec du chargement des projets.", variant: "destructive" })
    }
  }

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects)
    // localStorage.setItem("admin_projects", JSON.stringify(newProjects))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (name === "technologies") {
      setFormData((prev) => ({ ...prev, [name]: value.split(",").map((tech) => tech.trim()) }))
    } else if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      setFormData((prev) => ({ ...prev, [name]: target.checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const projectData = { ...formData }

    try {
      let response
      if (editingProject) {
        // Mise à jour
        response = await fetch(`/api/projects`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...projectData, id: editingProject.id }),
        })
      } else {
        // Création
        response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        })
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      toast({ title: "Succès", description: `Projet ${editingProject ? "mis à jour" : "créé"} avec succès.` })
      resetForm()
      await fetchProjects() // Re-fetch projects after successful operation
    } catch (error) {
      console.error("Failed to save project:", error)
      toast({ title: "Erreur", description: "Échec de l'enregistrement du projet.", variant: "destructive" })
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      ...project,
      technologies: project.technologies,
    })
    setIsCreating(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      toast({ title: "Projet supprimé", description: "Le projet a été supprimé avec succès." })
      await fetchProjects() // Re-fetch projects after successful deletion
    } catch (error) {
      console.error("Failed to delete project:", error)
      toast({ title: "Erreur", description: "Échec de la suppression du projet.", variant: "destructive" })
    }
  }

  const resetForm = () => {
    setEditingProject(null)
    setIsCreating(false)
    setFormData({
      title: "",
      description: "",
      image: "",
      technologies: [],
      category: "Full-Stack",
      demoUrl: "",
      githubUrl: "",
      featured: false,
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 font-heading">Gestion des projets</h1>
          <p className="text-muted-foreground">Ajoutez, modifiez ou supprimez vos projets</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="gradient-violet-cyan text-white">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau projet
        </Button>
      </div>

      {/* Form */}
      {isCreating && (
        <Card className="glass p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              {editingProject ? "Modifier le projet" : "Nouveau projet"}
            </h2>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Titre</label>
                <Input name="title" value={formData.title} onChange={handleInputChange} required className="glass" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Catégorie</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm glass"
                >
                  <option value="Full-Stack">Full-Stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="glass"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Image</label>
                <Input
                  name="image"
                  type="file"
                  onChange={handleFileChange}
                  className="glass"
                  accept="image/*"
                />
                {formData.image && (
                  <div className="mt-2 relative w-32 h-32 overflow-hidden rounded-md">
                    <Image src={formData.image} alt="Preview" layout="fill" objectFit="cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Technologies (séparées par des virgules)
                </label>
                <Input
                  name="technologies"
                  value={formData.technologies?.join(", ")}
                  onChange={handleInputChange}
                  className="glass"
                  placeholder="React, Node.js, PostgreSQL"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">URL de démo</label>
                <Input
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleInputChange}
                  className="glass"
                  placeholder="https://demo.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">URL GitHub</label>
                <Input
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  className="glass"
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="rounded border-input"
              />
              <label className="text-sm font-medium text-foreground">Projet phare</label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="gradient-violet-cyan text-white">
                <Save className="h-4 w-4 mr-2" />
                {editingProject ? "Mettre à jour" : "Créer"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm} className="glass bg-transparent">
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Projects List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="glass overflow-hidden">
            <div className="relative">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              {project.featured && (
                <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground">Phare</Badge>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-foreground">{project.title}</h3>
                <Badge variant="secondary" className="glass text-xs">
                  {project.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
