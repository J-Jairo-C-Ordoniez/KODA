import { Check, Star } from "lucide-react";
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
    <article className={`pricing-card group relative flex flex-col p-6 md:p-12 rounded-[2.5rem] border transition-all duration-500 hover:scale-[1.02] overflow-hidden ${
      isPopular
        ? 'bg-background-elevated/60 backdrop-blur-xl border-contrast/50 shadow-[0_0_50px_rgba(255,122,0,0.15)]'
        : 'bg-background-elevated/40 backdrop-blur-xl border-foreground/10 hover:border-foreground/30'
    }`}>
      {isPopular && (
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-contrast/20 blur-[60px] rounded-full pointer-events-none" />
      )}

      <div className="relative z-10 flex flex-col h-full">
        <header className="mb-6 md:mb-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className={`text-2xl md:text-3xl font-black tracking-tight leading-tight ${isPopular ? 'text-contrast' : 'text-primary'}`}>
              {plan.name}
            </h3>
            
            {isPopular && (
              <span className="flex items-center gap-1.5 bg-contrast text-white px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-contrast/20">
                <Star size={10} fill="white" />
                Popular
              </span>
            )}
          </div>
          
          <p className="text-base md:text-lg text-foreground-muted leading-relaxed font-medium">
            {plan.description}
          </p>
        </header>

        <div className="flex items-baseline gap-2 mb-8 md:mb-10">
          <span className="text-4xl md:text-6xl font-black tracking-tighter text-primary group-hover:text-contrast transition-colors">
            {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0
            }).format(Number(plan.price))}
          </span>
          <span className="font-bold text-xs md:text-sm uppercase tracking-widest text-foreground-muted">/mes</span>
        </div>

        <ul className="space-y-3 md:space-y-4 pb-8 md:pb-10 mb-8 md:mb-10 border-b border-foreground/10">
          {plan.feature.map((f) => (
            <li key={f} className="flex gap-3 md:gap-4 items-center text-sm md:text-base font-medium text-primary/90">
              <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shrink-0 ${isPopular ? 'bg-contrast/20' : 'bg-foreground/10'}`}>
                <Check size={11} md-size={13} strokeWidth={3} className={isPopular ? 'text-contrast' : 'text-primary'} />
              </div>
              {f}
            </li>
          ))}
        </ul>

        <Button
          href="/register"
          className={`w-full py-4 md:py-5 text-xs md:text-sm font-black tracking-widest uppercase rounded-2xl transition-all duration-300 ${
            isPopular
              ? 'bg-contrast text-background hover:bg-contrast-hover shadow-xl'
              : 'bg-foreground/5 border border-foreground/15 hover:border-foreground/40 hover:bg-foreground/10 text-background'
          }`}
        >
          Elegir {plan.name}
        </Button>
      </div>
    </article>
  );
}

