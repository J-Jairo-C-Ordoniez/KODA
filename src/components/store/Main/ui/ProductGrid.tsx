import ProductCard from '@/components/store/Main/ui/ProductCard';
import { Search, ShoppingBag } from 'lucide-react';

export default function ProductGrid({ products, error }: { products: any[], error: string | null }) {
  if (error) {
    return (
      <div className="w-full py-40 flex flex-col items-center justify-center gap-6 text-center">
        <div className="w-20 h-20 rounded-[32px] bg-red-500/5 flex items-center justify-center text-red-500/40 mb-2">
          <Search size={36} />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-black text-primary uppercase tracking-[0.2em]">Ocurrió un inconveniente</p>
          <p className="text-[11px] font-medium text-foreground-muted max-w-xs leading-relaxed uppercase tracking-widest opacity-60">
            {error || "No pudimos conectar con el servidor. Por favor, intenta recargar la página."}
          </p>
        </div>
      </div>
    );
  }

  if (products && products.length === 0) {
    return (
      <div className="w-full py-40 flex flex-col items-center justify-center gap-6 text-center animate-in fade-in duration-700">
        <div className="w-20 h-20 rounded-[32px] bg-background-elevated flex items-center justify-center text-foreground-muted/20 mb-2 border border-white/5">
          <ShoppingBag size={36} />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-black text-primary uppercase tracking-[0.2em]">Sin existencias</p>
          <p className="text-[11px] font-medium text-foreground-muted max-w-xs leading-relaxed uppercase tracking-widest opacity-60">
            No encontramos productos disponibles en esta categoría por el momento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-10 gap-y-20 pb-32">
      {products.map((product: any, index: number) => (
        <div 
          key={product.variantId} 
          className="animate-in fade-in slide-in-from-bottom-4 duration-700" 
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ProductCard
            product={product}
          />
        </div>
      ))}
    </section>
  );

}
