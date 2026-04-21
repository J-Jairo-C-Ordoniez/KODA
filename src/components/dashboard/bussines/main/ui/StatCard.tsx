export default function StatCard({ title, value, sub, icon: Icon }) {
    return (
        <article className="rounded-xl p-6 flex flex-col gap-3 relative overflow-hidden bg-foreground border-b-2 border-primary/10">
            <div className="flex items-start justify-between w-full">
                <div>
                    <p className="text-primary/80 leading-relaxed text-sm tracking-wider font-medium uppercase">
                        {title}
                    </p>
                    <p className="text-primary leading-relaxed text-lg tracking-wider md:text-xl font-semibold">
                        {value}
                    </p>
                    <p className="text-secondary leading-relaxed text-sm tracking-wider md:text-sm font-light pt-4">{sub}</p>
                </div>
                <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0 bg-primary/10">
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </article>
    );
}
