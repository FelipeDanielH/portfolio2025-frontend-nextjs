# Tests de Integración para Dominio Home

## Descripción
Este documento describe los tests de integración que deben implementarse para el dominio Home una vez que se configure el framework de testing.

## Tests Requeridos

### 1. Test de Integración Completa

#### 1.1 Flujo Completo de Home
**Descripción:** Verifica que todo el flujo de obtención de datos de home funciona correctamente.

**Casos de prueba:**
- Use case llama a repositorios correctamente
- Repositorios obtienen datos de API correctamente
- Servicios de transformación procesan datos correctamente
- Resultado final tiene la estructura esperada

**Componentes involucrados:**
- `GetHomeDataUseCase`
- `HomeRepository`
- `SkillsRepository`
- `ProjectsRepository`
- `EducationRepository`
- `HomeDataTransformationService`

#### 1.2 Integración con API Real
**Descripción:** Verifica la integración con la API real (en entorno de testing).

**Casos de prueba:**
- API responde correctamente
- Datos se transforman correctamente
- Errores se manejan apropiadamente
- Performance es aceptable

### 2. Test de Integración por Capas

#### 2.1 Use Case + Repositorios
**Descripción:** Verifica la integración entre use cases y repositorios.

**Casos de prueba:**
- Use case orquesta repositorios correctamente
- Datos fluyen correctamente entre capas
- Errores se propagan correctamente
- Fallbacks funcionan correctamente

#### 2.2 Use Case + Servicios de Transformación
**Descripción:** Verifica la integración entre use cases y servicios de transformación.

**Casos de prueba:**
- Datos se transforman correctamente
- Transformaciones se aplican en el orden correcto
- Resultados son consistentes
- Performance es aceptable

#### 2.3 Repositorios + API
**Descripción:** Verifica la integración entre repositorios y API.

**Casos de prueba:**
- Llamadas a API son correctas
- Respuestas se procesan correctamente
- Errores se manejan apropiadamente
- Caché funciona correctamente

### 3. Test de Escenarios de Error

#### 3.1 API No Disponible
**Descripción:** Verifica el comportamiento cuando la API no está disponible.

**Casos de prueba:**
- Sistema usa datos por defecto
- Errores se manejan gracefulmente
- UI no se rompe
- Usuario recibe feedback apropiado

#### 3.2 API Lenta
**Descripción:** Verifica el comportamiento cuando la API responde lentamente.

**Casos de prueba:**
- Timeouts se manejan correctamente
- Loading states funcionan
- Retry logic funciona
- Performance es aceptable

#### 3.3 Datos Inconsistentes
**Descripción:** Verifica el comportamiento con datos inconsistentes de la API.

**Casos de prueba:**
- Datos malformados se manejan
- Validaciones funcionan
- Fallbacks se aplican
- Sistema no se rompe

### 4. Test de Performance

#### 4.1 Tiempo de Respuesta
**Descripción:** Verifica que los tiempos de respuesta son aceptables.

**Casos de prueba:**
- Tiempo total < 2 segundos
- Tiempo por endpoint < 500ms
- Transformaciones < 100ms
- Caché mejora performance

#### 4.2 Uso de Memoria
**Descripción:** Verifica que el uso de memoria es eficiente.

**Casos de prueba:**
- No hay memory leaks
- Uso de memoria es estable
- Limpieza de referencias funciona
- Garbage collection funciona

#### 4.3 Llamadas Concurrentes
**Descripción:** Verifica el comportamiento con múltiples llamadas simultáneas.

**Casos de prueba:**
- No hay race conditions
- Caché funciona correctamente
- Performance no se degrada
- Errores se manejan correctamente

### 5. Test de Componentes + Use Cases

#### 5.1 Home Page + GetHomeDataUseCase
**Descripción:** Verifica la integración entre la página home y el use case.

**Casos de prueba:**
- Página obtiene datos correctamente
- Datos se renderizan correctamente
- Loading states funcionan
- Error states funcionan

#### 5.2 Componentes Individuales + Use Cases
**Descripción:** Verifica la integración entre componentes específicos y sus use cases.

**Casos de prueba:**
- `HabilidadesTecnicasHomeSection` + `GetSkillsCategoriesUseCase`
- `ProyectosHomeSection` + `GetHomeProjectsUseCase`
- `FormacionHomeSection` + `GetHomeEducationUseCase`

### 6. Test de Configuración

#### 6.1 Variables de Entorno
**Descripción:** Verifica que las variables de entorno se usan correctamente.

**Casos de prueba:**
- URLs de API se configuran correctamente
- Timeouts se configuran correctamente
- Headers se configuran correctamente
- Fallbacks se configuran correctamente

#### 6.2 Configuración de Caché
**Descripción:** Verifica que la configuración de caché funciona correctamente.

**Casos de prueba:**
- TTL se configura correctamente
- Limpieza de caché funciona
- Caché por dominio funciona
- Invalidación de caché funciona

## Configuración de Testing

Para implementar estos tests, se requiere:

1. **Framework de testing:** Vitest o Jest
2. **Servidor de testing:** Para API mock
3. **Mocks:** Para componentes externos
4. **Configuración:** Para entorno de testing

