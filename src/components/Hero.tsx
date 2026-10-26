'use client';

import React from 'react';
import { 
  Search, 
  ArrowRight, 
  FileText,
  ShieldCheck,
  Sparkles,
  Phone
} from 'lucide-react';

interface HeroProps {
  onOpenListingWizard: () => void;
  onOpenEscrowSimulator: () => void;
  onOpenPrescription: () => void;
  selectedCity: string;
}

export default function Hero({
  onOpenListingWizard,
  onOpenEscrowSimulator,
  onOpenPrescription,
  selectedCity,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0B192C] to-[#0B192C] text-white pt-8 sm:pt-14 pb-12 sm:pb-18 px-4 sm:px-6 lg:px-8 border-b border-slate-800 w-full">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#007791]/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Trust Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 backdrop-blur-md mb-5 sm:mb-7">
          <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0 animate-pulse" />
          <span>Sanitized &amp; Verified Equipment • Same-Day Delivery • {selectedCity}</span>
        </div>

        {/* Headline */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-3 sm:mb-4">
            Medical Equipment on Rent —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Delivered to Your Door
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Rent oxygen concentrators, ICU beds, wheelchairs &amp; more in {selectedCity}. 
            Transparent pricing, hospital-grade sanitization, and 100% refundable deposit — guaranteed.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mb-8">
          <a
            href="#catalog-section"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#007791] to-[#10B981] hover:from-[#005F73] hover:to-[#059669] text-white font-bold text-sm shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Browse Equipment</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={onOpenPrescription}
            className="px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 font-semibold text-sm border border-slate-700 backdrop-blur-md flex items-center justify-center space-x-2 transition-all"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Upload Prescription</span>
          </button>

          <button
            onClick={onOpenListingWizard}
            className="hidden sm:flex px-5 py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 font-medium text-sm border border-slate-700/60 backdrop-blur-md items-center justify-center space-x-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>List Your Equipment</span>
          </button>
        </div>

        {/* Trust Strip */}
        <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-slate-300 text-sm">
            <ShieldCheck className="w-4 h-4 text-[#007791] shrink-0" />
            <span>Zero hidden fees: Rent + 100% Refundable Deposit + Fixed ₹150 Courier Delivery.</span>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
            <button
              onClick={onOpenEscrowSimulator}
              className="text-cyan-300 hover:text-white font-semibold text-sm flex items-center gap-1"
            >
              <span>How deposit is safe</span>
              <span>→</span>
            </button>
            <a
              href="tel:+918175087004"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-white font-semibold text-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { value: '500+', label: 'Equipment Listed' },
            { value: '100%', label: 'Refundable Deposit' },
            { value: '90 Min', label: 'Fastest Delivery' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <div className="text-lg sm:text-2xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
