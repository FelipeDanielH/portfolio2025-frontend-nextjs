# ✅ Checklist Migración Dominio Experiencia a Consumo de API

> Este checklist sigue los protocolos de documentación ágil y migración de dominio definidos en `apuntes_personalizados/` y asegura que la migración no rompa la página en ningún momento. **No modifica la pantalla de inicio.**

---

## 1. Análisis y validación previa
- [x] Identificar el endpoint exacto a consumir y su formato de respuesta.
- [x] Revisar el tipo de dato TypeScript esperado y compararlo con la respuesta real de la API.
- [x] Validar si hay diferencias entre los datos mock/locales y la API (nombres, tipos, estructura).
- [x] Proponer la estructura final de tipos y confirmar antes de avanzar.

## 2. Preparación del entorno
- [x] Verificar que los datos actuales se consumen solo en la página de experiencia (no en la home).
- [x] Respaldar el estado actual del dominio (servicio, hooks y componentes).
- [ ] Documentar el punto de partida en una retrospectiva si es necesario.

## 3. Implementación del servicio de dominio
- [x] Crear o actualizar el servicio en `src/domains/experiencia/services/experienceService.ts` para consumir el endpoint `GET /experience`.
- [x] Implementar manejo de errores según el formato de la API (`{ data, message, errors }`).
- [ ] Validar la respuesta con Zod (si aplica) para asegurar el tipado y la integridad de los datos.

## 4. Actualización del hook de dominio
- [x] Actualizar o crear el hook `useExperience.ts` para usar el nuevo servicio.
- [x] Manejar estados de loading, error y datos.
- [x] Tipar estrictamente el hook y exponer solo lo necesario a los componentes.

## 5. Adaptación de componentes
- [x] Modificar los componentes de la sección experiencia para consumir los datos desde el hook (no desde mocks/estáticos).
- [x] Asegurar que los componentes no fallen si la API responde vacío o con error.
- [x] Mantener la UI/UX intacta en todo momento.

## 6. Pruebas y validaciones
- [x] Probar la página de experiencia en distintos escenarios (datos, sin datos, error de API).
- [x] Verificar que la home y otras páginas no se vean afectadas.
- [x] Documentar cualquier error y su solución en la carpeta retrospectivas.

## 7. Limpieza y documentación
- [x] Eliminar datos mock/estáticos solo cuando todo funcione correctamente.
- [x] Actualizar la documentación interna del dominio y el checklist.
- [ ] Registrar el proceso y aprendizajes en la retrospectiva correspondiente.

## 8. Commits y control de cambios
- [ ] Realizar commits detallados y separados por tipo de cambio (feat, refactor, chore, etc.).
- [ ] No hacer push hasta que se confirme que todo está estable y probado. 