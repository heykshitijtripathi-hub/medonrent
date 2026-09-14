'use client';

import React, { useState } from 'react';
import { 
  X, 
  Activity, 
  RefreshCcw, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

interface EscrowSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STAGES = [
  {
    step: 1,
    id: 'ESCROW_LOCKED',
    title: '1. Escrow Lock',
    subtitle: 'Renter pays into Escrow Nodal Account',
    renterBalance: '₹16,350 debited',
    escrowStatus: '₹10,000 Locked in Escrow',
    lenderState: 'Booking Confirmed (Alert sent)',
    logisticsState: 'Porter pickup scheduled',
    description: 'Patient family pays rent + security deposit. Money sits in an RBI-regulated escrow account; neither party can access it until the condition terms are met.',
  },
  {
    step: 2,
    id: 'PORTER_DISPATCHED',
    title: '2. Doorstep Handover',
    subtitle: 'Porter OTP & Pre-Handover Video',
    renterBalance: 'In Transit',
    escrowStatus: 'Escrow Intact',
    lenderState: 'Verifies OTP (8392) & hands machine to Porter',
    logisticsState: 'Porter 2-Wheeler / Mini in Transit to Renter',
    description: 'The lender records a 5-sec video showing the machine powering on without error codes, hands the unit to Porter, and OTP is validated.',
  },
  {
    step: 3,
    id: 'ACTIVE_CARE',
    title: '3. Active Recovery',
    subtitle: '30-Day Patient Healing Cycle',
    renterBalance: 'Machine In-Use at Home',
    escrowStatus: 'Escrow Intact',
    lenderState: 'Earned rent accruing safely',
    logisticsState: 'Delivered to Patient Bedside',
    description: 'Patient utilizes the sanitized equipment. MedOnRent support tracks uptime. 40% of families extend tenure seamlessly with 1-click in the app.',
  },
  {
    step: 4,
    id: 'RETURN_TRANSIT',
    title: '4. Reverse Return',
    subtitle: 'Recovery Complete & Return Pickup',
    renterBalance: 'Awaiting Deposit Release',
    escrowStatus: 'Escrow Settlement Pending',
    lenderState: 'Awaiting Doorstep Delivery from Porter',
    logisticsState: 'Porter returning machine to Lender',
    description: 'At the end of tenure, reverse logistics is triggered. Machine is transported back to the original family owner.',
  },
  {
    step: 5,
    id: 'SETTLED_COMPLETED',
    title: '5. Automated Split',
    subtitle: 'Instant Deposit Refund & 82% Payout',
    renterBalance: '₹10,000 Refunded to UPI (Instant)',
    escrowStatus: 'Fully Disbursed & Settled',
    lenderState: '₹4,920 Credited to Bank (NEFT)',
    logisticsState: 'Mission Completed',
    description: 'Owner inspects the unit and taps "Confirm Working Return". Escrow releases 100% of the deposit to the patient family and disburses 82% rent to the owner in seconds.',
  },
];

export default function EscrowSimulatorModal({
  isOpen,
  onClose,
}: EscrowSimulatorModalProps) {
  // Hooks MUST be called unconditionally
  const [currentStep, setCurrentStep] = useState<number>(1);

  if (!isOpen) return null;

  const activeStage = STAGES[currentStep - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B192C] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>MedOnRent Escrow & Split-Payment Engine</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                  RBI Compliant
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Interactive simulator demonstrating two-sided trust and automated payouts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 5-Step Stepper Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[500px] gap-2">
            {STAGES.map((st) => (
              <button
                key={st.step}
                onClick={() => setCurrentStep(st.step)}
                className={`flex-1 text-left p-2.5 rounded-xl border transition-all ${
                  currentStep === st.step
                    ? 'bg-white border-[#007791] shadow-md ring-2 ring-[#007791]/20'
                    : currentStep > st.step
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-white border-slate-200 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-1.5 text-xs font-bold">
                  {currentStep > st.step ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <span
                      className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                        currentStep === st.step
                          ? 'bg-[#007791] text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {st.step}
                    </span>
                  )}
                  <span className="truncate">{st.title.split('. ')[1]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Stage Content Details */}
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#007791]">
                Active Transaction Phase
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">{activeStage.title}</h3>
              <p className="text-xs text-slate-600 mt-1 max-w-lg">{activeStage.description}</p>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-cyan-50 border border-cyan-200 text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Security Escrow</span>
              <span className="text-xs font-black text-[#007791]">{activeStage.escrowStatus}</span>
            </div>
          </div>

          {/* Three-Sided State Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            {/* Renter Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Patient Family (Renter)
              </span>
              <div className="font-bold text-slate-900 text-sm mb-1">{activeStage.renterBalance}</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {currentStep === 5
                  ? 'Deposit 100% restored with zero deduction.'
                  : 'Protected by automated escrow contract.'}
              </p>
            </div>

            {/* Lender Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Equipment Owner (Lender)
              </span>
              <div className="font-bold text-slate-900 text-sm mb-1">{activeStage.lenderState}</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {currentStep === 5
                  ? '82% of gross rental income deposited directly.'
                  : 'Asset insured by government KYC.'}
              </p>
            </div>

            {/* Platform / Logistics Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Porter Courier & Platform
              </span>
              <div className="font-bold text-slate-900 text-sm mb-1">{activeStage.logisticsState}</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {currentStep === 5
                  ? '18% take-rate retained for platform ops.'
                  : 'Automated on-demand logistics integration.'}
              </p>
            </div>
          </div>

          {/* Live Math Ledger Box */}
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono space-y-2">
            <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-400 font-sans font-bold">
              <span>LEDGER TRANSACTION AUDIT (₹6,000 Rent Sample)</span>
              <span>STATE: {activeStage.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Charged to Patient at Checkout:</span>
              <span className="text-white font-bold">₹16,549</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">├── Escrow Security Deposit Held:</span>
              <span className="text-emerald-400">₹10,000 (100% Refundable)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">├── Lender Direct Payout (82%):</span>
              <span className="text-cyan-300">₹4,920</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">├── MedOnRent Commission (18%):</span>
              <span className="text-amber-400">₹1,080</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">└── Porter Doorstep Delivery + Hygiene Kit:</span>
              <span className="text-slate-300">₹549</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(1)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Restart Simulator</span>
          </button>

          <div className="flex items-center space-x-2">
            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep((s) => s + 1)}
                className="px-5 py-2 rounded-xl bg-[#007791] hover:bg-[#005F73] text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all"
              >
                <span>Step Forward ({currentStep + 1}/5)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
              >
                Close Simulator
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
