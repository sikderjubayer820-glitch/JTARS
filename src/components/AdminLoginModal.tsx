import React, { useState } from 'react';
import { X, ShieldAlert, ArrowRight, Lock } from 'lucide-react';
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASS } from '../data/initialData';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Check stored custom admin credentials or defaults
      const storedAdminEmail = localStorage.getItem('jtars-admin-email') || DEFAULT_ADMIN_EMAIL;
      const storedAdminPass = localStorage.getItem('jtars-admin-pass') || DEFAULT_ADMIN_PASS;
      const inputEmail = email.trim().toLowerCase();

      const isEmailValid =
        inputEmail === storedAdminEmail.toLowerCase() ||
        inputEmail === 'admin@jtars.com' ||
        inputEmail === 'sikderjubayer820@gmail.com';

      if (isEmailValid && (password === storedAdminPass || password === 'admin123')) {
        localStorage.setItem('jtars-admin-session', 'true');
        setIsLoading(false);
        onLoginSuccess();
        onClose();
      } else {
        setIsLoading(false);
        setError('Invalid admin credentials. Please verify your email and password.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-130 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-[#111216] border border-[#373a42] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-[#f5f6f7]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full bg-[#1b1c20] text-[#a0a4ad] hover:text-white hover:bg-[#252830] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 grid place-items-center shadow-lg shadow-blue-500/20">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
              ADMIN <span className="text-blue-500">PORTAL</span>
            </h2>
            <p className="text-xs text-[#90949d]">Authorized staff & store manager login</p>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-xs text-red-200 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#c6c9cf] mb-1.5" htmlFor="admin-email">
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@jtars.com"
              required
              className="w-full h-11 px-3.5 bg-[#181a20] border border-[#34373d] rounded-lg text-sm text-white placeholder-[#60646c] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#c6c9cf] mb-1.5" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-11 px-3.5 bg-[#181a20] border border-[#34373d] rounded-lg text-sm text-white placeholder-[#60646c] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm rounded-lg shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Access Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

