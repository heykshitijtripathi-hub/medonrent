'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<'renter' | 'lender'>('renter');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#007791] bg-cyan-100/60 px-3 py-1 rounded-full">
            Transparent Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
            How MedOnRent Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Eliminating traditional surgical shop price gouging through peer-to-peer trust and RBI-regulated escrow.
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-200/80 mt-6 shadow-inner">
            <button
              onClick={() => setActiveTab('renter')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'renter'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Patient Families (Renters)
            </button>
            <button
              onClick={() => setActiveTab('lender')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'lender'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Equipment Owners (Lenders)
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        {activeTab === 'renter' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#007791] flex items-center justify-center font-black text-sm mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Choose Your Equipment</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pick the equipment you need, check condition photos and live working video proof, then select your rental duration.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#007791] flex items-center justify-center font-black text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Secure Escrow Booking</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pay your monthly rent and refundable security deposit. Your money stays safely in escrow until you receive and verify the item.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#007791] flex items-center justify-center font-black text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Doorstep Delivery & Setup</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                The sanitized equipment is delivered directly to your home with OTP confirmation. Ready to use immediately.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center font-black text-sm mb-4">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Easy Return & Instant Refund</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                When patient recovers, request a pickup with 1 tap. Your 100% security deposit is refunded straight back to your UPI or bank account.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#007791] flex items-center justify-center font-black text-sm mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">List Idle Medical Gear</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Upload 3 photos and record a 5-sec video showing power-on and working display. Takes less than 2 minutes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#007791] flex items-center justify-center font-black text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Fair Pricing & Full Deposit</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Choose our recommended rental rates or set your own. A security deposit is collected and held in escrow to keep your equipment safe.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#007791] flex items-center justify-center font-black text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Doorstep Pickup via Porter</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                You never need to travel. Porter collects the equipment directly from your home using a secure one-time passcode (OTP).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center font-black text-sm mb-4">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Direct Monthly Earnings</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive rental income directly into your bank account while helping a patient in your city complete their recovery.
              </p>
            </div>
          </div>
        )}

        {/* 3 Pillars of Trust Footer */}
        <div className="mt-12 p-6 rounded-3xl bg-[#0B192C] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-cyan-900/50 text-cyan-300 border border-cyan-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Aadhaar KYC & DigiLocker Intermediary Protection</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every renter and lender passes instant UIDAI government identity verification before any machine is dispatched.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-800/60 flex-shrink-0">
            <CheckCircle2 className="w-4 h-4" />
            <span>Zero Deposit Fraud in 1,240+ Rentals</span>
          </div>
        </div>
      </div>
    </section>
  );
}
