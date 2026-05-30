import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

export default function Demo() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.matchMedia();
        
        ctx.add('(min-width: 1px)', () => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
            
            // Initial state
            gsap.set('.demo-sale', { opacity: 0, y: 20, scale: 0.95 });
            gsap.set('.demo-total', { innerText: 0 });

            // Animate sales coming in
            tl.to('.demo-sale-1', { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' })
              .to('.demo-total', { innerText: 45000, duration: 0.6, snap: { innerText: 1000 }, ease: 'power2.out' }, '<')
              .to('.demo-sale-2', { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '+=0.5')
              .to('.demo-total', { innerText: 130000, duration: 0.6, snap: { innerText: 1000 }, ease: 'power2.out' }, '<')
              .to('.demo-sale-3', { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '+=0.5')
              .to('.demo-total', { innerText: 202000, duration: 0.6, snap: { innerText: 1000 }, ease: 'power2.out' }, '<')
              // Fade out
              .to('.demo-wrapper', { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '+=2')
              .set('.demo-sale', { opacity: 0, y: 20, scale: 0.95 })
              .set('.demo-total', { innerText: 0 })
              .to('.demo-wrapper', { opacity: 1, duration: 0.5 });
        });

        return () => ctx.revert();
    }, []);

    return (
        <article ref={containerRef} className="hero-demo-card demo-wrapper relative w-full max-w-lg mx-auto rounded-3xl bg-background-elevated/40 backdrop-blur-xl border border-foreground/10 ring-1 ring-contrast/10 overflow-hidden shadow-2xl p-6">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-contrast/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="text-center mb-8 relative z-10">
                <p className="text-xs uppercase tracking-widest font-black text-foreground-muted mb-2">Ventas de Hoy</p>
                <div className="flex items-center justify-center gap-1 text-5xl font-black text-primary">
                    <span className="text-3xl text-contrast">$</span>
                    <span className="demo-total font-mono tracking-tighter">0</span>
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                {[
                    { id: 1, item: 'Camisa Denim', price: 45000, time: 'Hace 2 min' },
                    { id: 2, item: 'Pantalón Cargo', price: 85000, time: 'Hace 5 min' },
                    { id: 3, item: 'Blusa Floral', price: 72000, time: 'Hace 12 min' },
                ].map((sale, i) => (
                    <div key={sale.id} className={`demo-sale demo-sale-${sale.id} flex items-center justify-between p-4 rounded-2xl bg-foreground/5 border border-foreground/5`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-contrast/10 flex items-center justify-center text-contrast">
                                <ShoppingBag size={18} />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-primary">{sale.item}</p>
                                <p className="text-xs text-foreground-muted">{sale.time}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-success">
                            <ArrowUpRight size={16} />
                            <span className="font-bold font-mono">{formatCurrency(sale.price)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
}