"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { List, X } from '@phosphor-icons/react';

import Logo from '@/shared/components/Logo';
import Button from '@/shared/components/Button';
import Nav from '@/features/landing/components/Header/ui/Menu';

gsap.registerPlugin(useGSAP);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 1 },
    });

    tl
      .from('.logo', { autoAlpha: 0, x: -60, scale: 0 })
      .from('.menu-content', { autoAlpha: 0, x: 60, scale: 0 })
      .from('.menu-button', { autoAlpha: 0, scale: 0 }, '-=0.5');
  }, { scope: containerRef });

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Problema', href: '#problem' },
    { name: 'Migración', href: '#migration' },
    { name: 'Funcionalidades', href: '#features' },
    { name: 'Ventas WhatsApp', href: '#whatsapp-sales' },
    { name: 'Planes', href: '#plans' }
  ];

  return (
    <header
      ref={containerRef}
      className="relative z-1001 flex w-full items-center justify-center px-4 sm:px-8 pt-6 pb-4 md:pt-10 md:pb-6 bg-transparent"
    >
      <div className="relative z-1002 flex w-full items-center justify-between gap-4 lg:w-auto lg:justify-center lg:gap-6">
        <div className="logo flex shrink-0 items-center drop-shadow-md">
          <Logo />
        </div>

        <div className="menu-content flex h-14 md:h-15 items-center rounded-full gap-1 md:gap-2 bg-primary p-1.5 shadow-lg">
          <Button
            variant="primary"
            className="menu-button h-full px-4 md:px-6 bg-transparent hover:bg-background/20 rounded-l-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen
              ? <X size={20} weight="bold" className="text-background md:w-6 md:h-6" aria-label="Cerrar menú" />
              : <List size={20} weight="bold" className="text-background md:w-6 md:h-6" aria-label="Abrir menú" />
            }
            <span className="text-background md:text-sm font-semibold tracking-wide">Menú</span>
          </Button>

          <Button
            href="/auth/register"
            variant="secondary"
            className="menu-button h-full px-6 md:px-8 bg-background rounded-full"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            Comenzar
          </Button>
        </div>
      </div>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú móvil"
        className={`fixed inset-0 z-900 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <Nav
          navLinks={navLinks}
          setIsMenuOpen={setIsMenuOpen}
          isOpen={isMenuOpen}
        />
      </div>
    </header>
  );
}
