"use client";

import { useState, useEffect, useRef } from 'react';
import { CaretLeft, CaretRight, Package, CurrencyDollar, ChatCircleText, ChartLineUp } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const CARDS = [
  {
    id: "inventario",
    title: "Inventario Inteligente",
    description: "Automatiza tus flujos. Cada venta descuenta tus existencias automáticamente, sin esfuerzo manual.",
    icon: Package,
    stats: [{ label: "Control", value: "100%" }, { label: "Tiempo", value: "+5h/s" }, { label: "Errores", value: "0%" }]
  },
  {
    id: "fiados",
    title: "Fiados Sin Enredos",
    description: "Vincula deudas a clientes y registra abonos. Mantén tu cartera sana y recupera liquidez.",
    icon: CurrencyDollar,
    stats: [{ label: "Recupero", value: "+40%" }, { label: "Pérdidas", value: "0%" }, { label: "Orden", value: "Total" }]
  },
  {
    id: "whatsapp",
    title: "Ventas por WhatsApp",
    description: "Tu catálogo digital genera mensajes pre-formateados para cerrar ventas directo en el chat.",
    icon: ChatCircleText,
    stats: [{ label: "Cierres", value: "3x" }, { label: "Fricción", value: "-80%" }, { label: "Alcance", value: "Global" }]
  },
  {
    id: "metricas",
    title: "Métricas Claras",
    description: "Paz mental con datos reales. Conoce tus utilidades, deudas y el rendimiento del negocio hoy.",
    icon: ChartLineUp,
    stats: [{ label: "Claridad", value: "100%" }, { label: "Decisiones", value: "Rápidas" }, { label: "Crecimiento", value: "Sostenido" }]
  }
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Auto-rotate
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CARDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = () => setActiveIndex((p) => (p + 1) % CARDS.length);
  const prevSlide = () => setActiveIndex((p) => (p - 1 + CARDS.length) % CARDS.length);

  // Animations based on active index
  useGSAP(() => {
    gsap.killTweensOf(".anim-element");
    gsap.set(".anim-element", { clearProps: "all" });

    if (CARDS[activeIndex].id === "inventario") {
      gsap.fromTo(".box-item", 
        { y: -20, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.3, ease: "power3.out", repeat: -1, repeatDelay: 2, yoyo: true }
      );
    } else if (CARDS[activeIndex].id === "fiados") {
      gsap.fromTo(".coin-item",
        { y: -30, opacity: 0, rotation: -20 },
        { y: 15, opacity: 1, rotation: 360, duration: 1.5, ease: "bounce.out", repeat: -1, repeatDelay: 2 }
      );
    } else if (CARDS[activeIndex].id === "whatsapp") {
      gsap.fromTo(".chat-bubble",
        { scale: 0.8, opacity: 0, transformOrigin: "bottom left" },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.5, ease: "power2.out", repeat: -1, repeatDelay: 2.5, yoyo: true }
      );
    } else if (CARDS[activeIndex].id === "metricas") {
      gsap.fromTo(".chart-bar",
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: 1, stagger: 0.2, ease: "power2.out", repeat: -1, repeatDelay: 2, yoyo: true }
      );
    }
  }, { scope: containerRef, dependencies: [activeIndex] });

  // Render visual graphic per slide
  const renderVisual = (id: string) => {
    switch(id) {
      case "inventario":
        return (
          <div className="relative flex flex-col items-center justify-center gap-3 h-full w-full" aria-hidden="true">
            <div className="anim-element box-item w-16 h-16 bg-background/10 border border-background/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Package size={32} className="text-background" />
            </div>
            <div className="flex gap-3">
              <div className="anim-element box-item w-12 h-12 bg-background/10 border border-background/20 rounded-xl" />
              <div className="anim-element box-item w-12 h-12 bg-background/10 border border-background/20 rounded-xl" />
            </div>
          </div>
        );
      case "fiados":
        return (
          <div className="relative flex flex-col items-center justify-center h-full w-full" aria-hidden="true">
            <div className="anim-element coin-item absolute top-8 md:top-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">
              <CurrencyDollar size={56} weight="fill" />
            </div>
            <div className="w-28 h-16 bg-background/10 border border-background/20 rounded-b-3xl mt-20 md:mt-24 flex items-end justify-center pb-3 backdrop-blur-sm">
              <div className="w-16 h-1.5 bg-background/30 rounded-full" />
            </div>
          </div>
        );
      case "whatsapp":
        return (
          <div className="relative flex flex-col items-center justify-center gap-4 h-full w-full px-6 md:px-10" aria-hidden="true">
            <div className="anim-element chat-bubble self-start bg-background/10 px-4 md:px-5 py-2 md:py-3 rounded-2xl rounded-bl-sm border border-background/20 text-background/90 text-sm backdrop-blur-sm">
              ¿Tienen la talla M?
            </div>
            <div className="anim-element chat-bubble self-end bg-background px-4 md:px-5 py-2 md:py-3 rounded-2xl rounded-br-sm text-primary text-sm font-semibold shadow-lg">
              ¡Sí! Te aparto una 🚀
            </div>
          </div>
        );
      case "metricas":
        return (
          <div className="relative flex items-end justify-center gap-4 h-full w-full pb-0 md:pb-12" aria-hidden="true">
            <div className="anim-element chart-bar w-8 md:w-10 h-16 bg-background/30 rounded-t-lg" />
            <div className="anim-element chart-bar w-8 md:w-10 h-28 bg-background/60 rounded-t-lg" />
            <div className="anim-element chart-bar w-8 md:w-10 h-36 md:h-40 bg-background/100 rounded-t-lg shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[1000px] mx-auto flex items-center justify-center group mt-4 md:mt-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Características principales de KODA"
    >
      {/* Prev Button - Mobile: below visual, Desktop: vertically centered on whole card */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 md:-left-6 top-[280px] md:top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background border border-foreground/10 md:border-none rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all hover:scale-105 active:scale-95 text-foreground hover:bg-foreground/5"
        aria-label="Característica anterior"
      >
        <CaretLeft size={20} weight="bold" />
      </button>

      {/* Main Card Container */}
      <div className="w-full relative h-[650px] sm:h-[600px] md:h-[380px] bg-transparent overflow-hidden px-1 md:px-0">
        
        {CARDS.map((card, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div 
              key={card.id} 
              className={`absolute inset-0 flex flex-col md:flex-row p-2 md:p-4 transition-all duration-1000 ease-in-out ${isActive ? 'opacity-100 translate-x-0 pointer-events-auto z-10' : 'opacity-0 translate-x-12 pointer-events-none z-0'}`}
              role="group"
              aria-roledescription="slide"
              aria-hidden={!isActive}
            >
              {/* Left Visual Area */}
              <div className="w-full md:w-1/2 h-64 md:h-full bg-primary rounded-[2rem] overflow-hidden flex items-center justify-center shadow-lg relative shrink-0 pt-4 md:pt-0">
                {isActive && renderVisual(card.id)}
              </div>

              {/* Right Content Area */}
              <div className="w-full md:w-1/2 h-full flex flex-col justify-start md:justify-center p-4 pt-20 md:pt-6 md:px-12 lg:px-16 text-left bg-transparent">
                <div className="flex items-center gap-2 mb-4 opacity-80">
                  <card.icon size={20} weight="duotone" className="text-foreground/60" aria-hidden="true" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/50">KODA Features</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground mb-3 md:mb-4 leading-tight">
                  {card.title}
                </h3>
                
                <p className="text-sm md:text-base lg:text-lg text-foreground/70 leading-relaxed mb-6 max-w-sm">
                  {card.description}
                </p>
                
                <div className="flex items-center gap-4 md:gap-6 mt-auto md:mt-0 pt-4 md:pt-6 border-t border-foreground/5">
                  {card.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col gap-0.5 md:gap-1">
                      <span className="text-lg md:text-xl lg:text-2xl font-black text-foreground">{stat.value}</span>
                      <span className="text-[9px] md:text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Button - Mobile: below visual, Desktop: vertically centered on whole card */}
      <button 
        onClick={nextSlide}
        className="absolute right-2 md:-right-6 top-[280px] md:top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background border border-foreground/10 md:border-none rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all hover:scale-105 active:scale-95 text-foreground hover:bg-foreground/5"
        aria-label="Siguiente característica"
      >
        <CaretRight size={20} weight="bold" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3" role="tablist">
        {CARDS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`transition-all duration-500 rounded-full ${activeIndex === idx ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-foreground/15 hover:bg-foreground/30'}`}
            aria-label={`Ir al slide ${idx + 1}`}
            role="tab"
            aria-selected={activeIndex === idx}
          />
        ))}
      </div>
    </div>
  );
}
