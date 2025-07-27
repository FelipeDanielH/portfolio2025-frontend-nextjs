import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { FloatingNav } from "@/components/layout/floating-nav"
import { BackToTop } from "@/components/back-to-top"
import { BackendHealthCheck } from "@/domains/shared/components/BackendHealthCheck"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Felipe Henríquez - Full Stack Developer",
  description: "Portfolio personal de Felipe Henríquez, desarrollador Full Stack especializado en React, Node.js y tecnologías modernas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackendHealthCheck>
            <Navbar />
            <FloatingNav />
            <BackToTop />
            {children}
          </BackendHealthCheck>
        </ThemeProvider>
      </body>
    </html>
  );
}
