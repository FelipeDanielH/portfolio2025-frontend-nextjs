import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/scroll-reveal";
import { projectsHomeMock } from "@/domains/proyectos/data";

export function ProyectosHomeSection() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Proyectos Destacados</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8">
          {projectsHomeMock.map((project, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <Card className="glass shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{project.nombre}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tecnologias.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
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
  );
} 