'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { 
  AlertTriangle, 
  Package, 
  Search, 
  XCircle,
  RefreshCcw,
  Box
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useInventory } from '@/hooks/admin/useInventory';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { InventoryNavItem } from './ui/InventoryWidgets';
import { VariantStockRow } from './ui/VariantStockRow';
import gsap from 'gsap';

const LOW_STOCK_THRESHOLD = 5;

export default function Inventory() {
  const { products, isLoading, loadingId, error, fetchInventory, updateStock } = useInventory();
  const searchParams = useSearchParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const filter = searchParams.get('filter') || 'all'; // all, low, empty
  const urlSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [stockUpdates, setStockUpdates] = useState<Record<string, number>>({});

  useEffect(() => {
    if (urlSearch) setSearchTerm(urlSearch);
  }, [urlSearch]);

  useEffect(() => { 
    fetchInventory(); 
  }, [fetchInventory]);

  // GSAP Animation
  useEffect(() => {
    if (!isLoading && products.length > 0 && containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll('.inventory-section'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [isLoading, products.length, filter]);

  const stats = useMemo(() => {
    let totalItems = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    products.forEach((p: any) => {
      p.variants?.forEach((v: any) => {
        const stock = v.inventories?.[0]?.stock || 0;
        totalItems++;
        if (stock === 0) outOfStockCount++;
        else if (stock < LOW_STOCK_THRESHOLD) lowStockCount++;
      });
    });

    return { totalItems, lowStockCount, outOfStockCount };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.map((p: any) => {
      const filteredVariants = p.variants?.filter((v: any) => {
        const stock = v.inventories?.[0]?.stock || 0;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             v.sku.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (!matchesSearch) return false;
        if (filter === 'low') return stock > 0 && stock < LOW_STOCK_THRESHOLD;
        if (filter === 'empty') return stock === 0;
        return true;
      });

      return { ...p, variants: filteredVariants };
    }).filter((p: any) => p.variants?.length > 0);
  }, [products, searchTerm, filter]);

  const handleFilterChange = (newFilter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newFilter === 'all') params.delete('filter');
    else params.set('filter', newFilter);
    router.push(`?${params.toString()}`);
  };

  const handleStockChange = (variantId: string, currentStock: number, delta: number) => {
    const newValue = Math.max(0, (stockUpdates[variantId] ?? currentStock) + delta);
    setStockUpdates(prev => ({ ...prev, [variantId]: newValue }));
  };

  const handleStockInput = (variantId: string, val: number) => {
    setStockUpdates(prev => ({ ...prev, [variantId]: val }));
  };

  const handleSaveStock = async (variantId: string) => {
    const newStock = stockUpdates[variantId];
    if (newStock === undefined) return;
    
    const result = await updateStock(variantId, newStock);
    if (result.success) {
      setStockUpdates(prev => {
        const next = { ...prev };
        delete next[variantId];
        return next;
      });
    }
  };

  if (isLoading && products.length === 0) return (
    <div className="w-full h-[80vh] flex items-center justify-center bg-background">
      <Loader size="lg" />
    </div>
  );

  return (
    <main className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10 pb-24">
      <SectionHeader
        title="Gestión de Inventario"
        subtitle="Control preciso de stock y alertas de reposición."
        action={
          <div className="flex items-center gap-2 w-full sm:w-[400px]">
             <div className="relative group flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-contrast transition-colors duration-200" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por producto o SKU..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3.5 rounded-2xl bg-background-elevated border border-foreground/8 focus:border-contrast/30 focus:ring-4 focus:ring-contrast/5 outline-none transition-all font-bold text-sm w-full"
              />
            </div>
            <button 
              onClick={() => fetchInventory()}
              className="w-12 h-12 flex items-center justify-center shrink-0 rounded-2xl bg-background-elevated border border-foreground/8 text-foreground-muted hover:text-contrast hover:bg-contrast/10 transition-all active:scale-95"
              aria-label="Refrescar inventario"
            >
              <RefreshCcw size={20} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        }
      />

      {/* New Segmented Pill Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        <InventoryNavItem
          label="Todos"
          value={stats.totalItems}
          icon={<Package />}
          active={filter === 'all'}
          onClick={() => handleFilterChange('all')}
          activeColor="bg-contrast"
        />
        <InventoryNavItem
          label="Bajo Stock"
          value={stats.lowStockCount}
          icon={<AlertTriangle />}
          active={filter === 'low'}
          onClick={() => handleFilterChange('low')}
          activeColor="bg-amber-500"
        />
        <InventoryNavItem
          label="Agotado"
          value={stats.outOfStockCount}
          icon={<XCircle />}
          active={filter === 'empty'}
          onClick={() => handleFilterChange('empty')}
          activeColor="bg-red-500"
        />
      </div>

      {error ? (
        <div className="p-6 rounded-[32px] bg-red-500/5 border border-red-500/10 text-red-400 font-bold flex items-center gap-4">
          <XCircle size={24} />
          <p>{error}</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <EmptyState 
          icon={filter === 'all' ? Box : AlertTriangle} 
          title={filter === 'all' ? "Inventario Vacío" : "Sin Alertas"} 
          description={filter === 'all' ? "No hay productos registrados en tu catálogo." : "¡Genial! No hay productos con stock crítico en esta categoría."} 
        />
      ) : (
        <div ref={containerRef} className="space-y-10">
          {filteredProducts.map((product: any) => (
            <section key={product.productId} className="inventory-section space-y-4">
              <div className="flex items-center justify-between ml-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-foreground/5 flex items-center justify-center">
                    <Box size={14} className="text-foreground-muted" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-primary tracking-[0.15em] leading-none uppercase">{product.name}</h3>
                    <p className="text-[9px] font-bold text-foreground-muted uppercase tracking-widest mt-1.5 opacity-60">
                      {product.variants.length} variantes
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {product.variants.map((variant: any) => {
                  const currentStock = variant.inventories?.[0]?.stock || 0;
                  const editedStock = stockUpdates[variant.variantId];
                  const isSaving = loadingId === variant.variantId;

                  return (
                    <VariantStockRow
                      key={variant.variantId}
                      variant={variant}
                      currentStock={currentStock}
                      editedStock={editedStock}
                      isSaving={isSaving}
                      onStockChange={handleStockChange}
                      onStockInput={handleStockInput}
                      onSaveStock={handleSaveStock}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
