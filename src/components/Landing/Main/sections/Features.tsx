'use client';

import { useRef } from 'react';
import { ShoppingCart, UserCheck, BarChart3, Cloud } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardFeature from '@/components/Landing/Main/ui/CardFeature';
import gsap from 'gsap';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: 'Inventario con Variantes',
      description: 'Stock real, manejo avanzado de variantes (tallas y colores) y alertas de escasez automáticas.',
      icon: <ShoppingCart size={40} className="text-contrast" />,
      color: 'bg-background-elevated/40 backdrop-blur-xl border border-foreground/10',
      textColor: 'text-primary',
      subTextColor: 'text-foreground-muted',
      gradient: 'bg-contrast/20'
    },
    {
      title: 'Control de Fiados Exacto',
      description: 'Sabe quién debe, cuánto debe y registra abonos con fechas. Cero libretas perdidas.',
      icon: <UserCheck size={40} className="text-primary" />,
      color: 'bg-background-elevated/40 backdrop-blur-xl border border-foreground/10',
      textColor: 'text-primary',
      subTextColor: 'text-foreground-muted',
      gradient: 'bg-primary/10'
    },
    {
      title: 'Cuentas Claras',
      description: 'Métricas de rentabilidad en tiempo real. Toma decisiones basadas en datos financieros reales.',
      icon: <BarChart3 size={40} className="text-navy" />,
      color: 'bg-background-elevated/40 backdrop-blur-xl border border-foreground/10',
      textColor: 'text-primary',
      subTextColor: 'text-foreground-muted',
      gradient: 'bg-navy/20'
    },
    {
      title: 'Auditoría de Empleados',
      description: 'El sistema sabe exactamente quién registró cada venta, quién recibió cada abono y a qué hora.',
      icon: <Cloud size={40} className="text-contrast" />,
      color: 'bg-background-elevated/40 backdrop-blur-xl border border-foreground/10',
      textColor: 'text-primary',
      subTextColor: 'text-foreground-muted',
      gradient: 'bg-contrast/10'
    }
  ];

  useGSAP(() => {
    gsap.fromTo('.feature-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.feature-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
          trigger: '.feature-cards-container',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="features"
      ref={containerRef}
      className="py-16 md:py-20 bg-background relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-contrast/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="max-w-7xl container mx-auto px-6 relative z-10">
        <header className="feature-header text-center mb-16 md:mb-20 opacity-0">
          <h2 className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-[1.1] md:leading-[0.9] max-w-4xl mx-auto">
            El poder detrás <br className="hidden md:block" />
            del <span className="text-contrast">mostrador.</span>
          </h2>

          <p className="text-foreground-muted text-lg md:text-2xl font-medium max-w-2xl leading-relaxed mx-auto">
            Mientras tú atiendes, KODA controla el inventario, los fiados y el rendimiento de tus empleados. Todo en silencio, todo en tiempo real.
          </p>
        </header>

        <div className="feature-cards-container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <CardFeature
              key={i}
              feature={f}
            />
          ))}
        </div>
      </div>
    </section>
  );
}