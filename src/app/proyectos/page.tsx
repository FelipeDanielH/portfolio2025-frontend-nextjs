"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ExternalLink, Github, Filter } from "lucide-react"
import { projectsData } from "@/domains/data"
import { Footer } from "@/components/layout/footer"
import { generateSlug } from "@/domains/utils"
import type { Project } from "@/domains/types"

interface Project {
  name: string
  description: string
  longDescription: string
  image: string
  tech: string[]
  frameworks: string[]
  languages: string[]
  role: string[]
  links: { label: string; url: string }[]
  status: string
  year: string
}

export default function Proyectos() {
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [activeFilters, setActiveFilters] = useState({
    framework: "Todos",
    language: "Todos",
    role: "Todos",
  })

  const frameworks = ["Todos", ...Array.from(new Set(projectsData.flatMap((p) => p.frameworks)))]
  const languages = ["Todos", ...Array.from(new Set(projectsData.flatMap((p) => p.languages)))]
  const roles = ["Todos", ...Array.from(new Set(projectsData.flatMap((p) => p.role)))]

  const applyFilters = (filterType: string, value: string) => {
    const newFilters = { ...activeFilters, [filterType]: value }
    setActiveFilters(newFilters)

    let filtered = projectsData

    if (newFilters.framework !== "Todos") {
      filtered = filtered.filter((p) => p.frameworks.includes(newFilters.framework))
    }
    if (newFilters.language !== "Todos") {
      filtered = filtered.filter((p) => p.languages.includes(newFilters.language))
    }
    if (newFilters.role !== "Todos") {
      filtered = filtered.filter((p) => p.role.includes(newFilters.role))
    }

    setFilteredProjects(filtered)
  }

  const clearFilters = () => {
    setActiveFilters({ framework: "Todos", language: "Todos", role: "Todos" })
    setFilteredProjects(projectsData)
  }

  // Agregar IDs a los proyectos para navegación
  useEffect(() => {
    filteredProjects.forEach((project) => {
      const element = document.querySelector(`[data-project="${project.name}"]`)
      if (element) {
        element.id = `proyecto-${generateSlug(project.name)}`
      }
    })
  }, [filteredProjects])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-950/50 dark:to-black pt-24">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 gradient-text">Proyectos Destacados</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Filtros */}
        <ScrollReveal delay={200}>
          <Card className="glass border-0 shadow-xl mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Framework</h4>
                  <div className="flex flex-wrap gap-2">
                    {frameworks.map((framework) => (
                      <button
                        key={framework}
                        onClick={() => applyFilters("framework", framework)}
                        className={`