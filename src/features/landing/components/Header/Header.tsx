"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import Logo from '@/shared/components/Logo';
import Button from '@/shared/components/Button';
import Nav from '@/features/landing/components/Header/ui/Menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Problema', href: '#problem' },
    { name: 'Migración', href: '#migration' },
    { name: 'Funcionalidades', href: '#features' },
    { name: 'Ventas WhatsApp', href: '#whatsapp-sales' },
    { name: 'Planes', href: '#plans' }
  ];

  return (
    <header className="h-16 flex justify-center items-center w-full transition-all duration-500">
      <div className="flex items-center justify-between w-full h-full">
        <div className="w-[70%] h-16 bg-transparent flex items-center px-40 py-4">
          <Logo />
        </div>

        <div className="w-[30%] h-16 bg-primary flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen
              ? <X size={24} className="text-foreground-muted" aria-label="Cerrar menú" />
              : <Menu size={24} className="text-foreground-muted" aria-label="Abrir menú" />
            }
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú móvil">
          <Nav
            navLinks={navLinks}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      )}
    </header>
  );
}
