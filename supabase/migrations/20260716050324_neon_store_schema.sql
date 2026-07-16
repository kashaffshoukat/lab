/*
# Neon Sign Store — initial schema

1. Purpose
   Single-tenant storefront for custom LED neon signs. No sign-in screen; the
   site is a public catalog + cart that flows into Stripe checkout. Reviews are
   submitted anonymously by anyone. All data is intentionally public, so RLS
   uses `TO anon, authenticated` with `USING (true)`.

2. Tables
   - collections: grouping of products (Bar & Restaurant, Home Interiors, etc.)
     id, slug, name, description, image_url, created_at
   - products: individual neon sign products
     id, slug, name, description, price (pence), compare_at_price, image_url,
     gallery (text[]), collection_id, badge, rating, in_stock, created_at
   - reviews: customer reviews shown on the reviews page and product pages
     id, product_id (nullable for site-wide), author, rating (1-5), title,
     body, location, created_at
   - orders: lightweight order record created after Stripe checkout
     id, stripe_session_id, email, total (pence), status, items (jsonb), created_at

3. Security
   - RLS enabled on every table.
   - collections/products/reviews: public read (anon+authenticated), public
     insert for reviews so visitors can submit them, no update/delete from
     the client.
   - orders: public insert (created by checkout), public read of own rows by
     stripe_session_id is not safe, so orders are insert-only from the client
     and managed server-side. Kept simple: insert-only from anon.

4. Notes
   - Prices stored in pence (integer) to avoid float rounding issues.
   - image_url fields reference Pexels/external CDN URLs.
*/

CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_collections" ON collections;
CREATE POLICY "anon_read_collections" ON collections FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  price integer NOT NULL,
  compare_at_price integer,
  image_url text,
  gallery text[],
  collection_id uuid REFERENCES collections(id) ON DELETE SET NULL,
  badge text,
  rating numeric(2,1) DEFAULT 5.0,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_products" ON products;
CREATE POLICY "anon_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  author text NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text,
  body text NOT NULL,
  location text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_reviews" ON reviews;
CREATE POLICY "anon_read_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text UNIQUE,
  email text,
  total integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);
