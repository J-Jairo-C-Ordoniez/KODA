"use client";

import { useMemo } from "react";
import Link from "next/link";

export default function ProductInfo({ product, variant, allVariants, contact, setSelectedVariant }) {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  const colors = useMemo(() => {
    const uniqueColors = new Set();
    allVariants.forEach(v => uniqueColors.add(v.color));
    return Array.from(uniqueColors);
  }, [allVariants]);

  const sizes = useMemo(() => {
    return allVariants
      .filter(v => v.color === variant.color)
      .map(v => v.size);
  }, [allVariants, variant.color]);

  const handleColorChange = (color) => {
    const firstVariantOfColor = allVariants.find(v => v.color === color);
    if (firstVariantOfColor) {
      setSelectedVariant(firstVariantOfColor);
    }
  };

  const handleSizeChange = (size) => {
    const variantOfSize = allVariants.find(v => v.color === variant.color && v.size === size);
    if (variantOfSize) {
      setSelectedVariant(variantOfSize);
    }
  };

  const whatsappLink = useMemo(() => {
    const priceStr = formatter.format(variant.price).replace('$', '$ ');
    const message = `Hola, me interesa este producto:
                    *${product.name} - ${variant.name}*
                    Color: ${variant.color}
                    Talla: ${variant.size}
                    Precio: ${priceStr}
                    SKU: ${variant.sku}`;

    return `https://wa.me/57${contact}?text=${encodeURIComponent(message)}`;
  }, [product, variant, contact]);

  return (
    <section className="flex flex-col space-y-10">
      <article>
        <h2 className="text-secondary tracking-widest uppercase text-xs font-semibold pb-2">
          {product.category?.name || "Detalles"}
        </h2>
        <h1 className="text-xl md:text-2xl font-medium tracking-widest text-primary uppercase border-b border-secondary/10 pb-2">
          {variant.name}
        </h1>
        <div className="flex justify-between items-center py-2 border-b border-secondary/10">
          <span className="text-lg font-semibold text-primary">
            {formatter.format(variant.price).replace('$', '$ ')} COP
          </span>
          <span className="text-xs tracking-wider font-medium border border-secondary/20 px-4 py-2 uppercase">
            Popularidad: {variant.popularity}
          </span>
        </div>
      </article>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xs tracking-wider font-bold text-primary/80 uppercase">
            Detalles del Producto
          </h3>
          <p className="text-md font-medium tracking-wider text-secondary">
            {product.description}
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-xs tracking-wider font-bold text-primary/60 uppercase">
            Color: <span className="text-primary">{variant.color}</span>
          </h3>
          <div className="flex gap-3">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className="p-2 border border-secondary/60 transition-all hover:border-secondary cursor-pointer"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-xs tracking-wider font-bold text-secondary uppercase">
            Talla: <span className="text-primary">{variant.size}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`min-w-[48px] h-12 flex items-center justify-center border text-xs font-medium tracking-widest transition-all ${variant.size === size
                    ? 'bg-primary text-white border-primary'
                    : 'bg-transparent text-secondary border-secondary/20 hover:border-primary/50'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-10">
        <Link
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-4 rounded-md text-sm font-medium tracking-wider uppercase"
        >
          Comprar por WhatsApp
        </Link>
      </div>
    </section>
  );
}
