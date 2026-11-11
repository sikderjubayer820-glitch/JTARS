import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { ProductArt } from './ProductArt';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView
}) => {
  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative h-[270px] sm:h-[280px] p-3 sm:p-4 rounded-xl bg-gradient-to-br from-[#202021] to-[#181819] border border-[#3b3c3f] hover:border-[#536577] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(22,132,255,0.05)] select-none"
    >
      {/* Wishlist Button */}
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          onToggleWishlist(product.id);
        }}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`absolute z-10 top-3 right-3 w-8 h-8 rounded-full grid place-items-center transition-transform hover:scale-110 ${
          isWishlisted
            ? 'text-rose-500 bg-rose-500/15'
            : 'text-[#a8aaae] hover:text-white bg-black/40 hover:bg-black/70'
        }`}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image or Vector Apparel Art */}
      <div className="relative w-full h-44 -mt-1 flex items-center justify-center overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
            onError={e => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        ) : (
          <ProductArt type={product.type} color={product.color} name={product.name} />
        )}
      </div>

      {/* Info & Bottom Bar */}
      <div>
        <div className="flex items-center justify-between text-[10px] text-[#8e929b] uppercase tracking-wider mb-0.5">
          <span>{product.category}</span>
          {product.stock <= 8 && (
            <span className="text-amber-400 font-bold">Only {product.stock} left</span>
          )}
        </div>

        <h3 className="font-semibold text-xs sm:text-sm text-[#e0e0e1] truncate group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-display text-lg sm:text-xl font-bold text-[#f5f6f7]">
            ৳{product.price.toLocaleString()}
          </span>

          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="h-7.5 px-3 rounded-full bg-[#f2f2f2] hover:bg-blue-600 text-black hover:text-white text-[10px] sm:text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm transform hover:-translate-y-0.5 shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};
