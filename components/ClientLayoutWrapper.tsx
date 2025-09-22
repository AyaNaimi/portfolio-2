"use client"

import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { Analytics } from "@vercel/analytics/next"
import ClickSpark from "@/components/ClickSpark"
import PixelBlast from "@/components/PixelBlast"

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PixelBlast color="#FFD700" className="absolute inset-0 z-[-1]" style={{}} />
      <ClickSpark>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </ClickSpark>
    </>
  )
}

