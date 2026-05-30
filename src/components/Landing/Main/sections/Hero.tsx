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
      .fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out' })
      .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
      .fromTo('.hero-buttons', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero-demo-card', { opacity: 0, y: 50, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power4.out' }, '-=0.4');
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative bg-grain bg-organic w-full flex flex-col items-center min-h-screen justify-center px-4 pt-20 lg:pt-32 pb-20 overflow-hidden"
    >
      {/* Soft ambient orbs — depth without noise */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-contrast/[0.07] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-accent/[0.09] blur-[100px] pointer-events-none" />

      <div className="container relative z-10 w-full max-w-6xl flex flex-col items-center text-center">
        <Header />
        <Demo />
      </div>
    </section>
  );
}