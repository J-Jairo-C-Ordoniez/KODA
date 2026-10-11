'use client';

import { useState, useRef } from 'react';
import { SidebarSimpleIcon } from '@phosphor-icons/react';
import useToast from '@/shared/hooks/useToast';
import Toaster from '@/shared/components/Toaster';

import Sidebar from '@/features/dashboard/business/components/main/sections/products/Sidebar/Sidebar';
import ProductsMain from '@/features/dashboard/business/components/main/sections/products/Main/Main';

export default function Products() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { toasts, showToast, removeToast } = useToast();

    // Soporte para gesto táctil (swipe desde la derecha para abrir/cerrar)
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;
        const diffX = touchStartX.current - e.changedTouches[0].clientX;
        const diffY = Math.abs(touchStartY.current - e.changedTouches[0].clientY);

        if (diffY < 60) {
            if (diffX > 50 && !isSidebarOpen) {
                setIsSidebarOpen(true);
            } else if (diffX < -50 && isSidebarOpen) {
                setIsSidebarOpen(false);
            }
        }
        touchStartX.current = null;
        touchStartY.current = null;
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex w-full bg-background relative min-h-screen"
        >
            <Toaster
                toasts={toasts}
                removeToast={removeToast}
            />

            {/* Contenido Principal (Central) */}
            <div className="flex-1 min-w-0 px-[8vw] py-8 pt-20 md:pt-8 custom-scrollbar relative">
                <ProductsMain showToast={showToast} isSidebarOpen={isSidebarOpen} />
            </div>

            {/* Botón de toggle (Derecha) */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed top-6 right-4 lg:right-6 z-110 p-2 text-primary hover:bg-primary/5 rounded-xl border border-transparent hover:border-primary/10 hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer bg-background md:bg-transparent shadow-sm md:shadow-none"
                title={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
                aria-label="Alternar menú lateral"
            >
                <SidebarSimpleIcon size={24} weight="regular" className={isSidebarOpen ? "rotate-180" : ""} />
            </button>

            {/* Overlay para móvil */}
            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Secundario (Derecha) */}
            <div
                className={`shrink-0 transition-all duration-300 border-l border-primary/10 bg-background 
                    fixed inset-y-0 right-0 z-50 w-65
                    ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                    md:sticky md:top-0 md:h-screen md:translate-x-0
                    ${isSidebarOpen ? 'md:w-80 md:opacity-100' : 'md:w-0 md:opacity-0 md:overflow-hidden md:border-l-0'}
                `}
            >
                <Sidebar onCloseMobile={() => setIsSidebarOpen(false)} />
            </div>
        </div>
    );
}
