"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, GraduationCap } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useEducationContext } from "@/hooks/EducationContext";

function EducationCard({ edu, index }: { edu: import("@/domains/types").Education; index: number }) {
  return (
    <Card key={index} className="glass border-0 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg text-gray-900 dark:text-white">{edu.title}</CardTitle>
            <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
              {edu.institution} • {edu.year}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
      </CardContent>
    </Card>
  );
}

export function FormacionSection() {
  const { data: education, loading, error } = useEducationContext();
  const educationList = (education ?? []) as import("@/domains/types").Education[];

  if (loading) return <div className="text-center py-10">Cargando formación...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error al cargar formación</div>;
  if (!educationList || educationList.length === 0) return <div className="text-center py-10">Sin formación disponible</div>;

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
          {/* Aquí podrías agregar loading/error para certificaciones si lo deseas */}
        </div>
      </div>
    </section>
  );
} 