import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-foreground/40 mb-8">Navegación</h4>
            <ul className="space-y-4 font-medium">
                <li><Link href="#inicio" className="text-sm font-bold text-background/60 hover:text-background transition-colors duration-300">Inicio</Link></li>
                <li><Link href="#features" className="text-sm font-bold text-background/60 hover:text-background transition-colors duration-300">Características</Link></li>
                <li><Link href="#pricing" className="text-sm font-bold text-background/60 hover:text-background transition-colors duration-300">Precios</Link></li>
                <li><Link href="/register" className="text-sm font-bold text-background/60 hover:text-background transition-colors duration-300">Registrar Negocio</Link></li>
            </ul>
        </nav>
    );
}