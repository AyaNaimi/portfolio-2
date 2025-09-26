"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { ProjectsManager } from "@/components/admin/projects-manager"
import { MessagesManager } from "@/components/admin/messages-manager"
import { LogOut, Settings, FileText, MessageSquare, BarChart3, Users, Plus } from "lucide-react"

const stats = [
  {
    title: "Projets",
    value: "12",
    change: "+2 ce mois",
    icon: <FileText className="h-6 w-6" />,
    color: "text-blue-500",
  },
  {
    title: "Messages",
    value: "24",
    change: "+8 cette semaine",
    icon: <MessageSquare className="h-6 w-6" />,
    color: "text-green-500",
  },
  {
    title: "Visiteurs",
    value: "1,234",
    change: "+15% ce mois",
    icon: <Users className="h-6 w-6" />,
    color: "text-purple-500",
  },
  {
    title: "Vues",
    value: "5,678",
    change: "+23% ce mois",
    icon: <BarChart3 className="h-6 w-6" />,
    color: "text-orange-500",
  },
]

export function AdminDashboard() {
  const { logout, user } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-gradient">Admin</div>
              <Badge variant="secondary" className="glass">
                {user?.username || "Admin"}
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" onClick={logout} className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-5 w-5 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="glass">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="projects"><FileText className="h-4 w-4 mr-2" />Projets</TabsTrigger>
            <TabsTrigger value="messages"><MessageSquare className="h-4 w-4 mr-2" />Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Welcome */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 font-heading">Tableau de bord</h1>
              <p className="text-muted-foreground">Gérez votre portfolio et suivez vos statistiques</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="glass p-6 animate-tilt">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-green-500 mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-primary/20 ${stat.color}`}>{stat.icon}</div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <div>
                <Card className="glass p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Actions rapides</h2>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start glass hover:bg-primary/10 bg-transparent"
                      onClick={() => setActiveTab("projects")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un projet
                    </Button>
                    <Button variant="outline" className="w-full justify-start glass hover:bg-primary/10 bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Nouvel article
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start glass hover:bg-primary/10 bg-transparent"
                      onClick={() => setActiveTab("messages")}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Voir messages
                    </Button>
                    <Button variant="outline" className="w-full justify-start glass hover:bg-primary/10 bg-transparent">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card className="glass p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Activité récente</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg glass">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Nouveau message reçu</p>
                        <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg glass">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Projet "E-Commerce" mis à jour</p>
                        <p className="text-xs text-muted-foreground">Il y a 5 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg glass">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Nouveau visiteur sur le portfolio</p>
                        <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
