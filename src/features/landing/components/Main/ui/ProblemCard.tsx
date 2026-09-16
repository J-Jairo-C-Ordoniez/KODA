import { ReactNode } from "react";

export interface ProblemItem {
  id: string;
  title: string;
  desc: string;
  visual: ReactNode;
}

export const PROBLEMS: ProblemItem[] = [
  {
    id: "box",
    title: "Vendiste todo el día. ¿Pero cuánto te quedó?",
    desc: "Al final sacas la plata, cuentas, restas... y el número nunca cuadra. Ventas sin registrar, fiados que se pierden, gastos que se olvidan. Siempre falta algo.",
    visual: (
      <div className="w-full h-full flex flex-col justify-center gap-2.5 sm:gap-3 px-2 sm:px-4" aria-hidden="true">
        <div className="flex justify-between text-base lg:text-lg border-b border-primary/10 pb-2.5 sm:pb-3">
          <span className="text-primary/60">Ventas del día</span>
          <span className="font-bold text-primary">$1.250.000</span>
        </div>
        <div className="flex justify-between text-base lg:text-lg border-b border-primary/10 pb-2.5 sm:pb-3">
          <span className="text-primary/60">Gastos varios</span>
          <span className="text-primary/30 italic">sin registro</span>
        </div>
        <div className="flex justify-between text-base lg:text-lg font-bold">
          <span className="text-primary/80">Ganancia real</span>
          <span className="text-primary/30 italic font-normal">sin calcular</span>
        </div>
      </div>
    ),
  },
  {
    id: "head",
    title: "Todo vive en tu cabeza. Y eso cansa.",
    desc: "¿Quién te debe? ¿Cuánto abonó? La memoria no es un sistema. Cuando fallas siempre pierdes: plata, tiempo o la confianza del cliente.",
    visual: (
      <div className="w-full mx-auto h-full flex flex-col justify-center gap-2.5 sm:gap-3 px-2 sm:px-4" aria-hidden="true">
        {["¿Ya me abonaron el fiado?", "¿Cuánto stock me queda?", "¿Quién hizo esa venta?"].map((q, i) => (
          <p key={i} className="text-primary px-3.5 sm:px-4 py-2 sm:py-2.5 md:py-3 text-base font-medium flex items-center gap-2.5 sm:gap-3 rounded-xl bg-background/50">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            {q}
          </p>
        ))}
      </div>
    ),
  },
  {
    id: "stock",
    title: "Compras sin saber. Vendes sin datos.",
    desc: "Pides más stock porque 'se veía que faltaba'. Luego sobra talla L, falta talla M y el dinero queda parado en el estante.",
    visual: (
      <div className="w-full h-full flex flex-col justify-center px-2 sm:px-4" aria-hidden="true">
        <p className="text-xs uppercase tracking-widest text-primary/70 mb-2 sm:mb-3 md:mb-4 font-bold">Inventario</p>
        <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
          <div className="flex justify-between text-base lg:text-lg border-b border-primary/10 pb-2 sm:pb-2.5">
            <span className="text-primary/60">Jeans Slim 32</span>
            <span className="font-bold text-primary">0 uds.</span>
          </div>
          <div className="flex justify-between text-base lg:text-lg border-b border-primary/10 pb-2 sm:pb-2.5">
            <span className="text-primary/60">Camiseta M</span>
            <span className="font-bold text-primary">1 ud.</span>
          </div>
          <div className="flex justify-between text-base lg:text-lg">
            <span className="text-primary/60">Camisas L</span>
            <span className="font-bold text-primary">12 uds.</span>
          </div>
        </div>
      </div>
    ),
  },
];

interface ProblemCardProps {
  item: ProblemItem;
  index: number;
  total: number;
}

export default function ProblemCard({ item, index, total }: ProblemCardProps) {
  return (
    <article
      className="problem-card-frame relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16"
      aria-label={`Problema ${index + 1} de ${total}: ${item.title}`}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-16">
        <div className="w-full lg:w-7/12 flex flex-col text-left">
          <h3 className="card-title font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight text-foreground mb-3 sm:mb-5">
            {item.title}
          </h3>
          <p className="card-desc text-base md:text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-xl">
            {item.desc}
          </p>
        </div>
        <div className="card-visual w-full lg:w-5/12 flex items-center justify-center">
          <div className="w-full max-w-md lg:max-w-none rounded-3xl md:rounded-4xl border border-primary/10 bg-background/80 shadow-sm p-6 sm:p-8 flex flex-col justify-center min-h-50 sm:min-h-60 lg:min-h-70">
            {item.visual}
          </div>
        </div>
      </div>
    </article>
  );
}
