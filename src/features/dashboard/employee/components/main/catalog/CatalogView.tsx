'use client';

import { useMemo, useState } from 'react';
import { Search, Package, AlertCircle } from 'lucide-react';
import EmployeeHeader from '@/features/dashboard/employee/components/header/Header';
import { useProductsStore } from '@/store/useProductsStore';
import Loader from '@/shared/components/Loader';
import { formatCurrency } from '@/lib/formatters';

export default function CatalogView() {
  const { products, categories, isLoading } = useProductsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allVariants = useMemo(() => {
    return products.flatMap((product) =>
      (product.variants || []).map((variant) => ({
        ...variant,
        productName: product.name,
        categoryName: categories.find((c) => c.categoryId === product.categoryId)?.name || 'General',
        gender: product.gender,
      }))
    );
  }, [products, categories]);

  const filteredVariants = useMemo(() => {
    return allVariants.filter((variant) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        products.find((p) => p.name === variant.productName)?.categoryId === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        variant.name?.toLowerCase().includes(query) ||
        variant.productName?.toLowerCase().includes(query) ||
        variant.sku?.toLowerCase().includes(query) ||
        variant.color?.toLowerCase().includes(query) ||
        variant.size?.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [allVariants, selectedCategory, searchQuery, products]);

  return (
    <div className="w-full p-6 md:p-10 space-y-6">
      <EmployeeHeader
        title="Catálogo e Inventario"
        subtitle="Consulta de stock, precios y características de prendas disponibles en el local."
      />

      {/* Controles de Búsqueda y Filtrado */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por prenda, SKU, talla o color..."
            className="w-full pl-10 pr-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm font-medium text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary/30 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-primary text-background'
                : 'bg-primary/5 text-primary/60 hover:bg-primary/10'
            }`}
          >
            Todas ({allVariants.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.categoryId}
              onClick={() => setSelectedCategory(cat.categoryId)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat.categoryId
                  ? 'bg-primary text-background'
                  : 'bg-primary/5 text-primary/60 hover:bg-primary/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3">
          <Loader />
          <span className="text-xs font-medium text-primary/40">Cargando existencias...</span>
        </div>
      ) : filteredVariants.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 border border-dashed border-primary/10 rounded-2xl text-center">
          <AlertCircle size={32} className="text-primary/30" />
          <p className="text-sm font-medium text-primary/60">No se encontraron prendas con los filtros aplicados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVariants.map((variant) => {
            const stock = variant.inventories?.[0]?.stock ?? 0;
            const isLowStock = stock <= 2 && stock > 0;
            const isOutStock = stock === 0;

            return (
              <div
                key={variant.variantId}
                className="p-5 border border-primary/8 rounded-2xl bg-background/50 hover:border-primary/20 transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/5 text-primary/60">
                      {variant.categoryName}
                    </span>
                    <span className="text-xs font-semibold text-primary/40 font-mono">
                      #{variant.sku}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-primary line-clamp-1">
                      {variant.productName}
                    </h3>
                    <p className="text-xs font-medium text-primary/60 mt-0.5">
                      {variant.name} {variant.color ? `· ${variant.color}` : ''} {variant.size ? `(Talla ${variant.size})` : ''}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-primary/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-primary/40 block">Precio Venta</span>
                    <span className="text-base font-bold text-primary">
                      {formatCurrency(variant.price)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-primary/40 block">Stock Local</span>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isOutStock
                          ? 'bg-red-500/10 text-red-600'
                          : isLowStock
                          ? 'bg-amber-500/10 text-amber-600'
                          : 'bg-emerald-500/10 text-emerald-600'
                      }`}
                    >
                      {isOutStock ? 'Agotado' : `${stock} unds`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
