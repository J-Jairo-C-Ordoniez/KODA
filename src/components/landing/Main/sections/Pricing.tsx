'use client';

import { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import Loader from '../../ui/Loader';
import CardPricing from '../ui/CardPricing';

interface Plan {
  planId: string;
  name: string;
  description: string;
  price: number;
  feature: string[];
}

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans');
        const result = await response.json();
        if (result.success) {
          setPlans(result.data);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <section
      id="pricing"
      className="py-24 bg-background"
    >
      <Container>
        <article className="text-center space-y-4 mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-primary">
            Planes a tu Medida
          </h2>
          <p className="text-secondary max-w-2xl mx-auto font-medium text-lg">
            Sin contratos forzosos. Cancela cuando quieras.
          </p>
        </article>

        {isLoading ? (
          <Loader />
        ) : (
          <article className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.length > 0 ? plans.map((plan) => (
              <CardPricing
                key={plan.planId}
                plan={plan}
              />
            )) : (
              <p className="text-secondary mx-auto font-medium text-lg text-center w-full col-span-2">No hay planes disponibles</p>
            )}
          </article>
        )}
      </Container>
    </section>
  );
}
