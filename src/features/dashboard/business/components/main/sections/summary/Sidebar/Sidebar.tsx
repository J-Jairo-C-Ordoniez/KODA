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
            className="w-full h-full bg-background p-4 pt-20 flex flex-col gap-6 overflow-y-auto"
        >

            <h2 className="text-lg font-medium text-primary px-2 mt-2 tracking-tight">
                {mainTitle}
            </h2>

            <nav className="flex flex-col gap-8">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className="flex flex-col gap-1"
                    >
                        {section.title && (
                            <h3 className="text-xs font-semibold text-primary/40 uppercase tracking-wider px-2 mb-2">
                                {section.title}
                            </h3>
                        )}

                        <ul className="flex flex-col gap-1">
                            {section.items.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={item.onClick}
                                    className={`gsap-menu-item group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${item.isActive
                                        ? "bg-foreground-muted/40 text-primary"
                                        : "text-primary/60 hover:bg-foreground-muted/40 hover:text-primary"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={18} />

                                        <span className="text-sm">
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