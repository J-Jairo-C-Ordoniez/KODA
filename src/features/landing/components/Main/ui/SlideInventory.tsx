"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const BOXES = [
  { label: 'Camisetas', color: 'bg-[#C9963A80]', x: -50, y: -40, r: -25, count: '+48' },
  { label: 'Jeans', color: 'bg-[#8A756080]', x: 45, y: -50, r: 18, count: '+32' },
  { label: 'Chaquetas', color: 'bg-[#6B5E5080]', x: -30, y: 55, r: -15, count: '+12' },
  { label: 'Accesorios', color: 'bg-[#A0824880]', x: 50, y: 40, r: 22, count: '+85' },
  { label: 'Bermudas', color: 'bg-[#5A545080]', x: -55, y: 10, r: -28, count: '+20' },
  { label: 'Vestidos', color: 'bg-[#7A6A3A80]', x: 35, y: -20, r: 16, count: '+15' },
] as const;

export default function SlideInventory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    tl.set('.box-card', {
      x: (i) => BOXES[i].x,
      y: (i) => BOXES[i].y,
      rotation: (i) => BOXES[i].r,
      scale: 0.85,
      opacity: 0.25,
    });

    tl.set('.stock-badge', { scale: 0, opacity: 0 });
    tl.set('.success-banner', { y: 15, opacity: 0 });

    tl.to('.box-card', {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 1.6,
      stagger: 0.15,
      ease: 'back.out(1.2)',
    }, '+=0.5');

    tl.to('.stock-badge', {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)',
    }, '-=0.8');

    tl.to('.success-banner', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2');

    tl.to({}, { duration: 3.5 });

    tl.to('.box-card, .success-banner', {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-between"
      aria-label="Animación de inventario: cajas desordenadas que se organizan solas en una cuadrícula limpia"
    >
      <h3 className="w-full text-xs font-medium uppercase tracking-widest text-foreground-muted/80 select-none">
        Inventario Organizado
      </h3>

      <div
        className="grid grid-cols-3 gap-4 mb-2"
        aria-hidden="true"
      >
        {BOXES.map((box) => (
          <div
            key={box.label}
            className="box-card flex flex-col items-center gap-2 p-2 relative bg-foreground-muted/5 border border-foreground-muted/6"
          >
            <div className={`w-20 h-20 flex items-center justify-center relative ${box.color}`}>
              <div className={`w-10 h-10 rounded-lg shadow-inner ${box.color}`} />
              <div className={`stock-badge absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full text-xs font-semibold text-foreground-muted shadow-md ${box.color}`}>
                {box.count}
              </div>
            </div>

            <span className="text-xs font-medium text-foreground-muted/80 truncate w-16 text-center select-none">
              {box.label}
            </span>
          </div>
        ))}
      </div>

      <p className="success-banner px-4 py-1.5 rounded-full text-xs font-medium text-amber-300 border border-amber-300/10 select-none bg-amber-500/10">
        ✓ Todo el stock al día
      </p>


      <p className="text-center text-xs font-medium text-foreground-muted/60 select-none">
        Tu stock se acomoda automáticamente, sin hojas sueltas.
      </p>
    </div>
  );
}
