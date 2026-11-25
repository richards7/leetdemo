import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export interface StudentProjectSubmission {
  teamName: string;
  teamLead: string;
  teamMembers: string;
  theme: string;
  projectTitle: string;
  projectDescription: string;
  projectOverview: string;
  objectives: string;
  technologyStack: string;
  uniqueness: string;
  targetUsersImpact: string;
  teamStrength: string;
  selectionReason: string;
  projectGithubRepo: string;
  submittedAt: string;
}

export interface LeadSubmission {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  companyWebsite?: string;
  selectedServices: string[];
  engagementModel: string;
  budgetRange: string;
  timeline: string;
  projectDescription: string;
  status?: string;
}

interface SheetsConfigStatus {
  configured: boolean;
  hasCredentialsJson: boolean;
  hasSheetId: boolean;
  clientEmail?: string;
  sheetId?: string;
  tabName?: string;
  error?: string;
  lastSyncTime?: string;
  totalSyncedCount: number;
}

let syncCount = 0;
let lastSyncTime: string | null = null;

/**
 * Extracts and parses service account credentials from:
 * 1. GOOGLE_SERVICE_ACCOUNT_JSON env variable (raw or base64)
 * 2. Local credentials.json or google-credentials.json in workspace
 * 3. Individual GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY
 */
export function getServiceAccountCredentials(): {
  client_email?: string;
  private_key?: string;
  project_id?: string;
} | null {
  // Option 1: Env var GOOGLE_SERVICE_ACCOUNT_JSON
  const envJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (envJson) {
    try {
      // Check if base64 encoded
      let jsonStr = envJson;
      if (!envJson.startsWith('{') && !envJson.startsWith('"')) {
        try {
          const decoded = Buffer.from(envJson, 'base64').toString('utf-8');
          if (decoded.trim().startsWith('{')) {
            jsonStr = decoded;
          }
        } catch {
          // not base64, continue
        }
      }
      const parsed = typeof jsonStr === 'string' && jsonStr.startsWith('{')
        ? JSON.parse(jsonStr)
        : JSON.parse(JSON.parse(jsonStr)); // handle possible escaped JSON

      if (parsed.client_email && parsed.private_key) {
        return {
          client_email: parsed.client_email,
          private_key: parsed.private_key.replace(/\\n/g, '\n'),
          project_id: parsed.project_id
        };
      }
    } catch {
      // Ignored in production
    }
  }

  // Option 2: Look for local JSON credentials file in root directory
  const possiblePaths = [
    path.join(process.cwd(), 'credentials.json'),
    path.join(process.cwd(), 'google-credentials.json'),
    path.join(process.cwd(), 'service-account.json')
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (parsed.client_email && parsed.private_key) {
          return {
            client_email: parsed.client_email,
            private_key: parsed.private_key.replace(/\\n/g, '\n'),
            project_id: parsed.project_id
          };
        }
      } catch {
        // Ignored in production
      }
    }
  }

  // Option 3: Direct env variables
  if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    return {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      project_id: process.env.GOOGLE_PROJECT_ID
    };
  }

  return null;
}

/**
 * Returns the configured spreadsheet ID from env or fallback
 */
export function getSpreadsheetId(): string {
  const rawId = process.env.GOOGLE_SHEET_ID || process.env.SPREADSHEET_ID || '';

  // 1. If raw contains a Google Sheet URL
  const urlMatch = rawId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]{20,65})/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }

  // 2. Look for standard Google Sheet ID string (44 alphanumeric/hyphen/underscore characters)
  const idMatch = rawId.match(/([a-zA-Z0-9-_]{30,60})/);
  if (idMatch && idMatch[1]) {
    return idMatch[1];
  }

  // 3. Trimmed rawId
  if (rawId.trim()) {
    return rawId.trim();
  }

  // 4. Default to user specified Sheet ID
  return '1phn6tfuFb_yifJ4fuG8aqek4ilY5H6eNtdJxPQSOP_Y';
}

