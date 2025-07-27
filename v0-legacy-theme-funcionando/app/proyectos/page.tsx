"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ExternalLink, Github, Filter } from "lucide-react"

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

const projectsData: Project[] = [
  {
    name: "Ecomarket",
    description: "E-commerce full stack con React y Spring Boot. MySQL, despliegue en Vercel/GCP.",
    longDescription:
      "Plataforma de e-commerce completa enfocada en productos ecológicos y sostenibles. Incluye sistema de gestión de inventario, carrito de compras, procesamiento de pagos, panel de administración y sistema de reseñas. Implementa autenticación JWT, optimización de imágenes y SEO.",
    image: "/placeholder.svg?height=200&width=400",
    tech: ["React", "Spring Boot", "MySQL", "JWT", "Vercel", "GCP"],
    frameworks: ["React", "Spring Boot"],
    languages: ["JavaScript", "Java", "SQL"],
    role: ["Frontend", "Backend", "Full Stack"],
    links: [
      { label: "Frontend", url: "#" },
      { label: "Backend", url: "#" },
      { label: "Demo", url: "#" },
    ],
    status: "Completado",
    year: "2024",
  },
  {
    name: "BancoSimple",
    description: "App bancaria con autenticación JWT. React + Spring Boot + MySQL.",
    longDescription:
      "Aplicación bancaria simulada con funcionalidades completas de gestión financiera. Incluye transferencias, historial de transacciones, gestión de cuentas, reportes financieros y dashboard administrativo. Implementa seguridad robusta con JWT y encriptación de datos sensibles.",
    image: "/placeholder.svg?height=200&width=400",
    tech: ["React", "Spring Boot", "MySQL", "JWT", "Spring Security"],
    frameworks: ["React", "Spring Boot"],
    languages: ["JavaScript", "Java", "SQL"],
    role: ["Frontend", "Backend", "Full Stack"],
    links: [
      { label: "Frontend", url: "#" },
      { label: "Backend", url: "#" },
      { label: "Demo", url: "#" },
    ],
    status: "Completado",
    year: "2024",
  },
  {
    name: "Gestor de Tareas CLI",
    description: "App Node.js interactiva (Inquirer).",
    longDescription:
      "Herramienta de línea de comandos para gestión de tareas y productividad. Permite crear, editar, eliminar y organizar tareas con categorías, prioridades y fechas límite. Incluye reportes de productividad, exportación de datos y sincronización con calendarios externos.",
    image: "/placeholder.svg?height=200&width=400",
    tech: ["Node.js", "Inquirer", "Commander", "Chalk", "JSON"],
    frameworks: ["Node.js"],
    languages: ["JavaScript"],
    role: ["Backend", "CLI"],
    links: [
      { label: "Demo", url: "#" },
      { label: "GitHub", url: "#" },
      { label: "NPM", url: "#" },
    ],
    status: "Completado",
    year: "2024",
  },
  {
    name: "Portafolio Web",
    description: "Sitio MERN personal con despliegue en Vercel.",
    longDescription:
      "Portafolio personal desarrollado con stack MERN, featuring diseño responsive, modo oscuro, animaciones suaves y optimización SEO. Incluye blog técnico, galería de proyectos, formulario de contacto y panel de administración para gestión de contenido.",
    image: "/placeholder.svg?height=200&width=400",
    tech: ["MongoDB", "Express", "React", "Node.js", "Vercel"],
    frameworks: ["React", "Express"],
    languages: ["JavaScript", "HTML", "CSS"],
    role: ["Frontend", "Backend", "Full Stack"],
    links: [
      { label: "Enlace", url: "#" },
      { label: "GitHub", url: "#" },
    ],
    status: "En desarrollo",
    year: "2024",
  },
  {
    name: "API RestaurantManager",
    description: "API REST para gestión de restaurantes con Spring Boot.",
    longDescription:
      "API completa para gestión de restaurantes que incluye manejo de menús, pedidos, inventario, empleados y reportes financieros. Implementa patrones de diseño, documentación con Swagger, testing unitario y integración continua.",
    image: "/placeholder.svg?height=200&width=400",
    tech: ["Spring Boot", "PostgreSQL", "Swagger", "JUnit", "Docker"],
    frameworks: ["Spring Boot"],
    languages: ["Java", "SQL"],
    role: ["Backend", "API"],
    links: [
      { label: "GitHub", url: "#" },
      { label: "Swagger Docs", url: "#" },
    ],
    status: "Completado",
    year: "2023",
  },
  {
    name: "Dashboard Analytics",
    description: "Dashboard de analytics con Next.js y Chart.js.",
    longDescription:
      "Dashboard interactivo para visualización de datos y analytics empresariales. Incluye gráficos dinámicos, filtros avanzados, exportación de reportes, notificaciones en tiempo real y integración con múltiples fuentes de datos.",
    image: "/placeholder.svg?height=200&width=400",
    tech: ["Next.js", "Chart.js", "Tailwind", "Prisma", "PostgreSQL"],
    frameworks: ["Next.js"],
    languages: ["TypeScript", "SQL"],
    role: ["Frontend", "Full Stack"],
    links: [
      { label: "Demo", url: "#" },
      { label: "GitHub", url: "#" },
    ],
    status: "En desarrollo",
    year: "2024",
  },
]

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
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                          activeFilters.framework === framework
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                        }`}
                      >
                        {framework}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Lenguaje</h4>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((language) => (
                      <button
                        key={language}
                        onClick={() => applyFilters("language", language)}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                          activeFilters.language === language
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                        }`}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Rol</h4>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <button
                        key={role}
                        onClick={() => applyFilters("role", role)}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                          activeFilters.role === role
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mostrando {filteredProjects.length} de {projectsData.length} proyectos
                </p>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Limpiar Filtros
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Grid de Proyectos */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.name} delay={index * 150}>
              <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </CardTitle>
                        <Badge
                          variant={project.status === "Completado" ? "default" : "secondary"}
                          className={project.status === "Completado" ? "bg-green-500" : "bg-yellow-500"}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-600 dark:text-gray-400 mb-2">
                        {project.description}
                      </CardDescription>
                      <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link, linkIndex) => (
                      <Button
                        key={linkIndex}
                        variant="outline"
                        size="sm"
                        asChild
                        className="hover:bg-blue-50 dark:hover:bg-blue-950/50 bg-transparent"
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label === "GitHub" ? (
                            <Github className="w-3 h-3 mr-1" />
                          ) : (
                            <ExternalLink className="w-3 h-3 mr-1" />
                          )}
                          {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>Año: {project.year}</span>
                    <div className="flex gap-2">
                      {project.role.map((role) => (
                        <span key={role} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No se encontraron proyectos con los filtros seleccionados.
            </p>
            <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
              Ver todos los proyectos
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
