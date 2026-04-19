import Link from "next/link";

export default function Rights() {
    return (
        <article className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs uppercase font-medium tracking-wider text-foreground/60 transition-color duration-300">
                © {new Date().getFullYear()} KODA. Todos los derechos reservados.
            </p>
            <div className="flex gap-8">
                <Link href="/status" className="text-xs uppercase font-medium tracking-wider text-foreground/60 hover:text-background transition-color duration-300">Estado del sistema</Link>
                <Link href="/help" className="text-xs uppercase font-medium tracking-wider text-foreground/60 hover:text-background transition-color duration-300">Centro de ayuda</Link>
            </div>
        </article>
    );
}