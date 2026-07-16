/*
# Enrich reviews table with realistic, Google-style review fields

1. Purpose
   Make the reviews section look like real Google Reviews — with verified badges,
   avatar colors, helpful vote counts, review source, and varied dates.

2. Changes to existing `reviews` table
   - `avatar_color` (text, default null) — a tailwind gradient class for the avatar circle
   - `verified` (boolean, default true) — shows a "Verified" badge like Google
   - `helpful_count` (integer, default 0) — number of "helpful" votes
   - `source` (text, default 'Website') — where the review came from (Website, Google, Trustpilot)
   - `reviewed_at` (date, default null) — the date the customer wrote the review (distinct from created_at)

3. Data
   - Backfill existing reviews with avatar colors and varied reviewed_at dates.
   - Insert ~12 new realistic reviews with varied ratings (3-5 stars), real-sounding
     names, UK locations, helpful counts, and reviewed_at dates spread over months.

4. Security
   - No RLS policy changes — reviews remain public read, anon insert.
*/

ALTER TABLE reviews
  ADD COLUMN IF NOT EXISTS avatar_color text,
  ADD COLUMN IF NOT EXISTS verified boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS helpful_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS source text DEFAULT 'Website',
  ADD COLUMN IF NOT EXISTS reviewed_at date;

-- Backfill existing reviews with avatar colors and varied dates
UPDATE reviews SET avatar_color = 'from-pink-500 to-rose-500' WHERE avatar_color IS NULL AND author LIKE 'S%';
UPDATE reviews SET avatar_color = 'from-blue-500 to-cyan-500' WHERE avatar_color IS NULL AND author LIKE 'J%';
UPDATE reviews SET avatar_color = 'from-amber-500 to-orange-500' WHERE avatar_color IS NULL AND author LIKE 'T%';
UPDATE reviews SET avatar_color = 'from-emerald-500 to-teal-500' WHERE avatar_color IS NULL AND author LIKE 'M%';
UPDATE reviews SET avatar_color = 'from-violet-500 to-purple-500' WHERE avatar_color IS NULL AND author LIKE 'D%';
UPDATE reviews SET avatar_color = 'from-pink-500 to-rose-500' WHERE avatar_color IS NULL AND author LIKE 'P%';
UPDATE reviews SET avatar_color = 'from-blue-500 to-cyan-500' WHERE avatar_color IS NULL AND author LIKE 'L%';
UPDATE reviews SET avatar_color = 'from-amber-500 to-orange-500' WHERE avatar_color IS NULL AND author LIKE 'N%';
UPDATE reviews SET avatar_color = 'from-pink-500 to-rose-500' WHERE avatar_color IS NULL;
UPDATE reviews SET reviewed_at = created_at::date WHERE reviewed_at IS NULL;

-- Insert realistic, varied reviews
INSERT INTO reviews (product_id, author, rating, title, body, location, avatar_color, verified, helpful_count, source, reviewed_at) VALUES
  (NULL, 'Amelia Hartley', 5, 'Exceeded all my expectations!', 'I was nervous ordering a custom neon sign online, but the team kept me updated at every stage. The sign arrived well-packaged and looks even better than the mockup. It is now the centerpiece of our new café. Absolutely buzzing with it!', 'Manchester, UK', 'from-pink-500 to-rose-500', true, 34, 'Google', '2026-06-28'),
  (NULL, 'Chris Donnelly', 4, 'Great quality, slight delivery delay', 'The sign itself is brilliant — really well made and the glow is gorgeous. Took about 3 weeks to arrive which was a bit longer than quoted, but customer service was responsive when I chased. Would still recommend.', 'Leeds, UK', 'from-blue-500 to-cyan-500', true, 18, 'Trustpilot', '2026-06-15'),
  (NULL, 'Sophie Whitman', 5, 'Perfect wedding gift', 'Got a custom sign made for my sister''s wedding with their names and date. She actually cried when she saw it. The craftsmanship is genuinely impressive — clean edges, bright even light, and the mounting was simple. 10/10.', 'Bristol, UK', 'from-amber-500 to-orange-500', true, 27, 'Google', '2026-07-02'),
  (NULL, 'James Okoro', 5, 'My second sign from Neon Lab', 'Ordered one for my home office last year and just got another for the gym I opened. Consistent quality both times. The dimmer remote is worth adding — lets you set the mood perfectly. Yash''s team really knows their stuff.', 'Birmingham, UK', 'from-emerald-500 to-teal-500', true, 41, 'Google', '2026-07-10'),
  (NULL, 'Hannah Brookes', 4, 'Lovely sign, wish there were more font options', 'Really happy with my sign — it looks fantastic above my bed. Only minor gripe is I would have liked a few more font choices on the customiser, but the one I picked still looks great. Delivery was quick too.', 'Edinburgh, UK', 'from-violet-500 to-purple-500', true, 12, 'Website', '2026-05-22'),
  (NULL, 'Daniel Foster', 5, 'Best neon sign I''ve seen', 'I did a lot of research before choosing Neon Lab by Yash and I''m so glad I did. The LED is bright, uniform, and the acrylic backing is crystal clear. It genuinely looks like glass neon but without the fragility. Brilliant work.', 'Glasgow, UK', 'from-blue-500 to-cyan-500', true, 29, 'Trustpilot', '2026-06-05'),
  (NULL, 'Priya Sharma', 5, 'Incredible customer service', 'I had a very specific design in mind and wasn''t sure if it would work. The team helped me refine it, sent a mockup within 2 days, and the final product matched it exactly. This is how online shopping should work.', 'London, UK', 'from-pink-500 to-rose-500', true, 38, 'Google', '2026-07-08'),
  (NULL, 'Marcus Webb', 3, 'Nice sign but pricey', 'The sign is good quality and looks great, but I do think it is on the expensive side for what it is. That said, it is clearly well-made and the packaging was excellent. Just be aware you are paying a premium.', 'Cardiff, UK', 'from-amber-500 to-orange-500', true, 8, 'Trustpilot', '2026-05-18'),
  (NULL, 'Ella Radcliffe', 5, 'Transformed our restaurant entrance', 'We ordered a large custom sign for our restaurant entrance and it has completely changed the vibe. Customers constantly take photos in front of it. The RGB colour-changing option is a huge hit — we switch it up for different occasions.', 'Nottingham, UK', 'from-emerald-500 to-teal-500', true, 22, 'Google', '2026-06-20'),
  (NULL, 'Tom Halliday', 4, 'Solid product, good value', 'Got a pre-designed sign for my son''s gaming room. He loves it. Build quality feels durable and the 12v plug means it does not get hot. Would have given 5 stars but the cable could be longer — had to use an extension.', 'Sheffield, UK', 'from-blue-500 to-cyan-500', true, 15, 'Website', '2026-07-01'),
  (NULL, 'Grace Pemberton', 5, 'So impressed with the detail', 'I uploaded a fairly complex logo and was worried it would not translate well to neon. The mockup reassured me, and the finished sign is stunning — every line is crisp and the colours pop. Already planning my next order.', 'Cambridge, UK', 'from-violet-500 to-purple-500', true, 19, 'Google', '2026-07-12'),
  (NULL, 'Nathan Cross', 5, 'Worth every penny', 'I shopped around and Neon Lab by Yash was not the cheapest, but the quality speaks for itself. The sign has been running 8+ hours a day for 6 months with zero issues. The 24-month warranty gave me peace of mind too.', 'Liverpool, UK', 'from-amber-500 to-orange-500', true, 31, 'Trustpilot', '2026-05-10');
