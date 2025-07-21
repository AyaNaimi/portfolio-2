import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aya-Portfolio',
 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body>{children}</body>
    </html>
  )
}
