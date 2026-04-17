import Container from '../../ui/Container';
import Button from '../../ui/Button';
import { Check } from 'lucide-react';
import prisma from '@/infrastructure/db/client';

export const Pricing = async () => {
  const plans = await prisma.plan.findMany({
    orderBy: { price: 'asc' }
  });

  return (
    <section id="pricing" className="py-24 bg-[#f5f5f5]">
      <Container>
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-[#1a1a1a]">
            Planes a tu Medida
          </h2>
          <p className="text-[#6b6b6b] max-w-2xl mx-auto font-medium text-lg">
            Sin contratos forzosos. Cancela cuando quieras.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.planId}
              className={`relative p-10 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-black/5 hover:scale-[1.02] transition-transform duration-500 overflow-hidden group ${plan.name === 'Empresarial' ? 'ring-2 ring-purple-500' : ''}`}
            >
              {plan.name === 'Empresarial' && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-bl-3xl font-bold text-sm">
                  Populares
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-[#1a1a1a]">{plan.name}</h3>
                  <p className="text-gray-500 mt-2 font-medium">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#1a1a1a]">
                    ${Number(plan.price).toLocaleString('es-CO')}
                  </span>
                  <span className="text-gray-500 font-bold">/mes</span>
                </div>

                <ul className="space-y-4 py-8 border-y border-gray-100">
                  {[
                    'Inventario ilimitado',
                    'Ventas y reportes',
                    'Control de fiados',
                    'Soporte priority',
                    plan.name === 'Empresarial' ? 'Acceso multi-usuario' : 'Usuario único',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 font-medium text-[#444]">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href="/register"
                  variant={plan.name === 'Empresarial' ? 'accent' : 'primary'}
                  className="w-full py-4 text-lg"
                >
                  Seleccionar {plan.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
