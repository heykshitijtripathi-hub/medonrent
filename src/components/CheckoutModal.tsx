'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { 
  X, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Calendar,
  AlertCircle,
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import { EquipmentItem } from '@/data/initialEquipment';

export interface CompletedBooking {
  bookingId: string;
  equipment: EquipmentItem;
  patientName: string;
  patientPhone: string;
  deliveryAddress: string;
  pincode: string;
  tenureDays: number;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  transactionId: string;
  financials: {
    ownerDailyRate: number;
    commissionDaily: number;
    commissionPercent: number;
    buyerDailyRate: number;
    baseRent: number;
    securityDeposit: number;
    consumables: number;
    porterDelivery: number;
    totalPaid: number;
    refundableDeposit: number;
    ownerShare: number;
    adminCommission: number;
    damageDeduction?: number;
    depositRefunded?: number;
    ownerPayoutStatus?: 'PENDING_RETURN' | 'INSPECTION_PENDING' | 'PAID';
    ownerPayoutUtr?: string;
  };
  porterTracking: {
    status: 'SCHEDULED' | 'IN_TRANSIT' | 'DELIVERED';
    driverName: string;
    driverPhone: string;
    vehicleNumber: string;
    pickupOtp: string;
    returnOtp: string;
  };
  orderStatus: 
    | 'Payment pending'
    | 'Confirmed'
    | 'Processing'
    | 'Shipped'
    | 'Delivered'
    | 'Rental active'
    | 'Return requested'
    | 'Return picked up'
    | 'Inspection'
    | 'Completed'
    | 'Cancelled'
    | 'CONFIRMED'
    | 'ACTIVE_CARE'
    | 'RETURN_SCHEDULED'
    | 'COMPLETED_REFUNDED';
  prescriptionUploaded?: boolean;
}

interface CheckoutModalProps {
  item: EquipmentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (booking: CompletedBooking) => void;
}

