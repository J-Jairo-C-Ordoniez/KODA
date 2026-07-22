'use client';

import { Search, X, PackageSearch } from 'lucide-react';
import type { Category } from '@/features/dashboard/business/api/products.api';
import SalesVariantCard from './SalesVariantCard';

interface POSCatalogProps {
  categories: Category[];
  variants: any[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onAddToCart: (variantId: string) => void;
  onEditVariant?: (variant: any) => void;
  onDeleteVariant?: (variantId: string) => void;
}

export default function POSCatalog({
  categories,
  variants,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  onAddToCart,
  onEditVariant,
  onDeleteVariant,
}: POSCatalogProps) {
  return (
    <div className="space-y-5">
      {/* Search & Category Pills */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary/40">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Buscar por producto, variante o SKU..."
            className="w-full pl-10 pr-10 py-3 bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-2xl text-sm font-medium text-primary outline-none transition-all placeholder:text-primary/40"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-primary/40 hover:text-primary transition-colors cursor-pointer"
              title="Limpiar búsqueda"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
          <button
            onClick={() => onCategorySelect(null)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === null
                ? 'bg-primary text-background shadow-xs'
                : 'bg-foreground-muted/40 hover:bg-foreground-muted/60 text-primary/70'
            }`}
          >
            Todos los productos
          </button>
          {categories.map(cat => (
            <button
              key={cat.categoryId}
              onClick={() => onCategorySelect(cat.categoryId)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.categoryId
                  ? 'bg-primary text-background shadow-xs'
                  : 'bg-foreground-muted/40 hover:bg-foreground-muted/60 text-primary/70'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Variants Grid */}
      {variants.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 bg-background-card border border-primary/8 rounded-2xl p-8">
          <div className="w-14 h-14 rounded-2xl bg-foreground-muted/40 text-primary/40 flex items-center justify-center mb-4">
            <PackageSearch size={32} />
          </div>
          <h4 className="text-base font-bold text-primary">No se encontraron productos</h4>
          <p className="text-xs text-primary/55 mt-1 max-w-sm">
            {searchQuery
              ? `No hay variantes que coincidan con "${searchQuery}". Intenta con otro término o SKU.`
              : 'Selecciona otra categoría o agrega productos desde el catálogo.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {variants.map(variant => (
            <SalesVariantCard
              key={variant.variantId}
              variant={variant}
              onAddToCart={onAddToCart}
              onEditVariant={onEditVariant}
              onDeleteVariant={onDeleteVariant}
            />
          ))}
        </div>
      )}
    </div>
  );
}
