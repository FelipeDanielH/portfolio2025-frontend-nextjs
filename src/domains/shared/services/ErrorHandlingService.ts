// Servicio centralizado para el manejo de errores
export interface ErrorContext {
  domain: string;
  operation: string;
  endpoint?: string;
  id?: string;
  additionalInfo?: Record<string, any>;
}

export interface ErrorLogEntry {
  timestamp: Date;
  context: ErrorContext;
  error: Error;
  message: string;
}

export class ErrorHandlingService {
  private static instance: ErrorHandlingService;
  private errorLog: ErrorLogEntry[] = [];

  private constructor() {}

  static getInstance(): ErrorHandlingService {
    if (!ErrorHandlingService.instance) {
      ErrorHandlingService.instance = new ErrorHandlingService();
    }
    return ErrorHandlingService.instance;
  }

  /**
   * Maneja errores de manera centralizada
   */
  handleError(error: Error, context: ErrorContext): void {
    const errorMessage = this.formatErrorMessage(context);
    
    // Log del error
    this.logError(error, context, errorMessage);
    
    // Console error para desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.error(errorMessage, error);
    }
    
    // Aquí se podría agregar logging a servicios externos (Sentry, etc.)
  }

  /**
   * Maneja errores de API de manera específica
   */
  handleApiError(error: Error, endpoint: string, operation: string, domain: string): void {
    this.handleError(error, {
      domain,
      operation,
      endpoint
    });
  }

  /**
   * Maneja errores de repositorio
   */
  handleRepositoryError(error: Error, operation: string, domain: string, id?: string): void {
    this.handleError(error, {
      domain,
      operation,
      id
    });
  }

  /**
   * Maneja errores de use case
   */
  handleUseCaseError(error: Error, useCaseName: string, domain: string): void {
    this.handleError(error, {
      domain,
      operation: useCaseName
    });
  }

  /**
   * Maneja errores de transformación
   */
  handleTransformationError(error: Error, transformationType: string, domain: string): void {
    this.handleError(error, {
      domain,
      operation: `transform_${transformationType}`
    });
  }

  /**
   * Formatea el mensaje de error
   */
  private formatErrorMessage(context: ErrorContext): string {
    const { domain, operation, endpoint, id } = context;
    
    let message = `Error en ${domain}: ${operation}`;
    
    if (endpoint) {
      message += ` (endpoint: ${endpoint})`;
    }
    
    if (id) {
      message += ` (id: ${id})`;
    }
    
    return message;
  }

  /**
   * Registra el error en el log interno
   */
  private logError(error: Error, context: ErrorContext, message: string): void {
    const logEntry: ErrorLogEntry = {
      timestamp: new Date(),
      context,
      error,
      message
    };
    
    this.errorLog.push(logEntry);
    
    // Mantener solo los últimos 100 errores
    if (this.errorLog.length > 100) {
      this.errorLog = this.errorLog.slice(-100);
    }
  }

  /**
   * Obtiene el log de errores (útil para debugging)
   */
  getErrorLog(): ErrorLogEntry[] {
    return [...this.errorLog];
  }

  /**
   * Limpia el log de errores
   */
  clearErrorLog(): void {
    this.errorLog = [];
  }

  /**
   * Obtiene estadísticas de errores por dominio
   */
  getErrorStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    
    this.errorLog.forEach(entry => {
      const domain = entry.context.domain;
      stats[domain] = (stats[domain] || 0) + 1;
    });
    
    return stats;
  }
}

// Funciones helper para uso directo
export const errorHandler = ErrorHandlingService.getInstance();

export const handleApiError = (error: Error, endpoint: string, operation: string, domain: string) => {
  errorHandler.handleApiError(error, endpoint, operation, domain);
};

export const handleRepositoryError = (error: Error, operation: string, domain: string, id?: string) => {
  errorHandler.handleRepositoryError(error, operation, domain, id);
};

export const handleUseCaseError = (error: Error, useCaseName: string, domain: string) => {
  errorHandler.handleUseCaseError(error, useCaseName, domain);
};

export const handleTransformationError = (error: Error, transformationType: string, domain: string) => {
  errorHandler.handleTransformationError(error, transformationType, domain);
}; 