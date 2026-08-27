# SPEC — MVP Administración de Eventos Sociales

## 1. Objetivo

Construir una aplicación web para administrar servicios y proveedores relacionados con eventos sociales.

El MVP debe permitir registrar, consultar y gestionar la información básica necesaria para dar seguimiento a los servicios de un evento.

## 2. Alcance inicial

### Funcionalidades MVP

- Registrar eventos.
- Consultar eventos.
- Modificar eventos.
- Registrar proveedores.
- Consultar proveedores.
- Relacionar proveedores con servicios de un evento.
- Gestionar el estado de un servicio.

## 3. Conceptos principales

### Evento

Representa un evento social que requiere uno o varios servicios.

### Proveedor

Persona o empresa que proporciona un servicio para un evento.

### Servicio

Actividad o prestación contratada o requerida para un evento.

## 4. Estados iniciales del servicio

- PENDIENTE
- CONFIRMADO
- EN_PROCESO
- FINALIZADO
- CANCELADO

## 5. Reglas de negocio iniciales

- Un evento debe tener una fecha.
- Un evento debe tener un nombre o descripción.
- Un servicio debe estar asociado a un evento.
- Un servicio debe tener un estado válido.
- Un proveedor puede participar en uno o varios servicios.
- Los cambios de estado deben respetar las reglas definidas por el dominio.

## 6. Fuera del alcance del MVP

- Pagos en línea.
- Facturación electrónica.
- Aplicación móvil nativa.
- Automatizaciones avanzadas con IA.
- Integraciones externas no necesarias para validar el MVP.

## 7. Criterio general de aceptación

Una funcionalidad se considera terminada cuando:

1. Cumple este SPEC.
2. Tiene pruebas automatizadas apropiadas.
3. Las pruebas existentes continúan pasando.
4. La implementación respeta `AGENTS.md`.
5. La documentación se actualiza cuando el cambio modifica comportamiento o arquitectura.
