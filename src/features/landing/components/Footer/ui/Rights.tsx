import Link from "next/link";

export default function Rights() {
    return (
        <article className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary/30 tracking-wide">
                © {new Date().getFullYear()} KODA. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
                <Link
                    href="/help"
                    className="text-xs text-primary/40 hover:text-primary/80 transition-colors duration-200"
                >
                    Centro de ayuda
                </Link>
            </div>
        </article>
    );
}