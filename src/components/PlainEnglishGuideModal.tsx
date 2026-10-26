'use client';

import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  Settings, 
  Calculator, 
  AlertTriangle, 
  RotateCcw, 
  Layers, 
  Lock
} from 'lucide-react';
import { 
  GUIDE_MASTER_FLOW, 
  ADMIN_MODULES, 
  EQUIPMENT_STATUSES, 
  ORDER_STATUSES, 
  SAFETY_RISKS,
  GuideStep 
} from '@/data/guideData';

interface PlainEnglishGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOwnerDashboard?: () => void;
  onOpenBuyerDashboard?: () => void;
  onOpenAdminDashboard?: () => void;
}

export default function PlainEnglishGuideModal({
  isOpen,
  onClose,
  onOpenOwnerDashboard,
  onOpenBuyerDashboard,
  onOpenAdminDashboard,
}: PlainEnglishGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'masterFlow' | 'roles' | 'money' | 'admin' | 'statuses' | 'safety'>('masterFlow');
  const [selectedStep, setSelectedStep] = useState<GuideStep>(GUIDE_MASTER_FLOW[0]);

  // Interactive Money Flow Calculator State (Initialized with PDF example)
  const [simOwnerDaily, setSimOwnerDaily] = useState<number>(500);
  const [simDays, setSimDays] = useState<number>(5);
  const [simCommissionPct, setSimCommissionPct] = useState<number>(15);
  const simDeposit = 2000;
  const simDelivery = 150;

  if (!isOpen) return null;

  // Real-time calculations for calculator
  const calcCommissionDaily = Math.round(simOwnerDaily * (simCommissionPct / 100));
  const calcBuyerDaily = simOwnerDaily + calcCommissionDaily;
  const calcTotalRent = calcBuyerDaily * simDays;
  const calcTotalBuyerPays = calcTotalRent + simDeposit + simDelivery;
  const calcOwnerShare = simOwnerDaily * simDays;
  const calcAdminCommission = calcCommissionDaily * simDays;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Modal Top Banner */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#0B192C] via-[#0E2A47] to-[#007791] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-cyan-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
                  Official Blueprint
                </span>
                <span className="text-[11px] text-slate-300">Oct 25, 2026 • @Aaditya</span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
                Medical Equipment Rental Marketplace: Complete Plain-English Guide
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 bg-slate-50 border-b border-slate-200 flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2.5">
          <button
            onClick={() => setActiveTab('masterFlow')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'masterFlow'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. The Idea (3 Lanes • 13 Steps)</span>
          </button>

          <button
            onClick={() => setActiveTab('roles')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'roles'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>2. Three User Roles</span>
          </button>

          <button
            onClick={() => setActiveTab('money')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'money'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>3. How Money Works (₹5,025 Example)</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'admin'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>4. Admin Control (8 Modules)</span>
          </button>

          <button
            onClick={() => setActiveTab('statuses')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'statuses'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>5. Statuses Lifecycle</span>
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'safety'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>6. Safety, Rules & Risks</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-slate-800">

          {/* TAB 1: THE IDEA IN ONE PICTURE (3 LANES, 13 STEPS) */}
          {activeTab === 'masterFlow' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      The Idea in One Picture: 3 Lanes, 13 Steps
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                      One piece of medical equipment travels from the owner to the buyer and back to LIVE.
                      Read down from Step 1 to Step 13. The cycle repeats every single time the equipment is rented.
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                    Continuous Circular Economy
                  </span>
                </div>
              </div>

              {/* 3 Lanes Visual Swimlane */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Lane 1: Owner (Lister) */}
                <div className="bg-amber-50/50 border-2 border-amber-200 rounded-2xl p-4 flex flex-col">
                  <div className="flex items-center space-x-2 pb-3 border-b border-amber-200 mb-3">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <h4 className="font-black text-amber-950 text-sm">Lane 1: Owner (Lister)</h4>
                  </div>
                  <div className="space-y-3 flex-1">
                    {GUIDE_MASTER_FLOW.filter(s => s.lane === 'owner').map((st) => (
                      <div
                        key={st.step}
                        onClick={() => setSelectedStep(st)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          selectedStep.step === st.step
                            ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-[1.02]'
                            : 'bg-white hover:bg-amber-100/60 border-amber-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>Step {st.step}. {st.title}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                            selectedStep.step === st.step ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800'
                          }`}>
                            Owner
                          </span>
                        </div>
                        <p className={`mt-1 text-[11px] line-clamp-2 ${
                          selectedStep.step === st.step ? 'text-amber-100' : 'text-slate-500'
                        }`}>
                          {st.shortDesc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lane 2: Admin (Operator) */}
                <div className="bg-sky-50/50 border-2 border-sky-200 rounded-2xl p-4 flex flex-col">
                  <div className="flex items-center space-x-2 pb-3 border-b border-sky-200 mb-3">
                    <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                    <h4 className="font-black text-sky-950 text-sm">Lane 2: Admin (Website Operator)</h4>
                  </div>
                  <div className="space-y-3 flex-1">
                    {GUIDE_MASTER_FLOW.filter(s => s.lane === 'admin').map((st) => (
                      <div
                        key={st.step}
                        onClick={() => setSelectedStep(st)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          selectedStep.step === st.step
                            ? 'bg-sky-600 text-white border-sky-700 shadow-md scale-[1.02]'
                            : 'bg-white hover:bg-sky-100/60 border-sky-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>Step {st.step}. {st.title}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                            selectedStep.step === st.step ? 'bg-sky-800 text-white' : 'bg-sky-100 text-sky-800'
                          }`}>
                            Admin
                          </span>
                        </div>
                        <p className={`mt-1 text-[11px] line-clamp-2 ${
                          selectedStep.step === st.step ? 'text-sky-100' : 'text-slate-500'
                        }`}>
                          {st.shortDesc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lane 3: Buyer (Renter) */}
                <div className="bg-emerald-50/50 border-2 border-emerald-200 rounded-2xl p-4 flex flex-col">
                  <div className="flex items-center space-x-2 pb-3 border-b border-emerald-200 mb-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <h4 className="font-black text-emerald-950 text-sm">Lane 3: Buyer (Renter)</h4>
                  </div>
                  <div className="space-y-3 flex-1">
                    {GUIDE_MASTER_FLOW.filter(s => s.lane === 'buyer').map((st) => (
                      <div
                        key={st.step}
                        onClick={() => setSelectedStep(st)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          selectedStep.step === st.step
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-[1.02]'
                            : 'bg-white hover:bg-emerald-100/60 border-emerald-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>Step {st.step}. {st.title}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                            selectedStep.step === st.step ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            Buyer
                          </span>
                        </div>
                        <p className={`mt-1 text-[11px] line-clamp-2 ${
                          selectedStep.step === st.step ? 'text-emerald-100' : 'text-slate-500'
                        }`}>
                          {st.shortDesc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Active Step Deep Dive Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-700 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-[#007791] text-white flex items-center justify-center font-black text-sm">
                      {selectedStep.step}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                        {selectedStep.laneLabel}
                      </span>
                      <h4 className="text-base font-bold text-white">
                        {selectedStep.title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">Click any step card above to inspect</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedStep.detail}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-800 text-xs">
                  {selectedStep.inputs && (
                    <div className="bg-slate-800/80 p-2.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Inputs Required:</span>
                      <span className="text-slate-200 font-medium">{selectedStep.inputs}</span>
                    </div>
                  )}
                  {selectedStep.outputs && (
                    <div className="bg-slate-800/80 p-2.5 rounded-xl">
                      <span className="text-[10px] text-cyan-400 uppercase font-bold block">Outputs / Next Stage:</span>
                      <span className="text-cyan-200 font-medium">{selectedStep.outputs}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: THREE USER ROLES */}
          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-base font-black text-slate-900">
                  Who Uses the Website
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Three kinds of people use the website, and each one sees a different set of screens after logging in. A visitor who is not logged in can browse freely, and is prompted to log in at checkout.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Role 1: Owner */}
                <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black mb-3">
                      1
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Role: Lister</span>
                    <h4 className="text-lg font-black text-slate-900 mt-0.5">Owner</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      A person or business that owns medical equipment (oxygen concentrators, ICU beds, wheelchairs).
                    </p>
                    <div className="mt-4 space-y-2 text-xs border-t border-slate-100 pt-3">
                      <div className="font-bold text-slate-700">What they can do:</div>
                      <ul className="space-y-1.5 text-slate-600">
                        <li className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Add equipment & upload purchase invoice</span>
                        </li>
                        <li className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Set daily price & deposit</span>
                        </li>
                        <li className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Track orders & delivery handover</span>
                        </li>
                        <li className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Receive post-inspection bank payouts</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenOwnerDashboard?.();
                    }}
                    className="mt-6 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs flex items-center justify-center space-x-1.5"
                  >
                    <span>Open Owner Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Role 2: Buyer */}
                <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mb-3">
                      2
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Role: Renter</span>
                    <h4 className="text-lg font-black text-slate-900 mt-0.5">Buyer</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      A patient, family, or clinic that needs medical equipment for home care or recovery.
                    </p>
                    <div className="mt-4 space-y-2 text-xs border-t border-slate-100 pt-3">
                      <div className="font-bold text-slate-700">What they can do:</div>
                      <ul className="space-y-1.5 text-slate-600">
                        <li className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Browse & filter by category, city, dates</span>
                        </li>
                        <li className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Pick rental dates with conflict check</span>
                        </li>
                        <li className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Pay safely via Razorpay online</span>
                        </li>
                        <li className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Track delivery, request return & refund</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBuyerDashboard?.();
                    }}
                    className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center space-x-1.5"
                  >
                    <span>Open Buyer Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Role 3: Admin */}
                <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-black mb-3">
                      3
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">Role: Operator</span>
                    <h4 className="text-lg font-black text-slate-900 mt-0.5">Admin</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      You, the website operator. Controls what appears on the site and where the money flows.
                    </p>
                    <div className="mt-4 space-y-2 text-xs border-t border-slate-100 pt-3">
                      <div className="font-bold text-slate-700">What they can do:</div>
                      <ul className="space-y-1.5 text-slate-600">
                        <li className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>Approve listings & inspect invoices</span>
                        </li>
                        <li className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>Set commission % (global / category)</span>
                        </li>
                        <li className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>Inspect returned equipment for damage</span>
                        </li>
                        <li className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>Disburse refunds & owner payouts</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAdminDashboard?.();
                    }}
                    className="mt-6 w-full py-2.5 rounded-xl bg-[#007791] hover:bg-[#005f73] text-white font-bold text-xs shadow-xs flex items-center justify-center space-x-1.5"
                  >
                    <span>Open Admin Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: HOW THE MONEY WORKS */}
          {activeTab === 'money' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      How the Money Works: 1 Payment Split 4 Ways
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      The buyer sees one price, but behind it are four clear destinations. Below is the exact worked example from Page 8 of the Guide.
                    </p>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-cyan-100 text-[#007791] text-xs font-black shrink-0">
                    5-Day Rental Worked Example
                  </div>
                </div>
              </div>

              {/* Exact Table from Page 8 of PDF */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 text-xs font-bold text-slate-700 grid grid-cols-12">
                  <div className="col-span-5 sm:col-span-4">Item</div>
                  <div className="col-span-4 sm:col-span-5">How it is worked out</div>
                  <div className="col-span-3 text-right">Amount (₹)</div>
                </div>
                <div className="divide-y divide-slate-100 text-xs bg-white">
                  <div className="px-4 py-3 grid grid-cols-12 items-center">
                    <div className="col-span-5 sm:col-span-4 font-bold text-slate-800">Owner price per day</div>
                    <div className="col-span-4 sm:col-span-5 text-slate-500">Set by the owner</div>
                    <div className="col-span-3 text-right font-mono font-bold text-slate-800">₹500</div>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-12 items-center bg-cyan-50/40">
                    <div className="col-span-5 sm:col-span-4 font-bold text-[#007791]">Commission per day</div>
                    <div className="col-span-4 sm:col-span-5 text-slate-500">15% of 500</div>
                    <div className="col-span-3 text-right font-mono font-bold text-[#007791]">₹75</div>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-12 items-center">
                    <div className="col-span-5 sm:col-span-4 font-bold text-slate-800">Price shown to buyer per day</div>
                    <div className="col-span-4 sm:col-span-5 text-slate-500">500 + 75</div>
                    <div className="col-span-3 text-right font-mono font-bold text-slate-800">₹575</div>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-12 items-center font-medium">
                    <div className="col-span-5 sm:col-span-4 font-bold text-slate-900">Rent for 5 days</div>
                    <div className="col-span-4 sm:col-span-5 text-slate-500">575 x 5</div>
                    <div className="col-span-3 text-right font-mono font-bold text-slate-900">₹2,875</div>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-12 items-center">
                    <div className="col-span-5 sm:col-span-4 font-bold text-slate-800">Refundable deposit</div>
                    <div className="col-span-4 sm:col-span-5 text-slate-500">Set per equipment (held safely)</div>
                    <div className="col-span-3 text-right font-mono font-bold text-slate-800">₹2,000</div>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-12 items-center">
                    <div className="col-span-5 sm:col-span-4 font-bold text-slate-800">Delivery charge</div>
                    <div className="col-span-4 sm:col-span-5 text-slate-500">Set by the admin (courier cost)</div>
                    <div className="col-span-3 text-right font-mono font-bold text-slate-800">₹150</div>
                  </div>
                  <div className="px-4 py-3.5 grid grid-cols-12 items-center bg-emerald-50 text-emerald-950 font-black border-t-2 border-emerald-200">
                    <div className="col-span-5 sm:col-span-4 text-sm">Total Buyer Pays</div>
                    <div className="col-span-4 sm:col-span-5 text-xs text-emerald-800">2,875 + 2,000 + 150</div>
                    <div className="col-span-3 text-right font-mono text-base text-emerald-700">₹5,025</div>
                  </div>
                </div>
              </div>

              {/* 4-Way Destination Split */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">1. Owner Share</span>
                  <span className="text-base font-black text-amber-600 font-mono mt-0.5 block">₹2,500</span>
                  <span className="text-[10px] text-slate-500 mt-1 block">Paid after return is checked (₹500 x 5)</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">2. Commission</span>
                  <span className="text-base font-black text-[#007791] font-mono mt-0.5 block">₹375</span>
                  <span className="text-[10px] text-slate-500 mt-1 block">Stays with admin (₹75 x 5)</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">3. Deposit</span>
                  <span className="text-base font-black text-slate-800 font-mono mt-0.5 block">₹2,000</span>
                  <span className="text-[10px] text-slate-500 mt-1 block">Held, 100% refunded after inspection</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">4. Delivery</span>
                  <span className="text-base font-black text-slate-800 font-mono mt-0.5 block">₹150</span>
                  <span className="text-[10px] text-slate-500 mt-1 block">Covers two-way courier logistics</span>
                </div>
              </div>

              {/* Interactive Live Price Simulator */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800">
                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase mb-3">
                  <Calculator className="w-4 h-4" />
                  <span>Interactive Real-Time Money Simulator</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 text-xs">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">
                      Owner Daily Rate: <span className="text-white font-bold">₹{simOwnerDaily}</span>
                    </label>
                    <input 
                      type="range" 
                      min="100" 
                      max="2000" 
                      step="50"
                      value={simOwnerDaily}
                      onChange={(e) => setSimOwnerDaily(Number(e.target.value))}
                      className="w-full accent-[#007791]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">
                      Rental Duration: <span className="text-white font-bold">{simDays} Days</span>
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="60" 
                      step="1"
                      value={simDays}
                      onChange={(e) => setSimDays(Number(e.target.value))}
                      className="w-full accent-[#007791]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">
                      Admin Commission: <span className="text-cyan-300 font-bold">{simCommissionPct}%</span>
                    </label>
                    <input 
                      type="range" 
                      min="5" 
                      max="30" 
                      step="1"
                      value={simCommissionPct}
                      onChange={(e) => setSimCommissionPct(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                </div>

                <div className="bg-slate-800/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="text-slate-300">
                      Buyer Price: <span className="text-white font-bold font-mono">₹{calcBuyerDaily}/day</span> (Owner ₹{simOwnerDaily} + Admin ₹{calcCommissionDaily})
                    </div>
                    <div className="text-slate-300">
                      Calculated Rent ({simDays}d): <span className="text-white font-bold font-mono">₹{calcTotalRent}</span>
                    </div>
                  </div>
                  <div className="text-right border-t sm:border-t-0 sm:border-l border-slate-700 sm:pl-6 pt-3 sm:pt-0">
                    <span className="text-[11px] text-slate-400 block">Total Buyer Pays:</span>
                    <span className="text-xl font-black text-emerald-400 font-mono">₹{calcTotalBuyerPays}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Owner gets ₹{calcOwnerShare} • Admin gets ₹{calcAdminCommission}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: ADMIN CONTROL (8 MODULES) */}
          {activeTab === 'admin' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-base font-black text-slate-900">
                  Admin Control: 8 Modules in 2 Groups
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  The admin has two kinds of control: what appears on the website (Listings + Users), and where the money goes (Orders + Money). The commission module is central because it sets the final marketplace price.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ADMIN_MODULES.map((mod) => (
                  <div 
                    key={mod.id}
                    className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-[#007791] transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-6 h-6 rounded-lg bg-cyan-100 text-[#007791] text-xs font-black flex items-center justify-center">
                          {mod.id}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">{mod.name}</h4>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        mod.group === 'Listings + Users'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {mod.group}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      {mod.summary}
                    </p>
                    <ul className="space-y-1 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {mod.details.map((d, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#007791] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdminDashboard?.();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#007791] text-white font-bold text-xs hover:bg-[#005f73] transition-colors shadow-xs inline-flex items-center space-x-2"
                >
                  <span>Launch Live Admin Control Center</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: STATUSES LIFECYCLE */}
          {activeTab === 'statuses' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-base font-black text-slate-900">
                  Statuses: The Life of a Listing and an Order
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Every listing and every order always has exactly one status. Statuses tell everyone what stage it is at and who must act next.
                </p>
              </div>

              {/* Equipment Statuses Table */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-600"></span>
                  <h4 className="font-bold text-sm text-slate-900">Equipment Statuses (10 States)</h4>
                </div>
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-700 grid grid-cols-12">
                    <div className="col-span-4 sm:col-span-3">Status</div>
                    <div className="col-span-5 sm:col-span-6">Meaning</div>
                    <div className="col-span-3 text-right">Who Changes It</div>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs bg-white">
                    {EQUIPMENT_STATUSES.map((st) => (
                      <div key={st.status} className="px-4 py-2.5 grid grid-cols-12 items-center hover:bg-slate-50">
                        <div className="col-span-4 sm:col-span-3">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${st.badgeColor}`}>
                            {st.status}
                          </span>
                        </div>
                        <div className="col-span-5 sm:col-span-6 text-slate-600">{st.meaning}</div>
                        <div className="col-span-3 text-right font-semibold text-slate-700">{st.whoChangesIt}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Statuses Table */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <h4 className="font-bold text-sm text-slate-900">Order Statuses (11 States)</h4>
                </div>
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-700 grid grid-cols-12">
                    <div className="col-span-4 sm:col-span-3">Status</div>
                    <div className="col-span-5 sm:col-span-6">Meaning</div>
                    <div className="col-span-3 text-right">Who Changes It</div>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs bg-white">
                    {ORDER_STATUSES.map((st) => (
                      <div key={st.status} className="px-4 py-2.5 grid grid-cols-12 items-center hover:bg-slate-50">
                        <div className="col-span-4 sm:col-span-3">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${st.badgeColor}`}>
                            {st.status}
                          </span>
                        </div>
                        <div className="col-span-5 sm:col-span-6 text-slate-600">{st.meaning}</div>
                        <div className="col-span-3 text-right font-semibold text-slate-700">{st.whoChangesIt}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: SAFETY, RULES & RISKS */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-base font-black text-slate-900">
                  Safety, Rules and Risks
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Medical equipment and online payments need extra care. These are the 8 main risks identified in the Guide and how our architecture prevents each one.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SAFETY_RISKS.map((item, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Risk: {item.risk}</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium bg-rose-50/60 p-2.5 rounded-xl border border-rose-100">
                      <span className="font-bold text-rose-900 block text-[10px] uppercase">What could go wrong:</span>
                      {item.whatCouldGoWrong}
                    </p>
                    <p className="text-xs text-emerald-800 font-medium bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                      <span className="font-bold text-emerald-900 block text-[10px] uppercase">How we prevent it:</span>
                      {item.howWePreventIt}
                    </p>
                  </div>
                ))}
              </div>

              {/* Data & Account Security */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 text-xs space-y-3">
                <div className="flex items-center space-x-2 text-cyan-400 font-bold uppercase text-[11px]">
                  <Lock className="w-4 h-4" />
                  <span>Account and Data Security Policy</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                  <div>• Passwords stored in salted scrambled form; never as plain text.</div>
                  <div>• Phone numbers verified with one-time SMS codes.</div>
                  <div>• Role-based access control prevents buyers from opening admin pages.</div>
                  <div>• Login attempts rate limited to stop brute force.</div>
                  <div>• Purchase invoice and Aadhaar verification mandatory for listers.</div>
                  <div>• Every admin action recorded in immutable audit log.</div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 font-medium text-center sm:text-left">
            Complete Plain-English Guide Implementation • MedOnRent Platform
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition-all"
            >
              Close Guide
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
