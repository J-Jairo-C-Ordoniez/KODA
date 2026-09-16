"use client";

import { forwardRef } from "react";

export const ProblemIntro = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function ProblemIntro(props, ref) {
    return (
      <header
        ref={ref}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6"
        {...props}
      >
        <div className="problem-title-stage absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none">
          <hgroup className="text-center space-y-2 sm:space-y-3 max-w-4xl">
            <h2
              id="problem-heading"
              className="problem-title-phrase font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground"
            >
              El cuaderno ya no alcanza.
            </h2>
            <p className="problem-title-phrase block font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground/50">
              Y tú lo sabes.
            </p>
          </hgroup>
        </div>
        <div className="problem-desc-stage absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none opacity-0">
          <div className="max-w-3xl text-center space-y-4 sm:space-y-6">
            <p className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.15] tracking-tight text-foreground">
              Hay un punto donde tu negocio crece pero el control no.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black text-foreground/45 leading-[1.2] tracking-tight">
              Cada día a ciegas.
            </p>
          </div>
        </div>
      </header>
    );
  }
);

export default ProblemIntro;
