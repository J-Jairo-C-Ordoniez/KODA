"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import MigrationCard, { MigrationStep } from "./MigrationCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps: MigrationStep[] = [
  {
    id: "data",
    number: "01",
    title: "Pasamos tu libreta a digital.",
    description:
      "Tomamos tus notas, cuadernos y Excels, los limpiamos y los cargamos por ti. Empiezas con toda tu información en orden sin pasar noches digitando.",
  },
  {
    id: "ready",
    number: "02",
    title: "Tu tienda queda lista para vender.",
    description:
      "Inventario cargado, fiados al día y clientes registrados. El día que arrancas, abres tu local y cobras con normalidad desde el primer minuto.",
  },
  {
    id: "team",
    number: "03",
    title: "Tu equipo aprende en diez minutos.",
    description:
      "Vender en mostrador, registrar un abono o consultar el stock es tan intuitivo como enviar un mensaje por WhatsApp. Sin cursos técnicos.",
  },
];

export default function MigrationContent() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const frames = gsap.utils.toArray<HTMLElement>(".migration-step-frame");
    if (frames.length < 3) return;

    // Ocultar el indicador inicialmente
    gsap.set(navRef.current, { opacity: 0, x: 20 });

    // Mostrar el indicador al entrar al primer frame
    ScrollTrigger.create({
      trigger: frames[0],
      start: "top 60%",
      onEnter: () => gsap.to(navRef.current, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(navRef.current, { opacity: 0, x: 20, duration: 0.3, ease: "power2.in" }),
    });

    // Ocultar el indicador al salir del último frame
    ScrollTrigger.create({
      trigger: frames[frames.length - 1],
      start: "bottom 60%",
      onEnter: () => gsap.to(navRef.current, { opacity: 0, x: 20, duration: 0.3, ease: "power2.in" }),
      onLeaveBack: () => gsap.to(navRef.current, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }),
    });

    frames.forEach((frame, idx) => {
      const title = frame.querySelector(".card-step-title");
      const desc = frame.querySelector(".card-step-desc");

      // Estado inicial: ocultos abajo con desplazamiento independiente
      gsap.set(title, { yPercent: 55, opacity: 0 });
      gsap.set(desc, { yPercent: 40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: "top top",
          end: "+=70%",   // Menor distancia → menos scroll entre cards
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      // Entrada: título y desc con desfase cinético
      tl.to(
        title,
        { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.3 },
        0.05
      )
        .to(
          desc,
          { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.3 },
          0.13
        )
        // Pausa de lectura cómoda
        .to({}, { duration: 0.35 }, 0.43)
        // Salida: título y desc con desfase cinético
        .to(
          title,
          { yPercent: -50, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.78
        )
        .to(
          desc,
          { yPercent: -65, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.82
        );

      // Actualizar indicador lateral
      const dotActive = `.step-dot-${idx}`;
      const dotPrev = idx > 0 ? `.step-dot-${idx - 1}` : null;

      tl.to(
        dotActive,
        { backgroundColor: "#09090B", borderColor: "#09090B", scale: 1.3, duration: 0.05 },
        0.05
      );

      if (dotPrev) {
        tl.to(
          dotPrev,
          { backgroundColor: "transparent", borderColor: "rgba(9,9,11,0.3)", scale: 1, duration: 0.05 },
          0.05
        );
      }
    });
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Indicador lateral – visibilidad controlada por ScrollTrigger */}
      <nav
        ref={navRef}
        className="fixed right-4 sm:right-8 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4 sm:gap-5 pointer-events-none opacity-0"
        aria-label="Indicador de pasos de migración"
      >
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <span
              className={`step-diamond-dot step-dot-${idx} block w-2.5 h-2.5 sm:w-3 sm:h-3 rotate-45 ${
                idx === 0
                  ? "bg-primary border border-primary scale-125"
                  : "bg-transparent border border-foreground/25"
              }`}
            />
          </div>
        ))}
      </nav>

      {/* Un frame independiente por step — mismo patrón que Problem */}
      {steps.map((step, idx) => (
        <div
          key={step.id}
          className="migration-step-frame relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16"
        >
          <MigrationCard step={step} index={idx} />
        </div>
      ))}
    </div>
  );
}