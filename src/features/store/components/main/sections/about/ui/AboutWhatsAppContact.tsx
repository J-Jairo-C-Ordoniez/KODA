'use client';

import { MessageCircle } from 'lucide-react';
import Button from '@/shared/components/Button';

interface Props {
  whatsApp: string;
  businessName: string;
}

export default function AboutWhatsAppContact({ whatsApp, businessName }: Props) {
  const whatsappUrl = `https://wa.me/57${whatsApp}`;

  return (
    <section 
      aria-labelledby="whatsapp-heading" 
      className="space-y-4"
    >
      <div className="flex items-center gap-3 text-primary">
        <MessageCircle 
          size={20} 
          strokeWidth={1.5} 
          className="text-emerald-600" 
          aria-hidden="true" 
        />
        <h2 
          id="whatsapp-heading" 
          className="text-lg font-bold tracking-tight"
        >
          Atención por WhatsApp
        </h2>
      </div>

      <p className="text-sm font-normal text-primary/60 leading-relaxed">
        Contacta directamente con nuestro equipo para recibir asesoría personalizada sobre tallas, disponibilidad de prendas y envíos.
      </p>

      <address className="not-italic pt-2">
        <Button
          variant="primary"
          size="md"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="gap-2"
          aria-label={`Enviar mensaje directo por WhatsApp a ${businessName}`}
        >
          <MessageCircle 
            size={18} 
            strokeWidth={1.5} 
            aria-hidden="true" 
          />
          <span>Escribir a WhatsApp</span>
        </Button>
      </address>
    </section>
  );
}
