import type { Education } from "../types";

// Tipos para el formato legacy (simplificado para Home)
export interface LegacyEducation {
  title: string;
  institution: string;
  year: string;
  description: string;
}

export interface LegacyCertification {
  title: string;
  institution: string;
}

// Interfaces para las dependencias
export interface EducationRepository {
  fetchHomeEducation(): Promise<any[]>;
}

export interface EducationTransformationService {
  transformEducationToLegacyFormat(educationData: any[]): {
    education: LegacyEducation[];
    certifications: string[];
  };
}

// Tipos para la respuesta del use case
export interface HomeEducationUseCaseResponse {
  education: LegacyEducation[];
  certifications: string[];
  totalEducation: number;
  totalCertifications: number;
  educationByYear: Record<string, number>;
}

// Use Case para obtener educación y certificaciones destacadas de Home
export class GetHomeEducationUseCase {
  constructor(
    private educationRepository: EducationRepository,
    private transformationService: EducationTransformationService
  ) {}

  async execute(): Promise<HomeEducationUseCaseResponse> {
    try {
      // 1. Obtener datos de educación destacada
      const educationData = await this.educationRepository.fetchHomeEducation();

      // 2. Transformar datos al formato legacy
      const { education, certifications } = this.transformationService.transformEducationToLegacyFormat(educationData);

      // 3. Calcular estadísticas
      const totalEducation = education.length;
      const totalCertifications = certifications.length;
      
      // Agrupar educación por año
      const educationByYear = education.reduce((acc, edu) => {
        const year = edu.year;
        acc[year] = (acc[year] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        education,
        certifications,
        totalEducation,
        totalCertifications,
        educationByYear
      };

    } catch (error) {
      console.error('Error en GetHomeEducationUseCase:', error);
      throw new Error('Error al obtener educación y certificaciones destacadas');
    }
  }
}

// Factory para crear el use case con implementaciones concretas
export function createGetHomeEducationUseCase(): GetHomeEducationUseCase {
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

  const transformationService: EducationTransformationService = {
    transformEducationToLegacyFormat: (educationData: any[]): {
      education: LegacyEducation[];
      certifications: string[];
    } => {
      const education: LegacyEducation[] = [];
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

  return new GetHomeEducationUseCase(educationRepository, transformationService);
} 