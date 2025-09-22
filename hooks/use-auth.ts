"use client"

import { useState, useEffect } from "react"

interface AuthUser {
  username: string
  role: string
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in")
    const userData = localStorage.getItem("admin_user")

    console.log("[v0] Auth check - isLoggedIn:", isLoggedIn, "userData:", userData)

    if (isLoggedIn === "true" && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setIsAuthenticated(true)
        setUser(parsedUser)
        console.log("[v0] User authenticated from localStorage:", parsedUser)
      } catch (error) {
        console.log("[v0] Error parsing user data:", error)
        localStorage.removeItem("admin_logged_in")
        localStorage.removeItem("admin_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log("[v0] Login attempt with:", { username, password })

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      console.log("[v0] Login response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Login response data:", data)

        const userData = data.user
        localStorage.setItem("admin_logged_in", "true")
        localStorage.setItem("admin_user", JSON.stringify(userData))
        setIsAuthenticated(true)
        setUser(userData)
        console.log("[v0] Login successful, user set:", userData)
        return true
      } else {
        const errorData = await response.json()
        console.log("[v0] Login failed:", errorData)
      }
      return false
    } catch (error) {
      console.error("[v0] Erreur de connexion:", error)
      return false
    }
  }

  const logout = () => {
    console.log("[v0] Logging out")
    localStorage.removeItem("admin_logged_in")
    localStorage.removeItem("admin_user")
    setIsAuthenticated(false)
    setUser(null)
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  }
}
