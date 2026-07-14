import { Check, Star } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

import Button from "@/shared/components/Button";

interface Plan {
  planId: string;
  name: string;
  description: string;
  price: number;
  feature: string[];
}

export default function CardPricing({ plan, isPopular }: { plan: Plan; isPopular?: boolean }) {
  return (
    <article
      className={`relative flex flex-col rounded-4xl border p-8 transition-all duration-300 w-full md:w-[380px] ${isPopular
        ? "border-accent/50 bg-background shadow-xl shadow-accent/5 ring-1 ring-accent/20"
        : "border-foreground/10 bg-background shadow-sm hover:border-primary/20"
        }`}
    >
      <div className="flex h-full flex-col">
        <header className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold uppercase tracking-wide text-primary">
              {plan.name}
            </h3>
            {isPopular && (
              <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent">
                <Star
                  size={12}
                  fill="currentColor"
                />
                Popular
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed text-primary/70">
            {plan.description}
          </p>
        </header>

        <div className="mb-8 flex items-baseline gap-1">
          <span className="text-5xl font-black tracking-tighter text-primary">
            {formatCurrency(Number(plan.price))}
          </span>
          <span className="text-sm font-medium text-primary/50">/mes</span>
        </div>

        <ul className="mb-8 flex-1 space-y-4">
          {plan.feature.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 text-sm text-primary/80"
            >
              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isPopular ? "bg-accent/10" : "bg-primary/5"}`}>
                <Check
                  size={12}
                  className={isPopular ? "text-accent" : "text-primary"}
                  strokeWidth={3}
                />
              </div>
              <span className="leading-tight">{f}</span>
            </li>
          ))}
        </ul>

        <Button
          href="/register"
          variant={isPopular ? "primary" : "secondary"}
        >
          Elegir {plan.name}
        </Button>
      </div>
    </article>
  );
}