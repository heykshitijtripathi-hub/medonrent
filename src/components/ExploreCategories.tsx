'use client';

import React from 'react';
import Image from 'next/image';

interface ExploreCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenPrescription: () => void;
}

const TOP_CATEGORIES = [
  {
    id: 'RESPIRATORY',
    title: 'Oxygen Concentrators',
    subtitle: '5L & 10L Hospital Purity',
    image: '/equipment/oxygen-concentrator.jpg',
    tag: 'Fast 90m Delivery',
  },
  {
    id: 'HOME_ICU',
    title: 'Motorized ICU Beds',
    subtitle: '3-Function with Side Rails',
    image: '/equipment/icu-bed.jpg',
    tag: 'Bedside Setup',
  },
  {
    id: 'RESPIRATORY',
    title: 'CPAP & BiPAP Devices',
    subtitle: 'Auto-Titrating Sleep Apnea',
    image: '/equipment/cpap-machine.jpg',
    tag: 'Sanitized Kit',
  },
  {
    id: 'MOBILITY',
    title: 'Electric Wheelchairs',
    subtitle: 'Joystick Powered Mobility',
    image: '/equipment/electric-wheelchair.jpg',
    tag: 'Foldable',
  },
  {
    id: 'HOME_ICU',
    title: 'Anti-Bedsore Mattresses',
    subtitle: 'Alternating Ripple Air Pump',
    image: '/equipment/air-mattress.jpg',
    tag: 'Ultra Quiet',
  },
  {
    id: 'MOBILITY',
    title: 'Rollators & Walkers',
    subtitle: 'Post-Surgery Walking Frame',
    image: '/equipment/rollator-walker.jpg',
    tag: 'With Rest Seat',
  },
];

export default function ExploreCategories({
  selectedCategory,
  onSelectCategory,
  onOpenPrescription,
}: ExploreCategoriesProps) {
  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-12 w-full">
      {/* RentoMojo-style Header with Colored Accent Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Explore <span className="text-[#007791]">our Top Categories</span>
          </h2>
          <span className="hidden sm:inline-block w-12 h-1 bg-[#007791] rounded-full"></span>
        </div>

        <button
          onClick={onOpenPrescription}
          className="text-xs font-bold text-[#007791] hover:underline flex items-center gap-1"
        >
          <span>Doctor Prescription Match</span>
          <span>→</span>
        </button>
      </div>

      {/* Main Grid: Clean, Minimalist Cards with Real Equipment Cutouts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {TOP_CATEGORIES.map((cat, idx) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={`${cat.title}-${idx}`}
              onClick={() => handleCategoryClick(cat.id)}
              className={`group bg-white rounded-2xl p-3 sm:p-4 border transition-all text-center flex flex-col items-center justify-between shadow-xs hover:shadow-clinical hover:border-[#007791]/50 ${
                isSelected
                  ? 'border-[#007791] ring-2 ring-[#007791]/20 bg-cyan-50/20'
                  : 'border-slate-200/90'
              }`}
            >
              {/* Top Tag */}
              <div className="w-full flex justify-end mb-1">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-cyan-100 group-hover:text-[#007791] transition-colors">
                  {cat.tag}
                </span>
              </div>

              {/* Product Thumbnail */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 my-1 rounded-xl overflow-hidden bg-slate-50">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Subtitle */}
              <div className="mt-2 w-full">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#007791] transition-colors truncate">
                  {cat.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
                  {cat.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
