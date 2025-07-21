import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Sparkles, Target, Heart, Lightbulb } from "lucide-react"
import { Footer } from "@/components/layout/footer"

export default function SobreMi() {
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
          <ScrollReveal delay={200}>
            <Card id="mi-historia" className="glass shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  Mi Historia
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  Soy Felipe Henríquez, un apasionado desarrollador full stack con una sólida formación en Ingeniería en
                  Informática y una especialización intensiva a través del bootcamp de Generation Chile. Mi viaje en el
                  mundo de la tecnología comenzó con la curiosidad de entender cómo funcionan las aplicaciones que
                  usamos diariamente.
                </p>
                <p>
                  Durante mis años de estudio y práctica, he desarrollado una profunda comprensión tanto del frontend
                  como del backend, lo que me permite crear soluciones completas y eficientes. Mi experiencia abarca
                  desde la creación de interfaces de usuario intuitivas hasta el diseño de arquitecturas robustas de
                  servidor.
                </p>
                <p>
                  Lo que más me motiva es la posibilidad de transformar ideas en realidades digitales que impacten
                  positivamente en la vida de las personas. Cada proyecto es una oportunidad para aprender algo nuevo y
                  superar desafíos técnicos interesantes.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <Card id="mis-objetivos" className="glass shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  Mis Objetivos
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  Mi objetivo principal es contribuir a equipos de desarrollo que valoren las buenas prácticas, la
                  innovación y el crecimiento continuo. Busco oportunidades donde pueda aplicar mis conocimientos en
                  React, Node.js y Spring Boot para crear soluciones escalables y mantenibles.
                </p>
                <p>
                  Estoy especialmente interesado en proyectos que involucren tecnologías cloud, arquitecturas
                  microservicios y metodologías ágiles. Mi meta es evolucionar hacia roles de liderazgo técnico donde
                  pueda mentorear a otros desarrolladores y contribuir a la arquitectura de sistemas complejos.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <Card id="mis-pasiones" className="glass shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  Mis Pasiones
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  Más allá del código, soy un entusiasta de la tecnología emergente y las tendencias de desarrollo. Me
                  fascina explorar nuevos frameworks, herramientas de DevOps y metodologías que puedan mejorar la
                  eficiencia del desarrollo.
                </p>
                <p>
                  También disfruto contribuyendo a la comunidad de desarrolladores, ya sea a través de proyectos open
                  source, mentorías o compartiendo conocimientos en blogs técnicos. Creo firmemente en el poder del
                  aprendizaje colaborativo y el intercambio de experiencias.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={800}>
            <Card id="mi-filosofia" className="glass shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  Mi Filosofía de Desarrollo
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  Creo en el desarrollo centrado en el usuario, donde cada línea de código tiene un propósito claro y
                  contribuye a una experiencia excepcional. La calidad del código no es negociable: prefiero escribir
                  menos código pero que sea limpio, documentado y mantenible.
                </p>
                <p>
                  Mi enfoque se basa en la mejora continua, el testing riguroso y la colaboración efectiva. Considero
                  que los mejores productos nacen de equipos diversos que comparten una visión común y se apoyan
                  mutuamente para alcanzar la excelencia técnica.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  )
}
