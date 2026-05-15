'use client';

import { useState } from 'react';
import { Layers } from 'lucide-react';
import ProductDetailHeader from './ui/ProductDetailHeader';
import VariantCard from './ui/VariantCard';

interface ProductDetailProps {
  product: any;
  onBack: () => void;
  onAddVariant: () => void;
  onEditVariant: (variant: any) => void;
  onDeleteVariant: (id: string) => void;
  onUpdateStock: (variantId: string, newStock: number) => Promise<any>;
}

export default function ProductDetail({ 
  product, 
  onBack, 
  onAddVariant, 
  onEditVariant, 
  onDeleteVariant
}: ProductDetailProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <ProductDetailHeader 
        product={product} 
        onBack={onBack} 
        onAddVariant={onAddVariant} 
      />

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-primary tracking-tight">Variantes</h3>
          <span className="bg-contrast/10 border border-contrast/20 text-contrast px-3 py-1 rounded-full text-xs font-bold">{product.variants?.length || 0}</span>
        </div>

        {product.variants?.length === 0 ? (
          <div className="py-20 text-center space-y-4 border-2 border-dashed border-foreground/8 rounded-3xl">
            <div className="w-16 h-16 rounded-2xl bg-contrast/10 border border-contrast/20 flex items-center justify-center mx-auto">
              <Layers size={28} className="text-contrast/40" />
            </div>
            <p className="text-foreground-muted font-medium text-sm">Añade tallas, colores o modelos para empezar a vender.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {product.variants.map((v: any) => (
              <VariantCard 
                key={v.variantId} 
                v={v} 
                activeMenuId={activeMenuId} 
                setActiveMenuId={setActiveMenuId} 
                onEditVariant={onEditVariant} 
                onDeleteVariant={onDeleteVariant} 
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}