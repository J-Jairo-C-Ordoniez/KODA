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

  useGSAP(() => {
    gsap.fromTo(
      ".migration-header",
      { opacity: 0, y: 120 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: ".scrolltelling-wrapper",
        start: "top 15%",
        end: "bottom 85%",
        pin: ".sticky-panel",
        pinSpacing: false,
      });

      const textBlocks = gsap.utils.toArray<HTMLElement>(".step-text-block");
      const visuals = gsap.utils.toArray<HTMLElement>(".desktop-visual");

      gsap.set(textBlocks, { opacity: 0.25 });
      gsap.set(visuals, { y: 20, scale: 0.95, autoAlpha: 0 });
      textBlocks.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(block, { opacity: 1, duration: 0.3, ease: "power2.out" });
              gsap.to(visuals[i], { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" });
            } else {
              gsap.to(block, { opacity: 0.25, duration: 0.3, ease: "power2.out" });
              gsap.to(visuals[i], { autoAlpha: 0, y: -15, scale: 0.98, duration: 0.3, ease: "power2.in" });
            }
          },
        });
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="migration"
      className="relative bg-background py-10 md:pt-20 md:pb-0"
    >
      <div className="mx-auto max-w-7xl px-6">
        <header className="migration-header mx-auto mb-5 max-w-4xl text-center md:mb-10">
          <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Cambiar da miedo.
            <span className="block text-foreground/60">
              Quedarse igual también.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-foreground/80 sm:text-lg">
            No necesitas aprender un sistema complicado ni empezar desde cero. Te ayudamos a pasar de la libreta a KODA sin detener las ventas.
          </p>
        </header>
        <MigrationContent />
      </div>
    </section>
  );
}