'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MedOnRentMark } from '@/components/MedOnRentLogo';
import { useAuth } from '@/context/AuthContext';
import { 
  Search, 
  ChevronDown, 
  Package, 
  Menu, 
  X,
  PlusCircle,
  ShoppingCart,
  BookOpen,
  Building2,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  selectedCity: string;
  onOpenLocationModal: () => void;
  onOpenListingWizard: () => void;
  onOpenOwnerHub: () => void;
  onOpenEscrowSimulator: () => void;
  onOpenMyRentals: () => void;
  onOpenQuery: () => void;
  onOpenCart: () => void;
  onOpenPlainEnglishGuide: () => void;
  activeBookingsCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({
  selectedCity,
  onOpenLocationModal,
  onOpenListingWizard,
  onOpenOwnerHub,
  onOpenEscrowSimulator,
  onOpenMyRentals,
  onOpenQuery,
  onOpenCart,
  onOpenPlainEnglishGuide,
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
      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6 w-full">
        
        {/* Left: Brand Logo + Location Underneath */}
        <div className="flex items-center space-x-3 shrink-0">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="shrink-0 flex items-center justify-center">
              <MedOnRentMark size={32} />
            </div>
            <div className="flex flex-col">
              <div className="text-base sm:text-lg font-black tracking-tight text-[#0B192C] leading-none whitespace-nowrap">
                Med<span className="text-[#007791]">On</span><span className="text-[#10B981]">Rent</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenLocationModal();
                }}
                className="flex items-center space-x-0.5 text-[11px] sm:text-xs font-semibold text-slate-500 hover:text-[#007791] transition-colors mt-0.5 text-left"
              >
                <span className="truncate max-w-[110px]">{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-lg relative hidden md:block">
          <input
            type="text"
            placeholder="Search medical equipment (Oxygen, ICU Bed, Wheelchair, CPAP)..."
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

        {/* Right: Desktop Links */}
        <div className="hidden md:flex items-center space-x-2.5 lg:space-x-3.5 shrink-0">
          
          {/* Plain-English Guide Interactive Button */}
          <button
            onClick={onOpenPlainEnglishGuide}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-[#007791] border border-cyan-200 text-xs font-bold transition-all shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#007791]" />
            <span>Plain-English Guide</span>
            <span className="text-[9px] bg-[#007791] text-white px-1.5 py-0.2 rounded-full font-black">
              13 Steps
            </span>
          </button>

          {/* Owner Hub (Lister) */}
          <button
            onClick={onOpenOwnerHub}
            className="text-xs font-semibold text-slate-700 hover:text-amber-700 transition-colors flex items-center space-x-1"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Owner Hub</span>
          </button>

          {/* List & Earn / Add Equipment */}
          <button
            onClick={onOpenListingWizard}
            className="text-xs font-semibold text-slate-700 hover:text-[#007791] transition-colors flex items-center space-x-1"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#007791]" />
            <span>+ List Machine</span>
          </button>

          {/* Admin Control Link */}
          <Link
            href="/admin"
            className="text-xs font-semibold text-slate-700 hover:text-[#007791] transition-colors flex items-center space-x-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Admin</span>
          </Link>

          {/* Need Help? Link */}
          <button
            onClick={onOpenQuery}
            className="text-xs font-semibold text-slate-700 hover:text-[#007791] transition-colors flex items-center space-x-1"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Help</span>
          </button>

          {/* My Rentals (Buyer Dashboard) */}
          <button
            onClick={onOpenMyRentals}
            className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            title="Buyer Dashboard (Active Rentals)"
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

          {/* User Profile / Login */}
          {!user ? (
            <button
              onClick={openAuthModal}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#007791] hover:bg-[#005f73] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <span>Login / Sign Up</span>
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
                      <span>Buyer Dashboard ({activeBookingsCount})</span>
                    </button>
                    <button
                      onClick={() => {
                        onOpenOwnerHub();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 rounded-xl flex items-center space-x-2"
                    >
                      <Building2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Owner Hub & Earnings</span>
                    </button>
                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-800 rounded-xl flex items-center space-x-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                      <span>Admin Control Center</span>
                    </Link>
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

        {/* Mobile Right Icons */}
        <div className="flex md:hidden items-center space-x-1.5">
          <button
            onClick={onOpenPlainEnglishGuide}
            className="p-1.5 rounded-xl bg-cyan-50 text-[#007791] text-[10px] font-bold border border-cyan-200"
          >
            Guide
          </button>
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenMyRentals}
            className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="My Rentals"
          >
            <Package className="w-5 h-5" />
            {activeBookingsCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#007791] text-white text-[8px] font-black flex items-center justify-center">
                {activeBookingsCount}
              </span>
            )}
          </button>
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
        <div className="md:hidden px-3 pb-3 pt-1 border-t border-slate-100 bg-slate-50 w-full">
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
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-xl w-full">
          <button
            onClick={() => {
              onOpenPlainEnglishGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-xs font-bold text-[#007791]"
          >
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-[#007791]" />
              <span>Complete Plain-English Guide (13 Steps)</span>
            </div>
            <span>→</span>
          </button>

          <button
            onClick={() => {
              onOpenOwnerHub();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900"
          >
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Owner Hub & Earnings</span>
            </div>
            <span>→</span>
          </button>

          <button
            onClick={() => {
              onOpenListingWizard();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#007791] text-white text-xs font-bold"
          >
            <span>+ List Equipment & Earn</span>
            <span>→</span>
          </button>

          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-900"
          >
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Admin Control Center (8 Modules)</span>
            </div>
            <span>→</span>
          </Link>

          <button
            onClick={() => {
              onOpenEscrowSimulator();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
          >
            <span>How Deposit Escrow Works</span>
            <span>→</span>
          </button>

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
        </div>
      )}
    </header>
  );
}
