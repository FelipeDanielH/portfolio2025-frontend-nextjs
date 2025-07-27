import { Button } from "@/components/ui/button"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Code,
  Download,
  ChevronDown,
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { HabilidadesTecnicasHomeSection } from '@/domains/habilidades/components/HabilidadesTecnicasHomeSection'
import { ProyectosHomeSection } from '@/domains/proyectos/components/ProyectosHomeSection'
import { FormacionHomeSection } from '@/domains/formacion/components/FormacionHomeSection'
import { SobreMiSection } from "@/domains/sobre-mi/components/SobreMiSection";
import { ExperienciaHomeSection } from "@/domains/experiencia/components/ExperienciaHomeSection";
import { createGetHomeDataUseCase } from "@/domains/home/useCases/GetHomeDataUseCase";
import type { HomeDataUseCaseResponse } from "@/domains/home/useCases/GetHomeDataUseCase";

// Función simplificada para obtener datos de Home usando el use case
async function getHomeData(): Promise<HomeDataUseCaseResponse> {
  try {
    const getHomeDataUseCase = createGetHomeDataUseCase();
    return await getHomeDataUseCase.execute();
  } catch (error) {
    console.error('Error al obtener datos de Home:', error);
    throw error;
  }
}



export default async function Portfolio() {
  // Obtener datos de la API
  const homeData = await getHomeData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-950/50 dark:to-black">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-black/20 dark:from-blue-400/10 dark:via-transparent dark:to-blue-900/30" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-float">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1 animate-pulse-glow">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                <Code className="w-16 h-16 text-blue-500" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">{homeData.hero.nombre}</span>
            <br />
            <span className="text-gray-900 dark:text-white">Henríquez</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-light">
            {homeData.hero.titulo}
          </p>

          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {homeData.hero.claim}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full">
              <Mail className="w-5 h-5 mr-2" />
              {homeData.hero.boton_contacto}
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 rounded-full glass bg-transparent" asChild>
              <a href={homeData.hero.cv} target="_blank" rel="noopener noreferrer">
                <Download className="w-5 h-5 mr-2" />
                Descargar CV
              </a>
            </Button>
          </div>

          <div className="flex justify-center gap-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{homeData.hero.telefono}</span>
            </div>
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{homeData.hero.ubicacion}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      <main className="relative z-10">
        <SobreMiSection about={homeData.about.about} />
        <HabilidadesTecnicasHomeSection skillIds={homeData.skills.skills} />
        <ExperienciaHomeSection experience={homeData.experience.experience} />
        <ProyectosHomeSection />
        <FormacionHomeSection />
        {/* Contact Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-4xl font-bold mb-6">{homeData.callToAction.titulo}</h2>
              <p className="text-xl mb-8 text-blue-100">{homeData.callToAction.subtitulo}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="px-8 py-3 rounded-full" asChild>
                  <a href={`mailto:${homeData.contact.email}`}>
                    <Mail className="w-5 h-5 mr-2" />
                    {homeData.contact.email}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 rounded-full border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  asChild
                >
                  <a href={homeData.contact.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-2">
          <p className="text-gray-400">
            © 2025 Felipe Henríquez. Desarrollador Full Stack especializado en React, Node.js y Spring Boot.
          </p>
          <p className="text-xs text-gray-500 italic">
            * Este portafolio fue desarrollado con asistencia de IA y no refleja completamente mis habilidades reales de
            diseño.
          </p>
        </div>
      </footer>
    </div>
  )
}
