"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function SlideSale() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    tl.set('.sale-item', { y: -80, rotation: -15, scale: 0.8, opacity: 0 });
    tl.set('.sale-bag', { scale: 1 });
    tl.set('.sale-receipt', { height: 0, opacity: 0 });
    tl.set('.sale-stamp', { scale: 3, opacity: 0, rotation: -25 });

    tl.to('.sale-item', {
      y: 0,
      opacity: 1,
      rotation: 0,
      scale: 1,
      duration: 1.0,
      ease: 'bounce.out',
    }, '+=0.5');

    tl.to('.sale-bag', {
      scaleX: 1.15,
      scaleY: 0.85,
      duration: 0.15,
      ease: 'power2.out',
    });
    tl.to('.sale-bag', {
      scaleX: 0.95,
      scaleY: 1.05,
      duration: 0.1,
    });
    tl.to('.sale-bag', {
      scale: 1,
      duration: 0.15,
    });

    tl.to('.sale-item', {
      opacity: 0,
      y: 10,
      scale: 0.8,
      duration: 0.25,
    }, '-=0.35');

    tl.to('.sale-receipt', {
      height: 'auto',
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
    }, '+=0.1');

    tl.to('.sale-stamp', {
      scale: 1,
      opacity: 1,
      duration: 0.45,
      ease: 'back.in(1.1)',
    });

    tl.to('.sale-receipt', {
      x: 'random(-2, 2)',
      y: 'random(-2, 2)',
      duration: 0.05,
      repeat: 3,
      yoyo: true,
    });
    tl.set('.sale-receipt', { x: 0, y: 0 });

    tl.to({}, { duration: 3.5 });

    tl.to('.sale-receipt, .sale-bag', {
      opacity: 0,
      y: 15,
      duration: 0.6,
      ease: 'power2.in',
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-between"
      aria-label="Animación de Ventas: prenda que entra a bolsa de compras y genera un recibo de pago exitoso"
    >
      <h3 className="w-full text-xs font-medium uppercase tracking-widest text-foreground-muted/80 select-none">
        Registro de Venta
      </h3>

      <div
        className="flex items-start justify-center gap-10 w-full px-6 min-h-[160px]"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-3 shrink-0 relative mt-8">
          <div className="sale-item absolute -top-10 left-3 z-10 pointer-events-none">
            <svg
              width="28" height="28" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5 C12 3.5 13.2 2 14.8 2"
                stroke="rgba(201,150,58,0.95)" strokeWidth="2.2" strokeLinecap="round" fill="none"
              />
              <path
                d="M12 5 L3 14 H21 L12 5"
                stroke="rgba(201,150,58,0.95)" strokeWidth="1.8" fill="rgba(201,150,58,0.25)" strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="sale-bag w-18 h-18 rounded-2xl flex items-center justify-center relative shadow-md bg-amber-300/5 border border-amber-300/6">
            <svg
              width="36" height="36" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 8 V6 C6 4.3 7.3 3 9 3 H15 C16.7 3 18 4.3 18 6 V8" stroke="rgba(250,250,249,0.3)" strokeWidth="1.5" />
              <rect x="3" y="8" width="18" height="13" rx="2" fill="rgba(201,150,58,0.15)" stroke="rgba(250,250,249,0.25)" strokeWidth="1.5" />
              <path d="M9 12 L11 14 L15 10" stroke="rgba(201,150,58,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xs font-medium text-foreground-muted/80 tracking-widest select-none">Bolsa</span>
        </div>

        <div className="flex-1 max-w-[160px] overflow-hidden relative">
          <div
            className="sale-receipt rounded-xl p-3 select-none flex flex-col gap-2 shadow-xl bg-amber-300/5 border border-amber-300/6"
          >
            <div className="border-b border-amber-300/5 pb-1 text-center">
              <span className="text-xs uppercase font-medium tracking-widest text-foreground-muted/80">Recibo KODA</span>
              <div className="text-[9px] font-medium text-foreground-muted/80 mt-0.5">#01824</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs text-foreground-muted/80">
                <span>1x Camiseta Polo</span>
                <span className="font-semibold text-foreground-muted/80">$45.000</span>
              </div>
              <div className="flex justify-between text-xs text-foreground-muted/80 border-t border-amber-300/6 pt-1">
                <span>Método:</span>
                <span className="font-semibold text-amber-300/80">Transferencia</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-dashed border-amber-300/6 pt-1.5 mt-0.5 font-bold">
              <span className="text-xs text-foreground-muted/60">TOTAL:</span>
              <span className="text-xs text-foreground-muted/80 tracking-widest">$45.000</span>
            </div>
            <div className="sale-stamp absolute top-4 left-4 z-20 flex items-center justify-center pointer-events-none">
              <span
                className="px-2.5 py-1 border-2 border-emerald-500/80 rounded font-black text-[12px] tracking-widest text-emerald-400/90 bg-emerald-950/90 rotate-12 shadow-lg"
              >
                VENDIDO
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs font-medium text-foreground-muted/60 select-none">
        Registra cada venta en 2 clics y descuenta del inventario.
      </p>
    </div>
  );
}
