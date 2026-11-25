import type { VercelRequest, VercelResponse } from "@vercel/node";

interface StudentProjectSubmission {
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
}

const ALLOWED_THEMES = new Set([
  "Sustainability",
  "Women safety and security",
  "Cyber threats and challenges",
  "Research and development",
  "Open source contribution",
  "Profile building and career mapping",
  "Climatic change",
  "Planet and space",
  "Branding and money making",
  "Everyday life",
]);

function getText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ success: false, error: "Method not allowed." });
  }

  const body = req.body && typeof req.body === "object" ? req.body as Record<string, unknown> : {};
  const submission: StudentProjectSubmission = {
    teamName: getText(body.teamName),
    teamLead: getText(body.teamLead),
    teamMembers: getText(body.teamMembers),
    theme: getText(body.theme),
    projectTitle: getText(body.projectTitle),
    projectDescription: getText(body.projectDescription),
    projectOverview: getText(body.projectOverview),
    objectives: getText(body.objectives),
    technologyStack: getText(body.technologyStack),
    uniqueness: getText(body.uniqueness),
    targetUsersImpact: getText(body.targetUsersImpact),
    teamStrength: getText(body.teamStrength),
    selectionReason: getText(body.selectionReason),
    projectGithubRepo: getText(body.projectGithubRepo),
  };

  const requiredFields: Array<[keyof StudentProjectSubmission, string]> = [
    ["teamName", "Team name"],
    ["teamLead", "Team lead"],
    ["teamMembers", "Team members"],
    ["theme", "Theme"],
    ["projectTitle", "Project title"],
    ["projectDescription", "Project description"],
    ["projectOverview", "Project overview"],
    ["objectives", "Objectives"],
    ["technologyStack", "Technology stack"],
    ["uniqueness", "Uniqueness and innovation"],
    ["targetUsersImpact", "Target users and impact"],
    ["teamStrength", "Team strength"],
    ["selectionReason", "Why your team should be selected"],
  ];

  for (const [field, label] of requiredFields) {
    if (!submission[field]) {
      return res.status(400).json({ success: false, error: `${label} is required.` });
    }
  }
  if (!ALLOWED_THEMES.has(submission.theme)) {
    return res.status(400).json({ success: false, error: "Please choose a valid project theme." });
  }
  if (submission.projectDescription.length < 30) {
    return res.status(400).json({ success: false, error: "Project description must be at least 30 characters." });
  }
  if (submission.projectGithubRepo && !/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?\/?$/.test(submission.projectGithubRepo)) {
    return res.status(400).json({ success: false, error: "Enter a valid GitHub repository URL or leave it blank." });
  }

  const appsScriptUrl = process.env.STUDENT_PROJECT_APPS_SCRIPT_URL?.trim();
  if (!appsScriptUrl) {
    return res.status(500).json({
      success: false,
      error: "Student Hub submission is not configured. Set STUDENT_PROJECT_APPS_SCRIPT_URL in the deployment environment.",
    });
  }
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(appsScriptUrl)) {
    return res.status(500).json({
      success: false,
      error: "STUDENT_PROJECT_APPS_SCRIPT_URL must be the deployed Google Apps Script Web App URL ending in /exec.",
    });
  }

  try {
    const formData = new URLSearchParams({
      ...submission,
      submittedAt: new Date().toISOString(),
    });
    const scriptResponse = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: formData.toString(),
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });
    const responseText = await scriptResponse.text();
    let scriptResult: Record<string, unknown>;
    try {
      scriptResult = JSON.parse(responseText) as Record<string, unknown>;
    } catch {
      console.error("Student Hub Apps Script returned non-JSON:", scriptResponse.status, responseText.slice(0, 500));
      return res.status(502).json({
        success: false,
        error: "Google Apps Script returned an unreadable response. Check that the deployed Web App is accessible to anyone and points to the latest version.",
      });
    }

    const scriptSucceeded = scriptResult.success === true || scriptResult.status === "success";
    if (!scriptResponse.ok || !scriptSucceeded) {
      const error = typeof scriptResult.error === "string"
        ? scriptResult.error
        : typeof scriptResult.message === "string"
          ? scriptResult.message
          : `Google Apps Script rejected the submission (HTTP ${scriptResponse.status}).`;
      console.error("Student Hub Apps Script submission failed:", scriptResponse.status, error);
      if (/projectFocusArea is required/i.test(error)) {
        return res.status(502).json({
          success: false,
          error: "The deployed Apps Script still requires Project Focus Area. Update it with scripts/student-project-apps-script.gs and redeploy a new version.",
        });
      }
      return res.status(502).json({ success: false, error });
    }

    return res.status(200).json({
      success: true,
      message: "Project proposal submitted successfully.",
      sheetName: scriptResult.sheetName || scriptResult.sheet || "Submissions",
      row: scriptResult.row,
    });
  } catch (error) {
    console.error("Student Hub Apps Script request failed:", error);
    return res.status(502).json({
      success: false,
      error: error instanceof Error ? `Could not connect to Google Apps Script: ${error.message}` : "Could not connect to Google Apps Script.",
    });
  }
}
