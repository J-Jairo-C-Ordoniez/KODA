import { Check } from "lucide-react";
import Button from "../../ui/Button";

interface Plan {
    planId: string;
    name: string;
    description: string;
    price: number;
    feature: string[];
}

export default function CardPricing({ plan }: { plan: Plan }) {
    return (
        <section className={`relative p-8 rounded-lg bg-background border border-foreground/80 shadow-xl hover:scale-102 transition-transform duration-500 overflow-hidden group ${plan.name === 'Empresarial' ? 'ring-2 ring-purple-500' : ''}`}>
            {plan.name === 'Empresarial' && (
                <p className="absolute top-0 right-0 bg-linear-to-l from-purple-600 to-indigo-600 text-background px-6 py-2 rounded-bl-3xl font-medium text-lg tracking-wider">
                    Populares
                </p>
            )}

            <article className="space-y-6">
                <header className="space-y-2">
                    <h3 className="text-primary font-semibold text-xl tracking-wider">{plan.name}</h3>
                    <p className="text-secondary font-medium text-lg tracking-wider">{plan.description}</p>
                </header>

                <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-primary">
                        ${Number(plan.price).toLocaleString('es-CO')}
                    </span>
                    <span className="text-secondary font-medium text-lg tracking-wider">/mes</span>
                </div>

                <ul className="space-y-4 py-8 border-y border-foreground/80">
                    {plan.feature.map((f) => (
                        <li
                            key={f}
                            className="flex items-center gap-3 text-secondary font-medium text-lg tracking-wider"
                        >
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <Check size={14} strokeWidth={3} />
                            </div>
                            {f}
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
            </article>
        </section>
    );
}