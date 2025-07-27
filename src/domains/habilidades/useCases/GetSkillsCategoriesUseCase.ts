import type { Skill } from "../types";

// Interfaces para las dependencias
export interface SkillsRepository {
  fetchSkills(): Promise<Skill[]>;
  fetchSkillCategories(): Promise<any[]>;
}

export interface SkillsTransformationService {
  transformSkillsToCategories(skills: Skill[], categories: any[]): Record<string, string[]>;
}

// Tipos para la respuesta del use case
export interface SkillsCategoriesUseCaseResponse {
  skillsCategories: Record<string, string[]>;
  totalSkills: number;
  totalCategories: number;
}

// Use Case para obtener skills categorizadas
export class GetSkillsCategoriesUseCase {
  constructor(
    private skillsRepository: SkillsRepository,
    private transformationService: SkillsTransformationService
  ) {}

  async execute(skillIds?: string[]): Promise<SkillsCategoriesUseCaseResponse> {
    try {
      // 1. Obtener todas las skills y categorías
      const [allSkills, categories] = await Promise.all([
        this.skillsRepository.fetchSkills(),
        this.skillsRepository.fetchSkillCategories().catch(() => [])
      ]);

      // 2. Filtrar skills si se proporcionan IDs específicos
      const filteredSkills = skillIds 
        ? allSkills.filter(skill => skillIds.includes(skill._id))
        : allSkills;

      // 3. Transformar skills a categorías
      const skillsCategories = this.transformationService.transformSkillsToCategories(
        filteredSkills, 
        categories
      );

      // 4. Calcular estadísticas
      const totalSkills = filteredSkills.length;
      const totalCategories = Object.keys(skillsCategories).length;

      return {
        skillsCategories,
        totalSkills,
        totalCategories
      };

    } catch (error) {
      console.error('Error en GetSkillsCategoriesUseCase:', error);
      throw new Error('Error al obtener skills categorizadas');
    }
  }
}

// Factory para crear el use case con implementaciones concretas
export function createGetSkillsCategoriesUseCase(): GetSkillsCategoriesUseCase {
  const skillsRepository: SkillsRepository = {
    fetchSkills: async () => {
      const { fetchSkills } = await import("../services/skillsService");
      return fetchSkills();
    },
    fetchSkillCategories: async () => {
      const { fetchSkillCategories } = await import("../services/skillsService");
      return fetchSkillCategories();
    }
  };

  const transformationService: SkillsTransformationService = {
    transformSkillsToCategories: (skills: Skill[], categories: any[] = []): Record<string, string[]> => {
      const categoriesMap = new Map<string, string[]>();
      const categoryNamesMap = new Map<string, string>();
      
      // Crear mapa de IDs a nombres de categorías (con fallback)
      if (categories && Array.isArray(categories)) {
        categories.forEach(cat => {
          if (cat && cat._id && cat.nombre) {
            categoryNamesMap.set(cat._id, cat.nombre);
          }
        });
      }
      
      // Agrupar skills por categoría
      skills.forEach(skill => {
        const categoriaId = skill.categoria_id;
        const categoriaNombre = categoryNamesMap.get(categoriaId) || categoriaId;
        
        if (!categoriesMap.has(categoriaNombre)) {
          categoriesMap.set(categoriaNombre, []);
        }
        categoriesMap.get(categoriaNombre)!.push(skill.tecnologia);
      });
      
      // Convertir a objeto
      const result: Record<string, string[]> = {};
      categoriesMap.forEach((skills, categoria) => {
        result[categoria] = skills;
      });
      
      return result;
    }
  };

  return new GetSkillsCategoriesUseCase(skillsRepository, transformationService);
} 