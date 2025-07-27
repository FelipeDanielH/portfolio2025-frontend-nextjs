import type { HomeData } from "../types";
import type { Skill } from "@/domains/habilidades/types";

// Interfaces para las dependencias (Dependency Inversion Principle)
export interface HomeRepository {
  getAllHomeData(): Promise<HomeData>;
}

export interface SkillsRepository {
  fetchSkills(): Promise<Skill[]>;
  fetchSkillCategories(): Promise<any[]>;
}

export interface ProjectsRepository {
  fetchHomeProjects(): Promise<any[]>;
}

export interface EducationRepository {
  fetchHomeEducation(): Promise<any[]>;
}

export interface HomeDataTransformationService {
  transformSkillsToCategories(skills: Skill[], categories: any[]): Record<string, string[]>;
  transformProjectsToLegacyFormat(projects: any[]): any[];
  transformEducationToLegacyFormat(educationData: any[]): {
    education: any[];
    certifications: string[];
  };
}

// Tipos para la respuesta del use case
export interface HomeDataUseCaseResponse extends HomeData {
  skillsCategories: Record<string, string[]>;
  homeProjects: any[];
  homeEducation: any[];
  homeCertifications: string[];
}

// Use Case principal
export class GetHomeDataUseCase {
  constructor(
    private homeRepository: HomeRepository,
    private skillsRepository: SkillsRepository,
    private projectsRepository: ProjectsRepository,
    private educationRepository: EducationRepository,
    private transformationService: HomeDataTransformationService
  ) {}

  async execute(): Promise<HomeDataUseCaseResponse> {
    try {
      // 1. Obtener datos base de Home
      const homeData = await this.homeRepository.getAllHomeData();
      
      // 2. Obtener skills y categorías
      const [allSkills, categories] = await Promise.all([
        this.skillsRepository.fetchSkills(),
        this.skillsRepository.fetchSkillCategories().catch(() => [])
      ]);

      // 3. Obtener proyectos destacados
      const homeProjects = await this.projectsRepository.fetchHomeProjects().catch(() => []);

      // 4. Obtener educación y certificaciones destacadas
      const homeEducationData = await this.educationRepository.fetchHomeEducation().catch(() => []);
      
      // 5. Transformar datos
      const filteredSkills = allSkills.filter((skill: Skill) => 
        homeData.skills.skills.includes(skill._id)
      );
      
      const skillsCategories = this.transformationService.transformSkillsToCategories(filteredSkills, categories);
      const transformedProjects = this.transformationService.transformProjectsToLegacyFormat(homeProjects);
      const { education, certifications } = this.transformationService.transformEducationToLegacyFormat(homeEducationData);

      // 6. Retornar datos consolidados
      return {
        ...homeData,
        skillsCategories,
        homeProjects: transformedProjects,
        homeEducation: education,
        homeCertifications: certifications
      };

    } catch (error) {
      console.error('Error en GetHomeDataUseCase:', error);
      throw new Error('Error al obtener datos de Home');
    }
  }
}

// Factory para crear el use case con las implementaciones concretas
export function createGetHomeDataUseCase(): GetHomeDataUseCase {
  // Estas implementaciones se moverán a sus respectivos repositorios
  const homeRepository: HomeRepository = {
    getAllHomeData: async () => {
      const { getAllHomeData } = await import("../services/homeService");
      return getAllHomeData();
    }
  };

  const skillsRepository: SkillsRepository = {
    fetchSkills: async () => {
      const { fetchSkills } = await import("@/domains/habilidades/services/skillsService");
      return fetchSkills();
    },
    fetchSkillCategories: async () => {
      const { fetchSkillCategories } = await import("@/domains/habilidades/services/skillsService");
      return fetchSkillCategories();
    }
  };

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

  const educationRepository: EducationRepository = {
    fetchHomeEducation: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home/education`, {
        next: { revalidate: 3600 }
      });
      if (response.ok) {
        const data = await response.json();
        return data.education || [];
      }
      return [];
    }
  };

  const transformationService: HomeDataTransformationService = {
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
    },

    transformProjectsToLegacyFormat: (projects: any[]): any[] => {
      return projects.map(project => ({
        name: project.nombre,
        description: project.descripcion,
        tech: project.tecnologias,
        links: Object.entries(project.links).map(([key, url]) => ({
          label: key === 'demo' ? 'Demo' : 
                 key === 'frontend' ? 'Frontend' : 
                 key === 'backend' ? 'Backend' : 
                 key === 'github' ? 'GitHub' : key,
          url: url as string
        }))
      }));
    },

    transformEducationToLegacyFormat: (educationData: any[]): {
      education: any[];
      certifications: string[];
    } => {
      const education: any[] = [];
      const certifications: string[] = [];

      educationData.forEach(item => {
        if (item.tipo === 'formacion') {
          education.push({
            title: item.titulo,
            institution: item.institucion,
            year: item.fecha_fin ? new Date(item.fecha_fin).getFullYear().toString() : 
                  item.fecha_inicio ? new Date(item.fecha_inicio).getFullYear().toString() : 
                  'En curso',
            description: item.descripcion
          });
        } else if (item.tipo === 'certificacion') {
          certifications.push(`${item.titulo} – ${item.institucion}`);
        }
      });

      return { education, certifications };
    }
  };

  return new GetHomeDataUseCase(
    homeRepository,
    skillsRepository,
    projectsRepository,
    educationRepository,
    transformationService
  );
} 