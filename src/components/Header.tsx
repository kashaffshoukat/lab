import { Heart, ShoppingBag, Menu, X, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { navigate, useRoute } from '../router';
import { useCart, useWishlist } from '../cart';
import { formatPrice } from '../lib';

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'Customiser', path: '/customiser' },
  { label: 'Collections', path: '/collections' },
  { label: 'Logo Upload', path: '/logo-upload' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'FAQ', path: '/faq' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const wishlistRef = useRef<HTMLDivElement>(null);
  const route = useRoute();
  const { count, setOpen } = useCart();
  const wishlist = useWishlist();

  const isActive = (path: string) => {
    if (path === '/collections') return route.name === 'collections' || route.name === 'collection';
    if (path === '/customiser') return route.name === 'customiser';
    if (path === '/logo-upload') return route.name === 'logo-upload';
    if (path === '/reviews') return route.name === 'reviews';
    if (path === '/faq') return route.name === 'faq';
    return false;
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wishlistRef.current && !wishlistRef.current.contains(e.target as Node)) {
        setWishlistOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0f] backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>

          <a href="#/" className="flex items-center select-none" aria-label="Neon Lab by Yash home">
            <img src="/logo.png" alt="Neon Lab by Yash" className="h-12 lg:h-14 w-auto object-contain" />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-[var(--neon-pink)] ${
                  isActive(item.path) ? 'text-[var(--neon-pink)]' : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 lg:gap-5">
            {/* Wishlist */}
            <div className="relative" ref={wishlistRef}>
              <button
                onClick={() => setWishlistOpen(!wishlistOpen)}
                className="relative text-gray-300 hover:text-white transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlist.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--neon-pink)] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.count}
                  </span>
                )}
              </button>

              {wishlistOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 max-w-[calc(100vw-2rem)] bg-[#12121a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-white font-semibold text-sm">Wishlist ({wishlist.count})</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {wishlist.items.length === 0 ? (
                      <p className="text-gray-500 text-sm p-6 text-center">Your wishlist is empty</p>
                    ) : (
                      wishlist.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                              <Heart size={18} className="text-gray-600" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-medium truncate">{item.name}</p>
                            {item.variant && <p className="text-gray-500 text-[10px] truncate">{item.variant}</p>}
                            <p className="text-[var(--neon-pink)] text-xs font-semibold mt-0.5">{formatPrice(item.price)}</p>
                          </div>
                          <button
                            onClick={() => wishlist.remove(item.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors shrink-0 p-1"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  {wishlist.items.length > 0 && (
                    <div className="p-3 border-t border-white/10">
                      <button
                        onClick={() => { setWishlistOpen(false); navigate('/collections'); }}
                        className="w-full text-center text-sm text-[var(--neon-pink)] hover:underline py-1"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => setOpen(true)}
              className="relative text-gray-300 hover:text-white transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--neon-pink)] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50" style={{ background: '#0a0a0f' }}>
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            <img src="/logo.png" alt="Neon Lab by Yash" className="h-12 w-auto object-contain" />
            <button onClick={() => setMobileOpen(false)} className="text-white p-2">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-1">
            {NAV.map((item) => (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setMobileOpen(false); }}
                className="text-left text-lg font-medium text-gray-200 py-4 border-b border-white/5 hover:text-[var(--neon-pink)]"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function AnnouncementBar() {
  const messages = [
    '12 Month Warranty on All Signs',
    'Design Your Own Custom Neon Today',
  ];
  return (
    <div className="bg-gradient-to-r from-[var(--neon-pink)] via-[var(--neon-purple)] to-[var(--neon-blue)] overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {[...messages, ...messages, ...messages, ...messages].map((m, i) => (
          <span key={i} className="text-sm font-semibold text-white px-8">
            {m} <span className="mx-2 opacity-50">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
