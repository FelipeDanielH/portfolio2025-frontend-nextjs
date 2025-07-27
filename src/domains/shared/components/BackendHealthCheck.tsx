"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { BackendHealthService } from "@/domains/shared/services/BackendHealthService";

interface BackendHealthCheckProps {
  children: React.ReactNode;
}

export function BackendHealthCheck({ children }: BackendHealthCheckProps) {
  const [healthState, setHealthState] = useState({
    isBackendReady: false,
    isChecking: true,
    error: null as string | null,
    attempts: 0,
    isExiting: false,
    showContent: false
  });

  const healthService = new BackendHealthService();
  const hasStartedAnimation = useRef(false);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  // Función para iniciar la animación de salida
  const startExitAnimation = () => {
    if (hasStartedAnimation.current) return;
    
    hasStartedAnimation.current = true;
    
    setHealthState(prev => ({
      ...prev,
      isBackendReady: true,
      isExiting: true
    }));

    // Mostrar contenido después de que termine la animación
    animationTimeout.current = setTimeout(() => {
      setHealthState(prev => ({
        ...prev,
        showContent: true,
        isChecking: false
      }));
    }, 600);
  };

  // Efecto principal para manejar la carga de página y health check
  useEffect(() => {
    let healthCheckTimeout: NodeJS.Timeout;
    let pageLoadTimeout: NodeJS.Timeout;

    const performHealthCheck = async () => {
      if (hasStartedAnimation.current) return;

      try {
        const result = await healthService.checkHealth(healthState.attempts);
        
        if (result.isReady && !hasStartedAnimation.current) {
          startExitAnimation();
          return;
        }

        if (result.shouldRetry) {
          setHealthState(prev => ({
            ...prev,
            error: result.error,
            attempts: prev.attempts + 1
          }));

          healthCheckTimeout = setTimeout(() => {
            setHealthState(prev => ({
              ...prev,
              isChecking: true,
              error: null
            }));
            performHealthCheck();
          }, 3000);
        } else {
          setHealthState(prev => ({
            ...prev,
            error: result.error,
            isChecking: false
          }));
        }
      } catch (error) {
        console.error('Error en health check:', error);
      }
    };

    // Función para manejar la carga de página
    const handlePageLoad = () => {
      if (!hasStartedAnimation.current) {
        startExitAnimation();
      }
    };

    // Verificar si la página ya está cargada
    if (document.readyState === 'complete') {
      // Si la página ya está cargada, dar un pequeño delay y luego iniciar animación
      pageLoadTimeout = setTimeout(() => {
        if (!hasStartedAnimation.current) {
          startExitAnimation();
        }
      }, 1000);
    } else {
      // Si la página no está cargada, esperar al evento load
      window.addEventListener('load', handlePageLoad);
    }

    // Iniciar health check después de un delay inicial
    const initialHealthCheck = setTimeout(() => {
      if (!hasStartedAnimation.current) {
        performHealthCheck();
      }
    }, 500);

    // Timeout de seguridad
    const safetyTimeout = setTimeout(() => {
      if (!hasStartedAnimation.current) {
        startExitAnimation();
      }
    }, 5000);

    return () => {
      window.removeEventListener('load', handlePageLoad);
      if (healthCheckTimeout) clearTimeout(healthCheckTimeout);
      if (pageLoadTimeout) clearTimeout(pageLoadTimeout);
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
      clearTimeout(initialHealthCheck);
      clearTimeout(safetyTimeout);
    };
  }, [healthState.attempts]);

  return (
    <>
      {/* Overlay de carga - siempre visible hasta que termine la animación */}
      {!healthState.showContent && (
        <div 
          className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center"
          style={{ 
            transform: healthState.isExiting ? 'translateY(-100%)' : 'translateY(0)',
            opacity: healthState.isExiting ? '0' : '1',
            transition: 'all 0.6s ease-in'
          }}
        >
          <div className="text-center text-white px-6 max-w-2xl mx-auto">
            {/* Logo/Icono */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                </div>
              </div>
            </div>

            {/* Título */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Felipe Henríquez
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8">
              Full Stack Developer
            </p>

            {/* Estado del backend */}
            <div className="mb-8">
              {healthState.isChecking ? (
                <div className="flex items-center justify-center gap-3 text-blue-200">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verificando disponibilidad del servidor...</span>
                </div>
              ) : healthState.error ? (
                <div className="flex items-center justify-center gap-3 text-yellow-300">
                  <AlertCircle className="w-5 h-5" />
                  <span>{healthState.error}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 text-green-300">
                  <CheckCircle className="w-5 h-5" />
                  <span>¡Servidor listo!</span>
                </div>
              )}
            </div>

            {/* Contador de intentos */}
            {healthState.attempts > 1 && healthState.attempts < 20 && (
              <div className="mb-6 text-sm text-blue-300 opacity-70">
                <p>Intento {healthState.attempts} de 20</p>
              </div>
            )}

            {/* Mensaje explicativo */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
              <p className="text-lg text-blue-100 mb-4">
                Debido a que esta página depende de un backend alojado en Render con capa gratuita, 
                es necesario arrancar el servidor antes de poder visualizar el contenido completo.
              </p>
              <p className="text-blue-200">
                Le pido paciencia por favor. Mientras tanto, puede revisar mi actividad profesional:
              </p>
            </div>

            {/* Botón de LinkedIn */}
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              asChild
            >
              <a 
                href="https://www.linkedin.com/in/felipe-henriquez/recent-activity/all/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Ver mi actividad en LinkedIn
              </a>
            </Button>

            {/* Información adicional */}
            <div className="mt-8 text-sm text-blue-300 opacity-80">
              <p>Esta verificación se realiza automáticamente cada 3 segundos</p>
              <p>El servidor estará disponible en unos momentos</p>
            </div>
          </div>
        </div>
      )}

      {/* Contenido real */}
      {healthState.showContent && (
        <div className="animate-slide-up">
          {children}
        </div>
      )}
    </>
  );
} 