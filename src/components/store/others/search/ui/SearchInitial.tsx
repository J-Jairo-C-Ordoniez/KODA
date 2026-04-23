import { ProductCard } from "../../../Main/ui/ProductCard";

export default function SearchInitial({ popular, setQuery }) {

  console.log(popular);
  return (
    <section className="w-full">
      <div>
        <h2 className="text-secondary text-xs font-semibold uppercase tracking-widest mb-4">
          Recomendaciones
        </h2>
        <ul className="space-y-2 mb-12 pl-4">
          {popular.map((v) => (
            <li key={v.variantId}>
              <button
                onClick={() => setQuery(v.product.name)}
                className="text-primary/80 hover:text-secondary/80 text-sm font-medium transition-colors cursor-pointer tracking-wider"
              >
                {v.product.name} | {v.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16 justify-center overflow-x-hidden">
        {popular.map((product) => (
          <ProductCard
            key={product.variantId}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
