'use client';

import { useRef } from 'react';
import { ShoppingBag, Users, BarChart2, Globe2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardIntegration from '../ui/CardIntegration';
import OtherBusiness from '../ui/OtherBusiness';
import gsap from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null);

  const modules = [
    {
      icon: <Globe2 size={40} className="text-[#7B61FF]" />,
      iconBg: 'bg-[#7B61FF]/15',
      title: 'Tu vitrina siempre activa',
      desc: 'Tu inventario se convierte en catálogo público automáticamente. Sin fotos extra, sin trabajo adicional. Tus clientes pueden ver lo disponible desde el celular en cualquier momento.',
      detail: 'Enlace único para compartir por WhatsApp',
    },
    {
      icon: <ShoppingBag size={40} className="text-[#3A86FF]" />,
      iconBg: 'bg-[#3A86FF]/15',
      title: 'Stock en tiempo real',
      desc: 'Cada venta descuenta el inventario al instante. Si vendes la última unidad en el local, queda como "Agotado" en el catálogo online al instante. Sin doble trabajo.',
      detail: 'Sincronización automática, cero esfuerzo extra',
    },
    {
      icon: <Users size={40} className="text-success" />,
      iconBg: 'bg-[#00C896]/15',
      title: 'Vende sin estar presente',
      desc: 'Comparte el catálogo por WhatsApp y tus clientes hacen pedidos sin que tengas que atenderlos uno a uno. El sistema registra la intención de compra y te notifica.',
      detail: 'Pedidos desde el catálogo público',
    },
    {
      icon: <BarChart2 size={40} className="text-contrast" />,
      iconBg: 'bg-contrast/15',
      title: 'Más alcance, menos esfuerzo',
      desc: 'Tu negocio visible las 24 horas, sin pagar por publicidad. Convierte tu lista de precios en un canal de ventas real que trabaja por ti mientras tú atiendes el local.',
      detail: 'Presencia digital desde el día 1',
    },
  ];

  useGSAP(() => {
    gsap.fromTo('.integration-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: {
          trigger: containerRef.current, start: 'top 80%',
        }
      }
    );
    gsap.fromTo('.integration-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
          trigger: '.integration-cards-container', start: 'top 80%',
        }
      }
    );
    gsap.fromTo('.integration-banner',
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1, scale: 1, duration: 1, ease: 'power4.out', scrollTrigger: {
          trigger: '.integration-banner', start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-20 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl container mx-auto px-6 relative z-10">
        <header className="integration-header opacity-0 text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-[1.1] md:leading-[0.9] max-w-4xl mx-auto">
            Tu tienda local,<br />
            <span className="text-foreground-muted">con alcance digital.</span>
          </h2>
          <p className="text-foreground-muted text-lg md:text-2xl font-medium max-w-2xl leading-relaxed mx-auto">
            KODA convierte tu inventario en un catálogo online automáticamente. Vende por WhatsApp sin apps extra, sin esfuerzo y sin dejar de atender el mostrador.
          </p>
        </header>

        <div className="integration-cards-container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {modules.map((mod) => (
            <CardIntegration
              key={mod.title}
              integration={mod}
            />
          ))}
        </div>

        <OtherBusiness />
      </div>
    </section>
  );
}


