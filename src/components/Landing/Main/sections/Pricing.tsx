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
      className="pb-32 pt-28 bg-background relative overflow-hidden border-t border-primary/5"
    >
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(62,207,178,0.035) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl container mx-auto px-6 relative z-10">
        <header className="pricing-header opacity-0 text-center mb-20 md:mb-24 space-y-5">
          <p className='w-fit mx-auto px-4 py-2 border border-accent/50 bg-accent/10 text-accent rounded-full'>
            Tarifas simples
          </p>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            Planes a tu Medida
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
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
          <div className="pricing-cards grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
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