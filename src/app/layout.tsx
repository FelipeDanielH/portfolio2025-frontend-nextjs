import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { FloatingNav } from "@/components/layout/floating-nav"
import { BackToTop } from "@/components/ui/back-to-top"
import { AppProviders } from "@/hooks/AppProviders"

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
        <AppProviders>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
            <Navbar />
            <FloatingNav />
            <BackToTop />
            {children}
          </ThemeProvider>
        </AppProviders>
      </body>
    </html>
  )
}
