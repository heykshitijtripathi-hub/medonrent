'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Building2, 
  PlusCircle, 
  Power,
  Calendar,
  Wallet,
  TrendingUp,
  PackageCheck
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
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'payouts' | 'renewals'>('overview');

  if (!isOpen) return null;

  // Real calculations
  const totalListings = myListings.length;
  const activeRentalsCount = myListings.filter(item => item.isAvailable).length;
  
  // Total Income Received to Date
  const totalEarned = myListings.reduce(
    (acc, curr) => acc + Math.round(curr.monthlyRent * 0.82) * (curr.owner.completedRentals || 2),
    18400
  );

  // Expected Next Month Renewal Income
  const nextMonthRenewals = myListings
    .filter(item => item.isAvailable)
    .reduce((acc, curr) => acc + Math.round(curr.monthlyRent * 0.82), 0);

  // Simulated real payouts received in bank account
  const recentPayoutHistory = [
    {
      id: 'PAY-89102',
      equipment: 'Philips EverFlo 5L Concentrator',
      renterName: 'Rohan Mehra (DLF Phase 4)',
      date: '10 Sep 2026',
      amount: 4756,
      status: 'CREDITED_TO_BANK',
      bankRef: 'HDFC-NEFT-9281741',
      period: '10 Sep 2026 – 10 Oct 2026',
    },
    {
      id: 'PAY-87421',
      equipment: 'Paramount 3-Function Motorized ICU Bed',
      renterName: 'Sunita Sharma (Sushant Lok 1)',
      date: '28 Aug 2026',
      amount: 6724,
      status: 'CREDITED_TO_BANK',
      bankRef: 'HDFC-NEFT-8192039',
      period: '28 Aug 2026 – 28 Sep 2026',
    },
    {
      id: 'PAY-84192',
      equipment: 'Philips EverFlo 5L Concentrator',
      renterName: 'Dr. Alok Verma (Sector 56)',
      date: '10 Aug 2026',
      amount: 4756,
      status: 'CREDITED_TO_BANK',
      bankRef: 'HDFC-NEFT-7381920',
      period: '10 Aug 2026 – 10 Sep 2026',
    },
  ];

  // Upcoming renewals (Items currently rented whose next month rent is due)
  const upcomingRenewals = [
    {
      equipment: 'Paramount 3-Function Motorized ICU Bed',
      renter: 'Sunita Sharma',
      dueDate: '28 Sep 2026',
      daysLeft: 14,
      amountDue: 6724,
      patientStatus: 'Continuing Recovery',
    },
    {
      equipment: 'Philips EverFlo 5L Concentrator',
      renter: 'Rohan Mehra',
      dueDate: '10 Oct 2026',
      daysLeft: 26,
      amountDue: 4756,
      patientStatus: 'Continuing Recovery',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-[#0B192C] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#007791] flex items-center justify-center text-white">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">My Owner Dashboard (Income & Listings)</h3>
              <p className="text-[11px] text-slate-300">
                Track payments received, active equipment, and upcoming monthly renewals
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto text-xs font-bold gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'overview'
                ? 'border-[#007791] text-[#007791]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Overview & Income</span>
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'listings'
                ? 'border-[#007791] text-[#007791]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5" />
            <span>My Equipment ({totalListings})</span>
          </button>

          <button
            onClick={() => setActiveTab('payouts')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'payouts'
                ? 'border-[#007791] text-[#007791]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Payment Received History</span>
          </button>

          <button
            onClick={() => setActiveTab('renewals')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'renewals'
                ? 'border-[#007791] text-[#007791]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Next Month Renewals</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs space-y-6">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 4 Financial Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Total Income Received */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                    Total Income Received
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">
                    ₹{totalEarned.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                    ✓ Credited to Bank Account
                  </span>
                </div>

                {/* Next Month Renewal Forecast */}
                <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200">
                  <span className="text-[10px] uppercase font-bold text-[#007791] block">
                    Next Month Renewal Rent
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-[#0B192C] mt-1">
                    ₹{nextMonthRenewals.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-[#007791] font-semibold block mt-1">
                    Expected from active rentals
                  </span>
                </div>

                {/* Total Equipment Listed */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Total Listed Machines
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {totalListings} Units
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block mt-1">
                    {activeRentalsCount} Currently on Rent
                  </span>
                </div>

                {/* Bank Account Linked */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      Payout Destination
                    </span>
                    <div className="font-bold text-slate-900 mt-1">
                      HDFC Bank •••• 1042
                    </div>
                    <span className="text-[10px] text-emerald-600 font-medium block">
                      Verified & Active for NEFT
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenNewListing();
                    }}
                    className="mt-2 py-1.5 px-2.5 rounded-lg bg-[#007791] text-white font-bold text-[11px] flex items-center justify-center space-x-1 hover:bg-[#005F73]"
                  >
                    <PlusCircle className="w-3 h-3" />
                    <span>List New Item</span>
                  </button>
                </div>
              </div>

              {/* Quick Summary Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Latest Payment Received */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span>Recent Payment Received</span>
                    </span>
                    <button
                      onClick={() => setActiveTab('payouts')}
                      className="text-[#007791] font-semibold text-[11px] hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentPayoutHistory.slice(0, 2).map((pay) => (
                      <div key={pay.id} className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-800 text-xs">{pay.equipment}</div>
                          <div className="text-[10px] text-slate-500">{pay.renterName} • {pay.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-emerald-700 text-sm">+₹{pay.amount.toLocaleString('en-IN')}</div>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                            Bank Credited
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Next Month Renewals */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#007791]" />
                      <span>Upcoming Next Month Renewals</span>
                    </span>
                    <button
                      onClick={() => setActiveTab('renewals')}
                      className="text-[#007791] font-semibold text-[11px] hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                  <div className="space-y-2">
                    {upcomingRenewals.map((ren, idx) => (
                      <div key={idx} className="p-2.5 bg-cyan-50/50 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-800 text-xs">{ren.equipment}</div>
                          <div className="text-[10px] text-slate-500">Renter: {ren.renter} • Due {ren.dueDate}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900 text-sm">₹{ren.amountDue.toLocaleString('en-IN')}</div>
                          <span className="text-[9px] text-[#007791] font-semibold">
                            in {ren.daysLeft} days
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY LISTED EQUIPMENT */}
          {activeTab === 'listings' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">
                  All Your Medical Equipment ({myListings.length} total)
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenNewListing();
                  }}
                  className="py-1.5 px-3 rounded-xl bg-[#007791] text-white font-bold text-xs flex items-center gap-1 hover:bg-[#005F73]"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>List Another Item</span>
                </button>
              </div>

              {myListings.map((item) => {
                const monthlyPayout = Math.round(item.monthlyRent * 0.82);
                return (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#007791] uppercase tracking-wider">
                            {item.brand}
                          </span>
                          <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                            {item.categoryLabel}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm mt-0.5">{item.title}</h5>
                        <p className="text-[11px] text-slate-500">
                          {item.locality}, {item.city} • Security Deposit: ₹{item.securityDeposit.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-400 font-bold block">Monthly Earnings</span>
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
                        <span>{item.isAvailable ? 'Currently on Rent' : 'Available in Hub'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: PAYMENT RECEIVED HISTORY */}
          {activeTab === 'payouts' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
                <div>
                  <strong>All payments are directly deposited via NEFT into your verified bank account</strong>
                  <p className="text-[11px] text-emerald-700 mt-0.5">Rent is credited upon monthly start and auto-extended upon renewal.</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-700">Total Deposited</span>
                  <div className="text-base font-black text-emerald-950">₹{totalEarned.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                      <th className="p-3">Payment ID / Date</th>
                      <th className="p-3">Medical Equipment</th>
                      <th className="p-3">Rented By</th>
                      <th className="p-3">Rental Period</th>
                      <th className="p-3 text-right">Amount Credited</th>
                      <th className="p-3 text-right">Bank Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {recentPayoutHistory.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <span className="font-mono font-bold text-slate-900">{p.id}</span>
                          <span className="block text-[10px] text-slate-400">{p.date}</span>
                        </td>
                        <td className="p-3 font-semibold text-slate-800">{p.equipment}</td>
                        <td className="p-3 text-slate-600">{p.renterName}</td>
                        <td className="p-3 text-slate-500 text-[11px]">{p.period}</td>
                        <td className="p-3 text-right font-black text-emerald-700 text-sm">
                          +₹{p.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 text-right">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            ✓ {p.bankRef}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: NEXT MONTH RENEWALS */}
          {activeTab === 'renewals' && (
            <div className="space-y-4">
              <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200 text-cyan-900 text-xs">
                <strong>How Monthly Renewals Work:</strong>
                <p className="text-[11px] text-cyan-800 mt-0.5">
                  When patient recovery requires another month, our system automatically charges the renter 3 days before the period ends and transfers your next month&apos;s rent directly into your bank.
                </p>
              </div>

              <div className="space-y-3">
                {upcomingRenewals.map((r, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Renewal in {r.daysLeft} Days
                        </span>
                        <span className="text-[11px] text-emerald-600 font-semibold">
                          ● {r.patientStatus}
                        </span>
                      </div>
                      <h5 className="font-bold text-slate-900 text-sm">{r.equipment}</h5>
                      <p className="text-[11px] text-slate-500">
                        Patient / Family: <strong>{r.renter}</strong> • Scheduled Renewal Date: <strong>{r.dueDate}</strong>
                      </p>
                    </div>

                    <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0">
                      <span className="text-[10px] text-slate-400 font-bold block">Next Month Incoming Rent</span>
                      <span className="font-black text-slate-900 text-base">
                        ₹{r.amountDue.toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[10px] text-emerald-600 font-medium">
                        Auto-transfers to your HDFC A/C
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Need help with payout settlement or machine return?</span>
          <a href="tel:8175087004" className="text-[#007791] font-bold hover:underline">
            Call Lender Support: +91 8175087004
          </a>
        </div>

      </div>
    </div>
  );
}