export default function CheckoutModal({
  item,
  isOpen,
  onClose,
  onBookingComplete,
}: CheckoutModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'receipt'>('details');

  // Step 1 Form: Patient & Delivery
  const [patientName, setPatientName] = useState(user?.name || 'Smt. Kamla Verma');
  const [patientPhone, setPatientPhone] = useState('+91 98110 49281');
  const [deliveryAddress, setDeliveryAddress] = useState('Flat 302, DLF Phase 2');
  const [pincode, setPincode] = useState('122002');
  const city = 'Delhi NCR';
  
  // Tenure & Dates (Guide worked example is 5 days)
  const [tenureDays, setTenureDays] = useState<number>(5);
  const [customStartDate, setCustomStartDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [prescriptionAttached, setPrescriptionAttached] = useState<boolean>(true);
  const includeConsumables = false;

  // Step 2 Payment
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [upiId, setUpiId] = useState('kamla.v@okhdfcbank');
  const [selectedUpiApp, setSelectedUpiApp] = useState('GPay');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4921');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('•••');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Completed State
  const [completedBooking, setCompletedBooking] = useState<CompletedBooking | null>(null);

  if (!isOpen || !item) return null;

  // Canonical Guide Calculations:
  // Owner Price Per Day (set by owner) + Commission (15%) = Buyer Price Per Day
  const ownerDaily = item.ownerPricePerDay || Math.round(item.monthlyRent / 30 * 0.85);
  const commissionPct = item.commissionPercent || 15;
  const commissionDaily = Math.round(ownerDaily * (commissionPct / 100));
  const buyerDaily = item.dailyRent || (ownerDaily + commissionDaily);

  // Total Rent for selected days
  const baseRent = buyerDaily * tenureDays;
  const refundableDeposit = item.securityDeposit || 2000;
  const deliveryFee = 150; // Standard admin courier charge from Guide
  const consumablesFee = includeConsumables ? 199 : 0;
  const totalAmount = baseRent + refundableDeposit + deliveryFee + consumablesFee;

  // Split values
  const ownerShareTotal = ownerDaily * tenureDays;
  const adminCommissionTotal = commissionDaily * tenureDays;

  // Check double-booking risk (Guide Section 11)
  const isDateClash = item.bookedDates?.some((b) => {
    return b.start <= customStartDate && b.end >= customStartDate;
  });

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone || !deliveryAddress) {
      alert('Please fill all delivery details');
      return;
    }
    if (isDateClash) {
      alert('This equipment is already reserved for the chosen date. Please pick another date.');
      return;
    }
    setStep('payment');
  };

  const handlePayNow = () => {
    setStep('processing');

    setTimeout(() => {
      const startDateObj = new Date(customStartDate);
      const returnDateObj = new Date(startDateObj);
      returnDateObj.setDate(returnDateObj.getDate() + tenureDays);

      const bookingData: CompletedBooking = {
        bookingId: `MOR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        equipment: item,
        patientName,
        patientPhone,
        deliveryAddress: `${deliveryAddress}, ${city} - ${pincode}`,
        pincode,
        tenureDays,
        startDate: startDateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        endDate: returnDateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        paymentMethod: paymentMethod === 'UPI' ? `UPI (${selectedUpiApp} - ${upiId})` : `${paymentMethod} (${selectedBank})`,
        transactionId: `TXN_RAZORPAY_${Math.floor(1000000 + Math.random() * 9000000)}`,
        financials: {
          ownerDailyRate: ownerDaily,
          commissionDaily: commissionDaily,
          commissionPercent: commissionPct,
          buyerDailyRate: buyerDaily,
          baseRent: baseRent,
          securityDeposit: refundableDeposit,
          consumables: consumablesFee,
          porterDelivery: deliveryFee,
          totalPaid: totalAmount,
          refundableDeposit: refundableDeposit,
          ownerShare: ownerShareTotal,
          adminCommission: adminCommissionTotal,
          damageDeduction: 0,
          depositRefunded: 0,
          ownerPayoutStatus: 'PENDING_RETURN',
        },
        porterTracking: {
          status: 'SCHEDULED',
          driverName: 'Mukesh Kumar',
          driverPhone: '+91 98711 50291',
          vehicleNumber: 'HR 26 DQ 8192 (Courier Mini)',
          pickupOtp: Math.floor(1000 + Math.random() * 9000).toString(),
          returnOtp: Math.floor(1000 + Math.random() * 9000).toString(),
        },
        orderStatus: 'Confirmed',
        prescriptionUploaded: item.requiresPrescription ? prescriptionAttached : false,
      };

      setCompletedBooking(bookingData);
      onBookingComplete(bookingData);
      setStep('receipt');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[96vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B192C] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0"></span>
            <div>
              <h3 className="text-sm font-bold text-white">
                {step === 'details' && 'Step 5 & 6: Choose Dates, Delivery & Address'}
                {step === 'payment' && 'Step 6: Razorpay Online Payment & Escrow Lock'}
                {step === 'processing' && 'Verifying Payment with Server Webhook...'}
                {step === 'receipt' && 'Step 7: Order Confirmed & Receipt'}
              </h3>
              <p className="text-[11px] text-slate-300">
                {step !== 'receipt' 
                  ? 'Plain-English Guide Architecture • 100% Refundable Deposit • Fixed ₹150 Courier'
                  : 'Order logged in Database • SMS & Email sent to Owner & Courier'
                }
              </p>
            </div>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs text-slate-800">

          {/* STEP 1: DETAILS & DURATION */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              {/* Product Mini Header */}
              <div className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#007791]">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-bold text-slate-900 truncate text-xs sm:text-sm">{item.title}</h4>
                  <div className="flex items-center space-x-2 mt-0.5 text-[11px] text-slate-500">
                    <span>Owner: {item.owner.name}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">₹{buyerDaily}/day</span>
                  </div>
                </div>
              </div>

              {/* Guide Worked Example Duration Chips */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-700 flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-[#007791]" />
                    <span>Select Rental Duration (Days):</span>
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Guide example: <span className="font-bold text-cyan-800">5 Days</span>
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 30].map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setTenureDays(d)}
                      className={`py-2 px-3 rounded-xl border text-center font-bold transition-all ${
                        tenureDays === d
                          ? 'bg-[#007791] text-white border-[#007791] shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="text-sm font-mono">{d} Days</div>
                      <div className={`text-[10px] ${tenureDays === d ? 'text-cyan-100' : 'text-slate-400'}`}>
                        ₹{buyerDaily * d}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Date & Double Booking Prevention */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Rental Start Date:</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#007791]/30 font-medium text-xs bg-slate-50"
                  />
                  {isDateClash && (
                    <div className="mt-1 text-[11px] text-rose-600 font-bold flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Already booked on this date! Pick another date.</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Pincode Availability Check:</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 122002"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#007791]/30 font-mono text-xs bg-slate-50"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ Serviceable (₹150 Courier)
                    </span>
                  </div>
                </div>
              </div>

              {/* Prescription requirement (Guide Section 14) */}
              {item.requiresPrescription && (
                <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl flex items-start space-x-2.5">
                  <FileCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-bold text-amber-950 text-xs">
                      Doctor&apos;s Prescription Upload Required
                    </div>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      As per Guide safety protocols for respiratory & life support machines, a valid doctor&apos;s prescription is mandated.
                    </p>
                    <label className="flex items-center space-x-2 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prescriptionAttached}
                        onChange={(e) => setPrescriptionAttached(e.target.checked)}
                        className="rounded text-[#007791] accent-[#007791]"
                      />
                      <span className="text-xs font-semibold text-slate-800">
                        Prescription attached & verified (Dr. Verma Clinic Rx #892)
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Delivery Details */}
              <div className="space-y-3 pt-1">
                <div className="font-bold text-slate-800 text-xs">Patient & Delivery Address:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Patient / Renter Name</label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#007791]/30 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Mobile Number (SMS Updates)</label>
                    <input
                      type="text"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#007791]/30 text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Doorstep Address</label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#007791]/30 text-xs"
                  />
                </div>
              </div>

              {/* Transparent Price Breakdown (Exact Guide Formula) */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="font-bold text-slate-800 text-xs pb-1 border-b border-slate-200 flex items-center justify-between">
                  <span>Plain-English Pricing Breakdown</span>
                  <span className="text-[10px] font-normal text-slate-500">
                    Owner gets ₹{ownerDaily}/day • Admin 15% commission ₹{commissionDaily}/day
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Equipment Rent ({tenureDays} days @ ₹{buyerDaily}/day)</span>
                  <span className="font-mono font-semibold text-slate-800">₹{baseRent}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center space-x-1">
                    <span>100% Refundable Security Deposit</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                  <span className="font-mono font-semibold text-slate-800">₹{refundableDeposit}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Courier Delivery & Pickup Charge</span>
                  <span className="font-mono font-semibold text-slate-800">₹{deliveryFee}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
                  <div>
                    <span>Total Payable Now</span>
                    <span className="block text-[10px] text-emerald-600 font-medium">
                      (Includes ₹{refundableDeposit} deposit refunded after inspection)
                    </span>
                  </div>
                  <span className="text-base font-mono text-[#007791]">₹{totalAmount}</span>
                </div>
              </div>

              {/* Action */}
              <button
                type="submit"
                disabled={isDateClash}
                className="w-full py-3 rounded-xl bg-[#007791] hover:bg-[#005f73] text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                <span>Proceed to Online Payment (₹{totalAmount})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT SCREEN (Razorpay Simulator) */}
          {step === 'payment' && (
            <div className="space-y-4">
              <button
                onClick={() => setStep('details')}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Delivery Details</span>
              </button>

              <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-sky-800">Razorpay Safe Checkout</span>
                  <div className="text-sm font-black text-sky-950">
                    Order Total: ₹{totalAmount}
                  </div>
                  <div className="text-[11px] text-sky-700">
                    Deposit ₹{refundableDeposit} held securely in escrow
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-sky-200 flex items-center justify-center text-sky-700">
                  <Lock className="w-5 h-5" />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Select Payment Mode:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'UPI', label: 'Instant UPI / QR', icon: Smartphone },
                    { id: 'CARD', label: 'Debit / Credit Card', icon: CreditCard },
                    { id: 'NETBANKING', label: 'Net Banking', icon: Building2 },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as 'UPI' | 'CARD' | 'NETBANKING')}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          paymentMethod === m.id
                            ? 'bg-[#007791] text-white border-[#007791] shadow-xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4 mx-auto mb-1" />
                        <span className="font-bold text-[11px] block">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* UPI Tab */}
              {paymentMethod === 'UPI' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center space-x-2">
                    {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setSelectedUpiApp(app)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedUpiApp === app
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Enter UPI VPA / ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Card Tab */}
              {paymentMethod === 'CARD' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-500 font-medium mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-medium mb-1">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Netbanking */}
              {paymentMethod === 'NETBANKING' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <label className="block text-slate-500 font-medium">Select Verified Bank:</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                  >
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India (SBI)</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                onClick={handlePayNow}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md flex items-center justify-center space-x-2 transition-all active:scale-[0.99]"
              >
                <Lock className="w-4 h-4" />
                <span>Authorize & Pay ₹{totalAmount}</span>
              </button>
            </div>
          )}

          {/* STEP 3: PROCESSING SIMULATION */}
          {step === 'processing' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 border-4 border-[#007791] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h4 className="text-base font-bold text-slate-900">
                Authorizing Razorpay Gateway & Syncing Webhook...
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Validating transaction against server pricing rules. Locking equipment calendar dates to prevent double-booking.
              </p>
            </div>
          )}

          {/* STEP 4: RECEIPT & CONFIRMATION */}
          {step === 'receipt' && completedBooking && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Step 7: Order Confirmed
                </span>
                <h4 className="text-lg font-black text-emerald-950 mt-0.5">
                  Rental Booking Confirmed!
                </h4>
                <p className="text-xs text-emerald-800 mt-1">
                  Order ID: <span className="font-mono font-bold">{completedBooking.bookingId}</span> • Transaction: <span className="font-mono">{completedBooking.transactionId}</span>
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-800">Booking Summary</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded-full text-[10px]">
                    Status: {completedBooking.orderStatus}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Equipment:</span>
                    <span className="font-semibold text-slate-800 truncate block">{completedBooking.equipment.title}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Rental Period:</span>
                    <span className="font-semibold text-slate-800">{completedBooking.startDate} – {completedBooking.endDate} ({completedBooking.tenureDays}d)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Delivering To:</span>
                    <span className="font-semibold text-slate-800">{completedBooking.deliveryAddress}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Courier Tracking:</span>
                    <span className="font-semibold text-slate-800">{completedBooking.porterTracking.driverName} (OTP: {completedBooking.porterTracking.pickupOtp})</span>
                  </div>
                </div>

                {/* Plain-English Split Info */}
                <div className="pt-2 border-t border-slate-200 grid grid-cols-4 gap-2 text-center text-[11px]">
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Owner Share</span>
                    <span className="font-bold font-mono text-amber-700">₹{completedBooking.financials.ownerShare}</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Commission</span>
                    <span className="font-bold font-mono text-[#007791]">₹{completedBooking.financials.adminCommission}</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Deposit Held</span>
                    <span className="font-bold font-mono text-slate-800">₹{completedBooking.financials.refundableDeposit}</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Total Paid</span>
                    <span className="font-bold font-mono text-emerald-700">₹{completedBooking.financials.totalPaid}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps in Guide Lifecycle */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5 text-xs text-slate-600">
                <span className="font-bold text-slate-900 block text-xs">
                  What happens next according to the Guide:
                </span>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className="w-5 h-5 rounded-full bg-slate-100 font-bold flex items-center justify-center shrink-0">8</span>
                  <span>Owner receives alert and hands over equipment to courier partner.</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className="w-5 h-5 rounded-full bg-slate-100 font-bold flex items-center justify-center shrink-0">9</span>
                  <span>Delivery partner arrives at your address; rental duration starts.</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className="w-5 h-5 rounded-full bg-slate-100 font-bold flex items-center justify-center shrink-0">10</span>
                  <span>When ready, tap 1-click &quot;Request Return&quot; in your Buyer Dashboard.</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-[#007791] text-white font-bold text-xs hover:bg-[#005f73] transition-colors"
              >
                Go to Buyer Dashboard & Track Delivery
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
