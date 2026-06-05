"use client";

import { useRef } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../../ui/Button';
import Container from '../../../ui/Container';
import gsap from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl
      .fromTo('.hero-badge',
        { opacity: 0, y: -16, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)' }
      )
      .fromTo('.hero-line-1',
        { opacity: 0, y: 40, skewX: -2 },
        { opacity: 1, y: 0, skewX: 0, duration: 0.9, ease: 'power4.out' },
        '-=0.4'
      )
      .fromTo('.hero-line-2',
        { opacity: 0, y: 40, skewX: -2 },
        { opacity: 1, y: 0, skewX: 0, duration: 0.9, ease: 'power4.out' },
        '-=0.65'
      )
      .fromTo('.hero-desc',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.55'
      )
      .fromTo('.hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 0.6, duration: 0.5 },
        '-=0.2'
      );

    gsap.to('.hero-bg-text', {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      }
    });

    gsap.to('.hero-orb-top', {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      }
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative min-h-[96vh] flex flex-col items-center justify-center px-6 overflow-hidden bg-background"
      aria-label="Sección de inicio"
    >
      <div
        className="hero-orb-top absolute top-0 right-0 w-[70vw] h-[70vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(62,207,178,0.09) 0%, transparent 65%)',
        }}
      />

      <div className="absolute -bottom-32 left-[8%] w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.012) 0%, transparent 70%)' }}
      />

      <div className="hero-bg-text absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
        <span className="text-[30vw] font-black tracking-tighter leading-none"
          style={{
            background: 'linear-gradient(180deg, rgba(237,236,234,0.022) 0%, transparent 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'blur(0.5px)',
          }}
        >
          KODA
        </span>
      </div>

      <Container className="flex flex-col items-center text-center relative z-10 space-y-9">
        <address className="hero-badge flex items-center gap-2 px-4 py-2 border border-accent/50 bg-accent/10 text-accent rounded-full">
          <MapPin size={20} />
          <span>La Unión, Nariño</span>
        </address>

        <header className="space-y-2 overflow-hidden">
          <h1 className="hero-line-1 text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-primary leading-none">
            El fin de la libreta.
          </h1>
          <p className="hero-line-2 text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-none text-foreground-muted">
            El inicio del control.
          </p>
        </header>

        <p className="hero-desc max-w-lg text-foreground-muted text-base sm:text-lg md:text-xl font-normal leading-relaxed">
          <strong className='text-primary'>KODA </strong>
          Transforma la gestión de tu negocio. Automatiza tu stock, lleva el control exacto de tus fiados y vende por WhatsApp sin esfuerzo.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <Button
            href="/register"
            variant="contrast"
            className='py-4 px-6'
          >
            Comenzar
          </Button>

          <Button
            href="#transicion"
            variant="ghost"
            className='py-4 px-6'
          >
            Conoce la historia
          </Button>
        </div>

      </Container>

      <div className="hero-scroll-indicator absolute bottom-10 flex flex-col items-center gap-2 opacity-50 z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-foreground-muted">Desliza</span>
        <ChevronDown size={20} className="text-foreground-muted animate-bounce" />
      </div>
    </section>
  );
}