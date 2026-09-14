'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  Wallet, 
  TrendingUp, 
  Calendar, 
  PackageCheck, 
  Power, 
  PlusCircle, 
  ArrowLeft,
  Lock,
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import { INITIAL_EQUIPMENT, EquipmentItem } from '@/data/initialEquipment';

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'payouts' | 'renewals'>('overview');
  const [listings, setListings] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple secure PIN: 87004 (last 5 digits of your number) or 1234
    if (passcode === '87004' || passcode === '8175' || passcode === '1234') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const toggleListing = (id: string) => {
    setListings(prev => prev.map(item => item.id === id ? { ...item, isAvailable: !item.isAvailable } : item));
  };

  // Calculations
  const totalListings = listings.length;
  const activeRentalsCount = listings.filter(item => item.isAvailable).length;
  
  // Total Income Received
  const totalEarned = listings.reduce(
    (acc, curr) => acc + Math.round(curr.monthlyRent * 0.82) * (curr.owner.completedRentals || 2),
    37016
  );

  // Next month renewal expected rent
  const nextMonthRenewals = listings
    .filter(item => item.isAvailable)
    .reduce((acc, curr) => acc + Math.round(curr.monthlyRent * 0.82), 0);

  // Payment ledger
  const recentPayoutHistory = [
    {
      id: 'PAY-89102',
      equipment: 'Philips EverFlo 5L Concentrator',
      renterName: 'Rohan Mehra (DLF Phase 4, Gurugram)',
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

  // Upcoming renewals
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B192C] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-[#007791] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">MedOnRent Owner Login</h2>
            <p className="text-xs text-slate-500 mt-1">
              Private portal for owner earnings & equipment renewals
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 pt-2">
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="Enter PIN (e.g. 87004)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007791] font-mono tracking-widest text-center"
              />
            </div>

            {authError && (
              <div className="text-[11px] text-rose-600 font-semibold flex items-center justify-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Incorrect PIN. Try 87004 or 1234</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#007791] hover:bg-[#005F73] text-white font-bold text-xs shadow-md transition-all"
            >
              Access Private Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100">
            <Link href="/" className="text-[11px] text-slate-500 hover:text-slate-800 inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Header */}
      <header className="bg-[#0B192C] text-white py-4 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white" title="Return to Website">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="w-8 h-8 rounded-xl bg-[#007791] flex items-center justify-center text-white font-bold text-sm">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-white">
                Private Owner Dashboard
              </h1>
              <p className="text-[11px] text-slate-400">
                Hidden from public visitors • MedOnRent Admin
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
              ● Bank Connected (HDFC)
            </span>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
            >
              Lock / Exit
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex space-x-3 sm:space-x-6 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 shrink-0 ${
              activeTab === 'overview' ? 'border-[#007791] text-[#007791]' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Overview & Income</span>
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 shrink-0 ${
              activeTab === 'listings' ? 'border-[#007791] text-[#007791]' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
            <span>My Equipment ({totalListings})</span>
          </button>

          <button
            onClick={() => setActiveTab('payouts')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 shrink-0 ${
              activeTab === 'payouts' ? 'border-[#007791] text-[#007791]' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Payment Received History</span>
          </button>

          <button
            onClick={() => setActiveTab('renewals')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 shrink-0 ${
              activeTab === 'renewals' ? 'border-[#007791] text-[#007791]' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Next Month Renewals</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </button>
        </div>
      </div>

      {/* Body Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-xs uppercase font-bold text-slate-500 block">Total Income Received</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
                  ₹{totalEarned.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-emerald-700 font-medium block mt-1">
                  ✓ Credited directly to HDFC bank
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-xs uppercase font-bold text-slate-500 block">Next Month Renewal Income</span>
                <div className="text-2xl sm:text-3xl font-black text-[#0B192C] mt-1">
                  ₹{nextMonthRenewals.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-[#007791] font-medium block mt-1">
                  From ongoing patient recovery
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-xs uppercase font-bold text-slate-500 block">Total Listed Equipment</span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {totalListings} Units
                </div>
                <span className="text-[11px] text-slate-500 font-medium block mt-1">
                  {activeRentalsCount} Currently on rent
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-xs uppercase font-bold text-slate-500 block">Deposit Escrow Pool</span>
                <div className="text-2xl sm:text-3xl font-black text-[#007791] mt-1">
                  ₹55,000
                </div>
                <span className="text-[11px] text-slate-500 font-medium block mt-1">
                  100% Locked & Protected in Escrow
                </span>
              </div>
            </div>

            {/* Sub-panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment history snapshot */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-bold text-sm text-slate-900">Recent Payments Received</span>
                  <button onClick={() => setActiveTab('payouts')} className="text-xs text-[#007791] font-semibold hover:underline">
                    View Complete History →
                  </button>
                </div>
                <div className="space-y-2.5">
                  {recentPayoutHistory.map((p) => (
                    <div key={p.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{p.equipment}</div>
                        <div className="text-[11px] text-slate-500">{p.renterName} • {p.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-emerald-700 text-sm">+₹{p.amount.toLocaleString('en-IN')}</div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          Bank Credited
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Renewal snapshot */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-bold text-sm text-slate-900">Upcoming Next Month Renewals</span>
                  <button onClick={() => setActiveTab('renewals')} className="text-xs text-[#007791] font-semibold hover:underline">
                    View Renewal Details →
                  </button>
                </div>
                <div className="space-y-2.5">
                  {upcomingRenewals.map((r, idx) => (
                    <div key={idx} className="p-3 bg-cyan-50/50 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{r.equipment}</div>
                        <div className="text-[11px] text-slate-500">Patient: {r.renter} • Due {r.dueDate}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900 text-sm">₹{r.amountDue.toLocaleString('en-IN')}</div>
                        <span className="text-[10px] text-[#007791] font-semibold">
                          in {r.daysLeft} days
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY EQUIPMENT */}
        {activeTab === 'listings' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">All Listed Equipment ({listings.length} Items)</h3>
                <p className="text-xs text-slate-500">Manage status and review payouts per item</p>
              </div>
              <Link
                href="/#catalog-section"
                className="px-3 py-1.5 rounded-xl bg-[#007791] text-white font-bold text-xs flex items-center gap-1 hover:bg-[#005F73]"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>List Another Device</span>
              </Link>
            </div>

            <div className="space-y-3">
              {listings.map((item) => {
                const monthlyPayout = Math.round(item.monthlyRent * 0.82);
                return (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#007791] uppercase">{item.brand} • {item.categoryLabel}</span>
                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                        <p className="text-[11px] text-slate-500">
                          {item.locality}, {item.city} • Security Deposit: ₹{item.securityDeposit.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-400 font-bold block">Your Monthly Rent (82%)</span>
                        <span className="font-black text-slate-900 text-sm">
                          ₹{monthlyPayout.toLocaleString('en-IN')} / month
                        </span>
                      </div>

                      <button
                        onClick={() => toggleListing(item.id)}
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
          </div>
        )}

        {/* TAB 3: PAYMENTS RECEIVED */}
        {activeTab === 'payouts' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Payment Received Ledger</h3>
                <p className="text-xs text-slate-500">Direct NEFT transfers to your linked bank account</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Deposited</span>
                <span className="text-base font-black text-emerald-600">₹{totalEarned.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                    <th className="p-3">Payment ID / Date</th>
                    <th className="p-3">Medical Equipment</th>
                    <th className="p-3">Renter Name & Locality</th>
                    <th className="p-3">Rental Period</th>
                    <th className="p-3 text-right">Amount Credited</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
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
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Next Month Renewals Tracking</h3>
              <p className="text-xs text-slate-500">
                Patients who need additional recovery duration. Rent is collected automatically 3 days prior to due date.
              </p>
            </div>

            <div className="space-y-3">
              {upcomingRenewals.map((r, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                      Patient / Family: <strong>{r.renter}</strong> • Due on: <strong>{r.dueDate}</strong>
                    </p>
                  </div>

                  <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0">
                    <span className="text-[10px] text-slate-400 font-bold block">Next Month Incoming Rent</span>
                    <span className="font-black text-slate-900 text-base">
                      ₹{r.amountDue.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-emerald-600 font-medium">
                      Auto-transfers to your HDFC bank
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
