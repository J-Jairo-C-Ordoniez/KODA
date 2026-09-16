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

  useGSAP(
    () => {
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced) {
        gsap.set(
          [
            ".migration-title-line",
            ".migration-desc",
            ".migration-intro-content",
            ".card-title",
            ".card-desc",
            ".float-item-tl",
            ".float-item-tr",
            ".float-item-bl",
            ".float-item-br",
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
          }
        );
        return;
      }

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introStageRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      introTl
        .fromTo(
          ".migration-title-line",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.25,
            ease: "power2.out",
          },
          0
        )
        .fromTo(
          ".migration-desc",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          },
          0.18
        )
        // Pausa de lectura cómoda
        .to({}, { duration: 0.25 }, 0.43)
        // Salida limpia del intro para no solaparse jamás con las cards
        .to(
          ".migration-intro-content",
          {
            opacity: 0,
            y: -45,
            scale: 0.97,
            duration: 0.25,
            ease: "power2.in",
          },
          0.68
        );

      const cardFrames = gsap.utils.toArray<HTMLElement>(".migration-card-frame");
      const mm = gsap.matchMedia();

      const animateCardFrames = ({
        entryX,
        entryY,
        exitX,
        exitY,
        startScale,
        finalScale,
      }: {
        entryX: number;
        entryY: number;
        exitX: number;
        exitY: number;
        startScale: number;
        finalScale: number;
      }) => {
        cardFrames.forEach((frame) => {
          const title = frame.querySelector(".card-title");
          const desc = frame.querySelector(".card-desc");
          const itemTL = frame.querySelector(".float-item-tl");
          const itemTR = frame.querySelector(".float-item-tr");
          const itemBL = frame.querySelector(".float-item-bl");
          const itemBR = frame.querySelector(".float-item-br");

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

          cardTl
            .fromTo(
              title,
              { opacity: 0, y: 40, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" },
              0.05
            )
            .fromTo(
              desc,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
              0.12
            )
            .fromTo(
              itemTL,
              { opacity: 0, x: -entryX, y: -entryY, rotation: -18, scale: startScale },
              { opacity: 1, x: 0, y: 0, rotation: -4, scale: finalScale, duration: 0.35, ease: "power2.out" },
              0.05
            )
            .fromTo(
              itemTR,
              { opacity: 0, x: entryX, y: -entryY, rotation: 18, scale: startScale },
              { opacity: 1, x: 0, y: 0, rotation: 4, scale: finalScale, duration: 0.35, ease: "power2.out" },
              0.08
            )
            .fromTo(
              itemBL,
              { opacity: 0, x: -entryX, y: entryY, rotation: -16, scale: startScale },
              { opacity: 1, x: 0, y: 0, rotation: -5, scale: finalScale, duration: 0.35, ease: "power2.out" },
              0.07
            )
            .fromTo(
              itemBR,
              { opacity: 0, x: entryX, y: entryY, rotation: 16, scale: startScale },
              { opacity: 1, x: 0, y: 0, rotation: 5, scale: finalScale, duration: 0.35, ease: "power2.out" },
              0.1
            )

            .to({}, { duration: 0.3 }, 0.4)

            .to(
              itemTL,
              { opacity: 0, x: -exitX, y: -exitY, rotation: -24, scale: startScale, duration: 0.28, ease: "power2.in" },
              0.72
            )
            .to(
              itemTR,
              { opacity: 0, x: exitX, y: -exitY, rotation: 24, scale: startScale, duration: 0.28, ease: "power2.in" },
              0.72
            )
            .to(
              itemBL,
              { opacity: 0, x: -exitX, y: exitY, rotation: -22, scale: startScale, duration: 0.28, ease: "power2.in" },
              0.72
            )
            .to(
              itemBR,
              { opacity: 0, x: exitX, y: exitY, rotation: 22, scale: startScale, duration: 0.28, ease: "power2.in" },
              0.72
            )
            .to(
              [title, desc],
              { opacity: 0, y: -45, scale: 0.96, duration: 0.22, ease: "power2.in" },
              0.75
            );
        });
      };

      mm.add("(max-width: 767px)", () =>
        animateCardFrames({
          entryX: 72,
          entryY: 64,
          exitX: 96,
          exitY: 82,
          startScale: 0.62,
          finalScale: 1.04,
        })
      );

      mm.add("(min-width: 768px) and (max-width: 1023px)", () =>
        animateCardFrames({
          entryX: 120,
          entryY: 92,
          exitX: 145,
          exitY: 112,
          startScale: 0.58,
          finalScale: 1.14,
        })
      );

      mm.add("(min-width: 1024px)", () =>
        animateCardFrames({
          entryX: 170,
          entryY: 125,
          exitX: 210,
          exitY: 155,
          startScale: 0.54,
          finalScale: 1.22,
        })
      );

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="migration"
      className="relative bg-background"
      aria-labelledby="migration-heading"
    >
      {/* ── Frame 1: Intro Encabezado ── */}
      <header
        ref={introStageRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12"
      >
        <div className="migration-intro-content w-full max-w-4xl mx-auto text-center">
          <h2
            id="migration-heading"
            className="space-y-2 sm:space-y-3 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
          >
            <span className="migration-title-line block text-foreground">
              Tu negocio en orden.
            </span>
            <span className="migration-title-line block text-foreground/50">
              Sin frenar tus ventas.
            </span>
          </h2>

          <p className="migration-desc mt-6 sm:mt-8 md:mt-10 text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/75 leading-relaxed max-w-2xl mx-auto font-normal">
            Cargamos tus productos, organizamos tus fiados y dejamos tu caja lista para que cobres con total claridad desde el primer día.
          </p>
        </div>
      </header>

      {/* ── Frames 2, 3 y 4: Las 3 Cards a Pantalla Completa con Elementos Flotantes ── */}
      <MigrationContent />
    </section>
  );
}
