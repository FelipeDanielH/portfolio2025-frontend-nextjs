// Interfaces para Use Cases del dominio Home

// Interface principal para el use case de Home
export interface GetHomeDataUseCaseInterface {
  execute(): Promise<HomeDataUseCaseResponse>;
}

// Interface para el servicio de transformación de datos de Home
export interface HomeDataTransformationInterface {
  transformSkillsToCategories(skills: any[], categories: any[]): Record<string, string[]>;
  transformProjectsToLegacyFormat(projects: any[]): any[];
  transformEducationToLegacyFormat(educationData: any[]): {
    education: any[];
    certifications: string[];
  };
}

// Interface para el repositorio de Home
export interface HomeRepositoryInterface {
  getAllHomeData(): Promise<any>;
  getHomeHero(): Promise<any>;
  getHomeAbout(): Promise<any>;
  getHomeSkills(): Promise<any>;
  getHomeExperience(): Promise<any>;
  getHomeContact(): Promise<any>;
  getHomeCallToAction(): Promise<any>;
}

// Interface para el repositorio de Skills
export interface SkillsRepositoryInterface {
  fetchSkills(): Promise<any[]>;
  fetchSkillCategories(): Promise<any[]>;
  fetchSkillById(id: string): Promise<any | null>;
  fetchSkillsByCategory(categoryId: string): Promise<any[]>;
}

// Interface para el repositorio de Projects
export interface ProjectsRepositoryInterface {
  fetchProjects(): Promise<any[]>;
  fetchHomeProjects(): Promise<any[]>;
  fetchProjectById(id: string): Promise<any | null>;
  fetchProjectsByStatus(status: string): Promise<any[]>;
  fetchProjectsByTechnology(technology: string): Promise<any[]>;
}

// Interface para el repositorio de Education
export interface EducationRepositoryInterface {
  fetchEducation(): Promise<any[]>;
  fetchCertifications(): Promise<any[]>;
  fetchHomeEducation(): Promise<any[]>;
  fetchEducationById(id: string): Promise<any | null>;
  fetchCertificationById(id: string): Promise<any | null>;
  fetchEducationByType(type: string): Promise<any[]>;
}

// Tipos para las respuestas de use cases
export interface HomeDataUseCaseResponse {
  hero: any;
  about: any;
  skills: any;
  experience: any;
  contact: any;
  callToAction: any;
  skillsCategories: Record<string, string[]>;
  homeProjects: any[];
  homeEducation: any[];
  homeCertifications: string[];
}

// Tipos para las respuestas de servicios de transformación
export interface SkillsTransformationResponse {
  skillsCategories: Record<string, string[]>;
  totalSkills: number;
  totalCategories: number;
}

export interface ProjectsTransformationResponse {
  projects: any[];
  totalProjects: number;
  projectsByStatus: Record<string, number>;
}

export interface EducationTransformationResponse {
  education: any[];
  certifications: string[];
  totalEducation: number;
  totalCertifications: number;
  educationByYear: Record<string, number>;
}

// Tipos para las respuestas de repositorios
export interface HomeRepositoryResponse {
  hero: any;
  about: any;
  skills: any;
  experience: any;
  contact: any;
  callToAction: any;
}

export interface SkillsRepositoryResponse {
  skills: any[];
  total: number;
}

export interface SkillCategoriesRepositoryResponse {
  categories: any[];
  total: number;
}

export interface ProjectsRepositoryResponse {
  projects: any[];
  total: number;
}

export interface HomeProjectsRepositoryResponse {
  projects: any[];
  total: number;
}

export interface EducationRepositoryResponse {
  education: any[];
  total: number;
}

export interface CertificationsRepositoryResponse {
  certifications: any[];
  total: number;
}

export interface HomeEducationRepositoryResponse {
  education: any[];
  total: number;
} 