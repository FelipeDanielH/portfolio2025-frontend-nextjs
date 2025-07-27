// Interfaces para el repositorio
export interface EducationRepository {
  fetchEducation(): Promise<any[]>;
  fetchCertifications(): Promise<any[]>;
  fetchHomeEducation(): Promise<any[]>;
  fetchEducationById(id: string): Promise<any | null>;
  fetchCertificationById(id: string): Promise<any | null>;
  fetchEducationByType(type: string): Promise<any[]>;
}

// Tipos para las respuestas del repositorio
export interface EducationResponse {
  education: any[];
  total: number;
}

export interface CertificationsResponse {
  certifications: any[];
  total: number;
}

export interface HomeEducationResponse {
  education: any[];
  total: number;
}

// Implementación del repositorio
export class EducationRepositoryImpl implements EducationRepository {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://portfolio2025-backend-nodejs.onrender.com';
  }

  async fetchEducation(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/education`, {
        next: { revalidate: 3600 } // Cache por 1 hora
      });

      if (!response.ok) {
        console.warn('API /education no responde correctamente:', response.status);
        return [];
      }

      const data = await response.json();
      
      // Manejar diferentes formatos de respuesta
      if (Array.isArray(data)) {
        return data;
      }
      
      if (data && Array.isArray(data.data)) {
        return data.data;
      }
      
      if (data && data.education && Array.isArray(data.education)) {
        return data.education;
      }

      console.warn('API /education retorna formato inesperado:', data);
      return [];
    } catch (error) {
      console.error('Error al obtener educación:', error);
      return [];
    }
  }

  async fetchCertifications(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/certifications`, {
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        console.warn('API /certifications no responde correctamente:', response.status);
        return [];
      }

      const data = await response.json();
      
      // Manejar diferentes formatos de respuesta
      if (Array.isArray(data)) {
        return data;
      }
      
      if (data && Array.isArray(data.data)) {
        return data.data;
      }
      
      if (data && data.certifications && Array.isArray(data.certifications)) {
        return data.certifications;
      }

      console.warn('API /certifications retorna formato inesperado:', data);
      return [];
    } catch (error) {
      console.error('Error al obtener certificaciones:', error);
      return [];
    }
  }

  async fetchHomeEducation(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/home/education`, {
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        console.warn('API /home/education no responde correctamente:', response.status);
        return [];
      }

      const data = await response.json();
      
      // Manejar diferentes formatos de respuesta
      if (Array.isArray(data)) {
        return data;
      }
      
      if (data && Array.isArray(data.data)) {
        return data.data;
      }
      
      if (data && data.education && Array.isArray(data.education)) {
        return data.education;
      }

      console.warn('API /home/education retorna formato inesperado:', data);
      return [];
    } catch (error) {
      console.error('Error al obtener educación destacada:', error);
      return [];
    }
  }

  async fetchEducationById(id: string): Promise<any | null> {
    try {
      const response = await fetch(`${this.baseUrl}/education/${id}`, {
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        console.warn(`API /education/${id} no responde correctamente:`, response.status);
        return null;
      }

      const data = await response.json();
      
      if (!data || !data._id) {
        console.warn(`API /education/${id} retorna datos vacíos`);
        return null;
      }

      return data;
    } catch (error) {
      console.error(`Error al obtener educación ${id}:`, error);
      return null;
    }
  }

  async fetchCertificationById(id: string): Promise<any | null> {
    try {
      const response = await fetch(`${this.baseUrl}/certifications/${id}`, {
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        console.warn(`API /certifications/${id} no responde correctamente:`, response.status);
        return null;
      }

      const data = await response.json();
      
      if (!data || !data._id) {
        console.warn(`API /certifications/${id} retorna datos vacíos`);
        return null;
      }

      return data;
    } catch (error) {
      console.error(`Error al obtener certificación ${id}:`, error);
      return null;
    }
  }

  async fetchEducationByType(type: string): Promise<any[]> {
    try {
      const allEducation = await this.fetchEducation();
      
      if (!allEducation || allEducation.length === 0) {
        return [];
      }

      // Filtrar educación por tipo
      const filteredEducation = allEducation.filter(edu => 
        edu.tipo?.toLowerCase() === type.toLowerCase()
      );

      return filteredEducation;
    } catch (error) {
      console.error(`Error al obtener educación por tipo ${type}:`, error);
      return [];
    }
  }

  // Método utilitario para validar respuestas de API
  private validateApiResponse(response: any, endpoint: string): boolean {
    if (!response) {
      console.warn(`Respuesta vacía del endpoint ${endpoint}`);
      return false;
    }
    return true;
  }

  // Método utilitario para manejar errores de red
  private handleNetworkError(error: any, endpoint: string): never {
    console.error(`Error de red en ${endpoint}:`, error);
    throw new Error(`Error de conexión al obtener datos de ${endpoint}`);
  }

  // Método utilitario para normalizar datos de educación
  private normalizeEducationData(education: any): any {
    return {
      _id: education._id || '',
      tipo: education.tipo || 'formacion',
      titulo: education.titulo || education.title || '',
      institucion: education.institucion || education.institution || '',
      estado: education.estado || education.status || 'completado',
      fecha_inicio: education.fecha_inicio || education.start_date || '',
      fecha_fin: education.fecha_fin || education.end_date || '',
      descripcion: education.descripcion || education.description || '',
      imagen: education.imagen || education.image || '',
      url: education.url || '',
      createdAt: education.createdAt || new Date().toISOString(),
      updatedAt: education.updatedAt || new Date().toISOString()
    };
  }
}

// Factory para crear el repositorio
export function createEducationRepository(): EducationRepository {
  return new EducationRepositoryImpl();
} 