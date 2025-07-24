"use client"

import { useExperienceContext } from "@/domains/experiencia/hooks/ExperienceContext";
import { useExperienceExpansion } from "@/domains/experiencia/hooks/useExperienceExpansion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Building, Calendar, ChevronDown, ChevronRight, MapPin, Users, Target, Award } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import type { Experience } from "@/domains/experiencia/types";

// Utilidad para formatear fechas 'YYYY-MM' a 'Mes Año' en español
function formatFecha(fecha?: string) {
  if (!fecha) return "";
  const [year, month] = fecha.split("-");
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const mesNombre = meses[parseInt(month, 10) - 1] || "";
  return `${mesNombre} ${year}`;
}

export default function Experiencia() {
  const { data: experience, loading, error } = useExperienceContext();
  const { expandedItems, toggleItem } = useExperienceExpansion();
  const expList = (experience ?? []) as Experience[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-950/50 dark:to-black pt-24">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 gradient-text">Experiencia Profesional</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500" />

          {loading && <div className="text-center py-10">Cargando experiencia...</div>}
          {error && <div className="text-center py-10 text-red-500">Error al cargar experiencia</div>}
          {!loading && !error && (!expList || expList.length === 0) && (
            <div className="text-center py-10">Sin experiencia disponible</div>
          )}

          {!loading && !error && expList && expList.map((exp, index) => (
            <ScrollReveal key={exp._id} delay={index * 200}>
              <div id={`experiencia-${index}`} className="relative flex items-start gap-8 mb-12 last:mb-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Building className="w-8 h-8 text-white" />
                </div>

                <Card className="flex-1 glass shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="cursor-pointer" onClick={() => toggleItem(index)}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl text-gray-900 dark:text-white">{exp.rol}</CardTitle>
                          {expandedItems.has(index) ? (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                        {exp.empresa && (
                          <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">{exp.empresa}</p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatFecha(exp.fecha_inicio)}{exp.fecha_fin ? ` - ${formatFecha(exp.fecha_fin)}` : ''}</span>
                          </div>
                          {exp.ubicacion && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.ubicacion}</span>
                            </div>
                          )}
                          {exp.modalidad && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{exp.modalidad}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-4">
                        {exp.sector}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">{exp.descripcion}</p>
                  </CardHeader>

                  {expandedItems.has(index) && (
                    <CardContent className="pt-0 space-y-6">
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <div className="mb-6">
                          <h4 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white mb-3">
                            <Target className="w-5 h-5 text-blue-500" />
                            Responsabilidades Principales
                          </h4>
                          <ul className="space-y-2">
                            {exp.responsabilidades && exp.responsabilidades.map((responsibility, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm leading-relaxed">{responsibility}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white mb-3">
                            <Award className="w-5 h-5 text-green-500" />
                            Logros Destacados
                          </h4>
                          <ul className="space-y-2">
                            {exp.logros && exp.logros.map((achievement, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm leading-relaxed">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tecnologías Utilizadas</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.tecnologias && exp.tecnologias.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
