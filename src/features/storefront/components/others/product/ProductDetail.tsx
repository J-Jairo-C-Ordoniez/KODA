"use client";

import { useEffect } from "react";
import useBreadcrumbsStore from "@/store/breadcrumbs.store";
import Breadcrumbs from "@/components/Store/Main/ui/Breadcrumbs";
import ProductInfo from "./ui/ProductInfo";
import ProductImg from "./ui/ProductImg";
import { useProductDetail } from "@/hooks/publicCatalog/useProductDetail";
import Loader from "@/components/ui/Loader";
import { ChevronLeft, ShoppingBag } from "lucide-react";

export default function ProductDetail({ variantId, contact }: { variantId: string, contact?: string }) {
  const { setBreadcrumbsProduct } = useBreadcrumbsStore();

  const {
    data,
    isLoading,
    error,
    selectedVariant,
    setSelectedVariant
  } = useProductDetail(variantId, setBreadcrumbsProduct);

  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-8 bg-background">
        <Loader size="lg" />
        <div className="text-center space-y-2">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-contrast animate-pulse">
            Sincronizando Catálogo
          </p>
          <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest opacity-40">
            Estamos preparando los detalles de tu elección
          </p>
        </div>
      </div>
    );
  }

  if (error || !data || !selectedVariant) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-8 text-center px-6 bg-background">
        <div className="w-20 h-20 rounded-[32px] bg-foreground/5 flex items-center justify-center text-foreground-muted/20">
          <ShoppingBag size={40} />
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-black text-primary uppercase tracking-widest">
            {error || "Producto no disponible"}
          </h2>
          <p className="text-[11px] font-medium text-foreground-muted max-w-xs mx-auto leading-relaxed uppercase tracking-wider opacity-60">
            No pudimos encontrar la variante seleccionada. Es posible que el stock haya cambiado o el producto ya no esté activo.
          </p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-3 px-10 py-5 bg-contrast text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-contrast-hover transition-all shadow-2xl shadow-contrast/20 active:scale-95"
        >
          <ChevronLeft size={18} />
          Explorar Catálogo
        </button>
      </div>
    );
  }

  return (
    <main className="bg-background w-full min-h-screen pb-24 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-contrast/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto p-6 md:p-12 relative z-10">
        <div className="mb-16">
          <Breadcrumbs />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-7 sticky top-32">
            <ProductImg variant={selectedVariant} />
          </div>

          {/* Info Column */}
          <div className="lg:col-span-5 lg:pt-2">
            <ProductInfo
              product={data.product}
              variant={selectedVariant}
              allVariants={data.product.variants}
              contact={contact}
              setSelectedVariant={setSelectedVariant}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
