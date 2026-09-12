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

  useGSAP(() => {
    const frames = gsap.utils.toArray<HTMLElement>(".migration-step-frame");
    if (frames.length < 3) return;

    frames.forEach((frame, idx) => {
      const title = frame.querySelector(".card-step-title");
      const desc = frame.querySelector(".card-step-desc");

      // Estado inicial: ocultos abajo
      gsap.set(title, { yPercent: 55, opacity: 0 });
      gsap.set(desc, { yPercent: 40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: "top top",
          end: "+=110%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      // Entrada tipográfica independiente (título primero, luego desc con desfase)
      tl.to(
        title,
        { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.28 },
        0.05
      )
        .to(
          desc,
          { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.28 },
          0.12
        )
        // Pausa de lectura
        .to({}, { duration: 0.3 }, 0.4)
        // Salida
        .to(
          title,
          { yPercent: -50, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.7
        )
        .to(
          desc,
          { yPercent: -65, opacity: 0, ease: "power1.in", duration: 0.22 },
          0.73
        );

      // Actualizar indicador lateral
      const dotActive = `.step-dot-${idx}`;
      const dotPrev = idx > 0 ? `.step-dot-${idx - 1}` : null;

      tl.to(
        dotActive,
        { backgroundColor: "#09090B", borderColor: "#09090B", scale: 1.25, duration: 0.04 },
        0.05
      );

      if (dotPrev) {
        tl.to(
          dotPrev,
          { backgroundColor: "transparent", borderColor: "rgba(9, 9, 11, 0.35)", scale: 1, duration: 0.04 },
          0.05
        );
      }

      // En la última card, al salir se apaga el indicador
      if (idx === frames.length - 1) {
        tl.to(
          ".step-diamond-dot",
          { opacity: 0, duration: 0.18, ease: "power1.in" },
          0.7
        );
      }
    });
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Indicador vertical de pasos – posición fija relativa al flow */}
      <nav
        className="fixed right-4 sm:right-8 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4 sm:gap-5 pointer-events-none"
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

      {/* Un frame independiente por step – mismo patrón que Problem */}
      {steps.map((step, idx) => (
        <div
          key={step.id}
          className="migration-step-frame relative h-screen w-full flex items-center justify-center overflow-hidden px-6 sm:px-12"
        >
          <MigrationCard step={step} index={idx} />
        </div>
      ))}
    </div>
  );
}