## Ejemplo de Implementación

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetHomeDataUseCase } from '../useCases/GetHomeDataUseCase';
import { HomeRepository } from '../repositories/HomeRepository';
import { HomeDataTransformationService } from '../services/HomeDataTransformationService';

describe('Home Integration Tests', () => {
  let useCase: GetHomeDataUseCase;
  let homeRepository: HomeRepository;
  let transformationService: HomeDataTransformationService;

  beforeEach(() => {
    // Configurar componentes reales
    homeRepository = new HomeRepository();
    transformationService = new HomeDataTransformationService();
    useCase = new GetHomeDataUseCase(
      homeRepository,
      // ... otros repositorios
      transformationService
    );
  });

  describe('Flujo Completo', () => {
    it('debería obtener y transformar datos correctamente', async () => {
      // Arrange
      // Configurar mocks de API si es necesario

      // Act
      const result = await useCase.execute();

      // Assert
      expect(result).toHaveProperty('hero');
      expect(result).toHaveProperty('about');
      expect(result).toHaveProperty('skills');
      expect(result).toHaveProperty('experience');
      expect(result).toHaveProperty('skillsCategories');
      expect(result).toHaveProperty('homeProjects');
      expect(result).toHaveProperty('homeEducation');
      expect(result).toHaveProperty('homeCertifications');
    });
  });

  describe('Manejo de Errores', () => {
    it('debería manejar errores de API gracefulmente', async () => {
      // Arrange
      // Mock API para que falle

      // Act & Assert
      await expect(useCase.execute()).rejects.toThrow();
    });
  });
});
```

## Datos de Prueba de Integración

### Configuración de API Mock
```typescript
const mockApiConfig = {
  baseUrl: 'http://localhost:3001/api',
  timeout: 5000,
  retries: 3,
  endpoints: {
    home: {
      hero: '/home/hero',
      about: '/home/about',
      skills: '/home/skills',
      experience: '/home/experience',
      contact: '/home/contact',
      callToAction: '/home/call-to-action'
    },
    skills: {
      all: '/skills',
      categories: '/skills/categories'
    },
    projects: {
      home: '/home/projects'
    },
    education: {
      home: '/home/education'
    }
  }
};
```

### Datos de Respuesta Completa
```typescript
const completeHomeData = {
  hero: {
    _id: 'hero1',
    nombre: 'Test User',
    titulo: 'Full Stack Developer',
    claim: 'Desarrollando soluciones innovadoras',
    boton_contacto: 'Contáctame',
    cv: '/cv.pdf',
    email: 'test@example.com',
    linkedin: 'https://linkedin.com/in/testuser',
    telefono: '+1234567890',
    ubicacion: 'Buenos Aires, Argentina'
  },
  about: {
    about: 'Soy un desarrollador apasionado por crear soluciones innovadoras...'
  },
  skills: {
    skills: ['skill1', 'skill2', 'skill3']
  },
  experience: {
    experience: [
      {
        _id: 'exp1',
        rol: 'Full Stack Developer',
        empresa: 'Tech Corp',
        fecha_inicio: '2022-01-01',
        fecha_fin: null,
        descripcion: 'Desarrollo de aplicaciones web'
      }
    ]
  },
  contact: {
    _id: 'contact1',
    email: 'test@example.com',
    linkedin: 'https://linkedin.com/in/testuser',
    github: 'https://github.com/testuser',
    portfolio_url: 'https://testuser.dev',
    telefono: '+1234567890'
  },
  callToAction: {
    _id: 'cta1',
    titulo: '¿Tienes un proyecto en mente?',
    subtitulo: '¡Hablemos sobre cómo puedo ayudarte!'
  },
  skillsCategories: {
    'Frontend': ['React', 'Vue', 'Angular'],
    'Backend': ['Node.js', 'Express', 'MongoDB']
  },
  homeProjects: [
    {
      name: 'Portfolio App',
      description: 'Aplicación de portfolio personal',
      tech: ['React', 'TypeScript', 'Tailwind'],
      status: 'completado',
      year: 2024,
      image: '/images/portfolio.jpg',
      links: [
        { label: 'Demo', url: 'https://demo.com' },
        { label: 'GitHub', url: 'https://github.com/user/portfolio' }
      ]
    }
  ],
  homeEducation: [
    {
      title: 'Ingeniería en Sistemas',
      institution: 'Universidad Nacional',
      year: '2024',
      description: 'Carrera de ingeniería en sistemas informáticos'
    }
  ],
  homeCertifications: [
    'AWS Solutions Architect – Amazon Web Services',
    'MongoDB Developer – MongoDB University'
  ]
};
```

## Métricas de Performance

### Tiempos Objetivo
- **Tiempo total de carga:** < 2 segundos
- **Tiempo por endpoint:** < 500ms
- **Tiempo de transformación:** < 100ms
- **Tiempo de renderizado:** < 200ms

### Uso de Memoria
- **Uso base:** < 50MB
- **Pico de uso:** < 100MB
- **Memory leaks:** 0
- **Garbage collection:** Funcional

### Concurrencia
- **Llamadas simultáneas:** 10+
- **Race conditions:** 0
- **Deadlocks:** 0
- **Timeouts:** < 1% 