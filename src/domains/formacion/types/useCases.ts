// Interfaces para Use Cases del dominio Formación

// Interface principal para el use case de Home Education
export interface GetHomeEducationUseCaseInterface {
  execute(): Promise<HomeEducationUseCaseResponse>;
}

// Interface para el servicio de transformación de Education
export interface EducationTransformationServiceInterface {
  transformEducationToLegacyFormat(educationData: any[]): {
    education: any[];
    certifications: string[];
  };
}

// Tipos para las respuestas de use cases
export interface HomeEducationUseCaseResponse {
  education: any[];
  certifications: string[];
  totalEducation: number;
  totalCertifications: number;
  educationByYear: Record<string, number>;
}

// Tipos para las respuestas de servicios
export interface EducationTransformationResponse {
  education: any[];
  certifications: string[];
  totalEducation: number;
  totalCertifications: number;
  educationByYear: Record<string, number>;
}

// Tipos específicos para educación
export interface LegacyEducation {
  title: string;
  institution: string;
  year: string;
  description: string;
}

export interface EducationStats {
  totalEducation: number;
  totalCertifications: number;
  educationByYear: Record<string, number>;
  educationByType: Record<string, number>;
  educationByInstitution: Record<string, number>;
}

// Tipos para datos de educación
export interface EducationItem {
  _id: string;
  tipo: 'formacion' | 'certificacion';
  titulo: string;
  institucion: string;
  estado: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  descripcion?: string;
  imagen?: string;
  url?: string;
  createdAt?: string;
  updatedAt?: string;
} 