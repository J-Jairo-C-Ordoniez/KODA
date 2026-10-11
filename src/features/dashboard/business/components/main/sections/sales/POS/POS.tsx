'use client';

import { MagnifyingGlassIcon, SpinnerGapIcon, XIcon } from '@phosphor-icons/react';
import POSVariantCard from '@/features/dashboard/business/components/main/sections/sales/POS/ui/POSVariantCard';
import type { Category } from '@/features/dashboard/business/api/products.api';
import type { POSVariant } from '@/features/dashboard/business/hooks/useSalesPOS';

interface POSCatalogProps {
    categories?: Category[];
    variants?: POSVariant[];
    searchQuery?: string;
    onSearchChange: (query: string) => void;
    selectedCategory?: string | null;
    onCategorySelect?: (categoryId: string | null) => void;
    onAddToCart: (variantId: string) => void;
    isSearching?: boolean;
}

export default function POSCatalog({
    categories = [],
    variants = [],
    searchQuery = '',
    onSearchChange,
    selectedCategory = null,
    onCategorySelect,
    onAddToCart,
    isSearching = false
}: POSCatalogProps) {
    return (
        <article className="space-y-5">
            <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-primary/40">
                    {isSearching
                        ? <SpinnerGapIcon size={18} className="animate-spin" />
                        : <MagnifyingGlassIcon size={18} />
                    }
                </span>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => onSearchChange(e.target.value)}
                    placeholder="Buscar por producto, variante o SKU..."
                    className="w-full rounded-2xl border border-primary/10 bg-background py-3.5 pl-10 pr-10 text-sm font-medium leading-relaxed text-primary outline-none transition-all placeholder:text-foreground/35 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 sm:text-base"
                />
                {searchQuery && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary/40 transition-colors hover:text-primary cursor-pointer"
                        title="Limpiar búsqueda"
                    >
                        <XIcon size={18} />
                    </button>
                )}
            </div>

            <div className="custom-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-3">
                <button
                    onClick={() => onCategorySelect?.(null)}
                    className={`rounded-full px-4 py-2 text-sm font-medium leading-relaxed transition-all cursor-pointer whitespace-nowrap ${selectedCategory === null
                        ? 'bg-primary text-background shadow-xs'
                        : 'bg-foreground-muted/40 hover:bg-foreground-muted/60 text-primary/70'
                        }`}
                >
                    {searchQuery ? 'Resultados' : 'Top Ventas'}
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.categoryId}
                        onClick={() => onCategorySelect?.(cat.categoryId)}
                        className={`rounded-full px-4 py-2 text-sm font-medium leading-relaxed transition-all cursor-pointer whitespace-nowrap ${selectedCategory === cat.categoryId
                            ? 'bg-primary text-background shadow-xs'
                            : 'bg-foreground-muted/40 hover:bg-foreground-muted/60 text-primary/70'
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {variants.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16 p-8">
                    <h4 className="text-lg font-medium text-primary tracking-tight">
                        {searchQuery ? 'Sin resultados' : 'Catálogo vacío'}
                    </h4>
                    <p className="text-sm text-primary/60 leading-relaxed max-w-md my-2">
                        {searchQuery
                            ? `No hay variantes que coincidan con "${searchQuery}". Intenta con otro término o SKU.`
                            : 'Agrega productos desde la sección de Catálogo para verlos aquí.'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {variants.map(variant => (
                        <POSVariantCard
                            key={variant.variantId}
                            variant={variant}
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </div>
            )}
        </article>
    );
}