/**
 * Returns the target worksheet/tab name
 */
export function getSpreadsheetTabName(): string {
  const envTab = process.env.GOOGLE_SHEET_TAB_NAME?.trim();
  if (envTab) return envTab;
  return 'leads';
}

/**
 * Returns current configuration status of the Google Sheets sync
 */
export function getSheetsStatus(): SheetsConfigStatus {
  const creds = getServiceAccountCredentials();
  const sheetId = getSpreadsheetId();
  const tabName = getSpreadsheetTabName();

  return {
    configured: Boolean(creds?.client_email && creds?.private_key && sheetId),
    hasCredentialsJson: Boolean(creds?.client_email && creds?.private_key),
    hasSheetId: Boolean(sheetId),
    clientEmail: creds?.client_email,
    sheetId: sheetId || undefined,
    tabName,
    lastSyncTime: lastSyncTime || undefined,
    totalSyncedCount: syncCount
  };
}

/**
 * Maps lead fields to match existing column headers in the spreadsheet.
 */
function mapLeadToExistingHeaders(headers: string[], lead: LeadSubmission): (string | number)[] {
  const formattedDate = new Date(lead.createdAt || new Date()).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium'
  });

  const servicesStr = Array.isArray(lead.selectedServices)
    ? lead.selectedServices.join(', ')
    : lead.selectedServices || 'None specified';

  return headers.map(header => {
    const h = (header || '').trim().toUpperCase();
    if (!h) return '';

    if (h.includes('FULL NAME') || (h.includes('NAME') && !h.includes('COMPANY'))) {
      return lead.fullName;
    }
    if (h.includes('EMAIL')) {
      return lead.email;
    }
    if (h.includes('PHONE') || h.includes('WHATSAPP') || h.includes('MOBILE') || h.includes('CONTACT')) {
      const pureDigits = lead.phone ? lead.phone.replace(/\D/g, '') : '';
      if (!pureDigits) return '';
      // Prefix with apostrophe so Google Sheets treats it as plain text instead of formula
      return `'${lead.phone.startsWith('+') ? lead.phone : `+91 ${lead.phone}`}`;
    }
    if (h.includes('COMPANY') || h.includes('ORGANIZATION')) {
      return lead.companyName || 'Undisclosed Entity';
    }
    if (h.includes('WEBSITE') || h.includes('URL') || h.includes('DOMAIN')) {
      return lead.companyWebsite || 'N/A';
    }
    if (h.includes('SERVICE')) {
      return servicesStr;
    }
    if (h.includes('BRIEF') || h.includes('REQUIREMENT') || h.includes('DESCRIPTION') || h.includes('PROJECT')) {
      let desc = lead.projectDescription || 'No description provided';
      const metaParts: string[] = [];
      if (lead.engagementModel) metaParts.push(`Model: ${lead.engagementModel}`);
      if (lead.budgetRange) metaParts.push(`Budget: ${lead.budgetRange}`);
      if (lead.timeline) metaParts.push(`Timeline: ${lead.timeline}`);
      if (lead.id) metaParts.push(`Ref: ${lead.id}`);
      if (metaParts.length > 0) {
        desc += `\n\n[${metaParts.join(' | ')}]`;
      }
      return desc;
    }
    if (h.includes('BUDGET')) {
      return lead.budgetRange || 'Unspecified';
    }
    if (h.includes('TIMELINE') || h.includes('URGENCY')) {
      return lead.timeline || '1 - 3 Months';
    }
    if (h.includes('MODEL') || h.includes('ENGAGEMENT')) {
      return lead.engagementModel || 'Project-Based Work';
    }
    if (h.includes('STATUS')) {
      return lead.status || 'new';
    }
    if (h.includes('DATE') || h.includes('TIME') || h.includes('TIMESTAMP')) {
      return formattedDate;
    }
    if (h.includes('ID') || h.includes('REF')) {
      return lead.id;
    }
    return '';
  });
}

