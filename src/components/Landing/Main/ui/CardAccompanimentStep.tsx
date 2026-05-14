import React from 'react';

interface CardAccompanimentStepProps {
  step: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
}

export default function CardAccompanimentStep({ step }: CardAccompanimentStepProps) {
  return (
    <article className="acc-step flex flex-col md:flex-row lg:flex-col gap-6 items-start">
      <header className="shrink-0 w-14 h-14 rounded-2xl bg-background-elevated border border-foreground/10 flex items-center justify-center shadow-lg shadow-black/5">
        {step.icon}
      </header>
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-primary tracking-tight">
          {step.title}
        </h3>
        <p className="text-base text-foreground-muted leading-relaxed font-medium">
          {step.description}
        </p>
      </div>
    </article>
  );
}
