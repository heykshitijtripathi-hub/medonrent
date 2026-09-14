'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  MapPin, 
  PlusCircle, 
  Search, 
  PhoneCall, 
  Activity, 
  CheckCircle2,
  Package,
  Building2
} from 'lucide-react';

interface NavbarProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onOpenListingWizard: () => void;
  onOpenEscrowSimulator: () => void;
  onOpenMyRentals: () => void;
  onOpenLenderHub: () => void;
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
];

export default function Navbar({
  selectedCity,
  onSelectCity,
  onOpenListingWizard,
  onOpenEscrowSimulator,
  onOpenMyRentals,
  onOpenLenderHub,
  activeBookingsCount,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top micro-bar: Trust & Emergency Hotline */}
      <div className="bg-[#0B192C] text-slate-200 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <span className="flex items-center text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5 inline-block"></span>
            100% Escrow Protected
          </span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span className="hidden sm:flex items-center text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#007791] mr-1" />
            Aadhaar Verified Members • 100% Sanitized Equipment
          </span>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <button 
            onClick={onOpenEscrowSimulator}
            className="text-cyan-300 hover:text-white flex items-center font-medium underline underline-offset-2 transition-colors"
          >
            <Activity className="w-3.5 h-3.5 mr-1" />
            How Escrow Works
          </button>
          <a href="tel:18001209988" className="hover:text-emerald-400 flex items-center font-medium">
            <PhoneCall className="w-3 h-3 mr-1 text-emerald-400" />
            24/7 Patient Line: 1800-120-RENT
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md border border-slate-100 flex-shrink-0 bg-white">
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
              <span className="text-xl font-black tracking-tight text-[#0B192C]">
                Med<span className="text-[#007791]">On</span><span className="text-[#10B981]">Rent</span>
              </span>
              <span className="bg-emerald-100 text-[#059669] text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                Care in Circulation
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden md:block">
              Peer-to-Peer Medical Equipment Rental Marketplace
            </p>
          </div>
        </div>

        {/* City Selector Pill */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            className="flex items-center space-x-2 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#007791]" />
            <span>{selectedCity}</span>
            <span className="text-slate-400 text-[10px]">▼</span>
          </button>
          {cityDropdownOpen && (
            <div className="absolute left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1 text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                Select Your Metro
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

        {/* Search Input */}
        <div className="flex-1 max-w-sm relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Oxygen Concentrator, Hospital Bed, Wheelchair..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-100/90 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#007791]/30 focus:border-[#007791] transition-all placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* My Rentals Tab with Badge */}
          <button
            onClick={onOpenMyRentals}
            className="relative px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Package className="w-4 h-4 text-[#007791]" />
            <span className="hidden sm:inline">My Rentals</span>
            {activeBookingsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center">
                {activeBookingsCount}
              </span>
            )}
          </button>

          {/* Lender Portal Hub */}
          <button
            onClick={onOpenLenderHub}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors hidden sm:flex"
          >
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>Lender Hub</span>
          </button>

          {/* List Equipment */}
          <button
            onClick={onOpenListingWizard}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#007791] to-[#005F73] text-white text-xs font-bold shadow-md hover:from-[#005F73] hover:to-[#0B192C] transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-emerald-300" />
            <span>List & Earn 82%</span>
          </button>
        </div>
      </div>
    </header>
  );
}
