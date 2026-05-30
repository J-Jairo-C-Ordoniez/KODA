import Link from 'next/link';
import { MapPin, Zap } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex flex-col items-center justify-center pt-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full bg-foreground/5 border border-foreground/10 text-foreground-muted text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
                <MapPin size={12} className="text-contrast" />
                Nariño, Colombia
            </div>
            
            <h1 className="hero-title text-5xl md:text-7xl font-black text-primary leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto drop-shadow-2xl">
                Dile adiós a la <span className="text-foreground-muted line-through decoration-contrast decoration-4">libreta</span>.<br />
                Hola a <span className="text-transparent bg-clip-text bg-gradient-to-r from-contrast to-orange-400">KODA</span>.
            </h1>
            
            <p className="mx-auto hero-desc max-w-2xl text-foreground-muted text-lg md:text-xl font-medium leading-relaxed mb-10">
                Sabemos lo estresante que es no saber quién te debe o qué falta en el local. KODA hace el trabajo pesado por ti.
            </p>
            
            <nav className="hero-buttons flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center items-center">
                <Link
                    href="/register"
                    className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-contrast text-background font-black rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,122,0,0.4)] overflow-hidden"
                >
                    <span className="relative z-10">Empieza gratis ahora</span>
                    <Zap size={18} className="relative z-10 group-hover:text-white transition-colors" />
                </Link>
            </nav>
        </header>
    )
}