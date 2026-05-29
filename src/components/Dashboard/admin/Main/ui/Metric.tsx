type Stat = {
    label: string;
    value: string;
    icon: any;
    color?: string;
};

export default function Metrics({ stat }: { stat: Stat }) {
    return (
        <article className="bg-background-elevated border border-foreground/8 p-6 rounded-[24px] hover:border-foreground/15 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${stat.color || 'bg-contrast/10 text-contrast'}`}>
                    <stat.icon size={22} aria-hidden="true" />
                </div>
            </div>
            <p className="text-foreground-muted text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-3xl font-black text-primary tracking-tight">{stat.value}</p>
        </article>
    );
}