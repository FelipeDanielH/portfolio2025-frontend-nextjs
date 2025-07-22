"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useProjectsContext } from "@/domains/proyectos/hooks/ProjectsContext";
import { ProjectCard } from "./ProjectCard";

export function ProyectosSection() {
  const { data: projects, loading, error } = useProjectsContext();
  const projectsList = (projects ?? []) as import("@/domains/types").Project[];

  if (loading) return <div className="text-center py-10">Cargando proyectos...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error al cargar proyectos</div>;
  if (!projectsList || projectsList.length === 0) return <div className="text-center py-10">Sin proyectos disponibles</div>;

  return (
    <section
      id="projects"
      className="py-20 px-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Proyectos Destacados</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {projectsList.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 