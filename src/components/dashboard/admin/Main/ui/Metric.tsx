type Stat = {
    label: string;
    value: string;
    icon: any;
    color?: string;
};

export default function Metrics({ stat }: { stat: Stat }) {
    return (
        <article className="bg-background border border-foreground/5 p-6 rounded-[32px] shadow-sm flex items-center gap-6">
            <div className={`p-4 rounded-2xl ${stat.color ? `${stat.color}` : 'bg-navy/5 text-navy'}`}>
                <stat.icon size={24} />
            </div>
            <div>
                <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-primary">{stat.value}</h3>
            </div>
        </article>
    );
}