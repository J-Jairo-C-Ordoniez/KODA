import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <h4 className="text-xs uppercase font-bold tracking-widest text-foreground-muted mb-6">Navegación</h4>
            <ul className="space-y-3">
                <li><Link href="#inicio" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Inicio</Link></li>
                <li><Link href="#features" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Características</Link></li>
                <li><Link href="#pricing" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Planes</Link></li>
                <li><Link href="/register" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Registrar Negocio</Link></li>
            </ul>
        </nav>
    );
}