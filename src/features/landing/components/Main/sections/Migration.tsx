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
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([".migration-title-line", ".migration-desc", ".migration-intro-content"], {
        opacity: 1,
        y: 0,
      });
      return;
    }

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
      .to({}, { duration: 0.3 }, 0.6)
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
      <header
        ref={introStageRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12"
      >
        <div className="migration-intro-content w-full max-w-4xl mx-auto text-center">
          {/* Título por frases */}
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

      <MigrationContent />
    </section>
  );
}