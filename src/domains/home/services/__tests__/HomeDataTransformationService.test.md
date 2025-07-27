# Tests para HomeDataTransformationService

## Descripción
Este documento describe los tests que deben implementarse para el `HomeDataTransformationService` una vez que se configure el framework de testing.

## Tests Requeridos

### 1. Test de `transformSkillsToCategories`

#### 1.1 Transformación Básica
**Descripción:** Verifica que las skills se transforman correctamente a categorías.

**Casos de prueba:**
- Skills se agrupan por categoría correctamente
- Nombres de categorías se mapean correctamente
- Skills se asignan a las categorías correctas

**Datos de prueba:**
```typescript
const skills = [
  { _id: 'skill1', tecnologia: 'React', categoria_id: 'frontend' },
  { _id: 'skill2', tecnologia: 'Vue', categoria_id: 'frontend' },
  { _id: 'skill3', tecnologia: 'Node.js', categoria_id: 'backend' }
];

const categories = [
  { _id: 'frontend', nombre: 'Frontend' },
  { _id: 'backend', nombre: 'Backend' }
];

// Resultado esperado:
{
  'Frontend': ['React', 'Vue'],
  'Backend': ['Node.js']
}
```

#### 1.2 Categorías Vacías
**Descripción:** Verifica el comportamiento cuando no hay categorías disponibles.

**Casos de prueba:**
- Array de categorías vacío
- Categorías undefined o null
- Usa IDs de categoría como nombres de fallback

#### 1.3 Categorías con Fallback
**Descripción:** Verifica que se usan IDs como fallback cuando no hay nombre.

**Casos de prueba:**
- Categoría sin nombre
- Categoría con nombre vacío
- Categoría con nombre undefined

### 2. Test de `transformProjectsToLegacyFormat`

#### 2.1 Transformación Básica
**Descripción:** Verifica que los proyectos se transforman correctamente al formato legacy.

**Casos de prueba:**
- Campos se mapean correctamente (nombre -> name, descripcion -> description)
- Tecnologías se transforman correctamente
- Links se transforman al formato esperado
- Valores por defecto se aplican correctamente

**Datos de prueba:**
```typescript
const projects = [
  {
    nombre: 'Portfolio App',
    descripcion: 'Aplicación de portfolio personal',
    tecnologias: ['React', 'TypeScript'],
    estado: 'completado',
    año: 2024,
    imagen: '/images/portfolio.jpg',
    links: {
      demo: 'https://demo.com',
      github: 'https://github.com/user/portfolio'
    }
  }
];

// Resultado esperado:
[{
  name: 'Portfolio App',
  description: 'Aplicación de portfolio personal',
  tech: ['React', 'TypeScript'],
  status: 'completado',
  year: 2024,
  image: '/images/portfolio.jpg',
  links: [
    { label: 'Demo', url: 'https://demo.com' },
    { label: 'GitHub', url: 'https://github.com/user/portfolio' }
  ]
}]
```

#### 2.2 Mapeo de Links
**Descripción:** Verifica que los links se mapean correctamente.

**Casos de prueba:**
- Links conocidos (demo, frontend, backend, github)
- Links desconocidos (usa la clave como label)
- Proyecto sin links
- Links con valores undefined o null

#### 2.3 Valores por Defecto
**Descripción:** Verifica que se aplican valores por defecto correctamente.

**Casos de prueba:**
- Proyecto sin estado (usa 'sin-estado')
- Proyecto sin año (usa año actual)
- Proyecto sin imagen (usa string vacío)
- Proyecto sin tecnologías (usa array vacío)

### 3. Test de `transformEducationToLegacyFormat`

#### 3.1 Separación de Tipos
**Descripción:** Verifica que se separan correctamente formación y certificaciones.

**Casos de prueba:**
- Items con `tipo: 'formacion'` van a `education`
- Items con `tipo: 'certificacion'` van a `certifications`
- Items con tipo desconocido se ignoran

**Datos de prueba:**
```typescript
const educationData = [
  {
    tipo: 'formacion',
    titulo: 'Ingeniería en Sistemas',
    institucion: 'Universidad Nacional',
    fecha_fin: '2024-12-15',
    descripcion: 'Carrera de ingeniería'
  },
  {
    tipo: 'certificacion',
    titulo: 'AWS Solutions Architect',
    institucion: 'Amazon Web Services',
    fecha_obtencion: '2023-06-15'
  }
];

// Resultado esperado:
{
  education: [{
    title: 'Ingeniería en Sistemas',
    institution: 'Universidad Nacional',
    year: '2024',
    description: 'Carrera de ingeniería'
  }],
  certifications: ['AWS Solutions Architect – Amazon Web Services']
}
```

#### 3.2 Transformación de Fechas
**Descripción:** Verifica que las fechas se transforman correctamente.

**Casos de prueba:**
- `fecha_fin` se usa para obtener el año
- `fecha_inicio` se usa como fallback
- Sin fechas usa 'En curso'
- Fechas en formato inválido

#### 3.3 Formato de Certificaciones
**Descripción:** Verifica que las certificaciones tienen el formato correcto.

**Casos de prueba:**
- Formato "Título – Institución"
- Certificación sin institución
- Certificación sin título

### 4. Test de Casos Edge

#### 4.1 Datos Vacíos
**Descripción:** Verifica el comportamiento con datos vacíos.

**Casos de prueba:**
- Arrays vacíos
- Objetos vacíos
- Valores null o undefined

#### 4.2 Datos Inválidos
**Descripción:** Verifica el comportamiento con datos inválidos.

**Casos de prueba:**
- Objetos sin propiedades requeridas
- Tipos de datos incorrectos
- Estructuras de datos inesperadas

### 5. Test de Rendimiento

#### 5.1 Grandes Volúmenes de Datos
**Descripción:** Verifica el rendimiento con grandes volúmenes.

**Casos de prueba:**
- 1000+ skills
- 100+ proyectos
- 50+ items de educación

#### 5.2 Memoria
**Descripción:** Verifica el uso de memoria.

**Casos de prueba:**
- No hay memory leaks
- Uso eficiente de memoria
- Limpieza de referencias

## Configuración de Testing

Para implementar estos tests, se requiere:

1. **Framework de testing:** Vitest o Jest
2. **Mocks:** Para datos de entrada
3. **Tipos:** Para datos de prueba
4. **Configuración:** Para ejecutar tests en el entorno

## Ejemplo de Implementación

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HomeDataTransformationService } from '../HomeDataTransformationService';

describe('HomeDataTransformationService', () => {
  let service: HomeDataTransformationService;

  beforeEach(() => {
    service = new HomeDataTransformationService();
  });

  describe('transformSkillsToCategories', () => {
    it('debería transformar skills a categorías correctamente', () => {
      // Arrange
      // Act
      // Assert
    });

    it('debería manejar categorías vacías', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('transformProjectsToLegacyFormat', () => {
    it('debería transformar proyectos correctamente', () => {
      // Arrange
      // Act
      // Assert
    });

    it('debería mapear links correctamente', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('transformEducationToLegacyFormat', () => {
    it('debería separar formación y certificaciones', () => {
      // Arrange
      // Act
      // Assert
    });

    it('debería transformar fechas correctamente', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Validaciones Específicas

### Validación de Skills
- Tecnologías no duplicadas en la misma categoría
- Categorías ordenadas alfabéticamente
- Tecnologías ordenadas alfabéticamente

### Validación de Proyectos
- Links únicos por proyecto
- URLs válidas
- Estados válidos

### Validación de Educación
- Años válidos (números o 'En curso')
- Formato de certificaciones consistente
- Descripciones no vacías 