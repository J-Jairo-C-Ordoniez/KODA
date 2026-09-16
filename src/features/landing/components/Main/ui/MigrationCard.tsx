import { ReactNode } from "react";

export interface MigrationStep {
  id: string;
  title: string;
  description: string;
  elements: {
    topLeft: ReactNode;
    topRight: ReactNode;
    bottomLeft: ReactNode;
    bottomRight: ReactNode;
  };
}

interface MigrationCardProps {
  step: MigrationStep;
  index: number;
}

export default function MigrationCard({ step }: MigrationCardProps) {
  return (
    <article
      className="migration-card-frame relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 select-none"
      aria-labelledby={`card-title-${step.id}`}
    >
      <div className="migration-float-item migration-float-tl float-item-tl">{step.elements.topLeft}</div>

      <div className="migration-float-item migration-float-tr float-item-tr">{step.elements.topRight}</div>

      <div className="card-center-content relative z-10 max-w-4xl mx-auto text-center px-4">
        <h3
          id={`card-title-${step.id}`}
          className="card-title font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground mb-4 sm:mb-6"
        >
          {step.title}
        </h3>

        <p className="card-desc text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/75 leading-relaxed max-w-2xl mx-auto font-normal">
          {step.description}
        </p>
      </div>

      <div className="migration-float-item migration-float-bl float-item-bl">{step.elements.bottomLeft}</div>

      <div className="migration-float-item migration-float-br float-item-br">{step.elements.bottomRight}</div>
    </article>
  );
}
