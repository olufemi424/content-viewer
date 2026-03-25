import { google } from 'googleapis';
import { IngestTopicInput } from './contracts';

export interface SheetsConfig {
  spreadsheetId: string;
  sheetName: string;
  serviceAccountEmail: string;
  privateKey: string;
}

export function getSheetsConfigFromEnv(): SheetsConfig {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '';
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || 'topics';
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '';
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

  if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
    throw new Error('Missing Google Sheets env vars. Required: GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY.');
  }

  return { spreadsheetId, sheetName, serviceAccountEmail, privateKey };
}

export async function listExistingIdempotencyKeys(config: SheetsConfig): Promise<Set<string>> {
  const auth = new google.auth.JWT({
    email: config.serviceAccountEmail,
    key: config.privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const range = `${config.sheetName}!A2:A`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: config.spreadsheetId,
    range,
  });

  const rows = response.data.values || [];
  return new Set(rows.map((r) => String(r[0] || '').trim()).filter(Boolean));
}

export function toSheetRow(topic: IngestTopicInput, source?: string): string[] {
  return [
    topic.idempotencyKey,
    topic.topic,
    topic.state,
    topic.sourceId || '',
    source || '',
    topic.generatedAt || '',
    topic.reviewerGate?.reviewerId || '',
    topic.reviewerGate?.reviewedAt || '',
    topic.reviewerGate?.notes || '',
    JSON.stringify(topic.metadata || {}),
    new Date().toISOString(),
  ];
}

export async function appendTopics(config: SheetsConfig, rows: string[][]): Promise<void> {
  if (rows.length === 0) return;

  const auth = new google.auth.JWT({
    email: config.serviceAccountEmail,
    key: config.privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range: `${config.sheetName}!A:K`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: rows,
    },
  });
}
