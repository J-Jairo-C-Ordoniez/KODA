"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import ProblemCard from "@/features/landing/components/Main/ui/ProblemCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const points = [
  {
    number: "01",
    title: "La caja cierra. Las cuentas no.",
    desc: "Vendiste durante todo el día, pero al final no sabes cuánto quedó realmente disponible.",
    theme: "light",
    content: (
      <div className="card-preview rounded-2xl border border-primary/10 p-6 bg-primary/5">
        <div className="flex justify-between font-medium">
          <span>Ventas</span>
          <span>$1.250.000</span>
        </div>
        <div className="mt-4 flex justify-between font-bold text-primary/70">
          <span>Ganancia</span>
          <span>????</span>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Todo depende de acordarse.",
    desc: "Ventas, fiados y mensajes terminan repartidos entre cuadernos y WhatsApp.",
    theme: "dark",
    content: (
      <div className="card-preview space-y-3">
        <div className="rounded-2xl bg-foreground-muted/10 p-4 font-medium text-foreground-muted">¿Ya aboné?</div>
        <div className="rounded-2xl bg-foreground-muted/10 p-4 font-medium text-foreground-muted">¿Cuánto debo?</div>
        <div className="rounded-2xl bg-foreground-muted/10 p-4 font-medium text-foreground-muted">¿Tengo talla M?</div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Comprar stock se vuelve una apuesta.",
    desc: "Sin datos claros compras por intuición y terminas con faltantes o exceso de inventario.",
    theme: "light",
    content: (
      <div className="card-preview rounded-2xl border border-primary/10 p-6 bg-background">
        <div className="flex justify-between border-b border-primary/5 pb-2"><span>Jeans 32</span><span className="text-destructive font-bold">0</span></div>
        <div className="flex justify-between border-b border-primary/5 py-2"><span>Camisetas 34</span><span>1</span></div>
        <div className="flex justify-between pt-2"><span>Camisas 36</span><span className="text-primary font-bold">12</span></div>
      </div>
    ),
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".chaos-header",
      { opacity: 0, y: 120 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".chaos-header",
          start: "top 85%",
        },
      }
    );

    gsap.utils.toArray<HTMLElement>(".chaos-card").forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.96
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative bg-background py-10 md:py-20"
    >
      <div className="mx-auto max-w-4xl px-6">
        <header className="chaos-header mx-auto mb-20 max-w-3xl text-center">
          <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Tu negocio crece.
            <span className="block text-foreground/60">Tus métodos no.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-foreground/80 sm:text-lg">
            Llega un punto donde vender más deja de ser el reto. El verdadero problema es mantener el control.
          </p>
        </header>

        <div className="flex flex-col gap-10 md:gap-14">
          {points.map((item) => (
            <ProblemCard
              key={item.number}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}