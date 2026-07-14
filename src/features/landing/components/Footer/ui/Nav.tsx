import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <h4 className="font-medium leading-[1.1] tracking-tight text-md text-primary mb-6">Navegación</h4>
            <ul className="space-y-3">
                <li><Link href="#inicio" className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200">Inicio</Link></li>
                <li><Link href="#features" className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200">Características</Link></li>
                <li><Link href="#pricing" className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200">Planes</Link></li>
                <li><Link href="/register" className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200">Registrar Negocio</Link></li>
            </ul>
        </nav>
    );
}