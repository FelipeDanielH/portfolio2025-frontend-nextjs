// Servicio centralizado para llamadas a API
import { handleApiError } from './ErrorHandlingService';

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  errors: string[] | null;
}

export class ApiService {
  private static instance: ApiService;
  private config: ApiConfig;

  private constructor() {
    this.config = {
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
      timeout: 10000, // 10 segundos
      headers: {
        'Content-Type': 'application/json',
      }
    };
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * Realiza una llamada GET a la API
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = this.buildUrl(endpoint);
    const config = this.buildRequestConfig('GET', options);

    try {
      const response = await this.makeRequest(url, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      handleApiError(error as Error, endpoint, 'GET', 'api');
      throw error;
    }
  }

  /**
   * Realiza una llamada POST a la API
   */
  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    const url = this.buildUrl(endpoint);
    const config = this.buildRequestConfig('POST', options, data);

    try {
      const response = await this.makeRequest(url, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      handleApiError(error as Error, endpoint, 'POST', 'api');
      throw error;
    }
  }

  /**
   * Realiza una llamada PUT a la API
   */
  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    const url = this.buildUrl(endpoint);
    const config = this.buildRequestConfig('PUT', options, data);

    try {
      const response = await this.makeRequest(url, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      handleApiError(error as Error, endpoint, 'PUT', 'api');
      throw error;
    }
  }

  /**
   * Realiza una llamada DELETE a la API
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = this.buildUrl(endpoint);
    const config = this.buildRequestConfig('DELETE', options);

    try {
      const response = await this.makeRequest(url, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      handleApiError(error as Error, endpoint, 'DELETE', 'api');
      throw error;
    }
  }

  /**
   * Construye la URL completa
   */
  private buildUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.config.baseUrl}${cleanEndpoint}`;
  }

  /**
   * Construye la configuración de la petición
   */
  private buildRequestConfig(method: string, options?: RequestInit, data?: any): RequestInit {
    const config: RequestInit = {
      method,
      headers: {
        ...this.config.headers,
        ...options?.headers,
      },
      ...options,
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(data);
    }

    return config;
  }

  /**
   * Realiza la petición con timeout
   */
  private async makeRequest(url: string, config: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Maneja la respuesta de la API
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      // Si la respuesta tiene el formato estándar { data, message, errors }
      if (data && typeof data === 'object' && 'data' in data) {
        return data.data as T;
      }
      
      // Si la respuesta es directamente los datos
      return data as T;
    }

    // Si no es JSON, retornar como texto
    return response.text() as unknown as T;
  }

  /**
   * Actualiza la configuración del servicio
   */
  updateConfig(newConfig: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Obtiene la configuración actual
   */
  getConfig(): ApiConfig {
    return { ...this.config };
  }
}

// Instancia singleton
export const apiService = ApiService.getInstance();

// Funciones helper para uso directo
export const apiGet = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  return apiService.get<T>(endpoint, options);
};

export const apiPost = <T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> => {
  return apiService.post<T>(endpoint, data, options);
};

export const apiPut = <T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> => {
  return apiService.put<T>(endpoint, data, options);
};

export const apiDelete = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  return apiService.delete<T>(endpoint, options);
}; 