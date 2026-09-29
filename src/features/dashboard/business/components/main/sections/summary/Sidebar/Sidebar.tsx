"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export type MenuItem = {
    id: string;
    label: string;
    icon: React.ElementType;
    count?: number | string;
    isActive?: boolean;
    onClick?: () => void;
};

export type MenuSection = {
    id: string;
    title?: string;
    items: MenuItem[];
    action?: {
        label: string;
        onClick: () => void;
    };
};

interface SecondaryMenuProps {
    mainTitle: string;
    sections: MenuSection[];
}

export default function SecondaryMenu({ mainTitle, sections }: SecondaryMenuProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".gsap-menu-item", {
                x: -10,
                opacity: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: "power2.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <aside
            ref={containerRef}
            className="w-full h-full bg-background py-4 px-10 flex flex-col overflow-y-auto"
        >

            <h2 className="min-h-16 flex items-center text-xl tracking-tight leading-tight font-bold px-5 mb-4">
                {mainTitle}
            </h2>

            <nav className="flex flex-col gap-2 w-full pt-4 pb-2">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className="flex flex-col gap-1"
                    >
                        {section.title && (
                            <h3 className="text-sm tracking-tight leading-tight font-medium text-primary/40 uppercase px-5 mb-2">
                                {section.title}
                            </h3>
                        )}

                        <ul className="flex flex-col gap-1">
                            {section.items.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={item.onClick}
                                    className={`gsap-menu-item group flex items-center justify-between w-full rounded-full px-5 py-3.5 cursor-pointer transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent ${item.isActive
                                        ? "text-primary"
                                        : "text-primary/80 hover:bg-primary/10 hover:text-primary"
                                        }`}
                                >
                                    <div className="flex items-center gap-5">
                                        <item.icon
                                            size={28}
                                            weight={item.isActive ? "fill" : "regular"}
                                            className="shrink-0"
                                            aria-hidden="true"
                                        />
                                        <span className={`text-xl tracking-tight leading-tight
                                            ${item.isActive ? "font-bold" : "font-medium"}`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>

                                    {item.count !== undefined && (
                                        <span className="text-sm font-medium text-primary/60">
                                            {item.count}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
