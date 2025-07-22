"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ChevronDown, ChevronRight, Check, X } from "lucide-react"
import { skillsData } from "@/domains/habilidades/data"
import { Footer } from "@/components/layout/footer"
import { generateSlug } from "@/domains/utils"
import type { Skill } from "@/domains/types"

export default function Habilidades() {
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")

  const categories = ["Todos", ...Array.from(new Set(skillsData.map((skill) => skill.category)))]

  const filteredSkills =
    selectedCategory === "Todos" ? skillsData : skillsData.filter((skill) => skill.category === selectedCategory)

  useEffect(() => {
    filteredSkills.forEach((skill) => {
      const element = document.querySelector(`[data-skill="${skill.name}"]`)
      if (element) {
        element.id = `skill-${generateSlug(skill.name)}`
      }
    })
  }, [filteredSkills])

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

        <div className="space-y-4">
          {filteredSkills.map((skill, index) => (
            <ScrollReveal key={skill.name} delay={index * 100}>
              <Card
                className="glass shadow-xl hover:shadow-2xl transition-all duration-300"
                data-skill={skill.name}
              >
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

      <Footer />
    </div>
  )
}
