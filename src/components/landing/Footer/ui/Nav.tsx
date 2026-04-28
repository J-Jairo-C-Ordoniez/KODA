import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-background/40 mb-8">Navegación</h4>
            <ul className="space-y-4 font-medium">
                <li><Link href="#inicio" className="text-xs uppercase font-medium tracking-wider text-background/80 hover:text-background hover:scale-106 transition-all duration-300">Inicio</Link></li>
                <li><Link href="#features" className="text-xs uppercase font-medium tracking-wider text-background/80 hover:text-background hover:scale-106 transition-all duration-300">Características</Link></li>
                <li><Link href="#pricing" className="text-xs uppercase font-medium tracking-wider text-background/80 hover:text-background hover:scale-106 transition-all duration-300">Planes</Link></li>
                <li><Link href="/register" className="text-xs uppercase font-medium tracking-wider text-background/80 hover:text-background hover:scale-106 transition-all duration-300">Registrar Negocio</Link></li>
            </ul>
        </nav>
    );
}