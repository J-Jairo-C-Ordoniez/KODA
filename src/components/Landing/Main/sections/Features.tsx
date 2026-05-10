'use client';

import { useRef } from 'react';
import Container from '../../../ui/Container';
import { ShoppingCart, UserCheck, BarChart3, Cloud } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      subTextColor: 'text-white/80'
    },
    {
      title: 'Gestión de Fiados',
      description: 'Registro exacto de deudas y abonos. Automatiza el cobro sin perder rastro.',
      icon: <UserCheck size={40} className="text-background" />,
      color: 'bg-[#00C896]',
      textColor: 'text-[#0E0E0E]',
      subTextColor: 'text-[#0E0E0E]/80'
    },
    {
      title: 'Reportes en Vivo',
      description: 'Visualiza ganancias, ventas diarias y tendencias de productos en tiempo real.',
      icon: <BarChart3 size={40} className="text-white" />,
      color: 'bg-[#3A86FF]',
      textColor: 'text-white',
      subTextColor: 'text-white/80'
    },
    {
      title: 'Siempre en la Nube',
      description: 'Datos seguros y accesibles 24/7. Tu negocio siempre contigo, donde quiera que estés.',
      icon: <Cloud size={40} className="text-white" />,
      color: 'bg-[#7B61FF]',
      textColor: 'text-white',
      subTextColor: 'text-white/80'
    }
  ];

  useGSAP(() => {
    gsap.fromTo('.feature-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }}
    );

    gsap.fromTo('.feature-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
        trigger: '.feature-cards-container',
        start: 'top 80%',
      }}
    );
  }, { scope: containerRef });

  return (
    <section
      id="features"
      ref={containerRef}
      className="pb-32 pt-24 bg-background relative"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
      <Container>
        <article className="feature-header text-center mb-20 opacity-0">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-tight tracking-tighter mb-6">
            Todo tu negocio de <br />
            principio a fin en un solo lugar.
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto font-medium leading-relaxed">
            Desde la venta en mostrador hasta el control de inventario y fiados. Todos tus datos centralizados para que trabajes más rápido.
          </p>
        </article>

        <article className="feature-cards-container grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card opacity-0 flex flex-col p-10 md:p-14 rounded-[40px] ${f.color} hover:scale-[1.02] transition-transform duration-500 shadow-2xl`}
            >
              <div className="mb-12">
                {f.icon}
              </div>
              <div className="mt-auto">
                <h3 className={`text-2xl md:text-3xl font-black tracking-tight ${f.textColor} mb-4 leading-none`}>
                  {f.title}
                </h3>
                <p className={`text-lg font-medium leading-relaxed ${f.subTextColor}`}>
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </article>
      </Container>
    </section>
  );
}
