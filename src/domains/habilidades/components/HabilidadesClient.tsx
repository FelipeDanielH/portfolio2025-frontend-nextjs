"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ChevronDown, ChevronRight, Check, X } from "lucide-react";
import { generateSlug } from "@/domains/utils";
import type { Skill, SkillConcepto } from "@/domains/habilidades/types";
import type { SkillCategory } from "@/domains/habilidades/services/skillsService";

interface HabilidadesClientProps {
  skills: Skill[];
  categories: SkillCategory[];
}

function getCategories(skills: Skill[], categories: SkillCategory[]) {
  // Solo mostrar categorías que tengan al menos una skill asociada
  const usedCategoryIds = new Set(skills.map((skill) => skill.categoria_id));
  const filteredCategories = categories.filter(cat => usedCategoryIds.has(cat._id));
  // Ordenar por 'orden' si existe
  filteredCategories.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  return [
    { _id: 'todos', nombre: 'Todos' },
    ...filteredCategories
  ];
}

function getRatingColor(rating: number) {
  if (rating >= 8) return "from-green-500 to-emerald-600";
  if (rating >= 6) return "from-yellow-500 to-orange-600";
  return "from-red-500 to-pink-600";
}

function getRatingText(rating: number) {
  if (rating >= 9) return "Experto";
  if (rating >= 7) return "Avanzado";
  if (rating >= 5) return "Intermedio";
  return "Básico";
}

export default function HabilidadesClient({ skills, categories }: HabilidadesClientProps) {
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categoryList = getCategories(skills, categories);
  const filteredSkills =
    selectedCategory === 'todos'
      ? skills
      : skills.filter((skill) => skill.categoria_id === selectedCategory);

  useEffect(() => {
    filteredSkills.forEach((skill) => {
      const element = document.querySelector(`[data-skill="${skill.tecnologia}"]`);
      if (element) {
        element.id = `skill-${generateSlug(skill.tecnologia)}`;
      }
    });
  }, [filteredSkills]);

  const toggleSkill = (skillName: string) => {
    const newExpanded = new Set(expandedSkills);
    if (newExpanded.has(skillName)) {
      newExpanded.delete(skillName);
    } else {
      newExpanded.add(skillName);
    }
    setExpandedSkills(newExpanded);
  };

  return (
    <section id="skills">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 gradient-text">Habilidades Técnicas</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categoryList.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat._id
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {filteredSkills.map((skill: Skill, index: number) => (
          <section id={skill._id} key={skill._id} className="scroll-mt-24">
            <ScrollReveal delay={index * 100}>
              <Card
                className="glass shadow-xl hover:shadow-2xl transition-all duration-300"
                data-skill={skill._id}
              >
                <CardHeader className="cursor-pointer" onClick={() => toggleSkill(skill._id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {expandedSkills.has(skill._id) ? (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                        <h2 className="text-xl font-semibold leading-none tracking-tight">
                          {skill.tecnologia}
                        </h2>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {categories.find(cat => cat._id === skill.categoria_id)?.nombre || 'Sin categoría'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {getRatingText(skill.puntuacion)}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${getRatingColor(skill.puntuacion)} transition-all duration-500`}
                            style={{ width: `${skill.puntuacion * 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300 min-w-[2rem]">
                          {skill.puntuacion}/10
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {expandedSkills.has(skill._id) && (
                  <CardContent className="pt-0">
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Conceptos y Conocimientos:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {skill.conceptos.map((concept: SkillConcepto, idx: number) => (
                          <div
                            key={concept._id || concept.nombre || idx}
                            className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                          >
                            {concept.aprendido ? (
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                            )}
                            <span
                              className={`text-sm ${
                                concept.aprendido
                                  ? "text-gray-700 dark:text-gray-300"
                                  : "text-gray-500 dark:text-gray-500"
                              }`}
                            >
                              {concept.nombre}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </ScrollReveal>
          </section>
        ))}
      </div>
    </section>
  );
} 