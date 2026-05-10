import { Check } from "lucide-react";
import Button from "../../../ui/Button";

interface Plan {
  planId: string;
  name: string;
  description: string;
  price: number;
  feature: string[];
}

export default function CardPricing({ plan, isPopular, index = 0 }: { plan: Plan; isPopular?: boolean; index?: number }) {
  return (
    <section className={`pricing-card relative flex flex-col p-10 md:p-14 rounded-[40px] border transition-all duration-500 shadow-2xl hover:scale-[1.02] overflow-hidden ${
      isPopular
        ? 'bg-background-elevated border-contrast/50 shadow-[0_0_50px_rgba(255,122,0,0.10)]'
        : 'bg-background-elevated border-foreground/8 hover:border-foreground/20'
    }`}>

      {isPopular && (
        <span className="absolute top-5 right-5 bg-contrast text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
          Popular
        </span>
      )}

      {/* Plan name + description */}
      <div className="mb-10">
        <h3 className={`text-2xl md:text-3xl font-black tracking-tight leading-none mb-4 ${isPopular ? 'text-contrast' : 'text-primary'}`}>
          {plan.name}
        </h3>
        <p className="text-lg font-medium leading-relaxed text-foreground-muted">
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 mb-10">
        <span className="text-5xl md:text-6xl font-black tracking-tighter text-primary">
          {new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
          }).format(Number(plan.price))}
        </span>
        <span className="font-bold text-sm uppercase tracking-widest text-foreground-muted">/mes</span>
      </div>

      {/* Features */}
      <ul className="space-y-4 pb-10 mb-10 border-b border-foreground/8">
        {plan.feature.map((f) => (
          <li key={f} className="flex gap-4 items-center text-base font-medium text-primary/80">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isPopular ? 'bg-contrast/15' : 'bg-foreground/8'}`}>
              <Check size={13} strokeWidth={3} className={isPopular ? 'text-contrast' : 'text-primary'} />
            </div>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        href="/register"
        variant="secondary"
        className={`w-full py-5 text-sm font-black tracking-widest uppercase rounded-2xl transition-all ${
          isPopular
            ? 'bg-contrast text-white hover:bg-contrast-hover border-none shadow-[0_8px_24px_rgba(255,122,0,0.25)]'
            : 'border border-foreground/12 hover:border-foreground/30 hover:bg-foreground/5 text-primary'
        }`}
      >
        Elegir {plan.name}
      </Button>
    </section>
  );
}
