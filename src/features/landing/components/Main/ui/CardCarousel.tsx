import RenderVisual from '@/features/landing/components/Main/ui/RenderVisual';

interface CardCarouselProps {
    card: {
        id: string;
        title: string;
        description: string;
    };
    isActive: boolean;
}

export default function CardCarousel({ card, isActive }: CardCarouselProps) {
    return (
        <div
            key={card.id}
            className={`absolute md:inset-0 flex flex-col md:flex-row p-2 md:p-4 transition-all duration-1000 ease-in-out ${isActive ? 'opacity-100 translate-x-0 pointer-events-auto z-10' : 'opacity-0 translate-x-12 pointer-events-none z-0'}`}
            role="group"
            aria-roledescription="slide"
            aria-hidden={!isActive}
        >
            <div className="w-full md:w-1/2 h-64 md:h-full bg-primary rounded-4xl overflow-hidden flex items-center justify-center shadow-lg relative shrink-0 pt-4 md:pt-0">
                {isActive && <RenderVisual id={card.id} />}
            </div>

            <div className="w-full md:w-1/2 md:h-full flex flex-col justify-start md:justify-center p-6 pt-16 md:pt-6 md:px-12 lg:px-16 text-left bg-transparent">
                <h3 className="text-3xl lg:text-4xl font-heading font-black leading-[1.05] tracking-tight text-foreground mb-4">
                    {card.title}
                </h3>

                <p className="text-base lg:text-lg text-foreground/70 max-w-2xl md:text-lg leading-relaxed">
                    {card.description}
                </p>
            </div>
        </div>
    );
}