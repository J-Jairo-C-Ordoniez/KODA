'use client';

import { MapPin } from 'lucide-react';

export default function AboutShippingInfo() {
  return (
    <section 
      aria-labelledby="shipping-heading" 
      className="space-y-4"
    >
      <div className="flex items-center gap-3 text-primary">
        <MapPin 
          size={20} 
          strokeWidth={1.5} 
          className="text-primary/60" 
          aria-hidden="true" 
        />
        <h2 
          id="shipping-heading" 
          className="text-lg font-bold tracking-tight"
        >
          Ventas y Despachos
        </h2>
      </div>

      <p className="text-sm font-normal text-primary/60 leading-relaxed">
        Realizamos despachos garantizados con número de guía directamente a tu WhatsApp para que puedas hacer seguimiento a tu pedido en tiempo real.
      </p>
    </section>
  );
}
