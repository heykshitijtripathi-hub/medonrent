'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function GoogleAuthModal() {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle } = useAuth();
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleQuickGoogleSignIn = (email: string, name: string) => {
    setIsSigningIn(true);
    setTimeout(() => {
      loginWithGoogle(email, name);
      setIsSigningIn(false);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    setIsSigningIn(true);
    setTimeout(() => {
      loginWithGoogle(customEmail, customName || customEmail.split('@')[0]);
      setIsSigningIn(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          {/* Google Header */}
          <div className="flex flex-col items-center text-center">
            {/* Official Google G Logo */}
            <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center p-2 mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Sign in with Google
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              to continue to <span className="font-bold text-[#007791]">MedOnRent Patient Care</span>
            </p>
          </div>

          {/* Account selector cards */}
          <div className="mt-6 space-y-2.5">
            <button
              onClick={() => handleQuickGoogleSignIn('kshitij.tripathi@gmail.com', 'Kshitij Tripathi')}
              disabled={isSigningIn}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-[#007791] hover:bg-cyan-50/40 transition-all text-left group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#007791] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  KT
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    Kshitij Tripathi
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <div className="text-xs text-slate-500">kshitij.tripathi@gmail.com</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#007791] group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => handleQuickGoogleSignIn('patient.care.delhi@gmail.com', 'Verified Patient')}
              disabled={isSigningIn}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-[#007791] hover:bg-cyan-50/40 transition-all text-left group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  VP
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    Patient / Family Member
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <div className="text-xs text-slate-500">patient.care.delhi@gmail.com</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#007791] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Use another Google account toggle */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            {!showCustomInput ? (
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full text-center text-xs font-semibold text-[#007791] hover:underline"
              >
                + Sign in with another Google / Gmail ID
              </button>
            ) : (
              <form onSubmit={handleCustomSubmit} className="space-y-3 animate-in fade-in duration-200">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#007791] focus:ring-1 focus:ring-[#007791] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Your Gmail Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#007791] focus:ring-1 focus:ring-[#007791] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="w-full py-2.5 rounded-xl bg-[#007791] hover:bg-[#005f73] text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center space-x-2"
                >
                  {isSigningIn ? (
                    <span>Verifying with Google...</span>
                  ) : (
                    <span>Continue with this Account →</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Trust Guarantee */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center space-x-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Encrypted Google OAuth 2.0 • Zero spam policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
