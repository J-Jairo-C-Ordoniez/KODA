interface CardPolicyProps {
    title: string;
    content: string;
}

export default function CardPolicy({ title, content }: CardPolicyProps) {
    return (
        <article className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-primary tracking-tight">
                {title}
            </h2>
            <p className="text-base md:text-lg text-foreground-muted font-medium leading-relaxed">
                {content}
            </p>
        </article>
    );
}