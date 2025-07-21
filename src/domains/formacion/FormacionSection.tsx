"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, GraduationCap } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useEducationContext } from "@/hooks/EducationContext";
import { EducationCard } from "./EducationCard";

export function FormacionSection() {
  const { education, certifications, loading, error } = useEducationContext();
  const educationList = (education ?? []) as import("@/domains/types").EducationItem[];
  const certificationsList = (certifications ?? []) as import("@/domains/types").EducationItem[];

  if (loading) return <div className="text-center py-10">Cargando formación...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error al cargar formación</div>;
  if ((!educationList || educationList.length === 0) && (!certificationsList || certificationsList.length === 0)) return <div className="text-center py-10">Sin formación ni certificaciones disponibles</div>;

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <ScrollReveal>
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 gradient-text">Formación</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
              </div>

              <div className="space-y-6">
                {educationList.map((edu, index) => (
                  <EducationCard key={index} edu={edu} index={index} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Certifications */}
          <ScrollReveal>
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 gradient-text">Certificaciones</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
              </div>
              <div className="space-y-6">
                {certificationsList.length === 0 ? (
                  <div className="text-gray-500">Sin certificaciones disponibles</div>
                ) : (
                  certificationsList.map((cert, idx) => (
                    <Card key={idx} className="glass shadow-xl">
                      <CardContent className="p-6 flex items-center gap-4">
                        <Award className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                        <div>
                          <span className="text-lg text-gray-900 dark:text-white font-medium block">{cert.title}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300 block">{cert.institution} &bull; {cert.year}</span>
                          <span className="text-xs text-gray-500 block mt-1">{cert.description}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
} 