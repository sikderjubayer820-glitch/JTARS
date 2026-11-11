export type CategoryType = 'featured' | 'all' | 'hoodie' | 'sweatshirt' | 'tshirt' | 'jacket' | 'cap';

export type GarmentType = 'hoodie' | 'sweatshirt' | 'tshirt' | 'jacket' | 'cap';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'hoodie' | 'sweatshirt' | 'tshirt' | 'jacket' | 'cap';
  type: GarmentType;
  color: string;
  colors: string[];
  stock: number;
  description?: string;
  isFeatured?: boolean;
  image?: string; // Custom uploaded photo or image URL
}

export interface StoreSettings {
  storePhone: string;
  storeEmail: string;
  storeAddress: string;
  freeShippingThreshold: number;
}

export interface CartItem {
  key: string;
  id: number;
  size: string;
  color: string;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'In Transit' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string; // e.g., JTR-849201
  customerName: string;
  phone: string;
  address: string;
  city: string;
  postcode?: string;
  paymentMethod: 'Cash on Delivery' | 'Mobile Banking (bKash/Nagad)' | 'Credit / Debit Card';
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

export interface CustomerInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Replied';
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

export interface UserAccount {
  name: string;
  email: string;
  phone?: string;
}
