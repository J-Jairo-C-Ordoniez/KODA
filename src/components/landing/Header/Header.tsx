"use client";

import { useState, useEffect } from 'react';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import Nav, { NavMobile } from './ui/Nav';
import Button from '../ui/Button';
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
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-foreground/5 shadow-sm' : 'bg-transparent py-6'}`}>
      <Container className="flex items-center justify-between">
        <Logo type="light" />

        <Nav navLinks={navLinks} />

        <div className="hidden md:flex items-center gap-6">
          <Button
            href="/login"
            variant="ghost"
            className="px-4 font-bold tracking-tight text-primary/80 hover:text-navy hover:scale-105 transition-all"
          >
            Ingresar
          </Button>
          <Button
            href="/register"
            variant="accent"
            className="px-8 font-bold tracking-tight shadow-navy/20 hover:shadow-navy/40"
          >
            Comenzar
          </Button>
        </div>

        <Button
          variant="ambulance"
          className="md:hidden p-2 rounded-full border-foreground/5 hover:bg-foreground/5"
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
