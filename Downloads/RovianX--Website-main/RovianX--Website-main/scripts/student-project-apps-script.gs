// Google Apps Script for the RovianX Student Project Submission Portal
// Spreadsheet: Student_Project_Proposals
// Tab: Submissions (set SHEET_NAME below if it differs)

const SPREADSHEET_ID = '18Cw4yLpduu6FqLDtmn386QmTPopsU9AofUR6TR0faIk';
const SHEET_NAME = 'Submissions';

function doPost(e) {
  return handleRequest(e);
}

function doOptions(e) {
  return jsonResponse({ success: true });
}

function handleRequest(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: 'No submission data received.' }, 400);
    }

    const data = e.parameter && Object.keys(e.parameter).length
      ? e.parameter
      : JSON.parse(e.postData.contents);
    const fields = ['teamName', 'teamLead', 'teamMembers', 'theme', 'projectFocusArea', 'projectTitle', 'projectDescription'];
    for (const field of fields) {
      if (!String(data[field] || '').trim()) {
        return jsonResponse({ success: false, error: field + ' is required.' }, 400);
      }
    }
    if (String(data.projectDescription).trim().length < 30) {
      return jsonResponse({ success: false, error: 'Project description must be at least 30 characters.' }, 400);
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    // Adds only the missing G1 header; all existing rows and columns remain untouched.
    const headers = sheet.getRange(1, 1, 1, 7).getValues()[0];
    const requiredHeaders = [
      'Team Name', 'Team Lead', 'Team members', 'Theme', 'Project Title', 'Project Description', 'Project Focus Area'
    ];
    if (!headers.some((value) => String(value || '').trim())) {
      sheet.getRange(1, 1, 1, 7).setValues([requiredHeaders]);
    } else if (!String(headers[6] || '').trim()) {
      sheet.getRange(1, 7).setValue('Project Focus Area');
    }

    sheet.appendRow([
      String(data.teamName).trim(),
      String(data.teamLead).trim(),
      String(data.teamMembers).trim(),
      String(data.theme).trim(),
      String(data.projectTitle).trim(),
      String(data.projectDescription).trim(),
      String(data.projectFocusArea).trim()
    ]);

    return jsonResponse({ success: true, sheetName: SHEET_NAME, sheetId: spreadsheet.getId() });
  } catch (error) {
    return jsonResponse({ success: false, error: String(error && error.message ? error.message : error) }, 500);
  }
}

function jsonResponse(payload, statusCode) {
  const status = statusCode || 200;
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
