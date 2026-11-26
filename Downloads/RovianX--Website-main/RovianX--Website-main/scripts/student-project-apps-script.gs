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
}

function jsonResponse(payload, statusCode) {
  const status = statusCode || 200;
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
