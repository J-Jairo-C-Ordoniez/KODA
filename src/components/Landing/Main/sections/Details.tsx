'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardDetail from '@/components/Landing/Main/ui/CardDetail';
import Link from 'next/link';
import gsap from 'gsap';
import { MousePointerClick, Search, WifiOff, CheckCircle2, ArrowRight } from 'lucide-react';

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
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-20 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <header className="scrolly-header lg:col-span-5 opacity-0 lg:sticky lg:top-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-contrast text-sm font-bold mb-8">
            <CheckCircle2 size={16} />
            <span>Usabilidad garantizada</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-[0.9]">
            Diseñado para <br />
            <span className="text-contrast">tu forma</span> de <br />
            trabajar
          </h2>

          <p className="text-foreground-muted text-xl md:text-2xl font-medium max-w-md leading-relaxed mb-10">
            Únete a los negocios que ya orquestan sus ventas con el sistema más rápido y fácil de usar.
          </p>

          <Link
            href="/register"
            className="w-fit group flex items-center justify-between gap-4 px-8 py-5 bg-primary text-background font-black rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-primary/10"
          >
            <span>Comenzar ahora</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </header>

        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
          <CardDetail
            icon={MousePointerClick}
            title="Ventas en 3 clics"
            description="El flujo más rápido del mercado. Desde que buscas una prenda hasta que registras el pago, sin dar vueltas innecesarias ni confundir a tus empleados."
          />

          <CardDetail
            icon={Search}
            title="Buscador Ultra-rápido"
            description="Encuentra tus productos por talla, color o nombre en milisegundos. Olvídate de memorizar códigos complejos, el sistema te entiende."
          />

          <CardDetail
            icon={WifiOff}
            title="A prueba de caídas"
            description="¿Se cortó el internet? No hay problema. El sistema no se congela, puedes seguir vendiendo y KODA sincronizará todo automáticamente cuando vuelva la conexión."
          />
        </div>
      </div>
    </section>
  );
}

