import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../cart';
import { navigate } from '../router';
import { formatPrice } from '../lib';

export function CartDrawer() {
  const { items, isOpen, setOpen, remove, updateQty, total } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0e0e15] z-50 border-l border-white/10 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingBag size={20} /> Your Cart
          </h3>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
            <ShoppingBag size={48} className="text-gray-600" />
            <p className="text-gray-400">Your cart is empty.</p>
            <button
              onClick={() => { setOpen(false); navigate('/collections'); }}
              className="text-[var(--neon-pink)] text-sm font-semibold hover:underline"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-3">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center text-xs text-gray-500">Custom</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.name}</p>
                    {item.variant && <p className="text-gray-400 text-xs">{item.variant}</p>}
                    <p className="text-[var(--neon-pink)] text-sm font-semibold mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-white/15 rounded-lg">
                        <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2 py-1 text-gray-300 hover:text-white">
                          <Minus size={14} />
                        </button>
                        <span className="text-white text-sm px-2">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2 py-1 text-gray-300 hover:text-white">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => remove(item.id)} className="text-gray-500 hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Subtotal</span>
                <span className="text-white text-xl font-bold">{formatPrice(total)}</span>
              </div>
              <p className="text-gray-500 text-xs">Shipping & taxes calculated at checkout.</p>
              <button
                onClick={() => { setOpen(false); navigate('/checkout'); }}
                className="w-full bg-[var(--neon-pink)] text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                Checkout
              </button>
              <button onClick={() => setOpen(false)} className="w-full text-gray-400 text-sm hover:text-white">
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
