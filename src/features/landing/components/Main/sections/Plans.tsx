"use client";

import { useRef } from "react";
import useLandingPlans from "@/features/landing/hooks/useLandingPlans";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Loader from "@/shared/components/Loader";
import Error from "@/shared/components/Error";
import CardPricing from "@/features/landing/components/Main/ui/CardPricing";

export default function Plans() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { plans, isLoading, error } = useLandingPlans();

  useGSAP(() => {
    gsap.fromTo(".pricing-header", { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
    });
  }, { scope: containerRef });

  return (
    <section
      id="plans"
      ref={containerRef}
      className="relative bg-background py-10 md:py-20"
    >
      <div className="mx-auto max-w-4xl px-6">
        <header className="chaos-header mx-auto mb-20 max-w-3xl text-center">
          <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Paga por ordenar tu negocio.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-foreground/80 sm:text-lg">
            Sin contratos forzosos. Elige el plan que mejor se adapte a tu etapa actual.
          </p>
        </header>

        {isLoading && <Loader />}
        {error && <Error message={error} />}

        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 gap-8 justify-center">
            {plans.map(plan => (
              <CardPricing
                key={plan.planId}
                plan={plan}
                isPopular={plan.name === "Empresarial"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}