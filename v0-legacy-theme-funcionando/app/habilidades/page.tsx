"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ChevronDown, ChevronRight, Check, X } from "lucide-react"

interface Concept {
  name: string
  learned: boolean
}

interface Skill {
  name: string
  rating: number
  category: string
  concepts: Concept[]
}

const skillsData: Skill[] = [
  {
    name: "JavaScript",
    rating: 9,
    category: "Lenguajes",
    concepts: [
      { name: "ES6+ Features", learned: true },
      { name: "Async/Await", learned: true },
      { name: "Closures", learned: true },
      { name: "Prototypes", learned: true },
      { name: "Event Loop", learned: true },
      { name: "Modules", learned: true },
      { name: "Destructuring", learned: true },
      { name: "Arrow Functions", learned: true },
    ],
  },
  {
    name: "TypeScript",
    rating: 8,
    category: "Lenguajes",
    concepts: [
      { name: "Type Annotations", learned: true },
      { name: "Interfaces", learned: true },
      { name: "Generics", learned: true },
      { name: "Union Types", learned: true },
      { name: "Decorators", learned: false },
      { name: "Advanced Types", learned: true },
      { name: "Type Guards", learned: true },
    ],
  },
  {
    name: "React.js",
    rating: 9,
    category: "Frontend",
    concepts: [
      { name: "Hooks", learned: true },
      { name: "Context API", learned: true },
      { name: "Component Lifecycle", learned: true },
      { name: "State Management", learned: true },
      { name: "JSX", learned: true },
      { name: "Props & State", learned: true },
      { name: "Custom Hooks", learned: true },
      { name: "Performance Optimization", learned: true },
    ],
  },
  {
    name: "Next.js",
    rating: 8,
    category: "Frontend",
    concepts: [
      { name: "App Router", learned: true },
      { name: "Server Components", learned: true },
      { name: "API Routes", learned: true },
      { name: "Static Generation", learned: true },
      { name: "Server-Side Rendering", learned: true },
      { name: "Middleware", learned: false },
      { name: "Image Optimization", learned: true },
    ],
  },
  {
    name: "Node.js",
    rating: 8,
    category: "Backend",
    concepts: [
      { name: "Express.js", learned: true },
      { name: "Middleware", learned: true },
      { name: "File System", learned: true },
      { name: "Streams", learned: false },
      { name: "Event Emitters", learned: true },
      { name: "NPM/Yarn", learned: true },
      { name: "Authentication", learned: true },
    ],
  },
  {
    name: "Spring Boot",
    rating: 7,
    category: "Backend",
    concepts: [
      { name: "REST APIs", learned: true },
      { name: "JPA/Hibernate", learned: true },
      { name: "Security", learned: true },
      { name: "Dependency Injection", learned: true },
      { name: "Microservices", learned: false },
      { name: "Testing", learned: true },
      { name: "Configuration", learned: true },
    ],
  },
  {
    name: "MySQL",
    rating: 8,
    category: "Bases de Datos",
    concepts: [
      { name: "SQL Queries", learned: true },
      { name: "Joins", learned: true },
      { name: "Indexing", learned: true },
      { name: "Stored Procedures", learned: false },
      { name: "Transactions", learned: true },
      { name: "Database Design", learned: true },
      { name: "Performance Optimization", learned: true },
    ],
  },
  {
    name: "MongoDB",
    rating: 7,
    category: "Bases de Datos",
    concepts: [
      { name: "Document Structure", learned: true },
      { name: "Aggregation Pipeline", learned: true },
      { name: "Indexing", learned: true },
      { name: "Mongoose ODM", learned: true },
      { name: "Replica Sets", learned: false },
      { name: "Sharding", learned: false },
      { name: "GridFS", learned: false },
    ],
  },
  {
    name: "Docker",
    rating: 7,
    category: "DevOps",
    concepts: [
      { name: "Containerization", learned: true },
      { name: "Dockerfile", learned: true },
      { name: "Docker Compose", learned: true },
      { name: "Image Management", learned: true },
      { name: "Networking", learned: false },
      { name: "Volumes", learned: true },
      { name: "Multi-stage Builds", learned: false },
    ],
  },
  {
    name: "AWS",
    rating: 6,
    category: "DevOps",
    concepts: [
      { name: "EC2", learned: true },
      { name: "S3", learned: true },
      { name: "RDS", learned: true },
      { name: "Lambda", learned: false },
      { name: "CloudWatch", learned: true },
      { name: "IAM", learned: true },
      { name: "API Gateway", learned: false },
    ],
  },
]

export default function Habilidades() {
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")

  const categories = ["Todos", ...Array.from(new Set(skillsData.map((skill) => skill.category)))]

  const filteredSkills =
    selectedCategory === "Todos" ? skillsData : skillsData.filter((skill) => skill.category === selectedCategory)

  const toggleSkill = (skillName: string) => {
    const newExpanded = new Set(expandedSkills)
    if (newExpanded.has(skillName)) {
      newExpanded.delete(skillName)
    } else {
      newExpanded.add(skillName)
    }
    setExpandedSkills(newExpanded)
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "from-green-500 to-emerald-600"
    if (rating >= 6) return "from-yellow-500 to-orange-600"
    return "from-red-500 to-pink-600"
  }

  const getRatingText = (rating: number) => {
    if (rating >= 9) return "Experto"
    if (rating >= 7) return "Avanzado"
    if (rating >= 5) return "Intermedio"
    return "Básico"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-950/50 dark:to-black pt-24">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 gradient-text">Habilidades Técnicas</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Filtros */}
        <ScrollReveal delay={200}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Lista de Habilidades */}
        <div className="space-y-4">
          {filteredSkills.map((skill, index) => (
            <ScrollReveal key={skill.name} delay={index * 100}>
              <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="cursor-pointer" onClick={() => toggleSkill(skill.name)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {expandedSkills.has(skill.name) ? (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                        <CardTitle className="text-xl">{skill.name}</CardTitle>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {getRatingText(skill.rating)}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${getRatingColor(skill.rating)} transition-all duration-500`}
                            style={{ width: `${skill.rating * 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300 min-w-[2rem]">
                          {skill.rating}/10
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {expandedSkills.has(skill.name) && (
                  <CardContent className="pt-0">
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Conceptos y Conocimientos:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {skill.concepts.map((concept) => (
                          <div
                            key={concept.name}
                            className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                          >
                            {concept.learned ? (
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                            )}
                            <span
                              className={`text-sm ${
                                concept.learned
                                  ? "text-gray-700 dark:text-gray-300"
                                  : "text-gray-500 dark:text-gray-500"
                              }`}
                            >
                              {concept.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </main>
    </div>
  )
}
