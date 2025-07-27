// Tipos para Transformaciones de Datos del dominio Home

// Tipos para datos transformados de Skills
export interface TransformedSkillsCategories {
  [category: string]: string[];
}

// Tipos para datos transformados de Projects
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

// Tipos para datos transformados de Education
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

// Tipos para respuestas de transformación
export interface SkillsTransformationResult {
  skillsCategories: TransformedSkillsCategories;
  totalSkills: number;
  totalCategories: number;
  transformationTime: number;
}

export interface ProjectsTransformationResult {
  projects: TransformedProject[];
  totalProjects: number;
  projectsByStatus: Record<string, number>;
  transformationTime: number;
}

export interface EducationTransformationResult {
  education: TransformedEducation[];
  certifications: string[];
  totalEducation: number;
  totalCertifications: number;
  educationByYear: Record<string, number>;
  transformationTime: number;
}

// Tipos para validación de transformación
export interface TransformationValidation {
  isValid: boolean;
  errors: TransformationErrorBase[];
  warnings: TransformationWarning[];
}

export interface TransformationErrorBase {
  code: string;
  message: string;
  field?: string;
  value?: any;
}

export interface TransformationWarning {
  code: string;
  message: string;
  field?: string;
  value?: any;
}

// Tipos para configuración de transformación
export interface TransformationConfig {
  enableValidation: boolean;
  enableLogging: boolean;
  enableMetrics: boolean;
  defaultValues: Record<string, any>;
}

// Tipos para métricas de transformación
export interface TransformationMetrics {
  totalTransformations: number;
  successfulTransformations: number;
  failedTransformations: number;
  averageTransformationTime: number;
  lastTransformationTime: string;
  transformationsByType: Record<string, number>;
}

// Tipos para mapeo de campos
export interface FieldMapping {
  sourceField: string;
  targetField: string;
  transformation?: (value: any) => any;
  defaultValue?: any;
  required?: boolean;
}

// Tipos para reglas de transformación
export interface TransformationRule {
  name: string;
  condition: (data: any) => boolean;
  transformation: (data: any) => any;
  priority: number;
}

// Tipos para caché de transformación
export interface TransformationCache {
  key: string;
  data: any;
  timestamp: number;
  ttl: number;
}

// Tipos para errores de transformación
export interface TransformationError {
  code: 'INVALID_DATA' | 'MISSING_FIELD' | 'TYPE_MISMATCH' | 'TRANSFORMATION_FAILED';
  message: string;
  field?: string;
  value?: any;
  expectedType?: string;
  actualType?: string;
} 