"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

import SlideInventory from '@/features/landing/components/Main/ui/SlideInventory';
import SlideCatalog from '@/features/landing/components/Main/ui/SlideCatalog';
import SlideSale from '@/features/landing/components/Main/ui/SlideSale';
import SlideCredit from '@/features/landing/components/Main/ui/SlideCredit';

const SLIDES = [
    { id: 'inventory', label: 'Inventario', Component: SlideInventory },
    { id: 'catalog', label: 'Catálogo', Component: SlideCatalog },
    { id: 'sale', label: 'Ventas', Component: SlideSale },
    { id: 'credit', label: 'Fiados', Component: SlideCredit },
] as const;

const SLIDE_DURATION = 9500;

export default function HeroVisualPanel() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = useCallback((i: number) => setActive(i), []);
    const next = useCallback(() => setActive(a => (a + 1) % SLIDES.length), []);
    const prev = useCallback(() => setActive(a => (a - 1 + SLIDES.length) % SLIDES.length), []);

    useEffect(() => {
        if (paused) return;
        timerRef.current = setInterval(next, SLIDE_DURATION);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [paused, next, active]);

    const Active = SLIDES[active].Component;

    return (
        <aside
            className="bg-primary relative flex h-full w-full overflow-hidden"
            aria-label="Demos visuales interactivos de KODA"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="flex-1 flex items-center justify-center p-8 overflow-hidden border-l border-foreground-muted/20">
                <Active />
            </div>

            <nav
                className="relative z-10 flex flex-col items-center justify-center gap-4 px-4 py-8 border-l border-foreground-muted/10"
                aria-label="Navegación de demos"
            >
                <button
                    onClick={prev}
                    aria-label="Demo anterior"
                    className="w-8 h-8 rounded-full border border-foreground-muted/10 bg-foreground-muted/5 flex items-center justify-center text-foreground-muted/80 hover:text-foreground-muted hover:border-foreground-muted/20 hover:bg-foreground-muted/10 transition-all duration-200 cursor-pointer"
                >
                    <ChevronUp
                        size={20}
                        aria-hidden="true"
                    />
                </button>

                <div
                    className="flex flex-col items-center gap-3 my-2"
                    role="tablist"
                    aria-label="Indicadores de demo"
                >
                    {SLIDES.map((s, i) => (
                        <button
                            key={s.id}
                            role="tab"
                            aria-selected={i === active}
                            aria-label={`Ver demo: ${s.label}`}
                            onClick={() => goTo(i)}
                            className={`rounded-full transition-all duration-300 cursor-pointer ${i === active
                                ? 'h-7 w-2 bg-amber-400 shadow-md shadow-amber-400/20'
                                : 'h-2 w-2 bg-foreground-muted/40 hover:bg-foreground-muted/80'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={next}
                    aria-label="Siguiente demo"
                    className="w-8 h-8 rounded-full border border-foreground-muted/10 bg-foreground-muted/5 flex items-center justify-center text-foreground-muted/80 hover:text-foreground-muted hover:border-foreground-muted/20 hover:bg-foreground-muted/10 transition-all duration-200 cursor-pointer"
                >
                    <ChevronDown
                        size={20}
                        aria-hidden="true"
                    />
                </button>
            </nav>
        </aside>
    );
}