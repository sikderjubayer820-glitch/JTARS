import React from 'react';
import { X, ShoppingBag, Trash2, Minus, Plus, ArrowRight, Truck } from 'lucide-react';
import { CartItem, Product } from '../types';
import { ProductArt } from './ProductArt';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  products: Product[];
  freeShippingThreshold?: number;
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  products,
  freeShippingThreshold = 1500,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreProducts
}) => {
  if (!isOpen) return null;

  const getProduct = (id: number) => products.find(p => p.id === id);

  const subtotal = cart.reduce((sum, it) => {
    const prod = getProduct(it.id);
    return sum + (prod ? prod.price * it.quantity : 0);
  }, 0);

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-120 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/75 backdrop-blur-sm"></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#0e0f12] border-l border-[#2e3037] shadow-2xl flex flex-col justify-between z-10 text-[#f5f6f7]">
        {/* Header */}
        <div className="p-5 border-b border-[#25282f] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-500" />
            <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">Your Cart</h2>
            <span className="text-xs font-mono text-[#8a8e97] bg-[#1a1b22] px-2 py-0.5 rounded-full">
              {cart.reduce((n, i) => n + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#181a20] text-[#a0a4ad] hover:text-white grid place-items-center"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="px-5 py-3.5 bg-[#121419] border-b border-[#21232a]">
          <div className="flex items-center justify-between text-xs text-[#b9bdc5] mb-2">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-400" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-white font-display">৳{remainingForFreeShipping}</strong> more for free
                  shipping
                </span>
              ) : (
                <strong className="text-emerald-400">You unlocked Free Delivery!</strong>
              )}
            </span>
            <span className="font-mono text-[11px] text-[#787c86]">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#25272e] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#15171d] border border-[#272930] grid place-items-center text-[#555a64] mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-white">Your Cart is Empty</h3>
              <p className="text-xs text-[#828690] mt-1 max-w-xs">
                Explore the latest JTARS drop and add your favorite streetwear essentials.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="mt-4 px-5 py-2.5 rounded-full bg-[#1b1c22] hover:bg-blue-600 border border-[#34373f] text-xs font-semibold text-white transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(item => {
              const product = getProduct(item.id);
              if (!product) return null;
              const itemTotal = product.price * item.quantity;

              return (
                <div
                  key={item.key}
                  className="p-3.5 rounded-xl bg-[#14151a] border border-[#25272e] flex gap-3.5 relative group"
                >
                  {/* Thumbnail art */}
                  <div className="w-18 h-20 rounded-lg bg-[#1c1d22] border border-[#2c2f37] p-1 shrink-0 overflow-hidden">
                    <ProductArt type={product.type} color={item.color} name={product.name} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-xs text-white truncate pr-6">{product.name}</h4>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-[#8e929b]">
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-white/20"
                            style={{ backgroundColor: item.color }}
                          ></span>
                          <span>Size {item.size}</span>
                        </span>
                        <span>•</span>
                        <span>৳{product.price} each</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      {/* Quantity stepper */}
                      <div className="h-7 px-1.5 rounded-md bg-[#191b21] border border-[#31343c] flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.key, -1)}
                          className="w-5 h-5 grid place-items-center text-[#8e939d] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-semibold text-white text-[11px] min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.key, 1)}
                          className="w-5 h-5 grid place-items-center text-[#8e939d] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-display font-semibold text-sm text-white">
                        ৳{itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.key)}
                    className="absolute top-3 right-3 text-[#70747e] hover:text-rose-400 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#25282f] bg-[#0c0d10] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#8f939c]">
              <span>Subtotal</span>
              <span className="font-display text-xl font-bold text-white">৳{subtotal.toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-[#71757f]">
              Delivery and taxes calculated at checkout. Free shipping on orders over ৳1500.
            </p>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full h-11 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
