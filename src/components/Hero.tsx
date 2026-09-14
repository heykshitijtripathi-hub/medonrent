'use client';

import React from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  FileText,
  ShieldCheck
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
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0B192C] to-[#0B192C] text-white pt-8 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 w-full">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#007791]/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Trust Pill (Clean & single line on mobile) */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 backdrop-blur-md mb-4 sm:mb-6 max-w-full">
          <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0"></span>
          <span className="truncate">Verified Patient & Doctor Community • {selectedCity}</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-3 sm:mb-4">
            Care in Circulation. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Why Buy When You Can Rent?
            </span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed mb-6 sm:mb-8 max-w-2xl">
            Rent hospital-sanitized oxygen concentrators, motorized ICU beds, and electric wheelchairs directly from verified families nearby. Delivered to your doorstep with 100% deposit protection.
          </p>
        </div>

        {/* Action Buttons: Clean & responsive */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 mb-8">
          <a
            href="#catalog-section"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#007791] to-[#10B981] hover:from-[#005F73] hover:to-[#059669] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>See Available Equipment</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={onOpenPrescription}
            className="px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 font-semibold text-xs sm:text-sm border border-slate-700 backdrop-blur-md flex items-center justify-center space-x-2 transition-all"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Upload Doctor Prescription</span>
          </button>

          <button
            onClick={onOpenListingWizard}
            className="hidden md:flex px-4 py-3 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 font-medium text-xs sm:text-sm border border-slate-700/60 backdrop-blur-md items-center justify-center space-x-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Put Machine on Rent</span>
          </button>
        </div>

        {/* Discharge Notice & Escrow link */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2 sm:gap-3">
          <div className="flex items-center space-x-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#007791] shrink-0" />
            <span>Need urgent setup after hospital discharge? Same-day bedside delivery.</span>
          </div>
          <button
            onClick={onOpenEscrowSimulator}
            className="text-cyan-300 hover:text-white font-semibold flex items-center gap-1 self-end sm:self-auto"
          >
            <span>How Deposit is 100% Safe</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
