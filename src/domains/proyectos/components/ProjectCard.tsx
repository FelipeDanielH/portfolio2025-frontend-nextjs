import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { Project } from "@/domains/proyectos/types";

interface LinkItem {
  label: string;
  url: string;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Links planos
  const linksArray: LinkItem[] = [
    project.links.demo ? { label: "Demo", url: project.links.demo } : undefined,
    project.links.frontend ? { label: "Frontend", url: project.links.frontend } : undefined,
    project.links.backend ? { label: "Backend", url: project.links.backend } : undefined,
    project.links.github ? { label: "GitHub", url: project.links.github } : undefined,
    ...(project.links.otros?.map((l) => ({ label: l.titulo, url: l.url })) || [])
  ].filter((l): l is LinkItem => Boolean(l));

  return (
    <ScrollReveal key={index} delay={index * 150}>
      <Card className="glass shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-white dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.nombre}
            </CardTitle>
            <span className="text-blue-600 font-semibold capitalize">{project.estado}</span>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.descripcion}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(project.tecnologias ?? []).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
              >
                {tech}
              </Badge>
            ))}
            {(project.frameworks ?? []).map((fw) => (
              <Badge key={fw} variant="outline" className="border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">{fw}</Badge>
            ))}
            {(project.lenguajes ?? []).map((lang) => (
              <Badge key={lang} variant="outline" className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-300">{lang}</Badge>
            ))}
            {(project.roles ?? []).map((rol) => (
              <Badge key={rol} variant="outline" className="border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300">{rol}</Badge>
            ))}
            {(project.herramientas ?? []).map((herr) => (
              <Badge key={herr} variant="outline" className="border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300">{herr}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {linksArray.map((link, linkIndex) => (
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
  );
} 