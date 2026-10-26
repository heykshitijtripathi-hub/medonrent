'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Building2, 
  PlusCircle, 
  Power,
  Wallet,
  PackageCheck,
  Clock
} from 'lucide-react';
import { EquipmentItem } from '@/data/initialEquipment';
import { EQUIPMENT_STATUSES } from '@/data/guideData';

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
  const [activeTab, setActiveTab] = useState<'listings' | 'orders' | 'payouts'>('listings');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');

  if (!isOpen) return null;

  // Real calculations based on Guide formula:
  // Owner earning = owner daily rate x rental days
  const totalEarningsReceived = 18400; // Simulated historical payout
  const pendingPayouts = myListings
    .filter(item => item.status === 'Booked' || item.status === 'Under inspection')
    .reduce((acc, curr) => acc + (curr.ownerPricePerDay * 5), 4500);

  // Simulated Bank Payout History (Guide Page 4 & 8)
  const payoutLedger = [
    {
      id: 'PAY-89102',
      equipment: 'Philips EverFlo 5L Medical Oxygen Concentrator',
      renterName: 'Rohan Mehra (DLF Phase 4)',
      period: '10 Sep 2026 – 20 Sep 2026 (10 Days)',
      ownerDailyRate: 500,
      totalOwnerEarning: 5000,
      status: 'CREDITED_TO_BANK',
      bankRef: 'HDFC-NEFT-9281741',
      creditDate: '21 Sep 2026 (Post-Inspection Clearance)',
    },
    {
      id: 'PAY-87421',
      equipment: 'Paramount 3-Function Motorized ICU Hospital Bed',
      renterName: 'Sunita Sharma (Sushant Lok 1)',
      period: '15 Aug 2026 – 30 Aug 2026 (15 Days)',
      ownerDailyRate: 450,
      totalOwnerEarning: 6750,
      status: 'CREDITED_TO_BANK',
      bankRef: 'HDFC-NEFT-8192039',
      creditDate: '01 Sep 2026 (Post-Inspection Clearance)',
    },
  ];

  const filteredListings = selectedStatusFilter === 'ALL'
    ? myListings
    : myListings.filter(item => item.status === selectedStatusFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-950 via-slate-900 to-[#0B192C] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Owner Dashboard (Guide Section 3 & 4)
                </span>
                <span className="text-[11px] text-slate-300">Lister Portal</span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                My Equipment, Approval Status & Earnings
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onClose();
                onOpenNewListing();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs flex items-center space-x-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ List New Equipment</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Financial KPI Summary Cards (From Guide Page 4) */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Total Earnings Received</span>
              <Wallet className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1">
              ₹{totalEarningsReceived.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              Transferred directly to HDFC Bank A/c
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Pending Return & Inspection</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-700 font-mono mt-1">
              ₹{pendingPayouts.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-500">
              Released immediately upon admin inspection
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Total Equipment Listed</span>
              <PackageCheck className="w-4 h-4 text-[#007791]" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1">
              {myListings.length} Units
            </div>
            <span className="text-[11px] text-slate-500">
              {myListings.filter(i => i.status === 'Live').length} LIVE on marketplace
            </span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="px-6 bg-white border-b border-slate-200 flex items-center justify-between py-2 text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'listings'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              My Equipment & Statuses ({myListings.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Orders Received & Courier Handover
            </button>
            <button
              onClick={() => setActiveTab('payouts')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'payouts'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Bank Payout Ledger (UTR Logs)
            </button>
          </div>

          {activeTab === 'listings' && (
            <div className="hidden sm:flex items-center space-x-1.5 text-xs">
              <span className="text-slate-400 font-medium">Filter status:</span>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-bold text-slate-700"
              >
                <option value="ALL">All Statuses</option>
                <option value="Live">Live</option>
                <option value="Pending approval">Pending Approval</option>
                <option value="Changes requested">Changes Requested</option>
                <option value="Rejected">Rejected</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs space-y-4">
          
          {/* TAB 1: EQUIPMENT LISTINGS WITH 10 OFFICIAL STATUSES */}
          {activeTab === 'listings' && (
            <div className="space-y-3">
              {filteredListings.map((item) => {
                const statusMeta = EQUIPMENT_STATUSES.find(s => s.status === item.status) || {
                  badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
                };

                return (
                  <div
                    key={item.id}
                    className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusMeta.badgeColor}`}>
                            Status: {item.status}
                          </span>
                          <span className="text-[10px] text-slate-400">ID: {item.id}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mt-0.5">{item.title}</h4>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                          <span>Owner Daily: <strong className="text-amber-700 font-mono">₹{item.ownerPricePerDay}/day</strong></span>
                          <span>•</span>
                          <span>Deposit: ₹{item.securityDeposit}</span>
                          <span>•</span>
                          <span>Purchase Invoice: {item.purchaseInvoiceVerified ? '✓ Verified' : 'Pending Review'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {/* Rejection / Changes notice if any */}
                      {item.rejectionReason && (
                        <div className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-[11px]">
                          Reason: {item.rejectionReason}
                        </div>
                      )}

                      {/* Pause / Resume action (Guide Page 4) */}
                      {item.status !== 'Booked' && (
                        <button
                          onClick={() => onToggleListingStatus(item.id)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1 ${
                            item.status === 'Live'
                              ? 'border-slate-200 text-slate-700 hover:bg-slate-100'
                              : 'border-emerald-300 bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          <Power className="w-3 h-3" />
                          <span>{item.status === 'Live' ? 'Pause Listing' : 'Make Live'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: ORDERS RECEIVED */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-3">
                <PackageCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-xs">Step 8: Owner Hands Over to Courier</h4>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    When an order arrives, prepare the equipment with hygiene cover and hand it to the assigned courier partner. Verify driver pickup OTP.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900">Active Order #MOR-2026-8921</span>
                    <span className="text-[11px] text-slate-500 block">Renter: Smt. Kamla Verma (DLF Phase 2)</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Status: ACTIVE_CARE (Day 12 of 30)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Equipment:</span>
                    <span className="font-semibold text-slate-800">Philips EverFlo 5L Concentrator</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Your Rate:</span>
                    <span className="font-mono font-bold text-amber-700">₹500 / day</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Expected Earning:</span>
                    <span className="font-mono font-bold text-emerald-700">₹15,000 (30 Days)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PAYOUTS */}
          {activeTab === 'payouts' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-700 grid grid-cols-12">
                  <div className="col-span-4">Equipment & Period</div>
                  <div className="col-span-3">Renter</div>
                  <div className="col-span-2">Payout Amount</div>
                  <div className="col-span-3 text-right">Bank UTR Reference</div>
                </div>
                <div className="divide-y divide-slate-100 text-xs bg-white">
                  {payoutLedger.map((p) => (
                    <div key={p.id} className="px-4 py-3 grid grid-cols-12 items-center">
                      <div className="col-span-4">
                        <span className="font-bold text-slate-800 block truncate">{p.equipment}</span>
                        <span className="text-[10px] text-slate-400">{p.period}</span>
                      </div>
                      <div className="col-span-3 text-slate-600 truncate">{p.renterName}</div>
                      <div className="col-span-2 font-mono font-black text-emerald-700">₹{p.totalOwnerEarning}</div>
                      <div className="col-span-3 text-right">
                        <span className="font-mono text-[11px] font-bold text-slate-800 block">{p.bankRef}</span>
                        <span className="text-[10px] text-emerald-600">{p.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
