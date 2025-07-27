"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "../ui/theme-toggle"
import { FontSizeControl } from "../ui/font-size-control"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { scrollToElement } from "@/domains/utils"
import type { NavSection } from "@/domains/types"

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
    const detectSections = () => {
      const elements = document.querySelectorAll("[id]")
      const detectedSections: NavSection[] = []

      elements.forEach((element) => {
        const id = element.id
        if (id && !id.includes("radix") && !id.includes("headlessui")) {
          let label = id

          const heading = element.querySelector("h1, h2, h3, h4")
          if (heading) {
            label = heading.textContent || id
          } else if (element.textContent) {
            const text = element.textContent.trim()
            if (text.length > 0 && text.length < 100) {
              label = text
            }
          }

          label = label
            .replace(/^\d+\.\s*/, "")
            .replace(/\s+/g, " ")
            .trim()
            .substring(0, 30)

          if (label && label !== id) {
            detectedSections.push({ id, label })
          }
        }
      })

      setSections(detectedSections)
    }

    const timer = setTimeout(detectSections, 500)

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

  // Adaptar para usar window.__aboutSections en /sobre-mi y window.__formacionSections en /formacion
  let displaySections = sections.length > 0 ? sections : getDefaultSections();
  if (typeof window !== "undefined") {
    if (pathname === "/sobre-mi" && window.__aboutSections && window.__aboutSections.length > 0) {
    displaySections = window.__aboutSections;
    }
    if (pathname === "/formacion" && window.__formacionSections && window.__formacionSections.length > 0) {
      // Limitar a solo el título
      displaySections = window.__formacionSections.map(({ id, label }) => ({ id, label: String(label).split("\n")[0].trim() }));
    }
  }

  return (
    <nav className="fixed top-6 right-6 z-50">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full p-2 border border-white/20 dark:border-white/10 shadow-lg">
          <ThemeToggle />
          <div className="w-px h-6 bg-white/20 dark:bg-white/10" />
          <FontSizeControl />
        </div>

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
                      onClick={() => scrollToElement(section.id)}
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
