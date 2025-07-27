// Interfaces para Use Cases del dominio Proyectos

// Interface principal para el use case de Home Projects
export interface GetHomeProjectsUseCaseInterface {
  execute(): Promise<HomeProjectsUseCaseResponse>;
}

// Interface para el servicio de transformación de Projects
export interface ProjectsTransformationServiceInterface {
  transformProjectsToLegacyFormat(projects: any[]): any[];
}

// Tipos para las respuestas de use cases
export interface HomeProjectsUseCaseResponse {
  projects: any[];
  totalProjects: number;
  projectsByStatus: Record<string, number>;
}

// Tipos para las respuestas de servicios
export interface ProjectsTransformationResponse {
  projects: any[];
  totalProjects: number;
  projectsByStatus: Record<string, number>;
}

// Tipos específicos para proyectos
export interface LegacyProject {
  name: string;
  description: string;
  tech: string[];
  status: string;
  year: number;
  image: string;
  links: Array<{
    label: string;
    url: string;
  }>;
}

export interface ProjectStats {
  totalProjects: number;
  projectsByStatus: Record<string, number>;
  projectsByTechnology: Record<string, number>;
  projectsByYear: Record<string, number>;
} 