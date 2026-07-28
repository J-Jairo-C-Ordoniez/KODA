'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface Props {
  title: string;
  options: Option[];
  selectedValue: string;
  onSelect: (val: string) => void;
}

export default function FilterDropdown({ title, options, selectedValue, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg border text-gray-500 text-sm transition-all cursor-pointer
          ${selectedValue
            ? 'border-primary/10 text-primary bg-background'
            : 'border-primary/10 text-primary-muted hover:text-primary hover:border-primary/20'
          }
        `}
      >
        <span>
          {selectedOption ? selectedOption.label : title}
        </span>
        <ChevronDown
          size={24}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 px-4 py-5 rounded-lg border border-primary/10 bg-background z-40 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto space-y-1">
            <button
              onClick={() => {
                onSelect('');
                setIsOpen(false);
              }}
              className={`
                    w-full flex items-center justify-between text-sm transition-colors px-2 py-1 cursor-pointer rounded-lg
                    ${selectedValue ? 'bg-contrast/10 text-contrast' : 'text-primary/60 hover:bg-foreground/5'}
                  `}
            >
              <span>Todas ({title})</span>
              {!selectedValue && <Check size={24} />}
            </button>

            {options.map((opt) => {
              const isSelected = opt.value === selectedValue;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    onSelect(opt.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between text-sm transition-colors px-2 py-1 cursor-pointer rounded-lg
                    ${isSelected ? 'bg-contrast/10 text-contrast' : 'text-primary/60 hover:bg-foreground/5'}
                  `}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check size={24} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
