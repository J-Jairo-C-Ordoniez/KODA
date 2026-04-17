import Link from "next/link";

export function ProductCard({ product }) {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  return (
    product ? (
      <Link href={`/product/${product.variantId}`} className="flex flex-col group cursor-pointer">
        <div className={`aspect-4/6 w-full mb-4 relative overflow-hidden bg-foreground flex items-center justify-center`}>
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className={`w-3/4 h-[60%] bg-secondary rounded-md shadow-sm group-hover:scale-105 transition-transform duration-500 ease-out`} />
          )}
        </div>

        <div className="flex justify-between items-start leading-tight text-xs uppercase tracking-wide">
          <div className="flex flex-col gap-1 text-secondary font-medium text-xs">
            <h3 className="group-hover:text-primary/90 transition-colors">
              {product.product ? product.product.name : product.name}
            </h3>
            <span className="text-primary uppercase">
              {product.product ? product.name : product.subtitle} {product.color ? `- ${product.color}` : ''}
            </span>
          </div>
          <div className="text-primary font-extrabold">
            {formatter.format(product.price).replace('$', '$ ')} COP
          </div>
        </div>
      </Link>
    ) : (
      <article className="flex flex-col group animate-pulse duration-1000">
        <div className={`aspect-4/6 w-full mb-4 relative overflow-hidden bg-foreground flex items-center justify-center`}>
          <div className={`w-3/4 h-[60%] bg-secondary rounded-md shadow-sm group-hover:scale-105 transition-transform duration-500 ease-out`} />
        </div>
      </article>
    )
  );
}
