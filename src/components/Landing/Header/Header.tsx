"use client";

import { useState, useEffect } from 'react';
import Container from '../../ui/Container';
import Logo from '../../ui/Logo';
import Nav, { NavMobile } from './ui/Nav';
import Button from '../../ui/Button';
import { Menu, X } from 'lucide-react';

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
    <header className={`h-20 flex justify-center items-center sticky top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-foreground/5 shadow-sm' : 'bg-transparent'}`}>
      <Container className="flex items-center justify-between">
        <Logo type="light" />

        <Nav navLinks={navLinks} />

        <Button
          href="/register"
          variant="contrast"
          className="hidden md:flex px-8 py-2.5 font-bold tracking-widest uppercase text-xs"
        >
          Comenzar
        </Button>

        <Button
          variant="ambulance"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </Container>

      {isMenuOpen && (
        <NavMobile
          navLinks={navLinks}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
    </header>
  );
};
