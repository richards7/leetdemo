CREATE TABLE IF NOT EXISTS blog_categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_authors (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  profile_image TEXT,
  biography TEXT NOT NULL DEFAULT '',
  author_slug TEXT NOT NULL UNIQUE,
  social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  author_id BIGINT NOT NULL REFERENCES blog_authors(id),
  category_id BIGINT NOT NULL REFERENCES blog_categories(id),
  featured_image TEXT,
  image_alt TEXT NOT NULL DEFAULT '',
  image_title TEXT NOT NULL DEFAULT '',
  image_caption TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  publish_date TIMESTAMPTZ,
  reading_time INTEGER NOT NULL DEFAULT 1 CHECK (reading_time > 0),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  seo_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  focus_keyword TEXT NOT NULL DEFAULT '',
  lsi_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  canonical_url TEXT NOT NULL DEFAULT '',
  robots_index BOOLEAN NOT NULL DEFAULT TRUE,
  robots_follow BOOLEAN NOT NULL DEFAULT TRUE,
  og_title TEXT NOT NULL DEFAULT '',
  og_description TEXT NOT NULL DEFAULT '',
  og_image TEXT NOT NULL DEFAULT '',
  twitter_title TEXT NOT NULL DEFAULT '',
  twitter_description TEXT NOT NULL DEFAULT '',
  twitter_image TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS lsi_keywords JSONB NOT NULL DEFAULT '[]'::jsonb;

CREATE TABLE IF NOT EXISTS blog_tags (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id BIGINT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id BIGINT NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE IF NOT EXISTS blog_related_posts (
  post_id BIGINT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  related_post_id BIGINT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, related_post_id),
  CHECK (post_id <> related_post_id)
);

CREATE TABLE IF NOT EXISTS blog_redirects (
  id BIGSERIAL PRIMARY KEY,
  old_path TEXT NOT NULL UNIQUE,
  new_path TEXT NOT NULL,
  redirect_type INTEGER NOT NULL DEFAULT 301 CHECK (redirect_type IN (301, 302)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_media (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  public_id TEXT NOT NULL UNIQUE,
  mime_type TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_admin_users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_admin_sessions (
  token_hash TEXT PRIMARY KEY,
  admin_id BIGINT NOT NULL REFERENCES blog_admin_users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS blog_posts_public_idx ON blog_posts (status, publish_date DESC);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts (category_id, publish_date DESC);
CREATE INDEX IF NOT EXISTS blog_posts_author_idx ON blog_posts (author_id, publish_date DESC);
CREATE INDEX IF NOT EXISTS blog_posts_search_idx ON blog_posts USING GIN (to_tsvector('english', title || ' ' || excerpt || ' ' || content));
CREATE INDEX IF NOT EXISTS blog_sessions_expiry_idx ON blog_admin_sessions (expires_at);

INSERT INTO blog_categories (name, slug)
VALUES
  ('SEO', 'seo'),
  ('Digital Marketing', 'digital-marketing'),
  ('Web Development', 'web-development'),
  ('Social Media Marketing', 'social-media-marketing'),
  ('Google Ads', 'google-ads'),
  ('AI & Technology', 'ai-technology'),
  ('Business Growth', 'business-growth')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO blog_authors (name, author_slug, biography)
VALUES ('RovianX Solutions', 'rovianx-solutions', 'Ideas, technology and digital growth from RovianX Solutions.')
ON CONFLICT (author_slug) DO NOTHING;
