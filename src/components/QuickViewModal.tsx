'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X, Star, MapPin, ShieldCheck, Sparkles, Lock,
  ShoppingCart, Heart, Clock, Zap, CheckCircle2, Package
} from 'lucide-react';
import { EquipmentItem } from '@/data/initialEquipment';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  item: EquipmentItem | null;
  onClose: () => void;
  onViewFull: (item: EquipmentItem) => void;
}

const TENURE_OPTIONS = [
  { months: 1, label: '1 Month', discount: 0 },
  { months: 3, label: '3 Months', discount: 5 },
  { months: 6, label: '6 Months', discount: 10 },
  { months: 12, label: '12 Months', discount: 15 },
];

const CONDITION_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  'Like New': { label: 'Brand New', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  'Gently Used': { label: 'Good', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  'Certified Refurbished': { label: 'Fair', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
};

export default function QuickViewModal({ item, onClose, onViewFull }: QuickViewModalProps) {
  const [selectedTenure, setSelectedTenure] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    if (item) {
      setSelectedTenure(1);
      setAddedToCart(false);
      const inCart = cartItems.some(c => c.item.id === item.id);
      setAddedToCart(inCart);
    }
  }, [item, cartItems]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!item) return null;

  const tenureOption = TENURE_OPTIONS.find(t => t.months === selectedTenure) || TENURE_OPTIONS[0];
  const discountedRent = Math.round(item.monthlyRent * (1 - tenureOption.discount / 100));
  const totalRent = discountedRent * selectedTenure;
  const savingsPct = Math.round(((item.originalPrice - item.monthlyRent) / item.originalPrice) * 100);
  const cond = CONDITION_CONFIG[item.condition] || CONDITION_CONFIG['Gently Used'];

  const handleAddToCart = () => {
    addToCart(item, selectedTenure);
    setAddedToCart(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-slate-100 rounded-full flex items-center justify-center shadow-md transition-colors"
        >
          <X className="w-4 h-4 text-slate-700" />
        </button>

        {/* Left: Image */}
        <div className="relative w-full md:w-[45%] h-56 md:h-auto bg-slate-100 flex-shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
          {/* Condition Badge */}
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold border ${cond.bg} ${cond.color} ${cond.border}`}>
            {cond.label}
          </div>
          {/* Wishlist */}
          <button
            onClick={() => setWishlist(!wishlist)}
            className={`absolute top-3 right-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${wishlist ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-400 hover:text-red-400'}`}
          >
            <Heart className={`w-4 h-4 ${wishlist ? 'fill-white' : ''}`} />
          </button>
          {/* Sanitized */}
          {item.isSanitized && (
            <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-emerald-950/80 text-emerald-300 px-2.5 py-1 rounded-lg text-xs font-semibold border border-emerald-500/30">
              <Sparkles className="w-3 h-3" />
              <span>Hospital Sanitized</span>
            </div>
          )}
          {item.instantDispatch && (
            <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-amber-500/90 text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
              <Zap className="w-3 h-3 fill-white" />
              <span>Instant</span>
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">

          {/* Brand + Rating */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#007791]">{item.brand}</span>
            <div className="flex items-center space-x-1 text-xs text-slate-600">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-bold">{item.owner.rating}</span>
              <span className="text-slate-400">({item.owner.completedRentals} rentals)</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">{item.title}</h2>

          {/* Location */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-[#007791]" />
            <span>{item.locality}</span>
            <span className="text-slate-300">•</span>
            <span>{item.distanceKm} km away</span>
          </div>

          {/* Price + Savings */}
          <div className="flex items-baseline gap-3 flex-wrap">
            <div>
              <span className="text-2xl font-black text-slate-900">₹{discountedRent.toLocaleString('en-IN')}</span>
              <span className="text-sm text-slate-500 font-medium">/month</span>
            </div>
            {tenureOption.discount > 0 && (
              <span className="text-xs text-slate-400 line-through">₹{item.monthlyRent.toLocaleString('en-IN')}/mo</span>
            )}
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              -{tenureOption.discount > 0 ? `${tenureOption.discount}% off` : `Saves ${savingsPct}% vs Buy`}
            </span>
          </div>

          {/* Tenure Selector */}
          <div>
            <p className="text-xs font-bold text-slate-600 mb-2">Select Duration</p>
            <div className="grid grid-cols-4 gap-1.5">
              {TENURE_OPTIONS.map((t) => (
                <button
                  key={t.months}
                  onClick={() => setSelectedTenure(t.months)}
                  className={`py-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center ${
                    selectedTenure === t.months
                      ? 'bg-[#E53E3E] text-white border-[#E53E3E] shadow-md'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#007791]'
                  }`}
                >
                  <span>{t.months}mo</span>
                  {t.discount > 0 && (
                    <span className={`text-[9px] font-bold ${selectedTenure === t.months ? 'text-white/80' : 'text-emerald-600'}`}>
                      -{t.discount}%
                    </span>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Total: <span className="font-bold text-slate-800">₹{totalRent.toLocaleString('en-IN')}</span> for {selectedTenure} month{selectedTenure > 1 ? 's' : ''}
            </p>
          </div>

          {/* Condition + Product Condition Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-600">Condition:</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${cond.bg} ${cond.color} ${cond.border}`}>
              {cond.label}
            </span>
            <span className="text-[10px] text-slate-400">• Inspected &amp; verified</span>
          </div>

          {/* Deposit */}
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-[#007791]" />
              <div>
                <p className="font-bold text-slate-800">100% Refundable Deposit</p>
                <p className="text-slate-500">Held in secure escrow</p>
              </div>
            </div>
            <span className="font-black text-slate-900 text-sm">₹{item.securityDeposit.toLocaleString('en-IN')}</span>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-1.5">
            {item.features.slice(0, 4).map((f, i) => (
              <div key={i} className="flex items-start space-x-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* Owner */}
          <div className="flex items-center justify-between py-2 px-3 bg-slate-50 border border-slate-100 rounded-xl text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-[#0B192C] text-cyan-300 flex items-center justify-center text-[10px] font-bold">
                {item.owner.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800">{item.owner.name}</p>
                <p className="text-slate-500">{item.owner.roleDesc}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-[10px]">
              {item.owner.isAadhaarVerified && (
                <span className="flex items-center text-emerald-600 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 mr-0.5" /> Aadhaar KYC
                </span>
              )}
            </div>
          </div>

          {/* Delivery */}
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-[#007791]" />
            <span>Responds in {item.owner.responseTime} • 1-3 days delivery</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => { onViewFull(item); onClose(); }}
              className="flex-1 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center space-x-1.5"
            >
              <Package className="w-4 h-4" />
              <span>View More Details</span>
            </button>
            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all ${
                addedToCart
                  ? 'bg-emerald-500 text-white cursor-default'
                  : 'bg-[#E53E3E] hover:bg-[#C53030] text-white shadow-md active:scale-[0.98]'
              }`}
            >
              {addedToCart ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
