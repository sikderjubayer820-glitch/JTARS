import React, { useState, useRef, useEffect } from 'react';
import {
  Truck,
  Search,
  UserRound,
  ShoppingCart,
  Menu,
  ChevronDown,
  ArrowRight,
  Shield,
  Heart,
  X,
  PackageSearch,
  HelpCircle,
  Mail,
  Shirt,
  Sparkles
} from 'lucide-react';
import { JTARSLogo } from './JTARSLogo';
import { CategoryType, Product } from '../types';
import { ProductArt } from './ProductArt';

interface NavbarProps {
  currentCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  cartCount: number;
  wishlistCount: number;
  isAdminLoggedIn: boolean;
  freeShippingThreshold?: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenAdminLogin: () => void;
  onOpenAdminDashboard: () => void;
  onOpenTrackOrder: () => void;
  onOpenContact: (isHelp?: boolean) => void;
  onOpenProductQuickView: (product: Product) => void;
  products: Product[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  isAdminLoggedIn,
  freeShippingThreshold = 1500,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenAdminLogin,
  onOpenAdminDashboard,
  onOpenTrackOrder,
  onOpenContact,
  onOpenProductQuickView,
  products
}) => {
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Search filter
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.type.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (anchorId: string) => {
    setIsMobileMenuOpen(false);
    const elem = document.getElementById(anchorId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (cat: CategoryType) => {
    onSelectCategory(cat);
    setIsShopMenuOpen(false);
    setIsMobileMenuOpen(false);
    handleNavClick('collections');
  };

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="h-9 bg-[#0c0d0f] border-b border-[#292b2f] text-xs font-semibold relative z-55">
        <div className="w-[min(1480px,calc(100%-48px))] h-full mx-auto flex items-center justify-between gap-4">
          {/* Shipping note */}
          <div className="flex items-center gap-2 text-[#e7e8ea] text-[11px] sm:text-xs">
            <Truck className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="truncate">Free Shipping on Orders Over ৳{freeShippingThreshold}</span>
          </div>

          {/* Center message */}
          <div className="hidden md:flex items-center gap-3 text-[#d7d8db] text-xs">
            <span className="w-6 h-px bg-[#a5a7ac]"></span>
            <span>JTARS is coming your way very soon</span>
            <span className="w-6 h-px bg-[#a5a7ac]"></span>
          </div>

          {/* Topbar Quick Links & Admin Login */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onOpenTrackOrder}
              className="px-2 py-1 text-[11px] text-[#d4d5d8] hover:text-blue-400 transition-colors"
            >
              Track Order
            </button>
            <span className="text-[#45464b]">•</span>
            <button
              onClick={() => onOpenContact(true)}
              className="px-2 py-1 text-[11px] text-[#d4d5d8] hover:text-blue-400 transition-colors hidden sm:inline-block"
            >
              Help
            </button>
            <span className="text-[#45464b] hidden sm:inline">•</span>
            <button
              onClick={() => onOpenContact(false)}
              className="px-2 py-1 text-[11px] text-[#d4d5d8] hover:text-blue-400 transition-colors"
            >
              Contact
            </button>

            {/* Admin Login / Admin Panel Option */}
            <span className="text-[#45464b]">•</span>
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminDashboard}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 text-[11px] font-bold tracking-wider uppercase transition-all"
              >
                <Shield className="w-3 h-3 text-blue-400" />
                <span>Admin Panel</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                title="Store Administrator Login"
              >
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 h-[74px] bg-[#070809]/98 backdrop-blur-md border-b border-[#2a2c30]">
        <nav className="w-[min(1480px,calc(100%-48px))] h-full mx-auto flex items-center justify-between relative">
          {/* Mobile menu hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden w-9 h-9 grid place-items-center text-[#e5e6e8] hover:text-blue-400 rounded-lg"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo */}
          <a
            href="#home"
            onClick={e => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2"
          >
            <JTARSLogo className="w-20 h-14" textSize="text-2xl sm:text-3xl" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => handleNavClick('home')}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-transform hover:scale-105"
            >
              Home
            </button>

            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsShopMenuOpen(true)}
              onMouseLeave={() => setIsShopMenuOpen(false)}
            >
              <button
                onClick={() => setIsShopMenuOpen(!isShopMenuOpen)}
                className="flex items-center gap-1 text-sm font-semibold text-[#d9dade] hover:text-white py-2 transition-colors"
              >
                <span>Shop</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isShopMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-60 p-2 rounded-xl bg-[#0f1013] border border-[#35373c] shadow-2xl z-50 animate-fadeIn">
                  <button
                    onClick={() => handleCategoryClick('featured')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-[#d7d8dc] hover:text-white hover:bg-blue-950/40 transition-colors"
                  >
                    <span>Featured Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-[#d7d8dc] hover:text-white hover:bg-blue-950/40 transition-colors"
                  >
                    <span>Shop All</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  </button>
                  <div className="h-px bg-[#26282f] my-1"></div>
                  <button
                    onClick={() => handleCategoryClick('hoodie')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#d7d8dc] hover:text-white hover:bg-[#171920] transition-colors"
                  >
                    <span>Hoodies</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6c707a]" />
                  </button>
                  <button
                    onClick={() => handleCategoryClick('sweatshirt')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#d7d8dc] hover:text-white hover:bg-[#171920] transition-colors"
                  >
                    <span>Sweatshirts</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6c707a]" />
                  </button>
                  <button
                    onClick={() => handleCategoryClick('tshirt')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#d7d8dc] hover:text-white hover:bg-[#171920] transition-colors"
                  >
                    <span>T-Shirts</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6c707a]" />
                  </button>
                  <button
                    onClick={() => handleCategoryClick('jacket')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#d7d8dc] hover:text-white hover:bg-[#171920] transition-colors"
                  >
                    <span>Jackets</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6c707a]" />
                  </button>
                  <button
                    onClick={() => handleCategoryClick('cap')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#d7d8dc] hover:text-white hover:bg-[#171920] transition-colors"
                  >
                    <span>Caps</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6c707a]" />
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('about')}
              className="text-sm font-semibold text-[#d9dade] hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('collections')}
              className="text-sm font-semibold text-[#d9dade] hover:text-white transition-colors"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-sm font-semibold text-[#d9dade] hover:text-white transition-colors"
            >
              Contact
            </button>

            {/* Admin quick entry in navigation */}
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAdminDashboard}
                className="px-3 py-1 rounded-full bg-blue-900/50 hover:bg-blue-800 text-blue-200 border border-blue-500/50 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Admin Mode</span>
              </button>
            )}
          </div>

          {/* Nav Actions (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search Bar with Live Preview */}
            <div ref={searchContainerRef} className="relative hidden md:block w-56 lg:w-64">
              <div className="h-9.5 px-3 flex items-center rounded-full bg-[#121315] border border-[#34363a] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full bg-transparent text-xs text-white placeholder-[#787c84] focus:outline-none"
                />
                <Search className="w-4 h-4 text-[#8a8e97] shrink-0" />
              </div>

              {/* Search dropdown results */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-11 right-0 w-80 p-2 rounded-xl bg-[#101114] border border-[#36383e] shadow-2xl z-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#737780] px-3 py-1">
                    Matched Products
                  </div>
                  {searchResults.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onOpenProductQuickView(p);
                        setIsSearchFocused(false);
                      }}
                      className="w-full p-2 flex items-center gap-3 rounded-lg hover:bg-[#1c1e24] transition-colors text-left"
                    >
                      <div className="w-12 h-12 rounded bg-[#1c1d22] border border-[#2b2d34] shrink-0 p-1">
                        <ProductArt type={p.type} color={p.color} name={p.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{p.name}</div>
                        <div className="text-[10px] text-[#8e929b] uppercase">{p.category}</div>
                      </div>
                      <div className="font-display font-semibold text-sm text-white">৳{p.price}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile search icon trigger */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="md:hidden w-9 h-9 grid place-items-center text-[#e5e6e8] hover:text-blue-400 rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative w-9 h-9 grid place-items-center text-[#e5e6e8] hover:text-rose-400 hover:bg-[#14171c] rounded-lg transition-colors"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-0.5 min-w-[15px] h-[15px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold grid place-items-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account / Login */}
            <button
              onClick={onOpenAccount}
              className="w-9 h-9 grid place-items-center text-[#e5e6e8] hover:text-blue-400 hover:bg-[#14171c] rounded-lg transition-colors"
              aria-label="Account"
              title="Account & Login"
            >
              <UserRound className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative w-9 h-9 grid place-items-center text-[#e5e6e8] hover:text-blue-400 hover:bg-[#14171c] rounded-lg transition-colors"
              aria-label="Shopping Cart"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-red-600 text-white text-[9px] font-bold grid place-items-center animate-bump shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* 3. MOBILE SEARCH MODAL */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-130 bg-black/85 backdrop-blur-md p-4 flex flex-col animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold uppercase text-white tracking-wider">Search Products</h3>
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="w-8 h-8 rounded-full bg-[#1e2026] text-[#b0b3ba] grid place-items-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              autoFocus
              placeholder="Search hoodies, jackets, caps..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-12 px-4 pl-11 bg-[#14161b] border border-[#34373e] rounded-xl text-sm text-white placeholder-[#787c86] focus:outline-none focus:border-blue-500"
            />
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#787c86]" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {searchQuery.trim() === '' ? (
              <div className="text-center py-12 text-[#757983] text-xs">
                Type keywords like &quot;hoodie&quot;, &quot;tshirt&quot;, or &quot;jacket&quot; to search the collection.
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-12 text-[#757983] text-xs">No products found matching your search.</div>
            ) : (
              searchResults.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    onOpenProductQuickView(p);
                    setIsMobileSearchOpen(false);
                  }}
                  className="w-full p-3 flex items-center gap-3 rounded-xl bg-[#121317] border border-[#26282e] text-left"
                >
                  <div className="w-14 h-14 rounded-lg bg-[#1a1b20] p-1 shrink-0">
                    <ProductArt type={p.type} color={p.color} name={p.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{p.name}</div>
                    <div className="text-xs text-[#8c909a] capitalize">{p.category}</div>
                  </div>
                  <div className="font-display font-bold text-base text-white">৳{p.price}</div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* 4. MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-120 flex">
          {/* Overlay */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          ></div>

          {/* Drawer content */}
          <div className="relative w-72 max-w-[85vw] h-full bg-[#0d0e12] border-r border-[#2d2f36] p-5 flex flex-col justify-between z-10 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#24262c]">
                <JTARSLogo className="w-16 h-11" textSize="text-2xl" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#1a1b20] grid place-items-center text-[#9fa3ad]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation links */}
              <div className="py-4 space-y-1">
                <button
                  onClick={() => handleNavClick('home')}
                  className="w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold text-[#d4d6dc] hover:text-white hover:bg-[#181a20]"
                >
                  Home
                </button>
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold text-[#d4d6dc] hover:text-white hover:bg-[#181a20]"
                >
                  Shop All Collections
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold text-[#d4d6dc] hover:text-white hover:bg-[#181a20]"
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNavClick('collections')}
                  className="w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold text-[#d4d6dc] hover:text-white hover:bg-[#181a20]"
                >
                  Featured Collections
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold text-[#d4d6dc] hover:text-white hover:bg-[#181a20]"
                >
                  Contact & Support
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenTrackOrder();
                  }}
                  className="w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold text-blue-400 hover:bg-[#181a20] flex items-center gap-2"
                >
                  <PackageSearch className="w-4 h-4" />
                  <span>Track Order</span>
                </button>
              </div>

              {/* Category fast filters */}
              <div className="pt-2 border-t border-[#24262c]">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#696d76] px-3 mb-2">
                  Browse Apparel
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => handleCategoryClick('hoodie')}
                    className="p-2 rounded-lg bg-[#14151a] hover:bg-[#1d1f26] text-xs font-semibold text-[#c8cbd2] text-left"
                  >
                    Hoodies
                  </button>
                  <button
                    onClick={() => handleCategoryClick('sweatshirt')}
                    className="p-2 rounded-lg bg-[#14151a] hover:bg-[#1d1f26] text-xs font-semibold text-[#c8cbd2] text-left"
                  >
                    Sweatshirts
                  </button>
                  <button
                    onClick={() => handleCategoryClick('tshirt')}
                    className="p-2 rounded-lg bg-[#14151a] hover:bg-[#1d1f26] text-xs font-semibold text-[#c8cbd2] text-left"
                  >
                    T-Shirts
                  </button>
                  <button
                    onClick={() => handleCategoryClick('jacket')}
                    className="p-2 rounded-lg bg-[#14151a] hover:bg-[#1d1f26] text-xs font-semibold text-[#c8cbd2] text-left"
                  >
                    Jackets
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Admin & Account Links */}
            <div className="pt-4 border-t border-[#24262c] space-y-2">
              {isAdminLoggedIn ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAdminDashboard();
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <Shield className="w-4 h-4" />
                  <span>Open Admin Panel</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#171920] hover:bg-[#20232b] border border-[#2f323a] text-blue-400 font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
