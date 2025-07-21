"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Building } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useExperienceContext } from "@/hooks/ExperienceContext";
import { ExperienceCard } from "./ExperienceCard";

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
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 