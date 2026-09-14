'use client';

import React from 'react';
import Image from 'next/image';
import { 
  X, 
  Building2, 
  PlusCircle, 
  Power 
} from 'lucide-react';
import { EquipmentItem } from '@/data/initialEquipment';

interface LenderHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  myListings: EquipmentItem[];
  onToggleListingStatus: (id: string) => void;
  onOpenNewListing: () => void;
}

export default function LenderHubModal({
  isOpen,
  onClose,
  myListings,
  onToggleListingStatus,
  onOpenNewListing,
}: LenderHubModalProps) {
  if (!isOpen) return null;

  // Compute stats
  const totalEarned = myListings.reduce(
    (acc, curr) => acc + Math.round(curr.monthlyRent * 0.82) * (curr.owner.completedRentals || 1),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B192C] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Lender Portal & Passive Earnings Hub</h3>
              <p className="text-[11px] text-slate-300">
                Monetize your family&apos;s idle medical equipment with guaranteed 82% monthly payouts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-xs space-y-6">
          {/* Earnings Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Total Payouts Credited</span>
              <div className="text-2xl font-black text-emerald-950 mt-1">
                ₹{totalEarned.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                82% Direct NEFT to Bank
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200">
              <span className="text-[10px] uppercase font-bold text-[#007791] block">Active Listings</span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {myListings.length} Units
              </div>
              <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                Protected by 100% Escrow Deposits
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Expand Inventory</span>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewListing();
                }}
                className="mt-2 py-2 px-3 rounded-xl bg-[#007791] text-white font-bold flex items-center justify-center space-x-1 hover:bg-[#005F73] transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>List Another Device</span>
              </button>
            </div>
          </div>

          {/* Listings List */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3">Your Listed Medical Equipment</h4>
            <div className="space-y-3">
              {myListings.map((item) => {
                const monthlyPayout = Math.round(item.monthlyRent * 0.82);
                return (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#007791] uppercase tracking-wider block">
                          {item.brand} • {item.categoryLabel}
                        </span>
                        <h5 className="font-bold text-slate-900 text-sm">{item.title}</h5>
                        <p className="text-[11px] text-slate-500">
                          {item.locality}, {item.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold block">Your Monthly Payout (82%)</span>
                        <span className="font-black text-slate-900 text-sm">
                          ₹{monthlyPayout.toLocaleString('en-IN')} / mo
                        </span>
                      </div>

                      <button
                        onClick={() => onToggleListingStatus(item.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-colors ${
                          item.isAvailable
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-slate-200 text-slate-600 border-slate-300'
                        }`}
                      >
                        <Power className="w-3 h-3" />
                        <span>{item.isAvailable ? 'Available' : 'Paused'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
