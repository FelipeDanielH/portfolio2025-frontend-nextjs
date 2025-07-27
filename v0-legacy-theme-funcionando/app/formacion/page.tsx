import { GraduationCap, Award, ExternalLink } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"

interface EducationItem {
  type: "education" | "certification"
  title: string
  institution: string
  year: string
  date: string // YYYY-MM-DD
  description: string
  details?: string[]
  duration?: string
  location?: string
  certificateUrl?: string
  skills?: string[]
  status: "Completado" | "En progreso"
}

const formationData: EducationItem[] = [
  {
    type: "education",
    title: "Bootcamp Full Stack (540h)",
    institution: "Generation Chile",
    year: "2025",
    date: "2025-01-15",
    description:
      "Programa intensivo de desarrollo full-stack con enfoque en tecnologías modernas y metodologías ágiles.",
    details: [
      "Frontend con React.js",
      "Backend con Node.js, Express y Spring Boot",
      "Bases de datos SQL / NoSQL",
      "Testing y CI/CD",
      "Despliegue en cloud (Vercel, GCP, AWS)",
    ],
    duration: "540 horas",
    location: "Santiago, Chile",
    skills: ["React", "Node.js", "Spring Boot"],
    status: "Completado",
  },
  {
    type: "certification",
    title: "React: De cero a experto",
    institution: "Udemy",
    year: "2024",
    date: "2024-11-20",
    description: "Curso completo de React.js desde fundamentos hasta temas avanzados.",
    duration: "40 horas",
    certificateUrl: "#",
    skills: ["React", "Redux", "Testing"],
    status: "Completado",
  },
  {
    type: "certification",
    title: "Docker: Guía práctica para desarrolladores",
    institution: "Udemy",
    year: "2024",
    date: "2024-10-15",
    description: "Containerización y buenas prácticas para entornos productivos.",
    duration: "25 horas",
    certificateUrl: "#",
    skills: ["Docker", "DevOps"],
    status: "Completado",
  },
  {
    type: "education",
    title: "Ingeniería en Informática",
    institution: "Duoc UC",
    year: "2021",
    date: "2021-12-15",
    description: "Título profesional en Ingeniería en Informática con énfasis en desarrollo de software.",
    duration: "4 años",
    location: "Santiago, Chile",
    skills: ["Java", "SQL", "Patrones de diseño"],
    status: "Completado",
  },
]

export default function Formacion() {
  // Ordenar por fecha (más reciente primero)
  const sorted = [...formationData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-950/50 dark:to-black">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 gradient-text">Formación y Certificaciones</h1>
            <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {sorted.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 120}>
              <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {/* Icono */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        item.type === "education"
                          ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                          : "bg-gradient-to-br from-green-500 to-emerald-600"
                      }`}
                    >
                      {item.type === "education" ? (
                        <GraduationCap className="w-6 h-6 text-white" />
                      ) : (
                        <Award className="w-6 h-6 text-white" />
                      )}
                    </div>

                    {/* Contenido principal */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <CardTitle className="text-xl text-gray-900 dark:text-white">{item.title}</CardTitle>

                        <div className="flex items-center gap-2">
                          <Badge
                            variant={item.status === "Completado" ? "default" : "secondary"}
                            className={item.status === "Completado" ? "bg-green-500" : "bg-yellow-500"}
                          >
                            {item.status}
                          </Badge>

                          {item.certificateUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={item.certificateUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Certificado
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mt-1">
                        {item.institution} • {item.year}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 pb-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>

                  {item.details && (
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                      {item.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  )}

                  {item.skills && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </main>
    </div>
  )
}
