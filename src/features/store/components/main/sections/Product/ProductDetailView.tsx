'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/features/store/components/header/Header';
import Footer from '@/features/store/components/footer/Footer';
import Loader from '@/shared/components/Loader';
import { useProductDetail } from '@/features/store/hooks/useProductDetail';
import { formatCurrency } from '@/lib/formatters';
import { ArrowLeft, MessageCircle, Package, Check, ShieldCheck } from 'lucide-react';

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
      <div className="min-h-screen bg-background flex flex-col justify-between text-primary font-sans">
        <Header businessName={tenant.businessName} slug={slug} />
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted animate-pulse">
            Cargando producto...
          </span>
        </div>
        <Footer businessName={tenant.businessName} slug={slug} />
      </div>
    );
  }

  if (error || !data || !selectedVariant) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between text-primary font-sans">
        <Header businessName={tenant.businessName} slug={slug} />
        <div className="flex flex-col items-center justify-center py-32 gap-6 text-center px-6">
          <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground-muted/40">
            <Package size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-primary uppercase tracking-widest">
              {error || 'Producto no disponible'}
            </h2>
            <p className="text-xs font-medium text-foreground-muted max-w-sm mx-auto leading-relaxed uppercase tracking-wider opacity-60">
              Es posible que este artículo haya cambiado de disponibilidad.
            </p>
          </div>
          <Link
            href={`/${slug}`}
            className="flex items-center gap-2 px-8 py-4 bg-contrast text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-contrast-hover transition-all shadow-xl shadow-contrast/20"
          >
            <ArrowLeft size={16} />
            <span>Volver al Catálogo</span>
          </Link>
        </div>
        <Footer businessName={tenant.businessName} slug={slug} />
      </div>
    );
  }

  const parentProduct = selectedVariant.product || {};
  const allVariants = parentProduct.variants || [selectedVariant];
  const images = selectedVariant.images || [];
  const currentImage = images[activeImageIndex]?.content || images[0]?.content;
  const displaySku = selectedVariant.sku ? selectedVariant.sku : '';

  const handleWhatsAppOrder = () => {
    if (!tenant.whatsApp) return;

    const message = encodeURIComponent(
      `Hola! Quisiera realizar el pedido del producto:\n\n*${parentProduct.name}*\nVariante: ${selectedVariant.color} / Talla ${selectedVariant.size || 'Única'}\nSKU: #${displaySku}\nPrecio: ${formatCurrency(selectedVariant.price)}\n\n¿Tienen disponibilidad inmediata para despacho?`
    );

    window.open(`https://wa.me/57${tenant.whatsApp}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col justify-between font-sans">
      <Header businessName={tenant.businessName} slug={slug} />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 md:px-12 pt-8 pb-24">
        <div className="mb-8">
          <Link
            href={`/${slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-foreground-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Volver al catálogo</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Main Image Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-foreground/[0.02] border border-foreground/10 rounded-2xl">
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={selectedVariant.name}
                  fill
                  className="object-contain p-10 transition-all duration-500"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-foreground-muted/30">
                  <Package size={64} strokeWidth={1} />
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-4 overflow-x-auto pb-2">
                {images.map((img: any, idx: number) => (
                  <button
                    key={img.imageId || idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`
                      relative w-20 h-24 rounded-xl border overflow-hidden shrink-0 transition-all cursor-pointer
                      ${activeImageIndex === idx
                        ? 'border-contrast ring-2 ring-contrast/30'
                        : 'border-foreground/10 opacity-60 hover:opacity-100'
                      }
                    `}
                  >
                    <Image src={img.content} alt="" fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Specifications & Buy Action */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-28">
            <div className="flex flex-col gap-3 pb-6 border-b border-foreground/10">
              <div className="flex items-center justify-between gap-4">
                {displaySku && (
                  <span className="text-xs font-mono font-bold tracking-widest text-contrast">
                    #{displaySku}
                  </span>
                )}
                <span className="text-[10px] font-black uppercase tracking-widest bg-foreground/5 px-3 py-1 rounded-md text-foreground-muted">
                  {parentProduct.category?.name || 'Colección'}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-primary leading-tight">
                {parentProduct.name}
              </h1>

              <p className="text-2xl md:text-3xl font-black text-primary font-mono tracking-tight pt-2">
                {formatCurrency(selectedVariant.price)}
              </p>
            </div>

            {parentProduct.description && (
              <p className="text-xs font-medium text-foreground-muted leading-relaxed tracking-wider opacity-80 uppercase">
                {parentProduct.description}
              </p>
            )}

            {allVariants.length > 1 && (
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Color: <span className="text-contrast">{selectedVariant.color}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {allVariants.map((v: any) => {
                    const isSelected = v.variantId === selectedVariant.variantId;
                    return (
                      <button
                        key={v.variantId}
                        onClick={() => {
                          setSelectedVariant(v);
                          setActiveImageIndex(0);
                        }}
                        className={`
                          px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-2 cursor-pointer
                          ${isSelected
                            ? 'border-contrast bg-contrast/10 text-contrast shadow-sm'
                            : 'border-foreground/10 text-foreground-muted hover:border-foreground/30'
                          }
                        `}
                      >
                        {isSelected && <Check size={14} />}
                        <span>{v.color}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedVariant.size && (
              <div className="flex items-center justify-between p-4 bg-foreground/[0.02] border border-foreground/10 rounded-xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">Talla</span>
                <span className="text-xs font-mono font-bold uppercase text-primary bg-background px-3 py-1 rounded-lg border border-foreground/10">
                  {selectedVariant.size}
                </span>
              </div>
            )}

            <div className="space-y-3 pt-4">
              {tenant.whatsApp ? (
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-500/20 active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle size={20} />
                  <span>Pedir por WhatsApp</span>
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-foreground/5 text-center text-xs font-bold text-foreground-muted">
                  WhatsApp no configurado
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-foreground-muted uppercase tracking-widest opacity-60 pt-2">
                <ShieldCheck size={14} />
                <span>Envío directo y garantizado por la tienda</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer businessName={tenant.businessName} slug={slug} whatsApp={tenant.whatsApp} />
    </div>
  );
}
