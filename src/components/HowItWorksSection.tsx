'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowRight 
} from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenGuide?: () => void;
}

export default function HowItWorksSection({ onOpenGuide }: HowItWorksSectionProps) {
  const [activeTab, setActiveTab] = useState<'3lanes' | 'renter' | 'lender' | 'money'>('3lanes');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-100 text-[#007791] text-xs font-black uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Complete Plain-English Guide Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How The Equipment Marketplace Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            One item travels from owner to buyer and back to LIVE in 13 transparent steps across 3 lanes.
            Governed by zero-hidden-fee pricing and RBI-compliant deposit escrow.
          </p>

          {/* Toggle Switches */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-200/80 mt-6 shadow-inner flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('3lanes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === '3lanes'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              The 3 Lanes (13 Master Steps)
            </button>
            <button
              onClick={() => setActiveTab('money')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'money'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              How Money Works (₹5,025 Example)
            </button>
            <button
              onClick={() => setActiveTab('renter')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'renter'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Patient Families (Buyers)
            </button>
            <button
              onClick={() => setActiveTab('lender')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'lender'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Equipment Owners (Listers)
            </button>
          </div>
        </div>

        {/* TAB 1: THE 3 LANES MASTER FLOW */}
        {activeTab === '3lanes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Lane 1: Owner */}
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 pb-2.5 border-b border-amber-100 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <h3 className="font-black text-amber-950 text-sm">Lane 1: Owner (Lister)</h3>
                  </div>
                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-100">
                      <strong className="text-amber-900 block">Step 1. Register + ID Check</strong>
                      <span>Signs up, verifies mobile OTP, uploads Aadhaar & bank details for payout.</span>
                    </div>
                    <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-100">
                      <strong className="text-amber-900 block">Step 2. List Equipment + Price</strong>
                      <span>Submits photos, original purchase invoice, daily price & deposit. Status: PENDING.</span>
                    </div>
                    <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-100">
                      <strong className="text-amber-900 block">Step 8. Hand Over to Courier</strong>
                      <span>Receives order alert, prepares sanitized machine, hands to courier with OTP.</span>
                    </div>
                    <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-100">
                      <strong className="text-amber-900 block">Step 13. Back to LIVE Again</strong>
                      <span>Machine passes inspection & sanitization; ready for next rental cycle!</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lane 2: Admin */}
              <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 pb-2.5 border-b border-sky-100 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                    <h3 className="font-black text-sky-950 text-sm">Lane 2: Admin (Website Operator)</h3>
                  </div>
                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="p-2.5 bg-sky-50/60 rounded-xl border border-sky-100">
                      <strong className="text-sky-900 block">Step 3. Reviews Listing</strong>
                      <span>Inspects purchase invoice authenticity & condition photos for patient safety.</span>
                    </div>
                    <div className="p-2.5 bg-sky-50/60 rounded-xl border border-sky-100">
                      <strong className="text-sky-900 block">Step 4. Approve + Go LIVE</strong>
                      <span>Adds 15% platform commission to owner rate; equipment goes visible to buyers.</span>
                    </div>
                    <div className="p-2.5 bg-sky-50/60 rounded-xl border border-sky-100">
                      <strong className="text-sky-900 block">Step 7. Order Confirmed</strong>
                      <span>Verifies payment webhook, alerts owner & buyer, books delivery courier.</span>
                    </div>
                    <div className="p-2.5 bg-sky-50/60 rounded-xl border border-sky-100">
                      <strong className="text-sky-900 block">Step 11 & 12. Inspection & Payout</strong>
                      <span>Checks returned unit for damage; releases deposit refund & owner bank earnings.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lane 3: Buyer */}
              <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 pb-2.5 border-b border-emerald-100 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <h3 className="font-black text-emerald-950 text-sm">Lane 3: Buyer (Renter)</h3>
                  </div>
                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                      <strong className="text-emerald-900 block">Step 5. Browse + Pick Dates</strong>
                      <span>Selects equipment and duration. Booking engine prevents calendar clashes.</span>
                    </div>
                    <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                      <strong className="text-emerald-900 block">Step 6. Cart, Address & Pay</strong>
                      <span>Enters delivery pincode, uploads prescription if needed, pays via Razorpay.</span>
                    </div>
                    <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                      <strong className="text-emerald-900 block">Step 9. Doorstep Delivery & Care</strong>
                      <span>Equipment delivered by courier; patient recovery runs with return reminder.</span>
                    </div>
                    <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                      <strong className="text-emerald-900 block">Step 10. Return Request</strong>
                      <span>1-click return request when patient recovers. Deposit refunded post-check.</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="text-center pt-2">
              <button
                onClick={onOpenGuide}
                className="px-6 py-3 rounded-xl bg-[#007791] hover:bg-[#005f73] text-white font-bold text-xs shadow-md inline-flex items-center space-x-2 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Full Interactive Plain-English Guide (All 13 Steps & 8 Modules)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: HOW MONEY WORKS */}
        {activeTab === 'money' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-sm sm:text-base">
                  The Plain-English Money Breakdown (Worked 5-Day Example)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Every rupee the buyer pays has a clear destination.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-cyan-100 text-[#007791] rounded-full">
                From Page 8 of Official Guide
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Owner Daily Rate</span>
                <span className="text-base font-black text-slate-900 font-mono mt-0.5 block">₹500</span>
                <span className="text-[10px] text-slate-500">Set by equipment owner</span>
              </div>
              <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                <span className="text-[10px] text-cyan-800 font-bold uppercase block">Platform Commission</span>
                <span className="text-base font-black text-[#007791] font-mono mt-0.5 block">+ ₹75 (15%)</span>
                <span className="text-[10px] text-cyan-700">Added to price</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Buyer Price / Day</span>
                <span className="text-base font-black text-slate-900 font-mono mt-0.5 block">₹575</span>
                <span className="text-[10px] text-slate-500">500 + 75</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-[10px] text-emerald-800 font-bold uppercase block">Rent for 5 Days</span>
                <span className="text-base font-black text-emerald-700 font-mono mt-0.5 block">₹2,875</span>
                <span className="text-[10px] text-emerald-600">575 x 5</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-600">
                <span>Rent for 5 Days:</span>
                <span className="font-mono font-bold text-slate-900">₹2,875</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Refundable Security Deposit (Held safely in Escrow):</span>
                <span className="font-mono font-bold text-slate-900">₹2,000</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Doorstep Courier Delivery Charge:</span>
                <span className="font-mono font-bold text-slate-900">₹150</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center font-black text-sm text-slate-900">
                <span>Total Paid by Buyer at Checkout:</span>
                <span className="font-mono text-base text-[#007791]">₹5,025</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FOR BUYERS */}
        {activeTab === 'renter' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#007791] flex items-center justify-center font-black text-sm mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Choose Equipment & Dates</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Filter by category, city or recovery dates. Every machine has verified photos and working proof video.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#007791] flex items-center justify-center font-black text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Secure Online Payment</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pay rent + refundable deposit online through Razorpay. Server recalculates and confirms instantly.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#007791] flex items-center justify-center font-black text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Doorstep Delivery with OTP</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Courier partner delivers sanitized machine directly to your patient bed. OTP protects handover.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center font-black text-sm mb-4">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">1-Click Return & Refund</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                When patient recovers, request return via Buyer Dashboard. Deposit refunded straight to your UPI or bank.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: FOR LENDERS */}
        {activeTab === 'lender' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-black text-sm mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">List & Upload Invoice</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Submit photos, purchase invoice, and the daily rent you want to earn. Status moves to PENDING.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-black text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Admin Approval (Go LIVE)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Admin verifies machine authenticity, adds 15% platform commission, and marks listing LIVE.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-black text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Courier Handover</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                When a rental order is placed, hand over the sanitized unit to the assigned courier partner.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center font-black text-sm mb-4">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">Direct Bank Payout</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                After return inspection, your earning (daily price x rental days) is transferred to your bank with NEFT UTR.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
