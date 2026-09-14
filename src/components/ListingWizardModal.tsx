'use client';

import React, { useState } from 'react';
import { 
  X, 
  Video, 
  Calculator, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { EquipmentItem } from '@/data/initialEquipment';

interface ListingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onListingCreated: (newListing: EquipmentItem) => void;
}

export default function ListingWizardModal({
  isOpen,
  onClose,
  onListingCreated,
}: ListingWizardModalProps) {
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    category: 'RESPIRATORY',
    title: 'Philips EverFlo 5L Concentrator',
    brand: 'Philips Respironics',
    modelNumber: 'EverFlo-2024',
    originalPrice: 55000,
    monthlyRent: 5800,
    securityDeposit: 10000,
    city: 'Delhi NCR',
    locality: 'Sector 54, Gurugram',
    ownerName: 'Dr. Rajiv Malhotra',
    ownerPhone: '+91 98112 34567',
    bankAccount: '1092837465',
    bankIfsc: 'HDFC0001042',
    description: 'Pristine medical condition, single patient use during recovery. All filters replaced with new OEM filter.',
    videoUploaded: true,
  });

  if (!isOpen) return null;

  // Smart Pricing Engine: suggests rent at ~10-12% of retail price, deposit at ~18%
  const handleOriginalPriceChange = (price: number) => {
    const suggestedRent = Math.round((price * 0.11) / 100) * 100;
    const suggestedDeposit = Math.round((price * 0.18) / 100) * 100;
    setFormData((prev) => ({
      ...prev,
      originalPrice: price,
      monthlyRent: suggestedRent,
      securityDeposit: suggestedDeposit,
    }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        onListingCreated(data.listing);
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const netOwnerPayout = Math.round(formData.monthlyRent * 0.82);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col">
        {/* Header with Step indicator */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#007791]">
                List Equipment & Earn
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-600">Step {step} of 4</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              {step === 1 && '1. Equipment Brand & Specifications'}
              {step === 2 && '2. 5-Second Proof-of-Life Video Verification'}
              {step === 3 && '3. Set Monthly Rent & Security Deposit'}
              {step === 4 && '4. Handover Address & Payout Bank Account'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="h-full bg-gradient-to-r from-[#007791] to-[#10B981] transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        {/* Step Contents */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Equipment Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-[#007791]/30 focus:border-[#007791]"
                >
                  <option value="RESPIRATORY">Respiratory Care (Oxygen Concentrator, BiPAP, CPAP)</option>
                  <option value="HOME_ICU">Home ICU (Motorized Bed, Anti-Bedsore Mattress)</option>
                  <option value="MOBILITY">Mobility & Rehab (Wheelchair, Rollator, Crutches)</option>
                  <option value="MONITORING">Patient Monitoring (Vital Monitors, Infusion Pumps)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Philips, ResMed, Karma"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#007791]/30"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Model / Specs</label>
                  <input
                    type="text"
                    value={formData.modelNumber}
                    onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                    placeholder="e.g. EverFlo 5L with OPI"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#007791]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Listing Title for Renters</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#007791]/30"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description & Maintenance Condition</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#007791]/30"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Proof Video */}
          {step === 2 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 flex items-start space-x-3">
                <Video className="w-5 h-5 text-[#007791] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-cyan-950">Why a 5-Second Proof Video is Required:</h4>
                  <p className="text-cyan-800 text-[11px] mt-0.5 leading-relaxed">
                    Recording a 5-second video showing the power switch turn on and LCD display light up protects your equipment and eliminates disputes before Porter collects it from your door.
                  </p>
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Working Proof Video Attached</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  File: <code className="text-[#007791] font-semibold">proof_philips_5l_verified.mp4</code> (5.2 MB)
                </p>
                <div className="mt-3 inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 mr-0.5" />
                  <span>Motor Hum & LCD Power Verified</span>
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl">
                <label className="flex items-center space-x-2 text-slate-700 font-semibold cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#007791]" />
                  <span>I certify that this equipment has been sanitized with 70% alcohol solution</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Smart Pricing (NO UNPROFESSIONAL MARGINS) */}
          {step === 3 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-start space-x-3">
                <Calculator className="w-5 h-5 text-[#007791] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Recommended Rental Pricing</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    We suggest competitive monthly rent and a secure refundable deposit based on retail price to ensure fast bookings and asset protection.
                  </p>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Original Purchase Price (₹):
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => handleOriginalPriceChange(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-[#007791]/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Monthly Rent Charged (₹):</label>
                  <input
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) => setFormData({ ...formData, monthlyRent: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-[#007791]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Refundable Security Deposit (₹):</label>
                  <input
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) => setFormData({ ...formData, securityDeposit: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-emerald-700"
                  />
                </div>
              </div>

              {/* Clean Earnings Card */}
              <div className="p-4 rounded-2xl bg-[#0B192C] text-white space-y-2">
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  Your Net Monthly Earnings:
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-white">
                    ₹{netOwnerPayout.toLocaleString('en-IN')} / month
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">Direct Bank Credit</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Paid automatically to your bank account every month. Includes doorstep Porter courier pickup from your home and complete deposit insurance.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Bank Account & Handover */}
          {step === 4 && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Owner Full Name</label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Phone (Aadhaar Linked)</label>
                  <input
                    type="text"
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Locality / Address for Porter Pickup</label>
                  <input
                    type="text"
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#007791]" />
                  <span>Bank Account for Direct Monthly Earnings</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Account Number</label>
                    <input
                      type="text"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                      className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-medium mb-1">IFSC Code</label>
                    <input
                      type="text"
                      value={formData.bankIfsc}
                      onChange={(e) => setFormData({ ...formData, bankIfsc: e.target.value })}
                      className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 flex items-center space-x-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-[#007791] text-white font-bold text-xs hover:bg-[#005F73] flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#007791] to-[#10B981] text-white font-bold text-xs hover:from-[#005F73] hover:to-[#059669] flex items-center space-x-1.5 shadow-md transition-all active:scale-[0.98] disabled:opacity-75"
            >
              {submitting ? (
                <span>Publishing to Marketplace...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Publish Listing to Live Marketplace</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
