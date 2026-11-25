import { query } from './blogDatabase.js';

interface SitemapPost {
  slug: string;
  updated_at: string | null;
  publish_date: string | null;
}

interface SitemapCategory {
  slug: string;
  updated_at: string | null;
}

const XML_NAMESPACE = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const SITE_ORIGIN = 'https://www.rovianx.in';

export function getSiteOrigin(): string {
  return SITE_ORIGIN;
}

export async function getPublishedSitemapPosts(): Promise<SitemapPost[]> {
  const result = await query<SitemapPost>(
    "SELECT slug, updated_at, publish_date FROM blog_posts WHERE status = 'published' AND publish_date IS NOT NULL AND publish_date <= NOW() AND robots_index = TRUE ORDER BY updated_at DESC"
  );
  return result.rows;
}

export async function getPublicSitemapCategories(): Promise<SitemapCategory[]> {
  const result = await query<SitemapCategory>(
    "SELECT c.slug, MAX(GREATEST(p.updated_at, p.publish_date)) AS updated_at FROM blog_categories c JOIN blog_posts p ON p.category_id = c.id WHERE p.status = 'published' AND p.publish_date IS NOT NULL AND p.publish_date <= NOW() AND p.robots_index = TRUE GROUP BY c.id, c.slug ORDER BY c.slug"
  );
  return result.rows;
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, character => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character] || character);
}

function formatLastModified(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function buildSitemapXml(origin: string, includeBlogIndex: boolean, posts: SitemapPost[], categories: SitemapCategory[] = []): string {
  const paths = new Set<string>(['/']);
  if (includeBlogIndex) paths.add('/blog/');
  paths.add('/about/');
  paths.add('/privacy-policy/');
  paths.add('/terms-and-conditions/');
  paths.add('/refund-cancellation-policy/');
  paths.add('/cookie-policy/');

  const entries = [
    ...Array.from(paths, path => ({ path, lastmod: null })),
    ...categories.map(category => ({ path: `/blog/category/${encodeURIComponent(category.slug)}/`, lastmod: formatLastModified(category.updated_at) })),
    ...posts.map(post => ({ path: `/blog/${encodeURIComponent(post.slug)}/`, lastmod: formatLastModified(post.updated_at || post.publish_date) })),
  ];

  const urls = entries.map(({ path, lastmod }) => {
    const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : '';
    return `<url><loc>${escapeXml(`${origin}${path}`)}</loc>${lastmodTag}</url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="${XML_NAMESPACE}">${urls}</urlset>`;
}

export function buildRobotsTxt(origin: string): string {
  return `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /login/\n\nSitemap: ${origin}/sitemap.xml\n`;
}
