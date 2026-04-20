import Link from "next/link";

export default function Rights() {
    return (
        <article className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs uppercase font-medium tracking-[0.2em] text-background/40">
                © {new Date().getFullYear()} KODA. Todos los derechos reservados.
            </p>
            <div className="flex gap-8">
                <Link href="/help" className="text-xs uppercase font-medium tracking-[0.2em] text-background/40 hover:text-background transition-colors duration-300">Centro de ayuda</Link>
            </div>
        </article>
    );
}