'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { 
  Search, 
  ChevronDown, 
  Package, 
  Menu, 
  X,
  Activity,
  PlusCircle,
  ShoppingCart
} from 'lucide-react';

interface NavbarProps {
  selectedCity: string;
  onOpenLocationModal: () => void;
  onOpenListingWizard: () => void;
  onOpenEscrowSimulator: () => void;
  onOpenMyRentals: () => void;
  onOpenQuery: () => void;
  onOpenCart: () => void;
  activeBookingsCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({
  selectedCity,
  onOpenLocationModal,
  onOpenListingWizard,
  onOpenEscrowSimulator,
  onOpenMyRentals,
  onOpenQuery,
  onOpenCart,
  activeBookingsCount,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const { user, openAuthModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs transition-all w-full">
      {/* RentoMojo-style Main Header Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6 w-full">
        {/* Left: Brand Logo + Location Underneath (Exact RentoMojo layout) */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shadow-xs border border-slate-100 bg-white shrink-0">
              <Image
                src="/assets/medonrent-app-icon.jpg"
                alt="MedOnRent Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black tracking-tight text-[#0B192C] leading-none">
                Med<span className="text-[#007791]">On</span><span className="text-[#10B981]">Rent</span>
              </div>
              {/* City Underneath with Dropdown Indicator */}
              <button
                onClick={onOpenLocationModal}
                className="flex items-center space-x-0.5 text-[11px] sm:text-xs font-semibold text-slate-500 hover:text-[#007791] transition-colors mt-0.5"
              >
                <span className="truncate max-w-[110px]">{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Center: Wide, clean search bar (Exact RentoMojo pill style) */}
        <div className="flex-1 max-w-xl relative hidden md:block">
          <input
            type="text"
            placeholder="Search for medical equipment to rent (Oxygen, ICU Bed, Wheelchair...)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#007791]/30 focus:border-[#007791] transition-all placeholder:text-slate-400 font-medium"
          />
          <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-9 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right: Desktop Links & Login/Signup Button */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4 shrink-0">
          {/* List & Earn / Lender */}
          <button
            onClick={onOpenListingWizard}
            className="text-xs font-semibold text-slate-700 hover:text-[#007791] transition-colors flex items-center space-x-1"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#007791]" />
            <span>List & Earn</span>
          </button>

          {/* Need Help? Link */}
          <button
            onClick={onOpenQuery}
            className="text-xs font-semibold text-slate-700 hover:text-[#007791] transition-colors"
          >
            Help & FAQ
          </button>

          {/* My Rentals (Bag / Cart Icon with Badge) */}
          <button
            onClick={onOpenMyRentals}
            className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            title="My Active Rentals"
          >
            <Package className="w-5 h-5 text-slate-700" />
            {activeBookingsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#007791] text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                {activeBookingsCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            title="My Cart"
          >
            <ShoppingCart className="w-5 h-5 text-slate-700" />
          </button>

          {/* Primary Action: Login/Signup with Google (RentoMojo red/teal button style) */}
          {!user ? (
            <button
              onClick={openAuthModal}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#007791] hover:bg-[#005f73] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 bg-white rounded-full p-0.5">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span>Login / Signup</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-xs font-bold text-slate-800"
              >
                <div className="w-6 h-6 rounded-full bg-[#007791] text-white flex items-center justify-center font-bold text-[11px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="truncate max-w-[85px]">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <div className="text-xs font-bold text-slate-800 truncate">{user.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onOpenMyRentals();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-cyan-50/50 hover:text-[#007791] rounded-xl flex items-center space-x-2"
                    >
                      <Package className="w-3.5 h-3.5 text-[#007791]" />
                      <span>My Active Rentals ({activeBookingsCount})</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center space-x-2 mt-1"
                    >
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Right Icons: Search + Cart/Rentals + Menu */}
        <div className="flex md:hidden items-center space-x-1.5">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Mobile My Rentals Icon */}
          <button
            onClick={onOpenMyRentals}
            className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="My Rentals"
          >
            <Package className="w-5 h-5" />
            {activeBookingsCount > 0 && (
              <span className="absolute 1 top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#007791] text-white text-[8px] font-black flex items-center justify-center">
                {activeBookingsCount}
              </span>
            )}
          </button>

          {/* Login or Hamburger */}
          {!user ? (
            <button
              onClick={openAuthModal}
              className="px-2.5 py-1.5 rounded-xl bg-[#007791] text-white text-xs font-bold"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-7 h-7 rounded-full bg-[#007791] text-white flex items-center justify-center font-bold text-xs"
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {showMobileSearch && (
        <div className="md:hidden px-3 pb-3 pt-1 border-t border-slate-100 bg-slate-50 animate-in slide-in-from-top-2 w-full">
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="Search Oxygen, ICU Bed, Wheelchair..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-3 pr-8 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007791]/30 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top-2 shadow-xl w-full">
          {/* Location button in drawer */}
          <button
            onClick={() => {
              onOpenLocationModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
          >
            <div className="flex items-center space-x-2">
              <span>📍 Location:</span>
              <span className="text-[#007791] font-bold">{selectedCity}</span>
            </div>
            <span className="text-slate-400">Change ⌵</span>
          </button>

          {/* Links */}
          <button
            onClick={() => {
              onOpenListingWizard();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#007791] text-white text-xs font-bold"
          >
            <span>Put Medical Machine on Rent</span>
            <span>→</span>
          </button>

          <button
            onClick={() => {
              onOpenQuery();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold"
          >
            <span>Ask a Question / Request Help</span>
            <span>→</span>
          </button>

          <button
            onClick={() => {
              onOpenEscrowSimulator();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold"
          >
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-[#007791]" />
              <span>How Security Deposit Works</span>
            </div>
            <span>→</span>
          </button>

          {user && (
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl"
            >
              Sign Out ({user.email})
            </button>
          )}

          <div className="pt-2 text-center text-xs text-slate-500">
            Helpline: <a href="tel:8175087004" className="font-bold text-[#007791]">+91 8175087004</a>
          </div>
        </div>
      )}
    </header>
  );
}
