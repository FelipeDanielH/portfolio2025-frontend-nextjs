import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { createGetHomeProjectsUseCase } from "@/domains/proyectos/useCases/GetHomeProjectsUseCase";

interface Project {
  name: string;
  description: string;
  tech: string[];
  links: { label: string; url: string }[];
}

export async function ProyectosHomeSection() {
  // Obtener datos usando el use case
  const getHomeProjectsUseCase = createGetHomeProjectsUseCase();
  const { projects } = await getHomeProjectsUseCase.execute();
  return (
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
              <Card className="glass shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-white dark:border-gray-700">
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
  );
} 