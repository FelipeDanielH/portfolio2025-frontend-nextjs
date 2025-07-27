import { ScrollReveal } from "@/components/scroll-reveal";
import { PageLayout } from "@/components/layout/page-layout";
import { ExperienceExpansionClient } from "@/domains/experiencia/components/ExperienceExpansionClient";
import { getExperience } from "@/domains/experiencia/services/experienceService";
import type { Experience } from "@/domains/experiencia/types";

export default async function Experiencia() {
  let experiences: Experience[] = [];
  let error: string | null = null;

  try {
    experiences = await getExperience();
  } catch (e: any) {
    error = e.message;
    console.error("[Experiencia] Error al obtener datos:", error);
  }

  return (
    <PageLayout>
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 gradient-text">Experiencia Profesional</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
        </div>
      </ScrollReveal>

      {error && <div className="text-center py-10 text-red-500">Error al cargar experiencia: {error}</div>}
      {!error && (!experiences || experiences.length === 0) && (
        <div className="text-center py-10">Sin experiencia disponible</div>
      )}

      {!error && experiences && experiences.length > 0 && (
        <ScrollReveal delay={200}>
          <ExperienceExpansionClient experiences={experiences} />
        </ScrollReveal>
      )}
    </PageLayout>
  );
}
