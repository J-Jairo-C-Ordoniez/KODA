'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardDetail from '@/components/Landing/Main/ui/CardDetail';
import Link from 'next/link';
import gsap from 'gsap';
import { Package, Wallet, CheckCircle2, ArrowRight } from 'lucide-react';


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
      <div className="max-w-7xl container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <header className="scrolly-header lg:col-span-5 opacity-0 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-contrast text-sm font-bold mb-8">
              <CheckCircle2 size={16} />
              <span>Eficiencia garantizada</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-[0.9]">
              Diseñado para <br />
              <span className="text-contrast">tu forma</span> de <br />
              trabajar
            </h2>

            <p className="text-foreground-muted text-xl md:text-2xl font-medium max-w-md leading-relaxed mb-10">
              Únete a los negocios que ya orquestan sus ventas, inventarios y clientes en un solo lugar.
            </p>

            <Link
              href="/register"
              className="w-fit group flex items-center justify-between gap-4 px-8 py-5 bg-primary text-background font-black rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-primary/10"
            >
              <span>Comenzar ahora</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </header>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <CardDetail
              icon={Package}
              title="Inventario y ventas sincronizados"
              description="Cada vez que realizas una venta, tu inventario se actualiza en tiempo real. Olvídate de los cuadernos y las cuentas manuales que generan pérdidas."
            />

            <CardDetail
              icon={Wallet}
              title="Control de fiados sin estrés"
              description="Registra a tus clientes recurrentes y mantén un historial claro de lo que deben y lo que han pagado. Tu dinero siempre rastreado."
            />

            <div className="md:col-span-2">
               <CardDetail
                icon={CheckCircle2}
                title="Reportes automáticos"
                description="Visualiza el rendimiento de tu negocio con gráficas claras. Toma decisiones basadas en datos, no en suposiciones."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

