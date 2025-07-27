import type { Skill } from "../types";

// Interfaces para las dependencias
export interface SkillsRepository {
  fetchSkills(): Promise<Skill[]>;
}

export interface SkillsFilterService {
  filterSkillsByIds(skills: Skill[], skillIds: string[]): Skill[];
}

// Tipos para la respuesta del use case
export interface FilteredSkillsUseCaseResponse {
  filteredSkills: Skill[];
  totalFound: number;
  totalRequested: number;
  missingSkills: string[];
}

// Use Case para filtrar skills por IDs específicos
export class GetFilteredSkillsUseCase {
  constructor(
    private skillsRepository: SkillsRepository,
    private filterService: SkillsFilterService
  ) {}

  async execute(skillIds: string[]): Promise<FilteredSkillsUseCaseResponse> {
    try {
      // 1. Obtener todas las skills
      const allSkills = await this.skillsRepository.fetchSkills();

      // 2. Filtrar skills por IDs
      const filteredSkills = this.filterService.filterSkillsByIds(allSkills, skillIds);

      // 3. Calcular estadísticas
      const totalFound = filteredSkills.length;
      const totalRequested = skillIds.length;
      const foundIds = filteredSkills.map(skill => skill._id);
      const missingSkills = skillIds.filter(id => !foundIds.includes(id));

      return {
        filteredSkills,
        totalFound,
        totalRequested,
        missingSkills
      };

    } catch (error) {
      console.error('Error en GetFilteredSkillsUseCase:', error);
      throw new Error('Error al filtrar skills');
    }
  }
}

// Factory para crear el use case con implementaciones concretas
export function createGetFilteredSkillsUseCase(): GetFilteredSkillsUseCase {
  const skillsRepository: SkillsRepository = {
    fetchSkills: async () => {
      const { fetchSkills } = await import("../services/skillsService");
      return fetchSkills();
    }
  };

  const filterService: SkillsFilterService = {
    filterSkillsByIds: (skills: Skill[], skillIds: string[]): Skill[] => {
      return skills.filter(skill => skillIds.includes(skill._id));
    }
  };

  return new GetFilteredSkillsUseCase(skillsRepository, filterService);
} 