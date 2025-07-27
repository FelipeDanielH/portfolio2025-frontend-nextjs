"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Building, Calendar, MapPin, Users, Target, Award } from "lucide-react";
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

interface ExperienceExpansionClientProps {
  experiences: Experience[];
}

export function ExperienceExpansionClient({ experiences }: ExperienceExpansionClientProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500" />

      {experiences && experiences.map((exp, index) => (
        <div key={exp._id} className="relative flex items-start gap-8 mb-12 last:mb-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
            <Building className="w-8 h-8 text-white" />
          </div>

          <Card className="flex-1 glass shadow-xl hover:shadow-2xl transition-all duration-300 border border-white dark:border-gray-700">
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
      ))}
    </div>
  );
} 