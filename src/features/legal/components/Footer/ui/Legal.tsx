import Link from "next/link";

export default function Legal() {
    return (
        <article>
            <h4 className="font-medium leading-[1.1] tracking-tight text-md text-primary mb-6">Legal</h4>
            <ul className="space-y-3">
                <li><Link href="/legal/termsAndConditions" className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200">Términos y Condiciones</Link></li>
                <li><Link href="/legal/privacyPolicy" className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200">Política de Privacidad</Link></li>
                <li><Link href="/legal/cookiesPolicy" className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200">Política de Cookies</Link></li>
            </ul>
        </article>
    );
}