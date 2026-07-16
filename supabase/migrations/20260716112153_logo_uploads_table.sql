/*
# Create logo_uploads table and storage bucket

1. New Tables
- `logo_uploads`
  - `id` (uuid, primary key)
  - `email` (text, not null) — customer email for quote follow-up
  - `file_path` (text, not null) — path to uploaded file in storage bucket
  - `file_name` (text, not null) — original file name
  - `file_url` (text, not null) — public URL of uploaded file
  - `sign_name` (text) — optional name/label for the sign
  - `width_cm` (integer) — desired width in cm
  - `color` (text) — desired neon color
  - `mounting` (text) — mounting option
  - `notes` (text) — additional customer notes
  - `status` (text, default 'pending') — quote status: pending, quoted, approved, rejected
  - `quoted_price` (integer) — price in pence once quoted
  - `created_at` (timestamptz, default now())

2. Storage
- Create public bucket `logo-uploads` for file uploads

3. Security
- Enable RLS on `logo_uploads`
- Allow anon + authenticated INSERT (customers submit quotes without login)
- Allow anon + authenticated SELECT (so customers can view their quote status)
- Allow authenticated UPDATE (admin updates quote status/price)
*/

CREATE TABLE IF NOT EXISTS logo_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  file_path text NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  sign_name text,
  width_cm integer,
  color text,
  mounting text,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  quoted_price integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE logo_uploads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_logo_uploads" ON logo_uploads;
CREATE POLICY "anon_insert_logo_uploads" ON logo_uploads FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_logo_uploads" ON logo_uploads;
CREATE POLICY "anon_select_logo_uploads" ON logo_uploads FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_logo_uploads" ON logo_uploads;
CREATE POLICY "auth_update_logo_uploads" ON logo_uploads FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('logo-uploads', 'logo-uploads', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "anon_upload_logo_bucket" ON storage.objects;
CREATE POLICY "anon_upload_logo_bucket" ON storage.objects FOR INSERT
TO anon, authenticated WITH CHECK (bucket_id = 'logo-uploads');

DROP POLICY IF EXISTS "anon_read_logo_bucket" ON storage.objects;
CREATE POLICY "anon_read_logo_bucket" ON storage.objects FOR SELECT
TO anon, authenticated USING (bucket_id = 'logo-uploads');
