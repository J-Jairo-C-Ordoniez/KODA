'use client';

import { Search, X, Loader2 } from 'lucide-react';
import POSVariantCard from '@/features/dashboard/business/components/main/sections/sales/POS/ui/POSVariantCard';
import type { Category } from '@/features/dashboard/business/api/products.api';
import type { POSVariant } from '@/features/dashboard/business/hooks/useSalesPOS';

interface POSCatalogProps {
    categories: Category[];
    variants: POSVariant[];
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: string | null;
    onCategorySelect: (categoryId: string | null) => void;
    onAddToCart: (variantId: string) => void;
    isSearching?: boolean;
}

export default function POSCatalog({ categories, variants, searchQuery, onSearchChange, selectedCategory, onCategorySelect, onAddToCart, isSearching }: POSCatalogProps) {
    return (
        <article className="space-y-5">
            <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/40">
                    {isSearching
                        ? <Loader2 size={18} className="animate-spin" />
                        : <Search size={18} />
                    }
                </span>
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
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary/40 hover:text-primary transition-colors cursor-pointer"
                        title="Limpiar búsqueda"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                    onClick={() => onCategorySelect(null)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${selectedCategory === null
                        ? 'bg-primary text-background shadow-xs'
                        : 'bg-foreground-muted/40 hover:bg-foreground-muted/60 text-primary/70'
                        }`}
                >
                    {searchQuery ? 'Resultados' : 'Top Ventas'}
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.categoryId}
                        onClick={() => onCategorySelect(cat.categoryId)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${selectedCategory === cat.categoryId
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
