# AGENTS.md

## Propósito

Este repositorio contiene el MVP de un sistema web para la gestión de eventos sociales, servicios y proveedores.

Este archivo es un **punto de entrada para agentes que soporten `AGENTS.md`**. No es la fuente exclusiva de las reglas del proyecto.

## Fuente de verdad

La fuente de verdad del producto está distribuida de la siguiente manera:

- `SPEC.md`: comportamiento y alcance del producto.
- `docs/`: visión, requisitos, arquitectura, modelo de datos y contratos.
- `ai/instructions/`: reglas neutrales para trabajo asistido por IA.
- `ai/prompts/`: flujos reutilizables para tareas comunes.
- tests: comportamiento verificable de la implementación.

Las instrucciones específicas de una herramienta o LLM son adaptadores y no deben redefinir las reglas de negocio.

## Independencia tecnológica

Las reglas funcionales y de negocio son independientes del LLM, lenguaje, framework y proveedor de infraestructura.

No asumir Codex, GitHub Copilot, Claude ni otro agente como requisito del producto.

No asumir Java, TypeScript, Python u otro lenguaje salvo que la implementación actual lo establezca.

## Reglas de trabajo

1. Mantener los cambios pequeños y enfocados.
2. No modificar funcionalidades no relacionadas con la tarea.
3. Preferir soluciones simples y mantenibles para el MVP.
4. No introducir dependencias innecesarias.
5. No almacenar secretos, API keys, contraseñas o credenciales en el repositorio.
6. Mantener separación clara entre presentación, lógica de negocio y acceso a datos.
7. Toda nueva funcionalidad debe incluir pruebas apropiadas.
8. No considerar terminada una tarea si existen pruebas fallando.
9. No convertir decisiones provisionales de documentación en reglas definitivas sin validarlas.

## Flujo para una nueva funcionalidad

1. Identificar el requisito en `SPEC.md`.
2. Revisar la documentación relacionada.
3. Revisar la implementación existente.
4. Identificar los criterios de aceptación.
5. Crear o actualizar las pruebas.
6. Implementar el cambio respetando la tecnología existente.
7. Ejecutar las pruebas y demás validaciones disponibles.
8. Revisar el diff y eliminar cambios innecesarios.
9. Actualizar documentación si corresponde.

## Decisiones faltantes

Si una tarea requiere una decisión de negocio o arquitectura que no esté documentada, no inventarla. Señalar la decisión pendiente y solicitarla.

## Tests

Los tests unitarios validan reglas y componentes aislados.

Los tests de integración validan la interacción entre componentes o con servicios externos.

Una funcionalidad debe tener como mínimo pruebas para el comportamiento correcto y para los casos de error relevantes.

Los frameworks y comandos concretos de testing dependen de la implementación tecnológica.

## Git

Usar ramas para cambios de funcionalidad o configuración. Evitar trabajar directamente sobre `main` cuando el cambio pueda revisarse mediante Pull Request.

Los mensajes de commit deben ser breves y describir claramente el cambio.
