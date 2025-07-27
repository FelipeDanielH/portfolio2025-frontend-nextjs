import FormacionFiltersSSR from "./FormacionFiltersSSR.client";
import { GraduationCap, Award, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/scroll-reveal";
import { PageLayout } from "@/components/layout/page-layout";
import { getEducation } from "@/domains/formacion/services/educationService";
import type { Education } from "@/domains/formacion/types";

function formatYear(fecha: string | null | undefined) {
  if (!fecha) return "";
  const [year] = fecha.split("-");
  return year;
}

declare global {
  interface Window {
    __formacionSections?: { id: string; label: string }[];
    __formacionFilter?: 'todos' | 'formacion' | 'certificacion';
  }
}

export default async function FormacionSection({ searchParams }: { searchParams?: { tipo?: string } }) {
  let educationList: Education[] = [];
  let error = null;
  try {
    educationList = await getEducation();
  } catch (e) {
    error = e;
  }

  // Ordenar por fecha_inicio descendente
  const sorted = [...educationList].sort((a, b) => new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime());

  // Exponer los títulos e ids para el FloatingNav
  if (typeof window !== "undefined") {
    window.__formacionSections = sorted.map((item) => ({
      id: `formacion-${item._id}`,
      label: item.titulo,
    }));
  }

  const awaitedSearchParams = await searchParams;
  const tipo = awaitedSearchParams?.tipo === 'formacion' || awaitedSearchParams?.tipo === 'certificacion' ? awaitedSearchParams.tipo : 'todos';
  const filtered = tipo === 'todos' ? sorted : sorted.filter(item => item.tipo === tipo);

  if (error) return <div className="text-center py-10 text-red-500">Error al cargar formación</div>;
  if (sorted.length === 0) return <div className="text-center py-10">Sin formación ni certificaciones disponibles</div>;

  return (
    <PageLayout>
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 gradient-text">Formación y Certificaciones</h1>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <FormacionFiltersSSR selected={tipo} pathname={"/formacion"} />
        <div className="space-y-8">
          {filtered.map((item, idx) => (
            <div key={item._id} style={{ animationDelay: `${idx * 120}ms` }}>
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
            </div>
          ))}
        </div>
      </ScrollReveal>
    </PageLayout>
  );
} 