// Google Apps Script for the RovianX Student Project Submission Portal
// Spreadsheet: Student_Project_Proposals
// Tab: Submissions (set SHEET_NAME below if it differs)

const SPREADSHEET_ID = '18Cw4yLpduu6FqLDtmn386QmTPopsU9AofUR6TR0faIk';
const SHEET_NAME = 'Submissions';
const ALLOWED_THEMES = [
  'Sustainability',
  'Women safety and security',
  'Cyber threats and challenges',
  'Research and development',
  'Open source contribution',
  'Profile building and career mapping',
  'Climatic change',
  'Planet and space',
  'Branding and money making',
  'Everyday life'
];
const PROPOSAL_DETAIL_HEADERS = [
  'Project Overview',
  'Objectives',
  'Technology Stack',
  'Uniqueness & Innovation',
  'Target Users & Impact'
];
const TEAM_DETAIL_HEADERS = [
  'Team Strength',
  'Why Should We Select Your Team?',
  'Project GitHub Repository (Optional)'
];

function doPost(e) {
  return handleRequest(e);
}

function doOptions(e) {
  return jsonResponse({ success: true });
}

function handleRequest(e) {
  return jsonResponse({
    success: false,
    error: 'Time is up! The 36-hour hackathon submission period has ended, and project proposals are no longer being accepted.'
  }, 403);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: 'No submission data received.' }, 400);
    }

    const data = e.parameter && Object.keys(e.parameter).length
      ? e.parameter
      : JSON.parse(e.postData.contents);
    const fields = [
      'teamName', 'teamLead', 'teamMembers', 'theme', 'projectTitle', 'projectDescription',
      'projectOverview', 'objectives', 'technologyStack', 'uniqueness', 'targetUsersImpact',
      'teamStrength', 'selectionReason'
    ];
    for (const field of fields) {
      if (!String(data[field] || '').trim()) {
        return jsonResponse({ success: false, error: field + ' is required.' }, 400);
      }
    }
    if (Object.prototype.hasOwnProperty.call(data, 'projectFocusArea') && String(data.projectFocusArea || '').trim()) {
      return jsonResponse({ success: false, error: 'Project Focus Area is no longer collected. Please update the website integration.' }, 400);
    }
    if (ALLOWED_THEMES.indexOf(String(data.theme).trim()) === -1) {
      return jsonResponse({ success: false, error: 'Please choose a valid project theme.' }, 400);
    }
    if (String(data.projectDescription).trim().length < 30) {
      return jsonResponse({ success: false, error: 'Project description must be at least 30 characters.' }, 400);
    }
    const projectGithubRepo = String(data.projectGithubRepo || '').trim();
    if (projectGithubRepo && !/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?\/?$/.test(projectGithubRepo)) {
      return jsonResponse({ success: false, error: 'Enter a valid GitHub repository URL or leave it blank.' }, 400);
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    // Keep A:F stable and preserve the legacy G column; new proposal details start at H.
    const headers = sheet.getRange(1, 1, 1, 6).getValues()[0];
    const requiredHeaders = [
      'Team Name', 'Team Lead', 'Team members', 'Theme', 'Project Title', 'Project Description'
    ];
    if (!headers.some((value) => String(value || '').trim())) {
      sheet.getRange(1, 1, 1, 6).setValues([requiredHeaders]);
    }

    const lastColumn = Math.max(sheet.getLastColumn(), 6);
    const allHeaders = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0];
    let detailStartColumn = 0;
    for (let column = 8; column <= lastColumn - PROPOSAL_DETAIL_HEADERS.length + 1; column += 1) {
      const existing = allHeaders.slice(column - 1, column - 1 + PROPOSAL_DETAIL_HEADERS.length);
      if (PROPOSAL_DETAIL_HEADERS.every((header, index) => existing[index] === header)) {
        detailStartColumn = column;
        break;
      }
    }
    if (!detailStartColumn) {
      detailStartColumn = Math.max(lastColumn + 1, 8);
      sheet.getRange(1, detailStartColumn, 1, PROPOSAL_DETAIL_HEADERS.length).setValues([PROPOSAL_DETAIL_HEADERS]);
    }

    const teamHeadersStart = detailStartColumn + PROPOSAL_DETAIL_HEADERS.length;
    let teamStartColumn = 0;
    for (let column = teamHeadersStart; column <= lastColumn - TEAM_DETAIL_HEADERS.length + 1; column += 1) {
      const existing = allHeaders.slice(column - 1, column - 1 + TEAM_DETAIL_HEADERS.length);
      if (TEAM_DETAIL_HEADERS.every((header, index) => existing[index] === header)) {
        teamStartColumn = column;
        break;
      }
    }
    if (!teamStartColumn) {
      teamStartColumn = Math.max(lastColumn + 1, teamHeadersStart);
      sheet.getRange(1, teamStartColumn, 1, TEAM_DETAIL_HEADERS.length).setValues([TEAM_DETAIL_HEADERS]);
    }

    const row = [
      String(data.teamName).trim(),
      String(data.teamLead).trim(),
      String(data.teamMembers).trim(),
      String(data.theme).trim(),
      String(data.projectTitle).trim(),
      String(data.projectDescription).trim()
    ];
    while (row.length < detailStartColumn - 1) row.push('');
    row.push(
      String(data.projectOverview).trim(),
      String(data.objectives).trim(),
      String(data.technologyStack).trim(),
      String(data.uniqueness).trim(),
      String(data.targetUsersImpact).trim()
    );
    while (row.length < teamStartColumn - 1) row.push('');
    row.push(
      String(data.teamStrength).trim(),
      String(data.selectionReason).trim(),
      projectGithubRepo
    );
    sheet.appendRow(row);

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
