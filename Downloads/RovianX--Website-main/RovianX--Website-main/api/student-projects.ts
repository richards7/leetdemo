import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUBMISSIONS_CLOSED_MESSAGE = "Time is up! The 36-hour hackathon submission period has ended, and project proposals are no longer being accepted.";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ success: false, error: "Method not allowed." });
  }

  return res.status(403).json({ success: false, error: SUBMISSIONS_CLOSED_MESSAGE });
}
