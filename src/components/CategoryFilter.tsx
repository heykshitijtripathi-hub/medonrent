'use client';

import React from 'react';
import { 
  Wind, 
  BedDouble, 
  Accessibility, 
  LayoutGrid, 
  Sparkles, 
  Zap, 
  Navigation,
  ArrowUpDown
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sanitizedOnly: boolean;
  onToggleSanitized: () => void;
  instantOnly: boolean;
  onToggleInstant: () => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  isNearMeActive: boolean;
  onToggleNearMe: () => void;
  selectedRadiusKm: number;
  onSelectRadiusKm: (radius: number) => void;
  sortBy: 'distance' | 'price_asc' | 'price_desc' | 'rating';
  onSortChange: (sort: 'distance' | 'price_asc' | 'price_desc' | 'rating') => void;
  detectedLocalityName: string;
}

const CATEGORIES = [
  { id: 'ALL', label: 'All Equipment', icon: LayoutGrid, count: '6 Available' },
  { id: 'RESPIRATORY', label: 'Oxygen & CPAP', icon: Wind, count: '5L/10L & BiPAP' },
  { id: 'HOME_ICU', label: 'Motorized Beds', icon: BedDouble, count: '3-Func & Mattresses' },
  { id: 'MOBILITY', label: 'Wheelchairs & Rehab', icon: Accessibility, count: 'Electric & Rollators' },
];

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  sanitizedOnly,
  onToggleSanitized,
  instantOnly,
  onToggleInstant,
  maxPrice,
  onMaxPriceChange,
  isNearMeActive,
  onToggleNearMe,
  selectedRadiusKm,
  onSelectRadiusKm,
  sortBy,
  onSortChange,
  detectedLocalityName,
}: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xs border border-slate-200/90 p-3 sm:p-5 mb-8 space-y-3.5 w-full">
      {/* Row 1: Location ("Near Me") & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
        {/* Left: GPS Near Me */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleNearMe}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-all ${
              isNearMeActive
                ? 'bg-[#007791] text-white border-[#007791] shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <Navigation className={`w-3.5 h-3.5 ${isNearMeActive ? 'animate-pulse text-white' : 'text-[#007791]'}`} />
            <span>{isNearMeActive ? `Near Me (${detectedLocalityName})` : 'Find Nearest to Me'}</span>
          </button>

          {/* Distance Chips */}
          <div className="hidden xs:flex items-center space-x-1 bg-slate-50 border border-slate-200 p-0.5 rounded-xl text-xs">
            {[5, 10, 25].map((km) => (
              <button
                key={km}
                onClick={() => onSelectRadiusKm(km)}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  selectedRadiusKm === km
                    ? 'bg-[#007791] text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                &lt;{km}km
              </button>
            ))}
          </div>
        </div>

        {/* Right: Clean Sort dropdown */}
        <div className="flex items-center space-x-2 text-xs w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-slate-400 font-medium flex items-center gap-1 shrink-0">
            <ArrowUpDown className="w-3 h-3" />
            <span className="text-[11px]">Sort:</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'distance' | 'price_asc' | 'price_desc' | 'rating')}
            className="p-1.5 sm:p-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 text-xs focus:ring-1 focus:ring-[#007791]"
          >
            <option value="distance">Nearest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated (★ 4.9+)</option>
          </select>
        </div>
      </div>

      {/* Row 2: Category Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-sm ring-2 ring-[#007791]'
                  : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected ? 'bg-[#007791] text-white' : 'bg-white text-[#007791] border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {cat.label}
                  </div>
                  <div className={`text-[10px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {cat.count}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Row 3: Quick Filter Chips (Sanitized, 90-min, Price) */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center space-x-1.5">
          <button
            onClick={onToggleSanitized}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center space-x-1 transition-all ${
              sanitizedOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className={`w-3 h-3 ${sanitizedOnly ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>Hospital Sanitized</span>
          </button>

          <button
            onClick={onToggleInstant}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center space-x-1 transition-all ${
              instantOnly
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Zap className={`w-3 h-3 ${instantOnly ? 'text-amber-500' : 'text-slate-400'}`} />
            <span>90-Min Fast Dispatch</span>
          </button>
        </div>

        {/* Max Price Slider */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
          <span className="text-[11px]">Budget: ≤ ₹{maxPrice.toLocaleString('en-IN')}</span>
          <input
            type="range"
            min="1000"
            max="15000"
            step="500"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="w-16 accent-[#007791] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
