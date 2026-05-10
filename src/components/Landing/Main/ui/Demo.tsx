import { useRef, useState, useCallback, useEffect } from 'react';
import { Search, ShoppingBag, CreditCard, CheckCircle2, Clock, Package, Zap, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type Phase = 'pos' | 'success' | 'metrics';

const PRODUCTS = [
    { id: 0, name: 'Camisa Denim', price: 45000, sku: 'CAM-M-AZ' },
    { id: 1, name: 'Pantalón Cargo', price: 85000, sku: 'PAN-32-KH' },
];

const INV = `#KDA-${Math.floor(1000 + Math.random() * 9000)}`;
const NOW = new Date().toLocaleString('es-CO', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' });

export default function Demo() {
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    const [phase, setPhase] = useState<Phase>('pos');
    const [searchText, setSearchText] = useState('');
    const [cart, setCart] = useState<typeof PRODUCTS>([]);
    const [highlighted, setHighlighted] = useState<number | null>(null);
    const [paying, setPaying] = useState(false);

    const sleep = (ms: number) =>
        new Promise<void>((res) => { const t = setTimeout(res, ms); timers.current.push(t); });

    const typeText = useCallback(async (text: string) => {
        for (let i = 0; i <= text.length; i++) {
            setSearchText(text.slice(0, i));
            await sleep(70);
        }
        await sleep(350);
    }, []);

    const runDemo = useCallback(async () => {
        setPhase('pos'); setSearchText(''); setCart([]); setHighlighted(null); setPaying(false);
        await sleep(600);

        // --- Add product 1 ---
        await typeText('Camisa Denim');
        setHighlighted(0);
        await sleep(600);
        gsap.to('.dp-0', { scale: 0.91, duration: 0.1, yoyo: true, repeat: 1 });
        await sleep(250);
        setCart([PRODUCTS[0]]);
        await sleep(50);
        gsap.fromTo('.ci-0', { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' });
        await sleep(900);

        // --- Add product 2 ---
        setSearchText('');
        await sleep(150);
        await typeText('Pantalón Cargo');
        setHighlighted(1);
        await sleep(600);
        gsap.to('.dp-1', { scale: 0.91, duration: 0.1, yoyo: true, repeat: 1 });
        await sleep(250);
        setCart((p) => [...p, PRODUCTS[1]]);
        await sleep(50);
        gsap.fromTo('.ci-1', { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' });
        setHighlighted(null);
        await sleep(800);

        // --- Cobrar ---
        for (let i = 0; i < 3; i++) {
            gsap.to('.demo-cobrar', { boxShadow: '0 0 22px rgba(255,122,0,0.7)', duration: 0.25, yoyo: true, repeat: 1 });
            await sleep(500);
        }
        setPaying(true);
        gsap.to('.demo-cobrar', { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1 });
        await sleep(450);

        // --- Transition: POS → Success ---
        gsap.to('.demo-pos', { opacity: 0, scale: 0.97, duration: 0.4, ease: 'power2.in' });
        await sleep(420);
        setPhase('success');
        await sleep(40);
        gsap.fromTo('.demo-success', { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' });
        await sleep(80);
        gsap.fromTo('.s-check', { scale: 0, rotation: -40, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.65, ease: 'back.out(2)' });
        await sleep(180);
        gsap.fromTo('.s-lines > *', { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.13, duration: 0.4, ease: 'power3.out' });
        await sleep(2600);

        // --- Transition: Success → Metrics ---
        gsap.to('.demo-success', { opacity: 0, scale: 0.97, duration: 0.4, ease: 'power2.in' });
        await sleep(420);
        setPhase('metrics');
        await sleep(40);
        gsap.fromTo('.demo-metrics', { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' });
        await sleep(150);
        gsap.fromTo('.m-card', { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.14, duration: 0.45, ease: 'power3.out' });
        await sleep(3800);

        // --- Reset loop ---
        gsap.to('.demo-metrics', { opacity: 0, duration: 0.5 });
        await sleep(600);
        runDemo();
    }, [typeText]);

    useEffect(() => {
        const t = setTimeout(() => runDemo(), 1800);
        timers.current.push(t);
        return () => timers.current.forEach(clearTimeout);
    }, [runDemo]);

    const total = cart.reduce((a, b) => a + b.price, 0);
    return (
        <article className="hero-demo-card relative w-full rounded-4xl bg-background-elevated border border-foreground/10 ring-1 ring-contrast/25 overflow-hidden shadow-[0_0_80px_rgba(255,122,0,0.10)] p-3 md:p-5">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-32 bg-contrast/12 blur-[70px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-2 mb-3 px-1">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
                    {phase === 'pos' && 'Punto de Venta • En vivo'}
                    {phase === 'success' && 'Venta Registrada'}
                    {phase === 'metrics' && 'Resumen de la Venta'}
                </span>
            </div>

            <div className="relative w-full bg-background border border-foreground/10 rounded-2xl overflow-hidden shadow-2xl min-h-[340px] md:min-h-[380px]">

                {/* ── POS ── */}
                {phase === 'pos' && (
                    <div className="demo-pos flex flex-col md:flex-row w-full h-full">
                        {/* Products */}
                        <div className="flex-1 p-5 border-b md:border-b-0 md:border-r border-foreground/5 flex flex-col gap-4">
                            <div className="flex items-center gap-2 bg-background-elevated border border-foreground/10 rounded-xl px-4 py-2.5">
                                <Search size={14} className="text-foreground-muted shrink-0" />
                                <span className="text-sm text-primary font-mono tracking-wide">
                                    {searchText}<span className="opacity-60 animate-pulse">|</span>
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 flex-1">
                                {PRODUCTS.map((p) => (
                                    <div
                                        key={p.id}
                                        className={`dp-${p.id} flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${highlighted === p.id
                                            ? 'border-contrast bg-contrast/8 shadow-[0_0_16px_rgba(255,122,0,0.22)]'
                                            : 'border-foreground/5 bg-background-elevated'
                                            }`}
                                    >
                                        <ShoppingBag size={22} className={highlighted === p.id ? 'text-contrast' : 'text-foreground-muted'} />
                                        <p className="text-xs font-bold text-primary mt-2 text-center leading-tight">{p.name}</p>
                                        <p className="text-[10px] text-foreground-muted mt-0.5">${p.price.toLocaleString('es-CO')}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="w-full md:w-60 p-5 flex flex-col">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard size={13} className="text-contrast" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Venta Rápida</span>
                            </div>
                            <div className="flex-1 space-y-2 min-h-[80px]">
                                {cart.length === 0 && (
                                    <div className="flex items-center justify-center h-16 opacity-25">
                                        <p className="text-[10px] text-foreground-muted uppercase tracking-widest">Agrega productos</p>
                                    </div>
                                )}
                                {cart.map((item, i) => (
                                    <div key={i} className={`ci-${i} flex justify-between items-center bg-background-elevated rounded-lg px-3 py-2 border border-foreground/5`}>
                                        <span className="text-xs font-semibold text-primary truncate max-w-[90px]">{item.name}</span>
                                        <span className="text-[10px] font-mono text-foreground-muted">${item.price.toLocaleString('es-CO')}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-foreground/5 pt-3 mt-3">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-foreground-muted">Total</span>
                                    <span className="text-xl font-black text-primary">${total.toLocaleString('es-CO')}</span>
                                </div>
                                <button
                                    className={`demo-cobrar w-full py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${cart.length > 0 ? 'bg-contrast text-white' : 'bg-foreground/5 text-foreground-muted'
                                        }`}
                                >
                                    {paying ? '⚡ Procesando...' : 'Cobrar'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── SUCCESS ── */}
                {phase === 'success' && (
                    <div className="demo-success flex flex-col items-center justify-center w-full min-h-[340px] md:min-h-[380px] p-8 gap-5">
                        <div className="s-check w-20 h-20 rounded-full bg-success/15 border border-success/30 flex items-center justify-center shadow-[0_0_40px_rgba(0,200,150,0.25)]">
                            <CheckCircle2 size={40} className="text-success" />
                        </div>
                        <div className="s-lines flex flex-col items-center gap-2 text-center">
                            <h3 className="text-2xl md:text-3xl font-black text-primary">Venta Registrada</h3>
                            <p className="text-foreground-muted text-sm font-medium">El inventario se actualizó automáticamente</p>
                            <div className="mt-3 px-6 py-3 bg-background-elevated border border-foreground/10 rounded-2xl flex flex-col gap-1.5 w-full max-w-xs">
                                <div className="flex justify-between text-xs">
                                    <span className="text-foreground-muted uppercase tracking-wider font-bold">Factura</span>
                                    <span className="text-primary font-mono font-bold">{INV}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-foreground-muted uppercase tracking-wider font-bold">Fecha</span>
                                    <span className="text-primary font-mono">{NOW}</span>
                                </div>
                                <div className="flex justify-between text-xs pt-1.5 border-t border-foreground/5 mt-1">
                                    <span className="text-foreground-muted uppercase tracking-wider font-bold">Total</span>
                                    <span className="text-success font-black font-mono">${total.toLocaleString('es-CO')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── METRICS ── */}
                {phase === 'metrics' && (
                    <div className="demo-metrics flex flex-col w-full min-h-[340px] md:min-h-[380px] p-6 gap-4">
                        <p className="text-xs font-black uppercase tracking-widest text-foreground-muted mb-1">Resumen en tiempo real</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1">
                            {[
                                { icon: <Clock size={18} className="text-[#3A86FF]" />, bg: 'bg-[#3A86FF]/10 border-[#3A86FF]/20', label: 'Tiempo de cobro', value: '< 0.4s', sub: 'Ultrarápido' },
                                { icon: <TrendingUp size={18} className="text-success" />, bg: 'bg-success/10 border-success/20', label: 'Total cobrado', value: `$${total.toLocaleString('es-CO')}`, sub: '2 productos' },
                                { icon: <Package size={18} className="text-[#7B61FF]" />, bg: 'bg-[#7B61FF]/10 border-[#7B61FF]/20', label: 'Stock actualizado', value: '-2 unid.', sub: 'Automático' },
                                { icon: <Zap size={18} className="text-contrast" />, bg: 'bg-contrast/10 border-contrast/20', label: 'Ventas hoy', value: '8 ventas', sub: '+3 vs ayer' },
                            ].map((m) => (
                                <div key={m.label} className={`m-card flex flex-col gap-3 p-4 rounded-2xl border ${m.bg} bg-background-elevated`}>
                                    <div className={`w-8 h-8 ${m.bg} border rounded-xl flex items-center justify-center`}>
                                        {m.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-foreground-muted font-bold leading-tight">{m.label}</p>
                                        <p className="text-lg font-black text-primary mt-1 leading-none">{m.value}</p>
                                        <p className="text-[10px] text-foreground-muted mt-1">{m.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto pt-3 border-t border-foreground/5 flex items-center justify-between">
                            <p className="text-[10px] text-foreground-muted uppercase tracking-widest font-bold">Próxima venta</p>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                                <span className="text-[10px] text-success font-bold">Sistema listo</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}