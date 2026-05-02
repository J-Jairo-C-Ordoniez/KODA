"use client";

import { useMemo } from "react";
import Link from "next/link";
import { MessageCircle, Package, Star } from "lucide-react";

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
    return allVariants.filter(v => { if (seen.has(v.color)) return false; seen.add(v.color); return true; });
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
    const message = `¡Hola! 👋 Me interesa este producto:\n\n*${product.name} — ${variant.name}*\n📦 Color: ${variant.color}\n📐 Talla: ${variant.size}\n💰 Precio: ${priceStr} COP\n🔖 SKU: ${variant.sku}\n\n¿Está disponible?`;
    const phone = contact.replace(/\D/g, '');
    return `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;
  }, [product, variant, contact, formatter]);

  return (
    <section className="flex flex-col gap-8 py-4">
      {/* Category + Name */}
      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-black uppercase tracking-widest text-secondary/60">
          {product.category?.name || "Colección"}
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight leading-tight">
          {product.name}
        </h1>
        <p className="text-base font-medium text-secondary/80 leading-relaxed mt-1">
          {variant.name}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <span className="text-3xl font-black text-primary">
          {formatter.format(Number(variant.price))}
          <span className="text-base font-medium text-secondary ml-2">COP</span>
        </span>
        {isLowStock && (
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            Últimas {stock} unidades
          </span>
        )}
        {isOutOfStock && (
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200">
            Sin stock
          </span>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-sm font-medium text-secondary leading-relaxed border-t border-foreground/5 pt-6">
          {product.description}
        </p>
      )}

      {/* Color Selector */}
      <div className="flex flex-col gap-3 border-t border-foreground/5 pt-6">
        <p className="text-[11px] font-black uppercase tracking-widest text-secondary">
          Color: <span className="text-primary">{variant.color}</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {colors.map((v: any) => {
            const isActive = v.color === variant.color;
            return (
              <button
                key={v.variantId}
                onClick={() => handleColorChange(v.color)}
                title={v.color}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all border ${
                  isActive
                    ? 'bg-navy text-white border-navy shadow-lg shadow-navy/20'
                    : 'bg-transparent text-secondary border-foreground/15 hover:border-navy/40 hover:text-primary'
                }`}
              >
                {v.color}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Selector */}
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-black uppercase tracking-widest text-secondary">
          Talla: <span className="text-primary">{variant.size}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((v: any) => {
            const isActive = v.variantId === variant.variantId;
            const sizeStock = v.inventories?.[0]?.stock ?? 0;
            const noStock = sizeStock === 0;
            return (
              <button
                key={v.variantId}
                onClick={() => !noStock && handleSizeChange(v)}
                disabled={noStock}
                className={`w-14 h-14 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border relative ${
                  isActive
                    ? 'bg-navy text-white border-navy shadow-lg shadow-navy/20'
                    : noStock
                    ? 'bg-foreground/3 text-secondary/30 border-foreground/5 cursor-not-allowed line-through'
                    : 'bg-transparent text-secondary border-foreground/15 hover:border-navy/40 hover:text-primary cursor-pointer'
                }`}
              >
                {v.size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-4 border-t border-foreground/5">
        {whatsappLink ? (
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-3 w-full py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${
              isOutOfStock
                ? 'bg-foreground/5 text-secondary cursor-not-allowed pointer-events-none'
                : 'bg-[#25D366] text-white hover:bg-[#1db954] hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#25D366]/20'
            }`}
          >
            <MessageCircle size={22} fill="currentColor" />
            {isOutOfStock ? 'Producto agotado' : 'Consultar por WhatsApp'}
          </Link>
        ) : (
          <div className="flex items-center gap-3 w-full py-5 rounded-3xl bg-foreground/5 text-secondary justify-center text-sm font-black uppercase tracking-widest">
            <Package size={20} />
            Contacto no disponible
          </div>
        )}

        <p className="text-center text-[11px] text-secondary/50 font-medium">
          Precio en COP · Stock disponible: {stock} unidades
        </p>
      </div>
    </section>
  );
}
