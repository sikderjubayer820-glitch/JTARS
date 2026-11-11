import React, { useState } from 'react';
import { X, ShoppingBag, Truck, Minus, Plus, Ruler, Check } from 'lucide-react';
import { Product } from '../types';
import { ProductArt } from './ProductArt';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<string>(product.color);
  const sizes = product.category === 'cap' ? ['One Size'] : ['S', 'M', 'L', 'XL', 'XXL'];
  const [selectedSize, setSelectedSize] = useState<string>(product.category === 'cap' ? 'One Size' : 'M');
  const [quantity, setQuantity] = useState<number>(1);

  const [previewMode, setPreviewMode] = useState<'photo' | 'art'>(product.image ? 'photo' : 'art');

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-130 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#111216] border border-[#3a3d43] rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] text-[#f5f6f7]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute z-20 top-3 right-3 w-9 h-9 rounded-full bg-[#1b1c20] text-[#a0a4ad] hover:text-white grid place-items-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Garment Photo or Art Visualizer */}
          <div className="relative min-h-[280px] sm:min-h-[360px] bg-gradient-to-b from-[#1b1c1e] to-[#121316] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#26282e]">
            {previewMode === 'photo' && product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-[280px] max-h-[320px] object-cover rounded-xl shadow-lg border border-[#2d3038]"
              />
            ) : (
              <div className="w-full max-w-[280px] h-[240px] sm:h-[280px]">
                <ProductArt type={product.type} color={selectedColor} name={product.name} />
              </div>
            )}

            {/* Toggle view button if product has both photo and vector art */}
            {product.image && (
              <div className="absolute top-4 left-4 z-10 flex rounded-lg bg-black/60 backdrop-blur-sm p-1 border border-white/10 text-[10px] font-semibold">
                <button
                  type="button"
                  onClick={() => setPreviewMode('photo')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    previewMode === 'photo' ? 'bg-blue-600 text-white' : 'text-[#a0a4ad] hover:text-white'
                  }`}
                >
                  Real Photo
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('art')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    previewMode === 'art' ? 'bg-blue-600 text-white' : 'text-[#a0a4ad] hover:text-white'
                  }`}
                >
                  Vector Art
                </button>
              </div>
            )}

            <div className="absolute bottom-3 left-4 text-[10px] uppercase font-mono text-[#787c85]">
              {previewMode === 'photo' ? 'Product Photograph' : 'Interactive Fabric View'}
            </div>
          </div>

          {/* Right: Product Details & Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                {product.category} / JTARS Originals
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white mt-1">
                {product.name}
              </h2>
              <div className="font-display text-2xl font-bold text-white mt-2">
                ৳{product.price.toLocaleString()}
              </div>

              <p className="mt-3 text-xs text-[#969aa3] leading-relaxed">
                {product.description ||
                  'Premium heavyweight fabric with an ultra-soft hand feel, comfortable streetwear cut and signature JTARS emblem. Built to maintain its structure through daily motion.'}
              </p>

              {/* Color Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-[#d2d4d8] mb-2">
                  <span>Colorway</span>
                  <span className="font-mono text-[11px] text-blue-400">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full p-0.5 border transition-all ${
                        selectedColor === c
                          ? 'border-blue-500 ring-2 ring-blue-500/30 scale-110'
                          : 'border-[#44474e] hover:border-white'
                      }`}
                    >
                      <span className="block w-full h-full rounded-full" style={{ backgroundColor: c }}></span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-[#d2d4d8] mb-2">
                  <span>Select Size</span>
                  <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedSize === s
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'bg-[#181a20] text-[#b9bdc4] hover:text-white border border-[#33363e]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="mt-6 pt-5 border-t border-[#23252b]">
              <div className="flex items-center gap-3">
                <div className="h-11 px-2 rounded-lg bg-[#181a20] border border-[#34373d] flex items-center justify-between gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 grid place-items-center text-[#a0a4ad] hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-semibold text-white min-w-[20px] text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-7 h-7 grid place-items-center text-[#a0a4ad] hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 h-11 px-5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag — ৳{(product.price * quantity).toLocaleString()}</span>
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-[#828790]">
                <Truck className="w-4 h-4 text-blue-400" />
                <span>Free shipping on all orders over ৳1500 across Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
