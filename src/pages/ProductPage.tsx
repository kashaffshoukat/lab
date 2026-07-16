import { useEffect, useState } from 'react';
import { supabase, formatPrice } from '../lib';
import { useCart } from '../cart';
import type { Product, Review } from '../types';
import { navigate } from '../router';
import { StarRating } from '../components/StarRating';
import { ShoppingBag, ArrowLeft, Truck, ShieldCheck, Award, BadgeCheck, ThumbsUp, Heart } from 'lucide-react';
import { useWishlist } from '../cart';

export function ProductPage({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const wishlist = useWishlist();

  useEffect(() => {
    (async () => {
      const { data: prod } = await supabase.from('products').select('*').eq('slug', slug).maybeSingle();
      setProduct(prod);
      if (prod) {
        const { data: revs } = await supabase.from('reviews').select('*').eq('product_id', prod.id).order('created_at', { ascending: false }).limit(5);
        setReviews(revs ?? []);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-white/5 rounded-2xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-white/5 rounded animate-pulse" />
            <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse" />
            <div className="h-32 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400">Product not found.</p>
        <button onClick={() => navigate('/collections')} className="text-[var(--neon-pink)] mt-4 hover:underline">Back to Collections</button>
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image_url].filter(Boolean) as string[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <button onClick={() => navigate('/collections')} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6">
        <ArrowLeft size={16} /> Back to Collections
      </button>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            {gallery[activeImage] && <img src={gallery[activeImage]} alt={product.name} className="w-full h-full object-cover" />}
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-3 mt-4">
              {gallery.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === activeImage ? 'border-[var(--neon-pink)]' : 'border-white/10'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.badge && (
            <span className="inline-block bg-[var(--neon-pink)] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{product.badge}</span>
          )}
          <h1 className="text-3xl lg:text-4xl font-bold text-white">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <StarRating rating={product.rating} />
            <span className="text-gray-400 text-sm">{product.rating.toFixed(1)} ({reviews.length} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <span className="text-3xl font-bold text-[var(--neon-pink)]">{formatPrice(product.price)}</span>
            {product.compare_at_price && <span className="text-gray-500 text-lg line-through">{formatPrice(product.compare_at_price)}</span>}
          </div>

          {product.description && <p className="text-gray-400 mt-5 leading-relaxed">{product.description}</p>}

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-white/15 rounded-xl">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-gray-300 hover:text-white">−</button>
              <span className="text-white px-4">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-gray-300 hover:text-white">+</button>
            </div>
            <button
              onClick={() => add({ id: product.id, name: product.name, price: product.price, image_url: product.image_url, quantity: qty })}
              disabled={!product.in_stock}
              className="flex-1 bg-[var(--neon-pink)] text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <ShoppingBag size={18} /> {product.in_stock ? 'Add to Cart' : 'Sold Out'}
            </button>
            <button
              onClick={() => wishlist.toggle({ id: product.id, name: product.name, price: product.price, image_url: product.image_url, quantity: 1 })}
              className={`w-12 h-12 shrink-0 rounded-xl border flex items-center justify-center transition-all ${
                wishlist.has(product.id)
                  ? 'border-[var(--neon-pink)] bg-[var(--neon-pink)]/10 text-[var(--neon-pink)]'
                  : 'border-white/15 text-gray-400 hover:border-white/30 hover:text-white'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart size={20} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
            {[
              { icon: Truck, label: 'Free Shipping over £75' },
              { icon: ShieldCheck, label: '24 Month Warranty' },
              { icon: Award, label: 'Premium LED Quality' },
            ].map((f, i) => (
              <div key={i} className="text-center">
                <f.icon size={24} className="text-[var(--neon-pink)] mx-auto mb-2" />
                <p className="text-gray-400 text-xs">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map((r) => {
              const gradient = r.avatar_color ?? 'from-pink-500 to-rose-500';
              const source = r.source ?? 'Website';
              return (
                <div key={r.id} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                      {r.author.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-white font-semibold text-sm">{r.author}</p>
                        {r.verified !== false && (
                          <span className="inline-flex items-center gap-0.5 text-[#1a73e8] text-xs font-medium">
                            <BadgeCheck size={13} /> Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-gray-500 text-xs">{r.location}</span>
                        <span className="text-gray-600 text-xs">·</span>
                        <span className="text-gray-500 text-xs">{r.reviewed_at ? new Date(r.reviewed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
                      </div>
                    </div>
                    <StarRating rating={r.rating} size={14} />
                  </div>
                  {r.title && <p className="text-white font-semibold text-sm mb-1">{r.title}</p>}
                  <p className="text-gray-400 text-sm leading-relaxed">{r.body}</p>
                  {r.helpful_count != null && r.helpful_count > 0 && (
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5 text-gray-500 text-xs">
                      <ThumbsUp size={13} /> {r.helpful_count} found this helpful
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
