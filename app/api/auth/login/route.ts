import { type NextRequest, NextResponse } from "next/server"

// Credentials pour la démo - en production, utilisez une base de données
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "password", // En production, utilisez un hash bcrypt
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    console.log("[v0] Login API called with:", { username, password })
    console.log("[v0] Expected credentials:", ADMIN_CREDENTIALS)

    // Validation des credentials
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      console.log("[v0] Invalid credentials")
      return NextResponse.json({ error: "Credentials invalides" }, { status: 401 })
    }

    console.log("[v0] Login successful")
    return NextResponse.json({
      success: true,
      user: {
        username,
        role: "admin",
      },
    })
  } catch (error) {
    console.error("[v0] Erreur lors de la connexion:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
