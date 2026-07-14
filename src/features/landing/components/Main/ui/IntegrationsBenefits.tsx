import { Globe, RefreshCw, Zap } from "lucide-react";

const benefits = [
  {
    icon: <Globe size={24} className="text-foreground" />,
    title: "Catálogo Automático",
    desc: "Al crear un producto en tu inventario, ya está listo para venderse online. Sin doble trabajo, sin subir la misma foto dos veces.",
  },
  {
    icon: <Zap size={24} className="text-accent" />,
    title: "Ventas sin enredos",
    desc: "El cliente te envía exactamente lo que quiere (talla, color y cantidad). Adiós a los audios descifrando qué modelo te piden.",
  },
  {
    icon: <RefreshCw size={24} className="text-foreground" />,
    title: "Stock sincronizado",
    desc: "Si vendes una prenda en la tienda física, desaparece de tu vitrina digital en tiempo real. Nunca más vendas algo que ya no tienes.",
  },
];

export default function IntegrationsBenefits() {
  return (
    <>
      {benefits.map((b) => (
        <div
          key={b.title}
          className="bento-box group flex h-full flex-col justify-center"
        >
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/6 bg-background p-1 shadow-xs transition-transform duration-300 group-hover:scale-110">
            {b.icon}
          </span>
          <h3 className="mb-2 text-2xl font-bold leading-[1.1] tracking-tigh">
            {b.title}
          </h3>
          <p className="text-base md:text-lg leading-relaxed opacity-80">
            {b.desc}
          </p>
        </div>
      ))}
    </>
  );
}