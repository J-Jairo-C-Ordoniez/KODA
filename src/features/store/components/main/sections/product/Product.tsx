'use client';

import { useState } from 'react';
import Link from 'next/link';
import Loader from '@/shared/components/Loader';
import { useProductDetail } from '@/features/store/hooks/useProductDetail';
import { formatCurrency } from '@/lib/formatters';
import { ArrowLeft } from 'lucide-react';
import Button from '@/shared/components/Button';

import ProductGallery from './ui/ProductGallery';
import ProductHeaderInfo from './ui/ProductHeaderInfo';
import ProductVariantSelector from './ui/ProductVariantSelector';
import ProductActions from './ui/ProductActions';

interface Props {
  tenant: any;
  slug: string;
  variantId: string;
}

export default function ProductDetailView({ tenant, slug, variantId }: Props) {
  const { data, selectedVariant, setSelectedVariant, isLoading, error } = useProductDetail(variantId);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Cargando prenda del catálogo"
        className="flex flex-col items-center justify-center py-40 gap-4"
      >
        <Loader />
      </div>
    );
  }

  if (error || !data || !selectedVariant) {
    return (
      <article
        aria-label="Producto no disponible"
        className="flex flex-col items-center justify-center py-32 gap-5 text-center px-10 md:px-40"
      >
        <header className="space-y-1.5">
          <h1 className="text-base font-medium text-primary tracking-tight">
            {error || 'Producto no disponible'}
          </h1>
          <p className="text-sm text-primary/60 leading-relaxed max-w-sm">
            Es posible que esta prenda no se encuentre disponible actualmente.
          </p>
        </header>
        <Button href={`/${slug}`} variant="secondary" size="sm" className="mt-2">
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Volver al catálogo</span>
        </Button>
      </article>
    );
  }
  
  const parentProduct = data?.product || {};
  const allVariants = parentProduct.variants || [data];
  const images = selectedVariant.images || [];
  const displaySku = selectedVariant.sku ? selectedVariant.sku : '';

  const handleWhatsAppOrder = () => {
    if (!tenant.whatsApp) return;

    const message = encodeURIComponent(
      `Hola! Quisiera pedir:\n\n*${parentProduct.name}*\n${selectedVariant.color ? `Color: ${selectedVariant.color}` : ''}${selectedVariant.size ? ` · Talla ${selectedVariant.size}` : ''}\nSKU: #${displaySku}\nPrecio: ${formatCurrency(selectedVariant.price)}`
    );

    window.open(`https://wa.me/57${tenant.whatsApp}?text=${message}`, '_blank');
  };

  return (
    <article
      aria-label={`Detalle del producto ${parentProduct.name}`}
      className="w-full px-10 md:px-40 pt-6 pb-24"
    >
      <nav 
        aria-label="Volver a catálogo" 
        className="mb-8"
      >
        <Link
          href={`/${slug}`}
          className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-primary/60 hover:text-primary transition-colors"
        >
          <ArrowLeft
            size={18}
            aria-hidden="true"
          />
          <span>Volver al catálogo</span>
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
        <section
          aria-label="Imágenes de la prenda"
          className="md:col-span-6 lg:col-span-6"
        >
          <ProductGallery
            images={images}
            activeImageIndex={activeImageIndex}
            onSelectImage={setActiveImageIndex}
            productName={parentProduct.name}
          />
        </section>

        <section 
          aria-label="Información y opciones de compra" 
          className="md:col-span-6 lg:col-span-6 flex flex-col gap-6"
        >
          <ProductHeaderInfo
            categoryName={parentProduct.category?.name}
            productName={parentProduct.name}
            price={selectedVariant.price}
            color={selectedVariant.color}
            size={selectedVariant.size}
            description={parentProduct.description}
          />

          <ProductVariantSelector
            variants={allVariants}
            selectedVariantId={selectedVariant.variantId}
            onSelectVariant={(v) => {
              setSelectedVariant(v);
              setActiveImageIndex(0);
            }}
          />

          <ProductActions
            whatsApp={tenant.whatsApp}
            onWhatsAppOrder={handleWhatsAppOrder}
          />
        </section>
      </div>
    </article>
  );
}
