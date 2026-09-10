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
    const isDark = item.theme === "dark";

    return (
        <article
            className={`chaos-card group relative w-full overflow-hidden rounded-[2rem] ${
                isDark
                    ? "bg-primary text-background"
                    : "bg-foreground/[0.03] border border-foreground/6"
            }`}
        >
            {/* Inner layout — generous padding, horizontal split */}
            <div className="flex flex-col md:flex-row gap-0 md:gap-0 min-h-[340px] md:min-h-[280px]">

                {/* Left — Number + Visual */}
                <div className={`relative flex flex-col justify-between p-8 md:p-10 md:w-5/12 lg:w-1/2 ${
                    isDark ? "" : ""
                }`}>
                    {/* Ghost number */}
                    <span className={`select-none text-[5rem] md:text-[6rem] font-black leading-none tracking-tighter ${
                        isDark ? "text-background/10" : "text-foreground/6"
                    }`}>
                        {item.number}
                    </span>

                    {/* Mini visual preview */}
                    <div className={`mt-4 md:mt-0 max-w-xs ${isDark ? "" : ""}`}>
                        {item.content}
                    </div>
                </div>

                {/* Divider */}
                <div className={`hidden md:block w-px my-10 ${isDark ? "bg-background/10" : "bg-foreground/8"}`} />

                {/* Right — Text */}
                <div className="flex flex-col justify-center p-8 md:p-10 md:w-7/12 lg:w-1/2">
                    <h3 className={`font-heading text-2xl md:text-3xl font-black tracking-tight leading-[1.1] mb-4 ${
                        isDark ? "text-background" : "text-foreground"
                    }`}>
                        {item.title}
                    </h3>
                    <p className={`text-base md:text-lg leading-relaxed max-w-md ${
                        isDark ? "text-background/65" : "text-foreground/60"
                    }`}>
                        {item.desc}
                    </p>
                </div>
            </div>
        </article>
    );
}