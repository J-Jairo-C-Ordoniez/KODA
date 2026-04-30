'use client';

import { FilterDropdown } from './FilterDropdown';
import { SlidersHorizontal, X } from 'lucide-react';
import { useCatalogFilters } from '@/hooks/publicCatalog/useCatalogFilters';

export default function FilterBar({ tenantId }: { tenantId?: string }) {
  const { 
    colorOptions, 
    categoryOptions, 
    handleFilterChange, 
    clearFilters, 
    hasFilters,
    currentParams 
  } = useCatalogFilters(tenantId);

  return (
    <section className="w-full border-y border-foreground/5 py-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest border-r border-foreground/10 pr-6 mr-2">
            <SlidersHorizontal size={14} />
            Filtros
          </div>

          <div className="flex items-center gap-6">
            <FilterDropdown
              title="Categoría"
              options={categoryOptions}
              onSelect={(val) => handleFilterChange('category', val)}
              selectedValue={currentParams.category}
            />

            <FilterDropdown
              title="Color"
              options={colorOptions}
              onSelect={(val) => handleFilterChange('color', val)}
              selectedValue={currentParams.color}
            />
            
            <FilterDropdown
              title="Género"
              options={[
                { id: 'hombre', name: 'Hombre' },
                { id: 'mujer', name: 'Mujer' },
                { id: 'mixto', name: 'Unisex' }
              ]}
              onSelect={(val) => handleFilterChange('gender', val)}
              selectedValue={currentParams.gender}
            />
          </div>
        </div>

        {hasFilters && (
          <button 
            onClick={clearFilters}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary hover:text-red-500 transition-colors"
          >
            <X size={14} />
            Limpiar filtros
          </button>
        )}
      </div>
    </section>
  );
}
