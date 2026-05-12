'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardDetail from '@/components/Landing/Main/ui/CardDetail';
import Link from 'next/link';
import gsap from 'gsap';


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Details() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.scrolly-header',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    const cards = gsap.utils.toArray('.scrolly-card');

    cards.forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          }
        }
      );

      const imgBlock = card.querySelector('.scrolly-img');
      if (imgBlock) {
        gsap.fromTo(imgBlock,
          { scale: 0.85, opacity: 0, rotationX: 10 },
          {
            scale: 1, opacity: 1, rotationX: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
            }
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="max-w-6xl container mx-auto px-4 relative z-10">
        <header className="scrolly-header mb-20 opacity-0">
          <h2 className="text-4xl md:text-7xl font-black text-primary mb-6 tracking-tighter leading-none">
            Diseñado para tu <br />
            forma de trabajar
          </h2>

          <p className="text-foreground-muted text-xl md:text-2xl font-medium max-w-2xl">
            Únete a los negocios que ya orquestan sus ventas, inventarios y clientes en un solo lugar.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-block text-center px-8 py-4 bg-transparent border border-foreground/20 text-primary font-bold rounded-xl hover:bg-foreground/10 -elevated transition-all"
          >
            Probar Koda
          </Link>
        </header>

        <div className="space-y-12 md:space-y-24">
          <CardDetail
            title="Inventario y ventas sincronizados"
            description="Cada vez que realizas una venta, tu inventario se actualiza en tiempo real. Olvídate de los cuadernos y las cuentas manuales que generan pérdidas."
            color="contrast"
          >
            <div className="absolute inset-0 bg-linear-to-br from-contrast/20 to-background opacity-50" />
            <div className="w-3/4 h-3/4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md p-6 flex flex-col gap-4 shadow-2xl">
              <div className="h-6 w-1/3 bg-white/20 rounded-md" />
              <div className="h-16 w-full bg-white/10 rounded-xl" />
              <div className="h-16 w-full bg-white/10 rounded-xl" />
              <div className="h-16 w-full bg-white/10 rounded-xl" />
            </div>
          </CardDetail>
          <CardDetail
            title="Control de fiados sin estrés."
            description="Registra a tus clientes recurrentes y mantén un historial claro de lo que deben y lo que han pagado. Tu dinero siempre rastreado."
            color="success"
          >
            <div className="absolute inset-0 bg-linear-to-br from-success/20 to-background opacity-50" />
            <div className="w-3/4 h-3/4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md p-6 flex flex-col gap-4 shadow-2xl">
              <div className="h-6 w-1/3 bg-white/20 rounded-md" />
              <div className="h-16 w-full bg-white/10 rounded-xl" />
              <div className="h-16 w-full bg-white/10 rounded-xl" />
              <div className="h-16 w-full bg-white/10 rounded-xl" />
            </div>
          </CardDetail>
        </div>
      </div>
    </section>
  );
}
