'use client';

import { X, SlidersHorizontal } from 'lucide-react';
import FilterDropdown from '@/features/store/components/main/sections/catalog/main/ui/FilterDropdown';

interface Props {
  categories: any[];
  currentCategory: string;
  onFilterChange: (key: string, val: string) => void;
}

export default function FilterBar({ categories, currentCategory, onFilterChange }: Props) {
  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.name.toLowerCase(),
  }));

  return (
    <section className="w-full py-2">
      <div className="px-10 md:px-40 h-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-primary/40">
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            <span className="text-xs font-medium text-primary/60">Filtros</span>
          </div>

          {currentCategory && (
            <button
              onClick={() => onFilterChange('category', '')}
              className="flex items-center gap-1.5 text-xs font-medium text-primary/70 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/8 transition-all cursor-pointer"
            >
              <span>{currentCategory}</span>
              <X size={12} strokeWidth={2} />
            </button>
          )}
        </div>

        <FilterDropdown
          title="Categorías"
          options={categoryOptions}
          selectedValue={currentCategory}
          onSelect={(val) => onFilterChange('category', val)}
        />
      </div>
    </section>
  );
}
