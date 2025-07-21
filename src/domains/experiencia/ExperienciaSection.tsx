"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Building } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useExperienceContext } from "@/hooks/ExperienceContext";

export function ExperienciaSection() {
  const { data: experience, loading, error } = useExperienceContext();
  const expList = (experience ?? []) as import("@/domains/types").Experience[];

  if (loading) return <div className="text-center py-10">Cargando experiencia...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error al cargar experiencia</div>;
  if (!expList || expList.length === 0) return <div className="text-center py-10">Sin experiencia disponible</div>;

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Experiencia</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500" />

          {expList.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <div className="relative flex items-start gap-8 mb-12 last:mb-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Building className="w-8 h-8 text-white" />
                </div>

                <Card className="flex-1 glass border-0 shadow-xl">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <CardTitle className="text-xl text-gray-900 dark:text-white">{exp.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    {exp.company && (
                      <CardDescription className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {exp.company}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{exp.description}</p>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
} 