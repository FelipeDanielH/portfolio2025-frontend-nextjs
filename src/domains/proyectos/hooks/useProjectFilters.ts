import { useState, useEffect } from "react";
import { projectsData } from "@/domains/proyectos/data";
import { generateSlug } from "@/domains/utils";
import type { Project } from "@/domains/types";

export function useProjectFilters() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);
  const [activeFilters, setActiveFilters] = useState({
    framework: "Todos",
    language: "Todos",
    role: "Todos",
  });

  const frameworks = [
    "Todos",
    ...Array.from(new Set(projectsData.flatMap((p) => p.frameworks))),
  ];
  const languages = [
    "Todos",
    ...Array.from(new Set(projectsData.flatMap((p) => p.languages))),
  ];
  const roles = [
    "Todos",
    ...Array.from(new Set(projectsData.flatMap((p) => p.role))),
  ];

  const applyFilters = (filterType: string, value: string) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);

    let filtered = projectsData;

    if (newFilters.framework !== "Todos") {
      filtered = filtered.filter((p) => p.frameworks.includes(newFilters.framework));
    }
    if (newFilters.language !== "Todos") {
      filtered = filtered.filter((p) => p.languages.includes(newFilters.language));
    }
    if (newFilters.role !== "Todos") {
      filtered = filtered.filter((p) => p.role.includes(newFilters.role));
    }

    setFilteredProjects(filtered);
  };

  const clearFilters = () => {
    setActiveFilters({ framework: "Todos", language: "Todos", role: "Todos" });
    setFilteredProjects(projectsData);
  };

  // Agregar IDs a los proyectos para navegación
  useEffect(() => {
    filteredProjects.forEach((project) => {
      const element = document.querySelector(`[data-project="${project.name}"]`);
      if (element) {
        element.id = `proyecto-${generateSlug(project.name)}`;
      }
    });
  }, [filteredProjects]);

  return {
    filteredProjects,
    activeFilters,
    frameworks,
    languages,
    roles,
    applyFilters,
    clearFilters,
  };
} 