import Link from "next/link";

export default function Rights() {
    return (
        <article className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-base font-normal leading-relaxed text-foreground/80">
                © {new Date().getFullYear()} KODA. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
                <Link
                    href="/help"
                    className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                    Centro de ayuda
                </Link>
            </div>
        </article>
    );
}