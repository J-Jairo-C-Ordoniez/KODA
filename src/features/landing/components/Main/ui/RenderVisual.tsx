import { PackageIcon, CurrencyDollarIcon } from '@phosphor-icons/react';

export default function RenderVisual({ id }: { id: string }) {
    switch (id) {
        case "inventory":
            return (
                <div
                    className="relative flex flex-col items-center justify-center gap-3 h-full w-full"
                    aria-hidden="true"
                >
                    <div className="anim-element box-item w-16 h-16 bg-primary border border-background/60 rounded-2xl flex items-center justify-center">
                        <PackageIcon
                            size={32}
                            className="text-background"
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="anim-element box-item w-16 h-16 bg-background/60 border border-background/20 rounded-2xl" />
                        <div className="anim-element box-item w-16 h-16 bg-background/60 border border-background/20 rounded-2xl" />
                    </div>
                </div>
            );
        case "credit":
            return (
                <div
                    className="relative flex flex-col items-center justify-center h-full w-full"
                    aria-hidden="true"
                >
                    <div className="anim-element coin-item absolute top-12 text-yellow-400 drop-shadow-xl">
                        <CurrencyDollarIcon
                            size={56}
                            weight="fill"
                        />
                    </div>
                    <div className="w-28 h-16 bg-primary border border-background/70 rounded-b-3xl mt-24 flex items-end justify-center pb-3 backdrop-blur-sm">
                        <div className="w-16 h-1.5 bg-background/70 rounded-full" />
                    </div>
                </div>
            );
        case "whatsapp":
            return (
                <div
                    className="relative flex flex-col items-center justify-center gap-4 h-full w-full px-10"
                    aria-hidden="true"
                >
                    <div className="anim-element chat-bubble self-start bg-primary px-5 py-3 rounded-2xl rounded-bl-sm border border-background/70 text-background/90 text-sm backdrop-blur-sm">
                        ¿Tienen la talla M?
                    </div>
                    <div className="anim-element chat-bubble self-end bg-background px-5 py-3 rounded-2xl rounded-br-sm text-primary text-sm font-semibold shadow-lg">
                        ¡Sí! Te aparto una
                    </div>
                </div>
            );
        case "metrics":
            return (
                <div
                    className="relative flex items-end justify-center gap-4 h-full w-full pb-0 md:pb-12"
                    aria-hidden="true"
                >
                    <div className="anim-element chart-bar w-8 md:w-10 h-16 bg-background/30 rounded-t-lg" />
                    <div className="anim-element chart-bar w-8 md:w-10 h-28 bg-background/60 rounded-t-lg" />
                    <div className="anim-element chart-bar w-8 md:w-10 h-36 md:h-40 bg-background rounded-t-lg shadow-xl" />
                </div>
            );
        default: return null;
    }
}