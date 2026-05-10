'use client';

import { useRef } from 'react';
import Container from '../../../ui/Container';
import Button from '../../../ui/Button';
import { ShoppingBag, Users, BarChart2, Globe2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: {
        trigger: containerRef.current, start: 'top 80%',
      }}
    );
    gsap.fromTo('.integration-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
        trigger: '.integration-cards-container', start: 'top 80%',
      }}
    );
    gsap.fromTo('.integration-banner',
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power4.out', scrollTrigger: {
        trigger: '.integration-banner', start: 'top 85%',
      }}
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-contrast/5 blur-[120px] rounded-full pointer-events-none" />
      <Container className="relative z-10">

        <article className="integration-header opacity-0 text-center mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-tight tracking-tighter mb-6">
            Todo lo que necesitas,<br />
            <span className="text-foreground-muted">en un solo lugar.</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto font-medium leading-relaxed">
            Cada módulo de KODA está diseñado para trabajar en conjunto. Lo que pasa en ventas
            se refleja en inventario, en fiados y en tu catálogo público automáticamente.
          </p>
        </article>

        <article className="integration-cards-container grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className="integration-card opacity-0 flex flex-col p-10 md:p-14 rounded-[40px] bg-background-elevated border border-foreground/8 hover:border-foreground/20 hover:scale-[1.02] transition-all duration-500 shadow-2xl"
            >
              {/* Icon badge */}
              <div className={`w-16 h-16 ${mod.iconBg} rounded-2xl flex items-center justify-center mb-12`}>
                {mod.icon}
              </div>

              {/* Content */}
              <div className="mt-auto">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-primary mb-4 leading-none">
                  {mod.title}
                </h3>
                <p className="text-lg font-medium leading-relaxed text-foreground-muted mb-6">
                  {mod.desc}
                </p>
                <p className="text-xs uppercase tracking-widest font-bold text-foreground-muted/50">
                  {mod.detail}
                </p>
              </div>
            </div>
          ))}
        </article>

        <article className="integration-banner opacity-0 mt-16 p-12 md:p-16 rounded-[40px] bg-background-elevated border border-foreground/10 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-2xl">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-contrast/8 blur-[80px] rounded-full pointer-events-none" />
          <div className="space-y-4 text-center lg:text-left max-w-2xl relative z-10">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary leading-tight tracking-tighter">
              ¿Tienes un modelo de negocio diferente?
            </h3>
            <p className="text-lg text-foreground-muted font-medium leading-relaxed">
              Platicamos sobre cómo KODA puede adaptarse a tu negocio específico. Sin costo.
            </p>
          </div>
          <Button
            href="https://wa.me/573001234567"
            variant="contrast"
            className="px-8 py-5 font-black tracking-widest text-white bg-contrast hover:bg-contrast-hover rounded-2xl transition-all relative z-10 shadow-[0_0_20px_rgba(255,122,0,0.25)] hover:scale-105 shrink-0"
          >
            HABLEMOS POR WHATSAPP
          </Button>
        </article>

      </Container>
    </section>
  );
}
