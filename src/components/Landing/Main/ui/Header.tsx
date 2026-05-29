import Link from 'next/link';
import { MapPin, ShieldCheck, Zap } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex flex-col items-center justify-center pt-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground-muted text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
                    <MapPin size={14} className="text-contrast" />
                    Diseñado en Nariño
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-success/10 border border-success/20 text-success text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
                    <ShieldCheck size={14} />
                    Soporte Humano Local
                </div>
            </div>
            
            <h1 className="hero-title text-5xl md:text-7xl lg:text-[5.5rem] font-black text-primary leading-[1.1] tracking-tight mb-8 max-w-5xl mx-auto drop-shadow-2xl">
                Tira la libreta de fiados. <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-contrast to-orange-400">
                    Nosotros organizamos tu almacén.
                </span>
            </h1>
            
            <p className="mx-auto hero-desc max-w-3xl text-foreground-muted text-lg md:text-xl lg:text-2xl font-medium leading-relaxed mb-12">
                Sabemos lo agotador que es cuadrar caja y no recordar quién te debe. KODA es tan intuitivo que en 15 minutos tu equipo registrará ventas desde el celular. <strong className="text-primary font-semibold">Olvídate del estrés, nosotros subimos tu inventario inicial.</strong>
            </p>
            
            <nav className="hero-buttons flex flex-col sm:flex-row gap-5 mb-24 w-full justify-center items-center">
                <Link
                    href="/register"
                    className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-contrast text-background font-black rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,122,0,0.4)] overflow-hidden"
                >
                    <span className="relative z-10">Empieza tu prueba gratuita</span>
                    <Zap size={18} className="relative z-10 group-hover:text-white transition-colors" />
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>
                <Link
                    href="#acompanamiento"
                    className="w-full sm:w-auto text-center px-8 py-4 bg-background-elevated/50 backdrop-blur-md border border-foreground/10 text-primary font-bold rounded-xl hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300 shadow-sm"
                >
                    ¿Cómo migramos tu libreta?
                </Link>
            </nav>
        </header>
    )
}