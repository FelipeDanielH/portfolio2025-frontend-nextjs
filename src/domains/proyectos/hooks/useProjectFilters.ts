import { useState, useMemo } from "react";
import type { Project } from "@/domains/proyectos/types";
import { generateSlug } from "@/domains/utils";

export function useProjectFilters(projects: Project[]) {
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