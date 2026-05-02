"use client";

import Image from "next/image";
import { Package } from "lucide-react";

export default function ProductImg({ variant }: { variant: any }) {
    const mainImage = variant?.images?.[0]?.content || null;

    return (
        <div className="aspect-square relative bg-[#F4F4F4] rounded-[40px] overflow-hidden flex items-center justify-center border border-foreground/5 transition-all duration-500 shadow-sm">
            {mainImage ? (
                <Image
                    src={mainImage}
                    alt={variant.name || "Producto"}
                    className="w-full h-full object-contain p-10 mix-blend-multiply transition-all duration-700 ease-out"
                    width={1080}
                    height={1080}
                    loading="eager"
                    priority
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-secondary/20">
                    <Package size={80} strokeWidth={1} />
                    <p className="text-[10px] font-black uppercase tracking-widest">Sin imagen disponible</p>
                </div>
            )}
        </div>
    );
}
