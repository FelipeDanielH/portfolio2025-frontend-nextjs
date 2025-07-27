import type { Project } from "@/domains/proyectos/types";

// Interfaces para el repositorio
export interface ProjectsRepository {
  fetchProjects(): Promise<Project[]>;
  fetchHomeProjects(): Promise<any[]>;
  fetchProjectById(id: string): Promise<Project | null>;
  fetchProjectsByStatus(status: string): Promise<Project[]>;
  fetchProjectsByTechnology(technology: string): Promise<Project[]>;
}

// Tipos para las respuestas del repositorio
export interface ProjectsResponse {
  projects: Project[];
  total: number;
}

export interface HomeProjectsResponse {
  projects: any[];
  total: number;
}

// Implementación del repositorio
export class ProjectsRepositoryImpl implements ProjectsRepository {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://portfolio2025-backend-nodejs.onrender.com';
  }

  async fetchProjects(): Promise<Project[]> {
    try {
      const response = await fetch(`${this.baseUrl}/projects`, {
        next: { revalidate: 3600 } // Cache por 1 hora
      });

      if (!response.ok) {
        console.warn('API /projects no responde correctamente:', response.status);
        return [];
      }

      const data = await response.json();
      
      // Manejar diferentes formatos de respuesta
      if (Array.isArray(data)) {
        return data as Project[];
      }
      
      if (data && Array.isArray(data.data)) {
        return data.data as Project[];
      }
      
      if (data && data.projects && Array.isArray(data.projects)) {
        return data.projects as Project[];
      }

      console.warn('API /projects retorna formato inesperado:', data);
      return [];
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      return [];
    }
  }

  async fetchHomeProjects(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/home/projects`, {
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        console.warn('API /home/projects no responde correctamente:', response.status);
        return [];
      }

      const data = await response.json();
      
      // Manejar diferentes formatos de respuesta
      if (Array.isArray(data)) {
        return data;
      }
      
      if (data && Array.isArray(data.data)) {
        return data.data;
      }
      
      if (data && data.projects && Array.isArray(data.projects)) {
        return data.projects;
      }

      console.warn('API /home/projects retorna formato inesperado:', data);
      return [];
    } catch (error) {
      console.error('Error al obtener proyectos destacados:', error);
      return [];
    }
  }

  async fetchProjectById(id: string): Promise<Project | null> {
    try {
      const response = await fetch(`${this.baseUrl}/projects/${id}`, {
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        console.warn(`API /projects/${id} no responde correctamente:`, response.status);
        return null;
      }

      const data = await response.json();
      
      if (!data || !data._id) {
        console.warn(`API /projects/${id} retorna datos vacíos`);
        return null;
      }

      return data as Project;
    } catch (error) {
      console.error(`Error al obtener proyecto ${id}:`, error);
      return null;
    }
  }

  async fetchProjectsByStatus(status: string): Promise<Project[]> {
    try {
      const allProjects = await this.fetchProjects();
      
      if (!allProjects || allProjects.length === 0) {
        return [];
      }

      // Filtrar proyectos por estado
      const filteredProjects = allProjects.filter(project => 
        project.estado?.toLowerCase() === status.toLowerCase()
      );

      return filteredProjects;
    } catch (error) {
      console.error(`Error al obtener proyectos por estado ${status}:`, error);
      return [];
    }
  }

  async fetchProjectsByTechnology(technology: string): Promise<Project[]> {
    try {
      const allProjects = await this.fetchProjects();
      
      if (!allProjects || allProjects.length === 0) {
        return [];
      }

      // Filtrar proyectos por tecnología
      const filteredProjects = allProjects.filter(project => 
        project.tecnologias?.some(tech => 
          tech.toLowerCase().includes(technology.toLowerCase())
        )
      );

      return filteredProjects;
    } catch (error) {
      console.error(`Error al obtener proyectos por tecnología ${technology}:`, error);
      return [];
    }
  }

  // Método utilitario para validar respuestas de API
  private validateApiResponse(response: any, endpoint: string): boolean {
    if (!response) {
      console.warn(`Respuesta vacía del endpoint ${endpoint}`);
      return false;
    }
    return true;
  }

  // Método utilitario para manejar errores de red
  private handleNetworkError(error: any, endpoint: string): never {
    console.error(`Error de red en ${endpoint}:`, error);
    throw new Error(`Error de conexión al obtener datos de ${endpoint}`);
  }

  // Método utilitario para normalizar datos de proyectos
  private normalizeProjectData(project: any): Project {
    return {
      _id: project._id || '',
      nombre: project.nombre || project.name || '',
      descripcion: project.descripcion || project.description || '',
      tecnologias: project.tecnologias || project.tech || project.technologies || [],
      roles: project.roles || [],
      frameworks: project.frameworks || [],
      lenguajes: project.lenguajes || [],
      herramientas: project.herramientas || [],
      estado: project.estado || project.status || 'en-progreso',
      año: project.año || project.year || new Date().getFullYear(),
      imagen: project.imagen || project.image || '',
      links: project.links || {},
      createdAt: project.createdAt || new Date().toISOString(),
      updatedAt: project.updatedAt || new Date().toISOString()
    };
  }
}

// Factory para crear el repositorio
export function createProjectsRepository(): ProjectsRepository {
  return new ProjectsRepositoryImpl();
} 