"use client"
import { LoginForm } from "@/components/admin/login-form"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { useAuth } from "@/hooks/use-auth"

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <div className="min-h-screen bg-background">{isAuthenticated ? <AdminDashboard /> : <LoginForm />}</div>
}
