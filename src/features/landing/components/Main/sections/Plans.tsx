"use client";

import { useRef } from "react";
import useLandingPlans from "@/features/landing/hooks/useLandingPlans";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import Loader from "@/shared/components/Loader";
import Error from "@/shared/components/Error";
import PlanCard from "@/features/landing/components/Main/ui/PlanCard";

gsap.registerPlugin(ScrollTrigger);

export default function Plans() {
  const containerRef = useRef<HTMLElement>(null);
  const { plans, isLoading, error } = useLandingPlans();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    tl.fromTo(
      ".plans-header-line",
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }
    )
    .fromTo(
      ".plans-desc",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );

    if (!isLoading && plans && plans.length > 0) {
      tl.fromTo(
        ".plan-card-anim",
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );
    }
  }, { scope: containerRef, dependencies: [isLoading, plans] });

  return (
    <section
      id="plans"
      ref={containerRef}
      className="relative bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
          <h2 className="space-y-2 sm:space-y-3 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
            <span className="plans-header-line block text-foreground opacity-0">
              Planes simples.
            </span>
            <span className="plans-header-line block text-foreground/50 opacity-0">
              Sin letras pequeñas.
            </span>
          </h2>
          <p className="plans-desc mx-auto mt-6 sm:mt-8 md:mt-10 max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed text-foreground/75 opacity-0">
            Sin contratos forzosos ni cobros ocultos. Elige el plan que mejor se adapte al tamaño de tu negocio y cancela cuando quieras.
          </p>
        </header>

        {isLoading && <Loader />}
        {error && <Error message={error} />}

        {!isLoading && !error && (
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-stretch">
            {plans.map(plan => (
              <div key={plan.planId} className="plan-card-anim opacity-0 w-full max-w-md md:max-w-none md:w-95">
                <PlanCard
                  plan={plan}
                  isPopular={plan.name === "Empresarial"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
