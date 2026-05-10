"use client";

import { useMemo } from "react";
import Link from "next/link";
import { MessageCircle, Package, ShieldCheck, Zap, Info } from "lucide-react";

interface Props {
  product: any;
  variant: any;
  allVariants: any[];
  contact?: string;
  setSelectedVariant: (v: any) => void;
}

export default function ProductInfo({ product, variant, allVariants, contact, setSelectedVariant }: Props) {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  const stock = variant?.inventories?.[0]?.stock ?? 0;
  const isLowStock = stock > 0 && stock <= 5;
  const isOutOfStock = stock === 0;

  const colors = useMemo(() => {
    const seen = new Set<string>();
    return allVariants.filter(v => { 
      if (seen.has(v.color)) return false; 
      seen.add(v.color); 
      return true; 
    });
  }, [allVariants]);

  const sizes = useMemo(() => {
    return allVariants.filter((v: any) => v.color === variant.color);
  }, [allVariants, variant.color]);

  const handleColorChange = (color: string) => {
    const first = allVariants.find(v => v.color === color);
    if (first) setSelectedVariant(first);
  };

  const handleSizeChange = (v: any) => {
    setSelectedVariant(v);
  };

  const whatsappLink = useMemo(() => {
    if (!contact) return null;
    const priceStr = formatter.format(Number(variant.price));
    const message = `Hola, me interesa este producto:\n\n*${product.name} — ${variant.name}*\nColor: ${variant.color}\nTalla: ${variant.size}\nPrecio: ${priceStr} COP\nSKU: ${variant.sku}\n\n¿Está disponible?`;
    const phone = contact.replace(/\D/g, '');
    return `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;
  }, [product, variant, contact, formatter]);

  return (
    <section className="flex flex-col gap-10">
      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-contrast">
            {product.category?.name || "Colección Exclusiva"}
          </p>
          <div className="h-1 w-1 rounded-full bg-contrast/40" />
          <div className="flex items-center gap-1 text-[10px] font-bold text-foreground-muted uppercase tracking-widest opacity-60">
             <Zap size={10} className="text-contrast" />
             Nuevo
          </div>
        </div>
        
        <div className="space-y-1">
          <h1 className="text-4xl xl:text-5xl font-black text-primary uppercase tracking-tighter leading-[0.9]">
            {product.name}
          </h1>
          <p className="text-lg font-bold text-foreground-muted tracking-tight opacity-80 mt-2">
            Edición {variant.name}
          </p>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex flex-wrap items-center gap-6 py-6 border-y border-white/5">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-primary tracking-tighter">
            {formatter.format(Number(variant.price))}
          </span>
          <span className="text-sm font-black text-foreground-muted uppercase tracking-widest opacity-40">COP</span>
        </div>
        
        {isLowStock && (
          <div className="flex items-center gap-2 px-4 py-2 bg-contrast/10 border border-contrast/20 rounded-xl text-contrast">
             <Info size={14} />
             <span className="text-[10px] font-black uppercase tracking-widest">Últimas {stock} unidades</span>
          </div>
        )}
        {isOutOfStock && (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
             <Info size={14} />
             <span className="text-[10px] font-black uppercase tracking-widest">Agotado temporalmente</span>
          </div>
        )}
      </div>

      {/* Selectors Wrapper */}
      <div className="space-y-10">
        {/* Color Selector */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground-muted opacity-60">
              Color Seleccionado
            </p>
            <p className="text-xs font-black text-primary uppercase tracking-tight">
              {variant.color}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {colors.map((v: any) => {
              const isActive = v.color === variant.color;
              return (
                <button
                  key={v.variantId}
                  onClick={() => handleColorChange(v.color)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    isActive
                      ? 'bg-contrast text-white border-contrast shadow-2xl shadow-contrast/20 scale-105'
                      : 'bg-background-elevated/50 text-foreground-muted border-white/5 hover:border-contrast/30 hover:text-primary'
                  }`}
                >
                  {v.color}
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Selector */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground-muted opacity-60">
              Tallas Disponibles
            </p>
            <p className="text-xs font-black text-primary uppercase tracking-tight">
              {variant.size}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {sizes.map((v: any) => {
              const isActive = v.variantId === variant.variantId;
              const sizeStock = v.inventories?.[0]?.stock ?? 0;
              const noStock = sizeStock === 0;
              return (
                <button
                  key={v.variantId}
                  onClick={() => !noStock && handleSizeChange(v)}
                  disabled={noStock}
                  className={`w-16 h-16 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all border flex flex-col items-center justify-center gap-0.5 ${
                    isActive
                      ? 'bg-primary text-background border-primary shadow-2xl shadow-primary/20 scale-105'
                      : noStock
                      ? 'bg-background-elevated/20 text-foreground-muted/20 border-white/5 cursor-not-allowed'
                      : 'bg-background-elevated/50 text-foreground-muted border-white/10 hover:border-contrast/40 hover:text-primary'
                  }`}
                >
                  <span>{v.size}</span>
                  {noStock && <div className="absolute inset-0 flex items-center justify-center"><div className="w-8 h-[2px] bg-red-500/30 rotate-45" /></div>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="space-y-4 pt-4">
           <p className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground-muted opacity-60">Descripción</p>
           <p className="text-sm font-medium text-foreground-muted leading-relaxed opacity-80">
            {product.description}
           </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-4 pt-10 mt-auto">
        {whatsappLink ? (
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-4 w-full py-6 rounded-[32px] font-black text-xs uppercase tracking-[0.2em] transition-all ${
              isOutOfStock
                ? 'bg-foreground/5 text-foreground-muted cursor-not-allowed pointer-events-none'
                : 'bg-[#25D366] text-white hover:bg-[#1db954] hover:scale-[1.02] active:scale-95 shadow-2xl shadow-[#25D366]/20'
            }`}
          >
            <MessageCircle size={24} fill="currentColor" />
            {isOutOfStock ? 'Producto Agotado' : 'Pedir por WhatsApp'}
          </Link>
        ) : (
          <div className="flex items-center gap-4 w-full py-6 rounded-[32px] bg-foreground/5 text-foreground-muted justify-center text-xs font-black uppercase tracking-widest opacity-50">
            <Package size={22} />
            Contacto no configurado
          </div>
        )}

        <div className="flex items-center justify-center gap-6 opacity-30">
           <div className="flex items-center gap-2">
              <ShieldCheck size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">Compra Segura</span>
           </div>
           <div className="flex items-center gap-2">
              <Zap size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">Envío Inmediato</span>
           </div>
        </div>
      </div>
    </section>
  );
}
