'use client';

import React from 'react';
import { Check, X } from 'lucide-react';

export default function ComparisonMatrix() {
  const rows = [
    {
      feature: 'Capital Commitment',
      buyNew: '₹40,000 – ₹75,000 (100% upfront loss)',
      surgicalShop: 'High hidden fees & inflated non-refundable deposits',
      medOnRent: 'Only ₹4,000 – ₹6,000/month (75% savings)',
      highlight: true,
    },
    {
      feature: 'Security Deposit Protection',
      buyNew: 'N/A (Full purchase)',
      surgicalShop: 'Cash held; 35% dispute or delayed return rate',
      medOnRent: '100% Locked in RBI-compliant Escrow (Auto-refunded)',
      highlight: true,
    },
    {
      feature: 'Hygiene & Sterilization',
      buyNew: 'Brand new, but costly',
      surgicalShop: 'Casual cloth wipe; unknown previous patient history',
      medOnRent: 'Hospital-grade 70% Isopropyl protocol + Mandatory sealed patient consumables',
      highlight: false,
    },
    {
      feature: 'Proof of Working Condition',
      buyNew: 'Manufacturer warranty',
      surgicalShop: 'Untested; buyer discovers issues at home',
      medOnRent: 'Mandatory 5-sec proof video with O2 purity & motor verification before handover',
      highlight: false,
    },
    {
      feature: 'Delivery & Setup Speed',
      buyNew: '24–48 hours',
      surgicalShop: 'Must arrange your own tempo/auto-rickshaw',
      medOnRent: 'Direct 90-minute doorstep dispatch via Porter',
      highlight: true,
    },
    {
      feature: 'Disposal After Patient Recovers',
      buyNew: 'Gathers dust in storeroom; low-ballers on OLX',
      surgicalShop: 'Hassle to return across town',
      medOnRent: '1-Click Reverse Courier pickup right from patient bed',
      highlight: false,
    },
  ];

  return (
    <section className="py-12 mb-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#007791] bg-cyan-100/60 px-3 py-1 rounded-full">
            Unbiased Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2.5 tracking-tight">
            Why Indian Caregivers Choose MedOnRent Over Local Stores
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
            We evaluated the hidden costs and risks of local surgical stores against our escrow-backed community marketplace.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-clinical overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="p-4 sm:p-5 font-bold text-slate-500 uppercase tracking-wider w-1/4">
                    Feature & Safety
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-slate-600 w-1/4">
                    Buying New
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-rose-900 bg-rose-50/40 w-1/4">
                    Local Surgical Rental Shop
                  </th>
                  <th className="p-4 sm:p-5 font-extrabold text-white bg-[#0B192C] w-1/4">
                    <span className="text-cyan-300">MedOnRent</span> P2P Marketplace
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-800">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600">
                      {row.buyNew}
                    </td>
                    <td className="p-4 sm:p-5 text-rose-950 bg-rose-50/20 font-medium">
                      <div className="flex items-start space-x-1.5">
                        <X className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                        <span>{row.surgicalShop}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-900 bg-cyan-50/30 font-bold border-l border-cyan-100">
                      <div className="flex items-start space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{row.medOnRent}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
