'use client';

import React from 'react';
import { 
  Wind, 
  BedDouble, 
  Accessibility, 
  LayoutGrid, 
  Sparkles, 
  Zap, 
  Filter,
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
  // Near Me & Location Tracker Props
  isNearMeActive: boolean;
  onToggleNearMe: () => void;
  selectedRadiusKm: number;
  onSelectRadiusKm: (radius: number) => void;
  sortBy: 'distance' | 'price_asc' | 'price_desc' | 'rating';
  onSortChange: (sort: 'distance' | 'price_asc' | 'price_desc' | 'rating') => void;
  detectedLocalityName: string;
}

const CATEGORIES = [
  { id: 'ALL', label: 'All Equipment', icon: LayoutGrid, count: '6+ Units' },
  { id: 'RESPIRATORY', label: 'Oxygen & BiPAP', icon: Wind, count: '5L/10L & CPAP' },
  { id: 'HOME_ICU', label: 'Motorized ICU Beds', icon: BedDouble, count: '3-Func & Mattresses' },
  { id: 'MOBILITY', label: 'Mobility & Rehab', icon: Accessibility, count: 'Electric Wheelchairs' },
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
    <div className="bg-white rounded-3xl shadow-clinical border border-slate-200/80 p-4 sm:p-5 mb-8 space-y-4">
      {/* Top Bar: Location Tracker ("Near Me") & Sorting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        {/* Left: GPS Location Tracker */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onToggleNearMe}
            className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-all shadow-sm active:scale-95 ${
              isNearMeActive
                ? 'bg-[#007791] text-white border-[#007791] ring-2 ring-[#007791]/20'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
            }`}
          >
            <Navigation className={`w-3.5 h-3.5 ${isNearMeActive ? 'animate-pulse text-white' : 'text-[#007791]'}`} />
            <span>{isNearMeActive ? `📍 Near Me (${detectedLocalityName})` : '📍 Find Equipment Near Me'}</span>
          </button>

          {/* Distance Radius Buttons */}
          <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 p-1 rounded-xl text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-1.5 hidden sm:inline">Radius:</span>
            {[3, 5, 10, 25].map((km) => (
              <button
                key={km}
                onClick={() => onSelectRadiusKm(km)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedRadiusKm === km
                    ? 'bg-[#007791] text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                &lt; {km} km
              </button>
            ))}
          </div>
        </div>

        {/* Right: Sort By Selector */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort:</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'distance' | 'price_asc' | 'price_desc' | 'rating')}
            className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-[#007791]/30"
          >
            <option value="distance">Nearest to Me (Fastest Porter Delivery)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated Owners (★ 4.9+)</option>
          </select>
        </div>
      </div>

      {/* Second Row: Quick Filter Toggles & Max Price */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <Filter className="w-3.5 h-3.5 text-[#007791]" />
          <span>Category & Quality</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Max Price Slider */}
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-slate-500 font-medium">Max Rent: ₹{maxPrice.toLocaleString('en-IN')}</span>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="w-20 accent-[#007791] cursor-pointer"
            />
          </div>

          {/* Sanitized Only */}
          <button
            onClick={onToggleSanitized}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center space-x-1.5 transition-all ${
              sanitizedOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${sanitizedOnly ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>Hospital-Sanitized Only</span>
            {sanitizedOnly && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
          </button>

          {/* Instant Dispatch */}
          <button
            onClick={onToggleInstant}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center space-x-1.5 transition-all ${
              instantOnly
                ? 'bg-amber-50 border-amber-300 text-amber-800 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${instantOnly ? 'text-amber-500' : 'text-slate-400'}`} />
            <span>Immediate 90-Min Dispatch</span>
            {instantOnly && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
          </button>
        </div>
      </div>

      {/* Main Categories Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-[#0B192C] to-[#1E2E45] text-white border-[#0B192C] shadow-md ring-2 ring-[#007791]'
                  : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`p-2 rounded-xl ${
                    isSelected ? 'bg-[#007791] text-white' : 'bg-white text-[#007791] border border-slate-200 shadow-sm'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {isSelected && (
                  <span className="text-[10px] font-bold bg-[#10B981] text-slate-900 px-2 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>
              <div className="mt-2.5">
                <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {cat.label}
                </div>
                <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {cat.count}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
