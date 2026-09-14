'use client';

import React from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Truck, 
  Lock, 
  Search, 
  HeartHandshake, 
  ArrowRight, 
  TrendingDown,
  FileText
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
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0B192C] to-[#0B192C] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#007791]/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Micro Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs text-slate-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>Asset-Light P2P Medical Marketplace</span>
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs text-cyan-300">
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>Escrow Guarantee: Zero Deposit Risk</span>
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/60 text-xs text-emerald-300">
            <Truck className="w-3 h-3 text-emerald-400" />
            <span>Doorstep Porter Dispatch in {selectedCity}</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-5">
            Care in Circulation. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Why Buy When You Can Rent?
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8">
            Connect directly with verified families holding post-recovery oxygen concentrators, motorized ICU beds, and electric wheelchairs. Save 75% on patient recovery while earning 82% rental income from idle medical gear.
          </p>
        </div>

        {/* Action Buttons & Fast Links */}
        <div className="flex flex-wrap items-center gap-3.5 mb-10">
          <a
            href="#catalog-section"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#007791] to-[#10B981] hover:from-[#005F73] hover:to-[#059669] text-white font-bold text-sm shadow-lg shadow-[#007791]/30 flex items-center space-x-2 transition-all transform active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Browse Available Equipment</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={onOpenPrescription}
            className="px-5 py-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-200 font-bold text-sm border border-cyan-700/60 backdrop-blur-md flex items-center space-x-2 transition-all"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Upload Discharge Slip (Instant Match)</span>
          </button>

          <button
            onClick={onOpenListingWizard}
            className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 font-semibold text-sm border border-slate-700 backdrop-blur-md flex items-center space-x-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>List Idle Machine (Earn 82%)</span>
          </button>
        </div>

        {/* Hospital Discharge Callout */}
        <div className="mb-10 p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium">
              Discharged from <strong className="text-white">Max Healthcare, Medanta, Apollo, or Fortis</strong>?
            </span>
            <span className="text-cyan-300 font-bold hidden md:inline">
              Our concierge coordinates 90-min bedside delivery and installation.
            </span>
          </div>
          <button
            onClick={onOpenEscrowSimulator}
            className="text-cyan-300 hover:text-white underline underline-offset-2 font-semibold flex-shrink-0"
          >
            Learn How Escrow Protects Your Deposit →
          </button>
        </div>

        {/* 4 Trust & Volume Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-800/50 border border-slate-700/80 backdrop-blur-md">
          <div className="border-r border-slate-700/60 pr-3">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">₹48.5L+</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center font-medium">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400 mr-1 flex-shrink-0" />
              Patient Family Savings
            </div>
          </div>
          <div className="border-r border-slate-700/60 pr-3">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">100%</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center font-medium">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 mr-1 flex-shrink-0" />
              Deposit Return Escrow
            </div>
          </div>
          <div className="border-r border-slate-700/60 pr-3">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">1,240+</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center font-medium">
              <HeartHandshake className="w-3.5 h-3.5 text-cyan-400 mr-1 flex-shrink-0" />
              Families Helped
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-300 tracking-tight">&lt; 90 Mins</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center font-medium">
              <Truck className="w-3.5 h-3.5 text-cyan-300 mr-1 flex-shrink-0" />
              Bedside Porter Dispatch
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
