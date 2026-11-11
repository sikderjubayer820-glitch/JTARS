import React, { useState, useRef } from 'react';
import {
  ShoppingBag,
  Package,
  TrendingUp,
  Users,
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
  Search,
  ExternalLink,
  LogOut,
  CheckCircle,
  Clock,
  Truck,
  CheckCheck,
  XCircle,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertTriangle,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Settings,
  Save,
  Check
} from 'lucide-react';
import { Product, Order, OrderStatus, CustomerInquiry, NewsletterSubscriber, GarmentType, StoreSettings } from '../types';
import { ProductArt } from './ProductArt';
import { JTARSLogo } from './JTARSLogo';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  inquiries: CustomerInquiry[];
  subscribers: NewsletterSubscriber[];
  settings: StoreSettings;
  onUpdateSettings: (newSettings: StoreSettings) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  onToggleInquiryStatus: (inquiryId: string) => void;
  onExitAdmin: () => void;
  onLogoutAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  inquiries,
  subscribers,
  settings,
  onUpdateSettings,
  onUpdateOrderStatus,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onToggleInquiryStatus,
  onExitAdmin,
  onLogoutAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'inquiries' | 'subscribers' | 'settings'>('products');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('All');

  // Modal states for Product Add/Edit
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for product
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState(1400);
  const [prodCategory, setProdCategory] = useState<'hoodie' | 'sweatshirt' | 'tshirt' | 'jacket' | 'cap'>('hoodie');
  const [prodType, setProdType] = useState<GarmentType>('hoodie');
  const [prodColor, setProdColor] = useState('#111214');
  const [prodColors, setProdColors] = useState<string[]>(['#111214', '#17264a']);
  const [newColorInput, setNewColorInput] = useState('#22252a');
  const [prodStock, setProdStock] = useState(25);
  const [prodDesc, setProdDesc] = useState('');
  const [prodFeatured, setProdFeatured] = useState(false);
  const [prodImage, setProdImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Store Settings Form State
  const [editPhone, setEditPhone] = useState(settings.storePhone);
  const [editEmail, setEditEmail] = useState(settings.storeEmail);
  const [editAddress, setEditAddress] = useState(settings.storeAddress);
  const [editFreeShipping, setEditFreeShipping] = useState(settings.freeShippingThreshold);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Selected Order for detail modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Curated Streetwear Preset Photos for rapid assignment
  const presetPhotos = [
    { label: 'Black Hoodie', url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80' },
    { label: 'Navy Hoodie', url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80' },
    { label: 'Grey Sweatshirt', url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80' },
    { label: 'Street Tee', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80' },
    { label: 'Wind Jacket', url: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80' },
    { label: 'Dark Cap', url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80' }
  ];

  // Analytics
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.total : sum), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Confirmed').length;
  const lowStockCount = products.filter(p => p.stock <= 10).length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const openAddProduct = () => {
    setEditingProduct(null);
    setProdName('');
    setProdPrice(1450);
    setProdCategory('hoodie');
    setProdType('hoodie');
    setProdColor('#111214');
    setProdColors(['#111214', '#17264a', '#8a8e94']);
    setProdStock(25);
    setProdDesc('Heavyweight 380 GSM fleece hoodie with custom JTARS embroidery and reinforced seams.');
    setProdFeatured(false);
    setProdImage('https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80');
    setIsProductModalOpen(true);
  };

  const openEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdPrice(p.price);
    setProdCategory(p.category);
    setProdType(p.type);
    setProdColor(p.color);
    setProdColors([...p.colors]);
    setProdStock(p.stock);
    setProdDesc(p.description || '');
    setProdFeatured(p.isFeatured || false);
    setProdImage(p.image || '');
    setIsProductModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProdImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: prodName,
        price: Number(prodPrice),
        category: prodCategory,
        type: prodType,
        color: prodColor,
        colors: prodColors.length ? prodColors : [prodColor],
        stock: Number(prodStock),
        description: prodDesc,
        isFeatured: prodFeatured,
        image: prodImage.trim() || undefined
      });
    } else {
      onAddProduct({
        name: prodName,
        price: Number(prodPrice),
        category: prodCategory,
        type: prodType,
        color: prodColor,
        colors: prodColors.length ? prodColors : [prodColor],
        stock: Number(prodStock),
        description: prodDesc,
        isFeatured: prodFeatured,
        image: prodImage.trim() || undefined
      });
    }
    setIsProductModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      storePhone: editPhone.trim(),
      storeEmail: editEmail.trim(),
      storeAddress: editAddress.trim(),
      freeShippingThreshold: Number(editFreeShipping)
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const addColorToProduct = () => {
    if (newColorInput && !prodColors.includes(newColorInput)) {
      setProdColors([...prodColors, newColorInput]);
    }
  };

  const removeColorFromProduct = (colorToRemove: string) => {
    const filtered = prodColors.filter(c => c !== colorToRemove);
    setProdColors(filtered.length ? filtered : ['#111214']);
    if (prodColor === colorToRemove) {
      setProdColor(filtered[0] || '#111214');
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.phone.includes(orderSearch);
    const matchesStatus = orderStatusFilter === 'All' || order.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCategoryFilter === 'All' || product.category === productCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30"><Clock className="w-3 h-3" /> Pending</span>;
      case 'Confirmed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30"><CheckCircle className="w-3 h-3" /> Confirmed</span>;
      case 'Processing':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30"><Package className="w-3 h-3" /> Processing</span>;
      case 'In Transit':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"><Truck className="w-3 h-3" /> In Transit</span>;
      case 'Delivered':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"><CheckCheck className="w-3 h-3" /> Delivered</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30"><XCircle className="w-3 h-3" /> Cancelled</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-[#f5f6f7] flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-50 bg-[#0c0d10]/95 backdrop-blur-md border-b border-[#24262c] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <JTARSLogo className="w-16 h-11" textSize="text-2xl" />
          <div className="hidden sm:block h-6 w-px bg-[#2b2e35]"></div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold tracking-wider uppercase font-display">
              STORE MANAGEMENT SYSTEM
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#16181d] hover:bg-[#20232a] border border-[#34373d] text-xs font-medium text-[#d0d3da] hover:text-white transition-all shadow-sm"
          >
            <ExternalLink className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">View Storefront</span>
          </button>
          <button
            onClick={onLogoutAdmin}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-xs font-medium text-red-300 hover:text-red-100 transition-all"
            title="Log out from admin"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Banner with Return to Website */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-[#101217] to-[#12141a] border border-blue-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <div>
              <p className="text-sm font-semibold text-white">Admin Control Active</p>
              <p className="text-xs text-[#8e939d]">
                Store Email: <strong className="text-blue-400">{settings.storeEmail}</strong> • Store Phone: <strong className="text-blue-400">{settings.storePhone}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onExitAdmin}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-md transition-all self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Customer Website</span>
          </button>
        </div>

        {/* Analytics Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-xl bg-[#0f1013] border border-[#26282f] shadow-sm">
            <div className="flex items-center justify-between text-[#858992]">
              <span className="text-xs font-semibold uppercase tracking-wider">Gross Sales</span>
              <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/30 text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-bold font-display text-white">
              ৳{totalRevenue.toLocaleString()}
            </div>
            <p className="mt-1 text-[11px] text-[#70757f]">From {orders.length} total customer orders</p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#0f1013] border border-[#26282f] shadow-sm">
            <div className="flex items-center justify-between text-[#858992]">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
              <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-800/30 text-blue-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-bold font-display text-white">
              {orders.length}
            </div>
            <p className="mt-1 text-[11px] text-amber-400">
              {pendingOrders} awaiting fulfillment
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#0f1013] border border-[#26282f] shadow-sm">
            <div className="flex items-center justify-between text-[#858992]">
              <span className="text-xs font-semibold uppercase tracking-wider">Products</span>
              <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-800/30 text-purple-400">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-bold font-display text-white">
              {products.length}
            </div>
            <p className="mt-1 text-[11px] text-[#70757f]">
              {lowStockCount > 0 ? (
                <span className="text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 inline" /> {lowStockCount} low stock items
                </span>
              ) : (
                'All items in healthy stock'
              )}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#0f1013] border border-[#26282f] shadow-sm">
            <div className="flex items-center justify-between text-[#858992]">
              <span className="text-xs font-semibold uppercase tracking-wider">Inquiries</span>
              <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/30 text-cyan-400">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-bold font-display text-white">
              {inquiries.length}
            </div>
            <p className="mt-1 text-[11px] text-cyan-400">
              {newInquiriesCount} new messages
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#24262d] pb-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-[#9fa3ac] hover:text-white hover:bg-[#15171d]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog & Photos ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-[#9fa3ac] hover:text-white hover:bg-[#15171d]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-[#9fa3ac] hover:text-white hover:bg-[#15171d]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messages & Support ({inquiries.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'subscribers'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-[#9fa3ac] hover:text-white hover:bg-[#15171d]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Subscribers ({subscribers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-[#9fa3ac] hover:text-white hover:bg-[#15171d]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Contact & Info</span>
          </button>
        </div>

        {/* TAB 1: PRODUCT CATALOG MANAGEMENT (WITH PHOTO UPLOAD/IMAGE URL) */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#0f1013] p-3.5 rounded-xl border border-[#24262c]">
              <div className="flex items-center gap-3 flex-1 max-w-lg">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71757e]" />
                  <input
                    type="text"
                    placeholder="Search products by title..."
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 bg-[#16181d] border border-[#2c2f36] rounded-lg text-xs text-white placeholder-[#60646e] focus:outline-none focus:border-blue-500"
                  />
                </div>
                <select
                  value={productCategoryFilter}
                  onChange={e => setProductCategoryFilter(e.target.value)}
                  className="h-10 px-3 bg-[#16181d] border border-[#2c2f36] rounded-lg text-xs text-[#b8bbc2] focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Categories</option>
                  <option value="hoodie">Hoodies</option>
                  <option value="sweatshirt">Sweatshirts</option>
                  <option value="tshirt">T-Shirts</option>
                  <option value="jacket">Jackets</option>
                  <option value="cap">Caps</option>
                </select>
              </div>

              <button
                onClick={openAddProduct}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product With Photo</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl bg-[#0f1013] border border-[#26282f] flex flex-col justify-between group hover:border-[#3d414a] transition-all"
                >
                  <div>
                    <div className="relative w-full h-44 rounded-lg bg-[#16181c] border border-[#272930] overflow-hidden mb-3 p-1 flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <ProductArt type={product.type} color={product.color} name={product.name} />
                      )}

                      {product.image && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-white/20 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" /> Photo
                        </span>
                      )}

                      {product.isFeatured && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-600 text-[10px] font-bold text-white tracking-wider uppercase">
                          Featured
                        </span>
                      )}

                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-[#cbd0d8]">
                        Stock: {product.stock}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#787c86] uppercase tracking-wider font-semibold">
                      <span>{product.category}</span>
                      <div className="flex items-center gap-1">
                        {product.colors.map(c => (
                          <span
                            key={c}
                            className="w-2.5 h-2.5 rounded-full border border-white/20"
                            style={{ backgroundColor: c }}
                          ></span>
                        ))}
                      </div>
                    </div>

                    <h3 className="font-semibold text-sm text-white mt-1 line-clamp-1">{product.name}</h3>
                    <p className="font-display text-lg font-bold text-white mt-1">৳{product.price.toLocaleString()}</p>
                    <p className="text-[11px] text-[#828690] mt-1 line-clamp-2 leading-relaxed">
                      {product.description || 'Premium streetwear garment with signature JTARS details.'}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1e2026] flex items-center justify-between">
                    <button
                      onClick={() => openEditProduct(product)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181a20] hover:bg-[#22252c] border border-[#2c2f36] text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit & Photo</span>
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 border border-red-800/30 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#0f1013] p-3.5 rounded-xl border border-[#24262c]">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71757e]" />
                <input
                  type="text"
                  placeholder="Search order ID, customer name or phone..."
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 bg-[#16181d] border border-[#2c2f36] rounded-lg text-xs text-white placeholder-[#60646e] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs text-[#7c8089] font-medium shrink-0">Status:</span>
                {['All', 'Pending', 'Confirmed', 'Processing', 'In Transit', 'Delivered', 'Cancelled'].map(st => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                      orderStatusFilter === st
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#181a20] text-[#9599a2] hover:text-white border border-[#2a2c33]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#0f1013] rounded-xl border border-[#26282f] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#14161b] text-[#8e939d] uppercase text-[11px] font-semibold border-b border-[#25282f]">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Status & Update</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2026]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-[#757983]">
                          No orders found matching the filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(order => (
                        <tr key={order.id} className="hover:bg-[#14161c] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-400">
                            {order.id}
                            <div className="text-[10px] text-[#71757f] font-sans font-normal mt-0.5">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{order.customerName}</div>
                            <div className="text-[11px] text-[#8e929b] flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-[#585c65]" />
                              {order.phone}
                            </div>
                            <div className="text-[10px] text-[#6b6f78]">{order.city}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-[#d4d6dc]">{order.items.length} item(s)</span>
                            <div className="text-[11px] text-[#858993] truncate max-w-[200px]">
                              {order.items.map(it => `${it.quantity}x ${it.name} (${it.size})`).join(', ')}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-display text-base font-bold text-white">
                            ৳{order.total.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-[#181a20] border border-[#2b2d34] text-[11px] text-[#b0b3ba]">
                              {order.paymentMethod}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-col gap-1.5">
                              {getStatusBadge(order.status)}
                              <select
                                value={order.status}
                                onChange={e => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                                className="h-7 px-2 bg-[#191b21] border border-[#31343c] rounded text-[11px] text-[#c9cbd0] focus:outline-none focus:border-blue-500"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Processing">Processing</option>
                                <option value="In Transit">In Transit</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="px-2.5 py-1 rounded-md bg-[#191b20] hover:bg-[#22252c] border border-[#33363e] text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="bg-[#0f1013] rounded-xl border border-[#26282f] p-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Support & Contact Messages</h3>
              <p className="text-xs text-[#81858e]">Questions, size help requests, and notes sent from the storefront contact form.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inquiries.length === 0 ? (
                <div className="col-span-full py-12 text-center text-[#757983] bg-[#0f1013] rounded-xl border border-[#26282f]">
                  No inquiries received yet.
                </div>
              ) : (
                inquiries.map(inq => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-xl bg-[#0f1013] border border-[#26282f] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            inq.status === 'New'
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {inq.status}
                        </span>
                        <span className="text-[11px] text-[#6d717a]">
                          {new Date(inq.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <h4 className="font-bold text-white text-sm">{inq.subject}</h4>
                      <p className="text-xs text-blue-400 mt-0.5 flex items-center gap-1.5">
                        <Mail className="w-3 h-3" />
                        {inq.name} ({inq.email})
                      </p>
                      <div className="mt-3 p-3 rounded-lg bg-[#16181d] border border-[#23252c] text-xs text-[#c9ccd3] leading-relaxed">
                        {inq.message}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1e2026] flex items-center justify-between">
                      <a
                        href={`mailto:${inq.email}?subject=Reply from JTARS: ${encodeURIComponent(inq.subject)}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Email Reply</span>
                      </a>
                      <button
                        onClick={() => onToggleInquiryStatus(inq.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#191b21] hover:bg-[#22252c] border border-[#30333b] text-xs text-[#a0a4ad] hover:text-white font-medium transition-colors"
                      >
                        Mark as {inq.status === 'New' ? 'Replied' : 'New'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: NEWSLETTER SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="space-y-4">
            <div className="bg-[#0f1013] rounded-xl border border-[#26282f] p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Newsletter Subscriber List</h3>
                <p className="text-xs text-[#81858e]">Users who joined the JTARS Inner Circle through the website footer.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold">
                {subscribers.length} Emails
              </span>
            </div>

            <div className="bg-[#0f1013] rounded-xl border border-[#26282f] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#14161b] text-[#8e939d] uppercase text-[11px] font-semibold border-b border-[#25282f]">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Email Address</th>
                      <th className="py-3 px-4">Subscription Date</th>
                      <th className="py-3 px-4 text-right">Direct Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2026]">
                    {subscribers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-[#757983]">
                          No subscribers registered yet.
                        </td>
                      </tr>
                    ) : (
                      subscribers.map((sub, i) => (
                        <tr key={sub.email} className="hover:bg-[#14161c]">
                          <td className="py-3 px-4 text-[#60646e]">{i + 1}</td>
                          <td className="py-3 px-4 font-medium text-white">{sub.email}</td>
                          <td className="py-3 px-4 text-[#8a8e97]">
                            {new Date(sub.subscribedAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <a
                              href={`mailto:${sub.email}`}
                              className="text-blue-400 hover:text-blue-300 font-semibold"
                            >
                              Compose Email
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: STORE CONTACT & INFO SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-5">
            <div className="bg-[#0f1013] rounded-xl border border-[#26282f] p-5">
              <h3 className="text-base font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-400" />
                <span>Store Contact Details & Settings</span>
              </h3>
              <p className="text-xs text-[#8c909b]">
                Update your official store contact number, email, and address. These will immediately update in the footer, contact modals, and receipts.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-[#0f1013] rounded-xl border border-[#26282f] p-6 space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-semibold text-[#c6c9cf] mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Store Hotline / Phone Number</span>
                </label>
                <input
                  type="text"
                  required
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  placeholder="e.g. +880 1712 345678"
                  className="w-full h-11 px-3.5 bg-[#181a20] border border-[#34373d] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                <p className="text-[11px] text-[#71757f] mt-1">Displayed in the footer and customer support links.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c6c9cf] mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>Store Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  placeholder="e.g. sikderjubayer820@gmail.com"
                  className="w-full h-11 px-3.5 bg-[#181a20] border border-[#34373d] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                />
                <p className="text-[11px] text-[#71757f] mt-1">Official inbox for inquiries and customer orders.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c6c9cf] mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Physical Store / Dispatch Address</span>
                </label>
                <input
                  type="text"
                  required
                  value={editAddress}
                  onChange={e => setEditAddress(e.target.value)}
                  placeholder="e.g. Road 11, Banani, Dhaka - 1213, Bangladesh"
                  className="w-full h-11 px-3.5 bg-[#181a20] border border-[#34373d] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c6c9cf] mb-1.5 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Free Shipping Minimum Order Amount (৳ BDT)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  required
                  value={editFreeShipping}
                  onChange={e => setEditFreeShipping(Number(e.target.value))}
                  className="w-full h-11 px-3.5 bg-[#181a20] border border-[#34373d] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                <p className="text-[11px] text-[#71757f] mt-1">Orders reaching this amount unlock free delivery across Bangladesh.</p>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Store Settings</span>
                </button>

                {settingsSaved && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Settings saved successfully!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT PRODUCT WITH PHOTO UPLOAD & URL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-130 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#111216] border border-[#373a42] rounded-2xl p-6 sm:p-8 text-[#f5f6f7] shadow-2xl">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full bg-[#1b1c20] text-[#a0a4ad] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white mb-1">
              {editingProduct ? 'EDIT' : 'ADD NEW'} <span className="text-blue-500">PRODUCT WITH PHOTO</span>
            </h2>
            <p className="text-xs text-[#8c909a] mb-5">
              Upload product photos or paste an image URL. Changes reflect live in the storefront.
            </p>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={e => setProdName(e.target.value)}
                    placeholder="e.g. JTARS Matrix Heavyweight Hoodie"
                    className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* PHOTO UPLOADER & URL SECTION */}
                <div className="sm:col-span-2 p-4 rounded-xl bg-[#15171e] border border-[#2b2e38] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-blue-400" />
                      <span>Product Photo / Image</span>
                    </label>
                    {prodImage && (
                      <button
                        type="button"
                        onClick={() => setProdImage('')}
                        className="text-[11px] text-red-400 hover:text-red-300 font-semibold"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Direct File Upload button */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-10 px-4 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-400 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shrink-0"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Photo from Device</span>
                    </button>

                    {/* Image URL Input */}
                    <div className="relative flex-1">
                      <LinkIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71757e]" />
                      <input
                        type="url"
                        value={prodImage}
                        onChange={e => setProdImage(e.target.value)}
                        placeholder="Or paste web image URL (https://...)"
                        className="w-full h-10 pl-9 pr-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white placeholder-[#60646e] focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Curated Streetwear Photo Presets */}
                  <div>
                    <span className="text-[10px] text-[#80848e] uppercase font-bold tracking-wider block mb-1.5">
                      Or Pick Curated Streetwear Preset:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {presetPhotos.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setProdImage(preset.url)}
                          className="px-2.5 py-1 rounded-md bg-[#1d1f26] hover:bg-[#252832] border border-[#30333d] text-[11px] text-[#c0c3ca] hover:text-white transition-colors"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo Preview */}
                  {prodImage && (
                    <div className="mt-2 p-2 bg-[#0d0e12] rounded-lg border border-[#272930] flex items-center gap-3">
                      <img
                        src={prodImage}
                        alt="Product preview"
                        className="w-16 h-16 object-cover rounded-md border border-white/10"
                        onError={() => {
                          alert('Could not load image from URL. Please check the link or upload a file.');
                        }}
                      />
                      <div className="text-xs text-[#8c909b]">
                        <p className="font-semibold text-white">Active Photo Preview</p>
                        <p className="text-[11px] text-emerald-400">Photo will be displayed on the customer catalog card.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Price (৳ BDT)</label>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    required
                    value={prodPrice}
                    onChange={e => setProdPrice(Number(e.target.value))}
                    className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={prodStock}
                    onChange={e => setProdStock(Number(e.target.value))}
                    className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Category</label>
                  <select
                    value={prodCategory}
                    onChange={e => {
                      const val = e.target.value as any;
                      setProdCategory(val);
                      setProdType(val);
                    }}
                    className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="hoodie">Hoodie</option>
                    <option value="sweatshirt">Sweatshirt</option>
                    <option value="tshirt">T-Shirt</option>
                    <option value="jacket">Jacket</option>
                    <option value="cap">Cap</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Garment Cut / Silhouette</label>
                  <select
                    value={prodType}
                    onChange={e => setProdType(e.target.value as GarmentType)}
                    className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="hoodie">Hoodie (Hooded pullover)</option>
                    <option value="sweatshirt">Sweatshirt (Crewneck)</option>
                    <option value="tshirt">T-Shirt (Boxy crew)</option>
                    <option value="jacket">Jacket (Zip windbreaker)</option>
                    <option value="cap">Cap (Curved brim)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">
                    Primary Fabric Color (Hex)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={prodColor}
                      onChange={e => setProdColor(e.target.value)}
                      className="w-12 h-10 bg-transparent cursor-pointer rounded border border-[#34373d]"
                    />
                    <input
                      type="text"
                      value={prodColor}
                      onChange={e => setProdColor(e.target.value)}
                      className="w-32 h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-sm text-white font-mono"
                    />
                    <span className="text-xs text-[#8c909b]">Main color swatch displayed on card</span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Available Colors</label>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {prodColors.map(c => (
                      <div
                        key={c}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1c1f26] border border-[#32353d] text-xs font-mono"
                      >
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c }}></span>
                        <span>{c}</span>
                        <button
                          type="button"
                          onClick={() => removeColorFromProduct(c)}
                          className="text-[#8e929b] hover:text-red-400 ml-1"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newColorInput}
                      onChange={e => setNewColorInput(e.target.value)}
                      className="w-10 h-9 bg-transparent cursor-pointer rounded border border-[#34373d]"
                    />
                    <input
                      type="text"
                      value={newColorInput}
                      onChange={e => setNewColorInput(e.target.value)}
                      className="w-28 h-9 px-2.5 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={addColorToProduct}
                      className="px-3 py-1.5 bg-[#20232b] hover:bg-[#2b2f3a] text-xs font-semibold text-white rounded-lg border border-[#363a44]"
                    >
                      Add Color
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Product Description</label>
                  <textarea
                    rows={3}
                    value={prodDesc}
                    onChange={e => setProdDesc(e.target.value)}
                    placeholder="Details about materials, GSM, fit, and care..."
                    className="w-full p-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <div className="sm:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="feat-check"
                    checked={prodFeatured}
                    onChange={e => setProdFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 bg-[#181a20] border-[#34373d] focus:ring-blue-500"
                  />
                  <label htmlFor="feat-check" className="text-xs font-semibold text-[#d4d7dd] cursor-pointer">
                    Show in Featured Homepage Carousel / Highlights
                  </label>
                </div>
              </div>

              {/* Garment Preview */}
              <div className="p-3 bg-[#15171d] rounded-xl border border-[#272930] flex items-center gap-4">
                <div className="w-24 h-24 shrink-0 bg-[#0c0d10] rounded-lg border border-[#30333c] p-1 flex items-center justify-center overflow-hidden">
                  {prodImage ? (
                    <img src={prodImage} alt="Product" className="w-full h-full object-cover rounded-md" />
                  ) : (
                    <ProductArt type={prodType} color={prodColor} name={prodName} />
                  )}
                </div>
                <div className="text-xs text-[#8c909b]">
                  <p className="font-semibold text-white">Live Storefront Appearance</p>
                  <p className="mt-0.5">
                    {prodImage
                      ? 'Custom photograph is active and will be displayed on the card and quick view modal.'
                      : 'Vector art will automatically adapt to chosen colors, seam highlights, and garment cut.'}
                  </p>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#23252c]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-[#181a20] text-xs font-semibold text-[#a5a8b0] rounded-lg hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg shadow-lg shadow-blue-600/25"
                >
                  {editingProduct ? 'Save Product Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ORDER DETAILS */}
      {selectedOrder && (
        <div className="fixed inset-0 z-130 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#111216] border border-[#373a42] rounded-2xl p-6 sm:p-7 text-[#f5f6f7] shadow-2xl">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full bg-[#1b1c20] text-[#a0a4ad] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-base font-bold text-blue-400">{selectedOrder.id}</span>
              {getStatusBadge(selectedOrder.status)}
            </div>
            <p className="text-xs text-[#81858f] mb-4">
              Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>

            <div className="space-y-4">
              {/* Customer Box */}
              <div className="p-3.5 rounded-xl bg-[#16181d] border border-[#272a31] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{selectedOrder.customerName}</span>
                  <span className="text-[#8e939d]">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex items-center gap-2 text-[#9da1aa]">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>{selectedOrder.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-[#9da1aa]">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    {selectedOrder.address}, {selectedOrder.city} {selectedOrder.postcode && `(${selectedOrder.postcode})`}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#b4b7be] uppercase tracking-wider">Ordered Items</h4>
                <div className="divide-y divide-[#1f2128] border border-[#26282f] rounded-xl overflow-hidden bg-[#0d0e11]">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: it.color }}
                        ></span>
                        <div>
                          <p className="font-semibold text-white">{it.name}</p>
                          <p className="text-[11px] text-[#838791]">
                            Size: {it.size} &times; {it.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-display font-semibold text-white text-sm">
                        ৳{(it.price * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="p-3.5 rounded-xl bg-[#16181d] border border-[#272a31] space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#8b8f98]">
                  <span>Subtotal</span>
                  <span>৳{selectedOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-[#8b8f98]">
                  <span>Shipping Fee</span>
                  <span>{selectedOrder.shippingFee === 0 ? 'Free Shipping' : `৳${selectedOrder.shippingFee}`}</span>
                </div>
                <div className="pt-2 border-t border-[#292b33] flex items-center justify-between text-white font-bold text-sm">
                  <span>Grand Total</span>
                  <span className="font-display text-lg text-blue-400">৳{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Change Status */}
              <div>
                <label className="block text-xs font-semibold text-[#c6c9cf] mb-1.5">
                  Update Order Fulfillment Status:
                </label>
                <select
                  value={selectedOrder.status}
                  onChange={e => {
                    const newSt = e.target.value as OrderStatus;
                    onUpdateOrderStatus(selectedOrder.id, newSt);
                    setSelectedOrder({ ...selectedOrder, status: newSt });
                  }}
                  className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Pending">Pending (Received, unconfirmed)</option>
                  <option value="Confirmed">Confirmed (Approved by store)</option>
                  <option value="Processing">Processing (Packaging pieces)</option>
                  <option value="In Transit">In Transit (Courier out for delivery)</option>
                  <option value="Delivered">Delivered (Successfully handed to customer)</option>
                  <option value="Cancelled">Cancelled (Order voided)</option>
                </select>
                <p className="text-[11px] text-[#71757f] mt-1">
                  Customer will see this update immediately in the Track Order screen.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
