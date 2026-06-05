"use client";

import { useRef, useState } from 'react';
import { ShoppingBag, CreditCard, BarChart2, ShieldCheck, Plus, Search } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../../../ui/Container';
import gsap from 'gsap';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TheControl() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'sales' | 'debts' | 'metrics'>('sales');

  useGSAP(() => {
    gsap.fromTo('.control-header',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 78%' }
      }
    );

    gsap.fromTo('.control-text-item',
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.control-text-container', start: 'top 78%' }
      }
    );

    gsap.fromTo('.control-mockup',
      { opacity: 0, scale: 0.95, y: 50 },
      {
        opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: '.control-mockup-container', start: 'top 75%' }
      }
    );

    ScrollTrigger.create({
      trigger: '.control-mockup',
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo('.mockup-stat-card',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out', delay: 0.4 }
        );
      }
    });
  }, { scope: containerRef });

  const features = [
    {
      tab: 'sales' as const,
      icon: <ShoppingBag size={20} />,
      label: 'Ventas en 3 Clics',
      desc: 'Busca la prenda por talla y color, agrégala y regístrala al instante. Cero fricción para ti y tu equipo.'
    },
    {
      tab: 'debts' as const,
      icon: <CreditCard size={20} />,
      label: 'Control de Fiados',
      desc: 'Registra deudas asociadas al cliente y guarda un historial inalterable de abonos. Cuentas claras, clientes felices.'
    },
    {
      tab: 'metrics' as const,
      icon: <BarChart2 size={20} />,
      label: 'Métricas en Tiempo Real',
      desc: 'Sigue el rendimiento de tu negocio, las ventas totales y deudas pendientes en gráficos minimalistas y útiles.'
    },
  ]


  return (
    <section
      ref={containerRef}
      id="control"
      className="py-28 md:py-36 bg-background relative overflow-hidden border-t border-primary/5"
      aria-labelledby="control-heading"
    >
      <div
        className="absolute top-[10%] right-[-10%] w-[600px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(62,207,178,0.04) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(62,207,178,0.025) 0%, transparent 70%)' }}
      />

      <Container className="max-w-6xl relative z-10">
        <header className="control-header text-center max-w-3xl mx-auto mb-20 space-y-5" id="control-heading">
          <p className='w-fit mx-auto px-4 py-2 border border-accent/50 bg-accent/10 text-accent rounded-full'>
            El software del local
          </p>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            Control total en una sola pantalla
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
            Diseñamos una interfaz limpia y de alto rendimiento que elimina el desorden operativo. Todo lo que necesitas para vender y cuadrar caja en un solo panel mate.
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <article className="control-text-container lg:col-span-5 space-y-8 order-2 lg:order-1">
            <header className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Diseñado para la velocidad
              </h3>
              <p className="text-md text-foreground-muted leading-relaxed max-w-md">
                Tus clientes no quieren hacer filas largas. KODA reduce el tiempo de venta y la carga de trabajo administrativo de inmediato.
              </p>
            </header>

            <ul className="space-y-3">
              {features.map((item) => (
                <li
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`control-text-item p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${activeTab === item.tab
                    ? 'bg-background-elevated/60 border-accent/20'
                    : 'bg-transparent border-transparent hover:bg-primary/5'
                    }`}
                >
                  <div className="flex gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${activeTab === item.tab ? 'bg-accent/12 text-accent' : 'bg-primary/2 text-foreground-muted'
                      }`}>
                      {item.icon}
                    </span>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-primary uppercase tracking-wider">
                        {item.label}
                      </h4>
                      <p className="text-sm text-foreground-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </li>
              ))}

            </ul>
          </article>

          <article className="control-mockup-container lg:col-span-7 order-1 lg:order-2">
            <div className="control-mockup bg-background-elevated border border-primary/5 rounded-2xl overflow-hidden shadow-2xl relative w-full aspect-4/3 flex flex-col">

              <header className="h-10 bg-background border-b border-primary/5 px-4 flex items-center justify-between text-xs tracking-wider font-medium text-foreground-muted select-none">
                <ul className="flex items-center gap-5">
                  <span className="text-accent font-bold tracking-widest">
                    KODA
                  </span>

                  <li className={activeTab === 'sales' ? 'text-white' : ''}>Ventas</li>
                  <li className={activeTab === 'debts' ? 'text-white' : ''}>Fiados</li>
                  <li className={activeTab === 'metrics' ? 'text-white' : ''}>Métricas</li>
                </ul>

                <div className="flex items-center gap-3">
                  <div className="w-40 h-6 rounded-md bg-primary/3 border border-primary/6 flex items-center px-2 text-[11px] gap-2">
                    <Search size={12} /> Buscar
                  </div>
                  <button className="h-6 px-2 bg-accent/15 border border-accent/25 text-accent rounded font-bold text-[11px] flex items-center gap-2">
                    <Plus size={12} /> POS
                  </button>
                </div>
              </header>

              <div className="flex-1 p-4 grid grid-cols-12 gap-3 overflow-hidden select-none">
                <div className="col-span-5 flex flex-col gap-3 justify-between">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="mockup-stat-card bg-background-elevated border border-primary/5 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">
                          Abonos al día
                        </p>
                        <p className="text-lg font-bold text-primary leading-none mt-1">
                          78%
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-full border-2 border-accent border-r-transparent flex items-center justify-center text-lg font-bold text-accent">
                        78
                      </div>
                    </div>

                    <div className="mockup-stat-card bg-background-elevated border border-primary/5 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">Caja de hoy</p>
                        <p className="text-lg font-bold text-accent leading-none mt-1">
                          {activeTab === 'sales' ? '$ 342K' : activeTab === 'debts' ? '$ 105K' : '$ 420K'}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                        <ShoppingBag size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/10 border border-accent-hover/30 rounded-xl p-3 flex flex-col justify-between flex-1">
                    <div>
                      <p className="text-xs font-bold text-primary leading-tight mt-1">
                        {activeTab === 'sales' ? 'Nueva Venta' : activeTab === 'debts' ? 'Abono Fiado' : 'Dashboard'}
                      </p>
                      <div className="mt-2 space-y-1">
                        <div className="text-[11px] text-primary/60 flex justify-between font-mono">
                          <span>Jean Cargo Talla 32</span>
                          <span>$ 85.000</span>
                        </div>
                        <div className="text-[11px] text-primary/60 flex justify-between font-mono">
                          <span>Blusa Lino Beige</span>
                          <span>$ 65.000</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-accent-hover/30 flex items-center justify-between text-[11px] text-primary/90">
                      <span className="text-[11px] text-primary/60 flex justify-between font-mono">Total: $ 150.000</span>
                      <div className="flex items-center gap-1.5 bg-primary/15 border border-primary/20 px-2 py-0.5 rounded text-primary font-bold cursor-pointer hover:bg-primary/25">
                        Cobrar
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-7 bg-background-elevated border border-primary/5 rounded-xl p-3.5 flex flex-col justify-between">

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">
                        {activeTab === 'sales' ? 'Tendencia de hoy' : activeTab === 'debts' ? 'Deudores recientes' : 'Resumen mensual'}
                      </p>
                      <p className="text-xs font-bold text-primary">
                        {activeTab === 'sales' ? 'Historial por horas' : activeTab === 'debts' ? 'Fiados pendientes' : 'Ganancia neta'}
                      </p>
                    </div>
                    <span className="text-[10px] text-foreground-muted uppercase tracking-wider border border-primary/6 bg-primary/2 px-2 py-1 rounded font-mono">
                      {activeTab === 'sales' ? 'Venta POS' : activeTab === 'debts' ? 'Mora' : 'Rendimiento'}
                    </span>
                  </div>

                  {activeTab === 'sales' && (
                    <div className="flex-1 flex items-end justify-between gap-1.5 h-24 pt-4 px-2">
                      {[40, 60, 30, 95, 50, 80, 45].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t transition-colors ${i === 3 ? 'bg-accent hover:bg-accent-hover' : 'bg-primary/5 hover:bg-primary/8'}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  )}

                  {activeTab === 'debts' && (
                    <div className="flex-1 flex flex-col justify-center gap-2 py-2">
                      {[
                        { name: 'Don Pedro', amount: '$ 85.000', status: 'Mora', red: true },
                        { name: 'Maria Fernanda', amount: '$ 32.000', status: 'Abonado', red: false },
                        { name: 'Carlos Andres', amount: '$ 60.000', status: 'Pendiente', red: true },
                      ].map((d, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-1.5 rounded-md bg-primary/2 border border-primary/5 text-[10px]"
                        >
                          <span className="text-primary/80 font-medium">{d.name}</span>
                          <span className={`font-bold font-mono ${d.red ? 'text-accent-red' : 'text-accent'}`}>
                            {d.amount} ({d.status})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'metrics' && (
                    <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
                      <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest">Rendimiento mensual</p>
                      <p className="text-xl font-bold text-accent mt-1">$ 1.840.000</p>
                      <span className="text-[9px] text-accent/80 font-bold bg-accent/10 px-2 py-0.5 rounded mt-2 border border-accent/20">
                        + 12.4% vs Mes Anterior
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
