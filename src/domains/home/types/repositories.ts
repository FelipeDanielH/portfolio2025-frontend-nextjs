// Interfaces para Repositorios del dominio Home

// Interface principal para el repositorio de Home
export interface HomeRepositoryInterface {
  getAllHomeData(): Promise<HomeRepositoryResponse>;
  getHomeHero(): Promise<HomeHeroResponse>;
  getHomeAbout(): Promise<HomeAboutResponse>;
  getHomeSkills(): Promise<HomeSkillsResponse>;
  getHomeExperience(): Promise<HomeExperienceResponse>;
  getHomeContact(): Promise<HomeContactResponse>;
  getHomeCallToAction(): Promise<HomeCallToActionResponse>;
}

// Tipos para las respuestas de repositorios
export interface HomeRepositoryResponse {
  hero: HomeHeroResponse;
  about: HomeAboutResponse;
  skills: HomeSkillsResponse;
  experience: HomeExperienceResponse;
  contact: HomeContactResponse;
  callToAction: HomeCallToActionResponse;
}

export interface HomeHeroResponse {
  _id: string;
  __v: number;
  nombre: string;
  titulo: string;
  claim: string;
  boton_contacto: string;
  cv: string;
  email: string;
  linkedin: string;
  telefono: string;
  ubicacion: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomeAboutResponse {
  about: string;
}

export interface HomeSkillsResponse {
  skills: string[];
}

export interface HomeExperienceResponse {
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

export interface HomeContactResponse {
  _id: string;
  __v: number;
  email: string;
  linkedin: string;
  github: string;
  portfolio_url: string;
  telefono: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomeCallToActionResponse {
  _id: string;
  __v: number;
  titulo: string;
  subtitulo: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos para errores de repositorio
export interface RepositoryError {
  message: string;
  code: string;
  endpoint: string;
  timestamp: string;
}

// Tipos para configuración de repositorio
export interface RepositoryConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  cacheTime: number;
}

// Tipos para validación de datos
export interface DataValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Tipos para métricas de repositorio
export interface RepositoryMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  lastRequestTime: string;
} 