'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Video, 
  Play, 
  Pause, 
  CheckCircle2,
  ArrowRight,
  FileText,
  Truck
} from 'lucide-react';
import { EquipmentItem } from '@/data/initialEquipment';

interface ProductDetailModalProps {
  item: EquipmentItem | null;
  onClose: () => void;
  onProceedToCheckout: (item: EquipmentItem, tenureDays: number) => void;
}

export default function ProductDetailModal({
  item,
  onClose,
  onProceedToCheckout,
}: ProductDetailModalProps) {
  // Guide default is 5-day rental worked example (Page 8)
  const [tenureDays, setTenureDays] = useState<number>(5);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);

  if (!item) return null;

  // Pricing from Guide:
  const ownerDaily = item.ownerPricePerDay || Math.round(item.monthlyRent / 30 * 0.85);
  const commissionPct = item.commissionPercent || 15;
  const commissionDaily = Math.round(ownerDaily * (commissionPct / 100));
  const buyerDaily = item.dailyRent || (ownerDaily + commissionDaily);

  const calculatedRent = buyerDaily * tenureDays;
  const refundableDeposit = item.securityDeposit || 2000;
  const deliveryFee = 150; // Standard courier fee from Guide Page 8
  const totalDueNow = calculatedRent + refundableDeposit + deliveryFee;

  // Video playback simulation
  const toggleVideo = () => {
    if (!isPlayingVideo) {
      setIsPlayingVideo(true);
      let p = 0;
      const interval = setInterval(() => {
        p += 20;
        setVideoProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setIsPlayingVideo(false);
          setVideoProgress(0);
        }
      }, 1000);
    } else {
      setIsPlayingVideo(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[96vh] sm:max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] inline-block"></span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 truncate max-w-[240px] sm:max-w-none">
              Plain-English Guide Verified • Doorstep Courier Handover
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Left Column: Visuals & Proof Video & Specs (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Visual Media with 5-sec proof video overlay */}
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 group">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover opacity-90"
              />

              {/* Video Player Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 flex flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-cyan-300 text-xs font-semibold border border-cyan-500/30">
                    <Video className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Lender Pre-Handover Proof Video</span>
                  </div>
                  <span className="text-[10px] text-white/80 bg-black/50 px-2 py-0.5 rounded">
                    Recorded by Owner
                  </span>
                </div>

                {/* Play Button */}
                <div className="text-center my-auto">
                  <button
                    onClick={toggleVideo}
                    className="w-14 h-14 rounded-full bg-[#007791]/90 hover:bg-[#005F73] text-white flex items-center justify-center mx-auto shadow-xl transform active:scale-95 transition-all ring-4 ring-white/20"
                  >
                    {isPlayingVideo ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </button>
                  <p className="text-xs text-white/90 font-medium mt-2 drop-shadow">
                    {isPlayingVideo
                      ? `Testing motor sound & LCD display... (${videoProgress}%)`
                      : 'Play 5-second working condition test video'}
                  </p>
                  {isPlayingVideo && (
                    <div className="w-48 h-1 bg-white/20 rounded-full mx-auto mt-2 overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 transition-all duration-1000"
                        style={{ width: `${videoProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-emerald-300 font-medium bg-emerald-950/80 backdrop-blur-md p-2 rounded-xl border border-emerald-500/30">
                  <span className="flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    Verified Working Parameter Check • 0 Fault Codes
                  </span>
                  <span className="text-slate-300">Clean</span>
                </div>
              </div>
            </div>

            {/* Title & Brand */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-[#007791] uppercase tracking-wider mb-1">
                <span>{item.brand}</span>
                <span>•</span>
                <span>{item.categoryLabel}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {item.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Guide Trust & Safety Verification Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#007791] shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">Purchase Invoice</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">✓ Admin Verified</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">Hygiene Sanitization</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">✓ Hospital Grade Certified</span>
                </div>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Technical Specifications & Performance
              </h3>
              <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden text-xs">
                {Object.entries(item.specs).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between p-2.5 bg-white hover:bg-slate-50">
                    <span className="text-slate-500 font-medium">{key}</span>
                    <span className="font-bold text-slate-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Trust Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#0B192C] text-cyan-300 font-black text-sm flex items-center justify-center">
                  {item.owner.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span>{item.owner.name}</span>
                    {item.owner.isAadhaarVerified && (
                      <span className="bg-[#10B981]/15 text-[#059669] text-[10px] font-bold px-1.5 py-0.5 rounded inline-flex items-center">
                        <ShieldCheck className="w-3 h-3 mr-0.5" />
                        ID Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.owner.roleDesc} • {item.locality}</p>
                </div>
              </div>
              <div className="text-right text-xs">
                <div className="font-bold text-slate-800">{item.owner.rating} ★ Rating</div>
                <div className="text-[11px] text-slate-500">Responds in {item.owner.responseTime}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Guide-Aligned Price Calculator & Checkout (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50/70 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Rental Duration
                </span>
                <span className="text-xs font-black text-[#007791]">
                  ₹{buyerDaily} / day
                </span>
              </div>

              {/* Duration Tabs (Including Guide's 5-Day Worked Example) */}
              <div className="mb-4">
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { days: 5, label: '5 Days', tag: 'Guide' },
                    { days: 10, label: '10 Days', tag: '' },
                    { days: 15, label: '15 Days', tag: '' },
                    { days: 30, label: '30 Days', tag: 'Best Rate' },
                  ].map((plan) => (
                    <button
                      key={plan.days}
                      onClick={() => setTenureDays(plan.days)}
                      className={`py-2 px-1 rounded-xl text-xs text-center border transition-all relative ${
                        tenureDays === plan.days
                          ? 'bg-[#007791] text-white border-[#007791] font-bold shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                      }`}
                    >
                      <div>{plan.label}</div>
                      {plan.tag && (
                        <div
                          className={`text-[9px] font-bold block ${
                            tenureDays === plan.days ? 'text-cyan-200' : 'text-[#007791]'
                          }`}
                        >
                          {plan.tag}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown (Exact Guide Page 8 Table) */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-2.5 text-xs mb-5">
                <div className="text-[10px] font-bold uppercase text-slate-400 pb-1 border-b border-slate-100 flex justify-between">
                  <span>Plain-English Split</span>
                  <span>Owner ₹{ownerDaily} + Admin 15% ₹{commissionDaily}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Rent ({tenureDays} days @ ₹{buyerDaily}/day):</span>
                  <span className="font-bold text-slate-900 font-mono">₹{calculatedRent}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                    Refundable Security Deposit:
                  </span>
                  <span className="font-bold text-emerald-700 font-mono">₹{refundableDeposit}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center">
                    <Truck className="w-3.5 h-3.5 text-slate-400 mr-1" />
                    Doorstep Courier Delivery Fee:
                  </span>
                  <span className="font-bold text-slate-900 font-mono">₹{deliveryFee}</span>
                </div>

                <div className="pt-2.5 border-t border-slate-200 flex items-baseline justify-between">
                  <div>
                    <span className="font-black text-sm text-slate-900">Total Payable:</span>
                    <span className="block text-[10px] text-emerald-600 font-semibold">
                      (Includes ₹{refundableDeposit} 100% refundable deposit)
                    </span>
                  </div>
                  <span className="text-lg font-black text-slate-900 font-mono">
                    ₹{totalDueNow}
                  </span>
                </div>
              </div>

              {/* Plain-English Escrow Safeguards */}
              <div className="p-3 rounded-xl bg-slate-100 text-[11px] text-slate-600 space-y-1.5 mb-5 border border-slate-200/80">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Plain-English Escrow Safeguards</span>
                </div>
                <div className="text-[10px] text-slate-600">
                  • Deposit refunded immediately following return inspection.<br />
                  • Owner payout released once return clearance is confirmed.<br />
                  • Strict calendar lock prevents double booking.
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => onProceedToCheckout(item, tenureDays)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#007791] to-[#10B981] hover:from-[#005F73] hover:to-[#059669] text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
              >
                <span>Book for {tenureDays} Days (₹{totalDueNow})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
