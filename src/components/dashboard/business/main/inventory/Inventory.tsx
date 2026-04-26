'use client';

import { useEffect, useState, useMemo } from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  Package, 
  Search, 
  Filter, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Minus,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  Layers
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useInventory } from '@/hooks/admin/useInventory';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';

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

  // --- Logic ---
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
            >
              <RefreshCcw size={20} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        }
      />

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          icon={<Package size={18} className="text-navy" />}
          label="Items Totales"
          value={stats.totalItems}
          color="bg-navy/5"
          onClick={() => handleFilterChange('all')}
          active={filter === 'all'}
        />
        <StatCard 
          icon={<AlertTriangle size={18} className="text-amber-500" />}
          label="Bajo Stock"
          value={stats.lowStockCount}
          color="bg-amber-50"
          onClick={() => handleFilterChange('low')}
          active={filter === 'low'}
        />
        <StatCard 
          icon={<XCircle size={18} className="text-red-500" />}
          label="Agotados"
          value={stats.outOfStockCount}
          color="bg-red-50"
          onClick={() => handleFilterChange('empty')}
          active={filter === 'empty'}
        />
        <div className="hidden md:block" /> {/* Spacer to align with 4-cols like summary if needed, or just use 3 */}
      </div>

      {/* --- Filters & Tabs --- */}
      <div className="flex items-center gap-2 border-b border-foreground/5">
        <TabButton active={filter === 'all'} onClick={() => handleFilterChange('all')}>Todos</TabButton>
        <TabButton active={filter === 'low'} onClick={() => handleFilterChange('low')}>Bajo Stock</TabButton>
        <TabButton active={filter === 'empty'} onClick={() => handleFilterChange('empty')}>Agotados</TabButton>
      </div>

      {error ? (
        <p className="text-red-500 bg-red-50 p-6 rounded-[32px] border border-red-100 font-bold">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <EmptyState 
          icon={filter === 'all' ? Package : AlertTriangle} 
          title={filter === 'all' ? "Inventario Vacío" : "Sin Alertas"} 
          description={filter === 'all' ? "No hay productos registrados en tu catálogo." : "¡Excelente! No hay productos con stock crítico en esta categoría."} 
        />
      ) : (
        <div className="space-y-8">
          {filteredProducts.map((product: any) => (
            <section key={product.productId} className="space-y-3">
              <div className="flex items-center gap-2 ml-2">
                <h3 className="text-sm font-black text-primary tracking-tight">{product.name}</h3>
                <span className="text-[9px] font-bold text-secondary bg-foreground/5 px-2 py-0.5 rounded-full">
                  {product.variants.length} vars.
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {product.variants.map((variant: any) => {
                  const currentStock = variant.inventories?.[0]?.stock || 0;
                  const editedStock = stockUpdates[variant.variantId];
                  const displayStock = editedStock !== undefined ? editedStock : currentStock;
                  const isLow = displayStock > 0 && displayStock < LOW_STOCK_THRESHOLD;
                  const isEmpty = displayStock === 0;
                  const isSaving = loadingId === variant.variantId;
                  const hasChanges = editedStock !== undefined && editedStock !== currentStock;

                  return (
                    <div 
                      key={variant.variantId}
                      className={`group bg-background border rounded-2xl p-3 flex items-center gap-4 transition-all hover:bg-foreground/[0.01] ${
                        isEmpty ? 'border-red-100' : 
                        isLow ? 'border-amber-100' : 
                        'border-foreground/5'
                      }`}
                    >
                      {/* Image - Smaller */}
                      <div className="w-12 h-12 rounded-xl bg-navy/5 overflow-hidden flex items-center justify-center shrink-0 border border-foreground/5">
                        {variant.images?.[0] ? (
                          <img src={variant.images[0].content} className="w-full h-full object-cover" alt={variant.name} />
                        ) : (
                          <Layers size={16} className="text-navy/50" />
                        )}
                      </div>

                      {/* Info Area - Tighter */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm text-primary truncate">{variant.name}</p>
                          {isEmpty && <span className="text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 bg-red-500 text-white rounded-md">Agotado</span>}
                          {isLow && !isEmpty && <span className="text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 bg-amber-500 text-white rounded-md">Bajo</span>}
                        </div>
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-wider opacity-60">
                          {variant.sku} · {variant.color} / {variant.size}
                        </p>
                      </div>

                      {/* Quick Stock Controls - Compact */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 bg-foreground/5 p-1 rounded-xl">
                          <button 
                            onClick={() => handleStockChange(variant.variantId, currentStock, -1)}
                            className="p-1.5 rounded-lg hover:bg-white hover:text-navy transition-all active:scale-90 text-secondary"
                          >
                            <Minus size={14} />
                          </button>
                          
                          <input 
                            type="number"
                            value={displayStock}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val)) setStockUpdates(prev => ({ ...prev, [variant.variantId]: Math.max(0, val) }));
                            }}
                            className="w-10 text-center bg-transparent font-black text-primary outline-none text-sm"
                          />

                          <button 
                            onClick={() => handleStockChange(variant.variantId, currentStock, 1)}
                            className="p-1.5 rounded-lg hover:bg-white hover:text-navy transition-all active:scale-90 text-secondary"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Save Action - Compact */}
                        <div className="w-20">
                          {hasChanges ? (
                            <button 
                              onClick={() => handleSaveStock(variant.variantId)}
                              disabled={isSaving}
                              className="w-full py-2 rounded-xl bg-navy text-white font-black text-[9px] uppercase tracking-widest shadow-md shadow-navy/10 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1"
                            >
                              {isSaving ? <Loader size="xs" color="border-white" /> : 'Guardar'}
                            </button>
                          ) : (
                            <div className="text-center opacity-20">
                              <CheckCircle2 size={14} className="mx-auto" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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

function StatCard({ icon, label, value, color, onClick, active }: any) {
  return (
    <button 
      onClick={onClick}
      disabled={!onClick}
      className={`p-5 rounded-3xl border border-foreground/5 flex items-center gap-4 text-left transition-all ${onClick ? 'hover:shadow-md hover:bg-foreground/[0.01] cursor-pointer' : ''} ${active ? 'bg-navy/5 border-navy/20' : 'bg-background'}`}
    >
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none">{label}</p>
        <p className="text-xl font-black text-primary mt-1 leading-none">{value}</p>
      </div>
    </button>
  );
}

function TabButton({ children, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-8 py-3 rounded-t-2xl font-black text-sm transition-all relative ${
        active ? 'text-navy' : 'text-secondary hover:text-primary'
      }`}
    >
      {children}
      {active && <div className="absolute bottom-[-2px] left-0 right-0 h-1 bg-navy rounded-full animate-in fade-in duration-300" />}
    </button>
  );
}
