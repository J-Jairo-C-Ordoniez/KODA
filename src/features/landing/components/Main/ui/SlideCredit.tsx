"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CREDITS = [
  { id: 'c1', name: 'María G.', amount: '$85.000', initialAmount: '$85.000', isTarget: false },
  { id: 'c2', name: 'Carlos M.', amount: '$120.000', initialAmount: '$120.000', isTarget: false },
  { id: 'c3', name: 'Lina C.', amount: '$0', initialAmount: '$60.000', isTarget: true },
  { id: 'c4', name: 'Andrés P.', amount: '$35.000', initialAmount: '$35.000', isTarget: false },
] as const;

export default function SlideCredit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    tl.set('.credit-item', { opacity: 0, x: -20 });
    tl.set('.flying-coin', { y: 150, x: 20, scale: 0.5, opacity: 0, rotation: 0 });
    tl.set('.target-strikethrough', { width: '0%' });
    tl.set('.target-check', { scale: 0, opacity: 0 });
    tl.set('.target-badge', { opacity: 0, scale: 0.8 });
    tl.set('.target-row', { background: 'rgba(250,250,249,0.025)', borderColor: 'rgba(250,250,249,0.045)' });

    const targetVal = { val: 60000 };
    const targetTextElement = containerRef.current?.querySelector('.target-amount');
    if (targetTextElement) {
      targetTextElement.textContent = '$60.000';
    }

    tl.to('.credit-item', {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
    }, '+=0.5');

    tl.to('.flying-coin', {
      opacity: 1,
      scale: 1,
      rotation: 360,
      duration: 0.5,
      ease: 'power1.out',
    }, '+=0.3');

    tl.to('.flying-coin', {
      x: -95,
      y: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'power2.inOut',
    });

    tl.to('.flying-coin', {
      opacity: 0,
      scale: 0.4,
      duration: 0.15,
    });

    tl.to('.target-row', {
      background: 'rgba(52,211,153,0.06)',
      borderColor: 'rgba(52,211,153,0.18)',
      duration: 0.35,
    }, '-=0.1');

    tl.to(targetVal, {
      val: 0,
      duration: 0.8,
      ease: 'power1.out',
      onUpdate: () => {
        if (targetTextElement) {
          targetTextElement.textContent = `$${Math.round(targetVal.val).toLocaleString('es-CO')}`;
        }
      }
    }, '-=0.25');

    tl.to('.target-check', {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(1.8)',
    }, '-=0.4');

    tl.to('.target-strikethrough', {
      width: '100%',
      duration: 0.5,
      ease: 'power1.inOut',
    }, '-=0.3');

    tl.to('.target-badge', {
      scale: 1,
      opacity: 1,
      duration: 0.35,
      ease: 'back.out(1.5)',
    }, '-=0.15');

    tl.to({}, { duration: 3.5 });

    tl.to('.credit-item', {
      opacity: 0,
      x: 20,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.in',
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-between"
      aria-label="Animación de fiados: deudas que se cobran y se tildan al recibir un pago"
    >
      <h3 className="w-full text-xs font-medium uppercase tracking-widest text-foreground-muted/80 select-none">
        Control de Fiados
      </h3>

      <div
        className="w-full space-y-3 p-8"
        aria-hidden="true"
      >
        {CREDITS.map((credit) => {
          if (credit.isTarget) {
            return (
              <div
                key={credit.id}
                className="credit-item target-row flex items-center justify-between px-4 py-3 rounded-2xl border transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold select-none bg-emerald-500/5 border border-emerald-500/6 text-emerald-500"
                  >
                    L
                  </div>
                  <span className="text-xs font-semibold text-foreground-muted/80 relative">
                    {credit.name}
                    <span className="target-strike through absolute left-0 top-1/2 h-px bg-foreground-muted pointer-events-none w-0" />
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="target-amount text-xs font-bold text-foreground-muted/80 tabular-nums">
                    $60.000
                  </span>

                  <span className="target-badge px-2 py-0.5 rounded text-xs font-medium tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/20">
                    Pagado
                  </span>

                  <span
                    className="target-check w-5.5 h-5.5 rounded-full flex items-center justify-center text-xs font-black shrink-0 bg-emerald-500/5 border border-emerald-500/6 text-emerald-500">
                    ✓
                  </span>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={credit.id}
                className="credit-item flex items-center justify-between px-4 py-3 rounded-2xl bg-foreground-muted/3 border border-foreground-muted/6 text-foreground-muted/80"
              >
                <div className="flex items-center gap-3">
                  <p
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white/40 bg-foreground-muted/3"
                  >
                    {credit.name[0]}
                  </p>
                  <span className="text-xs font-semibold text-foreground-muted/80">
                    {credit.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-foreground-muted/80 tabular-nums">
                    {credit.amount}
                  </span>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div
        className="flying-coin w-8 h-8 rounded-full flex items-center justify-center shadow-lg pointer-events-none select-none bg-emerald-500/5 border border-emerald-500/6 text-emerald-500"
      >
        <span className="text-xs font-bold">$</span>
      </div>

      <p className="text-center text-xs font-medium text-foreground-muted/60 select-none">
        Abónale a tus clientes y tacha deudas sin perder la cuenta.
      </p>
    </div>
  );
}
