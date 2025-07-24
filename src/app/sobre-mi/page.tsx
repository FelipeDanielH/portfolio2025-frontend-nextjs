import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Sparkles, Target, Heart, Lightbulb } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { fetchAboutSections } from "@/domains/sobre-mi/services/aboutService";

const ICONS = [
  <Sparkles className="w-5 h-5 text-white" />, // 0
  <Target className="w-5 h-5 text-white" />,   // 1
  <Heart className="w-5 h-5 text-white" />,    // 2
  <Lightbulb className="w-5 h-5 text-white" /> // 3
];
const COLORS = [
  "from-blue-500 to-indigo-600",
  "from-green-500 to-emerald-600",
  "from-purple-500 to-pink-600",
  "from-orange-500 to-red-600"
];

// Añadir declaración global para evitar error de TypeScript
declare global {
  interface Window {
    __aboutSections?: { id: string; label: string }[];
  }
}

export default async function SobreMi() {
  let data = null;
  let error = null;
  let aboutSections: { id: string; label: string }[] = [];
  try {
    data = await fetchAboutSections();
    if (data && Array.isArray(data)) {
      aboutSections = data
        .sort((a, b) => a.orden - b.orden)
        .map((section) => ({
          id: `about-section-${section._id}`,
          label:
            section.titulo && section.titulo.trim().length > 0
              ? section.titulo
              : `Sección sin título (${section._id.slice(-5)})`,
        }));
    }
  } catch (e: any) {
    error = e.message;
    console.log("[SobreMi] Error al obtener datos del endpoint /about:", error);
  }

  // Exponer las secciones para el menú flotante (solo en el cliente)
  if (typeof window !== "undefined" && aboutSections.length > 0) {
    window.__aboutSections = aboutSections;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-950/50 dark:to-black pt-24">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 gradient-text">Sobre Mí</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {error && <p className="text-center text-red-500">{error}</p>}
          {data && data.length > 0 && data
            .sort((a, b) => a.orden - b.orden)
            .map((section, idx) => (
              <ScrollReveal key={section._id} delay={200 * idx}>
                <Card className="glass shadow-2xl" id={`about-section-${section._id}`}>
                  <CardHeader>
                    <h2 className="flex items-center gap-3 text-2xl">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${COLORS[idx % COLORS.length]} flex items-center justify-center`}>
                        {ICONS[idx % ICONS.length]}
                      </div>
                      {section.titulo}
                    </h2>
                  </CardHeader>
                  <CardContent className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
                    <p className="break-words overflow-auto max-h-64 whitespace-pre-line">
                      {section.descripcion}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          {data && data.length === 0 && <p className="text-center">No hay información disponible.</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
