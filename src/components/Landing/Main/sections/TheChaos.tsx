"use client";

import { useRef } from 'react';
import { AlertCircle, FileText, TrendingDown, Clock } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Container from "../../../ui/Container"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TheChaos() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.chaos-title',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }
      }
    );

    gsap.fromTo('.chaos-grid-item',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: '.chaos-grid-container', start: 'top 78%' }
      }
    );

    ScrollTrigger.create({
      trigger: '.chaos-notebook',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.chaos-notebook',
          { x: 0 },
          {
            x: 4, duration: 0.07, repeat: 5, yoyo: true,
            ease: 'rough({ strength: 2, points: 10 })',
            onComplete: () => gsap.set('.chaos-notebook', { x: 0 })
          }
        );
      }
    });
  }, { scope: sectionRef });

  const points = [
    {
      icon: <TrendingDown size={18} />,
      title: 'Fugas de Dinero',
      desc: '¿Cuánto se ganó realmente esta semana? Las deudas olvidadas en hojas sueltas son pérdidas invisibles que restan rentabilidad.'
    },
    {
      icon: <Clock size={18} />,
      title: 'Desorden Operativo',
      desc: 'Tener una libreta para ventas, otra para fiados y otra para inventario rompe la integridad del negocio. El control manual no escala.'
    },
    {
      icon: <AlertCircle size={18} />,
      title: 'Falta de decisiones',
      desc: 'Sin reportes claros de stock ni alertas de cobro, es imposible saber con exactitud qué comprar o a quién cobrar a tiempo.'
    },
  ]


  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-background overflow-hidden"
      aria-labelledby="chaos-heading"
    >
      <div
        className="absolute top-[30%] left-[5%] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,58,58,0.06) 0%, transparent 70%)' }}
      />

      <Container className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="chaos-title text-center max-w-2xl mx-auto mb-20 space-y-5" id="chaos-heading">
          <p className="w-fit mx-auto px-4 py-2 border border-accent-red/50 bg-accent-red/10 text-accent-red rounded-full">
            El factor humano
          </p>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-primary leading-[1.05]">
            El estrés de la libreta física
          </h2>

          <p className="text-foreground-muted text-base sm:text-lg leading-relaxed">
            La gestión manual funciona al principio, pero el crecimiento trae incertidumbre. Cuando no tienes datos claros, sientes que pierdes el control sobre tu tiempo y tu dinero.
          </p>
        </header>

        <div className="chaos-grid-container grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          <ul className="lg:col-span-6 flex flex-col justify-between gap-5">
            {points.map((item, i) => (
              <li
                key={i}
                className="chaos-grid-item bg-background-elevated/60 border border-primary/5 p-6 rounded-2xl flex gap-5 hover:border-primary/8 hover:bg-background-elevated transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {item.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider">{item.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{item.desc}</p>
                </div>
              </li >
            ))}
          </ul>

          <article className="chaos-notebook chaos-grid-item lg:col-span-6 bg-background-elevated/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[340px]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[22px_22px] pointer-events-none opacity-25" />

            <header className="flex items-center justify-between pb-6 border-b border-white/5 relative z-10">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground-muted">
                <FileText size={20} />
                <span>Libreta de cuentas</span>
              </div>

              <span className="text-xs text-accent-red font-bold uppercase tracking-widest bg-accent-red/10 px-2.5 py-1 rounded-full border border-accent-red/20">
                Incertidumbre
              </span>
            </header>

            <ul className="py-8 space-y-5 relative z-10">
              {[
                { label: 'Chaqueta cuero (¿vendida?)', value: '$ 120.000', crossed: true },
                { label: 'Abono Don Pedro (¿cuándo pagó?)', value: '$ ???...', crossed: false },
                { label: 'Fiado Maria (talla M color negro?)', value: '$ 85.000', crossed: false },
              ].map((line, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center text-sm font-mono text-foreground-muted border-b border-dashed border-white/5 pb-2 last:border-b-0"
                >
                  <span>{line.label}</span>
                  <span className={line.crossed ? 'line-through text-foreground-muted/50' : ''}>
                    {line.value}
                  </span>
                </li>
              ))}

              <li className="flex justify-between items-center text-sm font-bold text-accent-red font-mono pt-2">
                <span>Total pendiente estimado</span>
                <span>$ 205.000 ???</span>
              </li>
            </ul>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
              <span className="text-xs uppercase font-bold tracking-widest text-foreground-muted">
                Pérdida de control
              </span>
              <span className="text-xs uppercase font-bold tracking-widest text-accent-red">
                Tiende al error humano
              </span>
            </div>
          </article>

        </div>
      </Container>
    </section>
  );
}
