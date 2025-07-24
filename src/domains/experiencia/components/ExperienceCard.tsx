import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Building } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { Experience } from "@/domains/experiencia/types";

export function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  return (
    <ScrollReveal key={index} delay={index * 200}>
      <div className="relative flex items-start gap-8 mb-12 last:mb-0">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
          <Building className="w-8 h-8 text-white" />
        </div>
        <Card className="flex-1 glass shadow-xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <CardTitle className="text-xl text-gray-900 dark:text-white">{exp.rol}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                <Calendar className="w-4 h-4" />
                <span>{exp.fecha_inicio}{exp.fecha_fin ? ` - ${exp.fecha_fin}` : ''}</span>
              </div>
            </div>
            {exp.empresa && (
              <CardDescription className="text-base font-medium text-gray-700 dark:text-gray-300">
                {exp.empresa} {exp.modalidad ? `· ${exp.modalidad}` : ''}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">{exp.descripcion}</p>
            {exp.responsabilidades && exp.responsabilidades.length > 0 && (
              <ul className="mb-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
                {exp.responsabilidades.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            )}
            {exp.logros && exp.logros.length > 0 && (
              <ul className="mb-2 text-sm text-green-700 dark:text-green-400 list-disc list-inside">
                {exp.logros.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            )}
            {exp.tecnologias && exp.tecnologias.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {exp.tecnologias.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-xs text-blue-800 dark:text-blue-200">{tech}</span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ScrollReveal>
  );
} 