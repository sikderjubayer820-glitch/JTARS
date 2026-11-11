import React, { useState } from 'react';
import { X, Send, Mail, CheckCircle2, Phone, MapPin, Headphones } from 'lucide-react';
import { CustomerInquiry } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  isHelp?: boolean;
  storeEmail?: string;
  storePhone?: string;
  onSubmitInquiry: (inquiry: CustomerInquiry) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  isHelp = false,
  storeEmail = 'sikderjubayer820@gmail.com',
  storePhone = '+880 1712 345678',
  onSubmitInquiry
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(isHelp ? 'Order Support' : 'Product Question');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const newInq: CustomerInquiry = {
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    onSubmitInquiry(newInq);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-130 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#111216] border border-[#373a42] rounded-2xl p-6 sm:p-8 text-[#f5f6f7] shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1b1c20] text-[#a0a4ad] hover:text-white grid place-items-center"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 grid place-items-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase text-white">Message Sent</h3>
            <p className="text-xs text-[#8e939d] mt-2 max-w-sm mx-auto leading-relaxed">
              Thank you, {name}. Our customer support specialists will review your inquiry and reply via email within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Headphones className="w-5 h-5 text-blue-400" />
              <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                {isHelp ? 'HOW CAN WE' : 'GET IN'} <span className="text-blue-500">{isHelp ? 'HELP?' : 'TOUCH'}</span>
              </h2>
            </div>
            <p className="text-xs text-[#8c909b] mb-5">
              Have questions regarding our hoodies, shipping rates, or size guide? Send our team a message.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full h-10 px-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Order Support">Order Support / Delivery Update</option>
                  <option value="Product Question">Product & Fabric Inquiries</option>
                  <option value="Size Guide Help">Size & Fit Recommendation</option>
                  <option value="Return or Exchange">Return or Exchange Request</option>
                  <option value="Wholesale / Partnership">Wholesale / Brand Partnership</option>
                  <option value="Other">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="How can we assist you today?"
                  className="w-full p-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-[#23252c] grid grid-cols-2 gap-3 text-[11px] text-[#828690]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{storeEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{storePhone}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
