import type { VercelRequest, VercelResponse } from "@vercel/node";
import { google } from "googleapis";
import nodemailer from "nodemailer";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface LeadSubmission {
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

// ─────────────────────────────────────────────────────────────
// Credential helpers — reads ONLY from environment variables
// ─────────────────────────────────────────────────────────────
function getCredentials(): { client_email: string; private_key: string } | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) return null;
  try {
    let jsonStr = raw;
    // Handle base64-encoded JSON
    if (!raw.startsWith("{")) {
      try {
        const decoded = Buffer.from(raw, "base64").toString("utf-8");
        if (decoded.trim().startsWith("{")) jsonStr = decoded;
      } catch { /* not base64 */ }
    }
    const parsed = JSON.parse(jsonStr);
    if (parsed.client_email && parsed.private_key) {
      return {
        client_email: parsed.client_email,
        private_key: parsed.private_key.replace(/\\n/g, "\n"),
      };
    }
  } catch { /* malformed JSON */ }
  return null;
}

function getSpreadsheetId(): string {
  const raw = process.env.GOOGLE_SHEET_ID?.trim() ?? "";
  const urlMatch = raw.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]{20,65})/);
  if (urlMatch?.[1]) return urlMatch[1];
  const idMatch = raw.match(/([a-zA-Z0-9-_]{30,60})/);
  if (idMatch?.[1]) return idMatch[1];
  return raw;
}

function getTabName(): string {
  return process.env.GOOGLE_SHEET_TAB_NAME?.trim() || "Sheet1";
}

function sanitizeError(err?: unknown): string {
  const msg = err instanceof Error ? err.message : String(err ?? "");
  if (/PRIVATE KEY|BEGIN|{|}/.test(msg)) return "Authentication failed with Google Sheets API.";
  if (/403|Permission/.test(msg))        return "Permission Denied (403): Share the sheet with the service account as Editor.";
  if (/404|not found/.test(msg))         return "Google Sheet not found (404): Check GOOGLE_SHEET_ID.";
  if (/429|RESOURCE_EXHAUSTED/.test(msg)) return "Google Sheets rate limit exceeded. Retry shortly.";
  return msg.split("\n")[0].slice(0, 150) || "Spreadsheet sync error.";
}

