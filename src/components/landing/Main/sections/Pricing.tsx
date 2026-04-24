'use client';

import Container from '../../../ui/Container';
import Loader from '../../../ui/Loader';
import CardPricing from '../ui/CardPricing';
import { useLandingPlans } from '@/hooks/landing/useLandingPlans';

export default function Pricing() {
  const { plans, isLoading, error } = useLandingPlans();

  return (
    <section id="pricing" className="py-24 bg-background">
      <Container>
        <article className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border border-navy/10 shadow-sm animate-fade-in">
            <p className="text-xs uppercase font-bold tracking-widest text-navy">Planes y Precios</p>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-primary tracking-tight">
            Planes a tu Medida
          </h2>
          <p className="text-secondary max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            Sin contratos forzosos. Sin sorpresas. Cancela cuando quieras.
          </p>
        </article>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="text-secondary mx-auto font-medium text-lg text-center w-full">
            No se pudieron cargar los planes. Intenta de nuevo más tarde.
          </p>
        ) : (
          <article className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.length > 0 ? plans.map((plan) => (
              <CardPricing key={plan.planId} plan={plan} />
            )) : (
              <p className="text-secondary mx-auto font-medium text-lg text-center w-full col-span-2">
                No hay planes disponibles en este momento.
              </p>
            )}
          </article>
        )}
      </Container>
    </section>
  );
}
