import { Product, Order, CustomerInquiry, StoreSettings } from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  storePhone: '+880 1712 345678',
  storeEmail: 'sikderjubayer820@gmail.com',
  storeAddress: 'Road 11, Banani, Dhaka - 1213, Bangladesh',
  freeShippingThreshold: 1500,
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'JTARS Logo Hoodie',
    price: 1450,
    category: 'hoodie',
    type: 'hoodie',
    color: '#111214',
    colors: ['#111214', '#17264a', '#c5c7c9'],
    stock: 24,
    description: 'Heavyweight fleece hoodie featuring high-density JTARS insignia embroidery on the chest, custom eyelets and premium drawstring tips.',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'JTARS Premium Hoodie',
    price: 1450,
    category: 'hoodie',
    type: 'hoodie',
    color: '#142345',
    colors: ['#142345', '#111214', '#5d626b'],
    stock: 18,
    description: 'Deep navy heavyweight 380 GSM cotton fleece with brushed interior, kangaroo pocket and double-stitched reinforced seams.',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'JTARS Classic Hoodie',
    price: 1400,
    category: 'hoodie',
    type: 'hoodie',
    color: '#c5c7c9',
    colors: ['#c5c7c9', '#111214', '#142345'],
    stock: 15,
    description: 'Heather ash classic cut hoodie tailored for oversized streetwear fit. Soft pre-shrunk cotton blend designed for daily wear.',
    isFeatured: true
  },
  {
    id: 4,
    name: 'JTARS Sweatshirt',
    price: 1300,
    category: 'sweatshirt',
    type: 'sweatshirt',
    color: '#111214',
    colors: ['#111214', '#142345', '#c5c7c9'],
    stock: 20,
    description: 'Crewneck minimal sweatshirt with ribbed collar, cuffs and hem. Clean streetwear silhouette with discreet metallic chest print.',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'JTARS T-Shirt',
    price: 850,
    category: 'tshirt',
    type: 'tshirt',
    color: '#142345',
    colors: ['#142345', '#111214', '#d5d6d7'],
    stock: 45,
    description: '100% combed ringspun cotton 220 GSM heavyweight tee. Boxy drop-shoulder cut with durable collar ribbing.',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'JTARS Essential Tee',
    price: 800,
    category: 'tshirt',
    type: 'tshirt',
    color: '#17181a',
    colors: ['#17181a', '#d5d6d7', '#263d68'],
    stock: 32,
    description: 'Everyday monochrome tee crafted with breathable organic cotton and subtle branding on the left chest.',
    isFeatured: false
  },
  {
    id: 7,
    name: 'JTARS Night Jacket',
    price: 1950,
    category: 'jacket',
    type: 'jacket',
    color: '#17191d',
    colors: ['#17191d', '#17264a'],
    stock: 8,
    description: 'Technical water-resistant windbreaker jacket with dual side pockets, front YKK zipper and reflective insignia accents.',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    name: 'JTARS Signature Cap',
    price: 550,
    category: 'cap',
    type: 'cap',
    color: '#151619',
    colors: ['#151619', '#17264a', '#b9bbbd'],
    stock: 50,
    description: 'Structured 6-panel baseball cap with curved visor, embroidered eyelets and silver metallic JTARS emblem on front.',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    name: 'JTARS Ash Sweatshirt',
    price: 1350,
    category: 'sweatshirt',
    type: 'sweatshirt',
    color: '#8c9096',
    colors: ['#8c9096', '#111214', '#142345'],
    stock: 14,
    description: 'Ash grey French terry pullover sweater with double needle stitching and signature JTARS brand tag.',
    isFeatured: false
  },
  {
    id: 10,
    name: 'JTARS Storm Hoodie',
    price: 1550,
    category: 'hoodie',
    type: 'hoodie',
    color: '#35383d',
    colors: ['#35383d', '#111214', '#142345'],
    stock: 11,
    description: 'Charcoal storm heavy pullover with thermal lined hood, hidden stash pocket and custom metallic aglets.',
    isFeatured: false
  },
  {
    id: 11,
    name: 'JTARS Court Cap',
    price: 590,
    category: 'cap',
    type: 'cap',
    color: '#1b315b',
    colors: ['#1b315b', '#151619'],
    stock: 22,
    description: 'Deep navy court cap made with breathable twill fabric and adjustable metal buckle strap at back.',
    isFeatured: false
  },
  {
    id: 12,
    name: 'JTARS Zip Jacket',
    price: 2100,
    category: 'jacket',
    type: 'jacket',
    color: '#17264a',
    colors: ['#17264a', '#17191d'],
    stock: 7,
    description: 'Heavy duty streetwear track jacket with contrast stitching, stand collar and custom silver slider puller.',
    isFeatured: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'JTR-849201',
    customerName: 'Jubayer Sikder',
    phone: '01712345678',
    address: 'House 42, Road 11, Banani',
    city: 'Dhaka',
    postcode: '1213',
    paymentMethod: 'Cash on Delivery',
    items: [
      {
        productId: 1,
        name: 'JTARS Logo Hoodie',
        price: 1450,
        size: 'L',
        color: '#111214',
        quantity: 1
      },
      {
        productId: 8,
        name: 'JTARS Signature Cap',
        price: 550,
        size: 'One Size',
        color: '#151619',
        quantity: 1
      }
    ],
    subtotal: 2000,
    shippingFee: 0,
    total: 2000,
    status: 'In Transit',
    createdAt: '2026-11-10T14:30:00.000Z'
  },
  {
    id: 'JTR-739104',
    customerName: 'Rafiqul Islam',
    phone: '01898765432',
    address: 'GEC Circle, Nasirabad',
    city: 'Chittagong',
    postcode: '4000',
    paymentMethod: 'Mobile Banking (bKash/Nagad)',
    items: [
      {
        productId: 2,
        name: 'JTARS Premium Hoodie',
        price: 1450,
        size: 'M',
        color: '#142345',
        quantity: 1
      }
    ],
    subtotal: 1450,
    shippingFee: 80,
    total: 1530,
    status: 'Confirmed',
    createdAt: '2026-11-11T09:15:00.000Z'
  },
  {
    id: 'JTR-629851',
    customerName: 'Tanvir Ahmed',
    phone: '01911223344',
    address: 'Sector 4, Uttara',
    city: 'Dhaka',
    postcode: '1230',
    paymentMethod: 'Cash on Delivery',
    items: [
      {
        productId: 7,
        name: 'JTARS Night Jacket',
        price: 1950,
        size: 'XL',
        color: '#17191d',
        quantity: 1
      }
    ],
    subtotal: 1950,
    shippingFee: 0,
    total: 1950,
    status: 'Delivered',
    createdAt: '2026-11-08T11:20:00.000Z'
  }
];

export const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'INQ-101',
    name: 'Sayed Karim',
    email: 'sayed@gmail.com',
    subject: 'Size Guide for Hoodie',
    message: 'I am 5 ft 10 inches and 72 kg. Which size should I pick for an oversized hoodie fit?',
    createdAt: '2026-11-10T16:45:00.000Z',
    status: 'New'
  },
  {
    id: 'INQ-102',
    name: 'Nusrat Jahan',
    email: 'nusrat@outlook.com',
    subject: 'Delivery time to Sylhet',
    message: 'How many days does standard delivery take outside Dhaka?',
    createdAt: '2026-11-09T18:10:00.000Z',
    status: 'Replied'
  }
];

export const DEFAULT_ADMIN_EMAIL = 'sikderjubayer820@gmail.com';
export const DEFAULT_ADMIN_PASS = 'admin123';

