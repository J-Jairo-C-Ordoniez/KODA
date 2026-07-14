import { Tag, MoreVertical, Edit3, Trash2, ArrowRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface CategoryCardProps {
  cat: any;
  highlightedId: string | null;
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  onEdit: (e: React.MouseEvent, cat: any) => void;
  onDelete: (e: React.MouseEvent, cat: any) => void;
  onClick: (id: string) => void;
  className?: string;
}

export function CategoryCard({
  cat,
  highlightedId,
  activeMenuId,
  setActiveMenuId,
  onEdit,
  onDelete,
  onClick,
  className,
}: CategoryCardProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const isHighlighted = highlightedId === cat.categoryId;
  const isMenuOpen = activeMenuId === cat.categoryId;
  const hasProducts = (cat._count?.products ?? 0) > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, setActiveMenuId]);

  return (
    <article
      onClick={() => onClick(cat.categoryId)}
      aria-label={`Categoría ${cat.name}, ${cat._count?.products ?? 0} productos`}
      className={`
        bg-background-elevated border rounded-[28px] p-6 flex flex-col gap-5
        hover:border-contrast/30 hover:shadow-xl hover:shadow-contrast/5
        transition-all duration-300 cursor-pointer group relative overflow-hidden
        ${isHighlighted ? 'border-contrast ring-2 ring-contrast/15 scale-[1.01]' : 'border-foreground/8'}
        ${className || ''}
      `}
    >
      {/* Ambient glow on hover */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 bg-contrast/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top row: icon + menu */}
      <div className={`flex items-start justify-between ${isMenuOpen ? 'relative z-30' : 'relative z-10'}`}>
        {/* Icon badge */}
        <div className="w-12 h-12 rounded-2xl bg-contrast/10 border border-contrast/20 flex items-center justify-center group-hover:bg-contrast/20 transition-colors duration-300">
          <Tag size={22} className="text-contrast" aria-hidden="true" />
        </div>

        {/* Actions menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenuId(isMenuOpen ? null : cat.categoryId);
            }}
            aria-label="Opciones de categoría"
            aria-expanded={isMenuOpen}
            className="p-2 rounded-xl hover:bg-foreground/8 text-foreground-muted hover:text-primary transition-colors"
          >
            <MoreVertical size={18} aria-hidden="true" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-background-elevated border border-foreground/10 rounded-2xl shadow-2xl shadow-black/40 z-50 p-1.5 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={(e) => onEdit(e, cat)}
                className="w-full px-4 py-3.5 flex items-center gap-3 text-sm font-bold text-primary hover:bg-foreground/5 rounded-xl transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-foreground/5 flex items-center justify-center" aria-hidden="true">
                  <Edit3 size={14} />
                </div>
                Editar
              </button>
              <button
                onClick={(e) => onDelete(e, cat)}
                className="w-full px-4 py-3.5 flex items-center gap-3 text-sm font-bold text-red-400 hover:bg-red-500/8 rounded-xl transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center" aria-hidden="true">
                  <Trash2 size={14} />
                </div>
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2 relative z-10">
        <h3 className="font-black text-primary text-lg leading-tight tracking-tight group-hover:text-contrast transition-colors duration-300 truncate">
          {cat.name}
        </h3>

        {/* Product count badge */}
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${hasProducts ? 'bg-[#00C896]' : 'bg-foreground/20'}`}
            aria-hidden="true"
          />
          <p className={`text-xs font-bold uppercase tracking-widest ${hasProducts ? 'text-[#00C896]' : 'text-foreground-muted'}`}>
            {cat._count?.products ?? 0} {cat._count?.products === 1 ? 'producto' : 'productos'}
          </p>
        </div>
      </div>

      {/* Description */}
      {cat.description && (
        <p className="text-foreground-muted text-sm font-medium line-clamp-2 leading-relaxed border-t border-foreground/5 pt-4 relative z-10">
          {cat.description}
        </p>
      )}

      {/* Footer CTA */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-foreground-muted group-hover:text-contrast transition-colors duration-300 relative z-10">
        <span>Ver productos</span>
        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
      </div>
    </article>
  );
}
