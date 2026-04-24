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
    <section className={`relative p-10 rounded-3xl bg-background border transition-all duration-500 overflow-hidden group ${
      isEmpresarial
        ? 'border-navy shadow-2xl shadow-navy/10 scale-[1.02] z-10'
        : 'border-foreground/5 shadow-sm hover:shadow-xl hover:shadow-navy/10 hover:border-navy/20'
    }`}>
      {isEmpresarial && (
        <div className="absolute top-0 right-0 bg-navy text-background px-6 py-2 rounded-bl-2xl font-bold text-xs uppercase tracking-widest">
          Popular
        </div>
      )}

      <article className="flex flex-col gap-8 justify-between h-full">
        <header className="space-y-3">
          <h3 className={`font-black text-2xl tracking-tight ${isEmpresarial ? 'text-navy' : 'text-primary'}`}>
            {plan.name}
          </h3>
          <p className="text-secondary font-medium text-base leading-relaxed">
            {plan.description}
          </p>
        </header>

        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black text-primary tracking-tighter">
            ${Number(plan.price).toLocaleString('es-CO')}
          </span>
          <span className="text-secondary font-bold text-sm uppercase tracking-widest">/mes</span>
        </div>

        <ul className="space-y-4 py-8 border-y border-foreground/5">
          {plan.feature.map((f) => (
            <li
              key={f}
              className="flex items-center gap-3 text-primary/80 font-medium text-sm"
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
