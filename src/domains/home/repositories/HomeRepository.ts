import * as homeService from "@/domains/home/services/homeService";

// Interfaces para el repositorio
export interface HomeRepository {
  getAllHomeData(): Promise<any>;
  getHomeHero(): Promise<any>;
  getHomeAbout(): Promise<any>;
  getHomeSkills(): Promise<any>;
  getHomeExperience(): Promise<any>;
  getHomeContact(): Promise<any>;
  getHomeCallToAction(): Promise<any>;
}

// Tipos para las respuestas del repositorio
export interface HomeDataResponse {
  hero: any;
  about: any;
  skills: any;
  experience: any;
  contact: any;
  callToAction: any;
}

// Implementación del repositorio
export class HomeRepositoryImpl implements HomeRepository {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://portfolio2025-backend-nodejs.onrender.com';
  }

  async getAllHomeData(): Promise<HomeDataResponse> {
    try {
      // Obtener todos los datos de home en paralelo
      const [
        hero,
        about,
        skills,
        experience,
        contact,
        callToAction
      ] = await Promise.all([
        this.getHomeHero(),
        this.getHomeAbout(),
        this.getHomeSkills(),
        this.getHomeExperience(),
        this.getHomeContact(),
        this.getHomeCallToAction()
      ]);

      return {
        hero,
        about,
        skills,
        experience,
        contact,
        callToAction
      };
    } catch (error) {
      console.error('Error al obtener todos los datos de Home:', error);
      throw new Error('Error al obtener datos completos de Home');
    }
  }

  async getHomeHero(): Promise<any> {
    try {
      return await homeService.getHomeHero();
    } catch (error) {
      console.error('Error al obtener hero de Home:', error);
      // Retornar datos por defecto
      return {
        title: "Desarrollador Full Stack",
        subtitle: "Apasionado por crear soluciones digitales innovadoras",
        description: "Especializado en React, Node.js y tecnologías modernas"
      };
    }
  }

  async getHomeAbout(): Promise<any> {
    try {
      return await homeService.getHomeAbout();
    } catch (error) {
      console.error('Error al obtener about de Home:', error);
      return {
        title: "Sobre Mí",
        description: "Desarrollador con experiencia en tecnologías modernas",
        image: "/placeholder-user.jpg"
      };
    }
  }

  async getHomeSkills(): Promise<any> {
    try {
      return await homeService.getHomeSkills();
    } catch (error) {
      console.error('Error al obtener skills de Home:', error);
      return {
        skills: []
      };
    }
  }

  async getHomeExperience(): Promise<any> {
    try {
      return await homeService.getHomeExperience();
    } catch (error) {
      console.error('Error al obtener experience de Home:', error);
      return {
        experience: []
      };
    }
  }

  async getHomeContact(): Promise<any> {
    try {
      return await homeService.getHomeContact();
    } catch (error) {
      console.error('Error al obtener contact de Home:', error);
      return {
        email: "contact@example.com",
        phone: "+1234567890",
        location: "Ciudad, País"
      };
    }
  }

  async getHomeCallToAction(): Promise<any> {
    try {
      return await homeService.getHomeCallToAction();
    } catch (error) {
      console.error('Error al obtener call to action de Home:', error);
      return {
        title: "¿Tienes un proyecto en mente?",
        description: "Hablemos sobre cómo puedo ayudarte",
        buttonText: "Contactar",
        buttonUrl: "/contact"
      };
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
}

// Factory para crear el repositorio
export function createHomeRepository(): HomeRepository {
  return new HomeRepositoryImpl();
} 