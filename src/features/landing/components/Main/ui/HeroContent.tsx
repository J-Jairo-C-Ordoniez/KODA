"use client";

import { MapPin } from "lucide-react";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

import Button from "@/shared/components/Button";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('.hero-badge',
      { opacity: 0, y: -10, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' }
    )
      .fromTo('.hero-line-1',
        { opacity: 0, y: 36, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.75, ease: 'power3.out' },
        '-=0.25'
      )
      .fromTo('.hero-line-2',
        { opacity: 0, y: 36, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.75, ease: 'power3.out' },
        '-=0.55'
      )
      .fromTo('.hero-desc',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-cta',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-trust',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );
  }, { scope: containerRef });

  return (
    <article
      ref={containerRef}
      className="flex h-full w-full flex-col justify-center gap-6 px-6 py-16 sm:px-12 lg:px-40 lg:py-4">
      <address
        className="hero-badge flex w-fit items-center gap-2 px-2 py-1 text-foreground"
        aria-label="Desarrollado para negocios de La Unión, Nariño"
      >
        <MapPin size={20} aria-hidden="true" />
        <span>Diseñado para La Unión, Nariño</span>
      </address>

      <hgroup className="space-y-1 overflow-hidden">
        <h1 className="hero-line-1 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Tu negocio crece.
        </h1>
        <p
          className="block hero-line-2 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground/60 sm:text-5xl md:text-6xl lg:text-7xl"
          aria-label="Tus datos, no."
        >
          Tus datos, no.
        </p>
      </hgroup>

      <p className="hero-desc max-w-md text-sm font-normal leading-relaxed text-foreground/80 sm:text-lg">
        KODA reemplaza el cuaderno. Lleva el{" "}
        <strong className="font-semibold text-foreground">inventario en tiempo real</strong>,
        controla los{" "}
        <strong className="font-semibold text-foreground">fiados sin enredos</strong>{" "}
        y vende por WhatsApp sin trabajo extra.
      </p>

      <nav
        className="hero-cta flex flex-col gap-3 sm:flex-row"
        aria-label="Acciones principales"
      >
        <Button href="/auth/register" variant="primary">
          Probar
        </Button>
        <Button href="#features" variant="secondary">
          Ver cómo funciona
        </Button>
      </nav>
    </article>
  );
}
