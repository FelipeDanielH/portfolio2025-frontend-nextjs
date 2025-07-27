// Tipos para Respuestas de Use Cases del dominio Home

// Respuesta principal del use case de Home
export interface HomeDataUseCaseResponse {
  hero: HomeHeroData;
  about: HomeAboutData;
  skills: HomeSkillsData;
  experience: HomeExperienceData;
  contact: HomeContactData;
  callToAction: HomeCallToActionData;
  skillsCategories: Record<string, string[]>;
  homeProjects: HomeProjectData[];
  homeEducation: HomeEducationData[];
  homeCertifications: string[];
  metadata: UseCaseMetadata;
}

// Tipos de datos específicos para Home
export interface HomeHeroData {
  _id: string;
  nombre: string;
  titulo: string;
  claim: string;
  boton_contacto: string;
  cv: string;
  email: string;
  linkedin: string;
  telefono: string;
  ubicacion: string;
}

export interface HomeAboutData {
  about: string;
}

export interface HomeSkillsData {
  skills: string[];
}

export interface HomeExperienceData {
  experience: HomeExperienceItem[];
}

export interface HomeExperienceItem {
  _id: string;
  rol: string;
  empresa?: string;
  fecha_inicio: string;
  fecha_fin?: string | null;
  descripcion: string;
}

export interface HomeContactData {
  _id: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio_url: string;
  telefono: string;
}

export interface HomeCallToActionData {
  _id: string;
  titulo: string;
  subtitulo: string;
}

// Tipos para datos transformados de Home
export interface HomeProjectData {
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

export interface HomeEducationData {
  title: string;
  institution: string;
  year: string;
  description: string;
}

// Tipos para respuestas de use cases específicos
export interface SkillsCategoriesUseCaseResponse {
  skillsCategories: Record<string, string[]>;
  totalSkills: number;
  totalCategories: number;
  metadata: UseCaseMetadata;
}

export interface FilteredSkillsUseCaseResponse {
  filteredSkills: any[];
  totalFound: number;
  totalRequested: number;
  missingSkills: string[];
  metadata: UseCaseMetadata;
}

export interface HomeProjectsUseCaseResponse {
  projects: HomeProjectData[];
  totalProjects: number;
  projectsByStatus: Record<string, number>;
  metadata: UseCaseMetadata;
}

export interface HomeEducationUseCaseResponse {
  education: HomeEducationData[];
  certifications: string[];
  totalEducation: number;
  totalCertifications: number;
  educationByYear: Record<string, number>;
  metadata: UseCaseMetadata;
}

// Tipos para metadatos de use cases
export interface UseCaseMetadata {
  executionTime: number;
  timestamp: string;
  version: string;
  cacheHit?: boolean;
  dataSources: string[];
  transformations: string[];
}

// Tipos para errores de use cases
export interface UseCaseError {
  code: 'VALIDATION_ERROR' | 'REPOSITORY_ERROR' | 'TRANSFORMATION_ERROR' | 'UNKNOWN_ERROR';
  message: string;
  details?: any;
  timestamp: string;
  useCase: string;
}

// Tipos para validación de respuestas
export interface UseCaseValidationResult {
  isValid: boolean;
  errors: UseCaseValidationError[];
  warnings: UseCaseValidationWarning[];
}

export interface UseCaseValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

export interface UseCaseValidationWarning {
  field: string;
  message: string;
  code: string;
  value?: any;
}

// Tipos para estadísticas de use cases
export interface UseCaseStats {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageExecutionTime: number;
  lastExecutionTime: string;
  executionsByType: Record<string, number>;
}

// Tipos para configuración de use cases
export interface UseCaseConfig {
  enableValidation: boolean;
  enableLogging: boolean;
  enableMetrics: boolean;
  enableCaching: boolean;
  cacheTTL: number;
  retryAttempts: number;
  timeout: number;
} 