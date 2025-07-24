import { useEffect, useMemo, useState } from "react";
import { getProjects } from "@/domains/proyectos/services/projectsService";
import type { Project } from "@/domains/proyectos/types";

export type ProjectOrder = "asc" | "desc";
export interface ProjectFilters {
  tecnologia?: string;
  framework?: string;
  lenguaje?: string;
  rol?: string;
  herramienta?: string;
  estado?: string;
}

export function useProjects({
  order = "desc",
  filters = {}
}: {
  order?: ProjectOrder;
  filters?: ProjectFilters;
} = {}) {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    getProjects()
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = [...data];
    // Filtros
    if (filters.tecnologia) {
      result = result.filter(p => p.tecnologias.includes(filters.tecnologia!));
    }
    if (filters.framework) {
      result = result.filter(p => p.frameworks.includes(filters.framework!));
    }
    if (filters.lenguaje) {
      result = result.filter(p => p.lenguajes.includes(filters.lenguaje!));
    }
    if (filters.rol) {
      result = result.filter(p => p.roles.includes(filters.rol!));
    }
    if (filters.herramienta) {
      result = result.filter(p => p.herramientas.includes(filters.herramienta!));
    }
    if (filters.estado) {
      result = result.filter(p => p.estado === filters.estado);
    }
    // Orden
    result.sort((a, b) => {
      if (order === "desc") return b.año - a.año;
      return a.año - b.año;
    });
    return result;
  }, [data, order, filters]);

  return { data: filtered, loading, error };
} 