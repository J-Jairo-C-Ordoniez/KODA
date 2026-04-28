'use client';

import Container from '../../../ui/Container';
import Loader from '../../../ui/Loader';
import Error from '../../../ui/Error';
import CardPricing from '../ui/CardPricing';
import { useLandingPlans } from '@/hooks/landing/useLandingPlans';

export default function Pricing() {
  const { plans, isLoading, error } = useLandingPlans();

  return (
    <section
      id="pricing"
      className="py-24 bg-background"
    >
      <Container>
        <article className="text-center space-y-4 mb-20">
          <h2 className="uppercase w-full text-3xl lg:text-5xl 3xl:text-6xl font-black text-primary leading-tight tracking-tight">
            Planes a tu Medida
          </h2>
          <p className="text-md lg:text-lg text-primary/80 max-w-xl mx-auto font-medium leading-snug tracking-wider">
            Sin contratos forzosos. Sin sorpresas. Cancela cuando quieras.
          </p>
        </article>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error message="No se pudieron cargar los planes. Intenta de nuevo más tarde." />
        ) : (
          <article className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.length > 0 ? plans.map((plan) => (
              <CardPricing key={plan.planId} plan={plan} />
            )) : (
              <Error message="No se pudieron cargar los planes. Intenta de nuevo más tarde." />
            )}
          </article>
        )}
      </Container>
    </section>
  );
}
