'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How do you guarantee equipment is sanitized and safe from previous patient infections?',
    a: 'Every listing on MedOnRent undergoes a 3-tier hospital protocol: 1) Hard non-porous chassis are disinfected with 70% Isopropyl Alcohol + Benzalkonium Chloride. 2) Direct-contact consumables (oxygen nasal cannula, CPAP face masks, humidification chambers, and bedsheets) are strictly forbidden from reuse and provided brand-new in sealed OEM medical blisters for ₹199. 3) Lenders upload verifiable batch sterilization logs before releasing items.',
  },
  {
    q: 'What happens if our oxygen concentrator or BiPAP machine develops a fault at 2:00 AM?',
    a: 'Critical respiratory equipment is backed by our 24/7 Emergency Swap Guarantee. If a machine displays any error buzzer or pressure drop during night hours, our nearest rapid-response fleet swaps the machine at your doorstep within 90 minutes anywhere in Delhi NCR, Mumbai, or Bengaluru. Our patient emergency line is monitored 24x7.',
  },
  {
    q: 'How is my security deposit protected against unfair damage deductions by the owner?',
    a: 'Unlike unorganized surgical dealers who hold your cash, deposits on MedOnRent are held in an RBI-licensed digital Escrow Nodal Account (Cashfree/Razorpay Route). The owner never has direct access to your deposit. Furthermore, both parties record a mandatory 5-second video showing cosmetic condition and working LED display before handover and upon return. 100% of your deposit is refunded automatically once the return video is confirmed.',
  },
  {
    q: 'Can we extend the rental if the doctor recommends 4 more weeks of home recovery?',
    a: 'Yes! Approximately 40% of patient families extend their rentals. You can extend by 15, 30, or 60 days with a single tap in your dashboard at discounted pro-rata rates. The equipment remains at your bedside with zero interruption or re-deposits required.',
  },
  {
    q: 'How does doorstep delivery work for heavy items like motorized hospital beds?',
    a: 'We partner directly with Porter for 2-tier logistics: Standard portable items (oxygen units, CPAP, manual wheelchairs) are transported via dedicated 2-wheelers or minis within 90 minutes. Heavy motorized ICU beds are fulfilled via customized mini-tempos with two-person handling assistance to deliver and position the bed directly in the patient room.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-12 mb-16 bg-white rounded-3xl border border-slate-200 shadow-clinical p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#007791] bg-cyan-100/60 px-3 py-1 rounded-full">
            Patient Family Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2.5 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
            Clear, transparent answers to help your family make informed decisions during recovery.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 py-2 font-bold text-slate-900 text-sm sm:text-base hover:text-[#007791] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-[#007791] font-mono">0{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#007791]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 pr-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
