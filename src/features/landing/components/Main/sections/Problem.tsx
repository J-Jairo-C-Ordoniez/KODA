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
      <div className="w-full h-full flex flex-col justify-center gap-3 px-8 md:px-10" aria-hidden="true">
        <div className="flex justify-between text-sm border-b border-background/10 pb-3">
          <span className="text-background/60">Ventas del día</span>
          <span className="font-black text-background">$1.250.000</span>
        </div>
        <div className="flex justify-between text-sm border-b border-background/10 pb-3">
          <span className="text-background/60">Gastos varios</span>
          <span className="text-background/30 italic">sin registro</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span className="text-background/80">Ganancia real</span>
          <span className="text-background/25 italic font-normal">sin calcular</span>
        </div>
      </div>
    ),
  },
  {
    id: "head",
    title: "Todo vive en tu cabeza. Y eso cansa.",
    desc: "¿Quién te debe? ¿Cuánto abonó? La memoria no es un sistema. Cuando fallás siempre perdés: plata, tiempo o la confianza del cliente.",
    visual: (
      <div className="w-full h-full flex flex-col justify-center gap-3 px-6 md:px-8" aria-hidden="true">
        {["¿Ya me abonaron el fiado?", "¿Cuánto stock me queda?", "¿Quién hizo esa venta?"].map((q, i) => (
          <div key={i} className="bg-background/8 border border-background/12 text-background/75 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-background/35 shrink-0" />
            {q}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "stock",
    title: "Comprás sin saber. Vendés sin datos.",
    desc: "Pedís más stock porque 'se veía que faltaba'. Luego sobra talla L, falta talla M y el dinero queda parado en el estante.",
    visual: (
      <div className="w-full h-full flex flex-col justify-center px-8 md:px-10" aria-hidden="true">
        <p className="text-[10px] uppercase tracking-widest text-background/40 mb-4 font-bold">Inventario</p>
        <div className="space-y-3">
          <div className="flex justify-between text-sm border-b border-background/10 pb-2.5">
            <span className="text-background/60">Jeans Slim 32</span>
            <span className="font-black text-red-400">0 uds.</span>
          </div>
          <div className="flex justify-between text-sm border-b border-background/10 pb-2.5">
            <span className="text-background/60">Camiseta M</span>
            <span className="font-black text-yellow-400">1 ud.</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-background/60">Camisas L</span>
            <span className="font-black text-background/30">12 uds.</span>
          </div>
        </div>
      </div>
    ),
  },
] as const;

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".p-card");
    const vw = window.innerWidth;

    gsap.set(cards, {
      x: -vw * 0.55,
      opacity: 0,
      scale: 0.88,
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "center center",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=" + (vw < 768 ? window.innerHeight * 3.8 : window.innerHeight * 3.2),
        pin: true,
        scrub: 1.8,
        anticipatePin: 1,
      },
    });

    tl.
      fromTo(".problem-fade-up",
        { opacity: 0, y: 38 },
        { opacity: 1, y: 0, stagger: 0.025, duration: 0.08, ease: "power3.out" }, 0.04
      );

    tl.to(cards[0], {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power3.out",
    }, 0.14);

    tl
      .to(cards[0], {
        x: vw * 0.40,
        scale: 0.5,
        opacity: 0.38,
        duration: 0.22,
        ease: "power2.inOut",
      }, 0.38)
      .to(cards[1], {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: "power3.out",
      }, 0.42);

    tl
      .to(cards[0], {
        x: vw * 0.60,
        scale: 0.32,
        opacity: 0.16,
        duration: 0.22,
      }, 0.62)
      .to(cards[1], {
        x: vw * 0.38,
        scale: 0.52,
        opacity: 0.40,
        duration: 0.22,
        ease: "power2.inOut",
      }, 0.62)
      .to(cards[2], {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: "power3.out",
      }, 0.67);

    tl.to({}, { duration: 0.12 }, 0.88);
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative bg-background"
      aria-labelledby="problem-heading"
    >
      <div className="relative h-screen flex flex-col overflow-hidden">
        <header className="problem-header relative z-20 text-center pt-16 pb-10 px-6 shrink-0">
          <hgroup className="space-y-1 mb-5">
            <h2
              id="problem-heading"
              className="problem-fade-up font-heading text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              El cuaderno ya no alcanza.
            </h2>
            <p className="problem-fade-up font-heading text-4xl font-black leading-[1.05] tracking-tight text-foreground/50 sm:text-5xl md:text-6xl">
              Y tu lo sabés.
            </p>
          </hgroup>

          <p className="problem-fade-up text-base lg:text-lg text-foreground/70 max-w-2xl md:text-lg leading-relaxed mx-auto">
            Hay un punto donde tu negocio crece pero el control no. <strong>Cada día a ciegas</strong>.
          </p>
        </header>

        <div
          className="relative flex-1"
          style={{ overflow: "visible" }}
          aria-label="Fricciones del negocio"
        >
          {PROBLEMS.map((item, i) => (
            <article
              key={item.id}
              className="p-card absolute top-1/4 left-1/2 w-full max-w-2xl"
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`Problema ${i + 1} de ${PROBLEMS.length}: ${item.title}`}
              aria-hidden={i > 0}
            >
              <div className="flex flex-col min-h-70 md:h-80">
                <div
                  className="w-full h-52 md:h-full bg-primary rounded-4xl overflow-hidden relative shrink-0"
                  aria-hidden="true"
                >
                  {item.visual}
                </div>


                <div className="w-full flex flex-col justify-center items-center px-6 pt-8 pb-4 bg-transparent text-center">
                  <h3 className="text-3xl lg:text-4xl font-heading font-black leading-[1.05] tracking-tight text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base lg:text-lg text-foreground/70 max-w-2xl md:text-lg leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}