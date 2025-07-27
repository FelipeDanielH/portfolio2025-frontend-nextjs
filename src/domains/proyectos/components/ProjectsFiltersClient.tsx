"use client"

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { ProjectCard } from "@/domains/proyectos/components/ProjectCard";
import { generateSlug } from "@/domains/utils";
import type { Project } from "@/domains/proyectos/types";

interface ProjectsFiltersClientProps {
  projects: Project[];
}

export function ProjectsFiltersClient({ projects }: ProjectsFiltersClientProps) {
  const [activeFilters, setActiveFilters] = useState({
    framework: "Todos",
    language: "Todos",
    role: "Todos",
  });

  const filteredProjects = useMemo(() => {
    let filtered = projects;
    if (activeFilters.framework !== "Todos") {
      filtered = filtered.filter((p) => (p.frameworks ?? []).includes(activeFilters.framework));
    }
    if (activeFilters.language !== "Todos") {
      filtered = filtered.filter((p) => (p.lenguajes ?? []).includes(activeFilters.language));
    }
    if (activeFilters.role !== "Todos") {
      filtered = filtered.filter((p) => (p.roles ?? []).includes(activeFilters.role));
    }
    return filtered;
  }, [projects, activeFilters]);

  const frameworks = useMemo(
    () => ["Todos", ...Array.from(new Set(projects.flatMap((p) => p.frameworks ?? [])))],
    [projects]
  );
  const languages = useMemo(
    () => ["Todos", ...Array.from(new Set(projects.flatMap((p) => p.lenguajes ?? [])))],
    [projects]
  );
  const roles = useMemo(
    () => ["Todos", ...Array.from(new Set(projects.flatMap((p) => p.roles ?? [])))],
    [projects]
  );

  const applyFilters = (filterType: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setActiveFilters({ framework: "Todos", language: "Todos", role: "Todos" });
  };

  // Agregar IDs a los proyectos para navegación
  useEffect(() => {
    filteredProjects.forEach((project) => {
      const element = document.querySelector(`[data-project="${project.nombre}"]`)
      if (element) {
        element.id = `proyecto-${generateSlug(project.nombre)}`
      }
    })
  }, [filteredProjects])

  return (
    <>
      {/* Filtros */}
      <Card className="glass shadow-xl mb-12 border border-white dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Framework</h4>
              <div className="flex flex-wrap gap-2">
                {frameworks.map((framework) => (
                  <Button
                    key={framework}
                    variant={activeFilters.framework === framework ? "default" : "outline"}
                    onClick={() => applyFilters("framework", framework)}
                    className="capitalize"
                  >
                    {framework}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Lenguaje</h4>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <Button
                    key={language}
                    variant={activeFilters.language === language ? "default" : "outline"}
                    onClick={() => applyFilters("language", language)}
                    className="capitalize"
                  >
                    {language}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Rol</h4>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <Button
                    key={role}
                    variant={activeFilters.role === role ? "default" : "outline"}
                    onClick={() => applyFilters("role", role)}
                    className="capitalize"
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="ghost" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de proyectos */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredProjects.length === 0 ? (
          <div className="col-span-2 text-center py-10 text-gray-500 dark:text-gray-400">
            No se encontraron proyectos con los filtros seleccionados.
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))
        )}
      </div>
    </>
  );
} 