import ProductCard from '@/components/store/Main/ui/ProductCard';
import { Search } from 'lucide-react';

export default function ProductGrid({ products, error }: { products: any[], error: string | null }) {
  if (error) {
    return (
      <div className="w-full py-32 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-3xl bg-red-50 flex items-center justify-center text-red-500 mb-2">
          <Search size={32} />
        </div>
        <p className="text-sm font-black text-primary uppercase tracking-widest">Error al cargar productos</p>
        <p className="text-xs font-medium text-secondary max-w-xs leading-relaxed">
          Hubo un problema al conectar con el catálogo. Por favor, intenta recargar la página.
        </p>
      </div>
    );
  }

  if (products && products.length === 0) {
    return (
      <div className="w-full py-32 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-3xl bg-foreground/5 flex items-center justify-center text-secondary mb-2">
          <Search size={32} />
        </div>
        <p className="text-sm font-black text-primary uppercase tracking-widest">Sin resultados</p>
        <p className="text-xs font-medium text-secondary max-w-xs leading-relaxed">
          No encontramos productos que coincidan con tus filtros. Intenta con otra combinación.
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20 pb-24">
      {products.map((product: any) => (
        <ProductCard
          key={product.variantId}
          product={product}
        />
      ))}
    </section>
  );
}
