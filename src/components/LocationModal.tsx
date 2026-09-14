'use client';

import React, { useState } from 'react';
import { X, MapPin, Navigation, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onFetchGPS: () => void;
}

const POPULAR_METROS = [
  { name: 'Delhi NCR', label: 'Gurugram, Delhi, Noida' },
  { name: 'Mumbai', label: 'Mumbai, Thane, Navi Mumbai' },
  { name: 'Bengaluru', label: 'Whitefield, Koramangala' },
  { name: 'Hyderabad', label: 'Hitec City, Banjara Hills' },
  { name: 'Pune', label: 'Kothrud, Viman Nagar' },
  { name: 'Chennai', label: 'Adyar, Anna Nagar' },
  { name: 'Kolkata', label: 'Salt Lake, New Town' },
  { name: 'Ahmedabad', label: 'SG Highway, Bodakdev' },
];

export default function LocationModal({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
  onFetchGPS,
}: LocationModalProps) {
  const { user, openAuthModal } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredMetros = POPULAR_METROS.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCityPick = (city: string) => {
    onSelectCity(city);
    try {
      localStorage.setItem('mor_selected_city', city);
    } catch {
      // ignore
    }
    onClose();
  };

  const handleGpsClick = () => {
    onFetchGPS();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
          aria-label="Close location selector"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-5">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Choose location
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Please choose a location to view sanitized medical equipment available near you.
            </p>
          </div>

          {/* Area Search Input */}
          <div className="mb-4">
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Enter area, city or pincode
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Type here (e.g. Gurugram, Delhi, Noida...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#007791]/30 focus:border-[#007791] font-medium"
              />
            </div>
          </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center my-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="h-px bg-slate-200 flex-1"></span>
            <span className="px-3">OR</span>
            <span className="h-px bg-slate-200 flex-1"></span>
          </div>

          {/* Fetch GPS Location Card (Matching RentoMojo) */}
          <button
            onClick={handleGpsClick}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-[#007791] hover:bg-cyan-50/40 transition-all text-left group mb-3 shadow-xs"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#007791] flex items-center justify-center shrink-0 shadow-xs">
                <Navigation className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  Fetch my location
                </div>
                <div className="text-[11px] text-slate-500">
                  Automatically detect your nearby healthcare cluster via GPS
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#007791] group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* OR Divider */}
          <div className="flex items-center justify-center my-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="h-px bg-slate-200 flex-1"></span>
            <span className="px-3">OR</span>
            <span className="h-px bg-slate-200 flex-1"></span>
          </div>

          {/* Login for Saved Addresses (Matching RentoMojo) */}
          {!user ? (
            <button
              onClick={() => {
                onClose();
                openAuthModal();
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left group mb-4 shadow-xs"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    Login with Google for saved addresses
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Existing patient? Fetch saved addresses & ongoing rentals instantly
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
            </button>
          ) : null}

          {/* Quick Metro Grid */}
          <div className="pt-2">
            <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-2">
              Popular Cities
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {filteredMetros.map((metro) => {
                const isSelected = selectedCity === metro.name;
                return (
                  <button
                    key={metro.name}
                    onClick={() => handleCityPick(metro.name)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-[#007791] text-white border-[#007791] shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold truncate flex items-center justify-center gap-1">
                      <span>{metro.name}</span>
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
