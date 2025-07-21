"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/image-upload"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useToast } from "@/hooks/use-toast"
import {
  X,
  BarChart3,
  FolderOpen,
  MessageSquare,
  Mail,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Check,
  Download,
  Upload,
  Star,
  Users,
  Globe,
  Clock,
  Save,
  ExternalLink,
  Github,
} from "lucide-react"

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

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

interface Comment {
  id: string
  name: string
  email: string
  rating: number
  comment: string
  date: string
  approved: boolean
}

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  status: "new" | "read" | "replied" | "closed"
}

interface Visitor {
  id: string
  ip: string
  location: string
  device: string
  page: string
  date: string
  duration: number
  returning: boolean
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  // Data management with localStorage
  const [projects, setProjects] = useLocalStorage<Project[]>("portfolio-projects", [])
  const [comments, setComments] = useLocalStorage<Comment[]>("portfolio-comments", [])
  const [messages, setMessages] = useLocalStorage<ContactMessage[]>("portfolio-messages", [])
  const [visitors, setVisitors] = useLocalStorage<Visitor[]>("portfolio-visitors", [])

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    status: "En cours" as const,
    featured: false,
    githubUrl: "",
    liveUrl: "",
  })

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      technologies: newProject.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      views: 0,
      likes: 0,
    }

    setProjects((prev) => [...prev, project])
    setNewProject({
      title: "",
      description: "",
      image: "",
      technologies: "",
      status: "En cours",
      featured: false,
      githubUrl: "",
      liveUrl: "",
    })

    toast({
      title: "Projet ajouté !",
      description: "Le projet a été ajouté avec succès.",
    })
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setNewProject({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(", "),
      status: project.status,
      featured: project.featured,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
    })
  }

  const handleUpdateProject = () => {
    if (!editingProject || !newProject.title || !newProject.description) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    const updatedProject: Project = {
      ...editingProject,
      ...newProject,
      technologies: newProject.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }

    setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? updatedProject : p)))
    setEditingProject(null)
    setNewProject({
      title: "",
      description: "",
      image: "",
      technologies: "",
      status: "En cours",
      featured: false,
      githubUrl: "",
      liveUrl: "",
    })

    toast({
      title: "Projet mis à jour !",
      description: "Le projet a été modifié avec succès.",
    })
  }

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
    toast({
      title: "Projet supprimé !",
      description: "Le projet a été supprimé avec succès.",
    })
  }

  const handleApproveComment = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, approved: true } : c)))
    toast({
      title: "Commentaire approuvé !",
      description: "Le commentaire est maintenant visible.",
    })
  }

  const handleDeleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id))
    toast({
      title: "Commentaire supprimé !",
      description: "Le commentaire a été supprimé.",
    })
  }

  const handleUpdateMessageStatus = (id: string, status: ContactMessage["status"]) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)))
    toast({
      title: "Statut mis à jour !",
      description: "Le statut du message a été modifié.",
    })
  }

  const exportData = () => {
    const data = {
      projects,
      comments,
      messages,
      visitors,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `portfolio-data-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Données exportées !",
      description: "Le fichier a été téléchargé.",
    })
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.projects) setProjects(data.projects)
        if (data.comments) setComments(data.comments)
        if (data.messages) setMessages(data.messages)
        if (data.visitors) setVisitors(data.visitors)

        toast({
          title: "Données importées !",
          description: "Les données ont été restaurées avec succès.",
        })
      } catch (error) {
        toast({
          title: "Erreur d'importation",
          description: "Le fichier n'est pas valide.",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
  }

  const stats = {
    totalProjects: projects.length,
    totalViews: projects.reduce((acc, p) => acc + p.views, 0),
    totalComments: comments.length,
    pendingComments: comments.filter((c) => !c.approved).length,
    newMessages: messages.filter((m) => m.status === "new").length,
    totalVisitors: visitors.length,
    returningVisitors: visitors.filter((v) => v.returning).length,
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl h-[90vh] bg-slate-800 border-purple-500/20 flex flex-col animate-scale-in overflow-hidden mx-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-purple-500/20">
          <CardTitle className="text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            Administration
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-slate-700/50 m-4 mb-0 h-auto">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-purple-500/20 text-xs sm:text-sm p-2 sm:p-3 transition-all duration-300"
              >
                <BarChart3 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="data-[state=active]:bg-purple-500/20 text-xs sm:text-sm p-2 sm:p-3 transition-all duration-300"
              >
                <FolderOpen className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Projets</span>
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="data-[state=active]:bg-purple-500/20 text-xs sm:text-sm p-2 sm:p-3 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Commentaires</span>
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="data-[state=active]:bg-purple-500/20 text-xs sm:text-sm p-2 sm:p-3 transition-all duration-300"
              >
                <Mail className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Messages</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-purple-500/20 text-xs sm:text-sm p-2 sm:p-3 transition-all duration-300"
              >
                <TrendingUp className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <TabsContent value="dashboard" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: FolderOpen, label: "Projets", value: stats.totalProjects, color: "blue" },
                    { icon: Eye, label: "Vues totales", value: stats.totalViews, color: "green" },
                    { icon: MessageSquare, label: "En attente", value: stats.pendingComments, color: "yellow" },
                    { icon: Mail, label: "Nouveaux messages", value: stats.newMessages, color: "purple" },
                  ].map((stat, index) => (
                    <Card
                      key={index}
                      className="bg-slate-700/50 border-purple-500/20 hover:bg-slate-700/70 transition-all duration-300 hover:scale-105"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-${stat.color}-500/20 flex items-center justify-center`}
                          >
                            <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-sm text-gray-400">{stat.label}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-slate-700/50 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">Actions rapides</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        onClick={exportData}
                        className="w-full justify-start bg-slate-600/50 hover:bg-slate-600/70 text-white transition-all duration-300 hover:scale-105"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Exporter les données
                      </Button>
                      <div>
                        <input type="file" accept=".json" onChange={importData} className="hidden" id="import-data" />
                        <Button
                          onClick={() => document.getElementById("import-data")?.click()}
                          className="w-full justify-start bg-slate-600/50 hover:bg-slate-600/70 text-white transition-all duration-300 hover:scale-105"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Importer les données
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700/50 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">Statistiques rapides</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Projets en vedette</span>
                        <span className="text-white font-semibold">{projects.filter((p) => p.featured).length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Projets terminés</span>
                        <span className="text-white font-semibold">
                          {projects.filter((p) => p.status === "Terminé").length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Commentaires approuvés</span>
                        <span className="text-white font-semibold">{comments.filter((c) => c.approved).length}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6 mt-0">
                <Card className="bg-slate-700/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      {editingProject ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      {editingProject ? "Modifier le projet" : "Ajouter un projet"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Titre du projet *"
                        value={newProject.title}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
                        className="bg-slate-600/50 border-purple-500/20 text-white transition-all duration-300 focus:border-cyan-500/50"
                      />
                      <Select
                        value={newProject.status}
                        onValueChange={(value: any) => setNewProject((prev) => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger className="bg-slate-600/50 border-purple-500/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-purple-500/20">
                          <SelectItem value="Terminé">Terminé</SelectItem>
                          <SelectItem value="En cours">En cours</SelectItem>
                          <SelectItem value="Planifié">Planifié</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Textarea
                      placeholder="Description du projet *"
                      value={newProject.description}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                      className="bg-slate-600/50 border-purple-500/20 text-white transition-all duration-300 focus:border-cyan-500/50"
                      rows={3}
                    />

                    <ImageUpload
                      value={newProject.image}
                      onChange={(value) => setNewProject((prev) => ({ ...prev, image: value }))}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Technologies (séparées par des virgules)"
                        value={newProject.technologies}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, technologies: e.target.value }))}
                        className="bg-slate-600/50 border-purple-500/20 text-white transition-all duration-300 focus:border-cyan-500/50"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={newProject.featured}
                          onChange={(e) => setNewProject((prev) => ({ ...prev, featured: e.target.checked }))}
                          className="rounded border-purple-500/20"
                        />
                        <label htmlFor="featured" className="text-white text-sm">
                          Projet mis en avant
                        </label>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="URL GitHub"
                        value={newProject.githubUrl}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, githubUrl: e.target.value }))}
                        className="bg-slate-600/50 border-purple-500/20 text-white transition-all duration-300 focus:border-cyan-500/50"
                      />
                      <Input
                        placeholder="URL du site live"
                        value={newProject.liveUrl}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, liveUrl: e.target.value }))}
                        className="bg-slate-600/50 border-purple-500/20 text-white transition-all duration-300 focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="flex gap-3">
                      {editingProject ? (
                        <>
                          <Button
                            onClick={handleUpdateProject}
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Sauvegarder
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingProject(null)
                              setNewProject({
                                title: "",
                                description: "",
                                image: "",
                                technologies: "",
                                status: "En cours",
                                featured: false,
                                githubUrl: "",
                                liveUrl: "",
                              })
                            }}
                            className="border-gray-500/20 hover:bg-gray-500/10"
                          >
                            Annuler
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={handleAddProject}
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter le projet
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <Card
                      key={project.id}
                      className="bg-slate-700/50 border-purple-500/20 hover:bg-slate-700/70 transition-all duration-300 hover:scale-[1.02]"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-white font-semibold">{project.title}</h3>
                                {project.featured && (
                                  <Badge className="bg-yellow-500/20 text-yellow-400">
                                    <Star className="w-3 h-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-400 text-sm">{project.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                <span>{project.views} vues</span>
                                <span>{project.likes} likes</span>
                                <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                                  {project.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                {project.githubUrl && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => window.open(project.githubUrl, "_blank")}
                                    className="text-gray-400 hover:text-white p-1"
                                  >
                                    <Github className="w-4 h-4" />
                                  </Button>
                                )}
                                {project.liveUrl && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => window.open(project.liveUrl, "_blank")}
                                    className="text-gray-400 hover:text-white p-1"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditProject(project)}
                              className="border-purple-500/20 bg-transparent hover:bg-purple-500/10 transition-all duration-300 hover:scale-110"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProject(project.id)}
                              className="border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all duration-300 hover:scale-110"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="comments" className="space-y-4 mt-0">
                {comments.map((comment, index) => (
                  <Card
                    key={comment.id}
                    className="bg-slate-700/50 border-purple-500/20 hover:bg-slate-700/70 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-white font-semibold">{comment.name}</h3>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < comment.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                                  }`}
                                />
                              ))}
                            </div>
                            {!comment.approved && (
                              <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 animate-pulse">
                                En attente
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-300 mb-2">{comment.comment}</p>
                          <p className="text-sm text-gray-400">
                            {comment.email} • {comment.date}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {!comment.approved && (
                            <Button
                              size="sm"
                              onClick={() => handleApproveComment(comment.id)}
                              className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all duration-300 hover:scale-110"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteComment(comment.id)}
                            className="border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all duration-300 hover:scale-110"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="messages" className="space-y-4 mt-0">
                {messages.map((message, index) => (
                  <Card
                    key={message.id}
                    className="bg-slate-700/50 border-purple-500/20 hover:bg-slate-700/70 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-white font-semibold">{message.name}</h3>
                            <Badge
                              variant="outline"
                              className={`
                                ${message.status === "new" ? "border-blue-500/30 text-blue-400 animate-pulse" : ""}
                                ${message.status === "read" ? "border-yellow-500/30 text-yellow-400" : ""}
                                ${message.status === "replied" ? "border-green-500/30 text-green-400" : ""}
                                ${message.status === "closed" ? "border-gray-500/30 text-gray-400" : ""}
                              `}
                            >
                              {message.status === "new" && "Nouveau"}
                              {message.status === "read" && "Lu"}
                              {message.status === "replied" && "Répondu"}
                              {message.status === "closed" && "Fermé"}
                            </Badge>
                          </div>
                          <h4 className="text-cyan-400 font-medium mb-2">{message.subject}</h4>
                          <p className="text-gray-300 mb-2">{message.message}</p>
                          <p className="text-sm text-gray-400">
                            {message.email} • {message.date}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Select
                            value={message.status}
                            onValueChange={(value: any) => handleUpdateMessageStatus(message.id, value)}
                          >
                            <SelectTrigger className="w-32 bg-slate-600/50 border-purple-500/20 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-700 border-purple-500/20">
                              <SelectItem value="new">Nouveau</SelectItem>
                              <SelectItem value="read">Lu</SelectItem>
                              <SelectItem value="replied">Répondu</SelectItem>
                              <SelectItem value="closed">Fermé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Users, label: "Visiteurs totaux", value: stats.totalVisitors, color: "blue" },
                    { icon: TrendingUp, label: "Visiteurs récurrents", value: stats.returningVisitors, color: "green" },
                    { icon: Globe, label: "Desktop", value: "75%", color: "purple" },
                    { icon: Clock, label: "Temps moyen", value: "3m 24s", color: "orange" },
                  ].map((stat, index) => (
                    <Card
                      key={index}
                      className="bg-slate-700/50 border-purple-500/20 hover:bg-slate-700/70 transition-all duration-300 hover:scale-105"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-${stat.color}-500/20 flex items-center justify-center`}
                          >
                            <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-sm text-gray-400">{stat.label}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-slate-700/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Visiteurs récents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {visitors.map((visitor, index) => (
                        <div
                          key={visitor.id}
                          className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg hover:bg-slate-600/50 transition-all duration-300 animate-fade-in-up"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full ${visitor.returning ? "bg-green-400 animate-pulse" : "bg-blue-400"}`}
                              ></div>
                              <span className="text-white font-mono text-sm">{visitor.ip}</span>
                            </div>
                            <span className="text-gray-400">{visitor.location}</span>
                            <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                              {visitor.device}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-white text-sm">{visitor.page}</p>
                            <p className="text-gray-400 text-xs">
                              {visitor.date} • {visitor.duration}s
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