/**
 * Sanitizes any internal error message before it is sent to client responses.
 * Ensures no private keys, internal tokens, or stack paths are ever exposed.
 */
export function sanitizeErrorMessage(error?: any): string {
  if (!error) return 'An unexpected error occurred during spreadsheet synchronization.';
  const message = typeof error === 'string' ? error : (error.message || String(error));

  if (message.includes('PRIVATE KEY') || message.includes('BEGIN') || message.includes('{') || message.includes('}')) {
    return 'Authentication failed while accessing Google Sheets API.';
  }
  if (message.includes('403') || message.includes('Permission Denied') || message.includes('permission')) {
    return 'Permission Denied (403): Service account requires Editor permissions on this Google Sheet.';
  }
  if (message.includes('404') || message.includes('not found') || message.includes('NotFound')) {
    return 'Google Sheet not found (404): Please check the Google Sheet ID.';
  }
  if (message.includes('429') || message.includes('RESOURCE_EXHAUSTED')) {
    return 'Google Sheets rate limit exceeded. Please retry in a moment.';
  }
  // Remove absolute file system paths or stack info
  const firstLine = message.split('\n')[0];
  const cleaned = firstLine.replace(/\/[\w.-]+/g, '').replace(/at\s+.*$/i, '').trim();
  return cleaned.slice(0, 150) || 'Spreadsheet synchronization error.';
}

/**
 * Appends a customer consultation brief directly into the target Google Sheet.
 */
