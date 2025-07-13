import TagsScroll from "@/components/TagsScroll"
import { SiNextdotjs, SiNodedotjs, SiMongodb } from "react-icons/si"
import SkillBar from '@/components/SkillBar'
import Link from 'next/link'
import ExperienceCard from '@/components/ExperienceCard'
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa"
import FadeIn from '@/components/FadeIn'


const habilidades = [
  { name: 'JavaScript', level: 9 },
  { name: 'TypeScript', level: 8 },
  { name: 'React', level: 8 },
  { name: 'Next.js', level: 7 },
  { name: 'Node.js', level: 8 },
  { name: 'Express', level: 7 },
  { name: 'MongoDB', level: 7 },
  { name: 'SQL / MySQL', level: 6 },
  { name: 'Docker', level: 6 },
  { name: 'Git', level: 9 },
]

const experiencias = [
  {
    role: "Desarrollador Freelance (WooCommerce)",
    company: "Proyecto Independiente",
    date: "2025",
    description: "Implementación de ecommerce para microemprendedoras usando WordPress, WooCommerce, PHP y MySQL.",
  },
  {
    role: "Customer Specialist IT",
    company: "ETPAY SpA",
    date: "Jun 2021 - Dic 2021",
    description: "Resolución de incidencias con AWS CloudWatch, soporte a APIs REST y coordinación con el equipo técnico.",
  },
  {
    role: "Desarrollador Shopify (Práctica)",
    company: "Ducklife Media",
    date: "Oct 2020 - Dic 2020",
    description: "Modificación de temas y estilos en tiendas Shopify usando HTML, CSS y JS para mejorar diseño responsive.",
  },
]


export default function Home() {
  return (
    <main>
      {/* ================= HERO =====================*/}
      <section className="min-h-[calc(100vh-64px)] flex items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="max-w-xl mx-auto relative z-10">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-black dark:text-white">
            Felipe Henríquez
          </h1>
          <h2 className="text-xl sm:text-2xl mb-6 text-gray-700 dark:text-gray-300">
            Desarrollador Full Stack
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-400">
            Bienvenido a mi portafolio profesional. Aquí encontrarás un resumen de mis habilidades,
            formación, experiencia y proyectos destacados.
          </p>
        </div>
      </section>


      <section className="bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Tecnologías principales</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              Stack profesional con foco en rendimiento, escalabilidad y buenas prácticas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Next.js */}
            <div className="flex flex-col items-center p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shadow-sm transition hover:shadow-md">
              <SiNextdotjs size={40} className="text-black dark:text-white mb-4" />
              <h3 className="text-lg font-semibold">Next.js</h3>
            </div>

            {/* Node.js */}
            <div className="flex flex-col items-center p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shadow-sm transition hover:shadow-md">
              <SiNodedotjs size={40} className="text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-lg font-semibold">Node.js</h3>
            </div>

            {/* MongoDB */}
            <div className="flex flex-col items-center p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shadow-sm transition hover:shadow-md">
              <SiMongodb size={40} className="text-green-700 dark:text-green-500 mb-4" />
              <h3 className="text-lg font-semibold">MongoDB</h3>
            </div>
          </div>

          <TagsScroll />



        </FadeIn>
      </section>

      {/* Expertise Section */}
      <section className="bg-white dark:bg-gray-950 py-12 px-4 sm:px-8">
        <FadeIn delay={0.1}>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Mis habilidades</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {habilidades.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/habilidades"
                className="inline-block px-6 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Ver habilidades en detalle →
              </Link>
            </div>
          </div>

        </FadeIn>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-8">
        <FadeIn delay={0.1}>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Experiencia laboral</h2>

            {experiencias.map((exp) => (
              <ExperienceCard key={exp.role} {...exp} />
            ))}

            <div className="text-center mt-10">
              <Link
                href="/resumen"
                className="inline-block px-6 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Ver experiencia completa →
              </Link>
            </div>
          </div>


        </FadeIn>
      </section>

      <section className="bg-white dark:bg-gray-950 py-12 px-4 sm:px-8">
        <FadeIn delay={0.1}>

          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Contacto</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Si estás interesado en colaborar o tienes alguna pregunta, no dudes en escribirme.
            </p>

            <div className="flex flex-col items-center gap-4 sm:gap-6">
              {/* Email */}
              <a
                href="mailto:felipe.daniel.henriquez@gmail.com"
                className="inline-flex items-center gap-2 text-indigo-600 hover:underline"
              >
                <FaEnvelope />
                felipe.daniel.henriquez@gmail.com
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/felipe-henriquez/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 hover:underline"
              >
                <FaLinkedin />
                linkedin.com/in/felipe-henriquez
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/FelipeDanielH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 hover:underline"
              >
                <FaGithub />
                github.com/FelipeDanielH
              </a>
            </div>
          </div>


        </FadeIn>
      </section>



    </main>

  )
}
