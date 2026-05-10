import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl font-black text-primary leading-none tracking-tighter mb-8">
                Por fin, el control total para tu negocio.
            </h1>
            <p className="hero-desc max-w-2xl text-lg md:text-2xl text-foreground-muted font-medium leading-relaxed mb-12">
                Tu plataforma inteligente para inventario, ventas y crecimiento continuo.
            </p>
            <nav className="hero-buttons flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center">
                <Link href="/register" className="inline-block text-center px-8 py-4 bg-primary text-background font-black rounded-xl hover:bg-foreground transition-all duration-300">
                    Obtén una prueba gratuita
                </Link>
                <Link href="#pricing" className="inline-block text-center px-8 py-4 bg-transparent border border-foreground/20 text-primary font-bold rounded-xl hover:bg-background-elevated transition-all">
                    Ver planes
                </Link>
            </nav>
        </header>
    )
}