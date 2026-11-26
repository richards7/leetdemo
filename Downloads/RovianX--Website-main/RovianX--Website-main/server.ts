import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { 
  appendLeadToGoogleSheet, 
  getSheetsStatus, 
  sanitizeErrorMessage,
  appendStudentProjectToGoogleSheet,
  LeadSubmission 
} from "./server/googleSheets.js";
import { sendLeadNotificationEmail, verifyGmailSmtp } from "./server/emailNotification.js";
import { blogRouter } from "./server/blogApi.js";
import { buildRobotsTxt, buildSitemapXml, getPublicSitemapCategories, getPublishedSitemapPosts, getSiteOrigin } from "./server/sitemap.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// In-memory persistent buffer for consultation submissions
const serverLeadsStore: LeadSubmission[] = [];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Security headers & CORS middleware
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");

    // Allow requests from same-origin and development preview domains
    const origin = req.headers.origin;
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.setHeader("Access-Control-Max-Age", "86400");
    }

    if (req.method === "OPTIONS") {
      res.sendStatus(204);
      return;
    }
    next();
  });

  app.use(express.json({ limit: "1mb" }));
  app.use("/api/blog", blogRouter);

  app.get("/sitemap.xml", async (req, res) => {
    try {
      const origin = getSiteOrigin();
      const [posts, categories] = await Promise.all([getPublishedSitemapPosts(), getPublicSitemapCategories()]);
      res.type("application/xml").send(buildSitemapXml(origin, true, posts, categories));
    } catch (error) {
      console.error("Sitemap generation failed:", error instanceof Error ? error.message : error);
      res.status(500).send("Sitemap generation failed.");
    }
  });

  app.get("/robots.txt", (req, res) => {
    try {
      const origin = getSiteOrigin();
      res.type("text/plain").send(buildRobotsTxt(origin));
    } catch (error) {
      console.error("Robots generation failed:", error instanceof Error ? error.message : error);
      res.status(500).send("Robots file unavailable.");
    }
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Google Sheets connection diagnostic & setup status
  app.get("/api/sheets/status", (req, res) => {
    try {
      const status = getSheetsStatus();
      res.json(status);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/student-projects", async (req, res) => {
    res.status(403).json({
      success: false,
      error: 'Time is up! The 36-hour hackathon submission period has ended, and project proposals are no longer being accepted.',
    });
    return;

    try {
      const body = req.body || {};
      const allowedThemes = [
        'Sustainability',
        'Women safety and security',
        'Cyber threats and challenges',
        'Research and development',
        'Open source contribution',
        'Profile building and career mapping',
        'Climatic change',
        'Planet and space',
        'Branding and money making',
        'Everyday life',
      ];
      const requiredTextFields = {
        teamName: 'Team name', teamLead: 'Team lead', teamMembers: 'Team members',
        theme: 'Theme', projectTitle: 'Project title', projectDescription: 'Project description',
        projectOverview: 'Project overview', objectives: 'Objectives',
        technologyStack: 'Technology stack', uniqueness: 'Uniqueness and innovation',
        targetUsersImpact: 'Target users and impact', teamStrength: 'Team strength',
        selectionReason: 'Why your team should be selected'
      } as const;

      for (const [key, label] of Object.entries(requiredTextFields)) {
        if (!String(body[key] || '').trim()) {
          res.status(400).json({ success: false, error: `${label} is required.` });
          return;
        }
      }
      if (String(body.projectDescription).trim().length < 30) {
        res.status(400).json({ success: false, error: 'Project description must be at least 30 characters.' });
        return;
      }
      if (!allowedThemes.includes(String(body.theme).trim())) {
        res.status(400).json({ success: false, error: 'Please choose a valid project theme.' });
        return;
      }
      const projectGithubRepo = String(body.projectGithubRepo || '').trim();
      if (projectGithubRepo && !/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?\/?$/.test(projectGithubRepo)) {
        res.status(400).json({ success: false, error: 'Enter a valid GitHub repository URL or leave it blank.' });
        return;
      }

      const submission = {
        teamName: String(body.teamName).trim(),
        teamLead: String(body.teamLead).trim(),
        teamMembers: String(body.teamMembers).trim(),
        theme: String(body.theme).trim(),
        projectTitle: String(body.projectTitle).trim(),
        projectDescription: String(body.projectDescription).trim(),
        projectOverview: String(body.projectOverview).trim(),
        objectives: String(body.objectives).trim(),
        technologyStack: String(body.technologyStack).trim(),
        uniqueness: String(body.uniqueness).trim(),
        targetUsersImpact: String(body.targetUsersImpact).trim(),
        teamStrength: String(body.teamStrength).trim(),
        selectionReason: String(body.selectionReason).trim(),
        projectGithubRepo,
        submittedAt: String(body.submittedAt || new Date().toISOString()),
      };

      const appsScriptUrl = process.env.STUDENT_PROJECT_APPS_SCRIPT_URL?.trim();
      if (appsScriptUrl && !appsScriptUrl.includes('YOUR_DEPLOYMENT_ID')) {
        const scriptPayload = new URLSearchParams(
          Object.entries(submission).map(([key, value]) => [key, String(value)])
        );
        const scriptResponse = await fetch(appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body: scriptPayload.toString(),
        });
        const scriptResult = await scriptResponse.json().catch(() => ({ success: false, error: 'The Apps Script returned an invalid response.' }));
        const scriptSucceeded = scriptResult.success === true || scriptResult.status === 'success';
        if (!scriptResponse.ok || !scriptSucceeded) {
          res.status(502).json({ success: false, error: scriptResult.error || scriptResult.message || 'Google Apps Script submission failed.' });
          return;
        }
        res.status(200).json({ success: true, message: 'Project proposal submitted successfully.', sheetName: scriptResult.sheetName || scriptResult.sheet });
        return;
      }

      const result = await appendStudentProjectToGoogleSheet(submission);
      if (!result.syncedToGoogleSheets) {
        res.status(503).json({ success: false, error: result.error || result.message, sheetMessage: result.message });
        return;
      }
      res.status(200).json({ success: true, message: 'Project proposal submitted successfully.', sheetId: result.sheetId });
    } catch (error: any) {
      res.status(500).json({ success: false, error: 'Server could not process the project submission.', message: sanitizeErrorMessage(error) });
    }
  });

  app.get("/api/email-test", async (req, res) => {
    const result = await verifyGmailSmtp();
    res.status(result.success ? 200 : 503).json({
      emailNotification: result.success,
      message: result.message,
      error: result.error,
    });
  });

  // Client Consultation Brief submission endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const body = req.body || {};
      
      // Server-side validation
      const fullName = String(body.fullName || "").trim();
      const email = String(body.email || "").trim();
      const rawPhone = String(body.phone || "").trim();
      const phoneDigits = rawPhone.replace(/\D/g, "");

      if (!fullName) {
        res.status(400).json({ error: "Full name is required." });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        res.status(400).json({ error: "A valid business email address is required." });
        return;
      }

      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        res.status(400).json({ error: "A valid contact phone number is required." });
        return;
      }

      // Duplicate submission prevention (within 30 seconds window)
      const now = Date.now();
      const duplicateLead = serverLeadsStore.find(existing => {
        const leadTime = new Date(existing.createdAt).getTime();
        const isRecent = now - leadTime < 30000;
        const matchesEmail = existing.email.toLowerCase() === email.toLowerCase();
        const matchesPhone = existing.phone.replace(/\D/g, "") === phoneDigits;
        return isRecent && (matchesEmail || matchesPhone);
      });

      if (duplicateLead) {
        res.status(200).json({
          success: true,
          lead: duplicateLead,
          syncedToGoogleSheets: true,
          sheetMessage: "Consultation inquiry already received and recorded.",
          duplicatePrevented: true
        });
        return;
      }

      const leadRecord: LeadSubmission = {
        id: body.id || `RX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: body.createdAt || new Date().toISOString(),
        fullName,
        email,
        phone: phoneDigits,
        companyName: String(body.companyName || "Undisclosed Entity").trim(),
        companyWebsite: String(body.companyWebsite || "").trim(),
        selectedServices: Array.isArray(body.selectedServices) ? body.selectedServices : [],
        engagementModel: String(body.engagementModel || "Project-Based Work").trim(),
        budgetRange: String(body.budgetRange || "₹50,000 - ₹1,50,000").trim(),
        timeline: String(body.timeline || "1 - 3 Months").trim(),
        projectDescription: String(body.projectDescription || "Standard consultation requested.").trim(),
        status: body.status || "new"
      };

      // Save to server store
      serverLeadsStore.unshift(leadRecord);

      // Attempt to append to Google Sheets using the JSON credentials
      const sheetsResult = await appendLeadToGoogleSheet(leadRecord);

      // Send email notification to rovianxsolution@gmail.com
      const emailResult = await sendLeadNotificationEmail(leadRecord);
      if (emailResult.success) {
        console.log('📧 Notification email sent:', emailResult.message);
      } else {
        console.error('Email notification failed:', emailResult.message, emailResult.error || '');
      }

      res.status(200).json({
        success: true,
        lead: leadRecord,
        syncedToGoogleSheets: sheetsResult.syncedToGoogleSheets,
        sheetMessage: sheetsResult.message,
        sheetId: sheetsResult.sheetId,
        clientEmail: sheetsResult.clientEmail,
        sheetError: sheetsResult.error,
        emailNotification: emailResult.success,
        emailMessage: emailResult.message,
        emailError: emailResult.error,
      });
    } catch (err: any) {
      console.error("Error handling consultation submission:", err?.message || err);
      res.status(500).json({ 
        error: "Server encountered an error processing inquiry", 
        message: sanitizeErrorMessage(err)
      });
    }
  });

  // Retrieve inquiries
  app.get("/api/leads", (req, res) => {
    res.json({
      leads: serverLeadsStore,
      sheetsStatus: getSheetsStatus()
    });
  });

  // Batch sync leads to Google Sheets
  app.post("/api/sheets/sync-all", async (req, res) => {
    try {
      const leadsToSync: LeadSubmission[] = req.body?.leads || serverLeadsStore;
      if (!Array.isArray(leadsToSync) || leadsToSync.length === 0) {
        res.status(400).json({ error: "No leads provided to sync" });
        return;
      }

      let successCount = 0;
      const errors: string[] = [];

      for (const lead of leadsToSync) {
        const result = await appendLeadToGoogleSheet(lead);
        if (result.syncedToGoogleSheets) {
          successCount++;
        } else if (result.error) {
          errors.push(`${lead.id}: ${result.error}`);
        }
      }

      res.json({
        total: leadsToSync.length,
        synced: successCount,
        errors,
        sheetsStatus: getSheetsStatus()
      });
    } catch (err: any) {
      res.status(500).json({ error: sanitizeErrorMessage(err) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RovianX Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
