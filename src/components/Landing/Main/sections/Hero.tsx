'use client';

import { useRef } from 'react';
import Header from '@/components/Landing/Main/ui/Header';
import Demo from '@/components/Landing/Main/ui/Demo';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.timeline()
      .fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' })
      .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8')
      .fromTo('.hero-buttons', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo('.hero-demo-card', { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out' }, '-=0.4');
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col items-center min-h-screen justify-center bg-organic px-4 pt-20 lg:pt-32 pb-20 overflow-hidden"
    >
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] pointer-events-none" />
      
      <div className="container relative z-10 w-full max-w-6xl flex flex-col items-center text-center">
        <Header />
        <Demo />
      </div>
    </section>
  );
}