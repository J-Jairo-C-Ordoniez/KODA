import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <h4 className="text-xs uppercase font-semibold tracking-[0.2em] text-background/40 mb-8">Navegación</h4>
            <ul className="space-y-4 font-medium">
                <li><Link href="#inicio" className="text-sm font-semibold text-background/60 hover:text-background transition-colors duration-300">Inicio</Link></li>
                <li><Link href="#features" className="text-sm font-semibold text-background/60 hover:text-background transition-colors duration-300">Características</Link></li>
                <li><Link href="#pricing" className="text-sm font-semibold text-background/60 hover:text-background transition-colors duration-300">Precios</Link></li>
                <li><Link href="/register" className="text-sm font-semibold text-background/60 hover:text-background transition-colors duration-300">Registrar Negocio</Link></li>
            </ul>
        </nav>
    );
}