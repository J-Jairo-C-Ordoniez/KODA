import { Tag, MoreVertical, Edit3, Trash2 } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface CategoryCardProps {
  cat: any;
  highlightedId: string | null;
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  onEdit: (e: React.MouseEvent, cat: any) => void;
  onDelete: (e: React.MouseEvent, cat: any) => void;
  onClick: (id: string) => void;
}

export function CategoryCard({
  cat,
  highlightedId,
  activeMenuId,
  setActiveMenuId,
  onEdit,
  onDelete,
  onClick
}: CategoryCardProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    if (activeMenuId === cat.categoryId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenuId, cat.categoryId, setActiveMenuId]);

  return (
    <article
      onClick={() => onClick(cat.categoryId)}
      className={`bg-background border rounded-[32px] p-8 flex flex-col gap-6 hover:shadow-2xl hover:shadow-navy/10 hover:border-navy/20 transition-all cursor-pointer group relative ${
        highlightedId === cat.categoryId ? 'border-navy ring-4 ring-navy/10 scale-[1.02]' : 'border-foreground/5'
      }`}
    >
      <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-navy/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
      </div>
      
      <div className={`flex items-start justify-between relative ${activeMenuId === cat.categoryId ? 'z-30' : 'z-10'}`}>
        <div className="w-14 h-14 rounded-[20px] bg-navy/10 flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-all shadow-inner">
          <Tag size={24} className="text-navy group-hover:text-white" />
        </div>

        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === cat.categoryId ? null : cat.categoryId); }}
            className="p-2 rounded-xl hover:bg-foreground/5 text-secondary transition-colors"
          >
            <MoreVertical size={20} />
          </button>

          {activeMenuId === cat.categoryId && (
            <div ref={menuRef} className="absolute right-0 mt-2 w-52 bg-background border border-foreground/10 rounded-[24px] shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
              <button 
                onClick={(e) => onEdit(e, cat)}
                className="w-full px-4 py-4 flex items-center gap-3 text-sm font-black text-primary hover:bg-navy/5 hover:text-navy rounded-2xl transition-all group/item"
              >
                <div className="w-8 h-8 rounded-xl bg-navy/5 flex items-center justify-center group-hover/item:bg-navy group-hover/item:text-white transition-colors">
                  <Edit3 size={16} />
                </div>
                Editar
              </button>
              <button 
                onClick={(e) => onDelete(e, cat)}
                className="w-full px-4 py-4 flex items-center gap-3 text-sm font-black text-red-600 hover:bg-red-50 rounded-2xl transition-all group/item"
              >
                <div className="w-8 h-8 rounded-xl bg-red-100/50 flex items-center justify-center group-hover/item:bg-red-500 group-hover/item:text-white transition-colors">
                  <Trash2 size={16} />
                </div>
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2 relative z-10">
        <p className="font-black text-primary text-xl truncate group-hover:text-navy transition-colors">{cat.name}</p>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${cat._count?.products > 0 ? 'bg-green-500' : 'bg-secondary/30'}`} />
          <p className="text-secondary text-xs font-black uppercase tracking-widest">{cat._count?.products || 0} productos</p>
        </div>
      </div>
      
      {cat.description && (
        <p className="text-secondary text-sm font-medium line-clamp-2 leading-relaxed border-t border-foreground/5 pt-4 relative z-10">
          {cat.description}
        </p>
      )}
    </article>
  );
}
