import Link from 'next/link';
import Image from 'next/image';
import { Package, ExternalLink, AlertTriangle } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface LowStockVariant {
  image: string;
  product?: { name: string };
  name: string;
  size: string;
}

interface LowStockItem {
  inventoryId: string;
  variantId: string;
  stock: number;
  variant: LowStockVariant;
}

interface LowStockProps {
  items: LowStockItem[];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="text-center py-8 flex flex-col items-center gap-3">
      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-foreground/5">
        <Package className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-foreground-muted">
        Inventario en estado óptimo.
      </p>
    </div>
  );
}

interface StockBadgeProps {
  stock: number;
}

function StockBadge({ stock }: StockBadgeProps) {
  const isEmpty = stock === 0;
  return (
    <span
      className={`text-sm font-bold py-1 px-3 rounded-lg ${
        isEmpty
          ? 'text-red-400 bg-red-500/10'
          : 'text-amber-400 bg-amber-500/10'
      }`}
      aria-label={`${stock} unidades en stock`}
    >
      {stock} uds.
    </span>
  );
}

interface LowStockRowProps {
  item: LowStockItem;
}

function LowStockRow({ item }: LowStockRowProps) {
  return (
    <tr className="group transition-all duration-200 block lg:table-row bg-background lg:bg-transparent rounded-2xl lg:rounded-none border border-foreground/10 lg:border-none p-4 lg:p-0 shadow-sm lg:shadow-none">
      {/* Product info */}
      <td className="block lg:table-cell py-2 lg:py-3 px-2 lg:group-hover:bg-foreground/5 transition-colors lg:rounded-l-xl">
        <div className="flex items-center justify-between lg:justify-start w-full gap-4">
          <span className="lg:hidden text-xs font-bold uppercase text-foreground-muted">Producto</span>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-foreground/10">
              <Image
                src={item.variant.image}
                alt={item.variant.product?.name ?? item.variant.name}
                className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-300"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col min-w-0 text-right lg:text-left">
              <span className="text-sm font-semibold text-foreground truncate">
                {item.variant.product?.name}
              </span>
              <span className="text-xs text-foreground-muted truncate">
                {item.variant.name} · Talla {item.variant.size}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Stock count */}
      <td className="block lg:table-cell py-2 lg:py-3 px-2 lg:px-4 lg:text-center lg:group-hover:bg-foreground/5 transition-colors border-y border-foreground/5 lg:border-none my-2 lg:my-0">
        <div className="flex items-center justify-between lg:justify-center">
          <span className="lg:hidden text-xs font-bold uppercase text-foreground-muted">Stock Actual</span>
          <StockBadge stock={item.stock} />
        </div>
      </td>

      {/* Action */}
      <td className="block lg:table-cell lg:rounded-r-xl py-2 lg:py-3 px-2 lg:px-4 lg:text-right lg:group-hover:bg-foreground/5 transition-colors">
        <div className="flex items-center justify-between lg:justify-end">
          <span className="lg:hidden text-xs font-bold uppercase text-foreground-muted">Acción</span>
          <Link
            href={`/dashboard/inventory?variantId=${item.variantId}`}
            className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-foreground/5 text-foreground-muted hover:bg-contrast hover:text-white transition-all"
            aria-label={`Ver stock de ${item.variant.product?.name ?? item.variant.name}`}
            title="Ver stock"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LowStock({ items }: LowStockProps) {
  return (
    <article className="rounded-2xl p-6 h-full flex flex-col gap-3 bg-background-elevated border border-foreground/10">
      <header className="flex items-center justify-between pb-3 border-b border-foreground/10">
        <div>
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Inventario Bajo</h2>
          <p className="text-xs text-foreground-muted font-medium mt-1">Revisión crítica de existencias</p>
        </div>
        {items && items.length > 0 && (
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center animate-pulse bg-red-500/10 border border-red-500/20"
            aria-label="Alerta de inventario"
            role="status"
          >
            <AlertTriangle className="h-4 w-4 text-red-400" aria-hidden="true" />
          </div>
        )}
      </header>

      {!items || items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="w-full overflow-x-auto -mx-2 px-2">
          <table
            className="w-full text-left lg:border-separate lg:border-spacing-y-1"
            aria-label="Productos con inventario bajo"
          >
            <thead className="hidden lg:table-header-group">
              <tr className="text-xs font-bold uppercase text-foreground-muted tracking-widest">
                <th scope="col" className="pb-3 px-2">Producto</th>
                <th scope="col" className="pb-3 px-4 text-center">Stock</th>
                <th scope="col" className="pb-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="block lg:table-row-group space-y-3 lg:space-y-0">
              {items.map((item) => (
                <LowStockRow key={item.inventoryId} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}
