"use client";

import { useRef } from 'react';
import { Globe, ShoppingCart, MessageCircle, RefreshCw, Smartphone } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Container from '../../../ui/Container';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.integration-badge',
      { opacity: 0, y: -20, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
      }
    );

    gsap.fromTo('.integration-title',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.0, ease: 'power4.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 78%' }
      }
    );

    gsap.fromTo('.integration-desc',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
      }
    );

    gsap.fromTo('.integration-grid-item',
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: '.integration-benefits', start: 'top 80%' }
      }
    );

    gsap.fromTo('.phone-mockup',
      { opacity: 0, y: 60, rotate: -3, scale: 0.92 },
      {
        opacity: 1, y: 0, rotate: -2, scale: 1, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: '.integration-grid-container', start: 'top 78%' }
      }
    );

    ScrollTrigger.create({
      trigger: '.phone-mockup',
      start: 'top 75%',
      onEnter: () => {
        gsap.to('.phone-mockup', {
          y: '-=14',
          rotate: 1,
          duration: 2.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.3, // after entrance completes
        });

        // Pulse the glow simultaneously
        gsap.to('.phone-glow', {
          opacity: 1,
          scale: 1.08,
          duration: 2.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.3,
        });
      }
    });

    ScrollTrigger.create({
      trigger: '.wha-btn',
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo('.beacon-ring',
          { scale: 1, opacity: 0.6 },
          { scale: 2.0, opacity: 0, duration: 1.6, ease: 'power1.out', repeat: -1, stagger: 0.5 }
        );
      }
    });

  }, { scope: containerRef });

  const benefits = [
    {
      icon: <Globe size={18} className="text-[#7B61FF]" />,
      title: "Vitrina Online Inmediata",
      desc: "Tu inventario se convierte en catálogo público automáticamente. Sin crear PDF, ni subir fotos repetidamente."
    },
    {
      icon: <MessageCircle size={18} className="text-accent" />,
      title: "Cierre en WhatsApp",
      desc: "Tus clientes envían un mensaje pre-formateado con la variante exacta (talla/color), facilitando la venta rápida."
    },
    {
      icon: <RefreshCw size={18} className="text-[#3A86FF]" />,
      title: "Sincronización Atómica",
      desc: "Cuando vendes la última unidad en el mostrador físico, se marca como 'Agotado' online en tiempo real."
    }
  ];

  return (
    <section
      ref={containerRef}
      id="catalogo"
      className="py-28 md:py-36 bg-background relative overflow-hidden border-t border-primary/5"
      aria-labelledby="integration-heading"
    >
      <div
        className="absolute top-[20%] left-[-12%] w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.04) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(62,207,178,0.04) 0%, transparent 70%)' }}
      />

      <Container className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="text-center max-w-4xl mx-auto mb-24 space-y-6" id="integration-heading">
          <p className='w-fit mx-auto px-4 py-2 border border-accent/50 bg-accent/10 text-accent rounded-full'>
            El escaparate público
          </p>

          <h2 className="integration-title text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none opacity-0">
            Tu catálogo digital<br />
            <span className="text-accent text-glow">conectado a WhatsApp</span>
          </h2>

          <p className="integration-desc text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed opacity-0">
            Convierte tu stock en una tienda online automática. Tus clientes pueden navegar desde el celular y enviarte pedidos directos por WhatsApp, ahorrándote horas de atención.
          </p>
        </header>

        <div className="integration-grid-container grid grid-cols-1 lg:grid-cols-12 gap-16 items-center max-w-5xl mx-auto">
          <ul className="integration-benefits lg:col-span-6 space-y-5">
            {benefits.map((b, i) => (
              <li
                key={i}
                className="integration-grid-item bg-background-elevated/60 border border-primary/5 p-6 rounded-2xl flex gap-5 hover:border-primary/8 hover:bg-background-elevated transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-primary/2 border border-primary/4 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {b.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {b.title}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div className="phone-glow absolute inset-0 rounded-full opacity-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(62,207,178,0.18) 0%, transparent 65%)',
                filter: 'blur(24px)',
              }}
            />

            <div
              ref={phoneRef}
              className="phone-mockup w-full max-w-[285px] aspect-9/18 bg-background-elevated border border-primary/5 rounded-4xl p-3 relative flex flex-col justify-between overflow-hidden"
              style={{ opacity: 0 }}
              aria-label="Simulador de catálogo móvil"
            >
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-20" />

              <div className="pt-7 pb-3 px-2 border-b border-primary/5 select-none">
                <span className="text-[12px] font-bold text-primary flex items-center gap-1">
                  <Smartphone size={12} /> KODA
                </span>
              </div>

              <div className="flex-1 py-3 px-1 space-y-3 overflow-y-auto custom-scrollbar select-none">
                <div className="bg-background border border-primary/5 rounded-xl overflow-hidden">
                  <div className="w-full h-20 bg-linear-to-tr from-background-surface to-background-accent to-accent flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">Chaqueta Denim</span>
                  </div>
                  <div className="p-2 space-y-1.5">
                    <p className="text-[12px] font-bold text-primary leading-none">Chaqueta Denim Classic</p>
                    <p className="text-[10px] text-foreground font-mono leading-none">$ 95.000</p>
                    <div className="flex gap-1 pt-0.5">
                      {['S', 'M', 'L'].map(s => (
                        <span key={s} className="text-[10px] font-bold bg-accent/[0.07] border border-accent/20 px-1 rounded text-accent">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-background border border-primary/5 rounded-xl overflow-hidden">
                  <div className="w-full h-20 bg-linear-to-tr from-background-surface to-background-accent to-accent flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">Camiseta Polo</span>
                  </div>
                  <div className="p-2 space-y-1.5">
                    <p className="text-[12px] font-bold text-primary leading-none">Camiseta Polo Classic</p>
                    <p className="text-[10px] text-foreground font-mono leading-none">$ 105.000</p>
                    <div className="flex gap-1 pt-0.5">
                      {['S', 'M', 'L'].map(s => (
                        <span key={s} className="text-[10px] font-bold bg-accent/[0.07] border border-accent/20 px-1 rounded text-accent">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 pb-1 border-t border-primary/5 text-center select-none">
                <div className="relative wha-btn">
                  <div className="beacon-ring absolute inset-0 rounded-xl bg-accent/30 pointer-events-none" />
                  <div className="beacon-ring absolute inset-0 rounded-xl bg-accent/20 pointer-events-none" />
                  <button
                    className="relative w-full py-2.5 bg-accent hover:bg-accent-hover text-background text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-1.5 transition-colors z-10 shadow-[0_4px_20px_rgba(62,207,178,0.25)]"
                  >
                    <ShoppingCart size={12} />
                    Pedir por WhatsApp
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
