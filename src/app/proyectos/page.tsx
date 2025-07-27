import { ScrollReveal } from "@/components/scroll-reveal";
import { PageLayout } from "@/components/layout/page-layout";
import { ProjectsFiltersClient } from "@/domains/proyectos/components/ProjectsFiltersClient";
import { getProjects } from "@/domains/proyectos/services/projectsService";
import type { Project } from "@/domains/proyectos/types";

export default async function Proyectos() {
  let projects: Project[] = [];
  let error: string | null = null;

  try {
    projects = await getProjects();
  } catch (e: any) {
    error = e.message;
    console.error("[Proyectos] Error al obtener datos:", error);
  }

  return (
    <PageLayout maxWidth="6xl">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 gradient-text">Proyectos Destacados</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
        </div>
      </ScrollReveal>

      {error && <div className="text-center py-10 text-red-500">Error al cargar proyectos: {error}</div>}
      {!error && (!projects || projects.length === 0) && (
        <div className="text-center py-10">No hay proyectos disponibles</div>
      )}

      {!error && projects && projects.length > 0 && (
        <ScrollReveal delay={200}>
          <ProjectsFiltersClient projects={projects} />
        </ScrollReveal>
      )}
    </PageLayout>
  );
}