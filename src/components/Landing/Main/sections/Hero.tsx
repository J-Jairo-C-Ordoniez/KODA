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
      className="relative w-full flex flex-col items-center bg-background px-4 pt-32 lg:pt-48 pb-24 overflow-hidden"
    >
      <div className="container relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
        <Header />
        <Demo />
      </div>
    </section>
  );
}