'use client';

import { SlidersHorizontal, X } from 'lucide-react';
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
    <section className="px-10 md:px-40 w-full border-b border-foreground/10 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="text-gray-500 text-sm max-w-2xl flex gap-2">
            <SlidersHorizontal size={24} />
            <span>Filtros</span>
          </div>

          <FilterDropdown
            title="Categorías"
            options={categoryOptions}
            selectedValue={currentCategory}
            onSelect={(val) => onFilterChange('category', val)}
          />
        </div>
      </div>
    </section>
  );
}