export async function appendStudentProjectToGoogleSheet(submission: StudentProjectSubmission): Promise<{
  success: boolean;
  syncedToGoogleSheets: boolean;
  message: string;
  sheetId?: string;
  clientEmail?: string;
  error?: string;
}> {
  const creds = getServiceAccountCredentials();
  const configuredId = process.env.STUDENT_PROJECT_SHEET_ID || process.env.STUDENT_PROJECT_GOOGLE_SHEET_ID;
  const spreadsheetId = configuredId
    ? (configuredId.match(/\/spreadsheets\/d\/([A-Za-z0-9-_]{20,65})/)?.[1] || configuredId.trim())
    : getSpreadsheetId();
  const tabName = process.env.STUDENT_PROJECT_SHEET_TAB_NAME?.trim() || 'Submissions';

  if (!creds?.client_email || !creds.private_key) {
    return { success: false, syncedToGoogleSheets: false, message: 'Google Sheets credentials are not configured.', error: 'Missing Google service account credentials.' };
  }
  if (!spreadsheetId) {
    return { success: false, syncedToGoogleSheets: false, message: 'Student project spreadsheet ID is not configured.', error: 'Missing spreadsheet ID.' };
  }

  try {
    const auth = new google.auth.JWT({ email: creds.client_email, key: creds.private_key, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const exists = (meta.data.sheets || []).some((sheet) => sheet.properties?.title?.toLowerCase() === tabName.toLowerCase());

    if (!exists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests: [{ addSheet: { properties: { title: tabName, gridProperties: { rowCount: 1000, columnCount: 15 } } } }] },
      });
    }

    const headerResponse = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${tabName}!A1:F1` });
    const headers = headerResponse.data.values?.[0] as string[] | undefined;
    if (!headers || headers.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${tabName}!A1:F1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [['Team Name', 'Team Lead', 'Team members', 'Theme', 'Project Title', 'Project Description']] },
      });
    }

    const detailHeaders = [
      'Project Overview',
      'Objectives',
      'Technology Stack',
      'Uniqueness & Innovation',
      'Target Users & Impact',
    ];
    const extensionResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tabName}!H1:L1`,
    });
    const extensionHeaders = extensionResponse.data.values?.[0] as string[] | undefined;
    if (!extensionHeaders || extensionHeaders.every((header) => !String(header || '').trim())) {
      const extensionData = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${tabName}!H2:L`,
      });
      const extensionColumnsInUse = (extensionData.data.values || []).some((row) =>
        row.some((value) => String(value || '').trim())
      );
      if (extensionColumnsInUse) {
        throw new Error('Student proposal detail columns H:L already contain data; refusing to overwrite sheet data.');
      }
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${tabName}!H1:L1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [detailHeaders] },
      });
    } else if (detailHeaders.some((header, index) => extensionHeaders[index]?.trim() !== header)) {
      throw new Error('Student proposal detail columns H:L already contain different headers; refusing to overwrite sheet data.');
    }

    const teamHeaders = [
      'Team Strength',
      'Why Should We Select Your Team?',
      'Project GitHub Repository (Optional)',
    ];
    const teamHeaderResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tabName}!M1:O1`,
    });
    const existingTeamHeaders = teamHeaderResponse.data.values?.[0] as string[] | undefined;
    if (!existingTeamHeaders || existingTeamHeaders.every((header) => !String(header || '').trim())) {
      const teamData = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${tabName}!M2:O`,
      });
      const teamColumnsInUse = (teamData.data.values || []).some((row) =>
        row.some((value) => String(value || '').trim())
      );
      if (teamColumnsInUse) {
        throw new Error('Student team detail columns M:O already contain data; refusing to overwrite sheet data.');
      }
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${tabName}!M1:O1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [teamHeaders] },
      });
    } else if (teamHeaders.some((header, index) => existingTeamHeaders[index]?.trim() !== header)) {
      throw new Error('Student team detail columns M:O already contain different headers; refusing to overwrite sheet data.');
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A:O`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[
          submission.teamName,
          submission.teamLead,
          submission.teamMembers,
          submission.theme,
          submission.projectTitle,
          submission.projectDescription,
          '',
          submission.projectOverview,
          submission.objectives,
          submission.technologyStack,
          submission.uniqueness,
          submission.targetUsersImpact,
          submission.teamStrength,
          submission.selectionReason,
          submission.projectGithubRepo,
        ]],
      },
    });

    return { success: true, syncedToGoogleSheets: true, message: 'Project proposal saved to Google Sheets.', sheetId: spreadsheetId, clientEmail: creds.client_email };
  } catch (error: any) {
    const message = error?.status === 403 || error?.code === 403
      ? `Permission denied. Share '${creds.client_email}' as an Editor on the spreadsheet.`
      : error?.status === 404 || error?.code === 404
        ? 'Google Spreadsheet was not found. Verify the Student Project spreadsheet ID.'
        : error?.message || 'Google Sheets submission failed.';
    return { success: false, syncedToGoogleSheets: false, message: 'Unable to save project proposal.', sheetId: spreadsheetId, clientEmail: creds.client_email, error: message };
  }
}

