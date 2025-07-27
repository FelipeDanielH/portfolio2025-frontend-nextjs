// Interfaces para Use Cases del dominio Habilidades

// Interface principal para el use case de Skills Categories
export interface GetSkillsCategoriesUseCaseInterface {
  execute(skillIds?: string[]): Promise<SkillsCategoriesUseCaseResponse>;
}

// Interface para el use case de Skills filtradas
export interface GetFilteredSkillsUseCaseInterface {
  execute(skillIds: string[]): Promise<FilteredSkillsUseCaseResponse>;
}

// Interface para el servicio de transformación de Skills
export interface SkillsTransformationServiceInterface {
  transformSkillsToCategories(skills: any[], categories: any[]): Record<string, string[]>;
}

// Interface para el servicio de filtrado de Skills
export interface SkillsFilterServiceInterface {
  filterSkillsByIds(skills: any[], skillIds: string[]): any[];
}

// Tipos para las respuestas de use cases
export interface SkillsCategoriesUseCaseResponse {
  skillsCategories: Record<string, string[]>;
  totalSkills: number;
  totalCategories: number;
}

export interface FilteredSkillsUseCaseResponse {
  filteredSkills: any[];
  totalFound: number;
  totalRequested: number;
  missingSkills: string[];
}

// Tipos para las respuestas de servicios
export interface SkillsTransformationResponse {
  skillsCategories: Record<string, string[]>;
  totalSkills: number;
  totalCategories: number;
}

export interface SkillsFilterResponse {
  filteredSkills: any[];
  totalFound: number;
  totalRequested: number;
  missingSkills: string[];
} 