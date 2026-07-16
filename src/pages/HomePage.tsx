import { useEffect, useState } from 'react';
import { Truck, ShieldCheck, Star, Award, ArrowRight, Sparkles, Upload, Search, PenTool, Zap, Recycle, Wrench, Clock, MapPin, CreditCard } from 'lucide-react';
import { supabase, formatPrice } from '../lib';
import type { Product, Collection, Review } from '../types';
import { navigate } from '../router';
import { ProductCard } from '../components/ProductCard';
import { StarRating } from '../components/StarRating';

const CATEGORIES = [
  { name: 'Plant Walls', slug: 'garden', img: 'https://images.pexels.com/photos/10841918/pexels-photo-10841918.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Business Signs', slug: 'business-signs', img: 'https://images.pexels.com/photos/11123312/pexels-photo-11123312.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Desktop Neon Signs', slug: 'desktop-neon-sign', img: 'https://images.pexels.com/photos/942317/pexels-photo-942317.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Neon Led Chandeliers', slug: 'neon-led-chandeliers', img: 'https://images.pexels.com/photos/6835984/pexels-photo-6835984.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Neon Led Sculptures', slug: 'sculpture', img: 'https://images.pexels.com/photos/5820026/pexels-photo-5820026.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Neon Tables', slug: 'neon-table', img: 'https://images.pexels.com/photos/34965559/pexels-photo-34965559.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Magic Leds & Curtain', slug: 'magic-leds-curtain', img: 'https://images.pexels.com/photos/6835976/pexels-photo-6835976.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const COLLECTION_CATS = [
  { name: 'Neon Led Basketball Hoops', slug: 'neon-led-basketball-hoops-1', img: 'https://images.pexels.com/photos/13900890/pexels-photo-13900890.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Neon Led Mirrors', slug: 'neon-mirror', img: 'https://images.pexels.com/photos/5704731/pexels-photo-5704731.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Neon Led Infinity Mirrors', slug: 'neon-infinity-mirror-table', img: 'https://images.pexels.com/photos/29506609/pexels-photo-29506609.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: '3D Neon Led Artworks', slug: 'neon-led-basketball-hoops', img: 'https://images.pexels.com/photos/11796003/pexels-photo-11796003.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Acrylic Sign', slug: 'gold-sign', img: 'https://images.pexels.com/photos/14197796/pexels-photo-14197796.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const BRANDS = ['Lipton', 'Dove', 'Vodafone', 'Nivea', 'Shell', 'Coca-Cola', 'TikTok', 'Dyson', "L'Oreal", 'Jack & Jones', 'Netflix', 'ITV', 'JD Sports', 'Amazon'];

const BLOG_POSTS = [
  {
    title: 'The Contribution of LED Neon Lights to Architectural Details: Light Games',
    excerpt: 'With the flexibility of LED neon and its variety of colour options, architectural details can be emphasised in unique ways...',
    img: 'https://images.pexels.com/photos/2626770/pexels-photo-2626770.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Sliding Neon LEDs: The New Life of Light',
    excerpt: 'Lighting technology is undergoing a major evolution today. We\'ve transitioned from traditional halogen lamps to incandescent bulbs and then to compact fluorescent lamps...',
    img: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Can Neon LED Signs Be Repaired?',
    excerpt: 'Our company takes pride in the quality and durability of the LED neon signs we offer. Our guaranteed repair service ensures your sign lasts a lifetime...',
    img: 'https://images.pexels.com/photos/31338031/pexels-photo-31338031.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: prods }, { data: cols }, { data: revs }] = await Promise.all([
        supabase.from('products').select('*').limit(8),
        supabase.from('collections').select('*').limit(6),
        supabase.from('reviews').select('*').limit(5),
      ]);
      setProducts(prods ?? []);
      setCollections(cols ?? []);
      setReviews(revs ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Purple gradient bg */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #3b0e6e 0%, #5c1fa0 30%, #4a1590 55%, #2d1270 80%, #1e0d5a 100%)' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20" style={{ background: 'radial-gradient(ellipse at top right, #c026d3 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-15" style={{ background: 'radial-gradient(ellipse at bottom left, #7c3aed 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-20 lg:pb-14 text-center">
          {/* Sale pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={15} className="text-yellow-300" />
            <span className="text-sm text-white/90 font-medium">25% OFF All Custom Signs — Limited Time</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Custom LED Neon Signs,
            <br />
            <span style={{ color: 'var(--neon-pink)' }} className="neon-text">Love at First Light!</span>
          </h1>

          <p className="text-white/75 text-base lg:text-lg max-w-xl mx-auto mt-5 leading-relaxed">
            Transform your space with handcrafted LED neon. From design to delivery in as little as 3–4 days.
          </p>

          {/* Three action cards */}
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {/* Design Your Own */}
            <button
              onClick={() => navigate('/customiser')}
              className="group relative rounded-2xl overflow-hidden border border-white/15 hover:border-white/40 transition-all hover:-translate-y-1 text-left bg-[#1e0d5a]/60 backdrop-blur-sm"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/8348735/pexels-photo-8348735.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Design Your Own"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-[#1e0d5a]/80">
                <h3 className="text-white font-bold text-base">Design Your Own</h3>
                <p className="text-white/60 text-sm mt-1">Use our builder to create something unique</p>
                <span className="text-[var(--neon-pink)] text-xs font-semibold flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
                  Start Designing <ArrowRight size={13} />
                </span>
              </div>
            </button>

            {/* Upload Your Design */}
            <button
              onClick={() => navigate('/logo-upload')}
              className="group relative rounded-2xl overflow-hidden border border-white/15 hover:border-white/40 transition-all hover:-translate-y-1 text-left bg-[#1e0d5a]/60 backdrop-blur-sm"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/5704857/pexels-photo-5704857.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Upload Your Design"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-[#1e0d5a]/80">
                <h3 className="text-white font-bold text-base">Upload Your Design</h3>
                <p className="text-white/60 text-sm mt-1">Fast quotes for logos, artwork &amp; sketches</p>
                <span className="text-[var(--neon-pink)] text-xs font-semibold flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
                  Get a Quote <ArrowRight size={13} />
                </span>
              </div>
            </button>

            {/* Browse Ideas */}
            <button
              onClick={() => navigate('/collections')}
              className="group relative rounded-2xl overflow-hidden border border-white/15 hover:border-white/40 transition-all hover:-translate-y-1 text-left bg-[#1e0d5a]/60 backdrop-blur-sm"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/9308466/pexels-photo-9308466.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Browse Ideas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-[#1e0d5a]/80">
                <h3 className="text-white font-bold text-base">Browse Ideas</h3>
                <p className="text-white/60 text-sm mt-1">Explore designs &amp; get inspired</p>
                <span className="text-[var(--neon-pink)] text-xs font-semibold flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
                  View All <ArrowRight size={13} />
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: 'var(--neon-pink)' }} className="overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: Clock, title: 'Quick Turnaround', sub: 'From 7–10 days to UK mainland' },
              { icon: Star, title: '250+ 5-Star Reviews', sub: 'Rated Excellent on Trustpilot' },
              { icon: MapPin, title: 'UK Made in London', sub: 'Handcrafted by our skilled team' },
              { icon: CreditCard, title: 'Pay with Klarna', sub: 'Flexible payment options' },
              { icon: Truck, title: 'Free Worldwide Shipping', sub: 'On orders over £75' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <item.icon size={22} className="text-white shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm leading-none">{item.title}</p>
                  <p className="text-white/75 text-xs mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* READY TO CREATE CTA */}
      <section className="relative overflow-hidden py-16 lg:py-20" style={{ background: 'linear-gradient(135deg, #3b0e6e 0%, #5c1fa0 35%, #4a1590 65%, #2d1270 100%)' }}>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20" style={{ background: 'radial-gradient(ellipse at top right, #c026d3 0%, transparent 60%)' }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/60 uppercase tracking-[0.2em] text-xs font-semibold mb-3">GET STARTED TODAY</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Ready to Create{' '}
            <span style={{ color: 'var(--neon-pink)' }} className="neon-text">Something Amazing?</span>
          </h2>
          <p className="text-white/70 mt-4 text-base">Design your own custom LED neon sign.</p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => navigate('/customiser')}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: 'var(--neon-pink)' }}
            >
              Design Your Own <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/logo-upload')}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm bg-white/10 border border-white/25 backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5"
            >
              Upload Your Logo <Upload size={16} />
            </button>
            <button
              onClick={() => navigate('/collections')}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm bg-white/10 border border-white/25 backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5"
            >
              Shop Collection <Search size={16} />
            </button>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">4.9</span>
              <Star size={15} className="text-[#00b67a] fill-[#00b67a]" />
              <span className="text-white/70 text-sm">Trustpilot</span>
              <div className="flex gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 rounded-sm flex items-center justify-center" style={{ background: '#00b67a' }}>
                    <Star size={12} className="text-white fill-white" />
                  </div>
                ))}
              </div>
            </div>
            <span className="text-white/30 hidden sm:block">|</span>
            {['2 Year Guarantee', 'UK Handmade', 'Free UK Delivery'].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'var(--neon-pink)' }}>
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-white"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-white/80 text-xs font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 lg:py-20 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white neon-text" style={{ textShadow: '0 0 30px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)' }}>
              HOW IT WORKS
            </h2>
            <p className="text-3xl lg:text-4xl font-extrabold mt-1 neon-text" style={{ color: 'var(--neon-pink)', textShadow: '0 0 20px var(--neon-pink)' }}>
              NEON LAB
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {[
              { step: 1, title: 'Upload or Design', desc: 'Send us your artwork or create something using our custom builder tool.', active: true },
              { step: 2, title: 'Approve Your Design', desc: "We'll send you a visual proof and quote. Make changes until it's perfect.", active: false },
              { step: 3, title: 'We Make It', desc: 'Your sign is handcrafted and dispatched within days.', active: false },
            ].map(({ step, title, desc, active }) => (
              <div
                key={step}
                className="relative rounded-2xl p-8 border transition-all text-center"
                style={{
                  background: active ? 'linear-gradient(135deg, #2d1060 0%, #3d1a80 100%)' : 'rgba(255,255,255,0.03)',
                  borderColor: active ? 'rgba(192,38,211,0.4)' : 'rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-lg mx-auto mb-6"
                  style={{ background: 'linear-gradient(135deg, #c026d3 0%, #7c3aed 100%)' }}
                >
                  {step}
                </div>
                <h3 className={`font-bold text-lg mb-3 ${active ? 'text-white' : 'text-white/60'}`}>{title}</h3>
                <p className={`text-sm leading-relaxed ${active ? 'text-white/70' : 'text-white/40'}`}>{desc}</p>
                {active && (
                  <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, var(--neon-pink), #7c3aed)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Shop By Category</h2>
          <p className="text-gray-400 mt-3">Explore our range of neon collections</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.slug}
              onClick={() => navigate(`/collections/${cat.slug}`)}
              className={`group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all hover:-translate-y-1 ${
                i === 0 ? 'col-span-2 md:col-span-1 lg:row-span-2 aspect-square lg:aspect-auto' : 'aspect-square'
              }`}
            >
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <h3 className="text-white font-bold text-sm lg:text-base">{cat.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>


      {/* COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Collections</h2>
          <button onClick={() => navigate('/collections')} className="text-[var(--neon-pink)] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {COLLECTION_CATS.map((col) => (
            <button
              key={col.slug}
              onClick={() => navigate(`/collections/${col.slug}`)}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all"
            >
              <img src={col.img} alt={col.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <h3 className="text-white font-semibold text-xs lg:text-sm">{col.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BESTSELLER PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Bestseller Products</h2>
          <button onClick={() => navigate('/collections')} className="text-[var(--neon-pink)] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight size={16} />
          </button>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square bg-white/5 rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* SECOND MARQUEE */}
      <section className="bg-gradient-to-r from-[var(--neon-pink)] via-[var(--neon-orange)] to-[var(--neon-pink)] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-sm font-bold text-white px-8">
              SUMMER SALES HAVE STARTED! 10% OFF | COUPON CODE: NEONSUMMER
              <span className="mx-2 opacity-50">•</span>
              Free Worldwide Shipping - Orders Over £75
              <span className="mx-2 opacity-50">•</span>
            </span>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Why Choose Us</h2>
          <p className="text-gray-400 mt-3">Premium quality, designed to last</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            { icon: PenTool, title: 'Custom Design', desc: 'Each LED neon sign or artwork is designed in-house by our professional designers.' },
            { icon: Zap, title: 'Energy & Cost Efficiency', desc: 'Low energy consumption, over 100,000 hours of usage life, no heat or noise.' },
            { icon: Recycle, title: 'Durable', desc: 'The latest neon flex technology, which is stronger and lighter than glass neon tubes.' },
            { icon: Wrench, title: 'Easy Mounting', desc: 'If you don\'t want to damage your wall, you can purchase our mounting tapes that can carry up to 50kg.' },
          ].map((f, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--neon-pink)]/20 to-[var(--neon-purple)]/20 flex items-center justify-center mx-auto mb-4">
                <f.icon size={26} className="text-[var(--neon-pink)]" />
              </div>
              <h3 className="text-white font-bold text-sm lg:text-base mb-2">{f.title}</h3>
              <p className="text-gray-400 text-xs lg:text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      {reviews.length > 0 && (
        <section className="bg-white/[0.02] border-y border-white/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">What People Are Saying</h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <StarRating rating={5} size={24} />
                <span className="text-white text-lg font-semibold">4.9 / 5</span>
                <span className="text-gray-500 text-sm">from 2,000+ customers</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 5).map((r) => (
                <div key={r.id} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <StarRating rating={r.rating} size={16} />
                  {r.title && <p className="text-white font-semibold mt-3">{r.title}</p>}
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-4">{r.body}</p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--neon-pink)] to-[var(--neon-purple)] flex items-center justify-center text-white font-bold text-sm">
                      {r.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{r.author}</p>
                      {r.location && <p className="text-gray-500 text-xs">{r.location}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BRANDS MARQUEE */}
      <section className="py-16 overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">Brands We Work With</h2>
        </div>
        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span key={i} className="text-2xl lg:text-3xl font-bold text-gray-600 hover:text-gray-400 transition-colors px-8 lg:px-12 select-none">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENTS OF THE BOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden border border-white/10">
            <img
              src="https://images.pexels.com/photos/31338031/pexels-photo-31338031.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Contents of the Box"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Contents of the Box</h2>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Every Neon Lab by Yash sign comes with everything you need for a seamless installation. Your box includes:
            </p>
            <ul className="space-y-4 mt-6">
              {[
                'Your custom LED neon sign',
                '12V power adaptor with 2m cable',
                'Wall mounting screws and anchors',
                'Remote dimmer (if selected)',
                'Care and installation guide',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--neon-pink)]/20 flex items-center justify-center shrink-0">
                    <span className="text-[var(--neon-pink)] text-xs font-bold">{i + 1}</span>
                  </div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 p-10 lg:p-16 text-center bg-gradient-to-br from-[#1a0a2e] to-[#0a1a2e]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: 'var(--neon-pink)' }} />
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Sign up now & get <span style={{ color: 'var(--neon-pink)' }}>£10 off</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              Be the first to get the latest news about trends, promotions, and much more!
            </p>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              formData.append('_subject', 'Newsletter Signup — Neon Lab by Yash');
              try {
                await fetch('https://formspree.io/f/mjgnbpve', { method: 'POST', body: formData, headers: { Accept: 'application/json' } });
                form.reset();
                alert('Thanks for subscribing! You\'ll receive your £10 off code shortly.');
              } catch {
                alert('Something went wrong. Please try again.');
              }
            }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--neon-pink)] transition-colors"
              />
              <button type="submit" className="bg-[var(--neon-pink)] text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">From Our Blog</h2>
          <p className="text-gray-400 mt-3">Tips, trends, and stories from the world of neon</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <article key={i} className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold text-sm lg:text-base leading-snug">{post.title}</h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-3">{post.excerpt}</p>
                <button className="text-[var(--neon-pink)] text-sm font-medium mt-3 flex items-center gap-1 hover:gap-2 transition-all">
                  Read more <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
