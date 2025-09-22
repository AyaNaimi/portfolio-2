import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { Suspense } from "react"
import "./globals.css"


export const metadata: Metadata = {
  title: "Aya Naimi - Développeur Full-Stack",
  
  description:
    "Portfolio professionnel d'Aya Naimi, développeur full-stack spécialisé en React, Node.js et technologies modernes.",
  keywords: ["développeur", "full-stack", "React", "Node.js", "portfolio", "web development"],
  authors: [{ name: "Aya Naimi" }],
  openGraph: {
    title: "Aya Naimi - Développeur Full-Stack",
    description: "Portfolio professionnel d'Aya Naimi",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
