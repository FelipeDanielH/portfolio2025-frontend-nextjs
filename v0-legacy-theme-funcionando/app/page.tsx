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
import { FloatingNav } from "@/components/floating-nav"

export default function Portfolio() {
  const skills = {
    languages: ["JavaScript", "TypeScript", "Java", "SQL", "Python"],
    frontend: ["React.js", "Next.js", "HTML", "CSS", "Tailwind"],
    backend: ["Node.js", "Express", "Spring Boot"],
    databases: ["MySQL", "MongoDB", "PostgreSQL"],
    devops: ["Git", "Docker", "Vercel", "GCP", "AWS"],
    others: ["JWT", "REST APIs", "MVC", "Testing Unitario", "CI/CD", "Scrum"],
  }

  const projects = [
    {
      name: "Ecomarket",
      description: "E-commerce full stack con React y Spring Boot. MySQL, despliegue en Vercel/GCP.",
      tech: ["React", "Spring Boot", "MySQL"],
      links: [
        { label: "Frontend", url: "#" },
        { label: "Backend", url: "#" },
      ],
    },
    {
      name: "BancoSimple",
      description: "App bancaria con autenticación JWT. React + Spring Boot + MySQL.",
      tech: ["React", "Spring Boot", "JWT"],
      links: [
        { label: "Frontend", url: "#" },
        { label: "Backend", url: "#" },
      ],
    },
    {
      name: "Gestor de Tareas CLI",
      description: "App Node.js interactiva (Inquirer).",
      tech: ["Node.js", "CLI", "Inquirer"],
      links: [
        { label: "Demo", url: "#" },
        { label: "GitHub", url: "#" },
      ],
    },
    {
      name: "Portafolio Web",
      description: "Sitio MERN personal con despliegue en Vercel.",
      tech: ["MERN", "Vercel"],
      links: [{ label: "Enlace", url: "#" }],
    },
  ]

  const experience = [
    {
      title: "Desarrollador Freelance (WooCommerce)",
      period: "2025",
      description: "Implementación de ecommerce para microemprendedoras usando WordPress, WooCommerce, PHP y MySQL.",
    },
    {
      title: "Customer Specialist IT",
      company: "ETPAY SpA",
      period: "Jun 2021 - Dic 2021",
      description:
        "Resolución de incidencias con AWS CloudWatch, soporte a integraciones mediante APIs REST y coordinación directa con clientes y el equipo de desarrollo.",
    },
    {
      title: "Desarrollador Shopify (Práctica)",
      company: "Ducklife Media",
      period: "Oct 2020 - Dic 2020",
      description:
        "Modificación de temas y estilos visuales con HTML, CSS y JS en tiendas Shopify. Mejoras en diseño responsive y adaptación visual.",
    },
  ]

  const education = [
    {
      title: "Bootcamp Full Stack (540h)",
      institution: "Generation Chile",
      year: "2025",
      description: "Stack MERN, Spring Boot, despliegue, testing, buenas prácticas.",
    },
    {
      title: "Ingeniería en Informática",
      institution: "Duoc UC",
      year: "2021",
      description: "(Certificado de título)",
    },
  ]

  const certifications = ["React: De cero a experto – Udemy", "Docker: Guía práctica para desarrolladores"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-950/50 dark:to-black">
      <FloatingNav />

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
        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 gradient-text">Sobre Mí</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="glass border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Ingeniero en Informática y egresado del bootcamp Full Stack (540h) de Generation Chile.
                        Desarrollo frontend y backend con React, Node.js y Spring Boot. Bases de datos SQL/NoSQL y
                        despliegue en cloud (Vercel, GCP, AWS). Busco aportar y crecer en equipos con buenas prácticas y
                        metodologías ágiles.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="py-20 px-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 gradient-text">Habilidades Técnicas</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList], index) => (
                <ScrollReveal key={category} delay={index * 100}>
                  <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg capitalize text-gray-900 dark:text-white">
                        {category === "others"
                          ? "Otros"
                          : category === "languages"
                            ? "Lenguajes"
                            : category === "databases"
                              ? "Bases de Datos"
                              : category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
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

              {experience.map((exp, index) => (
                <ScrollReveal key={index} delay={index * 200}>
                  <div className="relative flex items-start gap-8 mb-12 last:mb-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Building className="w-8 h-8 text-white" />
                    </div>

                    <Card className="flex-1 glass border-0 shadow-xl">
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

        {/* Projects Section */}
        <section
          id="projects"
          className="py-20 px-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 gradient-text">Proyectos Destacados</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </CardTitle>
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.links.map((link, linkIndex) => (
                          <Button
                            key={linkIndex}
                            variant="outline"
                            size="sm"
                            asChild
                            className="hover:bg-blue-50 dark:hover:bg-blue-950/50 bg-transparent"
                          >
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              {link.label}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Education */}
              <ScrollReveal>
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 gradient-text">Formación</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
                  </div>

                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <Card key={index} className="glass border-0 shadow-xl">
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                              <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg text-gray-900 dark:text-white">{edu.title}</CardTitle>
                              <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
                                {edu.institution} • {edu.year}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Certifications */}
              <ScrollReveal delay={200}>
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 gradient-text">Certificaciones</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
                  </div>

                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <Card
                        key={index}
                        className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                              <Award className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{cert}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-4xl font-bold mb-6">¿Listo para trabajar juntos?</h2>
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
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Felipe Henríquez. Desarrollador Full Stack especializado en React, Node.js y Spring Boot.
          </p>
        </div>
      </footer>
    </div>
  )
}
