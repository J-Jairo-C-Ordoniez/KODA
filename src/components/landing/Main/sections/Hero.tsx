'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Container from '../../../ui/Container';
import Button from '../../../ui/Button';
import { ArrowRight, CheckCircle2, Star, TrendingUp, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-background bg-grid"
    >
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_100%)] pointer-events-none" />

      <Container className='relative flex flex-col lg:flex-row items-center gap-16 lg:gap-24 z-10'>
        <article className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-foreground/5 shadow-sm animate-fade-in">
            <Star size={16} className="text-navy fill-navy animate-pulse" />
            <p className="text-xs uppercase font-bold tracking-widest text-primary/80">Software para Tiendas de Ropa</p>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-primary leading-[1.05] tracking-tight">
            Del Cuaderno a la Nube. <br />
            <span className="text-navy">Controla tu Negocio</span> <br />
            sin Estrés.
          </h1>

          <p className="text-lg lg:text-xl text-secondary max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed tracking-tight">
            La plataforma definitiva para gestionar inventario, ventas y fiados en segundos. Despídete del desorden y toma el control total con KODA.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button
              href="/register"
              variant="accent"
              className="group px-10 py-5 text-lg shadow-xl shadow-navy/20 active:scale-95"
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
          <div className="relative z-10">
            <Image
              src="/mascot.png"
              alt="mascota de Koda"
              width={600}
              height={600}
              className="w-full h-auto drop-shadow-2xl opacity-90 mask-[linear-gradient(to_bottom,black_80%,transparent)]"
              priority
            />
          </div>

          <div className="absolute top-10 -left-10 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-black/5 border border-foreground/5 flex items-center gap-4 z-20">
            <span className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600">
              <TrendingUp size={24} />
            </span>
            <div>
              <p className="text-xs uppercase text-secondary font-bold tracking-widest">Venta Exitosa</p>
              <p className="text-sm font-black text-primary">$120,000 COP</p>
            </div>
          </div>

          <div className="absolute bottom-20 -right-10 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-black/5 border border-foreground/5 flex items-center gap-4 z-20">
            <span className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center text-navy">
              <Users size={24} />
            </span>
            <div>
              <p className="text-xs uppercase text-secondary font-bold tracking-widest">Nuevo Cliente</p>
              <p className="text-sm font-black text-primary">Sofía Martínez</p>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}