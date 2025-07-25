import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ExternalLink,
  Github,
  Calendar,
  Building,
  GraduationCap,
  Code,
  Award,
  Download,
  ChevronDown,
  Sparkles,
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { HabilidadesTecnicasHomeSection } from '@/domains/habilidades/components/HabilidadesTecnicasHomeSection'
import { habilidadesTecnicasHome } from '@/domains/habilidades/data'
import { ProyectosSection } from '@/domains/proyectos/components/ProyectosSection'
import { FormacionSection } from '@/domains/formacion/components/FormacionSection'
import { SobreMiSection } from "@/domains/sobre-mi/components/SobreMiSection";
import { experienceHomeMock } from "@/domains/experiencia/data";

function ExperienciaHomeSection() {
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
          {experienceHomeMock.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <div className="relative flex items-start gap-8 mb-12 last:mb-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <Card className="flex-1 glass shadow-xl">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <CardTitle className="text-xl text-gray-900 dark:text-white">{exp.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    {exp.company && (
                      <CardDescription className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {exp.company}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{exp.description}</p>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
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
            <span className="gradient-text">Felipe</span>
            <br />
            <span className="text-gray-900 dark:text-white">Henríquez</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-light">
            Desarrollador Full Stack
          </p>

          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Creando experiencias digitales excepcionales con React, Node.js y Spring Boot
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full">
              <Mail className="w-5 h-5 mr-2" />
              Contactar
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 rounded-full glass bg-transparent">
              <Download className="w-5 h-5 mr-2" />
              Descargar CV
            </Button>
          </div>

          <div className="flex justify-center gap-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+56 9 8469 2943</span>
            </div>
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Santiago, Chile</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      <main className="relative z-10">
        <SobreMiSection about={"Soy Felipe Henríquez, desarrollador full stack..."} />
        <HabilidadesTecnicasHomeSection data={habilidadesTecnicasHome} />
        <ExperienciaHomeSection />
        <ProyectosSection />
        <FormacionSection />
        {/* Contact Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-4xl font-bold mb-6"> 1Listo para trabajar juntos?</h2>
              <p className="text-xl mb-8 text-blue-100">Estoy disponible para nuevos proyectos y oportunidades</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="px-8 py-3 rounded-full">
                  <Mail className="w-5 h-5 mr-2" />
                  felipe.daniel.henriquez@gmail.com
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 rounded-full border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
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
