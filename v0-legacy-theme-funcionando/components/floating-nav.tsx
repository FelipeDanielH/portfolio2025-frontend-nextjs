"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"
import { FontSizeControl } from "./font-size-control"
import { Button } from "@/components/ui/button"

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const sections = [
    { id: "hero", label: "Inicio" },
    { id: "about", label: "Sobre Mí" },
    { id: "skills", label: "Habilidades" },
    { id: "experience", label: "Experiencia" },
    { id: "projects", label: "Proyectos" },
  ]

  return (
    <nav className="fixed top-6 right-6 z-50">
      <div className="flex flex-col gap-3">
        {/* Controles siempre visibles */}
        <div className="flex items-center gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full p-2 border border-white/20 dark:border-white/10 shadow-lg">
          <ThemeToggle />
          <div className="w-px h-6 bg-white/20 dark:bg-white/10" />
          <FontSizeControl />
        </div>

        {/* Navegador de secciones que aparece con scroll */}
        <div
          className={`transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-1 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/20 dark:border-white/10 shadow-lg">
            {sections.map((section) => (
              <Button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                variant="ghost"
                size="sm"
                className="justify-start text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-300 px-3 py-2 h-auto"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500 mr-2 flex-shrink-0" />
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
