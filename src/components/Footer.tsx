import React, { useState } from 'react';
import { Mail, Phone, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { JTARSLogo } from './JTARSLogo';
import { CategoryType } from '../types';

interface FooterProps {
  storeEmail?: string;
  storePhone?: string;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenTrackOrder: () => void;
  onOpenContact: () => void;
  onOpenInfo: (type: 'shipping' | 'size' | 'privacy') => void;
  onOpenAdminLogin: () => void;
  onSubscribeNewsletter: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  storeEmail = 'sikderjubayer820@gmail.com',
  storePhone = '+880 1712 345678',
  onSelectCategory,
  onOpenTrackOrder,
  onOpenContact,
  onOpenInfo,
  onOpenAdminLogin,
  onSubscribeNewsletter
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubscribeNewsletter(email.trim());
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="border-t border-[#292b30] bg-[#090a0c] text-[#f5f6f7]">
      <div className="w-[min(1480px,calc(100%-48px))] mx-auto py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <button onClick={handleScrollTop} className="inline-block text-left">
              <JTARSLogo className="w-24 h-16" textSize="text-2xl" />
            </button>
            <p className="text-xs text-[#8f939b] leading-relaxed max-w-sm">
              Premium streetwear essentials designed for those who choose to stand apart. Crafted with heavyweight
              cotton, precise silhouettes, and an uncompromising attitude.
            </p>
            <div className="text-xs font-semibold text-blue-400 font-display tracking-widest uppercase">
              WEAR THE DIFFERENCE
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Shop Drops</h4>
            <ul className="space-y-2 text-xs text-[#969aa2]">
              <li>
                <button
                  onClick={() => onSelectCategory('featured')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Featured Collection
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('hoodie')} className="hover:text-blue-400 transition-colors">
                  Hoodies
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('sweatshirt')} className="hover:text-blue-400 transition-colors">
                  Sweatshirts
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('tshirt')} className="hover:text-blue-400 transition-colors">
                  T-Shirts
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('jacket')} className="hover:text-blue-400 transition-colors">
                  Jackets
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('all')} className="hover:text-blue-400 transition-colors">
                  View All Products
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Support</h4>
            <ul className="space-y-2 text-xs text-[#969aa2]">
              <li>
                <button onClick={onOpenTrackOrder} className="hover:text-blue-400 transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-blue-400 transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('shipping')} className="hover:text-blue-400 transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('size')} className="hover:text-blue-400 transition-colors">
                  Size Guide
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('privacy')} className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Join The Inner Circle
            </h4>
            <p className="text-xs text-[#92969e] leading-relaxed">
              Receive secret drop alerts, limited-edition runs, and early VIP access directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 h-10 px-3.5 bg-[#121317] border border-[#34373e] rounded-l-lg text-xs text-white placeholder-[#686c75] focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-11 h-10 bg-blue-600 hover:bg-blue-500 text-white grid place-items-center rounded-r-lg transition-colors"
                aria-label="Subscribe"
              >
                {subscribed ? <Check className="w-4 h-4 text-emerald-300" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-emerald-400 block">Welcome to the JTARS inner circle!</span>
            )}

            <div className="pt-2 text-xs text-[#8e939d] space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a href={`mailto:${storeEmail}`} className="hover:text-white transition-colors">
                  {storeEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <a href={`tel:${storePhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {storePhone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with Admin portal shortcut */}
        <div className="mt-12 pt-6 border-t border-[#1e2025] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737780]">
          <div>
            &copy; {new Date().getFullYear()} JTARS Streetwear. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdminLogin}
              className="inline-flex items-center gap-1.5 text-xs text-[#858a94] hover:text-blue-400 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin Portal Login</span>
            </button>
            <span>•</span>
            <span className="font-display tracking-widest text-[#9ea3ab]">DHAKA • CHITTAGONG • SYLHET</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
