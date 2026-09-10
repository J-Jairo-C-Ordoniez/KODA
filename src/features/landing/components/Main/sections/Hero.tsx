"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { MapPinLineIcon } from '@phosphor-icons/react';
import gsap from 'gsap';

import Button from "@/shared/components/Button";
import HeroCarousel from "@/features/landing/components/Main/ui/HeroCarousel";

if (typeof window !== 'undefined') {
  gsap.registerEffect({
    name: "fadeDownPop",
    effect: (targets: any, config: any) => {
      return gsap.fromTo(targets,
        { opacity: 0, y: config.y, scale: config.scale },
        { opacity: 1, y: 0, scale: 1, duration: config.duration, ease: config.ease }
      );
    },
    defaults: { duration: 0.6, y: -30, scale: 0.94, ease: 'power2.out' },
    extendTimeline: true,
  });

  gsap.registerEffect({
    name: "fadeUp",
    effect: (targets: any, config: any) => {
      return gsap.fromTo(targets,
        { opacity: 0, y: config.y },
        { opacity: 1, y: 0, duration: config.duration, stagger: config.stagger, ease: config.ease }
      );
    },
    defaults: { duration: 0.8, y: 30, stagger: 0, ease: 'power3.out' },
    extendTimeline: true,
  });
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 2.2 });
    tl.fadeDownPop('.hero-badge')
      .fadeUp('.hero-fade-up', { stagger: 0.2 }, '-=0.3');
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-fit overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto flex w-full flex-col items-center justify-center text-center gap-10 lg:gap-14 px-4 py-16 sm:px-8 sm:py-18 lg:px-20 lg:py-20">
        <address
          className="hero-badge flex w-fit items-center gap-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase text-foreground/70"
          aria-label="Desarrollado por La Unión, Nariño"
        >
          <MapPinLineIcon
            size={20}
            weight="bold"
            className="text-foreground/70 md:w-6 md:h-6"
            aria-label='Ubicación: La Unión, Nariño'
          />
          <span>HECHO EN LA UNIÓN, NARIÑO</span>
        </address>

        <hgroup className="space-y-1 mb-2">
          <h1 className="hero-fade-up font-heading text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Tu negocio crece.
          </h1>
          <p
            className="block hero-fade-up font-heading text-4xl font-black leading-[1.05] tracking-tight text-foreground/50 sm:text-5xl md:text-6xl lg:text-7xl"
            aria-label="El desorden no."
          >
            El desorden, no.
          </p>
        </hgroup>

        <div className="hero-fade-up w-full">
          <HeroCarousel />
        </div>

        <nav
          className="hero-fade-up mt-6"
          aria-label="Acciones principales"
        >
          <Button
            href="#features"
            variant="secondary"
          >
            Ver cómo funciona
          </Button>
        </nav>
      </div>
    </section>
  );
}
