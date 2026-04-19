import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <h4 className="text-md uppercase font-medium tracking-wider text-foreground mb-8">Navegación</h4>
            <ul className="space-y-4 text-foreground/80 font-medium">
                <li><Link href="#inicio" className="text-xs uppercase font-medium tracking-wider text-foreground/60 hover:text-background transition-color duration-300">Inicio</Link></li>
                <li><Link href="#features" className="text-xs uppercase font-medium tracking-wider text-foreground/60 hover:text-background transition-color duration-300">Características</Link></li>
                <li><Link href="#pricing" className="text-xs uppercase font-medium tracking-wider text-foreground/60 hover:text-background transition-color duration-300">Precios</Link></li>
                <li><Link href="/register" className="text-xs uppercase font-medium tracking-wider text-foreground/60 hover:text-background transition-color duration-300">Registrar Negocio</Link></li>
            </ul>
        </nav>
    );
}