'use client';

import { useEffect, useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  Package, 
  Search, 
  XCircle,
  RefreshCcw
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useInventory } from '@/hooks/admin/useInventory';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { StatCard, TabButton } from './ui/InventoryWidgets';
import { VariantStockRow } from './ui/VariantStockRow';

const LOW_STOCK_THRESHOLD = 5;

export default function Inventory() {
  const { products, isLoading, loadingId, error, fetchInventory, updateStock } = useInventory();
  const searchParams = useSearchParams();
  const router = useRouter();
  
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

  const stats = useMemo(() => {
    let totalItems = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    products.forEach((p: any) => {
      p.variants?.forEach((v: any) => {
        const stock = v.inventories?.[0]?.stock || 0;
        totalItems += stock;
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
      <Loader size="lg" color="border-navy" />
    </div>
  );

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20 custom-scrollbar">
      <SectionHeader
        title="Gestión de Inventario"
        subtitle="Control preciso de stock y alertas de reposición."
        action={
          <div className="flex gap-4">
             <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por producto o SKU..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 rounded-2xl bg-foreground/5 border-transparent focus:bg-background focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm min-w-[300px]"
              />
            </div>
            <button 
              onClick={() => fetchInventory()}
              className="p-3 rounded-2xl bg-foreground/5 text-secondary hover:text-navy hover:bg-navy/5 transition-all active:scale-95"
              aria-label="Refrescar inventario"
            >
              <RefreshCcw size={20} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          icon={<Package size={18} className="text-navy" />}
          label="Artículos Totales"
          value={stats.totalItems}
          color="bg-navy/5"
          onClick={() => handleFilterChange('all')}
          active={filter === 'all'}
        />
        <StatCard 
          icon={<AlertTriangle size={18} className="text-amber-500" />}
          label="Stock Bajo"
          value={stats.lowStockCount}
          color="bg-amber-50"
          onClick={() => handleFilterChange('low')}
          active={filter === 'low'}
        />
        <StatCard 
          icon={<XCircle size={18} className="text-red-500" />}
          label="Agotado"
          value={stats.outOfStockCount}
          color="bg-red-50"
          onClick={() => handleFilterChange('empty')}
          active={filter === 'empty'}
        />
        <div className="hidden md:block" />
      </div>

      <nav className="flex items-center gap-2 border-b border-foreground/5" aria-label="Filtros de inventario">
        <TabButton active={filter === 'all'} onClick={() => handleFilterChange('all')}>Todos</TabButton>
        <TabButton active={filter === 'low'} onClick={() => handleFilterChange('low')}>Stock Bajo</TabButton>
        <TabButton active={filter === 'empty'} onClick={() => handleFilterChange('empty')}>Agotado</TabButton>
      </nav>

      {error ? (
        <p className="text-red-500 bg-red-50 p-6 rounded-[32px] border border-red-100 font-bold">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <EmptyState 
          icon={filter === 'all' ? Package : AlertTriangle} 
          title={filter === 'all' ? "Inventario Vacío" : "Sin Alertas"} 
          description={filter === 'all' ? "No hay productos registrados en tu catálogo." : "¡Genial! No hay productos con stock crítico en esta categoría."} 
        />
      ) : (
        <div className="space-y-8">
          {filteredProducts.map((product: any) => (
            <section key={product.productId} className="space-y-3">
              <div className="flex items-center gap-2 ml-2">
                <h3 className="text-sm font-black text-primary tracking-tight">{product.name}</h3>
                <span className="text-[10px] font-bold text-secondary bg-foreground/5 px-2 py-0.5 rounded-full">
                  {product.variants.length} vars.
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
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
