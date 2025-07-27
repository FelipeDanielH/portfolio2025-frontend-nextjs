# Tests para GetHomeDataUseCase

## Descripción
Este documento describe los tests que deben implementarse para el `GetHomeDataUseCase` una vez que se configure el framework de testing.

## Tests Requeridos

### 1. Test de Ejecución Exitosa
**Descripción:** Verifica que el use case obtiene y transforma todos los datos correctamente.

**Casos de prueba:**
- Llama a todos los repositorios necesarios
- Filtra skills según los IDs de Home
- Transforma los datos correctamente
- Retorna la estructura esperada

**Mocks necesarios:**
- `HomeRepository.getAllHomeData()`
- `SkillsRepository.fetchSkills()`
- `SkillsRepository.fetchSkillCategories()`
- `ProjectsRepository.fetchHomeProjects()`
- `EducationRepository.fetchHomeEducation()`
- `HomeDataTransformationService.transformSkillsToCategories()`
- `HomeDataTransformationService.transformProjectsToLegacyFormat()`
- `HomeDataTransformationService.transformEducationToLegacyFormat()`

### 2. Test de Manejo de Errores
**Descripción:** Verifica que el use case maneja errores correctamente.

**Casos de prueba:**
- Error en `HomeRepository.getAllHomeData()`
- Error en `SkillsRepository.fetchSkills()`
- Error en `ProjectsRepository.fetchHomeProjects()`
- Error en `EducationRepository.fetchHomeEducation()`

**Comportamiento esperado:**
- Captura errores de repositorios
- Lanza un error descriptivo
- No expone detalles internos del error

### 3. Test de Filtrado de Skills
**Descripción:** Verifica que el use case filtra skills correctamente.

**Casos de prueba:**
- Filtra skills basándose en los IDs de Home
- Solo incluye skills que están en la lista de Home
- Pasa las skills filtradas al servicio de transformación

### 4. Test de Transformación de Datos
**Descripción:** Verifica que los datos se transforman correctamente.

**Casos de prueba:**
- Skills se agrupan por categorías correctamente
- Proyectos se transforman al formato legacy
- Educación y certificaciones se separan correctamente

## Configuración de Testing

Para implementar estos tests, se requiere:

1. **Framework de testing:** Vitest o Jest
2. **Mocks:** Para repositorios y servicios
3. **Tipos:** Para datos de prueba
4. **Configuración:** Para ejecutar tests en el entorno

## Ejemplo de Implementación

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetHomeDataUseCase } from '../GetHomeDataUseCase';

describe('GetHomeDataUseCase', () => {
  let useCase: GetHomeDataUseCase;
  let mockHomeRepository: HomeRepository;
  let mockSkillsRepository: SkillsRepository;
  // ... otros mocks

  beforeEach(() => {
    // Configurar mocks
    useCase = new GetHomeDataUseCase(
      mockHomeRepository,
      mockSkillsRepository,
      // ... otros repositorios
    );
  });

  describe('execute', () => {
    it('debería obtener y transformar todos los datos correctamente', async () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
``` 