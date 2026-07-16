
-- Collection IDs:
-- Bar & Restaurant:       802a061c-6530-43bd-86b6-80e75cdf10dc
-- Beauty & Hair Salons:   0841cbab-81da-454f-b0e3-4cb946c254f3
-- Desktop Neon Signs:     f00fe480-2c2b-4209-956b-d37c3da3938a
-- Gaming & Streaming:     c8b4cee7-9932-4b50-b127-eebc133ac85a
-- Home Interiors:         721eb1ea-0431-4036-8ac3-9b1e7fc805ca
-- Music:                  1230f67a-18e0-4015-b028-e0ffd10dadff
-- Party & Celebrations:   8c13a81e-99e0-466c-bb87-85930f57d5e2
-- Sport:                  7a55d0a6-e4e4-4582-9962-6efaf6536d46
-- UV Print:               6e7cdfb2-772d-47f2-95d5-df9703d1f868
-- Zodiac Signs:           542a9f75-249a-48b3-a1f7-5674ccd33616

INSERT INTO products (name, slug, description, price, compare_at_price, image_url, collection_id, badge, rating, in_stock)
VALUES
  -- Bar & Restaurant
  ('Burger Neon Sign',          'burger-neon',          'A sizzling burger neon sign perfect for food joints and burger bars.', 8999, 11999, NULL, '802a061c-6530-43bd-86b6-80e75cdf10dc', NULL, 4.8, true),
  ('But First Coffee Neon Sign','but-first-coffee',     'Stylish coffee-lover neon sign for cafes and home coffee corners.',  7999, 10999, NULL, '802a061c-6530-43bd-86b6-80e75cdf10dc', 'Best Seller', 4.9, true),
  ('CEO Neon Sign',             'ceo-neon',             'Bold CEO neon sign — great for offices, studios and home desks.',     7499, 9999,  NULL, '802a061c-6530-43bd-86b6-80e75cdf10dc', NULL, 4.7, true),
  ('Open Neon Sign',            'open-neon',            'Classic OPEN neon sign to light up your shopfront or bar entrance.',  6999, 8999,  NULL, '802a061c-6530-43bd-86b6-80e75cdf10dc', NULL, 4.8, true),
  ('Closed Neon Sign',          'closed-neon',          'Red CLOSED neon sign — a must-have for any retail or food business.', 6999, 8999,  NULL, '802a061c-6530-43bd-86b6-80e75cdf10dc', NULL, 4.7, true),
  ('Order Neon Sign',           'order-neon',           'Eye-catching ORDER neon sign to direct customers in your venue.',     6999, 8999,  NULL, '802a061c-6530-43bd-86b6-80e75cdf10dc', NULL, 4.6, true),

  -- Beauty & Hair Salons
  ('Chai Sutta Neon Sign',      'chai-sutta-neon',      'Iconic chai sutta neon art for tea stalls and social spaces.',        7999, 10499, NULL, '0841cbab-81da-454f-b0e3-4cb946c254f3', NULL, 4.7, true),

  -- Gaming & Streaming
  ('Game On Neon Sign',         'game-on-neon',         'Level up your gaming room with this vibrant Game On neon sign.',      8499, 10999, NULL, 'c8b4cee7-9932-4b50-b127-eebc133ac85a', 'Popular', 4.9, true),
  ('Netflix Neon Sign',         'netflix-neon',         'Bring the streaming vibe home with this iconic Netflix neon sign.',   7999, 10499, NULL, 'c8b4cee7-9932-4b50-b127-eebc133ac85a', NULL, 4.8, true),
  ('Remote Neon Sign',          'remote-neon',          'Quirky TV remote neon sign — perfect for gaming and lounge rooms.',   6999, 8999,  NULL, 'c8b4cee7-9932-4b50-b127-eebc133ac85a', NULL, 4.6, true),
  ('Flash Neon Sign',           'flash-neon',           'Electrifying Flash neon sign for gaming setups and superhero fans.',  7499, 9999,  NULL, 'c8b4cee7-9932-4b50-b127-eebc133ac85a', NULL, 4.7, true),

  -- Home Interiors
  ('Cloud Neon Sign',           'cloud-neon',           'Dreamy cloud neon sign to add a soft glow to any bedroom or nursery.',7499, 9999,  NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.8, true),
  ('Diamond Neon Sign',         'diamond-neon',         'Luxury diamond neon sign — a sparkling statement piece for any room.',7999, 10499, NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.7, true),
  ('Fire Neon Sign',            'fire-neon',            'Bold fire neon sign that brings heat and energy to your space.',      7499, 9999,  NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.7, true),
  ('Good Vibes Only Neon Sign', 'good-vibes-only',      'Spread positivity with this fan-favourite Good Vibes Only neon sign.',8499, 10999, NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', 'Best Seller', 4.9, true),
  ('Heart Neon Sign',           'heart-neon',           'A glowing heart neon sign — timeless, romantic, and beautiful.',     6999, 8999,  NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.8, true),
  ('Hustle Neon Sign',          'hustle-neon',          'Motivational Hustle neon sign for home offices and studios.',        7999, 10499, NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.8, true),
  ('Infinity Neon Sign',        'infinity-neon',        'Elegant infinity symbol neon sign for minimalist interiors.',        7499, 9999,  NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.7, true),
  ('Moon Neon Sign',            'moon-neon',            'Calming crescent moon neon sign — perfect for bedrooms and nurseries.',6999, 8999, NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.8, true),
  ('Moon Star Neon Sign',       'moon-star-neon',       'Moon and star neon sign duo — a celestial addition to any room.',    7499, 9999,  NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.7, true),
  ('Peace Symbol Neon Sign',    'peace-symbol-neon',    'Iconic peace symbol neon sign — a retro vibe for modern spaces.',    6999, 8999,  NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.6, true),
  ('Saturn Neon Sign',          'saturn-neon',          'Cosmic Saturn neon sign for space-themed rooms and kids bedrooms.',  7499, 9999,  NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.7, true),
  ('Smiley Neon Sign',          'smiley-neon',          'Cheerful smiley face neon sign to brighten up any wall.',            6999, 8999,  NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.8, true),
  ('Star Neon Sign',            'star-neon',            'Classic star neon sign — shines bright in any room or studio.',      6499, 8499,  NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.7, true),
  ('Sun Neon Sign',             'sun-neon',             'Radiant sun neon sign to bring warmth and energy to your space.',    7499, 9999,  NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.7, true),
  ('Sufi Neon Sign',            'sufi-neon',            'Spiritual Sufi neon sign — a unique and soulful piece of wall art.',  8499, 10999, NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.8, true),
  ('Sufi Neon Sign 2',          'sufi-neon-2',          'Alternative Sufi-inspired neon sign with a distinct artistic style.', 8499, 10999, NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.8, true),
  ('Woman Face Neon Sign',      'woman-face-neon',      'Artistic woman face neon sign — a bold, modern statement for any wall.',8999, 11499, NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.7, true),
  ('Ying Yang Neon Sign',       'ying-yang-neon',       'Balanced ying yang neon sign for zen-inspired and minimalist spaces.',7499, 9999, NULL, '721eb1ea-0431-4036-8ac3-9b1e7fc805ca', NULL, 4.7, true),

  -- Music
  ('Guitar Neon Sign',          'guitar-neon',          'Rocking guitar neon sign for music rooms, studios and stages.',      8999, 11499, NULL, '1230f67a-18e0-4015-b028-e0ffd10dadff', NULL, 4.8, true),
  ('Music Neon Sign',           'music-neon',           'Vibrant music notes neon sign for studios, bars and music lovers.',  7999, 10499, NULL, '1230f67a-18e0-4015-b028-e0ffd10dadff', NULL, 4.7, true),

  -- Party & Celebrations
  ('Happy Birthday Neon Sign',  'happy-birthday-neon',  'Make birthdays unforgettable with this glowing Happy Birthday neon sign.',8499, 10999, NULL, '8c13a81e-99e0-466c-bb87-85930f57d5e2', 'Popular', 4.9, true),
  ('HBD Neon Sign',             'hbd-neon',             'Compact HBD neon sign — quick to set up, stunning for birthday shoots.',7499, 9999, NULL, '8c13a81e-99e0-466c-bb87-85930f57d5e2', NULL, 4.7, true),
  ('Party All Night Neon Sign', 'party-all-night-neon', 'Party All Night neon sign — the ultimate addition to any celebration.',8999, 11499, NULL, '8c13a81e-99e0-466c-bb87-85930f57d5e2', NULL, 4.8, true),
  ('Qabol Neon Sign',           'qabol-neon',           'Unique Qabol neon sign — a personalised cultural touch for events.',  7999, 10499, NULL, '8c13a81e-99e0-466c-bb87-85930f57d5e2', NULL, 4.7, true)

ON CONFLICT (slug) DO NOTHING;
