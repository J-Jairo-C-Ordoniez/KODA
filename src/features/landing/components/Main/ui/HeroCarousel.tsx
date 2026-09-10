"use client";

import { useState, useEffect, useRef } from 'react';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from '@/shared/components/Button';
import CardCarousel from '@/features/landing/components/Main/ui/CardCarousel';

const CARDS = [
  {
    id: "inventory",
    title: "Inventario Inteligente",
    description: "Automatiza tus flujos. Cada venta descuenta tus existencias automáticamente, sin esfuerzo manual."
  },
  {
    id: "credit",
    title: "Fiados Sin Enredos",
    description: "Vincula deudas a clientes y registra abonos. Mantén tu cartera sana y recupera liquidez."
  },
  {
    id: "whatsapp",
    title: "Ventas por WhatsApp",
    description: "Tu catálogo digital genera mensajes pre-formateados para cerrar ventas directo en el chat."
  },
  {
    id: "metrics",
    title: "Métricas Claras",
    description: "Paz mental con datos reales. Conoce tus utilidades, deudas y el rendimiento del negocio hoy."
  }
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CARDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = () => setActiveIndex((p) => (p + 1) % CARDS.length);
  const prevSlide = () => setActiveIndex((p) => (p - 1 + CARDS.length) % CARDS.length);

  useGSAP(() => {
    gsap.killTweensOf(".anim-element");
    gsap.set(".anim-element", { clearProps: "all" });

    if (CARDS[activeIndex].id === "inventory") {
      gsap.fromTo(".box-item",
        { y: -20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.3, ease: "power3.out", repeat: -1, repeatDelay: 2, yoyo: true }
      );
    } else if (CARDS[activeIndex].id === "credit") {
      gsap.fromTo(".coin-item",
        { y: -30, opacity: 0, rotation: -20 },
        { y: 15, opacity: 1, rotation: 360, duration: 1.5, ease: "bounce.out", repeat: -1, repeatDelay: 2 }
      );
    } else if (CARDS[activeIndex].id === "whatsapp") {
      gsap.fromTo(".chat-bubble",
        { scale: 0.8, opacity: 0, transformOrigin: "bottom left" },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.5, ease: "power2.out", repeat: -1, repeatDelay: 2.5, yoyo: true }
      );
    } else if (CARDS[activeIndex].id === "metrics") {
      gsap.fromTo(".chart-bar",
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: 1, stagger: 0.2, ease: "power2.out", repeat: -1, repeatDelay: 2, yoyo: true }
      );
    }
  }, { scope: containerRef, dependencies: [activeIndex] });

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-250 mx-auto flex items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Características principales de KODA"
    >
      <Button
        variant="secondary"
        onClick={prevSlide}
        className="absolute left-2 md:-left-8 top-68 md:top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-none p-1"
        aria-label="Característica anterior"
      >
        <CaretLeftIcon size={24} weight="bold" />
      </Button>

      <div className="w-full relative h-120 md:h-95 bg-transparent overflow-hidden px-1 md:px-0">
        {CARDS.map((card, idx) => {
          const isActive = idx === activeIndex;
          return (
            <CardCarousel
              key={card.id}
              card={card}
              isActive={isActive}
            />
          );
        })}
      </div>

      <Button
        variant="secondary"
        onClick={nextSlide}
        className="absolute right-2 md:-right-8 top-68 md:top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-none p-1"
        aria-label="Siguiente característica"
      >
        <CaretRightIcon size={24} weight="bold" />
      </Button>

      <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3" role="tablist">
        {CARDS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`transition-all duration-500 rounded-full ${activeIndex === idx ? 'w-8 h-2 md:h-3 bg-primary' : 'w-2 h-2 md:w-3 md:h-3 bg-foreground/15 hover:bg-foreground/30'}`}
            aria-label={`Ir al slide ${idx + 1}`}
            role="tab"
            aria-selected={activeIndex === idx}
          />
        ))}
      </div>
    </div>
  );
}
