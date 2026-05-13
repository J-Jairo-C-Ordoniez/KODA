interface CardFeatureProps {
    feature: {
        title: string;
        description: string;
        icon: React.ReactNode;
        color: string;
        textColor: string;
        subTextColor: string;
        gradient?: string;
    }
}

export default function CardFeature({ feature }: CardFeatureProps) {
    const { title, description, icon, color, textColor, subTextColor, gradient } = feature;
    
    return (
        <article className={`feature-card group opacity-0 relative overflow-hidden flex flex-col p-10 md:p-12 rounded-[2.5rem] ${color} transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}>
            {gradient && <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 ${gradient}`} />}

            <div className="relative z-10 flex flex-col h-full">
                <span className="mb-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    {icon}
                </span>
                
                <div className="mt-auto">
                    <h3 className={`text-2xl md:text-3xl font-bold leading-tight tracking-tight ${textColor} mb-4 leading-[0.9]`}>
                        {title}
                    </h3>
                    <p className={`text-base md:text-lg leading-relaxed font-medium ${subTextColor}`}>
                        {description}
                    </p>
                </div>
            </div>
        </article>
    )
}
