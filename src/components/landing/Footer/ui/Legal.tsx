import Link from "next/link";

export default function Legal() {
    return (
        <article>
            <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-foreground/40 mb-8">Información Legal</h4>
            <ul className="space-y-4 font-medium">
                <li><Link href="/politicas/terminos" className="text-sm font-bold text-background/60 hover:text-background transition-colors duration-300">Términos y Condiciones</Link></li>
                <li><Link href="/politicas/privacidad" className="text-sm font-bold text-background/60 hover:text-background transition-colors duration-300">Política de Privacidad</Link></li>
                <li><Link href="/politicas/cookies" className="text-sm font-bold text-background/60 hover:text-background transition-colors duration-300">Política de Cookies</Link></li>
            </ul>
        </article>
    );
}