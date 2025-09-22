"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Mail, Trash2, Eye, Reply, Archive } from "lucide-react"

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  status: "nouveau" | "lu" | "répondu" | "archivé"
}

const initialMessages: ContactMessage[] = [
  {
    id: "1",
    name: "Marie Dupont",
    email: "marie@example.com",
    subject: "Demande de devis pour site e-commerce",
    message:
      "Bonjour, je souhaiterais avoir un devis pour la création d'un site e-commerce. Mon budget est d'environ 5000€. Pouvez-vous me contacter ?",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "nouveau",
  },
  {
    id: "2",
    name: "Pierre Martin",
    email: "pierre@example.com",
    subject: "Collaboration sur projet React",
    message:
      "Salut ! J'ai vu ton portfolio et j'aimerais discuter d'une possible collaboration sur un projet React/Node.js. Es-tu disponible pour un appel cette semaine ?",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: "lu",
  },
  {
    id: "3",
    name: "Sophie Bernard",
    email: "sophie@example.com",
    subject: "Question technique sur Next.js",
    message:
      "Bonjour, j'ai une question technique concernant l'optimisation des performances avec Next.js. Pourrais-tu m'aider ?",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "répondu",
  },
]

export function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [filter, setFilter] = useState<string>("tous")
  const { toast } = useToast()

  useEffect(() => {
    // Charger les messages depuis localStorage
    const savedMessages = localStorage.getItem("admin_messages")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  const saveMessages = (newMessages: ContactMessage[]) => {
    setMessages(newMessages)
    localStorage.setItem("admin_messages", JSON.stringify(newMessages))
  }

  const updateMessageStatus = (id: string, status: ContactMessage["status"]) => {
    const updatedMessages = messages.map((msg) => (msg.id === id ? { ...msg, status } : msg))
    saveMessages(updatedMessages)
    toast({
      title: "Statut mis à jour",
      description: `Le message a été marqué comme ${status}.`,
    })
  }

  const deleteMessage = (id: string) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id)
    saveMessages(updatedMessages)
    setSelectedMessage(null)
    toast({
      title: "Message supprimé",
      description: "Le message a été supprimé avec succès.",
    })
  }

  const filteredMessages = messages.filter((msg) => {
    if (filter === "tous") return true
    return msg.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nouveau":
        return "bg-red-500/20 text-red-500"
      case "lu":
        return "bg-blue-500/20 text-blue-500"
      case "répondu":
        return "bg-green-500/20 text-green-500"
      case "archivé":
        return "bg-gray-500/20 text-gray-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "À l'instant"
    if (diffInHours < 24) return `Il y a ${diffInHours}h`
    if (diffInHours < 48) return "Hier"
    return date.toLocaleDateString("fr-FR")
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Messages de contact</h1>
          <p className="text-muted-foreground">Gérez les messages reçus via le formulaire de contact</p>
        </div>
        <div className="flex gap-2">
          {["tous", "nouveau", "lu", "répondu", "archivé"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
              className={filter === status ? "gradient-violet-cyan text-white" : "glass"}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== "tous" && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {messages.filter((m) => m.status === status).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          {filteredMessages.map((message) => (
            <Card
              key={message.id}
              className={`glass p-4 cursor-pointer transition-colors hover:bg-primary/5 ${
                selectedMessage?.id === message.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => {
                setSelectedMessage(message)
                if (message.status === "nouveau") {
                  updateMessageStatus(message.id, "lu")
                }
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-foreground truncate">{message.name}</h3>
                <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2 truncate">{message.email}</p>
              <p className="text-sm font-medium text-foreground mb-2 truncate">{message.subject}</p>
              <p className="text-xs text-muted-foreground">{formatDate(message.createdAt)}</p>
            </Card>
          ))}

          {filteredMessages.length === 0 && (
            <Card className="glass p-8 text-center">
              <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucun message trouvé</p>
            </Card>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card className="glass p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>De: {selectedMessage.name}</span>
                    <span>{selectedMessage.email}</span>
                    <span>{formatDate(selectedMessage.createdAt)}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(selectedMessage.status)}>{selectedMessage.status}</Badge>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  className="gradient-violet-cyan text-white"
                  onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Répondre
                </Button>

                {selectedMessage.status !== "répondu" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass bg-transparent"
                    onClick={() => updateMessageStatus(selectedMessage.id, "répondu")}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Marquer comme répondu
                  </Button>
                )}

                {selectedMessage.status !== "archivé" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass bg-transparent"
                    onClick={() => updateMessageStatus(selectedMessage.id, "archivé")}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archiver
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  className="glass text-red-500 hover:text-red-600 bg-transparent"
                  onClick={() => deleteMessage(selectedMessage.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="glass p-12 text-center">
              <Mail className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Sélectionnez un message</h3>
              <p className="text-muted-foreground">Choisissez un message dans la liste pour le consulter</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
