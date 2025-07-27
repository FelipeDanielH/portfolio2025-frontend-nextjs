# Tests para HomeRepository

## Descripción
Este documento describe los tests que deben implementarse para el `HomeRepository` una vez que se configure el framework de testing.

## Tests Requeridos

### 1. Test de `getAllHomeData`

#### 1.1 Obtención Exitosa
**Descripción:** Verifica que se obtienen todos los datos de home correctamente.

**Casos de prueba:**
- Llama a todos los endpoints necesarios
- Combina los datos correctamente
- Retorna la estructura esperada
- Maneja respuestas exitosas de la API

**Mocks necesarios:**
- `fetch` para llamadas a API
- Respuestas simuladas de cada endpoint

#### 1.2 Manejo de Errores
**Descripción:** Verifica que se manejan errores correctamente.

**Casos de prueba:**
- Error de red
- Error 404 en algún endpoint
- Error 500 en algún endpoint
- Timeout de la API
- Respuesta malformada

#### 1.3 Fallbacks
**Descripción:** Verifica que se aplican fallbacks cuando la API falla.

**Casos de prueba:**
- Datos por defecto cuando la API no responde
- Datos por defecto cuando la respuesta está vacía
- Datos por defecto cuando la respuesta es inválida

### 2. Test de Métodos Individuales

#### 2.1 `getHomeHero`
**Descripción:** Verifica la obtención de datos del hero.

**Casos de prueba:**
- Respuesta exitosa
- Error de API
- Datos por defecto
- Validación de estructura de datos

#### 2.2 `getHomeAbout`
**Descripción:** Verifica la obtención de datos del about.

**Casos de prueba:**
- Respuesta exitosa
- Error de API
- Datos por defecto
- Validación de estructura de datos

#### 2.3 `getHomeSkills`
**Descripción:** Verifica la obtención de datos de skills.

**Casos de prueba:**
- Respuesta exitosa
- Error de API
- Datos por defecto
- Validación de estructura de datos

#### 2.4 `getHomeExperience`
**Descripción:** Verifica la obtención de datos de experiencia.

**Casos de prueba:**
- Respuesta exitosa
- Error de API
- Datos por defecto
- Validación de estructura de datos

#### 2.5 `getHomeContact`
**Descripción:** Verifica la obtención de datos de contacto.

**Casos de prueba:**
- Respuesta exitosa
- Error de API
- Datos por defecto
- Validación de estructura de datos

#### 2.6 `getHomeCallToAction`
**Descripción:** Verifica la obtención de datos del call to action.

**Casos de prueba:**
- Respuesta exitosa
- Error de API
- Datos por defecto
- Validación de estructura de datos

### 3. Test de Configuración

#### 3.1 URLs de API
**Descripción:** Verifica que se usan las URLs correctas.

**Casos de prueba:**
- URLs base correctas
- Endpoints correctos
- Parámetros de query correctos

#### 3.2 Headers
**Descripción:** Verifica que se envían los headers correctos.

**Casos de prueba:**
- Content-Type correcto
- Authorization si es necesario
- Headers personalizados

#### 3.3 Timeout
**Descripción:** Verifica que se manejan los timeouts correctamente.

**Casos de prueba:**
- Timeout configurado correctamente
- Manejo de timeout
- Retry en caso de timeout

### 4. Test de Caché

#### 4.1 Caché de Respuestas
**Descripción:** Verifica que se cachean las respuestas correctamente.

**Casos de prueba:**
- Respuestas se cachean
- Caché se invalida correctamente
- TTL del caché funciona

#### 4.2 Caché por Método
**Descripción:** Verifica que cada método tiene su propio caché.

**Casos de prueba:**
- Caché independiente por método
- No hay interferencia entre métodos
- Limpieza de caché específica

### 5. Test de Rendimiento

#### 5.1 Llamadas Paralelas
**Descripción:** Verifica que las llamadas paralelas funcionan correctamente.

**Casos de prueba:**
- Múltiples llamadas simultáneas
- No hay race conditions
- Rendimiento optimizado

#### 5.2 Memoria
**Descripción:** Verifica el uso eficiente de memoria.

**Casos de prueba:**
- No hay memory leaks
- Limpieza de referencias
- Uso eficiente de memoria

## Configuración de Testing

Para implementar estos tests, se requiere:

1. **Framework de testing:** Vitest o Jest
2. **Mocks:** Para `fetch` y respuestas de API
3. **Tipos:** Para datos de prueba
4. **Configuración:** Para ejecutar tests en el entorno

## Ejemplo de Implementación

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HomeRepository } from '../HomeRepository';

// Mock de fetch
global.fetch = vi.fn();

describe('HomeRepository', () => {
  let repository: HomeRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new HomeRepository();
  });

  describe('getAllHomeData', () => {
    it('debería obtener todos los datos correctamente', async () => {
      // Arrange
      const mockHero = { nombre: 'Test User', titulo: 'Developer' };
      const mockAbout = { about: 'Test description' };
      // ... otros mocks

      (fetch as any)
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockHero) })
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockAbout) })
        // ... otros mocks

      // Act
      const result = await repository.getAllHomeData();

      // Assert
      expect(result).toEqual({
        hero: mockHero,
        about: mockAbout,
        // ... otros datos
      });
    });

    it('debería manejar errores correctamente', async () => {
      // Arrange
      (fetch as any).mockRejectedValue(new Error('Network error'));

      // Act & Assert
      await expect(repository.getAllHomeData()).rejects.toThrow();
    });
  });

  describe('getHomeHero', () => {
    it('debería obtener datos del hero correctamente', async () => {
      // Arrange
      const mockHero = { nombre: 'Test User', titulo: 'Developer' };
      (fetch as any).mockResolvedValue({ ok: true, json: () => Promise.resolve(mockHero) });

      // Act
      const result = await repository.getHomeHero();

      // Assert
      expect(result).toEqual(mockHero);
      expect(fetch).toHaveBeenCalledWith('/api/home/hero');
    });
  });
});
```

## Datos de Prueba

### Datos de Hero
```typescript
const mockHero = {
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
};
```

### Datos de About
```typescript
const mockAbout = {
  about: 'Soy un desarrollador apasionado por crear soluciones innovadoras...'
};
```

### Datos de Skills
```typescript
const mockSkills = {
  skills: ['skill1', 'skill2', 'skill3']
};
```

### Datos de Experience
```typescript
const mockExperience = {
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
};
```

### Datos de Contact
```typescript
const mockContact = {
  _id: 'contact1',
  email: 'test@example.com',
  linkedin: 'https://linkedin.com/in/testuser',
  github: 'https://github.com/testuser',
  portfolio_url: 'https://testuser.dev',
  telefono: '+1234567890'
};
```

### Datos de Call to Action
```typescript
const mockCallToAction = {
  _id: 'cta1',
  titulo: '¿Tienes un proyecto en mente?',
  subtitulo: '¡Hablemos sobre cómo puedo ayudarte!'
};
```

## Casos Edge

### API No Responde
```typescript
// Cuando la API no responde, debería usar datos por defecto
const defaultData = {
  hero: { nombre: 'Usuario', titulo: 'Desarrollador' },
  about: { about: 'Descripción por defecto' },
  // ... otros datos por defecto
};
```

### Respuesta Malformada
```typescript
// Cuando la respuesta no tiene la estructura esperada
const malformedResponse = {
  // Falta estructura esperada
  someOtherField: 'value'
};

// Debería usar datos por defecto o manejar el error apropiadamente
```

### Timeout
```typescript
// Cuando la API tarda demasiado en responder
// Debería lanzar un error o usar datos por defecto
``` 