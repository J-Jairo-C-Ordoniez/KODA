'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import { ArrowRight, CheckCircle2, Star, TrendingUp, Users } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const mascotRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);

  useEffect(() => {
    // Mascot floating animation
    gsap.to(mascotRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Suble drift for badges
    gsap.to([badge1Ref.current, badge2Ref.current], {
      x: 5,
      y: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });
  }, []);

  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-background bg-grid"
    >
      {/* Radial Gradient for Grid Mask */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_100%)] pointer-events-none" />

      <Container className='relative flex flex-col lg:flex-row items-center gap-16 lg:gap-24 z-10'>
        <article className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-foreground/5 shadow-sm animate-fade-in">
            <Star size={16} className="text-navy fill-navy animate-pulse" />
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary/80">Software para Tiendas de Ropa</p>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-primary leading-[1.05] tracking-tight">
            Gestiona tu <br />
            <span className="text-navy">Negocio de Moda</span> <br />
            sin Estrés.
          </h1>

          <p className="text-lg lg:text-xl text-secondary max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed tracking-tight">
            La plataforma definitiva para controlar tu inventario, ventas y fiados. Olvida los cuadernos y toma el control total con KODA.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button
              href="/register"
              variant="accent"
              className="group px-10 py-5 text-lg shadow-2xl shadow-navy/20 active:scale-95"
            >
              Empezar Ahora
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              href="#features"
              variant="ambulance"
              className="px-10 py-5 text-lg"
            >
              Ver Funciones
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-6">
            {['Ventas rápidas', 'Control de fiados', 'Stock real'].map((item) => (
              <p
                key={item}
                className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-primary/60"
              >
                <CheckCircle2 size={18} className="text-green-500" />
                {item}
              </p>
            ))}
          </div>
        </article>

        <article className="flex-1 relative">
          <div ref={mascotRef} className="relative z-10">
            <Image
              src="/mascot.png"
              alt="mascota de Koda"
              width={600}
              height={600}
              className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,128,0.15)] mask-b-from-80%"
              priority
            />
          </div>

          {/* Floating Badges */}
          <div 
            ref={badge1Ref}
            className="absolute top-10 -left-10 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-foreground/5 flex items-center gap-4 z-20"
          >
            <span className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600">
              <TrendingUp size={24} />
            </span>
            <div>
              <p className="text-[10px] uppercase text-secondary font-bold tracking-widest">Venta Registrada</p>
              <p className="text-sm font-black text-primary">$120,000 COP</p>
            </div>
          </div>

          <div 
            ref={badge2Ref}
            className="absolute bottom-20 -right-10 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-foreground/5 flex items-center gap-4 z-20"
          >
            <span className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center text-navy">
              <Users size={24} />
            </span>
            <div>
              <p className="text-[10px] uppercase text-secondary font-bold tracking-widest">Nuevo Cliente</p>
              <p className="text-sm font-black text-primary">Sofía Martínez</p>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}