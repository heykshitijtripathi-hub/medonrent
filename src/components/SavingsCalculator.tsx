'use client';

import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

const PRESETS = [
  { id: 'ox5', name: '5L Oxygen Concentrator', buyPrice: 55000, weeklyRent: 1500, defaultWeeks: 4 },
  { id: 'bed', name: '3-Function Motorized ICU Bed', buyPrice: 48000, weeklyRent: 1300, defaultWeeks: 6 },
  { id: 'bipap', name: 'AutoSet BiPAP / CPAP Machine', buyPrice: 62000, weeklyRent: 1200, defaultWeeks: 4 },
  { id: 'wheel', name: 'Electric Motorized Wheelchair', buyPrice: 38000, weeklyRent: 1200, defaultWeeks: 5 },
];

export default function SavingsCalculator({ onSelectEquipment }: { onSelectEquipment: () => void }) {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [weeks, setWeeks] = useState<number>(PRESETS[0].defaultWeeks);

  const totalRentCost = selectedPreset.weeklyRent * weeks;
  const netSaved = selectedPreset.buyPrice - totalRentCost;
  const savingsPct = Math.round((netSaved / selectedPreset.buyPrice) * 100);

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 shadow-clinical p-6 sm:p-8 mb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-100/70 text-[#007791] text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Caregiver Financial Planner</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              See Exactly How Much Your Family Saves
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Most post-operative recoveries in Indian metros last 3 to 8 weeks. Why sink capital into equipment that gathers dust?
            </p>
          </div>

          <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6">
            <span className="text-xs text-slate-400 font-medium block">Average Family Net Savings:</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">
              ₹{netSaved.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full block w-fit ml-auto mt-0.5 border border-emerald-200">
              {savingsPct}% Trapped Capital Rescued
            </span>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedPreset(preset);
                setWeeks(preset.defaultWeeks);
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedPreset.id === preset.id
                  ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100/70'
              }`}
            >
              <span className={`text-[10px] block uppercase font-bold ${selectedPreset.id === preset.id ? 'text-cyan-300' : 'text-slate-400'}`}>
                Retail MRP: ₹{preset.buyPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold block mt-1 leading-snug truncate">
                {preset.name}
              </span>
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="bg-slate-100/70 rounded-2xl p-5 border border-slate-200/80 mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Estimated Recovery Duration:</span>
            <span className="text-sm font-black text-[#007791] bg-white px-3 py-1 rounded-xl shadow-sm border border-slate-200">
              {weeks} Weeks ({weeks * 7} Days)
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="16"
            step="1"
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
            className="w-full accent-[#007791] h-2 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-2">
            <span>2 Weeks (Minor Post-Op)</span>
            <span>4 Weeks (Standard Fracture/Discharge)</span>
            <span>8 Weeks (Stroke Step-Down)</span>
            <span>16 Weeks (Prolonged Rehab)</span>
          </div>
        </div>

        {/* Comparison Result Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200">
            <span className="text-[10px] uppercase font-bold text-rose-600 block">Option A: Buy Brand New</span>
            <div className="text-lg font-black text-rose-950 mt-1">₹{selectedPreset.buyPrice.toLocaleString('en-IN')}</div>
            <p className="text-rose-700 text-[11px] mt-1">
              Traps ₹{selectedPreset.buyPrice.toLocaleString('en-IN')} capital permanently. Gathers dust in balcony after recovery.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">Option B: Unorganized Rental Store</span>
            <div className="text-lg font-black text-amber-950 mt-1">₹{(totalRentCost * 1.35).toLocaleString('en-IN')} + Unverified Deposit</div>
            <p className="text-amber-800 text-[11px] mt-1">
              Charges 30% higher markups. Unsanitized machines, high cash deposit disputes upon return.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#10B981] text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg">
              Smart Choice
            </div>
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Option C: MedOnRent P2P</span>
            <div className="text-xl font-black text-emerald-950 mt-1">₹{totalRentCost.toLocaleString('en-IN')} Total Cost</div>
            <p className="text-emerald-800 text-[11px] mt-1">
              Includes 100% Escrow-protected refundable deposit, sanitized gear, and doorstep Porter delivery.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onSelectEquipment}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#007791] hover:bg-[#005F73] text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <span>Rent {selectedPreset.name} in Your Locality</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
