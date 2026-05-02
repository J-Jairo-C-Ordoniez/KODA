import Link from "next/link";

export default function Legal() {
    return (
        <article>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-background/40 mb-8">Información Legal</h4>
            <ul className="space-y-4 font-medium">
                <li><Link href="/policies/terms" className="text-xs uppercase font-medium tracking-wider text-background/80 hover:text-background hover:scale-106 transition-all duration-300">Términos y Condiciones</Link></li>
                <li><Link href="/policies/privacy" className="text-xs uppercase font-medium tracking-wider text-background/80 hover:text-background hover:scale-106 transition-all duration-300">Política de Privacidad</Link></li>
                <li><Link href="/policies/cookies" className="text-xs uppercase font-medium tracking-wider text-background/80 hover:text-background hover:scale-106 transition-all duration-300">Política de Cookies</Link></li>
            </ul>
        </article>
    );
}