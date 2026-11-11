import React, { useState } from 'react';
import { X, Search, CheckCircle, Package, Truck, Home, Clock, AlertCircle } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  initialOrderId?: string;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  orders,
  initialOrderId = ''
}) => {
  const [searchId, setSearchId] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    if (initialOrderId) {
      return orders.find(o => o.id.toLowerCase() === initialOrderId.toLowerCase()) || null;
    }
    return orders[0] || null;
  });
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleaned = searchId.trim().toUpperCase();
    const found = orders.find(o => o.id.toUpperCase() === cleaned || o.phone === cleaned);
    setActiveOrder(found || null);
  };

  // Determine which step is achieved based on status
  const getStepStatus = (stepIndex: number, currentStatus: OrderStatus) => {
    const statusRanks: Record<OrderStatus, number> = {
      Pending: 0,
      Confirmed: 1,
      Processing: 2,
      'In Transit': 3,
      Delivered: 4,
      Cancelled: -1
    };
    const rank = statusRanks[currentStatus] ?? 1;
    if (rank === -1) return 'cancelled';
    if (rank >= stepIndex) return 'done';
    return 'pending';
  };

  return (
    <div className="fixed inset-0 z-130 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#111216] border border-[#373a42] rounded-2xl p-6 sm:p-7 text-[#f5f6f7] shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1b1c20] text-[#a0a4ad] hover:text-white grid place-items-center"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
          TRACK YOUR <span className="text-blue-500">ORDER</span>
        </h2>
        <p className="text-xs text-[#8c909b] mb-4">
          Enter your JTARS order number (e.g. JTR-849201) to view fulfillment updates.
        </p>

        {/* Search input */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-5">
          <input
            type="text"
            required
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            placeholder="Order Number (e.g. JTR-849201)"
            className="flex-1 h-11 px-3.5 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white uppercase placeholder-[#60646e] focus:outline-none focus:border-blue-500 font-mono"
          />
          <button
            type="submit"
            className="h-11 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase rounded-lg shadow-md transition-all flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Track</span>
          </button>
        </form>

        {/* Search result display */}
        {activeOrder ? (
          <div className="p-4 rounded-xl bg-[#16181d] border border-[#2c2f37] space-y-4">
            <div className="flex items-center justify-between border-b border-[#24262d] pb-2.5">
              <div>
                <span className="font-mono text-sm font-bold text-blue-400">{activeOrder.id}</span>
                <p className="text-[11px] text-[#787c86]">{activeOrder.customerName} ({activeOrder.city})</p>
              </div>
              <span className="font-display text-base font-bold text-white">
                ৳{activeOrder.total.toLocaleString()}
              </span>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-4 pt-1">
              {/* Step 1 */}
              <div className="flex items-start gap-3 relative">
                <div
                  className={`w-7 h-7 rounded-full grid place-items-center text-xs shrink-0 ${
                    getStepStatus(1, activeOrder.status) === 'done'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-[#22242c] text-[#6b6f79]'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white leading-tight">Order Confirmed</p>
                  <p className="text-[10px] text-[#828690]">Your purchase has been recorded by our central hub.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 relative">
                <div
                  className={`w-7 h-7 rounded-full grid place-items-center text-xs shrink-0 ${
                    getStepStatus(2, activeOrder.status) === 'done'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-[#22242c] text-[#6b6f79]'
                  }`}
                >
                  <Package className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white leading-tight">Being Prepared & Packed</p>
                  <p className="text-[10px] text-[#828690]">Garments undergo quality checks and secure packaging.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 relative">
                <div
                  className={`w-7 h-7 rounded-full grid place-items-center text-xs shrink-0 ${
                    getStepStatus(3, activeOrder.status) === 'done'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-[#22242c] text-[#6b6f79]'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white leading-tight">In Transit (Courier)</p>
                  <p className="text-[10px] text-[#828690]">Package handed over to courier for direct door delivery.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3 relative">
                <div
                  className={`w-7 h-7 rounded-full grid place-items-center text-xs shrink-0 ${
                    getStepStatus(4, activeOrder.status) === 'done'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                      : 'bg-[#22242c] text-[#6b6f79]'
                  }`}
                >
                  <Home className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white leading-tight">Delivered</p>
                  <p className="text-[10px] text-[#828690]">Package delivered to recipient address.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#252830] text-[10px] text-[#787c86] flex items-center justify-between">
              <span>Status: <strong className="text-blue-400">{activeOrder.status}</strong></span>
              <span>Updated in real time</span>
            </div>
          </div>
        ) : (
          hasSearched && (
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/40 text-center">
              <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-red-200">Order not found</p>
              <p className="text-[11px] text-[#8e939d] mt-1">
                Please double check your order number or phone number.
              </p>
            </div>
          )
        )}

        {/* Sample helper orders for test review */}
        <div className="mt-4 pt-3 border-t border-[#23252c] text-[11px] text-[#7a7e87]">
          <span>Quick Test Orders: </span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {orders.slice(0, 3).map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchId(o.id);
                  setActiveOrder(o);
                }}
                className="px-2 py-0.5 rounded bg-[#181a20] hover:bg-[#20222a] border border-[#2e3037] text-[10px] font-mono text-blue-400"
              >
                {o.id} ({o.status})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
