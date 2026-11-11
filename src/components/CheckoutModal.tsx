import React, { useState } from 'react';
import { X, Lock, CheckCircle2, Truck, ArrowRight, ShieldCheck, Copy } from 'lucide-react';
import { CartItem, Product, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  products: Product[];
  freeShippingThreshold?: number;
  onOrderPlaced: (order: Order) => void;
  onOpenTrackOrderWithId: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  products,
  freeShippingThreshold = 1500,
  onOrderPlaced,
  onOpenTrackOrderWithId
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [postcode, setPostcode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Mobile Banking (bKash/Nagad)' | 'Credit / Debit Card'>('Cash on Delivery');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getProduct = (id: number) => products.find(p => p.id === id);

  const subtotal = cart.reduce((sum, it) => {
    const prod = getProduct(it.id);
    return sum + (prod ? prod.price * it.quantity : 0);
  }, 0);

  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 80;
  const grandTotal = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    const newOrderId = `JTR-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderItems = cart.map(it => {
      const prod = getProduct(it.id);
      return {
        productId: it.id,
        name: prod ? prod.name : 'JTARS Apparel',
        price: prod ? prod.price : 0,
        size: it.size,
        color: it.color,
        quantity: it.quantity
      };
    });

    const newOrder: Order = {
      id: newOrderId,
      customerName: name,
      phone,
      address,
      city,
      postcode,
      paymentMethod,
      items: orderItems,
      subtotal,
      shippingFee,
      total: grandTotal,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    onOrderPlaced(newOrder);
    setConfirmedOrder(newOrder);
  };

  const copyOrderId = () => {
    if (confirmedOrder) {
      navigator.clipboard.writeText(confirmedOrder.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-130 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#111216] border border-[#3a3d43] rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-6 sm:p-8 text-[#f5f6f7]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1b1c20] text-[#a0a4ad] hover:text-white grid place-items-center"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedOrder ? (
          /* Order Confirmed Screen */
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 grid place-items-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="font-display text-3xl font-bold uppercase tracking-wider text-white">
              Order Confirmed!
            </h2>
            <p className="text-xs text-[#8e939d] mt-2 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{confirmedOrder.customerName}</strong>. Your order has been
              received by the JTARS fulfillment hub. We will dispatch your package shortly.
            </p>

            <div className="my-5 p-4 rounded-xl bg-[#16181e] border border-[#2e313a] max-w-xs mx-auto">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7b7f88] block mb-1">
                Your Tracking Order ID
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-2xl font-bold text-blue-400 tracking-wider">
                  {confirmedOrder.id}
                </span>
                <button
                  onClick={copyOrderId}
                  className="p-1.5 rounded-lg bg-[#20232b] hover:bg-[#2a2f3a] text-[#8e939d] hover:text-white"
                  title="Copy Order ID"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {copied && <span className="text-[10px] text-emerald-400 block mt-1">Copied to clipboard!</span>}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <button
                onClick={() => {
                  onClose();
                  onOpenTrackOrderWithId(confirmedOrder.id);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <span>Track Order Live</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#181a20] hover:bg-[#22242c] text-[#a0a4ae] text-xs font-semibold"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-blue-400" />
              <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                SECURE <span className="text-blue-500">CHECKOUT</span>
              </h2>
            </div>
            <p className="text-xs text-[#8c909b] mb-5">
              Enter your recipient details to finalize delivery across Bangladesh.
            </p>

            {/* Price Snapshot */}
            <div className="p-3.5 rounded-xl bg-[#16181d] border border-[#272930] mb-5 text-xs space-y-1.5">
              <div className="flex justify-between text-[#8a8e97]">
                <span>Items Subtotal ({cart.reduce((n, i) => n + i.quantity, 0)})</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#8a8e97]">
                <span>Delivery Charge</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-400">Free</strong> : `৳${shippingFee}`}</span>
              </div>
              <div className="pt-2 border-t border-[#252830] flex justify-between font-bold text-white text-sm">
                <span>Grand Total</span>
                <span className="font-display text-lg text-blue-400">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Tanvir Rahman"
                    className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Phone Number (Required for courier)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">City / Division</label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Full Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="House / Flat #, Road, Area / Thana"
                    className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Payment Method</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      'Cash on Delivery',
                      'Mobile Banking (bKash/Nagad)',
                      'Credit / Debit Card'
                    ].map(method => (
                      <label
                        key={method}
                        className={`p-3 rounded-lg border text-xs font-semibold text-center cursor-pointer transition-all ${
                          paymentMethod === method
                            ? 'bg-blue-950/40 border-blue-500 text-white shadow-sm'
                            : 'bg-[#181a20] border-[#31343b] text-[#9ba0aa] hover:border-[#484b54]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          className="sr-only"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={() => setPaymentMethod(method as any)}
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Order — ৳{grandTotal.toLocaleString()}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
