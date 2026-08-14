-- Run this in Supabase SQL Editor

-- Table with a single row for the portfolio page view count
CREATE TABLE IF NOT EXISTS page_views (
  id      TEXT PRIMARY KEY DEFAULT 'portfolio',
  count   BIGINT NOT NULL DEFAULT 0
);

-- Insert the initial row
INSERT INTO page_views (id, count)
VALUES ('portfolio', 0)
ON CONFLICT (id) DO NOTHING;

-- A safe, atomic increment function (avoids race conditions)
CREATE OR REPLACE FUNCTION increment_page_views(row_id TEXT)
RETURNS BIGINT AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE page_views
  SET count = count + 1
  WHERE id = row_id
  RETURNING count INTO new_count;
  RETURN new_count;
END;
$$ LANGUAGE plpgsql;

-- Allow public read (anon key can read the count)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read page views"
  ON page_views FOR SELECT
  USING (true);

-- Note: increment_page_views() is called via service_role key from the API route
