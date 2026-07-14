export default function StatCard({ title, value, sub, icon: Icon }) {
    return (
        <article className="bg-[#181818] border border-[#262626] p-5 sm:p-6 rounded-2xl hover:border-accent/20 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-1.5">
                    <p className="text-foreground-muted text-[10px] font-bold tracking-[0.1em] uppercase">
                        {title}
                    </p>
                    <p className="text-2xl font-bold text-foreground tracking-tight transition-all group-hover:scale-[1.01] origin-left">
                        {value}
                    </p>
                    {sub && <p className="text-foreground-muted text-xs font-medium pt-2">{sub}</p>}
                </div>
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" />
                </div>
            </div>
        </article>
    );
}
