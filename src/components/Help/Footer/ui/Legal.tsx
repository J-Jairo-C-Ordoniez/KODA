import Link from "next/link";

export default function Legal() {
    return (
        <article>
            <h4 className="text-xs uppercase font-semibold tracking-[0.2em] text-background/40 mb-8">Información Legal</h4>
            <ul className="space-y-4 font-medium">
                <li><Link href="/policies/terms" className="text-sm font-semibold text-background/60 hover:text-background transition-colors duration-300">Términos y Condiciones</Link></li>
                <li><Link href="/policies/privacy" className="text-sm font-semibold text-background/60 hover:text-background transition-colors duration-300">Política de Privacidad</Link></li>
                <li><Link href="/policies/cookies" className="text-sm font-semibold text-background/60 hover:text-background transition-colors duration-300">Política de Cookies</Link></li>
            </ul>
        </article>
    );
}