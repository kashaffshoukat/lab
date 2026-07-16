import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, anonKey);

export const NEON_COLORS = [
  { name: 'Hot Pink', hex: '#ff2d95' },
  { name: 'Ice Blue', hex: '#00e5ff' },
  { name: 'Neon Green', hex: '#39ff14' },
  { name: 'Orange', hex: '#ff6b00' },
  { name: 'Purple', hex: '#b026ff' },
  { name: 'Red', hex: '#ff1744' },
  { name: 'Yellow', hex: '#fff200' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Warm White', hex: '#fff4e0' },
] as const;

export const NEON_FONTS = [
  { name: 'Script', family: 'Caveat', weight: 700 },
  { name: 'Bold', family: 'Outfit', weight: 800 },
  { name: 'Classic', family: 'Outfit', weight: 500 },
] as const;

// Full font list for the customiser (40+ fonts)
// Google Font family names — loaded via index.html
export const CUSTOMISER_FONTS = [
  { name: 'Alexa', family: 'Pacifico', weight: 400 },
  { name: 'Amanda', family: 'Dancing Script', weight: 700 },
  { name: 'Amsterdam', family: 'Bebas Neue', weight: 400 },
  { name: 'Austin', family: 'Anton', weight: 400 },
  { name: 'Avante', family: 'Rajdhani', weight: 600 },
  { name: 'Barcelona', family: 'Montserrat', weight: 700 },
  { name: 'Bayview', family: 'Quicksand', weight: 500 },
  { name: 'Beachfront', family: 'Pacifico', weight: 400 },
  { name: 'Bellview', family: 'Righteous', weight: 400 },
  { name: 'Buttercup', family: 'Sacramento', weight: 400 },
  { name: 'Chelsea', family: 'Playfair Display', weight: 700 },
  { name: 'ClassicType', family: 'Lora', weight: 500 },
  { name: 'Freehand', family: 'Caveat', weight: 700 },
  { name: 'Freespirit', family: 'Comfortaa', weight: 400 },
  { name: 'Greenworld', family: 'Satisfy', weight: 400 },
  { name: 'Loveneon', family: 'Lobster', weight: 400 },
  { name: 'Lovenote', family: 'Great Vibes', weight: 400 },
  { name: 'Marquee', family: 'Anton', weight: 400 },
  { name: 'Mayfair', family: 'Cormorant Garamond', weight: 600 },
  { name: 'Melbourne', family: 'Oswald', weight: 500 },
  { name: 'Monaco', family: 'Outfit', weight: 800 },
  { name: 'NeonGlow', family: 'Audiowide', weight: 400 },
  { name: 'Neonlite', family: 'Orbitron', weight: 500 },
  { name: 'Neonscript', family: 'Permanent Marker', weight: 400 },
  { name: 'Neontrace', family: 'Major Mono Display', weight: 400 },
  { name: 'Neotokyo', family: 'Russo One', weight: 400 },
  { name: 'Nevada', family: 'Bebas Neue', weight: 400 },
  { name: 'Newcursive', family: 'Dancing Script', weight: 500 },
  { name: 'Northshore', family: 'Quicksand', weight: 600 },
  { name: 'Photogenic', family: 'Allura', weight: 400 },
  { name: 'Rocket', family: 'Russo One', weight: 400 },
  { name: 'Royalty', family: 'Cinzel', weight: 700 },
  { name: 'Scifi', family: 'Orbitron', weight: 700 },
  { name: 'Signature', family: 'Allura', weight: 400 },
  { name: 'Sorrento', family: 'Playfair Display', weight: 500 },
  { name: 'Typewriter', family: 'Special Elite', weight: 400 },
  { name: 'Venetian', family: 'Cormorant', weight: 500 },
  { name: 'Vintage', family: 'Special Elite', weight: 400 },
  { name: 'Waikiki', family: 'Pacifico', weight: 400 },
  { name: 'Wildscript', family: 'Permanent Marker', weight: 400 },
  { name: 'Shamelon', family: 'Outfit', weight: 500 },
  { name: 'Tubes', family: 'Bebas Neue', weight: 400 },
  { name: 'Orange', family: 'Outfit', weight: 600 },
] as const;

// Sizes with letter-per-line limits from the text file
export const CUSTOMISER_SIZES = [
  { name: '40cm', cm: 40, inches: '15.7"', lettersPerLine: 6, priceAdd: 0 },
  { name: '60cm', cm: 60, inches: '23.6"', lettersPerLine: 10, priceAdd: 3000 },
  { name: '80cm', cm: 80, inches: '31.5"', lettersPerLine: 14, priceAdd: 6000 },
  { name: '100cm', cm: 100, inches: '39.4"', lettersPerLine: 17, priceAdd: 10000 },
  { name: '120cm', cm: 120, inches: '47.2"', lettersPerLine: 21, priceAdd: 14000 },
  { name: '140cm', cm: 140, inches: '55.1"', lettersPerLine: 24, priceAdd: 18000 },
  { name: '160cm', cm: 160, inches: '63"', lettersPerLine: 28, priceAdd: 22000 },
  { name: '180cm', cm: 180, inches: '70.9"', lettersPerLine: 31, priceAdd: 26000 },
  { name: '200cm', cm: 200, inches: '78.7"', lettersPerLine: 35, priceAdd: 30000 },
] as const;

// Backboard types
export const BACKBOARD_TYPES = [
  { name: 'Cut to Letter', desc: 'No visible backboard', priceAdd: 0 },
  { name: 'Cut to Shape', desc: 'Backboard is cut closely around the outside of your wording', priceAdd: 2000 },
  { name: 'Board', desc: 'Backboard cut in a Rectangle around the outside of your wording', priceAdd: 3000 },
] as const;

// Backboard colours
export const BACKBOARD_COLOURS = [
  { name: 'Clear', hex: 'transparent' },
  { name: 'White', hex: '#f0f0f0' },
  { name: 'Black', hex: '#0a0a0a' },
] as const;

// Mounting options
export const CUSTOMISER_MOUNTING = [
  { name: 'Wall Mounting Screws', desc: 'Wall screws come as standard with your order', priceAdd: 0 },
  { name: 'Fast Mount Kit', desc: 'Renter friendly mounting kit, no tools needed, mounts to any smooth surface in seconds without drilling', priceAdd: 1500 },
  { name: 'Ceiling Hanging Kit', desc: 'Includes the ceiling hanging wire, screw kit and tool to assemble', priceAdd: 2500 },
  { name: 'Free-standing', desc: 'Comes with clear acrylic legs to stand the sign on any flat surface', priceAdd: 2000 },
  { name: 'Stand-off Mounts', desc: '(20mm) Your sign will come with mounting holes suitable for stand-off mounts and the appropriate number of stand-off mounts', priceAdd: 3500 },
] as const;

// Extras
export const CUSTOMISER_EXTRAS = [
  { name: 'Remote Dimmer', desc: 'Set your sign to any brightness or turn it ON/OFF at the touch of a button', priceAdd: 1500 },
  { name: 'RGB Colour Changing', desc: 'Change colours and effects with a remote control', priceAdd: 4000 },
  { name: 'Outdoor Box', desc: 'Protect your sign for permanent outdoor mounting', priceAdd: 3000 },
  { name: 'Splashproofing', desc: 'Protect your sign from accidental damage. Suitable for occasional outdoor use, such as for events. Not suitable for permanent outdoor mounting in heavy showers or frost', priceAdd: 0 },
  { name: 'Battery Pack', desc: 'When you select this option, we will send both the battery and the adaptor. You can use either of them', priceAdd: 2000 },
] as const;

// Production speeds
export const PRODUCTION_SPEEDS = [
  { name: 'Standard', desc: 'Most popular — 7-10 working days', priceAdd: 0 },
  { name: 'Express', desc: '4-6 working days', priceAdd: 3000 },
  { name: 'Rush', desc: '2-3 working days', priceAdd: 6000 },
] as const;

// Keep legacy exports for LogoUploadPage compatibility
export const NEON_SIZES = [
  { name: 'Small', cm: 40, priceAdd: 0 },
  { name: 'Medium', cm: 60, priceAdd: 3000 },
  { name: 'Large', cm: 80, priceAdd: 6000 },
  { name: 'XL', cm: 100, priceAdd: 10000 },
] as const;

export const NEON_MOUNTING = [
  { name: 'Wall Mount', priceAdd: 0 },
  { name: 'Hanging Kit', priceAdd: 1500 },
  { name: 'Stand', priceAdd: 2500 },
] as const;

export const NEON_EXTRAS = [
  { name: 'Remote Dimmer', priceAdd: 1500 },
  { name: 'RGB Colour Changing', priceAdd: 4000 },
  { name: 'Outdoor Box', priceAdd: 3000 },
] as const;

export function formatPrice(pence: number): string {
  return '£' + (pence / 100).toFixed(2);
}
