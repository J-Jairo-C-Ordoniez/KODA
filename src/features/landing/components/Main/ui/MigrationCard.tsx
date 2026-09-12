export interface MigrationStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

interface MigrationCardProps {
  step: MigrationStep;
  index: number;
}

export default function MigrationCard({ step }: MigrationCardProps) {
  return (
    <article
      className="w-full max-w-4xl mx-auto flex flex-col text-left pointer-events-none"
      aria-label={step.title}
    >
      <h3 className="card-step-title font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight text-foreground mb-3 sm:mb-5">
        {step.title}
      </h3>

      <p className="card-step-desc text-base md:text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-xl">
        {step.description}
      </p>
    </article>
  );
}
