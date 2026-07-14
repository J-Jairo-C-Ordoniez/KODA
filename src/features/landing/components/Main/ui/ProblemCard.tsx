interface ProblemCardProps {
    item: {
        number: string;
        title: string;
        desc: string;
        theme: string;
        content: React.ReactNode;
    };
}

export default function ProblemCard({ item }: ProblemCardProps) {
    return (
        <article
            className={`chaos-card relative flex flex-col justify-between overflow-hidden rounded-4xl border p-8 md:p-12 min-h-[380px] w-full transition-all duration-300 ${item.theme === "dark"
                ? "border-primary/50 bg-primary text-foreground-muted shadow-2xl shadow-primary/5"
                : "border-primary/10 bg-background text-primary shadow-xl shadow-primary/2"
                }`}
        >
            <span className="absolute -right-4 -top-6 select-none text-[10rem] font-black leading-none opacity-5 md:text-[14rem]">
                {item.number}
            </span>

            <div className="relative z-10 w-full">
                <h3 className="mb-8 max-w-[85%] text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:text-4xl">
                    {item.title}
                </h3>

                <div className="max-w-md w-full mb-8">
                    {item.content}
                </div>
            </div>

            <p className="relative z-10 max-w-2xl text-base md:text-lg leading-relaxed opacity-80">
                {item.desc}
            </p>
        </article>
    );
}