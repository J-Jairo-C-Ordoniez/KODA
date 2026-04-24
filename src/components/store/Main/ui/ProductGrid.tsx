import ProductCard from '@/components/store/Main/ui/ProductCard';

export default function ProductGrid({ products, isLoading, error }: { products: any, isLoading: boolean, error: string | null }) {
  return (
    <section className="pt-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16 justify-center overflow-x-hidden">
      {isLoading && Array.from({ length: 3 }).map((_, index) => (
        <ProductCard
          key={index}
          product={null}
        />
      ))}

      {!isLoading && error && (
        <div className="w-full py-20 flex flex-col items-center gap-4 m-auto col-span-full">
          <p className="text-md font-medium tracking-wider text-secondary">
            Ha ocurrido un error, intenta de nuevo
          </p>
        </div>
      )}

      {!isLoading && !error && products && products.length === 0 && (
        <div className="w-full py-20 flex flex-col items-center gap-4 m-auto col-span-full">
          <p className="text-md font-medium tracking-wider text-secondary">
            No hay productos disponibles para tu búsqueda.
          </p>
        </div>
      )}

      {products && products.length > 0 && products.map((product: any) => (
        <ProductCard
          key={product.variantId || product.id}
          product={product}
        />
      ))}
    </section>
  );
}
