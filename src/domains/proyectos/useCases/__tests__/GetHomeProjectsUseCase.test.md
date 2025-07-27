# Tests para GetHomeProjectsUseCase

## Descripción
Este documento describe los tests que deben implementarse para el `GetHomeProjectsUseCase` una vez que se configure el framework de testing.

## Tests Requeridos

### 1. Test de Ejecución Exitosa
**Descripción:** Verifica que el use case obtiene y transforma proyectos correctamente.

**Casos de prueba:**
- Llama a `ProjectsRepository.fetchHomeProjects()`
- Transforma proyectos al formato legacy correctamente
- Calcula estadísticas correctas
- Retorna la estructura esperada

**Mocks necesarios:**
- `ProjectsRepository.fetchHomeProjects()`
- `ProjectsTransformationService.transformProjectsToLegacyFormat()`

### 2. Test de Transformación de Proyectos
**Descripción:** Verifica que los proyectos se transforman correctamente al formato legacy.

**Casos de prueba:**
- Campos se mapean correctamente (nombre -> name, descripcion -> description)
- Tecnologías se transforman correctamente
- Links se transforman al formato esperado
- Valores por defecto se aplican correctamente

### 3. Test de Manejo de Errores
**Descripción:** Verifica que el use case maneja errores correctamente.

**Casos de prueba:**
- Error en `ProjectsRepository.fetchHomeProjects()`
- Error en `ProjectsTransformationService.transformProjectsToLegacyFormat()`

**Comportamiento esperado:**
- Captura errores de repositorios
- Lanza un error descriptivo
- No expone detalles internos del error

### 4. Test de Proyectos Vacíos
**Descripción:** Verifica el comportamiento cuando no hay proyectos disponibles.

**Casos de prueba:**
- `fetchHomeProjects()` retorna array vacío
- Retorna array vacío de proyectos transformados
- Estadísticas muestran 0 proyectos

### 5. Test de Cálculo de Estadísticas
**Descripción:** Verifica que las estadísticas se calculan correctamente.

**Casos de prueba:**
- `totalProjects` se calcula correctamente
- `projectsByStatus` agrupa proyectos por estado
- Maneja proyectos sin estado (usa 'sin-estado' como fallback)

### 6. Test de Mapeo de Links
**Descripción:** Verifica que los links se mapean correctamente.

**Casos de prueba:**
- Links conocidos se mapean correctamente (demo, frontend, backend, github)
- Links desconocidos se mapean usando la clave como label
- URLs se preservan correctamente

## Configuración de Testing

Para implementar estos tests, se requiere:

1. **Framework de testing:** Vitest o Jest
2. **Mocks:** Para repositorios y servicios
3. **Tipos:** Para datos de prueba
4. **Configuración:** Para ejecutar tests en el entorno

## Ejemplo de Implementación

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetHomeProjectsUseCase } from '../GetHomeProjectsUseCase';

describe('GetHomeProjectsUseCase', () => {
  let useCase: GetHomeProjectsUseCase;
  let mockProjectsRepository: ProjectsRepository;
  let mockTransformationService: ProjectsTransformationService;

  beforeEach(() => {
    // Configurar mocks
    useCase = new GetHomeProjectsUseCase(
      mockProjectsRepository,
      mockTransformationService
    );
  });

  describe('execute', () => {
    it('debería obtener y transformar proyectos correctamente', async () => {
      // Arrange
      // Act
      // Assert
    });

    it('debería calcular estadísticas correctamente', async () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Datos de Prueba

### Proyectos de Prueba
```typescript
const mockProjects = [
  {
    _id: 'project1',
    nombre: 'Portfolio App',
    descripcion: 'Aplicación de portfolio personal',
    tecnologias: ['React', 'TypeScript', 'Tailwind'],
    estado: 'completado',
    año: 2024,
    imagen: '/images/portfolio.jpg',
    links: {
      demo: 'https://demo.com',
      github: 'https://github.com/user/portfolio',
      frontend: 'https://frontend.com'
    }
  },
  {
    _id: 'project2',
    nombre: 'E-commerce API',
    descripcion: 'API REST para e-commerce',
    tecnologias: ['Node.js', 'Express', 'MongoDB'],
    estado: 'en-desarrollo',
    año: 2024,
    imagen: '/images/api.jpg',
    links: {
      backend: 'https://api.com',
      github: 'https://github.com/user/api'
    }
  }
];
```

### Resultado Esperado
```typescript
const expectedResult = {
  projects: [
    {
      name: 'Portfolio App',
      description: 'Aplicación de portfolio personal',
      tech: ['React', 'TypeScript', 'Tailwind'],
      status: 'completado',
      year: 2024,
      image: '/images/portfolio.jpg',
      links: [
        { label: 'Demo', url: 'https://demo.com' },
        { label: 'GitHub', url: 'https://github.com/user/portfolio' },
        { label: 'Frontend', url: 'https://frontend.com' }
      ]
    },
    {
      name: 'E-commerce API',
      description: 'API REST para e-commerce',
      tech: ['Node.js', 'Express', 'MongoDB'],
      status: 'en-desarrollo',
      year: 2024,
      image: '/images/api.jpg',
      links: [
        { label: 'Backend', url: 'https://api.com' },
        { label: 'GitHub', url: 'https://github.com/user/api' }
      ]
    }
  ],
  totalProjects: 2,
  projectsByStatus: {
    'completado': 1,
    'en-desarrollo': 1
  }
};
```

## Casos Edge

### Proyecto sin Estado
```typescript
const projectWithoutStatus = {
  nombre: 'Test Project',
  descripcion: 'Test description',
  tecnologias: ['Test'],
  año: 2024,
  imagen: '/test.jpg',
  links: {}
};

// Debería transformarse a:
{
  name: 'Test Project',
  description: 'Test description',
  tech: ['Test'],
  status: 'sin-estado', // Fallback
  year: 2024,
  image: '/test.jpg',
  links: []
}
```

### Proyecto sin Links
```typescript
const projectWithoutLinks = {
  nombre: 'Test Project',
  descripcion: 'Test description',
  tecnologias: ['Test'],
  estado: 'completado',
  año: 2024,
  imagen: '/test.jpg'
  // Sin links
};

// Debería transformarse a:
{
  name: 'Test Project',
  description: 'Test description',
  tech: ['Test'],
  status: 'completado',
  year: 2024,
  image: '/test.jpg',
  links: [] // Array vacío
}
``` 