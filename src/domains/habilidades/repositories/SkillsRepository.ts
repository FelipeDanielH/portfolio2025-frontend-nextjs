import type { Skill } from "@/domains/habilidades/types";

// Interfaces para el repositorio
export interface SkillsRepository {
  fetchSkills(): Promise<Skill[]>;
  fetchSkillCategories(): Promise<any[]>;
  fetchSkillById(id: string): Promise<Skill | null>;
  fetchSkillsByCategory(categoryId: string): Promise<Skill[]>;
}

// Tipos para las respuestas del repositorio
export interface SkillsResponse {
  skills: Skill[];
  total: number;
}

export interface SkillCategoriesResponse {
  categories: any[];
  total: number;
}

// Implementación del repositorio
export class SkillsRepositoryImpl implements SkillsRepository {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://portfolio2025-backend-nodejs.onrender.com';
  }

  async fetchSkills(): Promise<Skill[]> {
    try {
      const response = await fetch(`${this.baseUrl}/skills`, {
        next: { revalidate: 3600 } // Cache por 1 hora
      });

      if (!response.ok) {
        console.warn('API /skills no responde correctamente:', response.status);
        return [];
      }

      const data = await response.json();
      
      // Manejar diferentes formatos de respuesta
      if (Array.isArray(data)) {
        return data as Skill[];
      }
      
      if (data && Array.isArray(data.data)) {
        return data.data as Skill[];
      }
      
      if (data && data.skills && Array.isArray(data.skills)) {
        return data.skills as Skill[];
      }

      console.warn('API /skills retorna formato inesperado:', data);
      return [];
    } catch (error) {
      console.error('Error al obtener skills:', error);
      return [];
    }
  }

  async fetchSkillCategories(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/skills/categories`, {
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        console.warn('API /skills/categories no responde correctamente:', response.status);
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
      
      if (data && data.categories && Array.isArray(data.categories)) {
        return data.categories;
      }

      console.warn('API /skills/categories retorna formato inesperado:', data);
      return [];
    } catch (error) {
      console.error('Error al obtener categorías de skills:', error);
      return [];
    }
  }

  async fetchSkillById(id: string): Promise<Skill | null> {
    try {
      const response = await fetch(`${this.baseUrl}/skills/${id}`, {
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        console.warn(`API /skills/${id} no responde correctamente:`, response.status);
        return null;
      }

      const data = await response.json();
      
      if (!data || !data._id) {
        console.warn(`API /skills/${id} retorna datos vacíos`);
        return null;
      }

      return data as Skill;
    } catch (error) {
      console.error(`Error al obtener skill ${id}:`, error);
      return null;
    }
  }

  async fetchSkillsByCategory(categoryId: string): Promise<Skill[]> {
    try {
      const allSkills = await this.fetchSkills();
      
      if (!allSkills || allSkills.length === 0) {
        return [];
      }

      // Filtrar skills por categoría
      const filteredSkills = allSkills.filter(skill => 
        skill.categoria_id === categoryId
      );

      return filteredSkills;
    } catch (error) {
      console.error(`Error al obtener skills por categoría ${categoryId}:`, error);
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

  // Método utilitario para normalizar datos de skills
  private normalizeSkillData(skill: any): Skill {
    return {
      _id: skill._id || '',
      tecnologia: skill.tecnologia || skill.nombre || '',
      categoria_id: skill.categoria_id || skill.categoria || '',
      nivel: skill.nivel || 'Intermedio',
      puntuacion: skill.puntuacion || 0,
      descripcion: skill.descripcion || skill.description || '',
      conceptos: skill.conceptos || [],
      orden: skill.orden || 0,
      createdAt: skill.createdAt || new Date().toISOString(),
      updatedAt: skill.updatedAt || new Date().toISOString(),
      __v: skill.__v || 0
    };
  }
}

// Factory para crear el repositorio
export function createSkillsRepository(): SkillsRepository {
  return new SkillsRepositoryImpl();
} 