'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function FilterDropdown({ title, options, setOptions, align = 'left' }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCheckboxChange = (id) => {
        const newOptions = options.map(opt => 
            (opt.categoryId || opt.id) === id ? { ...opt, checked: !opt.checked } : opt
        );
        setOptions(newOptions);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={toggleDropdown}
                className="flex items-center gap-2 group text-secondary hover:text-primary transition-colors cursor-pointer text-xs font-semibold tracking-wider"
            >
                {title}
                <ChevronDown className={`w-4 h-4 text-secondary group-hover:text-primary transition-transform duration-200 ${isOpen && 'rotate-180'}`} />
            </button>
            
            {isOpen && (
                <div className={`absolute top-full mt-4 w-44 bg-foreground rounded-md py-4 px-5 z-50 ${align === 'right' ? 'right-0' : 'left-0'}`}>
                    <div className="flex flex-col gap-3">
                        {options && options.length > 0 ? options.map((option) => (
                            <label key={option.categoryId || option.id} className="flex items-center gap-3 cursor-pointer group select-none">
                                <div className={`w-[14px] h-[14px] border rounded-[3px] flex items-center justify-center bg-transparent transition-colors ${option.checked ? 'border-primary' : 'border-secondary'}`}>
                                    {option.checked && (
                                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={option.checked}
                                    onChange={() => handleCheckboxChange(option.categoryId || option.id)}
                                />
                                <span className={`text-xs tracking-wide ${option.checked ? 'text-primary font-bold' : 'text-secondary font-medium'} group-hover:text-primary transition-colors`}>
                                    {option.name}
                                </span>
                            </label>
                        )) : (
                            <p className="text-xs tracking-wide text-secondary font-medium text-center">
                                No hay opciones disponibles
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
