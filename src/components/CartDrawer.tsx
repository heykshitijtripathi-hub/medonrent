'use client';

import React from 'react';
import Image from 'next/image';
import {
  X, ShoppingCart, Trash2, ChevronRight,
  ShieldCheck, Lock, Zap
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const TENURE_OPTIONS = [
  { months: 1, label: '1M', discount: 0 },
  { months: 3, label: '3M', discount: 5 },
  { months: 6, label: '6M', discount: 10 },
  { months: 12, label: '12M', discount: 15 },
];

export default function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateTenure, cartTotal, cartCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-[#E53E3E]" />
            <h2 className="text-base font-black text-slate-900">My Cart</h2>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#E53E3E] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <ShoppingCart className="w-7 h-7 text-slate-300" />
              </div>
              <p className="text-slate-500 font-semibold text-sm">Your cart is empty</p>
              <p className="text-slate-400 text-xs mt-1">Browse equipment and add items to your cart</p>
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2.5 bg-[#007791] text-white text-xs font-bold rounded-xl hover:bg-[#005F73] transition-colors"
              >
                Browse Equipment
              </button>
            </div>
          ) : (
            cartItems.map((cartItem) => {
              const disc = TENURE_OPTIONS.find(t => t.months === cartItem.tenureMonths)?.discount || 0;
              const monthlyRent = Math.round(cartItem.item.monthlyRent * (1 - disc / 100));
              const totalForItem = monthlyRent * cartItem.tenureMonths;

              return (
                <div key={cartItem.item.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-3">
                  {/* Item Header */}
                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                      <Image src={cartItem.item.image} alt={cartItem.item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-slate-900 leading-snug line-clamp-2">{cartItem.item.title}</p>
                      <p className="text-[10px] text-[#007791] font-semibold mt-0.5">{cartItem.item.brand}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-sm font-black text-slate-900">₹{monthlyRent.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-slate-500">/mo</span>
                        {disc > 0 && (
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">-{disc}%</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(cartItem.item.id)}
                      className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                    </button>
                  </div>

                  {/* Tenure Selector */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 mb-1.5">Duration</p>
                    <div className="grid grid-cols-4 gap-1">
                      {TENURE_OPTIONS.map(t => (
                        <button
                          key={t.months}
                          onClick={() => updateTenure(cartItem.item.id, t.months)}
                          className={`py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                            cartItem.tenureMonths === t.months
                              ? 'bg-[#E53E3E] text-white border-[#E53E3E]'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-[#007791]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Item Summary */}
                  <div className="border-t border-slate-200 pt-2 flex justify-between text-xs">
                    <div>
                      <p className="text-slate-500">Rent ({cartItem.tenureMonths}mo)</p>
                      <p className="text-slate-500">Deposit</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">₹{totalForItem.toLocaleString('en-IN')}</p>
                      <p className="font-bold text-slate-800">₹{cartItem.item.securityDeposit.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-1.5 flex-wrap">
                    {cartItem.item.isSanitized && (
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        ✓ Sanitized
                      </span>
                    )}
                    {cartItem.item.owner.isAadhaarVerified && (
                      <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <ShieldCheck className="w-2.5 h-2.5" /> KYC Verified
                      </span>
                    )}
                    {cartItem.item.instantDispatch && (
                      <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Zap className="w-2.5 h-2.5" /> Instant
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-slate-200 px-5 py-4 space-y-3 bg-white">
            {/* Total */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Rent (all items)</span>
                <span>₹{cartItems.reduce((sum, c) => {
                  const disc = TENURE_OPTIONS.find(t => t.months === c.tenureMonths)?.discount || 0;
                  return sum + Math.round(c.item.monthlyRent * (1 - disc / 100)) * c.tenureMonths;
                }, 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Refundable Deposits</span>
                <span>₹{cartItems.reduce((sum, c) => sum + c.item.securityDeposit, 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-black text-slate-900 text-base border-t border-slate-100 pt-2 mt-2">
                <span>Total Payable</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Trust Note */}
            <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
              <Lock className="w-3.5 h-3.5 text-[#007791] flex-shrink-0" />
              <span>Deposit held in secure escrow — <strong>100% refunded</strong> on return</span>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-[#E53E3E] hover:bg-[#C53030] text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
            >
              <span>Proceed to Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
