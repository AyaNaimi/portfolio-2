import { type NextRequest, NextResponse } from "next/server"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, subject, message } = body

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 })
    }

    // Ici, vous pouvez intégrer votre service d'email préféré
    // Par exemple: SendGrid, Resend, Nodemailer, etc.

    // Pour la démo, nous stockons dans localStorage côté client
    // En production, vous devriez utiliser une vraie base de données
    const contactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: "nouveau",
    }

    // Simulation d'un délai d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log pour le développement
    console.log("Nouveau message de contact:", contactMessage)

    return NextResponse.json(
      {
        success: true,
        message: "Message envoyé avec succès",
        id: contactMessage.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