export async function appendLeadToGoogleSheet(lead: LeadSubmission): Promise<{
  success: boolean;
  syncedToGoogleSheets: boolean;
  message: string;
  sheetId?: string;
  clientEmail?: string;
  error?: string;
}> {
  const creds = getServiceAccountCredentials();
  const spreadsheetId = getSpreadsheetId();
  const tabName = getSpreadsheetTabName();

  if (!creds || !creds.client_email || !creds.private_key) {
    return {
      success: true,
      syncedToGoogleSheets: false,
      message: 'Consultation recorded locally. Google Sheets credentials not configured yet (set GOOGLE_SERVICE_ACCOUNT_JSON in environment).'
    };
  }

  if (!spreadsheetId) {
    return {
      success: true,
      syncedToGoogleSheets: false,
      clientEmail: creds.client_email,
      message: 'Consultation recorded locally. Google Sheet ID not configured yet (set GOOGLE_SHEET_ID in environment).'
    };
  }

  try {
    const auth = new google.auth.JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Step 1: Check spreadsheet metadata and ensure target tab exists
    let sheetExists = false;
    try {
      const meta = await sheets.spreadsheets.get({ spreadsheetId });
      const sheetsList = meta.data.sheets || [];
      sheetExists = sheetsList.some(s => s.properties?.title?.toLowerCase() === tabName.toLowerCase());

      if (!sheetExists && sheetsList.length > 0) {
        // If tab doesn't exist, create it with requested tabName
        try {
          await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
              requests: [
                {
                  addSheet: {
                    properties: {
                      title: tabName,
                      gridProperties: { rowCount: 1000, columnCount: 15 }
                    }
                  }
                }
              ]
            }
          });
          sheetExists = true;
        } catch {
          // Tab creation fallback
        }
      }
    } catch (metaErr: any) {
      if (metaErr.status === 403 || metaErr.code === 403) {
        throw new Error(
          `Permission Denied (403): Please share your Google Sheet with '${creds.client_email}' as an 'Editor'.`
        );
      }
      if (metaErr.status === 404 || metaErr.code === 404) {
        throw new Error(`Google Sheet not found (404). Please verify your GOOGLE_SHEET_ID: ${spreadsheetId}`);
      }
    }

    const targetTab = sheetExists ? tabName : (process.env.GOOGLE_SHEET_TAB_NAME || 'leads');

    // Step 2: Read existing header row (row 1) from the sheet
    let rowData: (string | number)[] = [];
    try {
      const headerCheck = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${targetTab}!1:1`
      });

      const existingHeaders = headerCheck.data.values?.[0] as string[] | undefined;

      if (existingHeaders && existingHeaders.length > 0) {
        // Match existing sheet columns perfectly!
        rowData = mapLeadToExistingHeaders(existingHeaders, lead);
      } else {
        // Initialize standard header row if sheet is completely empty
        const defaultHeaders = [
          'Timestamp (IST)',
          'Inquiry ID',
          'Client Full Name',
          'Business Email',
          'Phone / WhatsApp',
          'Company Name',
          'Company Website',
          'Selected Capabilities',
          'Engagement Model',
          'Budget Range',
          'Timeline Urgency',
          'Consultation Project Brief',
          'Status'
        ];

        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${targetTab}!A1:M1`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [defaultHeaders]
          }
        });

        const formattedDate = new Date(lead.createdAt || new Date()).toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'medium',
          timeStyle: 'medium'
        });
        const servicesStr = Array.isArray(lead.selectedServices)
          ? lead.selectedServices.join(', ')
          : lead.selectedServices || 'None specified';

        rowData = [
          formattedDate,
          lead.id,
          lead.fullName,
          lead.email,
          `'${lead.phone.startsWith('+') ? lead.phone : `+91 ${lead.phone}`}`,
          lead.companyName || 'Undisclosed Entity',
          lead.companyWebsite || 'N/A',
          servicesStr,
          lead.engagementModel || 'Project-Based Work',
          lead.budgetRange || 'Unspecified',
          lead.timeline || '1 - 3 Months',
          lead.projectDescription || 'No description provided',
          lead.status || 'new'
        ];
      }
    } catch {
      // Fallback row if header reading fails
      rowData = [
        lead.fullName,
        lead.email,
        lead.phone,
        lead.companyName,
        Array.isArray(lead.selectedServices) ? lead.selectedServices.join(', ') : lead.selectedServices,
        lead.projectDescription
      ];
    }

    // Step 3: Append the customer consultation brief row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${targetTab}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData]
      }
    });

    syncCount += 1;
    lastSyncTime = new Date().toISOString();

    return {
      success: true,
      syncedToGoogleSheets: true,
      sheetId: spreadsheetId,
      clientEmail: creds.client_email,
      message: `Consultation successfully synced to Google Sheet '${targetTab}'.`
    };
  } catch (error: any) {
    console.error('Error appending row to Google Sheets:', error?.message || error);
    const safeError = sanitizeErrorMessage(error);
    return {
      success: true, // UX doesn't break
      syncedToGoogleSheets: false,
      clientEmail: creds.client_email,
      sheetId: spreadsheetId,
      message: 'Consultation saved, but failed to sync to Google Sheet: ' + safeError,
      error: safeError
    };
  }
}
