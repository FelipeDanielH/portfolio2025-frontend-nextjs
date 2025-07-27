export interface HealthCheckResult {
  isReady: boolean;
  shouldRetry: boolean;
  error: string | null;
}

export class BackendHealthService {
  private readonly MAX_ATTEMPTS = 20;
  private readonly TIMEOUT_MS = 8000;
  private readonly RETRY_DELAY_MS = 3000;

  private readonly endpoints = [
    '/health',
    '/',
    '/projects',
    '/about'
  ];

  private readonly messages = [
    "El servidor está iniciando (cold start). Por favor, espere un momento.",
    "Verificando disponibilidad del servidor...",
    "El servidor está despertando. Un momento más...",
    "Conectando con el backend...",
    "Inicializando servicios..."
  ];

  async checkHealth(attempts: number): Promise<HealthCheckResult> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    if (!baseUrl) {
      return {
        isReady: false,
        shouldRetry: false,
        error: "URL del backend no configurada"
      };
    }

    if (attempts >= this.MAX_ATTEMPTS) {
      return {
        isReady: false,
        shouldRetry: false,
        error: "El servidor no está disponible en este momento. Por favor, intente más tarde."
      };
    }

    for (const endpoint of this.endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          return {
            isReady: true,
            shouldRetry: false,
            error: null
          };
        }
      } catch (err: any) {
        // Continue to next endpoint if this one fails
        continue;
      }
    }

    // Si llegamos aquí, ningún endpoint respondió
    const errorMessage = this.messages[attempts % this.messages.length] || this.messages[0];
    
    return {
      isReady: false,
      shouldRetry: true,
      error: errorMessage
    };
  }
} 