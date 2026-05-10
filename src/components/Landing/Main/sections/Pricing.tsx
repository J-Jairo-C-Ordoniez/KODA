'use client';

import { useRef, useEffect } from 'react';
import Container from '../../../ui/Container';
import Loader from '../../../ui/Loader';
import Error from '../../../ui/Error';
import CardPricing from '../ui/CardPricing';
import { useLandingPlans } from '@/hooks/landing/useLandingPlans';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { plans, isLoading, error } = useLandingPlans();

  // Header animation — always runs, header is always in the DOM
  useGSAP(() => {
    gsap.fromTo('.pricing-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }}
    );
  }, { scope: containerRef });

  // Cards animation — only runs AFTER plans have loaded and rendered
  useEffect(() => {
    if (plans.length === 0 || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
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
      className="py-32 bg-background relative"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
      <Container>
        <article className="pricing-header opacity-0 text-center mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-tight tracking-tighter mb-6">
            Planes a tu Medida
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto font-medium leading-relaxed">
            Sin contratos forzosos. Sin sorpresas. Cancela cuando quieras.
          </p>
        </article>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader /></div>
        ) : error ? (
          <Error message="No se pudieron cargar los planes. Intenta de nuevo más tarde." />
        ) : (
          <article className="pricing-cards grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
            {plans.length > 0 ? plans.map((plan: any, idx: number) => (
              <CardPricing key={plan.planId} plan={plan} isPopular={idx === 1} index={idx} />
            )) : (
              <Error message="No se pudieron cargar los planes." />
            )}
          </article>
        )}
      </Container>
    </section>
  );
}