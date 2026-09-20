import { CheckIcon, StarIcon } from "@phosphor-icons/react";
import { formatCurrency } from "@/lib/formatters";

import Button from "@/shared/components/Button";

interface Plan {
  planId: string;
  name: string;
  description: string;
  price: number;
  feature: string[];
}

export default function PlanCard({ plan, isPopular }: { plan: Plan; isPopular?: boolean }) {
  return (
    <article
      className={`relative h-full flex flex-col rounded-3xl md:rounded-4xl border p-8 sm:p-10 transition-all duration-300 w-full ${isPopular
        ? "border-foreground/20 bg-foreground shadow-2xl shadow-foreground/10 text-background"
        : "border-foreground/10 bg-background shadow-md hover:border-foreground/20 text-foreground"
        }`}
    >
      <div className="flex h-full flex-col">
        <header className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-black uppercase tracking-tight">
              {plan.name}
            </h3>
            {isPopular && (
              <span className="flex items-center gap-1.5 rounded-full bg-background/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-background">
                <StarIcon
                  size={12}
                  weight="fill"
                />
                Popular
              </span>
            )}
          </div>
          <p className={`text-sm leading-relaxed font-medium ${isPopular ? "text-background/70" : "text-foreground/70"}`}>
            {plan.description}
          </p>
        </header>

        <div className="mb-8 flex items-baseline gap-1">
          <span className="text-5xl font-black tracking-tighter">
            {formatCurrency(Number(plan.price))}
          </span>
          <span className={`text-sm font-bold ${isPopular ? "text-background/60" : "text-foreground/50"}`}>/mes</span>
        </div>

        <ul className="mb-8 flex-1 space-y-4">
          {plan.feature.map((f) => (
            <li
              key={f}
              className={`flex items-start gap-3 text-sm font-medium ${isPopular ? "text-background/90" : "text-foreground/80"}`}
            >
              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isPopular ? "bg-background/15" : "bg-foreground/5"}`}>
                <CheckIcon
                  size={12}
                  className={isPopular ? "text-background" : "text-foreground"}
                  weight="bold"
                />
              </div>
              <span className="leading-tight">{f}</span>
            </li>
          ))}
        </ul>

        <Button
          href="/auth/register"
          variant={isPopular ? "primary" : "secondary"}
        >
          Elegir {plan.name}
        </Button>
      </div>
    </article>
  );
}