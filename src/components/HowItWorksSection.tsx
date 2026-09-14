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
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Find Nearby Machine</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Filter verified equipment within 2–10 km in your metro. Review the 5-sec proof video and hospital disinfection badge.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#007791] flex items-center justify-center font-black text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Pay with Escrow Lock</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your rent and security deposit are securely locked in an RBI-compliant escrow account. Funds are never released until handover.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#007791] flex items-center justify-center font-black text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Doorstep Porter Delivery</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Porter collects the sanitized gear directly from the owner with secure OTP verification and delivers straight to patient bedside.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center font-black text-sm mb-4">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Instant Deposit Refund</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Upon patient recovery, reverse courier returns the gear. 100% of your deposit is refunded directly to your UPI account in seconds.
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
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Smart Rent & Deposit</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our algorithm sets optimal rental yield and locks 18–25% equipment replacement deposit so your asset is 100% insured.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#007791] flex items-center justify-center font-black text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Zero-Hassle Pickup</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                You never leave your home. Porter picks up the sanitized machine from your doorstep using a secure one-time passcode.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center font-black text-sm mb-4">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">82% Automated Payout</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Earn ₹4,000–₹8,000/month in passive income. Payout is wired directly to your verified bank account via automated gateway split.
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
