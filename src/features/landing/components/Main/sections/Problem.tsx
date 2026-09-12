"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROBLEMS = [
  {
    id: "box",
    title: "Vendiste todo el día. ¿Pero cuánto te quedó?",
    desc: "Al final sacás la plata, contás, restás... y el número nunca cuadra. Ventas sin registrar, fiados que se pierden, gastos que se olvidan. Siempre falta algo.",
    visual: (
      <div className="w-full h-full flex flex-col justify-center gap-2.5 sm:gap-3 px-2 sm:px-4" aria-hidden="true">
        <div className="flex justify-between text-base lg:text-lg border-b border-primary/10 pb-2.5 sm:pb-3">
          <span className="text-primary/60">Ventas del día</span>
          <span className="font-bold text-primary">$1.250.000</span>
        </div>
        <div className="flex justify-between text-base lg:text-lg border-b border-primary/10 pb-2.5 sm:pb-3">
          <span className="text-primary/60">Gastos varios</span>
          <span className="text-primary/30 italic">sin registro</span>
        </div>
        <div className="flex justify-between text-base lg:text-lg font-bold">
          <span className="text-primary/80">Ganancia real</span>
          <span className="text-primary/30 italic font-normal">sin calcular</span>
        </div>
      </div>
    ),
  },
  {
    id: "head",
    title: "Todo vive en tu cabeza. Y eso cansa.",
    desc: "¿Quién te debe? ¿Cuánto abonó? La memoria no es un sistema. Cuando fallás siempre perdés: plata, tiempo o la confianza del cliente.",
    visual: (
      <div className="w-full mx-auto h-full flex flex-col justify-center gap-2.5 sm:gap-3 px-2 sm:px-4" aria-hidden="true">
        {["¿Ya me abonaron el fiado?", "¿Cuánto stock me queda?", "¿Quién hizo esa venta?"].map((q, i) => (
          <p key={i} className="border border-primary/20 text-primary px-3.5 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-medium flex items-center gap-2.5 sm:gap-3 rounded-xl bg-background/50">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            {q}
          </p>
        ))}
      </div>
    ),
  },
  {
    id: "stock",
    title: "Comprás sin saber. Vendés sin datos.",
    desc: "Pedís más stock porque 'se veía que faltaba'. Luego sobra talla L, falta talla M y el dinero queda parado en el estante.",
    visual: (
      <div className="w-full h-full flex flex-col justify-center px-2 sm:px-4" aria-hidden="true">
        <p className="text-xs uppercase tracking-widest text-primary/70 mb-2 sm:mb-3 md:mb-4 font-bold">Inventario</p>
        <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
          <div className="flex justify-between text-base lg:text-lg border-b border-primary/10 pb-2 sm:pb-2.5">
            <span className="text-primary/60">Jeans Slim 32</span>
            <span className="font-bold text-primary">0 uds.</span>
          </div>
          <div className="flex justify-between text-base lg:text-lg border-b border-primary/10 pb-2 sm:pb-2.5">
            <span className="text-primary/60">Camiseta M</span>
            <span className="font-bold text-primary">1 ud.</span>
          </div>
          <div className="flex justify-between text-base lg:text-lg">
            <span className="text-primary/60">Camisas L</span>
            <span className="font-bold text-primary">12 uds.</span>
          </div>
        </div>
      </div>
    ),
  },
] as const;

export default function Problem() {
  const containerRef = useRef<HTMLElement>(null);
  const introStageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: introStageRef.current,
        start: "top top",
        end: "+=160%",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    introTl.fromTo(
      ".problem-title-phrase",
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.22,
        ease: "power2.out",
      },
      0
    )
      .to({}, { duration: 0.16 }, 0.22)
      .to(
        ".problem-title-stage",
        {
          opacity: 0,
          y: -45,
          scale: 0.97,
          duration: 0.12,
          ease: "power2.in",
        },
        0.38
      )
      .fromTo(
        ".problem-desc-stage",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        },
        0.50
      )
      .to({}, { duration: 0.18 }, 0.70)
      .to(
        ".problem-desc-stage",
        {
          opacity: 0,
          y: -35,
          duration: 0.12,
          ease: "power2.in",
        },
        0.88
      );

    const cardFrames = gsap.utils.toArray<HTMLElement>(".problem-card-frame");

    cardFrames.forEach((frame) => {
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      cardTl.fromTo(
        frame.querySelector(".card-title"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        0
      )
        .fromTo(
          frame.querySelector(".card-desc"),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          },
          0.2
        )
        .fromTo(
          frame.querySelector(".card-visual"),
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0.4
        )
        .to({}, { duration: 0.35 }, 0.65);
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="problem"
      className="relative bg-background"
      aria-labelledby="problem-heading"
    >
      <div
        ref={introStageRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6"
      >
        <div className="problem-title-stage absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none">
          <hgroup className="text-center space-y-2 sm:space-y-3 max-w-4xl">
            <h2
              id="problem-heading"
              className="problem-title-phrase font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground"
            >
              El cuaderno ya no alcanza.
            </h2>
            <p className="problem-title-phrase block font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground/50">
              Y tu lo sabés.
            </p>
          </hgroup>
        </div>
        <div className="problem-desc-stage absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none opacity-0">
          <div className="max-w-3xl text-center space-y-4 sm:space-y-6">
            <p className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.15] tracking-tight text-foreground">
              Hay un punto donde tu negocio crece pero el control no.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black text-foreground/45 leading-[1.2] tracking-tight">
              Cada día a ciegas.
            </p>
          </div>
        </div>
      </div>

      <div className="problem-cards-wrapper relative w-full">
        {PROBLEMS.map((item, i) => (
          <article
            key={item.id}
            className="problem-card-frame relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16"
            aria-label={`Problema ${i + 1} de ${PROBLEMS.length}: ${item.title}`}
          >
            <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-16">
              <div className="w-full lg:w-7/12 flex flex-col text-left">
                <h3 className="card-title font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight text-foreground mb-3 sm:mb-5">
                  {item.title}
                </h3>
                <p className="card-desc text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-xl">
                  {item.desc}
                </p>
              </div>
              <div className="card-visual w-full lg:w-5/12 flex items-center justify-center">
                <div className="w-full max-w-md lg:max-w-none rounded-3xl md:rounded-4xl border border-primary/10 bg-background/80 shadow-sm p-6 sm:p-8 flex flex-col justify-center min-h-50 sm:min-h-60 lg:min-h-70">
                  {item.visual}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}