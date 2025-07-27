// Interfaces para Repositorios del dominio Formación

// Interface principal para el repositorio de Education
export interface EducationRepositoryInterface {
  fetchEducation(): Promise<EducationItem[]>;
  fetchCertifications(): Promise<CertificationItem[]>;
  fetchHomeEducation(): Promise<EducationItem[]>;
  fetchEducationById(id: string): Promise<EducationItem | null>;
  fetchCertificationById(id: string): Promise<CertificationItem | null>;
  fetchEducationByType(type: string): Promise<EducationItem[]>;
}

// Tipos para las respuestas de repositorios
export interface EducationRepositoryResponse {
  education: EducationItem[];
  total: number;
}

export interface CertificationsRepositoryResponse {
  certifications: CertificationItem[];
  total: number;
}

export interface HomeEducationRepositoryResponse {
  education: EducationItem[];
  total: number;
}

// Tipos específicos para Education
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
  __v?: number;
}

export interface CertificationItem {
  _id: string;
  tipo: 'certificacion';
  titulo: string;
  institucion: string;
  estado: string;
  fecha_obtencion?: string;
  fecha_expiracion?: string;
  descripcion?: string;
  imagen?: string;
  url?: string;
  codigo_certificacion?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Tipos para filtros de Education
export interface EducationFilter {
  tipo?: 'formacion' | 'certificacion';
  institucion?: string;
  estado?: string;
  year?: number;
  searchTerm?: string;
  limit?: number;
  offset?: number;
}

// Tipos para estadísticas de Education
export interface EducationStats {
  totalEducation: number;
  totalCertifications: number;
  educationByType: Record<string, number>;
  educationByInstitution: Record<string, number>;
  educationByYear: Record<string, number>;
  certificationsByInstitution: Record<string, number>;
}

// Tipos para errores específicos de Education
export interface EducationRepositoryError {
  message: string;
  code: 'EDUCATION_NOT_FOUND' | 'CERTIFICATION_NOT_FOUND' | 'INVALID_TYPE' | 'API_ERROR';
  educationId?: string;
  certificationId?: string;
  tipo?: string;
  timestamp: string;
} 