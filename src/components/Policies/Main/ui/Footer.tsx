import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-8 pt-8 border-t border-foreground/5 text-center space-y-4">
            <p className="text-base text-foreground-muted font-medium leading-relaxed">
                ¿Tienes dudas sobre nuestras políticas?
            </p>
            <Link
                href="/help"
                className="inline-block text-contrast font-black text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
                Ir al Centro de Ayuda →
            </Link>
        </footer>
    );
}