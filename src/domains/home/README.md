# 🏠 Dominio Home

## Descripción
El dominio Home maneja toda la lógica relacionada con la página principal del portafolio, incluyendo la obtención, transformación y presentación de datos de diferentes secciones.

## Arquitectura DDD

### 📁 Estructura de Carpetas
```
src/domains/home/
├── components/           # Componentes de presentación
├── hooks/               # Hooks personalizados
├── repositories/        # Acceso a datos (Infrastructure Layer)
├── services/           # Servicios de transformación (Domain Layer)
├── types/              # Tipos e interfaces
├── useCases/           # Casos de uso (Application Layer)
├── __tests__/          # Tests de integración
└── index.ts            # Barrel exports
```

### 🏗️ Capas de la Arquitectura

#### **Application Layer (Use Cases)**
- `GetHomeDataUseCase` - Orquesta la obtención de todos los datos de home
- Maneja la lógica de negocio y coordina entre repositorios y servicios

#### **Domain Layer (Services)**
- `HomeDataTransformationService` - Transforma datos entre formatos API y UI
- Contiene la lógica de transformación de skills, proyectos y educación

#### **Infrastructure Layer (Repositories)**
- `HomeRepository` - Acceso a datos de la API
- Maneja llamadas HTTP y fallbacks

#### **Presentation Layer (Components)**
- Componentes que consumen datos de use cases
- Solo manejan presentación y UI

## 🔧 Uso

### Obtener Datos de Home
```typescript
import { createGetHomeDataUseCase } from '@/domains/home';

const useCase = createGetHomeDataUseCase();
const homeData = await useCase.execute();
```

### Usar Servicios de Transformación
```typescript
import { createHomeDataTransformationService } from '@/domains/home';

const service = createHomeDataTransformationService();
const transformedSkills = service.transformSkillsToCategories(skills, categories);
```

## 📊 Datos que Maneja

### Hero Section
- Nombre, título, claim
- Botón de contacto y CV
- Información de contacto

### About Section
- Descripción personal

### Skills Section
- Habilidades técnicas organizadas por categorías
- Datos filtrados según configuración de home

### Experience Section
- Experiencia laboral destacada

### Projects Section
- Proyectos destacados
- Transformados al formato legacy

### Education Section
- Formación académica y certificaciones
- Separadas y transformadas

### Contact Section
- Información de contacto
- Enlaces a redes sociales

### Call to Action
- Llamadas a la acción

## 🔄 Flujo de Datos

1. **Use Case** recibe solicitud de datos
2. **Repositorios** obtienen datos de API
3. **Servicios de Transformación** procesan datos
4. **Use Case** retorna datos estructurados
5. **Componentes** renderizan datos

## 🧪 Testing

### Tests Disponibles
- Tests de use cases (`__tests__/GetHomeDataUseCase.test.md`)
- Tests de servicios (`services/__tests__/HomeDataTransformationService.test.md`)
- Tests de repositorios (`repositories/__tests__/HomeRepository.test.md`)
- Tests de integración (`__tests__/integration.test.md`)

### Ejecutar Tests
```bash
# Tests unitarios
npm test src/domains/home

# Tests de integración
npm run test:integration src/domains/home
```

## 🚨 Manejo de Errores

### Servicios Centralizados
- `ErrorHandlingService` - Manejo centralizado de errores
- `ApiService` - Llamadas HTTP unificadas

### Fallbacks
- Datos por defecto cuando la API no responde
- Manejo graceful de errores de red
- Logging centralizado para debugging

## 📈 Performance

### Optimizaciones
- Caché de respuestas de API
- Llamadas paralelas cuando es posible
- Transformaciones eficientes
- Lazy loading de componentes

### Métricas
- Tiempo de respuesta < 2 segundos
- Uso de memoria optimizado
- Sin memory leaks

## 🔗 Dependencias

### Internas
- `@/domains/habilidades` - Para skills
- `@/domains/proyectos` - Para proyectos
- `@/domains/formacion` - Para educación
- `@/domains/experiencia` - Para experiencia

### Externas
- `@/components/ui` - Componentes de UI
- `@/domains/shared` - Servicios compartidos

## 📝 Convenciones

### Nomenclatura
- Use cases: `Get[Entity][Action]UseCase`
- Services: `[Entity]TransformationService`
- Repositories: `[Entity]Repository`
- Types: `[Entity][Type]`

### Estructura de Archivos
- Un archivo por clase/interface
- Tests en carpetas `__tests__`
- Barrel exports en `index.ts`

## 🚀 Próximas Mejoras

- [ ] Implementar tests unitarios reales
- [ ] Agregar métricas de performance
- [ ] Implementar caché inteligente
- [ ] Agregar validación de datos
- [ ] Implementar retry logic 