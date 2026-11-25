import "express-async-errors";
import express from "express";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { blogRouter } from "../../server/blogApi.js";

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use("/", blogRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Blog API route not found." });
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = error instanceof Error ? error.message : "Blog API request failed.";
  console.error("Vercel Blog API error:", message);
  if (!res.headersSent) {
    res.status(500).json({ error: "Blog API request failed.", message });
  }
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  const expressRequest = req as unknown as express.Request;
  if (expressRequest.url) {
    expressRequest.url = expressRequest.url.replace(/^\/api\/blog(?=\/|$)/, "") || "/";
  }
  return app(expressRequest, res as unknown as express.Response);
}