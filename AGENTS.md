# AGENTS.md

## Propósito

Este repositorio contiene el MVP de un sistema web para la gestión de eventos sociales, servicios y proveedores.

## Fuente de verdad

Antes de implementar una funcionalidad, leer `SPEC.md` y revisar la documentación relacionada en `docs/`.

No inventar requisitos funcionales. Si una solicitud contradice el SPEC o requiere una decisión de arquitectura no documentada, detenerse y solicitar una decisión.

## Reglas de trabajo

1. Mantener los cambios pequeños y enfocados.
2. No modificar funcionalidades no relacionadas con la tarea.
3. Preferir soluciones simples y mantenibles para el MVP.
4. No introducir dependencias innecesarias.
5. No almacenar secretos, API keys, contraseñas o credenciales en el repositorio.
6. Mantener separación clara entre presentación, lógica de negocio y acceso a datos.
7. Toda nueva funcionalidad debe incluir pruebas apropiadas.
8. No considerar terminada una tarea si existen pruebas fallando.

## Flujo para una nueva funcionalidad

1. Identificar el requisito en `SPEC.md`.
2. Revisar la implementación existente.
3. Identificar los casos de prueba necesarios.
4. Crear o actualizar las pruebas.
5. Implementar el cambio.
6. Ejecutar las pruebas.
7. Revisar el diff y eliminar cambios innecesarios.
8. Actualizar documentación si corresponde.

## Tests

Los tests unitarios validan reglas y componentes aislados.

Los tests de integración validan la interacción entre componentes o con servicios externos.

Una funcionalidad debe tener como mínimo pruebas para el comportamiento correcto y para los casos de error relevantes.

## Git

Usar ramas para cambios de funcionalidad o configuración. Evitar trabajar directamente sobre `main` cuando el cambio pueda revisarse mediante Pull Request.

Los mensajes de commit deben ser breves y describir claramente el cambio.
