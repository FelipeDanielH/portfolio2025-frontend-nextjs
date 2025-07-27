import type { Project } from "../types";

// Tipo para el formato legacy (simplificado para Home)
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

// Interfaces para las dependencias
export interface ProjectsRepository {
  fetchHomeProjects(): Promise<any[]>;
}

export interface ProjectsTransformationService {
  transformProjectsToLegacyFormat(projects: any[]): LegacyProject[];
}

// Tipos para la respuesta del use case
export interface HomeProjectsUseCaseResponse {
  projects: LegacyProject[];
  totalProjects: number;
  projectsByStatus: Record<string, number>;
}

// Use Case para obtener proyectos destacados de Home
export class GetHomeProjectsUseCase {
  constructor(
    private projectsRepository: ProjectsRepository,
    private transformationService: ProjectsTransformationService
  ) {}

  async execute(): Promise<HomeProjectsUseCaseResponse> {
    try {
      // 1. Obtener proyectos destacados
      const rawProjects = await this.projectsRepository.fetchHomeProjects();

      // 2. Transformar proyectos al formato legacy
      const projects = this.transformationService.transformProjectsToLegacyFormat(rawProjects);

      // 3. Calcular estadísticas
      const totalProjects = projects.length;
      const projectsByStatus = projects.reduce((acc, project) => {
        const status = project.status || 'sin-estado';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        projects,
        totalProjects,
        projectsByStatus
      };

    } catch (error) {
      console.error('Error en GetHomeProjectsUseCase:', error);
      throw new Error('Error al obtener proyectos destacados');
    }
  }
}

// Factory para crear el use case con implementaciones concretas
export function createGetHomeProjectsUseCase(): GetHomeProjectsUseCase {
  const projectsRepository: ProjectsRepository = {
    fetchHomeProjects: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home/projects`, {
        next: { revalidate: 3600 }
      });
      if (response.ok) {
        const data = await response.json();
        return data.projects || [];
      }
      return [];
    }
  };

  const transformationService: ProjectsTransformationService = {
    transformProjectsToLegacyFormat: (projects: any[]): LegacyProject[] => {
      return projects.map(project => ({
        name: project.nombre,
        description: project.descripcion,
        tech: project.tecnologias || [],
        status: project.estado || 'sin-estado',
        year: project.año || new Date().getFullYear(),
        image: project.imagen || '',
        links: Object.entries(project.links || {}).map(([key, url]) => ({
          label: key === 'demo' ? 'Demo' : 
                 key === 'frontend' ? 'Frontend' : 
                 key === 'backend' ? 'Backend' : 
                 key === 'github' ? 'GitHub' : key,
          url: url as string
        }))
      }));
    }
  };

  return new GetHomeProjectsUseCase(projectsRepository, transformationService);
} 