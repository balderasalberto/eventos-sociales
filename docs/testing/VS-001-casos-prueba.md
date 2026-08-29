# VS-001 — Casos de prueba

## Propósito

Convertir el comportamiento funcional de VS-001 en escenarios verificables antes de crear código.

Los escenarios son LLM-agnósticos y lenguaje-agnósticos. Una implementación en Java, TypeScript, Python, Apps Script u otro lenguaje deberá satisfacer el mismo comportamiento observable.

## Convenciones

Cada escenario utiliza:

- **Given** — contexto inicial;
- **When** — acción;
- **Then** — resultado observable.

## Reglas asumidas

1. Un evento requiere un cliente válido.
2. El nombre/descripcion es obligatorio.
3. La fecha del evento es obligatoria y válida.
4. El identificador del evento lo genera el sistema.
5. El estado inicial será el definido por VS-001 y no por el cliente.
6. Un evento creado puede ser consultado por su identificador.
7. Los errores deben pertenecer a categorías de contrato y no exponer detalles internos de infraestructura.

## Escenarios de aceptación

### TC-001 — Crear evento correctamente

**Given** un cliente válido y activo

**And** un nombre/descripcion válido

**And** una fecha válida

**When** el usuario solicita crear el evento

**Then** el sistema crea un evento

**And** genera un identificador único

**And** conserva el cliente asociado

**And** conserva el nombre/descripcion

**And** conserva la fecha

**And** asigna el estado inicial definido

**And** devuelve una respuesta de creación exitosa.

### TC-002 — Cliente inexistente

**Given** un identificador de cliente que no existe

**When** el usuario solicita crear un evento

**Then** el sistema rechaza la operación

**And** devuelve un error de referencia inválida o cliente no encontrado

**And** no crea el evento.

### TC-003 — Cliente inactivo

**Given** un cliente existente pero inactivo

**When** el usuario solicita crear un evento

**Then** el sistema rechaza la operación cuando la regla de negocio de VS-001 exige cliente activo

**And** no crea el evento.

### TC-004 — Nombre/descripcion vacío

**Given** un cliente válido

**When** el usuario solicita crear un evento sin nombre/descripcion válido

**Then** el sistema rechaza la operación

**And** devuelve un error de validación

**And** no crea el evento.

### TC-005 — Fecha inválida

**Given** un cliente válido

**When** el usuario solicita crear un evento con una fecha inválida o ausente

**Then** el sistema rechaza la operación

**And** devuelve un error de validación

**And** no crea el evento.

### TC-006 — El cliente no controla el identificador

**Given** un cliente válido

**When** la petición incluye un identificador de evento proporcionado por el cliente

**Then** el sistema no lo utiliza como fuente de verdad

**And** genera el identificador según la política del sistema.

### TC-007 — Consultar evento existente

**Given** un evento previamente creado

**When** el usuario solicita el evento por su identificador

**Then** el sistema devuelve el evento correspondiente

**And** los datos observables coinciden con los datos persistidos.

### TC-008 — Consultar evento inexistente

**Given** un identificador de evento que no existe

**When** el usuario solicita el evento

**Then** el sistema devuelve `NOT_FOUND`

**And** no expone detalles internos de la persistencia.

## Escenarios de integración — Demo Sheets

### TC-009 — Persistencia en `events`

**Given** un evento válido

**When** se ejecuta la creación mediante la implementación Demo

**Then** se agrega una fila en `events`

**And** las columnas contienen los valores definidos por DEMO-02.

### TC-010 — Recuperación desde `events`

**Given** una fila válida de evento en `events`

**When** se consulta por `event_id`

**Then** el adaptador devuelve el evento lógico correspondiente.

### TC-011 — Error de infraestructura

**Given** que Google Sheets no está disponible o devuelve un error de infraestructura

**When** se ejecuta una operación de persistencia

**Then** el adaptador traduce el fallo a un error de infraestructura del contrato

**And** no expone credenciales, stack traces ni detalles sensibles al usuario.

## Escenarios de seguridad

### TC-012 — Escritura únicamente mediante API

**Given** un usuario de la aplicación

**When** intenta modificar directamente la hoja como parte del flujo normal de la aplicación

**Then** el diseño no depende de que el navegador tenga acceso de escritura directo a Sheets.

### TC-013 — No exponer secretos

**Given** la aplicación publicada

**When** se inspecciona el código cliente

**Then** no deben encontrarse credenciales o secretos de acceso a la infraestructura.

## Matriz de trazabilidad

| Caso | Requisito/Regla | Tipo |
|---|---|---|
| TC-001 | Crear evento válido | Aceptación |
| TC-002 | Cliente válido | Aceptación/Unidad |
| TC-003 | Cliente activo | Aceptación |
| TC-004 | Nombre obligatorio | Unidad/Aceptación |
| TC-005 | Fecha válida | Unidad/Aceptación |
| TC-006 | ID generado por sistema | Unidad |
| TC-007 | Consultar evento | Aceptación |
| TC-008 | Evento inexistente | Unidad/Aceptación |
| TC-009 | Persistencia Sheets | Integración |
| TC-010 | Lectura Sheets | Integración |
| TC-011 | Error infraestructura | Integración/Seguridad |
| TC-012 | Separación navegador/Sheets | Seguridad |
| TC-013 | Secretos | Seguridad |

## Criterio de salida

Antes de implementar VS-001:

- todos los escenarios deben ser entendidos por un desarrollador sin contexto de la conversación;
- cada escenario debe poder convertirse en un test automatizado;
- las reglas de negocio deben estar definidas fuera del código;
- el adaptador de Sheets debe poder probarse sin convertir Google Sheets en parte del dominio.

## Nota sobre evolución

Los nombres de frameworks y lenguajes no forman parte de estos casos de prueba. Si la implementación cambia de TypeScript a Java, de Apps Script a otro backend, o de Sheets a PostgreSQL, estos escenarios permanecen como referencia funcional salvo que cambie deliberadamente el requisito.
