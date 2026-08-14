-- Run this SQL in your Supabase project: Dashboard > SQL Editor > New Query

-- Create the blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  date        DATE NOT NULL,
  category    TEXT,
  read_time   TEXT,
  english_summary   TEXT,
  burmese_summary   TEXT,
  english_content   TEXT,
  burmese_content   TEXT,
  status      TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast public queries (published posts sorted by date)
CREATE INDEX IF NOT EXISTS idx_blog_posts_status_date ON blog_posts (status, date DESC);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security: Allow public reads for published posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Note: All writes (INSERT, UPDATE, DELETE) use the service_role key which bypasses RLS.
