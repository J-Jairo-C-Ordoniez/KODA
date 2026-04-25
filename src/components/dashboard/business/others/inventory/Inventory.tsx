'use client';

import { useEffect } from 'react';
import { BarChart3, AlertTriangle } from 'lucide-react';
import { useInventory } from '@/hooks/admin/useInventory';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';

export default function Inventory() {
  const { products, isLoading, loadingId, error, fetchInventory, updateStock } = useInventory();

  useEffect(() => { fetchInventory(); }, [fetchInventory]);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Control de Inventario"
        subtitle="Monitorea y ajusta el stock de cada variante de tus productos."
      />

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : products.length === 0 ? (
        <EmptyState icon={BarChart3} title="Sin datos de inventario" description="Agrega productos y variantes para ver su inventario aquí." />
      ) : (
        <div className="space-y-4">
          {products.map((product: any) => (
            <article key={product.productId} className="bg-background border border-foreground/5 rounded-3xl overflow-hidden">
              <div className="px-6 py-4 border-b border-foreground/5 flex items-center gap-3">
                <h3 className="font-black text-primary">{product.name}</h3>
                <span className="text-xs font-bold text-secondary bg-foreground/5 px-2 py-1 rounded-full">{product.variants?.length || 0} variantes</span>
              </div>
              <div className="divide-y divide-foreground/5">
                {product.variants?.map((variant: any) => {
                  const stock = variant.inventories?.[0]?.stock ?? 0;
                  const isLow = stock <= 2;
                  return (
                    <div key={variant.variantId} className="px-6 py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {isLow && <AlertTriangle size={16} className="text-red-500 shrink-0" />}
                        <div>
                          <p className="font-bold text-primary text-sm">{variant.name}</p>
                          <p className="text-secondary text-xs font-medium">{variant.color} · {variant.size} · SKU: {variant.sku}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-sm font-black px-3 py-1 rounded-full ${isLow ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                          {stock} uds.
                        </span>
                        <input
                          type="number"
                          min="0"
                          defaultValue={stock}
                          onBlur={(e) => { if (Number(e.target.value) !== stock) updateStock(variant.variantId, Number(e.target.value)); }}
                          className="w-20 text-center px-2 py-2 rounded-xl border border-foreground/10 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none text-sm font-bold"
                          disabled={loadingId === variant.variantId}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
