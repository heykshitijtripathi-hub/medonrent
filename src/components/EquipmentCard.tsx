'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Star, 
  ChevronRight, 
  Lock,
  ShoppingCart,
  Eye,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { EquipmentItem } from '@/data/initialEquipment';
import { useCart } from '@/context/CartContext';

interface EquipmentCardProps {
  item: EquipmentItem;
  onSelect: (item: EquipmentItem) => void;
  onQuickView: (item: EquipmentItem) => void;
}

const CONDITION_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  'Like New':             { label: 'Brand New', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  'Gently Used':          { label: 'Good',       color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-200' },
  'Certified Refurbished':{ label: 'Fair',        color: 'text-amber-700',  bg: 'bg-amber-50 border-amber-200' },
};

export default function EquipmentCard({ item, onSelect, onQuickView }: EquipmentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.some(c => c.item.id === item.id);

  const cond = CONDITION_CONFIG[item.condition] || CONDITION_CONFIG['Gently Used'];
  const dailyPrice = item.dailyRent || Math.round(item.monthlyRent / 30);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1);
  };

  return (
    <div
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-clinical hover:border-[#007791]/50 transition-all duration-300 flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image & Overlay Badges */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
          <div className="flex items-center space-x-1.5 px-2 py-1 rounded-md bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-sm border border-slate-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span>{item.categoryLabel}</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
              LIVE
            </span>
          </div>
        </div>

        {/* Condition Badge */}
        <div className={`absolute top-10 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${cond.bg} ${cond.color}`}>
          {cond.label}
        </div>

        {/* Quick View Overlay */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all">
            <button
              onClick={(e) => { e.stopPropagation(); onQuickView(item); }}
              className="flex items-center space-x-2 bg-white text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xl hover:bg-slate-50 transition-colors"
            >
              <Eye className="w-4 h-4 text-[#007791]" />
              <span>Quick View</span>
            </button>
          </div>
        )}

        {/* Bottom Image Overlay: Location & Sanitization */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white font-medium">
          <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
            <MapPin className="w-3 h-3 text-cyan-300" />
            <span className="truncate max-w-[150px]">{item.locality}</span>
            <span className="text-slate-300">({item.distanceKm} km)</span>
          </div>
          {item.isSanitized && (
            <div className="flex items-center space-x-1 bg-emerald-950/70 backdrop-blur-md text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Sanitized</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-[#007791] tracking-wide uppercase text-[10px]">
              {item.brand}
            </span>
            <div className="flex items-center space-x-1 text-slate-600 font-medium">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{item.owner.rating}</span>
              <span className="text-slate-400">({item.owner.completedRentals} rentals)</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#007791] transition-colors">
            {item.title}
          </h3>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {Object.entries(item.specs).slice(0, 2).map(([key, val]) => (
              <div key={key} className="bg-slate-50 border border-slate-100 rounded-lg p-1.5 text-[11px]">
                <span className="text-slate-400 block text-[9px] uppercase font-semibold">{key}</span>
                <span className="font-bold text-slate-700 truncate block">{val}</span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex items-center space-x-2 text-[10px] text-slate-500 mb-3">
            <span className="flex items-center text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <FileCheck className="w-3 h-3 mr-1" />
              Invoice Verified
            </span>
            <span className="flex items-center text-slate-600 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
              No Date Clash
            </span>
          </div>
        </div>

        {/* Pricing with Plain-English Daily Rate Highlight */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-1">
            <div>
              <span className="text-xl font-black text-slate-900 font-mono">
                ₹{dailyPrice}
              </span>
              <span className="text-xs text-[#007791] font-bold"> /day</span>
              <span className="text-[11px] text-slate-400 ml-1.5">or ₹{item.monthlyRent.toLocaleString('en-IN')}/mo</span>
            </div>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
              5-Day Min
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
            <span className="flex items-center text-slate-500">
              <Lock className="w-3 h-3 text-[#007791] mr-1" />
              Refundable Deposit: ₹{item.securityDeposit}
            </span>
            <span className="text-emerald-700 font-semibold">100% Escrow</span>
          </div>

          {/* Owner summary */}
          <div className="flex items-center justify-between text-[11px] py-1.5 px-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-3">
            <div className="flex items-center space-x-1.5 truncate">
              <div className="w-5 h-5 rounded-full bg-[#0B192C] text-cyan-300 flex items-center justify-center text-[10px] font-bold">
                {item.owner.name.charAt(0)}
              </div>
              <span className="font-semibold text-slate-800 truncate">{item.owner.name}</span>
            </div>
            {item.owner.isAadhaarVerified && (
              <span className="flex items-center text-[#059669] font-bold text-[10px] shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 mr-0.5" />
                ID Verified
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onSelect(item)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0B192C] to-[#1E2E45] hover:from-[#007791] hover:to-[#005F73] text-white font-semibold text-xs shadow-sm flex items-center justify-center space-x-1 transition-all active:scale-[0.98]"
            >
              <span>View & Rent</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleAddToCart}
              title={inCart ? 'In cart' : 'Add to cart'}
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-[0.95] border ${
                inCart
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  : 'bg-[#E53E3E] border-[#E53E3E] text-white hover:bg-[#C53030]'
              }`}
            >
              {inCart ? <CheckCircle2 className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
