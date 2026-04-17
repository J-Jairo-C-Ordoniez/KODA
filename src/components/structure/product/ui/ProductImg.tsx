import Image from "next/image";

export default function ProductImg({ variant }) {
    return (
        <div className="aspect-4/6 relative bg-foreground overflow-hidden flex items-center justify-center">
            {variant.image ? (
                <Image
                    src={variant.image}
                    alt={variant.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    width={1080}
                    height={1080}
                    loading="eager"
                />
            ) : (
                <div className="w-3/4 h-[60%] bg-secondary rounded-md shadow-sm opacity-50" />
            )}
        </div>
    );
}
