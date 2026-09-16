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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    tl.fromTo(
      ".features-header-line",
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }
    )
    .fromTo(
      ".features-desc",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
      ".feature-card",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.15, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    )
    .fromTo(
      ".feature-mockup",
      { opacity: 0, scale: 0.95, x: 30 },
      { opacity: 1, scale: 1, x: 0, duration: 0.7, ease: "power2.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative bg-background pt-8 pb-16 md:pt-14 md:pb-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
          <h2 className="space-y-2 sm:space-y-3 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
            <span className="features-header-line block text-foreground opacity-0">
              Todo a la mano.
            </span>
            <span className="features-header-line block text-foreground/50 opacity-0">
              Cero enredos.
            </span>
          </h2>
          <p className="features-desc mx-auto mt-6 sm:mt-8 md:mt-10 max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed text-foreground/75 opacity-0">
            Diseñamos un sistema que se siente natural. Sin menús complicados ni manuales larguísimos. Abres tu caja y estás listo para vender.
          </p>
        </header>
        <FeatureContent />
      </div>
    </section>
  );
}