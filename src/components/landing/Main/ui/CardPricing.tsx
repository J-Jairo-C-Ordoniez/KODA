import { Check } from "lucide-react";
import Button from "../../../ui/Button";

interface Plan {
  planId: string;
  name: string;
  description: string;
  price: number;
  feature: string[];
}

export default function CardPricing({ plan }: { plan: Plan }) {
  const isEmpresarial = plan.name.toLowerCase() === 'empresarial';

  return (
    <section className={`relative p-10 rounded-3xl bg-background border transition-all duration-500 overflow-hidden group ${isEmpresarial
      ? 'border-navy shadow-2xl shadow-navy/10 scale-[1.02] z-10'
      : 'border-foreground/5 shadow-sm hover:shadow-xl hover:shadow-navy/10 hover:border-navy/20'
      }`}>
      {isEmpresarial && (
        <span className="absolute top-0 right-0 bg-navy text-background px-6 py-2 rounded-bl-2xl font-bold text-xs uppercase tracking-widest">
          Popular
        </span>
      )}

      <article className="flex flex-col gap-8 justify-between h-full">
        <header className="space-y-3">
          <h3 className={`uppercase w-full text-xl lg:text-2xl font-black leading-tight tracking-tight ${isEmpresarial ? 'text-navy' : 'text-primary'}`}>
            {plan.name}
          </h3>
          <p className="text-md lg:text-lg text-primary/80 max-w-xl mx-auto lg:mx-0 font-medium leading-snug tracking-wider">
            {plan.description}
          </p>
        </header>

        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black text-primary tracking-tighter">
            {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0
            }).format(Number(plan.price))}
          </span>
          <span className="text-secondary font-bold text-sm uppercase tracking-widest">/mes</span>
        </div>

        <ul className="space-y-4 py-8 border-y border-foreground/5">
          {plan.feature.map((f) => (
            <li
              key={f}
              className="flex gap-2 text-md lg:text-lg text-primary/80 font-medium leading-snug tracking-wider"
            >
              <div className="w-5 h-5 bg-navy/5 rounded-full flex items-center justify-center text-navy shrink-0">
                <Check size={12} strokeWidth={3} />
              </div>
              {f}
            </li>
          ))}
        </ul>

        <Button
          href="/register"
          variant={isEmpresarial ? 'accent' : 'ambulance'}
          className={`w-full py-4 text-lg font-black tracking-tight ${isEmpresarial ? 'shadow-xl shadow-navy/20' : ''}`}
        >
          Seleccionar {plan.name}
        </Button>
      </article>
    </section>
  );
}
