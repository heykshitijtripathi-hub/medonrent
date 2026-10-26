'use client';

import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  FileText,
  UserCheck
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

  // Form State aligned with Guide Section 3 & 16
  const [formData, setFormData] = useState({
    // Step 1: Owner Profile & Bank Payout Details
    ownerName: 'Dr. Rajiv Malhotra',
    ownerPhone: '+91 98112 34567',
    idType: 'Aadhaar Card',
    idNumber: '•••• •••• 9102',
    bankAccount: '1092837465',
    bankIfsc: 'HDFC0001042',
    bankName: 'HDFC Bank, Gurugram Branch',
    
    // Step 2: Equipment & Purchase Invoice
    category: 'RESPIRATORY' as "RESPIRATORY" | "HOME_ICU" | "MOBILITY" | "MONITORING",
    title: 'Philips EverFlo 5L Concentrator',
    brand: 'Philips Respironics',
    modelNumber: 'EverFlo-2024',
    condition: 'Like New' as "Like New" | "Gently Used" | "Certified Refurbished",
    description: 'Pristine medical condition, single patient use during recovery. All filters replaced with new OEM filter. Hospital-grade sanitized.',
    purchaseInvoiceName: 'Original_GST_Invoice_Philips_Everflo.pdf',
    invoiceVerified: false,
    
    // Step 3: Daily Price & Refundable Security Deposit
    ownerPricePerDay: 500, // Worked example from Guide
    securityDeposit: 2000, // Worked example from Guide
    city: 'Delhi NCR',
    locality: 'Sector 54, Gurugram',
    commissionPercent: 15,
  });

  if (!isOpen) return null;

  // Real-time Guide calculations
  const commissionDaily = Math.round(formData.ownerPricePerDay * (formData.commissionPercent / 100));
  const buyerDailyPrice = formData.ownerPricePerDay + commissionDaily;

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      const newListing: EquipmentItem = {
        id: `mor-lister-${Date.now().toString().slice(-4)}`,
        title: formData.title,
        brand: formData.brand,
        category: formData.category,
        categoryLabel: formData.category === 'RESPIRATORY' ? 'Respiratory Care' : formData.category === 'HOME_ICU' ? 'Home ICU & Recovery' : 'Mobility & Rehab',
        ownerPricePerDay: formData.ownerPricePerDay,
        commissionPercent: formData.commissionPercent,
        dailyRent: buyerDailyPrice,
        monthlyRent: Math.round(buyerDailyPrice * 30 * 0.75), // Discounted 30-day rate
        securityDeposit: formData.securityDeposit,
        originalPrice: formData.ownerPricePerDay * 100,
        description: formData.description,
        condition: formData.condition,
        specs: {
          "Condition": formData.condition,
          "Brand": formData.brand,
          "Model": formData.modelNumber,
          "Inspection Certificate": "Attached",
        },
        image: "/equipment/oxygen-concentrator.jpg",
        videoDurationSec: 5,
        hasWorkingProofVideo: true,
        isSanitized: true,
        sanitizationDate: "Today (Hospital Grade)",
        city: formData.city,
        locality: formData.locality,
        distanceKm: 3.2,
        owner: {
          id: `own_${Date.now().toString().slice(-3)}`,
          name: formData.ownerName,
          roleDesc: "Resident & Lister",
          isAadhaarVerified: true,
          rating: 5.0,
          completedRentals: 0,
          responseTime: "< 15 mins",
          bankAccount: formData.bankAccount,
          bankIfsc: formData.bankIfsc
        },
        features: [
          "Original GST invoice attached",
          "Sanitized with hospital-grade disinfectant",
          "Power cords and accessories included"
        ],
        instantDispatch: false,
        isAvailable: false,
        status: 'Pending approval', // Guide Step 4: Status PENDING waiting for admin
        purchaseInvoiceVerified: false,
        purchaseInvoiceUrl: formData.purchaseInvoiceName,
        requiresPrescription: formData.category === 'RESPIRATORY',
        bookedDates: []
      };

      onListingCreated(newListing);
      setSubmitting(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col">
        
        {/* Header with Step indicator */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#007791]">
                Owner (Lister) Journey • Section 3 of Guide
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-600">Step {step} of 4</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              {step === 1 && '1. Owner Registration, ID Verification & Bank Details'}
              {step === 2 && '2. Equipment Details & Mandatory Purchase Invoice'}
              {step === 3 && '3. Set Daily Rental Price & Refundable Security Deposit'}
              {step === 4 && '4. Review & Submit for Admin Approval (Status PENDING)'}
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
            className="h-full bg-gradient-to-r from-amber-500 to-[#007791] transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        {/* Step Contents */}
        <div className="p-6 overflow-y-auto max-h-[70vh] text-xs space-y-4">

          {/* STEP 1: OWNER ID & BANK DETAILS */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-2.5">
                <UserCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-xs">Why ID & Bank Details are Required (Guide Page 3):</h4>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    1. The owner signs up and confirms their phone with a one-time code.<br />
                    2. The owner uploads an ID document and bank details. The bank details are needed to transfer your earnings directly after return inspection.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#007791]/30"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Phone (OTP Verified)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.ownerPhone}
                      onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#007791]/30 font-mono"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      ✓ Phone Verified
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-slate-800 block">Government ID Document Verification:</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold block">Document Type</span>
                    <span className="font-semibold text-slate-800">{formData.idType}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold block">Status</span>
                    <span className="font-bold text-emerald-700 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Uploaded & Verified</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <span className="font-bold text-slate-800 block">Bank Account for Automatic Payouts:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1">Account Number</label>
                    <input
                      type="text"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">IFSC Code</label>
                    <input
                      type="text"
                      value={formData.bankIfsc}
                      onChange={(e) => setFormData({ ...formData, bankIfsc: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EQUIPMENT & INVOICE */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Equipment Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as "RESPIRATORY" | "HOME_ICU" | "MOBILITY" | "MONITORING" })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                >
                  <option value="RESPIRATORY">Respiratory Care (Oxygen Concentrator, BiPAP, CPAP)</option>
                  <option value="HOME_ICU">Home ICU (Motorized ICU Bed, Anti-Bedsore Mattress)</option>
                  <option value="MOBILITY">Mobility & Rehabilitation (Powered Wheelchair, Walker)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Listing Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Purchase Invoice Mandatory Section (Guide Section 11 & 16) */}
              <div className="p-4 bg-sky-50 border-2 border-dashed border-sky-300 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-sky-900 font-bold">
                  <FileText className="w-4 h-4 text-sky-700" />
                  <span>Mandatory Purchase Invoice (Prevents Fake / Unsafe Equipment)</span>
                </div>
                <p className="text-[11px] text-sky-800">
                  As mandated in Section 11 & 16 of the Plain-English Guide, owners must provide the original purchase invoice to verify device authenticity before admin approves.
                </p>
                <div className="p-3 bg-white rounded-xl border border-sky-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-mono font-medium text-slate-800 text-[11px]">{formData.purchaseInvoiceName}</span>
                  </div>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                    Ready for Admin Review
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Description & Sanitization Status</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>
          )}

          {/* STEP 3: DAILY PRICING & DEPOSIT (GUIDE FORMULA) */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">Pricing Rules from the Plain-English Guide (Page 8):</h4>
                <p className="text-[11px] text-slate-600">
                  You set the daily rate you want to earn and the refundable deposit.
                  The marketplace adds 15% platform commission to create the final price shown to buyers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-2">
                  <label className="block font-bold text-amber-950">
                    Your Desired Rent Per Day (₹):
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="5000"
                    step="10"
                    value={formData.ownerPricePerDay}
                    onChange={(e) => setFormData({ ...formData, ownerPricePerDay: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-amber-300 font-mono text-base font-bold bg-white"
                  />
                  <span className="text-[11px] text-amber-800 block">
                    You receive 100% of this amount (₹{formData.ownerPricePerDay}/day) post-inspection.
                  </span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <label className="block font-bold text-slate-800">
                    Refundable Security Deposit (₹):
                  </label>
                  <input
                    type="number"
                    min="500"
                    max="50000"
                    step="500"
                    value={formData.securityDeposit}
                    onChange={(e) => setFormData({ ...formData, securityDeposit: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-base font-bold bg-white"
                  />
                  <span className="text-[11px] text-slate-500 block">
                    Held in safe escrow; refunded to buyer after you verify returned unit.
                  </span>
                </div>
              </div>

              {/* Real-time Transparency Card */}
              <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 block">
                  Marketplace Pricing Preview
                </span>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Your Earning:</span>
                  <span className="font-mono font-bold text-amber-700">₹{formData.ownerPricePerDay} / day</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Platform Commission (15%):</span>
                  <span className="font-mono font-bold text-[#007791]">+ ₹{commissionDaily} / day</span>
                </div>
                <div className="pt-2 border-t border-cyan-200 flex justify-between items-center text-sm font-black text-slate-900">
                  <span>Price Shown to Buyers:</span>
                  <span className="font-mono text-[#007791]">₹{buyerDailyPrice} / day</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & SUBMIT (STATUS PENDING) */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 uppercase">
                  Listing Status Will Be: PENDING APPROVAL
                </span>
                <h4 className="font-black text-slate-900 text-sm">
                  Submitting to Admin Review Queue (Step 2 -&gt; Step 3)
                </h4>
                <p className="text-slate-600 text-[11px] max-w-md mx-auto">
                  Once you submit, our medical compliance team checks your purchase invoice and condition photos. You will receive an SMS and email notification the moment it goes LIVE!
                </p>
              </div>

              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Equipment:</span>
                    <span className="font-bold text-slate-800">{formData.title}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Owner:</span>
                    <span className="font-bold text-slate-800">{formData.ownerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Payout Bank:</span>
                    <span className="font-mono font-bold text-slate-800">{formData.bankName} (IFSC: {formData.bankIfsc})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Daily Earning:</span>
                    <span className="font-mono font-bold text-amber-700">₹{formData.ownerPricePerDay}/day</span>
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
              className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-100 flex items-center space-x-1"
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
              className="px-5 py-2 rounded-xl bg-[#007791] hover:bg-[#005f73] text-white font-bold text-xs shadow-xs flex items-center space-x-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-md flex items-center space-x-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting to Admin Queue...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Listing (Status: PENDING)</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
