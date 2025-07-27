// Interfaces para Repositorios del dominio Habilidades

// Interface principal para el repositorio de Skills
export interface SkillsRepositoryInterface {
  fetchSkills(): Promise<Skill[]>;
  fetchSkillCategories(): Promise<SkillCategory[]>;
  fetchSkillById(id: string): Promise<Skill | null>;
  fetchSkillsByCategory(categoryId: string): Promise<Skill[]>;
}

// Tipos para las respuestas de repositorios
export interface SkillsRepositoryResponse {
  skills: Skill[];
  total: number;
}

export interface SkillCategoriesRepositoryResponse {
  categories: SkillCategory[];
  total: number;
}

// Tipos específicos para Skills
export interface Skill {
  _id: string;
  categoria_id: string;
  tecnologia: string;
  nivel: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
  puntuacion: number;
  descripcion?: string;
  conceptos: SkillConcepto[];
  orden?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface SkillConcepto {
  _id: string;
  nombre: string;
  aprendido: boolean;
}

export interface SkillCategory {
  _id: string;
  nombre: string;
  descripcion?: string;
  color?: string;
  orden?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Tipos para filtros de Skills
export interface SkillsFilter {
  categoryId?: string;
  level?: string;
  searchTerm?: string;
  limit?: number;
  offset?: number;
}

// Tipos para estadísticas de Skills
export interface SkillsStats {
  totalSkills: number;
  totalCategories: number;
  skillsByLevel: Record<string, number>;
  skillsByCategory: Record<string, number>;
  averageScore: number;
}

// Tipos para errores específicos de Skills
export interface SkillsRepositoryError {
  message: string;
  code: 'SKILL_NOT_FOUND' | 'CATEGORY_NOT_FOUND' | 'INVALID_FILTER' | 'API_ERROR';
  skillId?: string;
  categoryId?: string;
  timestamp: string;
} 