import { Check, Star } from "lucide-react";
import Button from "../../../ui/Button";
import { formatCurrency } from "@/lib/formatters";

interface Plan {
  planId: string;
  name: string;
  description: string;
  price: number;
  feature: string[];
}

export default function CardPricing({ plan, isPopular, index = 0 }: { plan: Plan; isPopular?: boolean; index?: number }) {
  return (
    <article
      className={`pricing-card group relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
        isPopular
          ? 'bg-background-elevated border-accent/30 shadow-[0_0_40px_rgba(62,207,178,0.08)]'
          : 'bg-background-elevated border-primary/5 hover:border-primary/2'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(62,207,178,0.1) 0%, transparent 70%)' }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full">
        <header className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className={`text-xl font-bold tracking-tight uppercase leading-none ${isPopular ? 'text-accent' : 'text-white'}`}>
              {plan.name}
            </h3>
            {isPopular && (
              <span className="flex items-center gap-1 bg-accent text-background px-3 py-1 rounded-full font-medium text-sm uppercase tracking-widest">
                <Star size={14} fill="#060706" />
                Popular
              </span>
            )}
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {plan.description}
          </p>
        </header>

        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-4xl md:text-5xl font-bold tracking-tight text-white group-hover:text-accent transition-colors duration-300 font-mono">
            {formatCurrency(Number(plan.price))}
          </span>
          <span className="font-bold text-xs uppercase tracking-widest text-foreground-muted">/mes</span>
        </div>

        <ul className="space-y-3.5 pb-8 mb-8 border-b border-primary/5 flex-1">
          {plan.feature.map((f) => (
            <li key={f} className="flex gap-3 items-center text-sm text-foreground-muted">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isPopular ? 'bg-accent/12 border border-accent/25' : 'bg-primary/4 border border-primary/8'}`}>
                <Check size={10} strokeWidth={3} className={isPopular ? 'text-accent' : 'text-foreground-muted'} />
              </div>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Button
          href="/register"
          variant={isPopular ? 'contrast' : 'secondary'}
          className={`w-full py-3.5 text-sm font-bold tracking-widest uppercase rounded-xl transition-all duration-200 ${
            isPopular ? 'shadow-[0_0_24px_rgba(62,207,178,0.2)] hover:shadow-[0_0_36px_rgba(62,207,178,0.32)]' : ''
          }`}
        >
          Elegir {plan.name}
        </Button>
      </div>
    </article>
  );
}
