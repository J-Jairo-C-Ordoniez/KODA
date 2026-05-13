'use client';

import { useRef, useEffect } from 'react';
import { useLandingPlans } from '@/hooks/landing/useLandingPlans';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from '@/components/ui/Loader';
import Error from '@/components/ui/Error';
import CardPricing from '@/components/Landing/Main/ui/CardPricing';
import gsap from 'gsap'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { plans, isLoading, error } = useLandingPlans();

  useGSAP(() => {
    gsap.fromTo('.pricing-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  useEffect(() => {
    if (plans.length === 0 || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pricing-cards',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [plans, isLoading]);

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="pb-32 pt-16 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-contrast/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl container mx-auto px-6 relative z-10">
        <header className="pricing-header opacity-0 text-center mb-20 md:mb-28">
          <h2 className="text-4xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-[1.1] md:leading-[0.9] max-w-4xl mx-auto">
            Planes a tu Medida
          </h2>
          <p className="text-foreground-muted text-lg md:text-2xl font-medium max-w-2xl leading-relaxed mx-auto">
            Sin contratos forzosos. Sin sorpresas. Cancela cuando quieras.
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : error ? (
          <Error message="No se pudieron cargar los planes. Intenta de nuevo más tarde." />
        ) : (
          <div className="pricing-cards grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto items-start">
            {plans.length > 0 ? plans.map((plan: any, idx: number) => (
              <CardPricing key={plan.planId} plan={plan} isPopular={idx === 1} index={idx} />
            )) : (
              <Error message="No se pudieron cargar los planes." />
            )}
          </div>
        )}
      </div>
    </section>
  );
}