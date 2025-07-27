# Tests para GetHomeEducationUseCase

## Descripción
Este documento describe los tests que deben implementarse para el `GetHomeEducationUseCase` una vez que se configure el framework de testing.

## Tests Requeridos

### 1. Test de Ejecución Exitosa
**Descripción:** Verifica que el use case obtiene y transforma educación correctamente.

**Casos de prueba:**
- Llama a `EducationRepository.fetchHomeEducation()`
- Separa formación y certificaciones correctamente
- Transforma datos al formato legacy correctamente
- Calcula estadísticas correctas
- Retorna la estructura esperada

**Mocks necesarios:**
- `EducationRepository.fetchHomeEducation()`
- `EducationTransformationService.transformEducationToLegacyFormat()`

### 2. Test de Separación Formación/Certificaciones
**Descripción:** Verifica que se separan correctamente los tipos de educación.

**Casos de prueba:**
- Items con `tipo: 'formacion'` van a `education`
- Items con `tipo: 'certificacion'` van a `certifications`
- Items con tipo desconocido se ignoran o manejan apropiadamente

### 3. Test de Transformación de Fechas
**Descripción:** Verifica que las fechas se transforman correctamente.

**Casos de prueba:**
- `fecha_fin` se usa para obtener el año
- `fecha_inicio` se usa como fallback si no hay `fecha_fin`
- Si no hay fechas, se usa 'En curso'
- Fechas se convierten correctamente a años

### 4. Test de Manejo de Errores
**Descripción:** Verifica que el use case maneja errores correctamente.

**Casos de prueba:**
- Error en `EducationRepository.fetchHomeEducation()`
- Error en `EducationTransformationService.transformEducationToLegacyFormat()`

**Comportamiento esperado:**
- Captura errores de repositorios
- Lanza un error descriptivo
- No expone detalles internos del error

### 5. Test de Datos Vacíos
**Descripción:** Verifica el comportamiento cuando no hay datos disponibles.

**Casos de prueba:**
- `fetchHomeEducation()` retorna array vacío
- Retorna arrays vacíos de educación y certificaciones
- Estadísticas muestran 0 en todos los campos

### 6. Test de Cálculo de Estadísticas
**Descripción:** Verifica que las estadísticas se calculan correctamente.

**Casos de prueba:**
- `totalEducation` se calcula correctamente
- `totalCertifications` se calcula correctamente
- `educationByYear` agrupa educación por año correctamente

### 7. Test de Casos Edge de Fechas
**Descripción:** Verifica el manejo de casos edge en fechas.

**Casos de prueba:**
- Solo `fecha_inicio` disponible
- Solo `fecha_fin` disponible
- Ninguna fecha disponible
- Fechas en formato inválido

## Configuración de Testing

Para implementar estos tests, se requiere:

1. **Framework de testing:** Vitest o Jest
2. **Mocks:** Para repositorios y servicios
3. **Tipos:** Para datos de prueba
4. **Configuración:** Para ejecutar tests en el entorno

## Ejemplo de Implementación

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetHomeEducationUseCase } from '../GetHomeEducationUseCase';

