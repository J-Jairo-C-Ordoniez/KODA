"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import MigrationContent from "../ui/MigrationContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Migration() {
  const containerRef = useRef<HTMLElement>(null);
  const introStageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: introStageRef.current,
        start: "top top",
        end: "+=130%",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    // 1. Entrada de las frases del título con el movimiento del scroll
    tl.fromTo(
      ".migration-title-line",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.35,
        ease: "power2.out",
      },
      0
    )
      // 2. Entrada de la descripción en el mismo frame a continuación
      .fromTo(
        ".migration-desc",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        0.25
      )
      // 3. Pausa para lectura cómoda en pantalla
      .to({}, { duration: 0.3 }, 0.6)
      // 4. Salida limpia del intro para que nunca se solape con el bloque de cards
      .to(
        ".migration-intro-content",
        {
          opacity: 0,
          y: -50,
          duration: 0.3,
          ease: "power2.in",
        },
        0.9
      );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="migration"
      className="relative bg-background"
      aria-labelledby="migration-heading"
    >
      {/* ── Frame Intro: Pantalla completa limpia, con amplio espacio y sin bordes ── */}
      <div
        ref={introStageRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12"
      >
        <div className="migration-intro-content w-full max-w-4xl mx-auto text-center">
          {/* Título por frases */}
          <hgroup className="space-y-2 sm:space-y-3">
            <h2
              id="migration-heading"
              className="migration-title-line font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground"
            >
              Tu negocio en orden.
            </h2>
            <p className="migration-title-line block font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground/50">
              Sin frenar tus ventas.
            </p>
          </hgroup>

          {/* Descripción en el mismo frame */}
          <p className="migration-desc mt-6 sm:mt-8 md:mt-10 text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/75 leading-relaxed max-w-2xl mx-auto font-normal">
            Cargamos tus productos, organizamos tus fiados y dejamos tu caja lista para que cobres con total claridad desde el primer día.
          </p>
        </div>
      </div>

      {/* ── Bloque de Cards en Scrolltelling continuo ── */}
      <MigrationContent />
    </section>
  );
}