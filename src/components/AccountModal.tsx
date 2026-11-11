import React, { useState } from 'react';
import { X, UserRound, ArrowRight, ShieldCheck, Mail, Lock, User } from 'lucide-react';
import { UserAccount } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLoginUser: (user: UserAccount) => void;
  onLogoutUser: () => void;
  onOpenAdminLogin: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginUser,
  onLogoutUser,
  onOpenAdminLogin
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const user: UserAccount = {
      name: mode === 'register' ? name : email.split('@')[0],
      email
    };
    onLoginUser(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-130 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#111216] border border-[#373a42] rounded-2xl p-6 sm:p-8 text-[#f5f6f7] shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1b1c20] text-[#a0a4ad] hover:text-white grid place-items-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          /* Logged In View */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-400 grid place-items-center mx-auto mb-3">
              <UserRound className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase text-white">Welcome, {currentUser.name}</h3>
            <p className="text-xs text-[#8c909b] mt-1">{currentUser.email}</p>

            <div className="mt-6 space-y-2">
              <button
                onClick={onLogoutUser}
                className="w-full py-2.5 rounded-lg bg-[#181a20] hover:bg-[#22242c] border border-[#2f323a] text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Register Form */
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                {mode === 'login' ? 'WELCOME' : 'CREATE'} <span className="text-blue-500">{mode === 'login' ? 'BACK' : 'ACCOUNT'}</span>
              </h2>
            </div>
            <p className="text-xs text-[#8c909b] mb-5">
              {mode === 'login'
                ? 'Sign in to access saved pieces and track your streetwear deliveries.'
                : 'Join the JTARS community for early drops and exclusive access.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71757e]" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full h-10 pl-9 pr-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71757e]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-10 pl-9 pr-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c6c9cf] mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71757e]" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full h-10 pl-9 pr-3 bg-[#181a20] border border-[#34373d] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-10 mt-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-[#828690]">
              {mode === 'login' ? 'New to JTARS?' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 ml-1"
              >
                {mode === 'login' ? 'Create an account' : 'Sign in'}
              </button>
            </div>

            {/* Direct Admin Login Option */}
            <div className="mt-6 pt-4 border-t border-[#23252c] text-center">
              <p className="text-xs text-[#71757f] mb-2">Store Administrator or Staff?</p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAdminLogin();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#181a20] hover:bg-[#22252c] border border-blue-500/30 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Login to Admin Portal</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
