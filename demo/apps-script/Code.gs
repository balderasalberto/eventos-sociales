/**
 * eventos-sociales - Demo sin instalación
 * VS-001: Crear y consultar evento
 *
 * Infraestructura demo: Google Apps Script + Google Sheets.
 * El dominio y los contratos deben permanecer independientes de Sheets.
 */

const SHEETS = Object.freeze({
  CLIENTS: 'clients',
  EVENTS: 'events'
});

const EVENT_STATUS = Object.freeze({
  DRAFT: 'BORRADOR'
});

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Eventos Sociales - Demo');
}

/**
 * VS-001: crea un evento válido.
 * La fuente de verdad para eventId es el servidor.
 *
 * @param {{clientId:string, name:string, eventDate:string}} input
 * @return {{ok:boolean,event?:Object,error?:string}}
 */
function createEvent(input) {
  const data = validateCreateEventInput_(input);
  const spreadsheet = getSpreadsheet_();
  const clientsSheet = getRequiredSheet_(spreadsheet, SHEETS.CLIENTS);
  const eventsSheet = getRequiredSheet_(spreadsheet, SHEETS.EVENTS);

  const client = findClient_(clientsSheet, data.clientId);
  if (!client) {
    return { ok: false, error: 'CLIENT_NOT_FOUND' };
  }
  if (!client.active) {
    return { ok: false, error: 'CLIENT_INACTIVE' };
  }

  const now = new Date().toISOString();
  const event = {
    eventId: generateId_('EVENT'),
    clientId: data.clientId,
    name: data.name,
    eventDate: data.eventDate,
    status: EVENT_STATUS.DRAFT,
    createdAt: now,
    updatedAt: now
  };

  eventsSheet.appendRow([
    event.eventId,
    event.clientId,
    event.name,
    event.eventDate,
    event.status,
    event.createdAt,
    event.updatedAt
  ]);

  return { ok: true, event: event };
}

/**
 * VS-001: consulta un evento por identificador.
 *
 * @param {string} eventId
 * @return {{ok:boolean,event?:Object,error?:string}}
 */
function getEvent(eventId) {
  if (!eventId || typeof eventId !== 'string') {
    return { ok: false, error: 'INVALID_EVENT_ID' };
  }

  const sheet = getRequiredSheet_(getSpreadsheet_(), SHEETS.EVENTS);
  const values = sheet.getDataRange().getValues();

  for (let row = 1; row < values.length; row++) {
    if (String(values[row][0]) === eventId) {
      return {
        ok: true,
        event: {
          eventId: String(values[row][0]),
          clientId: String(values[row][1]),
          name: String(values[row][2]),
          eventDate: String(values[row][3]),
          status: String(values[row][4]),
          createdAt: String(values[row][5]),
          updatedAt: String(values[row][6])
        }
      };
    }
  }

  return { ok: false, error: 'NOT_FOUND' };
}

function validateCreateEventInput_(input) {
  if (!input || typeof input !== 'object') {
    throw new Error('VALIDATION_ERROR');
  }

  const clientId = String(input.clientId || '').trim();
  const name = String(input.name || '').trim();
  const eventDate = String(input.eventDate || '').trim();

  if (!clientId || !name || !eventDate) {
    throw new Error('VALIDATION_ERROR');
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
    throw new Error('VALIDATION_ERROR');
  }

  return { clientId: clientId, name: name, eventDate: eventDate };
}

function findClient_(sheet, clientId) {
  const values = sheet.getDataRange().getValues();
  for (let row = 1; row < values.length; row++) {
    if (String(values[row][0]) === clientId) {
      return {
        clientId: String(values[row][0]),
        name: String(values[row][1]),
        active: String(values[row][2]).toLowerCase() === 'true'
      };
    }
  }
  return null;
}

function getSpreadsheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties()
    .getProperty('SPREADSHEET_ID');

  if (!spreadsheetId) {
    throw new Error('MISSING_SPREADSHEET_ID');
  }

  return SpreadsheetApp.openById(spreadsheetId);
}

function getRequiredSheet_(spreadsheet, name) {
  const sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    throw new Error('MISSING_SHEET_' + name.toUpperCase());
  }
  return sheet;
}

function generateId_(prefix) {
  return prefix + '-' + Utilities.getUuid();
}
