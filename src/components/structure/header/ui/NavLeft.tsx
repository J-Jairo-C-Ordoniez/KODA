import { useRouter, usePathname } from 'next/navigation';

export default function NavLeft({ breadcrumbs, setBreadcrumbsRoute, setGender }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleGenderClick = (gender) => {
        setBreadcrumbsRoute(gender);
        setGender(gender);
        if (pathname !== '/') {
            router.push('/');
        }
    };

    return (
        <nav className="flex items-center gap-3 md:gap-6 text-xs font-semibold tracking-wider text-gray-500">
            <button
                onClick={() => handleGenderClick("mujer")}
                aria-label="Filtrar por Mujer"
                aria-current={breadcrumbs[1].label.toUpperCase() === "MUJER" ? "true" : "false"}
                className={breadcrumbs[1].label.toUpperCase() === "MUJER" ? "text-primary transition-colors cursor-pointer" : "text-secondary/90 hover:text-primary transition-colors cursor-pointer"}>
                MUJER
            </button>
            <button
                onClick={() => handleGenderClick("hombre")}
                aria-label="Filtrar por Hombre"
                aria-current={breadcrumbs[1].label.toUpperCase() === "HOMBRE" ? "true" : "false"}
                className={breadcrumbs[1].label.toUpperCase() === "HOMBRE" ? "text-primary transition-colors cursor-pointer" : "text-secondary/90 hover:text-primary transition-colors cursor-pointer"}>
                HOMBRE
            </button>
        </nav>
    );
}
