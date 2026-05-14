import { useRef, useState, useCallback, useEffect } from 'react';
import { TrendingUp, Package, Users, ShoppingCart, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import gsap from 'gsap';

const BUSINESS_NAME = 'Ropa Estilo libre';

const INITIAL_SALES = [
    { id: 1, product: 'Camisa Denim Azul', amount: 45000, time: '10:12', employee: 'María' },
    { id: 2, product: 'Pantalón Cargo Khaki', amount: 85000, time: '10:31', employee: 'Juan' },
    { id: 3, product: 'Blusa Floral S', amount: 38000, time: '10:55', employee: 'María' },
];

const NEW_SALES = [
    { id: 4, product: 'Jeans Slim Negros', amount: 72000, time: '11:03', employee: 'Juan', isNew: true },
    { id: 5, product: 'Vestido Casual M', amount: 95000, time: '11:18', employee: 'María', isNew: true },
];

const STOCK_ALERT = { product: 'Camisa Denim Azul', stock: 2, variant: 'Talla M' };

export default function Demo() {
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const [sales, setSales] = useState(INITIAL_SALES);
    const [metrics, setMetrics] = useState({ totalVentas: 168000, totalPedidos: 3, stockAlerta: 1, fiados: 4 });
    const [alertVisible, setAlertVisible] = useState(false);
    const [newSaleIdx, setNewSaleIdx] = useState(0);
    const [ready, setReady] = useState(false);

    const sleep = (ms: number) =>
        new Promise<void>((res) => { const t = setTimeout(res, ms); timers.current.push(t); });

    const runDemo = useCallback(async () => {
        // Reset
        setSales(INITIAL_SALES);
        setMetrics({ totalVentas: 168000, totalPedidos: 3, stockAlerta: 1, fiados: 4 });
        setAlertVisible(false);
        setNewSaleIdx(0);
        setReady(false);
        await sleep(400);

        // Fade in the whole card
        gsap.fromTo('.demo-dashboard', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
        await sleep(300);

        // Animate metrics cards in
        gsap.fromTo('.m-stat', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: 'power3.out' });
        setReady(true);
        await sleep(1200);

        // Animate rows in
        gsap.fromTo('.sale-row', { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' });
        await sleep(1800);

        // New sale arrives — row 1
        setSales(p => [NEW_SALES[0], ...p.slice(0, 3)]);
        setMetrics(m => ({ ...m, totalVentas: m.totalVentas + NEW_SALES[0].amount, totalPedidos: m.totalPedidos + 1 }));
        await sleep(80);
        gsap.fromTo('.sale-row-new', { opacity: 0, x: -16, backgroundColor: 'rgba(255,122,0,0.12)' }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' });
        gsap.fromTo('.stat-ventas', { scale: 1.06 }, { scale: 1, duration: 0.4, ease: 'power2.out' });
        await sleep(1800);

        // Stock alert appears
        setAlertVisible(true);
        await sleep(60);
        gsap.fromTo('.stock-alert', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
        await sleep(2200);

        // New sale arrives — row 2
        setSales(p => [NEW_SALES[1], ...p.slice(0, 3)]);
        setMetrics(m => ({ ...m, totalVentas: m.totalVentas + NEW_SALES[1].amount, totalPedidos: m.totalPedidos + 1 }));
        await sleep(80);
        gsap.fromTo('.sale-row-new', { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' });
        gsap.fromTo('.stat-ventas', { scale: 1.06 }, { scale: 1, duration: 0.4, ease: 'power2.out' });
        await sleep(2800);

        // Fade out and restart
        gsap.to('.demo-dashboard', { opacity: 0, duration: 0.5 });
        await sleep(600);
        runDemo();
    }, []);

    useEffect(() => {
        const t = setTimeout(() => runDemo(), 1200);
        timers.current.push(t);
        return () => timers.current.forEach(clearTimeout);
    }, [runDemo]);

    const fmt = (n: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

    return (
        <article className="hero-demo-card relative w-full rounded-4xl bg-background-elevated border border-foreground/10 ring-1 ring-contrast/25 overflow-hidden shadow-[0_0_80px_rgba(255,122,0,0.10)] p-3 md:p-5">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-32 bg-contrast/12 blur-[70px] rounded-full pointer-events-none" />

            <header className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
                        {BUSINESS_NAME} · Panel Principal
                    </span>
                </div>
                <span className="text-[10px] text-foreground-muted font-mono">En vivo</span>
            </header>

            <div className="demo-dashboard opacity-0 relative w-full bg-background border border-foreground/10 rounded-2xl overflow-hidden shadow-2xl">

                {/* Stats bar */}
                <div className="grid grid-cols-4 divide-x divide-foreground/5 border-b border-foreground/5">
                    {[
                        { label: 'Ventas hoy', value: fmt(metrics.totalVentas), icon: <TrendingUp size={13} className="text-success" />, trend: '+12%', cls: 'stat-ventas' },
                        { label: 'Pedidos', value: metrics.totalPedidos, icon: <ShoppingCart size={13} className="text-[#3A86FF]" />, trend: `hoy`, cls: '' },
                        { label: 'Stock bajo', value: metrics.stockAlerta, icon: <Package size={13} className="text-contrast" />, trend: 'alerta', cls: '' },
                        { label: 'Fiados', value: metrics.fiados, icon: <Users size={13} className="text-[#7B61FF]" />, trend: 'activos', cls: '' },
                    ].map((s) => (
                        <div key={s.label} className={`m-stat opacity-0 flex flex-col gap-1 px-3 py-3 md:px-4 ${s.cls}`}>
                            <div className="flex items-center gap-1.5 text-foreground-muted">
                                {s.icon}
                                <span className="text-[9px] uppercase tracking-widest font-bold">{s.label}</span>
                            </div>
                            <p className="text-base md:text-lg font-black text-primary leading-none">{s.value}</p>
                            <p className="text-[9px] text-foreground-muted">{s.trend}</p>
                        </div>
                    ))}
                </div>

                {/* Main content */}
                <div className="flex flex-col md:flex-row min-h-[260px] md:min-h-[300px]">

                    {/* Sales feed */}
                    <div className="flex-1 flex flex-col p-4 border-b md:border-b-0 md:border-r border-foreground/5 overflow-hidden">
                        <p className="text-[9px] uppercase tracking-widest font-black text-foreground-muted mb-3">Últimas ventas</p>
                        <div className="flex flex-col gap-2 overflow-hidden">
                            {sales.slice(0, 4).map((sale, i) => {
                                const isNewSale = (sale as any).isNew;
                                return (
                                    <div
                                        key={sale.id}
                                        className={`${isNewSale ? 'sale-row-new' : 'sale-row'} ${i === 0 ? 'opacity-0' : ''} flex items-center justify-between px-3 py-2 rounded-xl border ${isNewSale ? 'border-contrast/30 bg-contrast/5' : 'border-foreground/5 bg-background-elevated'}`}
                                    >
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${isNewSale ? 'bg-contrast/15' : 'bg-foreground/5'}`}>
                                                <ShoppingCart size={11} className={isNewSale ? 'text-contrast' : 'text-foreground-muted'} />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-[11px] font-bold text-primary truncate leading-tight">{sale.product}</p>
                                                <p className="text-[9px] text-foreground-muted">{sale.employee} · {sale.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0">
                                            <ArrowUpRight size={10} className="text-success" />
                                            <span className="text-[11px] font-black text-primary font-mono">{fmt(sale.amount)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right panel: inventory + fiados */}
                    <div className="w-full md:w-52 flex flex-col gap-3 p-4">
                        <div>
                            <p className="text-[9px] uppercase tracking-widest font-black text-foreground-muted mb-2">Inventario crítico</p>

                            {alertVisible && (
                                <div className="stock-alert opacity-0 flex items-start gap-2 p-2.5 rounded-xl border border-contrast/30 bg-contrast/5">
                                    <AlertCircle size={13} className="text-contrast shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] font-black text-primary leading-tight">{STOCK_ALERT.product}</p>
                                        <p className="text-[9px] text-foreground-muted">{STOCK_ALERT.variant} · Solo {STOCK_ALERT.stock} uds.</p>
                                    </div>
                                </div>
                            )}

                            {!alertVisible && (
                                <div className="flex items-center justify-center h-12 opacity-20">
                                    <p className="text-[9px] text-foreground-muted uppercase tracking-widest">Sin alertas</p>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-foreground/5 pt-3">
                            <p className="text-[9px] uppercase tracking-widest font-black text-foreground-muted mb-2">Fiados activos</p>
                            {[
                                { name: 'Carlos M.', amount: 120000, trend: 'down' },
                                { name: 'Lina R.', amount: 45000, trend: 'up' },
                            ].map((f) => (
                                <div key={f.name} className="sale-row opacity-0 flex justify-between items-center py-1.5">
                                    <span className="text-[10px] font-bold text-primary">{f.name}</span>
                                    <div className="flex items-center gap-1">
                                        {f.trend === 'down'
                                            ? <ArrowDownRight size={10} className="text-contrast" />
                                            : <ArrowUpRight size={10} className="text-success" />
                                        }
                                        <span className="text-[10px] font-mono text-foreground-muted">{fmt(f.amount)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-3 border-t border-foreground/5 flex items-center justify-between">
                            <span className="text-[9px] text-foreground-muted uppercase tracking-widest font-bold">Sistema</span>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                                <span className="text-[9px] text-success font-bold">Activo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}