// ─────────────────────────────────────────────────────────────
// Google Sheets append
// ─────────────────────────────────────────────────────────────
async function appendToSheet(lead: LeadSubmission): Promise<{
  syncedToGoogleSheets: boolean;
  message: string;
  sheetId?: string;
  clientEmail?: string;
  error?: string;
}> {
  const creds = getCredentials();
  const spreadsheetId = getSpreadsheetId();
  const tabName = getTabName();

  if (!creds) {
    return { syncedToGoogleSheets: false, message: "GOOGLE_SERVICE_ACCOUNT_JSON not configured." };
  }
  if (!spreadsheetId) {
    return { syncedToGoogleSheets: false, clientEmail: creds.client_email, message: "GOOGLE_SHEET_ID not configured." };
  }

  try {
    const auth = new google.auth.JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    // Ensure tab exists
    let tabExists = false;
    try {
      const meta = await sheets.spreadsheets.get({ spreadsheetId });
      const list = meta.data.sheets ?? [];
      tabExists = list.some((s) => s.properties?.title?.toLowerCase() === tabName.toLowerCase());
      if (!tabExists) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [{ addSheet: { properties: { title: tabName, gridProperties: { rowCount: 1000, columnCount: 15 } } } }],
          },
        });
        tabExists = true;
      }
    } catch (metaErr: any) {
      if (metaErr?.code === 403 || metaErr?.status === 403)
        throw new Error(`Permission Denied (403): Share '${spreadsheetId}' with '${creds.client_email}' as Editor.`);
      if (metaErr?.code === 404 || metaErr?.status === 404)
        throw new Error(`Sheet not found (404): GOOGLE_SHEET_ID = ${spreadsheetId}`);
    }

    const targetTab = tabExists ? tabName : "Sheet1";

    // Read headers or initialise them
    const formattedDate = new Date(lead.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "medium",
    });
    const servicesStr = lead.selectedServices.join(", ") || "None specified";
    let rowData: (string | number)[];

    try {
      const headerRes = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${targetTab}!1:1` });
      const headers = headerRes.data.values?.[0] as string[] | undefined;

      if (headers && headers.length > 0) {
        rowData = headers.map((h) => {
          const u = h.trim().toUpperCase();
          if (u.includes("FULL NAME") || (u.includes("NAME") && !u.includes("COMPANY"))) return lead.fullName;
          if (u.includes("EMAIL"))   return lead.email;
          if (u.includes("PHONE") || u.includes("WHATSAPP") || u.includes("MOBILE") || u.includes("CONTACT"))
            return `'+91 ${lead.phone}`;
          if (u.includes("COMPANY") || u.includes("ORGANIZATION")) return lead.companyName || "Undisclosed";
          if (u.includes("WEBSITE") || u.includes("URL")) return lead.companyWebsite || "N/A";
          if (u.includes("SERVICE")) return servicesStr;
          if (u.includes("BRIEF") || u.includes("DESCRIPTION") || u.includes("PROJECT")) {
            return `${lead.projectDescription}\n\n[Model: ${lead.engagementModel} | Budget: ${lead.budgetRange} | Timeline: ${lead.timeline} | Ref: ${lead.id}]`;
          }
          if (u.includes("BUDGET"))   return lead.budgetRange;
          if (u.includes("TIMELINE")) return lead.timeline;
          if (u.includes("MODEL") || u.includes("ENGAGEMENT")) return lead.engagementModel;
          if (u.includes("STATUS"))   return lead.status || "new";
          if (u.includes("DATE") || u.includes("TIME") || u.includes("TIMESTAMP")) return formattedDate;
          if (u.includes("ID") || u.includes("REF")) return lead.id;
          return "";
        });
      } else {
        // Initialise headers on first use
        const defaultHeaders = [
          "Timestamp (IST)", "Inquiry ID", "Client Full Name", "Business Email",
          "Phone / WhatsApp", "Company Name", "Company Website", "Selected Capabilities",
          "Engagement Model", "Budget Range", "Timeline Urgency", "Consultation Project Brief", "Status",
        ];
        await sheets.spreadsheets.values.update({
          spreadsheetId, range: `${targetTab}!A1:M1`,
          valueInputOption: "USER_ENTERED",
          requestBody: { values: [defaultHeaders] },
        });
        rowData = [
          formattedDate, lead.id, lead.fullName, lead.email,
          `'+91 ${lead.phone}`, lead.companyName || "Undisclosed",
          lead.companyWebsite || "N/A", servicesStr, lead.engagementModel,
          lead.budgetRange, lead.timeline, lead.projectDescription, lead.status || "new",
        ];
      }
    } catch {
      rowData = [formattedDate, lead.id, lead.fullName, lead.email, lead.phone,
        lead.companyName, servicesStr, lead.projectDescription];
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${targetTab}!A:Z`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [rowData] },
    });

    return {
      syncedToGoogleSheets: true,
      sheetId: spreadsheetId,
      clientEmail: creds.client_email,
      message: `Lead synced to '${targetTab}' successfully.`,
    };
  } catch (err) {
    const safe = sanitizeError(err);
    return {
      syncedToGoogleSheets: false,
      clientEmail: getCredentials()?.client_email,
      sheetId: spreadsheetId,
      message: "Saved locally; failed to sync to Sheet: " + safe,
      error: safe,
    };
  }
}

// ─────────────────────────────────────────────────────────────
// Email notification
// ─────────────────────────────────────────────────────────────
async function sendEmailNotification(lead: LeadSubmission): Promise<{
  success: boolean;
  message: string;
  error?: string;
}> {
  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.trim();

  if (!gmailUser || !gmailPass) {
    const missing = [!gmailUser ? "GMAIL_USER" : "", !gmailPass ? "GMAIL_APP_PASSWORD" : ""]
      .filter(Boolean)
      .join(", ");
    return {
      success: false,
      message: `Email notification failed: missing ${missing}.`,
      error: `Set ${missing} in the production environment.`,
    };
  }

  const services = lead.selectedServices.join(", ") || "None";
  const date = new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailPass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  try {
    await transporter.sendMail({
    from: `"RovianX Solutions" <${gmailUser}>`,
    to: "rovianxsolution@gmail.com",
    subject: `🔔 New Inquiry — ${lead.fullName} [${lead.id}]`,
    html: `<div style="font-family:sans-serif;max-width:580px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#0B367C,#1E4BA8);padding:28px 32px;color:#fff">
        <h2 style="margin:0;font-size:20px">🔔 New Consultation Inquiry</h2>
        <p style="margin:6px 0 0;opacity:.8;font-size:13px">${date}</p>
        <span style="display:inline-block;background:#2563EB;padding:2px 10px;border-radius:5px;font-size:11px;font-weight:700;margin-top:10px">${lead.id}</span>
      </div>
      <div style="padding:24px 32px">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tr><td style="color:#64748b;padding:6px 0;width:140px">Name</td><td style="font-weight:600">${lead.fullName}</td></tr>
          <tr><td style="color:#64748b;padding:6px 0">Email</td><td>${lead.email}</td></tr>
          <tr><td style="color:#64748b;padding:6px 0">Phone</td><td>${lead.phone}</td></tr>
          <tr><td style="color:#64748b;padding:6px 0">Company</td><td>${lead.companyName}</td></tr>
          <tr><td style="color:#64748b;padding:6px 0">Website</td><td>${lead.companyWebsite || "N/A"}</td></tr>
          <tr><td style="color:#64748b;padding:6px 0">Services</td><td>${services}</td></tr>
          <tr><td style="color:#64748b;padding:6px 0">Budget</td><td>${lead.budgetRange}</td></tr>
          <tr><td style="color:#64748b;padding:6px 0">Timeline</td><td>${lead.timeline}</td></tr>
          <tr><td style="color:#64748b;padding:6px 0">Model</td><td>${lead.engagementModel}</td></tr>
        </table>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px;margin-top:16px;font-size:13px;white-space:pre-wrap">${lead.projectDescription}</div>
      </div>
      <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:14px 32px;text-align:center;font-size:11px;color:#94a3b8">
        RovianX Solutions &mdash; ${lead.id}
      </div>
    </div>`,
    text: `New Inquiry\nName: ${lead.fullName}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nServices: ${services}\nBudget: ${lead.budgetRange}\nBrief: ${lead.projectDescription}\nRef: ${lead.id}`,
    });
    return { success: true, message: "Notification email sent to rovianxsolution@gmail.com." };
  } catch (err: any) {
    const details = [err?.code, err?.responseCode, err?.response, err?.message]
      .filter(Boolean)
      .join(" - ")
      .split("\n")[0]
      .slice(0, 300);
    return {
      success: false,
      message: "Failed to send notification email.",
      error: details || "Unknown SMTP error.",
    };
  }
}

// ─────────────────────────────────────────────────────────────
// Vercel handler
// ─────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")   return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = req.body ?? {};

    // Validation
    const fullName    = String(body.fullName    ?? "").trim();
    const email       = String(body.email       ?? "").trim();
    const rawPhone    = String(body.phone       ?? "").trim();
    const phoneDigits = rawPhone.replace(/\D/g, "");

    if (!fullName)                           return res.status(400).json({ error: "Full name is required." });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                                              return res.status(400).json({ error: "A valid email address is required." });
    if (phoneDigits.length < 7 || phoneDigits.length > 15)
                                              return res.status(400).json({ error: "A valid phone number is required." });

    const lead: LeadSubmission = {
      id:                 body.id         ?? `RX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt:          body.createdAt  ?? new Date().toISOString(),
      fullName,
      email,
      phone:              phoneDigits,
      companyName:        String(body.companyName        ?? "Undisclosed Entity").trim(),
      companyWebsite:     String(body.companyWebsite     ?? "").trim(),
      selectedServices:   Array.isArray(body.selectedServices) ? body.selectedServices : [],
      engagementModel:    String(body.engagementModel    ?? "Project-Based Work").trim(),
      budgetRange:        String(body.budgetRange        ?? "₹50,000 - ₹1,50,000").trim(),
      timeline:           String(body.timeline           ?? "1 - 3 Months").trim(),
      projectDescription: String(body.projectDescription ?? "Standard consultation requested.").trim(),
      status:             body.status ?? "new",
    };

    // Append to Google Sheet
    const sheetsResult = await appendToSheet(lead);

    // Wait for the notification so delivery failures are visible to the caller and logs.
    const emailResult = await sendEmailNotification(lead);
    if (emailResult.success) {
      console.log("Notification email sent:", emailResult.message);
    } else {
      console.error("Email notification failed:", emailResult.message, emailResult.error || "");
    }

    return res.status(200).json({
      success:              true,
      lead,
      syncedToGoogleSheets: sheetsResult.syncedToGoogleSheets,
      sheetMessage:         sheetsResult.message,
      sheetId:              sheetsResult.sheetId,
      clientEmail:          sheetsResult.clientEmail,
      sheetError:           sheetsResult.error,
      emailNotification:    emailResult.success,
      emailMessage:         emailResult.message,
      emailError:           emailResult.error,
    });
  } catch (err: any) {
    console.error("api/leads error:", err?.message ?? err);
    return res.status(500).json({ error: "Server error processing inquiry.", message: sanitizeError(err) });
  }
}
