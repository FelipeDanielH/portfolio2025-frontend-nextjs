import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { FloatingNav } from "@/components/floating-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Felipe Henríquez - Full Stack Developer",
  description:
    "Portafolio profesional de Felipe Henríquez, desarrollador full stack especializado en React, Node.js y Spring Boot.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <Navbar />
          <FloatingNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
