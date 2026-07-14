"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function SlideCatalog() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    tl.set('.catalog-garment', { left: '10%', scale: 0.7, opacity: 0 });
    tl.set('.catalog-badge', { scale: 0, opacity: 0 });
    tl.set('.catalog-bubble', { y: 25, opacity: 0 });

    tl.to('.catalog-garment', {
      left: '75%',
      opacity: 1,
      scale: 1,
      duration: 2.2,
      ease: 'power1.inOut',
    }, '+=0.5');

    tl.to('.catalog-garment', {
      scale: 0.5,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    });

    tl.to('.catalog-badge', {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(1.8)',
    }, '-=0.1');

    tl.to('.catalog-bubble', {
      y: -200,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, '+=0.2');

    tl.to({}, { duration: 3.5 });

    tl.to('.catalog-badge, .catalog-bubble', {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: 'power2.in',
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-between"
      aria-label="Animación de catálogo: una prenda viaja del catálogo web al teléfono del local por WhatsApp"
    >
      <h3 className="w-full text-xs font-medium uppercase tracking-widest text-foreground-muted/80 select-none">
        Inventario Organizado
      </h3>

      <div
        className="flex items-center justify-between w-full px-6 gap-2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="w-16 h-16 flex items-center justify-center border border-foreground-muted/6 bg-foreground-muted/5">
            <svg
              width="40" height="40" viewBox="0 0 28 28" fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="5" width="25" height="18" rx="1.5" stroke="rgba(250,250,249,0.35)" strokeWidth="1.5" fill="rgba(250,250,249,0.05)" />
              <line x1="3" y1="19" x2="28" y2="19" stroke="rgba(250,250,249,0.35)" strokeWidth="1" />
              <rect x="6" y="8" width="6" height="6" rx="0.5" fill="rgba(201,150,58,0.5)" />
              <rect x="15" y="8" width="6" height="6" rx="0.5" fill="rgba(250,250,249,0.15)" />
            </svg>
          </div>
          <span className="text-xs font-medium text-foreground-muted/80 tracking-widest select-none">Catálogo Web</span>
        </div>

        <div className="relative flex-1 h-16 mx-2 overflow-visible">
          <div
            className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(250,250,249,0.1) 60%, transparent 40%)',
              backgroundSize: '10px 1px',
              backgroundRepeat: 'repeat-x',
            }}
          />

          <div className="catalog-garment absolute top-1/2 -translate-y-1/2" style={{ left: '10%' }}>
            <svg
              width="30" height="30" viewBox="0 0 26 26" fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 6 C13 4.3 14.3 3 16 3"
                stroke="rgba(201,150,58,0.9)" strokeWidth="1.8" strokeLinecap="round" fill="none"
              />
              <path
                d="M13 6 L3 16 H23 L13 6"
                stroke="rgba(201,150,58,0.9)" strokeWidth="1.5" fill="rgba(201,150,58,0.15)" strokeLinejoin="round"
              />
              <rect x="5" y="16" width="16" height="6" rx="1.5" fill="rgba(201,150,58,0.2)" stroke="rgba(201,150,58,0.5)" strokeWidth="1" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 shrink-0 relative">
          <div className="catalog-badge absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full z-10 flex items-center justify-center text-xs font-bold text-foreground-muted/80 shadow-lg select-none bg-green-500/20"
          >
            1
          </div>

          <div
            className="w-16 h-16 flex items-center justify-center bg-green-500/5 border border-green-500/6"
          >
            <svg
              width="24" height="32" viewBox="0 0 22 28" fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="1" width="20" height="26" rx="3" stroke="rgba(37,211,102,0.3)" strokeWidth="1.5" fill="rgba(37,211,102,0.05)" />
              <circle cx="11" cy="12" r="5" fill="rgba(37,211,102,0.15)" />
              <path d="M9 14 L8 16 L10 15.5" stroke="rgba(37,211,102,0.4)" strokeWidth="1" fill="none" />
              <circle cx="11" cy="24" r="1.5" fill="rgba(250,250,249,0.15)" />
            </svg>
          </div>
          <span className="text-xs font-medium text-foreground-muted/80 tracking-widest select-none"> WhatsApp</span>
        </div>
      </div>

      <div
        className="catalog-bubble px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] shadow-md select-none bg-green-500/5 border border-green-500/6"
        aria-hidden="true"
      >
        <p className="text-xs font-medium text-emerald-300 leading-relaxed">
          "Hola, vi la camiseta en tu catálogo ¿tienes disponible en M?"
        </p>
      </div>

      <p className="text-center text-xs font-medium text-foreground-muted/60 select-none">
        Tu inventario ya es tu catálogo web, sin trabajo extra.
      </p>
    </div>
  );
}
