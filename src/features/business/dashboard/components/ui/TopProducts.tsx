import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Package } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProductVariant {
  variantId: string;
  name: string;
  sku: string;
  popularity: number;
  image: string;
  product?: {
    name: string;
  };
}

interface TopProductsProps {
  products: ProductVariant[];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-foreground/5">
        <Package className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-foreground-muted">
        No hay productos más vendidos aún.
      </p>
    </div>
  );
}

interface TopProductRowProps {
  variant: ProductVariant;
  rank: number;
}

function TopProductRow({ variant, rank }: TopProductRowProps) {
  return (
    <tr
      className="group transition-all duration-200 block lg:table-row bg-background lg:bg-transparent rounded-2xl lg:rounded-none border border-foreground/10 lg:border-none p-4 lg:p-0 shadow-sm lg:shadow-none"
    >
      {/* Rank */}
      <td className="block lg:table-cell lg:rounded-l-xl py-2 lg:py-3 px-2 lg:px-4 text-xs font-bold lg:text-center text-foreground-muted lg:group-hover:bg-foreground/5 transition-colors border-b border-foreground/5 lg:border-none mb-2 lg:mb-0">
        <div className="flex items-center justify-between lg:justify-center">
          <span className="lg:hidden text-xs font-bold uppercase text-foreground-muted">Posición</span>
          <span aria-label={`Posición ${rank}`}>#{rank}</span>
        </div>
      </td>

      {/* Product info */}
      <td className="block lg:table-cell py-2 lg:py-3 px-2 lg:group-hover:bg-foreground/5 transition-colors">
        <div className="flex items-center justify-between lg:justify-start w-full gap-4">
          <span className="lg:hidden text-xs font-bold uppercase text-foreground-muted">Producto</span>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-foreground/10">
              <Image
                src={variant.image}
                alt={variant.product?.name ?? variant.name}
                className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-300"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col min-w-0 text-right lg:text-left">
              <span className="text-sm font-semibold text-foreground truncate">
                {variant.product?.name}
              </span>
              <span className="text-xs text-foreground-muted truncate">
                {variant.name} · {variant.sku}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Popularity */}
      <td className="block lg:table-cell py-2 lg:py-3 px-2 lg:px-4 lg:text-center lg:group-hover:bg-foreground/5 transition-colors">
        <div className="flex items-center justify-between lg:justify-center">
          <span className="lg:hidden text-xs font-bold uppercase text-foreground-muted">Popularidad</span>
          <p className="text-sm font-medium text-foreground">
            <span aria-label={`${variant.popularity} puntos de popularidad`}>{variant.popularity}</span>{' '}
            <span className="text-foreground-muted text-xs">pop</span>
          </p>
        </div>
      </td>

      {/* Action */}
      <td className="block lg:table-cell lg:rounded-r-xl py-2 lg:py-3 px-2 lg:px-4 lg:text-right lg:group-hover:bg-foreground/5 transition-colors mt-2 lg:mt-0 border-t border-foreground/5 lg:border-none">
        <div className="flex items-center justify-between lg:justify-end">
          <span className="lg:hidden text-xs font-bold uppercase text-foreground-muted">Acción</span>
          <Link
            href={`/dashboard/catalog?variantId=${variant.variantId}`}
            className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-foreground/5 text-foreground-muted hover:bg-contrast hover:text-white transition-all"
            aria-label={`Ver detalle de ${variant.product?.name ?? variant.name}`}
            title="Ver detalle"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TopProducts({ products }: TopProductsProps) {
  return (
    <article className="rounded-2xl p-6 h-full flex flex-col gap-3 bg-background-elevated border border-foreground/10">
      <header>
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Productos Top 5</h2>
        <p className="text-xs text-foreground-muted font-medium mt-1">Variantes por popularidad</p>
      </header>

      {!products || products.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="w-full overflow-x-auto -mx-2 px-2">
          <table
            className="w-full text-left lg:border-separate lg:border-spacing-y-1"
            aria-label="Productos más populares"
          >
            <thead className="hidden lg:table-header-group">
              <tr className="text-xs font-bold uppercase text-foreground-muted tracking-widest">
                <th scope="col" className="pb-3 px-4 w-12 text-center">#</th>
                <th scope="col" className="pb-3 px-2">Producto</th>
                <th scope="col" className="pb-3 px-4 text-center">Popularidad</th>
                <th scope="col" className="pb-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="block lg:table-row-group space-y-3 lg:space-y-0">
              {products.map((variant, idx) => (
                <TopProductRow key={variant.variantId} variant={variant} rank={idx + 1} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}
