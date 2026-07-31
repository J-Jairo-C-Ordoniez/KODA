'use client';

import { MessageCircle, ShieldCheck } from 'lucide-react';
import Button from '@/shared/components/Button';

interface Props {
  whatsApp?: string;
  onWhatsAppOrder: () => void;
}

export default function ProductActions({ whatsApp, onWhatsAppOrder }: Props) {
  return (
    <section 
      aria-label="Acciones de compra y despacho"
      className="space-y-4 pt-4"
    >
      {whatsApp ? (
        <Button
          variant="primary"
          onClick={onWhatsAppOrder}
          className="w-fit"
          aria-label="Pedir prenda directamente por WhatsApp"
        >
          <MessageCircle 
            size={18} 
            strokeWidth={1.5} 
            aria-hidden="true" 
          />
          <span>Pedir por WhatsApp</span>
        </Button>
      ) : (
        <p className="p-3 rounded-xl bg-primary/5 text-center text-xs font-medium text-primary/40">
          WhatsApp no configurado
        </p>
      )}
    </section>
  );
}
