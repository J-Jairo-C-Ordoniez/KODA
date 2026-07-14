import Logo from "@/shared/components/Logo";

export default function Brand() {
    return (
        <article className="space-y-5">
            <Logo />
            <p className="text-base font-normal leading-relaxed text-foreground/80 max-w-xs">
                La plataforma inteligente para el control total de inventarios y ventas en negocios de moda.
            </p>
        </article>
    );
}