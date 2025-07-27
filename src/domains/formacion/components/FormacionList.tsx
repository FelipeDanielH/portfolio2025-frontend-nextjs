"use client";
import { useState } from "react";
import { GraduationCap, Award, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { Education } from "@/domains/formacion/types";

function formatYear(fecha: string | null | undefined) {
  if (!fecha) return "";
  const [year] = fecha.split("-");
  return year;
}

type Filtro = 'todos' | 'formacion' | 'certificacion';

export default function FormacionList({ data }: { data: Education[] }) {
  const [filter, setFilter] = useState<Filtro>('todos');
  const filters = [
    { label: "Todos", value: "todos" as Filtro },
    { label: "Formaciones", value: "formacion" as Filtro },
    { label: "Certificaciones", value: "certificacion" as Filtro },
  ];
  const filtered = filter === 'todos' ? data : data.filter(item => item.tipo === filter);

  return (
    <div>
      <div className="flex gap-2 mb-8 justify-center">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 focus:outline-none ${
              filter === f.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-800/30"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="space-y-8">
        {filtered.map((item, idx) => (
          <ScrollReveal key={item._id} delay={idx * 120}>
            <Card className="glass shadow-xl hover:shadow-2xl transition-all duration-300 border border-white dark:border-gray-700">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      item.tipo === "formacion"
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                        : "bg-gradient-to-br from-green-500 to-emerald-600"
                    }`}
                  >
                    {item.tipo === "formacion" ? (
                      <GraduationCap className="w-6 h-6 text-white" />
                    ) : (
                      <Award className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <CardTitle id={`formacion-${item._id}`} className="text-xl text-gray-900 dark:text-white">{item.titulo}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={item.estado === "Completado" ? "default" : "secondary"}
                          className={item.estado === "Completado" ? "bg-green-500" : "bg-yellow-500"}
                        >
                          {item.estado}
                        </Badge>
                        {item.certificado_url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={item.certificado_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Certificado
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mt-1">
                      {item.institucion} • {formatYear(item.fecha_inicio)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">{item.descripcion}</p>
                {item.aprendizajes && (
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400 mb-4">
                    {item.aprendizajes.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
                {item.links_relevantes && item.links_relevantes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.links_relevantes.map((link, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        asChild
                        className="hover:bg-blue-50 dark:hover:bg-blue-950/50 bg-transparent"
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          {link.titulo}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
} 