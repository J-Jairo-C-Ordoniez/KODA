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
      icon: <ShoppingBag size={40} className="text-[#3A86FF]" />,
      iconBg: 'bg-[#3A86FF]/15',
      title: 'Catálogo y Variantes',
      desc: 'Organiza tu inventario en categorías, productos y variantes (talla, color, SKU). KODA descuenta las unidades automáticamente con cada venta, sin que tengas que hacer nada.',
      detail: '3 capas: Categoría → Producto → Variante',
    },
    {
      icon: <Users size={40} className="text-success" />,
      iconBg: 'bg-[#00C896]/15',
      title: 'Clientes y Fiados',
      desc: 'Registra a tus clientes recurrentes y gestiona sus créditos. Cada fiado se vincula al perfil del cliente: quién debe, cuánto y desde cuándo. Tu liquidez siempre visible.',
      detail: 'Historial de abonos por empleado',
    },
    {
      icon: <BarChart2 size={40} className="text-contrast" />,
      iconBg: 'bg-contrast/15',
      title: 'Reportes en Tiempo Real',
      desc: 'Visualiza tus ventas del día, ganancias netas vs costos y rendimiento por empleado. Toma decisiones basadas en datos reales, no en suposiciones ni cuadernos.',
      detail: 'Métricas por empleado y categoría',
    },
    {
      icon: <Globe2 size={40} className="text-[#7B61FF]" />,
      iconBg: 'bg-[#7B61FF]/15',
      title: 'Catálogo Público',
      desc: 'Tu inventario también es tu vitrina. Si vendes la última unidad en el local, queda como "Agotado" en el catálogo online al instante. Sin trabajo extra.',
      detail: 'Enlace único por negocio para tus clientes',
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
      className="pb-30 pt-16 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl container mx-auto px-6 relative z-10">
        <header className="integration-header opacity-0 text-center mb-28">
          <h2 className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-[1.1] md:leading-[0.9] max-w-4xl mx-auto">
            Todo lo que necesitas,<br />
            <span className="text-foreground-muted">en un solo lugar.</span>
          </h2>
          <p className="text-foreground-muted text-lg md:text-2xl font-medium max-w-2xl leading-relaxed mx-auto">
            Cada módulo de KODA está diseñado para trabajar en conjunto. Lo que pasa en ventas
            se refleja en inventario, en fiados y en tu catálogo público automáticamente.
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


