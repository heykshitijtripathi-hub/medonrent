'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Lock, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  QrCode, 
  ArrowRight, 
  ArrowLeft, 
  Printer
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
    baseRent: number;
    securityDeposit: number;
    consumables: number;
    porterDelivery: number;
    totalPaid: number;
    refundableDeposit: number;
  };
  porterTracking: {
    status: 'SCHEDULED' | 'IN_TRANSIT' | 'DELIVERED';
    driverName: string;
    driverPhone: string;
    vehicleNumber: string;
    pickupOtp: string;
    returnOtp: string;
  };
  orderStatus: 'CONFIRMED' | 'ACTIVE_CARE' | 'RETURN_SCHEDULED' | 'COMPLETED_REFUNDED';
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
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'receipt'>('details');

  // Step 1 Form
  const [patientName, setPatientName] = useState('Anil Kumar');
  const [patientPhone, setPatientPhone] = useState('+91 98102 34567');
  const [deliveryAddress, setDeliveryAddress] = useState('Flat 402, Tower B, Palm Springs, Sector 54');
  const [pincode, setPincode] = useState('122002');
  const [city, setCity] = useState('Gurugram, Delhi NCR');
  const [tenureDays, setTenureDays] = useState<number>(30);
  const [includeConsumables, setIncludeConsumables] = useState(true);
  const [includePorter, setIncludePorter] = useState(true);

  // Step 2 Payment
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('anil.kumar@okhdfcbank');
  const [selectedUpiApp, setSelectedUpiApp] = useState('GPay');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4921');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('•••');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Completed State
  const [completedBooking, setCompletedBooking] = useState<CompletedBooking | null>(null);

  if (!isOpen || !item) return null;

  // Pricing calculations
  const multiplier = tenureDays === 15 ? 0.6 : tenureDays === 30 ? 1.0 : tenureDays === 60 ? 1.85 : 2.65;
  const calculatedRent = Math.round(item.monthlyRent * multiplier);
  const consumablesFee = includeConsumables ? 199 : 0;
  const porterFee = includePorter ? 350 : 0;
  const totalAmount = calculatedRent + item.securityDeposit + consumablesFee + porterFee;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone || !deliveryAddress) {
      alert('Please fill all delivery details');
      return;
    }
    setStep('payment');
  };

  const handlePayNow = () => {
    setStep('processing');

    setTimeout(() => {
      const today = new Date();
      const returnDate = new Date();
      returnDate.setDate(today.getDate() + tenureDays);

      const bookingData: CompletedBooking = {
        bookingId: `MOR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        equipment: item,
        patientName,
        patientPhone,
        deliveryAddress: `${deliveryAddress}, ${city} - ${pincode}`,
        pincode,
        tenureDays,
        startDate: today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        endDate: returnDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        paymentMethod: paymentMethod === 'UPI' ? `UPI (${selectedUpiApp} - ${upiId})` : paymentMethod,
        transactionId: `TXN_ESCROW_${Math.floor(1000000 + Math.random() * 9000000)}`,
        financials: {
          baseRent: calculatedRent,
          securityDeposit: item.securityDeposit,
          consumables: consumablesFee,
          porterDelivery: porterFee,
          totalPaid: totalAmount,
          refundableDeposit: item.securityDeposit,
        },
        porterTracking: {
          status: 'SCHEDULED',
          driverName: 'Ramesh Singh',
          driverPhone: '+91 98711 02938',
          vehicleNumber: 'DL 3S CE 4819 (Porter Mini)',
          pickupOtp: Math.floor(1000 + Math.random() * 9000).toString(),
          returnOtp: Math.floor(1000 + Math.random() * 9000).toString(),
        },
        orderStatus: 'CONFIRMED',
      };

      setCompletedBooking(bookingData);
      onBookingComplete(bookingData);
      setStep('receipt');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[96vh] sm:max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#0B192C] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] flex-shrink-0"></span>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white">
                {step === 'details' && 'Step 1: Patient Delivery & Duration'}
                {step === 'payment' && 'Step 2: Secure Payment & Escrow'}
                {step === 'processing' && 'Processing Transaction...'}
                {step === 'receipt' && 'Booking Confirmed & Digital Receipt'}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-300 line-clamp-1">
                {step !== 'receipt' ? '100% Refundable Deposit • Direct Doorstep Delivery' : 'Receipt generated & SMS sent'}
              </p>
            </div>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5 text-xs">
              {/* Selected Equipment Snapshot */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center space-x-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#007791] uppercase tracking-wider block">
                    {item.brand} • {item.categoryLabel}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                  <div className="text-[11px] text-slate-600 mt-0.5 flex items-center space-x-3">
                    <span>Rent: <strong>₹{calculatedRent.toLocaleString('en-IN')}</strong></span>
                    <span>Deposit: <strong className="text-emerald-700">₹{item.securityDeposit.toLocaleString('en-IN')} (Refundable)</strong></span>
                  </div>
                </div>
              </div>

              {/* Rental Duration Selection */}
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  Select Rental Recovery Period:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 60, 90].map((days) => (
                    <button
                      type="button"
                      key={days}
                      onClick={() => setTenureDays(days)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                        tenureDays === days
                          ? 'bg-[#007791] text-white border-[#007791] shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient & Delivery Information */}
              <div className="space-y-3">
                <div className="font-bold text-slate-900 text-xs border-b border-slate-100 pb-1 flex items-center justify-between">
                  <span>Patient & Delivery Address</span>
                  <span className="text-[10px] text-[#007791] font-normal">Porter doorstep handover</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Patient / Caregiver Name *</label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Mobile Number (For Delivery OTP) *</label>
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Flat / House No., Society, Landmark *</label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">City / Region *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-2 pt-2">
                <label className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={includeConsumables}
                    onChange={(e) => setIncludeConsumables(e.target.checked)}
                    className="rounded text-[#007791]"
                  />
                  <span className="text-slate-700">
                    Include brand new sealed patient accessories kit (mask, cannula, filter) <strong>(+₹199)</strong>
                  </span>
                </label>

                <label className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={includePorter}
                    onChange={(e) => setIncludePorter(e.target.checked)}
                    className="rounded text-[#007791]"
                  />
                  <span className="text-slate-700">
                    Two-way doorstep delivery & return courier via Porter <strong>(+₹350)</strong>
                  </span>
                </label>
              </div>

              {/* Total Summary Footer */}
              <div className="p-4 bg-[#0B192C] text-white rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Due Now:</span>
                  <span className="text-xl font-black text-white">₹{totalAmount.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">
                    (Includes ₹{item.securityDeposit.toLocaleString('en-IN')} 100% Refundable Deposit)
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#007791] to-[#10B981] hover:from-[#005F73] hover:to-[#059669] text-white font-bold text-xs flex items-center space-x-1.5 shadow-md active:scale-95 transition-all"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD SELECTION */}
          {step === 'payment' && (
            <div className="space-y-5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-800 text-sm">Choose Payment Method</span>
                <span className="text-xs text-[#007791] font-bold">Total: ₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'UPI'
                      ? 'bg-cyan-50 border-[#007791] text-[#007791] font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mx-auto mb-1" />
                  <span>UPI Instant</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'CARD'
                      ? 'bg-cyan-50 border-[#007791] text-[#007791] font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1" />
                  <span>Debit / Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('NETBANKING')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'NETBANKING'
                      ? 'bg-cyan-50 border-[#007791] text-[#007791] font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <Building2 className="w-4 h-4 mx-auto mb-1" />
                  <span>Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'COD'
                      ? 'bg-cyan-50 border-[#007791] text-[#007791] font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <Truck className="w-4 h-4 mx-auto mb-1" />
                  <span>Doorstep Pay</span>
                </button>
              </div>

              {/* UPI Tab Body */}
              {paymentMethod === 'UPI' && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">Select UPI App:</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                        <button
                          type="button"
                          key={app}
                          onClick={() => setSelectedUpiApp(app)}
                          className={`p-2 rounded-xl border text-center font-bold text-xs ${
                            selectedUpiApp === app
                              ? 'bg-white border-[#007791] text-[#007791] shadow-sm'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Enter your UPI ID / VPA:</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                    />
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-white p-3 rounded-xl border border-slate-200">
                    <QrCode className="w-4 h-4 text-[#007791]" />
                    <span>Or scan dynamic UPI QR code upon payment authorization.</span>
                  </div>
                </div>
              )}

              {/* CARD Tab Body */}
              {paymentMethod === 'CARD' && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NETBANKING Tab Body */}
              {paymentMethod === 'NETBANKING' && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-slate-700 font-semibold mb-1">Select Bank:</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* COD Tab Body */}
              {paymentMethod === 'COD' && (
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
                  <div className="font-bold text-amber-900">Doorstep Verification & Handover</div>
                  <p className="text-amber-800 text-[11px] leading-relaxed">
                    Porter courier verifies OTP at your door. You inspect the machine powering on before completing payment via UPI QR code directly on courier device.
                  </p>
                </div>
              )}

              {/* Escrow Guarantee Pill */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-2.5">
                <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] text-emerald-900 leading-snug">
                  <strong>Security Deposit Protection:</strong> Your ₹{item.securityDeposit.toLocaleString('en-IN')} deposit is held safely in escrow. It will be refunded directly to your payment source immediately upon return.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold flex items-center space-x-1 hover:bg-slate-100"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Details</span>
                </button>

                <button
                  type="button"
                  onClick={handlePayNow}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#007791] to-[#10B981] hover:from-[#005F73] hover:to-[#059669] text-white font-bold text-xs flex items-center space-x-2 shadow-md active:scale-95 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize ₹{totalAmount.toLocaleString('en-IN')}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PROCESSING SIMULATION */}
          {step === 'processing' && (
            <div className="py-14 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#007791] border-t-transparent animate-spin mx-auto"></div>
              <h4 className="text-base font-bold text-slate-900">Authorizing Payment with Escrow Lock...</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Validating transaction, locking security deposit in nodal account, and assigning nearest Porter courier for doorstep pickup.
              </p>
            </div>
          )}

          {/* STEP 4: REAL DIGITAL RECEIPT & CONFIRMATION */}
          {step === 'receipt' && completedBooking && (
            <div className="space-y-5 text-xs animate-in zoom-in-95 duration-200">
              {/* Success Badge */}
              <div className="text-center pb-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2.5 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Rental Confirmed & Payment Successful!</h3>
                <p className="text-xs text-slate-600">
                  Booking Reference: <strong className="text-[#007791] font-mono">{completedBooking.bookingId}</strong>
                </p>
              </div>

              {/* Printable Invoice Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Equipment Rented</span>
                    <span className="font-bold text-slate-900 text-sm">{completedBooking.equipment.title}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Tenure</span>
                    <span className="font-bold text-slate-900">
                      {completedBooking.tenureDays} Days ({completedBooking.startDate} to {completedBooking.endDate})
                    </span>
                  </div>
                </div>

                {/* Porter Delivery Tracker */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-[#007791] font-bold">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      <span>Porter Doorstep Delivery Dispatched</span>
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full">
                      Driver Assigned
                    </span>
                  </div>
                  <div className="text-slate-600 flex items-center justify-between text-[11px] pt-1">
                    <span>Driver: <strong>{completedBooking.porterTracking.driverName}</strong> ({completedBooking.porterTracking.driverPhone})</span>
                    <span>Vehicle: <strong>{completedBooking.porterTracking.vehicleNumber}</strong></span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-500">Handover Pickup OTP:</span>
                    <span className="font-mono font-black text-sm bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                      {completedBooking.porterTracking.pickupOtp}
                    </span>
                  </div>
                </div>

                {/* Financial Ledger Breakdown */}
                <div className="space-y-1.5 pt-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Equipment Rental Fee ({completedBooking.tenureDays} days):</span>
                    <span className="font-semibold text-slate-900">₹{completedBooking.financials.baseRent.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Lock className="w-3 h-3 text-[#007791] mr-1" />
                      Refundable Security Deposit (Held in Escrow):
                    </span>
                    <span className="font-bold text-emerald-700">₹{completedBooking.financials.securityDeposit.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Consumables + Porter Doorstep Fee:</span>
                    <span className="font-semibold text-slate-900">₹{(completedBooking.financials.consumables + completedBooking.financials.porterDelivery).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm text-slate-900">
                    <span>Total Paid Online:</span>
                    <span>₹{completedBooking.financials.totalPaid.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium">
                    * 100% of the ₹{completedBooking.financials.securityDeposit.toLocaleString('en-IN')} deposit will be refunded upon scheduled return.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Tax Invoice</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto flex-1 py-2.5 px-4 rounded-xl bg-[#0B192C] text-white font-bold hover:bg-[#1E2E45] flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <span>Done & View in My Rentals</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
