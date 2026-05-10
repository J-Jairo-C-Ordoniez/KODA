import Link from "next/link";

export default function Legal() {
    return (
        <article>
            <h4 className="text-xs uppercase font-bold tracking-widest text-foreground-muted mb-6">Legal</h4>
            <ul className="space-y-3">
                <li><Link href="/policies/terms" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Términos y Condiciones</Link></li>
                <li><Link href="/policies/privacy" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Política de Privacidad</Link></li>
                <li><Link href="/policies/cookies" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Política de Cookies</Link></li>
            </ul>
        </article>
    );
}