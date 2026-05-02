"use client";

import { useEffect } from "react";
import useBreadcrumbsStore from "@/store/breadcrumbs.store";
import Breadcrumbs from "@/components/store/Main/ui/Breadcrumbs";
import ProductInfo from "./ui/ProductInfo";
import ProductImg from "./ui/ProductImg";
import { useProductDetail } from "@/hooks/publicCatalog/useProductDetail";
import Loader from "@/components/ui/Loader";
import { ChevronLeft } from "lucide-react";

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
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-6">
        <Loader size="lg" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40 animate-pulse">
          Cargando detalles del producto
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-6">
        <div className="space-y-2">
          <p className="text-sm font-black text-primary uppercase tracking-widest">
            {error || "Producto no disponible"}
          </p>
          <p className="text-xs font-medium text-secondary max-w-xs mx-auto leading-relaxed">
            No pudimos encontrar la variante que buscas o no está activa en el catálogo actual.
          </p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-navy/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <ChevronLeft size={16} />
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <main className="bg-background w-full min-h-screen">
      <div className="max-w-[1400px] mx-auto p-6 md:p-12">
        <div className="mb-12">
          <Breadcrumbs />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          <div className="sticky top-32">
            <ProductImg variant={selectedVariant} />
          </div>

          <div className="lg:pt-4">
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
