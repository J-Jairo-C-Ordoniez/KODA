'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InteractiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.scrolly-header',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
      }}
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
    <section ref={containerRef} className="py-24 bg-background relative overflow-hidden" style={{ perspective: '1000px' }}>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        <div className="scrolly-header mb-20 opacity-0">
          <h2 className="text-5xl md:text-7xl font-black text-primary mb-6 tracking-tighter leading-[1.1]">
            Diseñado para tu <br />
            forma de trabajar
          </h2>
          <p className="text-foreground-muted text-xl md:text-2xl font-medium max-w-2xl">
            Únete a los negocios que ya orquestan sus ventas, inventarios y clientes en un solo lugar.
          </p>
          <Link href="/register" className="inline-block mt-8 px-8 py-4 bg-background-elevated text-primary font-bold rounded-xl hover:bg-foreground/10 border border-foreground/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            Pruébalo gratis
          </Link>
        </div>

        <div className="space-y-12 md:space-y-24">
          {/* Card 1 */}
          <div className="scrolly-card opacity-0 flex flex-col md:flex-row items-center gap-10 bg-background-elevated border border-foreground/5 rounded-[40px] p-8 md:p-12 shadow-2xl">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-contrast/10 rounded-2xl flex items-center justify-center">
                 <svg className="w-8 h-8 text-contrast" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-primary leading-tight tracking-tight">
                Sincronización total entre tu inventario y tus ventas.
              </h3>
              <p className="text-lg text-foreground-muted leading-relaxed">
                Cada vez que realizas una venta, tu inventario se actualiza en tiempo real. Olvídate de los cuadernos y las cuentas manuales que generan pérdidas.
              </p>
              <Link href="#features" className="inline-block px-6 py-3 bg-transparent border border-foreground/20 text-primary font-bold rounded-xl hover:bg-foreground/5 transition-all">
                Conoce el módulo de inventario
              </Link>
            </div>
            <div className="scrolly-img flex-1 w-full bg-background rounded-3xl border border-foreground/10 aspect-square md:aspect-4/3 flex items-center justify-center relative overflow-hidden transform-gpu">
               <div className="absolute inset-0 bg-linear-to-br from-contrast/20 to-background opacity-50" />
               <div className="w-3/4 h-3/4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md p-6 flex flex-col gap-4 shadow-2xl">
                  <div className="h-6 w-1/3 bg-white/20 rounded-md" />
                  <div className="h-16 w-full bg-white/10 rounded-xl" />
                  <div className="h-16 w-full bg-white/10 rounded-xl" />
                  <div className="h-16 w-full bg-white/10 rounded-xl" />
               </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="scrolly-card opacity-0 flex flex-col md:flex-row-reverse items-center gap-10 bg-background-elevated border border-foreground/5 rounded-[40px] p-8 md:p-12 shadow-2xl">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center">
                 <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-primary leading-tight tracking-tight">
                Control de fiados y cuentas por cobrar sin estrés.
              </h3>
              <p className="text-lg text-foreground-muted leading-relaxed">
                Registra a tus clientes recurrentes y mantén un historial claro de lo que deben y lo que han pagado. Tu dinero siempre rastreado.
              </p>
            </div>
            <div className="scrolly-img flex-1 w-full bg-background rounded-3xl border border-foreground/10 aspect-square md:aspect-4/3 flex items-center justify-center relative overflow-hidden transform-gpu">
               <div className="absolute inset-0 bg-linear-to-br from-success/20 to-background opacity-50" />
               <div className="w-3/4 h-3/4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md flex items-center justify-center shadow-2xl">
                  <div className="w-32 h-32 rounded-full border-4 border-success flex items-center justify-center shadow-[0_0_50px_rgba(0,200,150,0.3)]">
                    <span className="text-success font-black text-5xl">$</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
