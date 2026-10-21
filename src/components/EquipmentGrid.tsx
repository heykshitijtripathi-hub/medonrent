'use client';

import React from 'react';
import EquipmentCard from './EquipmentCard';
import { EquipmentItem } from '@/data/initialEquipment';
import { Search, RefreshCcw } from 'lucide-react';

interface EquipmentGridProps {
  items: EquipmentItem[];
  onSelectItem: (item: EquipmentItem) => void;
  onQuickView: (item: EquipmentItem) => void;
  onResetFilters: () => void;
  selectedCity: string;
}

export default function EquipmentGrid({
  items,
  onSelectItem,
  onQuickView,
  onResetFilters,
  selectedCity,
}: EquipmentGridProps) {
  return (
    <section id="catalog-section" className="scroll-mt-24 mb-16">
      {/* Header & Item Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Verified Equipment in {selectedCity}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-[#007791]">
              {items.length} Units Available
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Inspected with video proof of life • 100% Escrow deposit hold • Doorstep delivery
          </p>
        </div>
      </div>

      {/* Grid or Empty State */}
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">No equipment matches your filters</h3>
          <p className="text-xs text-slate-500 mb-6">
            Try adjusting your search keyword, category, or expanding to all cities.
          </p>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl bg-[#007791] text-white text-xs font-semibold inline-flex items-center space-x-1.5 hover:bg-[#005F73] transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <EquipmentCard
              key={item.id}
              item={item}
              onSelect={onSelectItem}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}
    </section>
  );
}
