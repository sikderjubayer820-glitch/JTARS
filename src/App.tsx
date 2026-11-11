/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_INQUIRIES,
  INITIAL_SETTINGS,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASS
} from './data/initialData';
import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  CustomerInquiry,
  NewsletterSubscriber,
  UserAccount,
  CategoryType,
  StoreSettings
} from './types';

// Components
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { AccountModal } from './components/AccountModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ContactModal } from './components/ContactModal';
import { InfoModal } from './components/InfoModal';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { JTARSLogo } from './components/JTARSLogo';
import {
  Facebook,
  Instagram,
  Youtube,
  Music2,
  ArrowUpRight,
  ArrowRight,
  CheckCircle,
  Truck,
  Sparkles
} from 'lucide-react';

export default function App() {
  // 1. Data States with LocalStorage Persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('jtars-products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('jtars-orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('jtars-inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => {
    try {
      const saved = localStorage.getItem('jtars-subscribers');
      return saved ? JSON.parse(saved) : [
        { email: 'tanvir@gmail.com', subscribedAt: '2026-11-09T10:00:00.000Z' },
        { email: 'jubayer@outlook.com', subscribedAt: '2026-11-10T15:20:00.000Z' }
      ];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('jtars-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('jtars-wishlist');
      return saved ? JSON.parse(saved) : [1, 7];
    } catch {
      return [1, 7];
    }
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('jtars-user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('jtars-settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Admin state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('jtars-admin-session') === 'true';
  });
  const [viewMode, setViewMode] = useState<'store' | 'admin'>('store');

  // UI Flow States
  const [currentCategory, setCurrentCategory] = useState<CategoryType>('featured');
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [trackOrderIdPrefill, setTrackOrderIdPrefill] = useState('');
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactIsHelp, setContactIsHelp] = useState(false);
  const [infoModalType, setInfoModalType] = useState<'shipping' | 'size' | 'privacy' | 'more-categories' | null>(null);

  // Notification Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // 2. Storage synchronization
  useEffect(() => {
    localStorage.setItem('jtars-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('jtars-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('jtars-inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('jtars-subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem('jtars-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('jtars-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('jtars-settings', JSON.stringify(settings));
  }, [settings]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string = 'M', color?: string, quantity: number = 1) => {
    const chosenColor = color || product.color;
    const key = `${product.id}-${size}-${chosenColor}`;

    setCart(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { key, id: product.id, size, color: chosenColor, quantity }];
    });

    showToast(`${product.name} (${size}) added to your cart`);
  };

  const handleUpdateCartQuantity = (key: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (key: string) => {
    setCart(prev => prev.filter(i => i.key !== key));
    showToast('Item removed from cart', 'info');
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: number) => {
    const product = products.find(p => p.id === productId);
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast(`${product?.name || 'Item'} removed from wishlist`, 'info');
        return prev.filter(id => id !== productId);
      }
      showToast(`${product?.name || 'Item'} saved to wishlist`);
      return [...prev, productId];
    });
  };

  // Order placement
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    showToast(`Order ${newOrder.id} confirmed!`, 'success');
  };

  // Admin operations
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order ${orderId} updated to ${status}`);
  };

  const handleAddProduct = (newProd: Omit<Product, 'id'>) => {
    const newId = Math.max(0, ...products.map(p => p.id)) + 1;
    const created: Product = { ...newProd, id: newId };
    setProducts(prev => [created, ...prev]);
    showToast(`Product "${created.name}" created successfully`);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated successfully`);
  };

  const handleDeleteProduct = (productId: number) => {
    const prod = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast(`Product "${prod?.name || 'Item'}" deleted`, 'warning');
  };

  const handleToggleInquiryStatus = (inquiryId: string) => {
    setInquiries(prev =>
      prev.map(i =>
        i.id === inquiryId ? { ...i, status: i.status === 'New' ? 'Replied' : 'New' } : i
      )
    );
  };

  const handleUpdateSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    showToast('Store settings updated successfully');
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setViewMode('admin');
    showToast('Welcome to JTARS Store Management', 'success');
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem('jtars-admin-session');
    setIsAdminLoggedIn(false);
    setViewMode('store');
    showToast('Admin logged out', 'info');
  };

  // Filter products for catalog
  const filteredProducts =
    currentCategory === 'featured'
      ? products.filter(p => p.isFeatured || p.id <= 5)
      : currentCategory === 'all'
      ? products
      : products.filter(p => p.category === currentCategory);

  const categoryHeadings: Record<CategoryType, string> = {
    featured: 'FEATURED',
    all: 'ALL STREETWEAR',
    hoodie: 'PREMIUM HOODIES',
    sweatshirt: 'SWEATSHIRTS',
    tshirt: 'HEAVYWEIGHT T-SHIRTS',
    jacket: 'TECHNICAL JACKETS',
    cap: 'HEADWEAR & CAPS'
  };

  // Total cart items
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // If viewing Admin Dashboard
  if (viewMode === 'admin') {
    return (
      <>
        <AdminDashboard
          products={products}
          orders={orders}
          inquiries={inquiries}
          subscribers={subscribers}
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onToggleInquiryStatus={handleToggleInquiryStatus}
          onExitAdmin={() => setViewMode('store')}
          onLogoutAdmin={handleLogoutAdmin}
        />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  // Otherwise, render full customer Storefront
  return (
    <div className="min-h-screen bg-[#060708] text-[#f5f6f7] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentCategory={currentCategory}
        onSelectCategory={cat => setCurrentCategory(cat)}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        isAdminLoggedIn={isAdminLoggedIn}
        freeShippingThreshold={settings.freeShippingThreshold}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminDashboard={() => setViewMode('admin')}
        onOpenTrackOrder={() => {
          setTrackOrderIdPrefill('');
          setIsTrackOrderOpen(true);
        }}
        onOpenContact={isHelp => {
          setContactIsHelp(Boolean(isHelp));
          setIsContactOpen(true);
        }}
        onOpenProductQuickView={p => setSelectedQuickViewProduct(p)}
        products={products}
      />

      <main className="flex-1">
        {/* Streetwear Hero Carousel */}
        <HeroCarousel
          onSelectCategory={cat => {
            setCurrentCategory(cat);
            document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreStory={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Category Pill Navbar */}
        <CategoryNav
          currentCategory={currentCategory}
          onSelectCategory={cat => setCurrentCategory(cat)}
          onOpenMoreCategories={() => setInfoModalType('more-categories')}
        />

        {/* Product Collection Showcase */}
        <section id="collections" className="w-[min(1480px,calc(100%-48px))] mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Product Grid */}
            <div className="lg:col-span-9 space-y-6">
              {/* Section Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#25282f]">
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white">
                  {categoryHeadings[currentCategory]} <span className="text-blue-500">COLLECTION</span>
                </h2>
                <span className="text-xs text-[#8c909a] font-mono">
                  Showing {filteredProducts.length} items
                </span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={p => handleAddToCart(p, 'M', p.color, 1)}
                    onQuickView={p => setSelectedQuickViewProduct(p)}
                  />
                ))}
              </div>
            </div>

            {/* Side Social & Brand Spotlight Card */}
            <aside className="lg:col-span-3 space-y-4">
              <div className="relative p-6 rounded-2xl bg-gradient-to-b from-[#0e0f13] to-[#060709] border border-[#2e3137] text-center overflow-hidden isolate shadow-xl">
                {/* Flame aura */}
                <div className="absolute -bottom-10 left-0 right-0 h-36 bg-gradient-to-t from-blue-600/40 via-blue-500/20 to-transparent blur-xl pointer-events-none animate-flame"></div>

                <div className="font-script text-4xl text-white">Stay Connected</div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white mt-1">
                  Follow JTARS Official
                </h3>
                <p className="text-[11px] text-[#8e939d] mt-1">
                  Get first access to limited seasonal runs and street community events.
                </p>

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-3 my-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#1877f2] grid place-items-center text-white hover:scale-110 transition-transform shadow-md"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 grid place-items-center text-white hover:scale-110 transition-transform shadow-md"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#ff0000] grid place-items-center text-white hover:scale-110 transition-transform shadow-md"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-black border border-white/20 grid place-items-center text-white hover:scale-110 transition-transform shadow-md"
                    aria-label="TikTok"
                  >
                    <Music2 className="w-4 h-4" />
                  </a>
                </div>

                <div className="pt-2">
                  <JTARSLogo className="w-28 h-20 mx-auto" showText={false} />
                </div>
              </div>

              {/* Free delivery badge card */}
              <div className="p-4 rounded-xl bg-[#0f1013] border border-[#24262d] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-800/40 grid place-items-center text-blue-400 shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white">Free Nationwide Shipping</p>
                  <p className="text-[11px] text-[#858992]">Automatically applied on orders ৳1500+</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Editorial Feature Banner: The Signature Edit */}
        <section className="w-[min(1480px,calc(100%-48px))] mx-auto my-12 rounded-2xl overflow-hidden border border-[#2b2e35] relative min-h-[380px] flex items-center bg-cover bg-center" style={{ backgroundImage: "linear-gradient(90deg, rgba(4, 5, 7, 0.98) 0%, rgba(4, 5, 7, 0.88) 45%, rgba(4, 5, 7, 0.35) 85%), url('https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1800&q=85')" }}>
          <div className="p-8 sm:p-14 max-w-xl">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-[0.3em] font-display">
              Designed To Be Different
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-tight mt-2">
              THE SIGNATURE <span className="text-blue-500">EDIT.</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#b2b6bf] leading-relaxed">
              Heavyweight comfort meets a sharp street silhouette. Explore the iconic garments that define the JTARS aesthetic and movement across the city.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setCurrentCategory('all');
                  document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Shop All Products</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentCategory('hoodie');
                  document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-full bg-[#181a20]/90 hover:bg-[#22252c] border border-[#3b3e46] text-white font-semibold text-xs transition-all"
              >
                Explore Hoodies
              </button>
            </div>
          </div>
        </section>

        {/* About & Brand Story Section */}
        <section id="about" className="w-[min(1480px,calc(100%-48px))] mx-auto py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center border-t border-[#1e2025]">
          <div className="relative h-[380px] sm:h-[440px] rounded-2xl overflow-hidden border border-[#2b2d35]">
            <img
              src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85"
              alt="JTARS streetwear editorial"
              className="w-full h-full object-cover filter saturate-75 contrast-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-[0.3em] font-display">
              Our Story & Philosophy
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
              NOT JUST WORN. <br />
              <span className="text-blue-500">LIVED IN.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#a3a7b0] leading-relaxed">
              JTARS was founded for those who navigate life with intent. Every garment combines heavyweight cotton fleece, reinforced double-needle construction, and minimal futuristic accents designed to outlast fast trends.
            </p>
            <p className="text-xs sm:text-sm text-[#a3a7b0] leading-relaxed">
              From our first sketch in Dhaka to our nationwide delivery network, we build streetwear that lets your presence speak before you do.
            </p>

            <div className="pt-4 grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#0e0f13] border-l-2 border-blue-500">
                <div className="font-display text-2xl font-bold text-white">100%</div>
                <div className="text-[11px] text-[#828690] mt-0.5">Combed Cotton</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0e0f13] border-l-2 border-blue-500">
                <div className="font-display text-2xl font-bold text-white">24/7</div>
                <div className="text-[11px] text-[#828690] mt-0.5">Support Desk</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0e0f13] border-l-2 border-blue-500">
                <div className="font-display text-2xl font-bold text-white">Fast</div>
                <div className="text-[11px] text-[#828690] mt-0.5">All Over BD</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        storeEmail={settings.storeEmail}
        storePhone={settings.storePhone}
        onSelectCategory={cat => {
          setCurrentCategory(cat);
          document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTrackOrder={() => {
          setTrackOrderIdPrefill('');
          setIsTrackOrderOpen(true);
        }}
        onOpenContact={() => {
          setContactIsHelp(false);
          setIsContactOpen(true);
        }}
        onOpenInfo={type => setInfoModalType(type)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onSubscribeNewsletter={email => {
          setSubscribers(prev => [{ email, subscribedAt: new Date().toISOString() }, ...prev]);
          showToast('Subscribed to the JTARS inner circle!');
        }}
      />

      {/* ALL INTERACTIVE MODALS & DRAWERS */}
      {/* 1. Quick View Modal */}
      <QuickViewModal
        product={selectedQuickViewProduct}
        onClose={() => setSelectedQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setInfoModalType('size')}
      />

      {/* 2. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        products={products}
        freeShippingThreshold={settings.freeShippingThreshold}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreProducts={() => {
          setIsCartOpen(false);
          document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={products}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={p => {
          handleAddToCart(p, 'M', p.color, 1);
          setIsWishlistOpen(false);
          setIsCartOpen(true);
        }}
        onExplore={() => {
          setIsWishlistOpen(false);
          document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        products={products}
        freeShippingThreshold={settings.freeShippingThreshold}
        onOrderPlaced={handleOrderPlaced}
        onOpenTrackOrderWithId={id => {
          setTrackOrderIdPrefill(id);
          setIsTrackOrderOpen(true);
        }}
      />

      {/* 5. Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        orders={orders}
        initialOrderId={trackOrderIdPrefill}
      />

      {/* 6. Customer Account Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currentUser={currentUser}
        onLoginUser={user => {
          setCurrentUser(user);
          localStorage.setItem('jtars-user', JSON.stringify(user));
          showToast(`Welcome back, ${user.name}`);
        }}
        onLogoutUser={() => {
          setCurrentUser(null);
          localStorage.removeItem('jtars-user');
          showToast('Logged out of account');
        }}
        onOpenAdminLogin={() => {
          setIsAccountOpen(false);
          setIsAdminLoginOpen(true);
        }}
      />

      {/* 7. Dedicated Admin Login Modal (As specifically requested) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* 8. Contact & Support Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        isHelp={contactIsHelp}
        storeEmail={settings.storeEmail}
        storePhone={settings.storePhone}
        onSubmitInquiry={inq => {
          setInquiries(prev => [inq, ...prev]);
          showToast('Message submitted. Support team will email you soon.');
        }}
      />

      {/* 9. Informational Modals (Shipping, Size, Privacy, More Categories) */}
      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
        onSelectCategory={cat => {
          setCurrentCategory(cat);
          setInfoModalType(null);
          document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 10. Notification Toasts */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
