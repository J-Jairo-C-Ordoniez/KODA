import Link from "next/link";

export default function Legal() {
    return (
        <article>
            <h4 className="text-md uppercase font-medium tracking-wider text-foreground mb-8">Información Legal</h4>
            <ul className="space-y-4 text-foreground/80 font-medium">
                <li><Link href="/politicas/terminos" className="text-xs uppercase font-medium tracking-wider text-foreground/60 hover:text-background transition-color duration-300">Términos y Condiciones</Link></li>
                <li><Link href="/politicas/privacidad" className="text-xs uppercase font-medium tracking-wider text-foreground/60 hover:text-background transition-color duration-300">Política de Privacidad</Link></li>
                <li><Link href="/politicas/cookies" className="text-xs uppercase font-medium tracking-wider text-foreground/60 hover:text-background transition-color duration-300">Política de Cookies</Link></li>
            </ul>
        </article>
    );
}