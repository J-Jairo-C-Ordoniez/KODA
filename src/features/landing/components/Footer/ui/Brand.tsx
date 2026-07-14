import Logo from "@/shared/components/Logo";

export default function Brand() {
    return (
        <article className="space-y-5">
            <Logo type="light" />
            <p className="text-sm text-foreground-muted font-medium leading-relaxed max-w-xs">
                La plataforma inteligente para el control total de inventarios y ventas en negocios de moda.
            </p>
        </article>
    );
}