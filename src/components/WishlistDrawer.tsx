import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { ProductArt } from './ProductArt';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: number[];
  products: Product[];
  onRemoveFromWishlist: (id: number) => void;
  onAddToCart: (product: Product) => void;
  onExplore: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onAddToCart,
  onExplore
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-120 flex justify-end animate-fadeIn">
      <div onClick={onClose} className="fixed inset-0 bg-black/75 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-md h-full bg-[#0e0f12] border-l border-[#2e3037] shadow-2xl flex flex-col justify-between z-10 text-[#f5f6f7]">
        {/* Header */}
        <div className="p-5 border-b border-[#25282f] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">Your Wishlist</h2>
            <span className="text-xs font-mono text-[#8a8e97] bg-[#1a1b22] px-2 py-0.5 rounded-full">
              {wishlistedProducts.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#181a20] text-[#a0a4ad] hover:text-white grid place-items-center"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#15171d] border border-[#272930] grid place-items-center text-[#555a64] mb-3">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-white">Wishlist is Empty</h3>
              <p className="text-xs text-[#828690] mt-1 max-w-xs">
                Save pieces you love to buy later or monitor availability.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="mt-4 px-5 py-2.5 rounded-full bg-[#1b1c22] hover:bg-blue-600 border border-[#34373f] text-xs font-semibold text-white transition-all"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            wishlistedProducts.map(product => (
              <div
                key={product.id}
                className="p-3.5 rounded-xl bg-[#14151a] border border-[#25272e] flex gap-3.5 relative"
              >
                <div className="w-18 h-20 rounded-lg bg-[#1c1d22] border border-[#2c2f37] p-1 shrink-0 overflow-hidden">
                  <ProductArt type={product.type} color={product.color} name={product.name} />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-xs text-white truncate pr-6">{product.name}</h4>
                    <span className="text-[10px] text-[#8a8e97] uppercase">{product.category}</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-display font-semibold text-sm text-white">
                      ৳{product.price.toLocaleString()}
                    </span>

                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="h-7 px-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-md transition-all"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveFromWishlist(product.id)}
                  className="absolute top-3 right-3 text-[#70747e] hover:text-rose-400 p-1"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
