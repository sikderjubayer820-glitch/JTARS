import React from 'react';
import { X, Truck, Ruler, Shield, Shirt, Layers, Star } from 'lucide-react';
import { CategoryType } from '../types';

interface InfoModalProps {
  type: 'shipping' | 'size' | 'privacy' | 'more-categories' | null;
  onClose: () => void;
  onSelectCategory?: (cat: CategoryType) => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose, onSelectCategory }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-130 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#111216] border border-[#373a42] rounded-2xl p-6 sm:p-8 text-[#f5f6f7] shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1b1c20] text-[#a0a4ad] hover:text-white grid place-items-center"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'shipping' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Truck className="w-5 h-5 text-blue-400" />
              <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                SHIPPING & <span className="text-blue-500">DELIVERY</span>
              </h2>
            </div>
            <p className="text-xs text-[#8c909b] leading-relaxed">
              JTARS delivers premium apparel nationwide across all districts and divisions of Bangladesh.
            </p>

            <div className="space-y-3 pt-2 text-xs text-[#c9ccd4] leading-relaxed">
              <div className="p-3.5 rounded-xl bg-[#16181d] border border-[#272930]">
                <h4 className="font-bold text-white mb-1">Free Delivery Eligibility</h4>
                <p>
                  Orders with a subtotal of <strong className="text-blue-400">৳1500 or higher</strong> qualify for
                  completely free shipping. Orders below ৳1500 have a standard courier fee of ৳80.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#16181d] border border-[#272930]">
                <h4 className="font-bold text-white mb-1">Delivery Timeframes</h4>
                <p>
                  • <strong>Inside Dhaka Metropolitan:</strong> 24 to 48 hours.<br />
                  • <strong>Outside Dhaka & Nationwide:</strong> 2 to 4 business days.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#16181d] border border-[#272930]">
                <h4 className="font-bold text-white mb-1">Hassle-Free Returns & Exchanges</h4>
                <p>
                  Items in original, unworn condition with tags intact can be returned or exchanged within 7 days of delivery.
                  Contact support with your Order ID to initiate an exchange.
                </p>
              </div>
            </div>
          </div>
        )}

        {type === 'size' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Ruler className="w-5 h-5 text-blue-400" />
              <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                JTARS <span className="text-blue-500">SIZE GUIDE</span>
              </h2>
            </div>
            <p className="text-xs text-[#8c909b]">
              All JTARS garments feature a tailored streetwear silhouette. If you prefer a loose oversized aesthetic, consider sizing up.
            </p>

            <div className="overflow-x-auto rounded-xl border border-[#272930] bg-[#16181d]">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#101115] text-[#8e939d] uppercase text-[10px] font-semibold">
                  <tr>
                    <th className="p-3">Size</th>
                    <th className="p-3">Chest (Inches)</th>
                    <th className="p-3">Body Length (Inches)</th>
                    <th className="p-3">Sleeve Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#22242c] text-[#d0d3d8]">
                  <tr>
                    <td className="p-3 font-bold text-white">S (Small)</td>
                    <td className="p-3">36 - 38&quot;</td>
                    <td className="p-3">27&quot;</td>
                    <td className="p-3">24.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">M (Medium)</td>
                    <td className="p-3">38 - 40&quot;</td>
                    <td className="p-3">28&quot;</td>
                    <td className="p-3">25&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">L (Large)</td>
                    <td className="p-3">40 - 42&quot;</td>
                    <td className="p-3">29&quot;</td>
                    <td className="p-3">25.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">XL (Extra Large)</td>
                    <td className="p-3">42 - 44&quot;</td>
                    <td className="p-3">30&quot;</td>
                    <td className="p-3">26&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">XXL (Double XL)</td>
                    <td className="p-3">44 - 46&quot;</td>
                    <td className="p-3">31&quot;</td>
                    <td className="p-3">26.5&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-lg bg-[#14151a] border border-[#272930] text-xs text-[#8c909b]">
              Caps feature an adjustable metallic strap and fit head circumferences between 54 cm and 62 cm (One Size fits all).
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-blue-400" />
              <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                PRIVACY <span className="text-blue-500">POLICY</span>
              </h2>
            </div>
            <p className="text-xs text-[#8c909b]">
              Your trust is fundamental to the JTARS brand ethos.
            </p>

            <div className="space-y-3 text-xs text-[#c9ccd4] leading-relaxed">
              <p>
                <strong>Information Handling:</strong> When you place an order with JTARS, we collect essential recipient details (name, phone number, delivery address) strictly for order fulfillment and courier dispatch.
              </p>
              <p>
                <strong>Zero 3rd-Party Selling:</strong> We never sell, lease, or monetize your contact information or browsing data to advertising brokers.
              </p>
              <p>
                <strong>Security:</strong> All internal transactions and staff communications are secured under authenticated encryption protocols.
              </p>
            </div>
          </div>
        )}

        {type === 'more-categories' && onSelectCategory && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-5 h-5 text-blue-400" />
              <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                EXPLORE <span className="text-blue-500">CATEGORIES</span>
              </h2>
            </div>
            <p className="text-xs text-[#8c909b] mb-4">
              Select an apparel category to view all matching pieces in the JTARS inventory.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { cat: 'featured' as CategoryType, label: 'Featured Drops', desc: 'Handpicked styles' },
                { cat: 'all' as CategoryType, label: 'Shop All Items', desc: 'Entire apparel vault' },
                { cat: 'hoodie' as CategoryType, label: 'Hoodies', desc: 'Fleece & thermal pullovers' },
                { cat: 'sweatshirt' as CategoryType, label: 'Sweatshirts', desc: 'Heavy French terry' },
                { cat: 'tshirt' as CategoryType, label: 'T-Shirts', desc: 'Heavyweight 220 GSM' },
                { cat: 'jacket' as CategoryType, label: 'Jackets', desc: 'Windbreakers & track jackets' },
                { cat: 'cap' as CategoryType, label: 'Caps', desc: '6-Panel structured caps' }
              ].map(item => (
                <button
                  key={item.cat}
                  onClick={() => {
                    onSelectCategory(item.cat);
                    onClose();
                  }}
                  className="p-4 rounded-xl bg-[#16181e] hover:bg-[#1e2129] border border-[#2c2f37] hover:border-blue-500 text-left transition-all group"
                >
                  <p className="font-bold text-xs text-white group-hover:text-blue-400">{item.label}</p>
                  <p className="text-[11px] text-[#7d818a] mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
