import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildSitemapXml, getPublicSitemapCategories, getPublishedSitemapPosts, getSiteOrigin } from '../server/sitemap.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const origin = getSiteOrigin();
    const [posts, categories] = await Promise.all([getPublishedSitemapPosts(), getPublicSitemapCategories()]);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(buildSitemapXml(origin, true, posts, categories));
  } catch (error) {
    console.error('Sitemap generation failed:', error instanceof Error ? error.message : error);
    res.status(500).json({ error: 'Sitemap generation failed.' });
  }
}
