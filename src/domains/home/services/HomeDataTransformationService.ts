import type { Skill } from "@/domains/habilidades/types";

// Tipos para datos transformados
export interface TransformedSkillsCategories {
  [category: string]: string[];
}

export interface TransformedProject {
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

export interface TransformedEducation {
  title: string;
  institution: string;
  year: string;
  description: string;
}

export interface TransformedEducationData {
  education: TransformedEducation[];
  certifications: string[];
}

// Interfaces para el servicio
export interface SkillsTransformationService {
  transformSkillsToCategories(skills: Skill[], categories: any[]): TransformedSkillsCategories;
}

export interface ProjectsTransformationService {
  transformProjectsToLegacyFormat(projects: any[]): TransformedProject[];
}

export interface EducationTransformationService {
  transformEducationToLegacyFormat(educationData: any[]): TransformedEducationData;
}

// Servicio principal de transformación de datos de Home
export class HomeDataTransformationService implements 
  SkillsTransformationService, 
  ProjectsTransformationService, 
  EducationTransformationService {

  // Transformación de skills a categorías
  transformSkillsToCategories(skills: Skill[], categories: any[] = []): TransformedSkillsCategories {
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
    const result: TransformedSkillsCategories = {};
    categoriesMap.forEach((skills, categoria) => {
      result[categoria] = skills;
    });
    
    return result;
  }

  // Transformación de proyectos al formato legacy
  transformProjectsToLegacyFormat(projects: any[]): TransformedProject[] {
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

  // Transformación de educación y certificaciones
  transformEducationToLegacyFormat(educationData: any[]): TransformedEducationData {
    const education: TransformedEducation[] = [];
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

  // Método utilitario para validar datos de entrada
  validateInputData(data: any, expectedType: string): boolean {
    if (!data) return false;
    if (expectedType === 'array' && !Array.isArray(data)) return false;
    if (expectedType === 'object' && typeof data !== 'object') return false;
    return true;
  }

  // Método utilitario para manejar errores de transformación
  handleTransformationError(error: any, context: string): never {
    console.error(`Error en transformación de ${context}:`, error);
    throw new Error(`Error al transformar datos de ${context}`);
  }
}

// Factory para crear el servicio
export function createHomeDataTransformationService(): HomeDataTransformationService {
  return new HomeDataTransformationService();
} 