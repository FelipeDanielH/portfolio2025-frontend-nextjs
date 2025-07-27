# Tests para GetSkillsCategoriesUseCase

## Descripción
Este documento describe los tests que deben implementarse para el `GetSkillsCategoriesUseCase` una vez que se configure el framework de testing.

## Tests Requeridos

### 1. Test de Ejecución Exitosa sin Filtros
**Descripción:** Verifica que el use case obtiene y transforma todas las skills correctamente.

**Casos de prueba:**
- Llama a `SkillsRepository.fetchSkills()`
- Llama a `SkillsRepository.fetchSkillCategories()`
- Transforma skills a categorías correctamente
- Retorna estadísticas correctas

**Mocks necesarios:**
- `SkillsRepository.fetchSkills()`
- `SkillsRepository.fetchSkillCategories()`
- `SkillsTransformationService.transformSkillsToCategories()`

### 2. Test de Ejecución con Filtros de IDs
**Descripción:** Verifica que el use case filtra skills por IDs específicos.

**Casos de prueba:**
- Filtra skills basándose en los IDs proporcionados
- Solo incluye skills que están en la lista de IDs
- Pasa las skills filtradas al servicio de transformación
- Retorna estadísticas correctas para skills filtradas

### 3. Test de Manejo de Errores
**Descripción:** Verifica que el use case maneja errores correctamente.

**Casos de prueba:**
- Error en `SkillsRepository.fetchSkills()`
- Error en `SkillsRepository.fetchSkillCategories()`
- Error en `SkillsTransformationService.transformSkillsToCategories()`

**Comportamiento esperado:**
- Captura errores de repositorios
- Lanza un error descriptivo
- No expone detalles internos del error

### 4. Test de Categorías Vacías
**Descripción:** Verifica el comportamiento cuando no hay categorías disponibles.

**Casos de prueba:**
- `fetchSkillCategories()` retorna array vacío
- `fetchSkillCategories()` falla y se usa fallback
- Skills se agrupan usando IDs de categoría como nombres

### 5. Test de Skills Vacías
**Descripción:** Verifica el comportamiento cuando no hay skills disponibles.

**Casos de prueba:**
- `fetchSkills()` retorna array vacío
- Retorna categorías vacías
- Estadísticas muestran 0 skills

### 6. Test de Transformación de Categorías
**Descripción:** Verifica que las categorías se transforman correctamente.

**Casos de prueba:**
- Skills se agrupan por categoría correctamente
- Nombres de categorías se mapean correctamente
- Categorías con fallback se manejan correctamente

## Configuración de Testing

Para implementar estos tests, se requiere:

1. **Framework de testing:** Vitest o Jest
2. **Mocks:** Para repositorios y servicios
3. **Tipos:** Para datos de prueba
4. **Configuración:** Para ejecutar tests en el entorno

## Ejemplo de Implementación

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetSkillsCategoriesUseCase } from '../GetSkillsCategoriesUseCase';

describe('GetSkillsCategoriesUseCase', () => {
  let useCase: GetSkillsCategoriesUseCase;
  let mockSkillsRepository: SkillsRepository;
  let mockTransformationService: SkillsTransformationService;

  beforeEach(() => {
    // Configurar mocks
    useCase = new GetSkillsCategoriesUseCase(
      mockSkillsRepository,
      mockTransformationService
    );
  });

  describe('execute', () => {
    it('debería obtener y transformar skills sin filtros', async () => {
      // Arrange
      // Act
      // Assert
    });

    it('debería filtrar skills por IDs específicos', async () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Datos de Prueba

### Skills de Prueba
```typescript
const mockSkills = [
  { _id: 'skill1', tecnologia: 'React', categoria_id: 'frontend' },
  { _id: 'skill2', tecnologia: 'Vue', categoria_id: 'frontend' },
  { _id: 'skill3', tecnologia: 'Node.js', categoria_id: 'backend' },
  { _id: 'skill4', tecnologia: 'Express', categoria_id: 'backend' }
];
```

### Categorías de Prueba
```typescript
const mockCategories = [
  { _id: 'frontend', nombre: 'Frontend' },
  { _id: 'backend', nombre: 'Backend' },
  { _id: 'database', nombre: 'Bases de Datos' }
];
```

### Resultado Esperado
```typescript
const expectedResult = {
  skillsCategories: {
    'Frontend': ['React', 'Vue'],
    'Backend': ['Node.js', 'Express']
  },
  totalSkills: 4,
  totalCategories: 2
};
``` 