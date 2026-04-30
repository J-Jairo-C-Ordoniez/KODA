'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    id: string;
    name: string;
}

interface Props {
    title: string;
    options: Option[];
    onSelect: (id: string | null) => void;
    selectedValue: string | null;
    align?: 'left' | 'right';
}

export function FilterDropdown({ title, options, onSelect, selectedValue, align = 'left' }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (id: string) => {
        if (selectedValue === id) {
            onSelect(null);
        } else {
            onSelect(id);
        }
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.id === selectedValue);

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 group text-secondary hover:text-primary transition-colors cursor-pointer text-[10px] font-black uppercase tracking-widest"
            >
                <span className={selectedValue ? 'text-primary' : ''}>
                    {title}{selectedOption ? `: ${selectedOption.name}` : ''}
                </span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen && 'rotate-180'}`} />
            </button>
            
            {isOpen && (
                <article className={`absolute top-full mt-4 w-56 bg-background border border-foreground/10 rounded-[24px] py-3 px-2 z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-200 ${align === 'right' ? 'right-0' : 'left-0'}`}>
                    <div className="flex flex-col">
                        {options && options.length > 0 ? options.map((option: any) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(option.id)}
                                className={`w-full text-left px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-between transition-all ${
                                    selectedValue === option.id 
                                    ? 'bg-navy text-white shadow-lg shadow-navy/20' 
                                    : 'text-secondary hover:bg-foreground/5 hover:text-primary'
                                }`}
                            >
                                {option.name}
                                {selectedValue === option.id && <Check size={12} />}
                            </button>
                        )) : (
                            <p className="text-[10px] font-bold text-secondary text-center py-4 uppercase tracking-widest opacity-50">
                                Sin opciones
                            </p>
                        )}
                    </div>
                </article>
            )}
        </div>
    );
}
