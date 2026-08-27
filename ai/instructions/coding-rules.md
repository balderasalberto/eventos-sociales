# Reglas de desarrollo

Estas reglas son independientes del lenguaje y del LLM utilizado.

## Antes de cambiar código

1. Identificar el requisito relacionado.
2. Leer `SPEC.md`.
3. Revisar la documentación de `docs/` afectada.
4. Revisar decisiones arquitectónicas existentes.
5. Revisar el código y tests actuales.

## Durante la implementación

- Mantener el cambio enfocado en la tarea.
- No inventar comportamiento de negocio.
- No cambiar contratos públicos sin actualizar la documentación correspondiente.
- Mantener separadas presentación, dominio, aplicación y persistencia cuando la arquitectura lo requiera.
- Preferir soluciones simples y justificables.
- Evitar dependencias innecesarias.
- No introducir secretos.

## Independencia tecnológica

No asumir un lenguaje, framework, base de datos o proveedor de IA salvo que el repositorio lo haya decidido explícitamente.

Cuando una decisión dependa de la tecnología elegida, documentarla como decisión técnica, no como requisito de negocio.

## Finalización

Una tarea solamente está terminada cuando:

- cumple los criterios de aceptación;
- los tests apropiados pasan;
- no rompe comportamiento existente;
- la documentación queda consistente;
- el diff no contiene cambios innecesarios.
