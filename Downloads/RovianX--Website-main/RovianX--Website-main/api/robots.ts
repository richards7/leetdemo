import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildRobotsTxt, getSiteOrigin } from '../server/sitemap.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const origin = getSiteOrigin();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(buildRobotsTxt(origin));
  } catch (error) {
    console.error('Robots generation failed:', error instanceof Error ? error.message : error);
    res.status(500).send('Robots file unavailable.');
  }
}
