'use client';

import { useRef } from 'react';
import { BookOpen, UploadCloud, Users } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardAccompanimentStep from '@/components/Landing/Main/ui/CardAccompanimentStep';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Accompaniment() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

    tl.fromTo('.acc-header', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.acc-step', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.4'
      );
  }, { scope: containerRef });

  const steps = [
    {
      icon: <BookOpen className="text-contrast" size={26} />,
      title: "1. Tu historial está a salvo",
      description: "Nos entregas tus registros actuales (cuaderno o excel) y nosotros nos encargamos de estructurarlos."
    },
    {
      icon: <UploadCloud className="text-navy" size={26} />,
      title: "2. Migración completa",
      description: "Subimos tu inventario, clientes y fiados a tu nueva cuenta de KODA sin que pierdas un solo dato."
    },
    {
      icon: <Users className="text-primary" size={26} />,
      title: "3. Capacitación rápida",
      description: "Te enseñamos a ti y a tus vendedores cómo usar el sistema en menos de 15 minutos."
    }
  ];

  return (
    <section 
      id="acompanamiento" 
      ref={containerRef}
      className="py-16 md:py-20 relative overflow-hidden bg-background"
    >      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <header className="acc-header text-center max-w-3xl mx-auto mb-16 md:mb-20">          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-tight tracking-tighter mb-6">
            Del cuaderno a lo digital, <br className="hidden md:block" />
            <span className="text-contrast">sin estrés.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-foreground-muted font-medium leading-relaxed">
            Sabemos que el primer paso es el más difícil. Por eso en KODA no te dejamos solo. Te acompañamos en toda la transición para que tu negocio no se detenga ni un segundo.
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {steps.map((step, index) => (
            <li key={index}>
              <CardAccompanimentStep step={step} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
