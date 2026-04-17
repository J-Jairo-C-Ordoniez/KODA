import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background font-sans h-fit border-b border-secondary/10">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-center text-center">
        <Link href="/dashboard" className="text-sm md:text-base font-semibold tracking-widest text-primary whitespace-nowrap">
            <span className="hidden sm:inline">MODA Y ESTILO</span>
            <span className="sm:hidden">M & E</span>
        </Link>
      </div>
    </header>
  );
}
