'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { 
  MapPin, 
  PlusCircle, 
  Search, 
  PhoneCall, 
  Activity, 
  CheckCircle2,
  Package,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onOpenListingWizard: () => void;
  onOpenEscrowSimulator: () => void;
  onOpenMyRentals: () => void;
  onOpenQuery: () => void;
  activeBookingsCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CITIES = [
  'All Cities',
  'Delhi NCR',
  'Mumbai',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
];

export default function Navbar({
  selectedCity,
  onSelectCity,
  onOpenListingWizard,
  onOpenEscrowSimulator,
  onOpenMyRentals,
  onOpenQuery,
  activeBookingsCount,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const { user, openAuthModal, logout } = useAuth();
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all w-full">
      {/* Top Micro-Bar: Clean, minimal trust & helpline (Never overflows on mobile) */}
      <div className="bg-[#0B192C] text-slate-200 text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 lg:px-8 flex items-center justify-between w-full">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-400 font-semibold">100% Refundable Deposit Safe</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-300">Aadhaar Verified Owners</span>
        </div>
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <button 
            onClick={onOpenQuery}
            className="text-amber-300 hover:text-white font-medium transition-colors text-[11px] hidden xs:inline"
          >
            ❓ Help
          </button>
          <a href="tel:8175087004" className="text-white hover:text-emerald-400 flex items-center font-bold text-[11px] sm:text-xs">
            <PhoneCall className="w-3 h-3 mr-1 text-emerald-400 shrink-0" />
            <span>8175087004</span>
          </a>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center space-x-2.5 shrink-0">
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
            <div className="flex items-center space-x-1.5">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#0B192C]">
                Med<span className="text-[#007791]">On</span><span className="text-[#10B981]">Rent</span>
              </span>
              <span className="bg-emerald-50 text-[#059669] border border-emerald-200 text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase hidden sm:inline-block">
                Care in Circulation
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar (Desktop only) */}
        <div className="flex-1 max-w-sm relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Oxygen Concentrator, ICU Bed, Wheelchair..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-7 py-2 text-xs rounded-xl bg-slate-100/90 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#007791]/30 focus:border-[#007791] transition-all placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right: Desktop Controls */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
          {/* City Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-700 border border-slate-200/80 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#007791]" />
              <span>{selectedCity}</span>
              <span className="text-slate-400 text-[9px]">▼</span>
            </button>
            {cityDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in">
                <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Select Metro Area
                </div>
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onSelectCity(c);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      selectedCity === c ? 'text-[#007791] font-bold bg-cyan-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{c}</span>
                    {selectedCity === c && <CheckCircle2 className="w-3.5 h-3.5 text-[#007791]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* My Rentals (Desktop) */}
          <button
            onClick={onOpenMyRentals}
            className="relative px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Package className="w-3.5 h-3.5 text-[#007791]" />
            <span>My Rentals</span>
            {activeBookingsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-black flex items-center justify-center">
                {activeBookingsCount}
              </span>
            )}
          </button>

          {/* Google Sign In / Profile (Desktop) */}
          {!user ? (
            <button
              onClick={openAuthModal}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span>Sign In with Google</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-xs font-bold text-slate-800 shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-[#007791] text-white flex items-center justify-center font-bold text-[11px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="truncate max-w-[85px]">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <div className="text-xs font-bold text-slate-800 truncate">{user.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                    <div className="mt-1 flex items-center space-x-1 text-[10px] text-emerald-600 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Google Account Verified</span>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onOpenMyRentals();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-cyan-50/50 hover:text-[#007791] rounded-xl flex items-center space-x-2 transition-colors"
                    >
                      <Package className="w-3.5 h-3.5 text-[#007791]" />
                      <span>My Active Rentals ({activeBookingsCount})</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center space-x-2 transition-colors mt-1"
                    >
                      <span>🚪 Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* List & Earn CTA (Desktop) */}
          <button
            onClick={onOpenListingWizard}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#007791] hover:bg-[#005f73] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-300" />
            <span>List & Earn</span>
          </button>
        </div>

        {/* Mobile Header Icons: Search + Rentals + Menu (Minimal, Clean, No Duplication) */}
        <div className="flex md:hidden items-center space-x-1.5">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Mobile My Rentals icon (if has active bookings) */}
          {activeBookingsCount > 0 && (
            <button
              onClick={onOpenMyRentals}
              className="relative p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="My Rentals"
            >
              <Package className="w-4 h-4 text-[#007791]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-black flex items-center justify-center">
                {activeBookingsCount}
              </span>
            </button>
          )}

          {/* User Avatar if logged in on mobile */}
          {user && (
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-8 h-8 rounded-full bg-[#007791] text-white flex items-center justify-center font-bold text-xs shadow-xs"
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
          )}

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {showMobileSearch && (
        <div className="md:hidden px-3 pb-3 pt-1 border-t border-slate-100 bg-slate-50 animate-in slide-in-from-top-2 w-full">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search Oxygen Concentrator, ICU Bed..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 text-xs rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007791]/30 font-medium"
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

      {/* Professional Mobile Drawer (Single clean place for Account + City + Links) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 animate-in slide-in-from-top-2 shadow-xl w-full">
          {/* Section 1: User Account Card (Only place for Google Sign-in on mobile) */}
          <div>
            {!user ? (
              <button
                onClick={() => {
                  openAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-xs transition-all active:scale-98"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>Sign in with Google Account</span>
              </button>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#007791] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{user.name}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[170px]">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-600 font-bold hover:underline px-2 py-1"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Section 2: Clean City Selector */}
          <div>
            <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#007791]" />
                Select Metro Location
              </span>
              <span className="text-[#007791] font-bold lowercase">current: {selectedCity}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    onSelectCity(c);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-2 text-xs font-semibold rounded-xl text-center border transition-all ${
                    selectedCity === c
                      ? 'bg-[#007791] text-white border-[#007791] shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Navigation Links */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenMyRentals();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold"
            >
              <div className="flex items-center space-x-2.5">
                <Package className="w-4 h-4 text-[#007791]" />
                <span>My Active Bookings</span>
              </div>
              <span className="text-slate-400">({activeBookingsCount}) →</span>
            </button>

            <button
              onClick={() => {
                onOpenListingWizard();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#007791] text-white text-xs font-bold shadow-sm"
            >
              <div className="flex items-center space-x-2.5">
                <PlusCircle className="w-4 h-4 text-emerald-300" />
                <span>Put Medical Machine on Rent</span>
              </div>
              <span>→</span>
            </button>

            <button
              onClick={() => {
                onOpenQuery();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs font-bold"
            >
              <div className="flex items-center space-x-2.5">
                <span>❓</span>
                <span>Ask a Question / Request Help</span>
              </div>
              <span className="text-amber-700">→</span>
            </button>

            <button
              onClick={() => {
                onOpenEscrowSimulator();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-cyan-50/60 border border-cyan-200 text-[#007791] text-xs font-bold"
            >
              <div className="flex items-center space-x-2.5">
                <Activity className="w-4 h-4 text-[#007791]" />
                <span>How Security Deposit Works</span>
              </div>
              <span className="text-[#007791]">→</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
