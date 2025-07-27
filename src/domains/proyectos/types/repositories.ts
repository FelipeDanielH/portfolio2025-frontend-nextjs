// Interfaces para Repositorios del dominio Proyectos

// Interface principal para el repositorio de Projects
export interface ProjectsRepositoryInterface {
  fetchProjects(): Promise<Project[]>;
  fetchHomeProjects(): Promise<Project[]>;
  fetchProjectById(id: string): Promise<Project | null>;
  fetchProjectsByStatus(status: string): Promise<Project[]>;
  fetchProjectsByTechnology(technology: string): Promise<Project[]>;
}

// Tipos para las respuestas de repositorios
export interface ProjectsRepositoryResponse {
  projects: Project[];
  total: number;
}

export interface HomeProjectsRepositoryResponse {
  projects: Project[];
  total: number;
}

// Tipos específicos para Projects
export interface Project {
  _id: string;
  nombre: string;
  descripcion: string;
  tecnologias: string[];
  roles: string[];
  frameworks: string[];
  lenguajes: string[];
  herramientas: string[];
  estado: string;
  año: number;
  imagen: string;
  links: ProjectLinks;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectLinks {
  demo?: string;
  frontend?: string;
  backend?: string;
  github?: string;
  otros?: ProjectLinkOtros[];
}

export interface ProjectLinkOtros {
  titulo: string;
  url: string;
}

// Tipos para filtros de Projects
export interface ProjectsFilter {
  status?: string;
  technology?: string;
  year?: number;
  searchTerm?: string;
  limit?: number;
  offset?: number;
}

// Tipos para estadísticas de Projects
export interface ProjectsStats {
  totalProjects: number;
  projectsByStatus: Record<string, number>;
  projectsByTechnology: Record<string, number>;
  projectsByYear: Record<string, number>;
  averageTechnologiesPerProject: number;
}

// Tipos para errores específicos de Projects
export interface ProjectsRepositoryError {
  message: string;
  code: 'PROJECT_NOT_FOUND' | 'INVALID_STATUS' | 'INVALID_TECHNOLOGY' | 'API_ERROR';
  projectId?: string;
  status?: string;
  technology?: string;
  timestamp: string;
} 