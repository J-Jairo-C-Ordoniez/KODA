"use client";

import { useState, useRef } from 'react';
import Logo from '../../ui/Logo';
import Button from '../../ui/Button';
import Container from '../../ui/Container';
import gsap from 'gsap';
import Nav, { NavMobile } from './ui/Nav';
import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
    );
  }, { scope: headerRef });

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Transición', href: '#transicion' },
    { name: 'Control', href: '#control' },
    { name: 'Catálogo', href: '#catalogo' },
    { name: 'Precios', href: '#pricing' }
  ];

  return (
    <header
      ref={headerRef}
      className={cn("h-16 flex justify-center items-center sticky top-0 w-full z-50 transition-all duration-500 bg-transparent")}
    >
      <Container className="flex items-center justify-between gap-8">
        <Logo type="light" />
        <Nav navLinks={navLinks} />

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Button
            href="/login"
            variant="ghost"
          >
            Entrar
          </Button>
          <Button
            href="/register"
            variant="contrast"
          >
            Comenzar
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen
            ? <X
              size={24}
              className="text-foreground"
              aria-label="Cerrar menú"
            />
            : <Menu
              size={24}
              className="text-foreground-muted"
              aria-label="Abrir menú"
            />
          }
        </Button>
      </Container>

      {isMenuOpen && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú móvil">
          <NavMobile
            navLinks={navLinks}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      )}
    </header>
  );
}
