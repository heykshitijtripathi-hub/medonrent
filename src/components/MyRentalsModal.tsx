'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Package, 
  Truck, 
  CheckCircle2, 
  RefreshCw 
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
  const [extendingBookingId, setExtendingBookingId] = useState<string | null>(null);
  const [returnProcessingId, setReturnProcessingId] = useState<string | null>(null);
  const [returnSuccessId, setReturnSuccessId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleReturnClick = (bookingId: string) => {
    setReturnProcessingId(bookingId);
    setTimeout(() => {
      setReturnProcessingId(null);
      setReturnSuccessId(bookingId);
      onReturnBooking(bookingId);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B192C] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Package className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white">My Active Rentals & Deposit Tracker</h3>
              <p className="text-[11px] text-slate-300">
                Manage active equipment, extend tenure, or request return & instant deposit refund
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-xs space-y-5">
          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Package className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">No Active Rentals Yet</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Explore our verified equipment catalog and book with 100% refundable escrow deposit protection.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-5 py-2 rounded-xl bg-[#007791] text-white font-bold text-xs hover:bg-[#005F73]"
              >
                Browse Equipment Catalog
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 hover:border-slate-300 transition-colors"
              >
                {/* Top Bar: Title & Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                      <Image
                        src={booking.equipment.image}
                        alt={booking.equipment.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#007791] uppercase tracking-wider block">
                        Booking ID: {booking.bookingId}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{booking.equipment.title}</h4>
                      <p className="text-slate-500 text-[11px]">
                        Delivering to: {booking.patientName} ({booking.patientPhone})
                      </p>
                    </div>
                  </div>

                  <div>
                    {booking.orderStatus === 'COMPLETED_REFUNDED' ? (
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Returned & Deposit Refunded</span>
                      </span>
                    ) : (
                      <span className="bg-cyan-100 text-[#007791] text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-[#007791] animate-pulse"></span>
                        <span>Active Patient Care ({booking.tenureDays} Days)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Tracking & Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Rental Dates</span>
                    <div className="font-bold text-slate-800 mt-0.5">{booking.startDate} to {booking.endDate}</div>
                    <span className="text-[10px] text-slate-500">{booking.tenureDays} days total recovery duration</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Security Deposit (Escrow)</span>
                    <div className="font-bold text-emerald-700 mt-0.5">
                      ₹{booking.financials.securityDeposit.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      {booking.orderStatus === 'COMPLETED_REFUNDED'
                        ? '100% Refunded to original UPI'
                        : 'Held safely in RBI Escrow'}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Porter Doorstep Handover</span>
                    <div className="font-bold text-slate-800 mt-0.5">Driver: {booking.porterTracking.driverName}</div>
                    <span className="text-[10px] text-slate-500">Pickup OTP: <strong className="text-slate-900 font-mono">{booking.porterTracking.pickupOtp}</strong></span>
                  </div>
                </div>

                {/* Return Success Banner */}
                {returnSuccessId === booking.bookingId && (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>
                      Return completed! ₹{booking.financials.securityDeposit.toLocaleString('en-IN')} deposit has been credited back to your payment account.
                    </span>
                  </div>
                )}

                {/* Actions: Extend or Return */}
                {booking.orderStatus !== 'COMPLETED_REFUNDED' && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
                    {extendingBookingId === booking.bookingId ? (
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-slate-700">Add duration:</span>
                        <button
                          onClick={() => {
                            onExtendBooking(booking.bookingId, 15);
                            setExtendingBookingId(null);
                          }}
                          className="px-3 py-1 rounded-lg bg-[#007791] text-white font-bold hover:bg-[#005F73]"
                        >
                          +15 Days (₹{Math.round(booking.financials.baseRent * 0.5).toLocaleString('en-IN')})
                        </button>
                        <button
                          onClick={() => {
                            onExtendBooking(booking.bookingId, 30);
                            setExtendingBookingId(null);
                          }}
                          className="px-3 py-1 rounded-lg bg-[#007791] text-white font-bold hover:bg-[#005F73]"
                        >
                          +30 Days (₹{booking.financials.baseRent.toLocaleString('en-IN')})
                        </button>
                        <button
                          onClick={() => setExtendingBookingId(null)}
                          className="px-2 py-1 text-slate-500 hover:text-slate-800"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setExtendingBookingId(booking.bookingId)}
                          className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-700 hover:bg-slate-100 flex items-center space-x-1"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-[#007791]" />
                          <span>Extend Rental Duration</span>
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => handleReturnClick(booking.bookingId)}
                      disabled={returnProcessingId === booking.bookingId}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-1.5 shadow-sm active:scale-95 disabled:opacity-75 transition-all"
                    >
                      {returnProcessingId === booking.bookingId ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Scheduling Porter & Processing Refund...</span>
                        </>
                      ) : (
                        <>
                          <Truck className="w-3.5 h-3.5" />
                          <span>Schedule Return & Get ₹{booking.financials.securityDeposit.toLocaleString('en-IN')} Deposit Refund</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
