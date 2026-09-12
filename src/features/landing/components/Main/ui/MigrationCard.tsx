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
      className="flex items-center justify-center w-full text-center pointer-events-none"
      aria-label={step.title}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h3 className="card-step-title font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-foreground mb-4 sm:mb-6">
          {step.title}
        </h3>

        <p className="card-step-desc text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl mx-auto">
          {step.description}
        </p>
      </div>
    </article>
  );
}
