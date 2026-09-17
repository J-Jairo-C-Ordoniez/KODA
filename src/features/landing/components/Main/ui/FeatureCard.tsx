import { ReactNode } from "react";
import ModernAppMockup from "@/features/landing/components/Main/ui/ModernAppMockup";

export interface FeatureItem {
  id: "nav" | "workspace" | "metrics";
  title: string;
  desc: string;
}

export const FEATURES_DATA: FeatureItem[] = [
  {
      id: "nav",
      title: "Encuentras todo al instante",
      desc: "Menús claros que no te marean. Usar tu sistema es tan fácil y rápido como revisar tu celular. Sin opciones extrañas estorbando.",
  },
  {
      id: "workspace",
      title: "Pantalla libre para vender",
      desc: "Al cobrar, los menús se ocultan solos. Tú y tus vendedores se enfocan en despachar rápido al cliente que tienen enfrente, sin distracciones.",
  },
  {
      id: "metrics",
      title: "El pulso de tu local",
      desc: "¿Cuánto llevas vendido hoy? ¿Quién te debe? Lo ves todo de un vistazo. Se acabaron las horas sumando tickets al final del día.",
  },
];

interface FeatureCardProps {
  item: FeatureItem;
  index: number;
  total: number;
}

export default function FeatureCard({ item, index, total }: FeatureCardProps) {
  return (
    <article
      className="feature-card-frame relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16"
      aria-label={`Funcionalidad ${index + 1} de ${total}: ${item.title}`}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-16">
        <div className="w-full lg:w-5/12 flex flex-col text-left">
          <h3 className="card-title font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight text-foreground mb-3 sm:mb-5">
            {item.title}
          </h3>
          <p className="card-desc text-base md:text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-xl">
            {item.desc}
          </p>
        </div>
        <div className="card-visual w-full lg:w-7/12 flex items-center justify-center">
            <ModernAppMockup step={item.id} />
        </div>
      </div>
    </article>
  );
}