describe('GetHomeEducationUseCase', () => {
  let useCase: GetHomeEducationUseCase;
  let mockEducationRepository: EducationRepository;
  let mockTransformationService: EducationTransformationService;

  beforeEach(() => {
    // Configurar mocks
    useCase = new GetHomeEducationUseCase(
      mockEducationRepository,
      mockTransformationService
    );
  });

  describe('execute', () => {
    it('debería obtener y transformar educación correctamente', async () => {
      // Arrange
      // Act
      // Assert
    });

    it('debería separar formación y certificaciones correctamente', async () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Datos de Prueba

### Datos de Educación de Prueba
```typescript
const mockEducationData = [
  {
    _id: 'edu1',
    tipo: 'formacion',
    titulo: 'Ingeniería en Sistemas',
    institucion: 'Universidad Nacional',
    estado: 'completado',
    fecha_inicio: '2020-03-01',
    fecha_fin: '2024-12-15',
    descripcion: 'Carrera de ingeniería en sistemas informáticos'
  },
  {
    _id: 'edu2',
    tipo: 'formacion',
    titulo: 'Curso de React',
    institucion: 'Platzi',
    estado: 'completado',
    fecha_inicio: '2023-01-01',
    fecha_fin: '2023-03-01',
    descripcion: 'Curso avanzado de React y hooks'
  },
  {
    _id: 'cert1',
    tipo: 'certificacion',
    titulo: 'AWS Solutions Architect',
    institucion: 'Amazon Web Services',
    estado: 'completado',
    fecha_obtencion: '2023-06-15',
    descripcion: 'Certificación de arquitecto de soluciones AWS'
  },
  {
    _id: 'cert2',
    tipo: 'certificacion',
    titulo: 'MongoDB Developer',
    institucion: 'MongoDB University',
    estado: 'completado',
    fecha_obtencion: '2023-09-20',
    descripcion: 'Certificación de desarrollador MongoDB'
  }
];
```

### Resultado Esperado
```typescript
const expectedResult = {
  education: [
    {
      title: 'Ingeniería en Sistemas',
      institution: 'Universidad Nacional',
      year: '2024',
      description: 'Carrera de ingeniería en sistemas informáticos'
    },
    {
      title: 'Curso de React',
      institution: 'Platzi',
      year: '2023',
      description: 'Curso avanzado de React y hooks'
    }
  ],
  certifications: [
    'AWS Solutions Architect – Amazon Web Services',
    'MongoDB Developer – MongoDB University'
  ],
  totalEducation: 2,
  totalCertifications: 2,
  educationByYear: {
    '2024': 1,
    '2023': 1
  }
};
```

## Casos Edge

### Educación sin Fechas
```typescript
const educationWithoutDates = {
  tipo: 'formacion',
  titulo: 'Curso en Progreso',
  institucion: 'Online Academy',
  estado: 'en-curso',
  descripcion: 'Curso que aún no ha terminado'
  // Sin fechas
};

// Debería transformarse a:
{
  title: 'Curso en Progreso',
  institution: 'Online Academy',
  year: 'En curso', // Fallback
  description: 'Curso que aún no ha terminado'
}
```

### Solo Fecha de Inicio
```typescript
const educationWithStartDateOnly = {
  tipo: 'formacion',
  titulo: 'Curso de TypeScript',
  institucion: 'Udemy',
  estado: 'completado',
  fecha_inicio: '2023-01-01',
  descripcion: 'Curso de TypeScript'
  // Sin fecha_fin
};

// Debería transformarse a:
{
  title: 'Curso de TypeScript',
  institution: 'Udemy',
  year: '2023', // Usa fecha_inicio
  description: 'Curso de TypeScript'
}
```

### Tipo Desconocido
```typescript
const educationWithUnknownType = {
  tipo: 'otro-tipo',
  titulo: 'Otro Curso',
  institucion: 'Otra Institución',
  estado: 'completado',
  descripcion: 'Descripción del curso'
};

// Debería ser ignorado o manejado apropiadamente
// No debería aparecer ni en education ni en certifications
```

## Validaciones Específicas

### Validación de Formato de Certificaciones
```typescript
// Las certificaciones deberían tener el formato:
// "Título – Institución"

const certificationFormat = {
  titulo: 'React Developer',
  institucion: 'Meta'
};

// Debería resultar en:
'React Developer – Meta'
```

### Validación de Años
```typescript
// Los años deberían ser strings que representen el año
// o 'En curso' para educación sin fechas

const yearValidation = {
  fecha_fin: '2024-12-15' // Debería resultar en '2024'
  fecha_inicio: '2023-01-01' // Debería resultar en '2023'
  // Sin fechas // Debería resultar en 'En curso'
};
``` 