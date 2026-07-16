import { useState } from 'react';
import { useCart } from '../cart';
import { formatPrice } from '../lib';
import { navigate } from '../router';
import { ArrowLeft, Lock, CreditCard, Loader2, CheckCircle } from 'lucide-react';

export function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            email,
            items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity, variant: i.variant })),
            total,
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Checkout session failed');
      }
      const { url } = await response.json();
      if (url) {
        clear();
        window.location.href = url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white">Payment Successful!</h1>
        <p className="text-gray-400 mt-3">Thank you for your order. A confirmation email is on its way.</p>
        <button onClick={() => navigate('/')} className="mt-6 bg-[var(--neon-pink)] text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity">
          Back to Home
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-lg">Your cart is empty.</p>
        <button onClick={() => navigate('/collections')} className="text-[var(--neon-pink)] mt-4 hover:underline">Browse Products</button>
      </div>
    );
  }

  const shipping = total >= 7500 ? 0 : 795;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <button onClick={() => navigate('/collections')} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6">
        <ArrowLeft size={16} /> Continue Shopping
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <form onSubmit={handleCheckout} className="space-y-5">
            <div>
              <label className="block text-white font-semibold mb-2">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--neon-pink)]" />
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
                <Lock size={16} /> Secure payment powered by Stripe
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <CreditCard size={14} /> You will be redirected to Stripe to complete your payment securely.
              </div>
            </div>

            {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">{error}</div>}

            <button type="submit" disabled={loading} className="w-full bg-[var(--neon-pink)] text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <><Loader2 size={20} className="animate-spin" /> Processing...</> : <>Pay {formatPrice(total + shipping)}</>}
            </button>
          </form>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 h-fit">
          <h2 className="text-white font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                {item.image_url ? (
                  <img src={item.image_url} alt="" className="w-14 h-14 rounded-lg object-cover" />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center"><span className="text-xs text-gray-500">Custom</span></div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  {item.variant && <p className="text-gray-500 text-xs truncate">{item.variant}</p>}
                  <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                </div>
                <span className="text-white text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-gray-400 text-sm"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
            <div className="flex justify-between text-gray-400 text-sm"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
            <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10"><span>Total</span><span>{formatPrice(total + shipping)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
