import Logo from "@/components/ui/Logo";

export default function Brand() {
    return (
        <article className="space-y-6">
            <Logo type="dark" />
            <p className="text-background/50 font-medium text-sm leading-relaxed tracking-wide max-w-xs">
                La plataforma inteligente para el control total de inventarios y ventas en el mundo de la moda.
            </p>
        </article>
    );
}