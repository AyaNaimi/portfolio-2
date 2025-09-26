"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
}

export function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: Message[] = await response.json()
      setMessages(data)
    } catch (error) {
      console.error("Failed to fetch messages:", error)
      // Optionally, add a toast notification for error
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Gestion des Messages</CardTitle>
        <CardDescription>Consultez et gérez les messages reçus via le formulaire de contact.</CardDescription>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <p className="text-muted-foreground">Aucun message pour le moment.</p>
        ) : (
          <div className="space-y-6">
            {messages
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((message) => (
                <Card key={message.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{message.subject}</h3>
                      <p className="text-sm text-muted-foreground">De: {message.name} ({message.email})</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(message.timestamp), "dd MMMM yyyy à HH:mm", { locale: fr })}
                    </p>
                  </div>
                  <Separator className="my-2" />
                  <p className="text-sm text-foreground whitespace-pre-wrap">{message.message}</p>
                </Card>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
