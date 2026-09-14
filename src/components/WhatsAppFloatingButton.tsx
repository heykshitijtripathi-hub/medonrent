'use client';

import React, { useState } from 'react';
import { X, PhoneCall } from 'lucide-react';

export default function WhatsAppFloatingButton({ onOpenPrescription }: { onOpenPrescription: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-2 sm:mb-3 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-[#075E54] text-white p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-500 flex items-center justify-center font-black text-white text-xs sm:text-sm shadow-inner">
                +
              </div>
              <div>
                <h4 className="font-bold text-xs">MedOnRent Clinical Concierge</h4>
                <p className="text-[10px] text-emerald-200">Online • Replies in &lt; 2 mins</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 sm:p-4 bg-[#E5DDD5]/30 space-y-2 text-xs">
            <div className="bg-white p-2.5 sm:p-3 rounded-2xl rounded-tl-none shadow-sm text-slate-800 space-y-1">
              <p className="font-semibold text-slate-900 text-xs">
                Namaste! Need urgent medical equipment delivered today?
              </p>
              <p className="text-[11px] text-slate-600">
                Tell us what your doctor prescribed or tap below to upload your discharge summary:
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenPrescription();
                }}
                className="w-full text-left p-2 sm:p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 font-semibold text-xs text-[#007791] flex items-center justify-between transition-colors"
              >
                <span>📄 Upload Discharge Prescription</span>
                <span className="text-[10px] text-slate-400">→</span>
              </button>
              <a
                href="https://wa.me/919810123456?text=Hi%20MedOnRent,%20I%20urgently%20need%20medical%20equipment%20on%20rent"
                target="_blank"
                rel="noreferrer"
                className="w-full text-left p-2 sm:p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-between transition-colors shadow-sm"
              >
                <span>💬 Chat on WhatsApp</span>
                <span className="text-white text-xs">→</span>
              </a>
              <a
                href="tel:18001209988"
                className="w-full text-left p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1">
                  <PhoneCall className="w-3 h-3 text-[#007791]" />
                  <span>Call Toll-Free: 1800-120-RENT</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl shadow-emerald-500/25 transition-all transform hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-white"></span>
        </span>
        <span className="text-[11px] sm:text-xs font-black tracking-wide">
          WhatsApp Help
        </span>
      </button>
    </div>
  );
}
