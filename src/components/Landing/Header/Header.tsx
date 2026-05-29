"use client";

import { useState, useEffect } from 'react';
import Container from '../../ui/Container';
import Logo from '../../ui/Logo';
import Nav, { NavMobile } from './ui/Nav';
import Button from '../../ui/Button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Características', href: '#features' },
    { name: 'Precios', href: '#pricing' }
  ];

  return (
    <header 
      className={cn(
        "h-20 flex justify-center items-center sticky top-0 w-full z-50 transition-all duration-500",
        isScrolled 
          ? "bg-background/70 backdrop-blur-2xl border-b border-foreground/10 shadow-lg shadow-black/20" 
          : "bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between">
        <Logo type="light" />

        <div className="hidden md:block" aria-label="Main navigation">
          <Nav navLinks={navLinks} />
        </div>

        <Button
          href="/register"
          variant="contrast"
          className="hidden md:flex px-8 py-2.5 font-bold tracking-widest uppercase text-xs hover:scale-105 transition-transform"
          aria-label="Comenzar registro"
        >
          Comenzar
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
