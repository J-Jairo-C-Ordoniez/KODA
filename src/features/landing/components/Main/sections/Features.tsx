"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import FeatureContent from "@/features/landing/components/Main/ui/FeatureContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Features() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".features-header",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="features-header mx-auto mb-16 max-w-4xl text-center md:mb-24 opacity-0">
          <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Todo en su lugar,
            <span className="block text-foreground/60">
              sin complicaciones.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-foreground/80 sm:text-lg">
            Diseñamos un espacio de trabajo limpio donde las ventas, los fiados y el inventario fluyen de manera natural.
          </p>
        </header>
        <FeatureContent />
      </div>
    </section>
  );
}