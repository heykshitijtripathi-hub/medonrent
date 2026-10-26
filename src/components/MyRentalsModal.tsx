'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Package, 
  Truck, 
  RefreshCw,
  Clock,
  ShieldCheck,
  Star,
  MapPin
} from 'lucide-react';
import { CompletedBooking } from './CheckoutModal';

interface MyRentalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: CompletedBooking[];
  onExtendBooking: (bookingId: string, additionalDays: number) => void;
  onReturnBooking: (bookingId: string) => void;
}

export default function MyRentalsModal({
  isOpen,
  onClose,
  bookings,
  onExtendBooking,
  onReturnBooking,
}: MyRentalsModalProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'refunds' | 'addresses'>('active');
  const [extendingBookingId, setExtendingBookingId] = useState<string | null>(null);
  const [returnProcessingId, setReturnProcessingId] = useState<string | null>(null);
  const [reviewedBookings, setReviewedBookings] = useState<Record<string, number>>({});

  if (!isOpen) return null;

  const handleReturnClick = (bookingId: string) => {
    setReturnProcessingId(bookingId);
    setTimeout(() => {
      setReturnProcessingId(null);
      onReturnBooking(bookingId);
    }, 1200);
  };

  const handleRateBooking = (bookingId: string, stars: number) => {
    setReviewedBookings(prev => ({ ...prev, [bookingId]: stars }));
  };

  const activeBookings = bookings.filter(b => b.orderStatus !== 'Completed' && b.orderStatus !== 'COMPLETED_REFUNDED');
  const pastBookings = bookings.filter(b => b.orderStatus === 'Completed' || b.orderStatus === 'COMPLETED_REFUNDED');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B192C] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-400/20 text-cyan-200 px-2 py-0.5 rounded-full">
                  Buyer Dashboard (Guide Section 4 & 6)
                </span>
                <span className="text-[11px] text-slate-300">Renter Hub</span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Active Rentals, Delivery Tracking & Deposit Refunds
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div className="px-6 bg-slate-50 border-b border-slate-200 flex items-center space-x-2 py-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'active'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Active Rentals ({activeBookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'history'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Order History ({pastBookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('refunds')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'refunds'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Deposit Refunds</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'addresses'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Saved Delivery Addresses</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs space-y-5">
          
          {/* TAB 1: ACTIVE RENTALS */}
          {activeTab === 'active' && (
            <div className="space-y-4">
              {activeBookings.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                  <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <h4 className="font-bold text-slate-700 text-sm">No Active Rentals Right Now</h4>
                  <p className="text-slate-500 text-xs mt-1 max-w-xs mx-auto">
                    Browse verified equipment with plain-English pricing and 100% refundable deposit protection.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-5 py-2 rounded-xl bg-[#007791] text-white font-bold text-xs"
                  >
                    Browse Equipment Catalog
                  </button>
                </div>
              ) : (
                activeBookings.map((booking) => (
                  <div
                    key={booking.bookingId}
                    className="bg-white border-2 border-slate-200 hover:border-[#007791]/50 rounded-2xl p-5 space-y-4 transition-all shadow-xs"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image src={booking.equipment.image} alt={booking.equipment.title} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#007791]">
                              Order #{booking.bookingId}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[10px] text-slate-500">Booked via Razorpay</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm">{booking.equipment.title}</h4>
                          <span className="text-[11px] text-slate-500">
                            Delivering to: {booking.patientName} • {booking.deliveryAddress}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                          <span>Active Care ({booking.tenureDays} Days)</span>
                        </span>
                      </div>
                    </div>

                    {/* 11-Step Official Guide Tracking Pipeline */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <div className="text-[11px] font-bold text-slate-700 mb-2 flex items-center justify-between">
                        <span>Order Lifecycle Status (Guide Section 10)</span>
                        <span className="text-[10px] text-[#007791]">Courier Driver: {booking.porterTracking.driverName}</span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 text-center text-[10px]">
                        {[
                          { label: 'Confirmed', done: true },
                          { label: 'Processing', done: true },
                          { label: 'Shipped', done: true },
                          { label: 'Delivered', done: true },
                          { label: 'Active Care', done: true, current: true },
                          { label: 'Return Req.', done: false },
                          { label: 'Inspected', done: false },
                        ].map((st, i) => (
                          <div
                            key={i}
                            className={`p-1.5 rounded-lg border font-bold ${
                              st.current
                                ? 'bg-[#007791] text-white border-[#007791]'
                                : st.done
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : 'bg-white text-slate-400 border-slate-200'
                            }`}
                          >
                            <div>{i + 1}. {st.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detail Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Rental Dates</span>
                        <div className="font-bold text-slate-800 mt-0.5">{booking.startDate} – {booking.endDate}</div>
                        <span className="text-[10px] text-slate-500">{booking.tenureDays} Days recovery duration</span>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Refundable Security Deposit</span>
                        <div className="font-bold text-emerald-700 font-mono text-sm mt-0.5">
                          ₹{booking.financials.refundableDeposit}
                        </div>
                        <span className="text-[10px] text-emerald-600 font-medium">
                          Held in RBI Escrow • 100% refunded post-inspection
                        </span>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Handover Verification OTPs</span>
                        <div className="font-bold text-slate-800 mt-0.5">
                          Delivery: <strong className="font-mono text-slate-900">{booking.porterTracking.pickupOtp}</strong> • Return: <strong className="font-mono text-slate-900">{booking.porterTracking.returnOtp}</strong>
                        </div>
                        <span className="text-[10px] text-slate-500">Provide to driver at doorstep</span>
                      </div>
                    </div>

                    {/* Actions: Request Return (Step 10) or Extend */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      {extendingBookingId === booking.bookingId ? (
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-700">Extend tenure:</span>
                          <button
                            onClick={() => {
                              onExtendBooking(booking.bookingId, 5);
                              setExtendingBookingId(null);
                            }}
                            className="px-3 py-1 rounded-lg bg-[#007791] text-white font-bold"
                          >
                            +5 Days (₹{booking.financials.buyerDailyRate * 5})
                          </button>
                          <button
                            onClick={() => {
                              onExtendBooking(booking.bookingId, 15);
                              setExtendingBookingId(null);
                            }}
                            className="px-3 py-1 rounded-lg bg-[#007791] text-white font-bold"
                          >
                            +15 Days (₹{booking.financials.buyerDailyRate * 15})
                          </button>
                          <button
                            onClick={() => setExtendingBookingId(null)}
                            className="text-slate-400 hover:text-slate-600 px-2"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setExtendingBookingId(booking.bookingId)}
                          className="px-3.5 py-2 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-[#007791]" />
                          <span>Extend Rental Duration</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleReturnClick(booking.bookingId)}
                        disabled={returnProcessingId === booking.bookingId}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-2 shadow-xs transition-all disabled:opacity-50"
                      >
                        {returnProcessingId === booking.bookingId ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Scheduling Courier Pickup...</span>
                          </>
                        ) : (
                          <>
                            <Truck className="w-4 h-4" />
                            <span>Step 10: Request Return & Get ₹{booking.financials.refundableDeposit} Deposit Refund</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: ORDER HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {pastBookings.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                  <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <h4 className="font-bold text-slate-700 text-xs">No Past Completed Rentals</h4>
                  <p className="text-slate-500 text-[11px] mt-0.5">Completed rentals will be archived here with digital receipts.</p>
                </div>
              ) : (
                pastBookings.map((b) => (
                  <div key={b.bookingId} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <div>
                        <span className="font-bold text-slate-900">{b.equipment.title}</span>
                        <span className="text-[11px] text-slate-500 block">Order #{b.bookingId} • {b.startDate} to {b.endDate}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Returned & Inspected
                      </span>
                    </div>

                    {/* Review & Rating (Guide Step 12) */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="font-bold text-slate-800 block text-xs">Rate your experience with this equipment:</span>
                        <span className="text-[11px] text-slate-500">Your review helps future families in medical need.</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRateBooking(b.bookingId, star)}
                            className="p-1 text-amber-400 hover:scale-110 transition-transform"
                          >
                            <Star 
                              className={`w-5 h-5 ${
                                (reviewedBookings[b.bookingId] || 5) >= star 
                                  ? 'fill-amber-400 text-amber-400' 
                                  : 'text-slate-300'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: DEPOSIT REFUNDS */}
          {activeTab === 'refunds' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>How Security Deposit Refunds Work (Guide Section 6)</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Every deposit is held in a segregated escrow account. Upon return pickup, the admin inspects the equipment for operational integrity. If clean and undamaged, 100% of the deposit is refunded straight back to your original payment method within 24 hours.
                </p>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-700 grid grid-cols-12">
                  <div className="col-span-4">Equipment</div>
                  <div className="col-span-3">Deposit Amount</div>
                  <div className="col-span-3">Inspection Status</div>
                  <div className="col-span-2 text-right">Refund Action</div>
                </div>
                <div className="divide-y divide-slate-100 text-xs bg-white">
                  {bookings.map((b) => (
                    <div key={b.bookingId} className="px-4 py-3 grid grid-cols-12 items-center">
                      <div className="col-span-4 font-semibold text-slate-800 truncate">{b.equipment.title}</div>
                      <div className="col-span-3 font-mono font-bold text-slate-900">₹{b.financials.refundableDeposit}</div>
                      <div className="col-span-3">
                        {b.orderStatus === 'Completed' || b.orderStatus === 'COMPLETED_REFUNDED' ? (
                          <span className="text-emerald-700 font-bold">✓ Cleared & 100% Refunded</span>
                        ) : (
                          <span className="text-blue-700 font-medium">Active in Escrow</span>
                        )}
                      </div>
                      <div className="col-span-2 text-right text-[11px] text-slate-500">
                        {b.orderStatus === 'Completed' ? 'UTR Credited' : 'Pending Return'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#007791] mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Primary Home Care Address (Default)</span>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Flat 302, DLF Phase 2, Gurugram, Delhi NCR - 122002
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Contact: Smt. Kamla Verma (+91 98110 49281)</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-[#007791] text-[10px] font-bold">
                  Verified Pincode
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
