"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/domains/shared"
import { FontSizeControl } from "./font-size-control"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NavSection {
  id: string
  label: string
}

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [sections, setSections] = useState<NavSection[]>([])
  const pathname = usePathname()

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

  useEffect(() => {
    // Función para detectar secciones dinámicamente
    const detectSections = () => {
      const elements = document.querySelectorAll("[id]")
      const detectedSections: NavSection[] = []

      elements.forEach((element) => {
        const id = element.id
        if (id && !id.includes("radix") && !id.includes("headlessui")) {
          // Obtener el texto del elemento o un título apropiado
          let label = id

          // Buscar un h1, h2, h3, etc. dentro del elemento
          const heading = element.querySelector("h1, h2, h3, h4")
          if (heading) {
            label = heading.textContent || id
          } else if (element.textContent) {
            // Si es una sección con texto, usar las primeras palabras
            const text = element.textContent.trim()
            if (text.length > 0 && text.length < 100) {
              label = text
            }
          }

          // Limpiar y formatear el label
          label = label
            .replace(/^\d+\.\s*/, "") // Remover números al inicio
            .replace(/\s+/g, " ") // Normalizar espacios
            .trim()
            .substring(0, 30) // Limitar longitud

          if (label && label !== id) {
            detectedSections.push({ id, label })
          }
        }
      })

      setSections(detectedSections)
    }

    // Detectar secciones después de que el DOM se haya cargado
    const timer = setTimeout(detectSections, 500)

    // También detectar cuando el contenido cambie (para filtros)
    const observer = new MutationObserver(detectSections)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["id"],
    })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [pathname])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Secciones por defecto según la página
  const getDefaultSections = (): NavSection[] => {
    switch (pathname) {
      case "/":
        return [
          { id: "hero", label: "Inicio" },
          { id: "about", label: "Sobre Mí" },
          { id: "skills", label: "Habilidades" },
          { id: "experience", label: "Experiencia" },
          { id: "projects", label: "Proyectos" },
        ]
      case "/sobre-mi":
        return [
          { id: "mi-historia", label: "Mi Historia" },
          { id: "mis-objetivos", label: "Mis Objetivos" },
          { id: "mis-pasiones", label: "Mis Pasiones" },
          { id: "mi-filosofia", label: "Mi Filosofía" },
        ]
      default:
        return []
    }
  }

  const displaySections = sections.length > 0 ? sections : getDefaultSections()

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
        {displaySections.length > 0 && (
          <div
            className={`transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/20 dark:border-white/10 shadow-lg max-w-xs">
              <ScrollArea className="max-h-80">
                <div className="flex flex-col gap-1 pr-3">
                  {displaySections.map((section) => (
                    <Button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      variant="ghost"
                      size="sm"
                      className="justify-start text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-300 px-3 py-2 h-auto text-left"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500 mr-2 flex-shrink-0" />
                      <span className="truncate">{section.label}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
