"use client";

import { useRef } from 'react';
import { BookOpen, UploadCloud, Users } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../../../ui/Container';
import gsap from 'gsap';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Accompaniment() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: 'top 78%' }
    });

    tl.fromTo('.acc-header',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
    )
      .fromTo('.acc-step-item',
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' },
        '-=0.5'
      );
  }, { scope: containerRef });

  const steps = [
    {
      icon: <BookOpen className="text-accent" size={20} />,
      title: "Tu historial está a salvo",
      description: "Nos entregas tus registros actuales (cuaderno o excel) y nosotros nos encargamos de estructurarlos."
    },
    {
      icon: <UploadCloud className="text-[#3A86FF]" size={20} />,
      title: "Migración completa",
      description: "Subimos tu inventario, clientes y fiados a tu nueva cuenta de KODA sin que pierdas un solo dato."
    },
    {
      icon: <Users className="text-accent" size={20} />,
      title: "Capacitación rápida",
      description: "Te enseñamos a ti y a tus vendedores cómo usar el sistema en menos de 15 minutos."
    }
  ];

  return (
    <section
      id="transicion"
      ref={containerRef}
      className="py-20 md:py-30 relative overflow-x-hidden bg-background border-t border-primary/5"
      aria-labelledby="acc-heading"
    >
      <div
        className="absolute top-[20%] right-[10%] w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(62,207,178,0.04) 0%, transparent 70%)' }}
      />

      <Container className="relative z-10 max-w-6xl mx-auto">
        <header className="acc-header text-center max-w-3xl mx-auto mb-20 space-y-5" id="acc-heading">
          <p className='w-fit mx-auto px-4 py-2 border border-accent/50 bg-accent/10 text-accent rounded-full'>
            El acompañamiento
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-primary leading-[1.05]">
            Del cuaderno a lo digital, sin estrés.
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
            Sabemos que dar el primer paso da vértigo. Por eso no te dejamos solo. Te ayudamos a migrar tus datos históricos para que tu negocio continúe vendiendo desde el primer minuto.
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <li
              key={index}
              className="acc-step-item bg-background-elevated/60 border border-primary/5 p-6 rounded-2xl flex flex-col gap-6 hover:border-primary/8 hover:bg-background-elevated transition-all duration-400 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/5 border border-accent/8 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors duration-300">
                {step.icon}
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
