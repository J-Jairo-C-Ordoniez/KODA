"use client";

import { useRef, useState } from "react";
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
  const stageRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);

  useGSAP(
    () => {
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced) {
        gsap.set(".migration-card-item", { opacity: 1, y: 0, position: "relative" });
        if (navRef.current) gsap.set(navRef.current, { display: "none" });
        return;
      }

      gsap.set(".migration-card-item-0", { opacity: 1, y: 0 });
      gsap.set([".migration-card-item-1", ".migration-card-item-2"], {
        opacity: 0,
        y: 35,
      });

      gsap.set(navRef.current, { opacity: 0, x: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          onEnter: () =>
            gsap.to(navRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.35,
              ease: "power2.out",
            }),
          onLeaveBack: () =>
            gsap.to(navRef.current, {
              opacity: 0,
              x: 20,
              duration: 0.25,
              ease: "power2.in",
            }),
          onLeave: () =>
            gsap.to(navRef.current, {
              opacity: 0,
              x: 20,
              duration: 0.3,
              ease: "power2.in",
            }),
          onEnterBack: () =>
            gsap.to(navRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.35,
              ease: "power2.out",
            }),
          onUpdate: (self) => {
            const p = self.progress;
            let current = 0;
            if (p >= 0.62) {
              current = 2;
            } else if (p >= 0.30) {
              current = 1;
            } else {
              current = 0;
            }

            if (activeStepRef.current !== current) {
              activeStepRef.current = current;
              setActiveStep(current);
            }
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      tl.to(
        ".migration-card-item-0",
        { opacity: 0, y: -30, duration: 0.35, ease: "power2.in" },
        0.65
      ).to(
        ".migration-card-item-1",
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        0.70
      );

      tl.to(
        ".migration-card-item-1",
        { opacity: 0, y: -30, duration: 0.35, ease: "power2.in" },
        1.70
      ).to(
        ".migration-card-item-2",
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        1.75
      );

      tl.to({}, { duration: 0.85 }, 2.10);
    },
    { scope: stageRef }
  );

  const handleStepClick = (idx: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    const targetProgress = [0.15, 0.48, 0.85][idx] ?? 0;
    const targetY = st.start + (st.end - st.start) * targetProgress;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={stageRef}
      className="migration-cards-stage relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16"
    >
      <nav
        ref={navRef}
        className="fixed right-4 sm:right-8 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 sm:gap-4 opacity-0 pointer-events-auto"
        aria-label="Progreso de pasos de migración"
      >
        <ol className="flex flex-col items-center gap-3 sm:gap-4" role="list">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => handleStepClick(idx)}
                  className="group relative flex items-center justify-center p-2 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-transform active:scale-95"
                  aria-label={`Paso ${step.number}: ${step.title}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span className="sr-only">
                    {`Paso ${step.number}: ${step.title}${isActive ? " (Paso actual)" : ""}`}
                  </span>
                  <span
                    className={`step-diamond-dot step-dot-${idx} block w-2.5 h-2.5 sm:w-3 sm:h-3 rotate-45 transition-all duration-300 ${
                      isActive
                        ? "bg-primary border border-primary scale-125 shadow-xs"
                        : "bg-transparent border border-foreground/30 hover:border-foreground/60 hover:scale-110"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center min-h-70 sm:min-h-80">
        <ol className="relative w-full" role="list">
          {steps.map((step, idx) => (
            <li
              key={step.id}
              className={`migration-card-item migration-card-item-${idx} ${
                idx === 0 ? "relative" : "absolute inset-0"
              } flex items-center justify-center`}
            >
              <MigrationCard step={step} index={idx} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}