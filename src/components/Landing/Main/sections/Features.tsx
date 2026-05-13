'use client';

import { useRef } from 'react';
import { ShoppingCart, UserCheck, BarChart3, Cloud } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardFeature from '@/components/Landing/Main/ui/CardFeature';
import gsap from 'gsap';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: 'Inventario Inteligente',
      description: 'Controla tus productos con categorías dinámicas y recibe alertas de stock bajo.',
      icon: <ShoppingCart size={40} className="text-white" />,
      color: 'bg-[#FF7A00]',
      textColor: 'text-white',
      subTextColor: 'text-white/80',
      gradient: 'bg-white'
    },
    {
      title: 'Gestión de Fiados',
      description: 'Registro exacto de deudas y abonos. Automatiza el cobro sin perder rastro.',
      icon: <UserCheck size={40} className="text-background" />,
      color: 'bg-[#00C896]',
      textColor: 'text-[#0E0E0E]',
      subTextColor: 'text-[#0E0E0E]/80',
      gradient: 'bg-black'
    },
    {
      title: 'Reportes en Vivo',
      description: 'Visualiza ganancias, ventas diarias y tendencias de productos en tiempo real.',
      icon: <BarChart3 size={40} className="text-white" />,
      color: 'bg-[#3A86FF]',
      textColor: 'text-white',
      subTextColor: 'text-white/80',
      gradient: 'bg-white'
    },
    {
      title: 'Siempre en la Nube',
      description: 'Datos seguros y accesibles 24/7. Tu negocio siempre contigo, donde quiera que estés.',
      icon: <Cloud size={40} className="text-white" />,
      color: 'bg-[#7B61FF]',
      textColor: 'text-white',
      subTextColor: 'text-white/80',
      gradient: 'bg-white'
    }
  ];

  useGSAP(() => {
    gsap.fromTo('.feature-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.feature-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
          trigger: '.feature-cards-container',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="features"
      ref={containerRef}
      className="pb-32 pt-24 bg-background relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-contrast/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="max-w-7xl container mx-auto px-6 relative z-10">
        <header className="feature-header text-center mb-24 opacity-0">
          <h2 className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-[1.1] md:leading-[0.9] max-w-4xl mx-auto">
            Todo tu negocio de principio a fin en un solo lugar.
          </h2>

          <p className="text-foreground-muted text-lg md:text-2xl font-medium max-w-2xl leading-relaxed mx-auto">
            Desde la venta en mostrador hasta el control de inventario y fiados. Todos tus datos centralizados para que trabajes más rápido.
          </p>
        </header>

        <div className="feature-cards-container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <CardFeature
              key={i}
              feature={f}
            />
          ))}
        </div>
      </div>
    </section>
  );
}