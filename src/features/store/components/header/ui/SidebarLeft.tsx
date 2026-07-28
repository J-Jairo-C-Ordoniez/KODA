'use client';

import { Grid, Share2, Globe, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Props {
  slug: string;
}

export default function SidebarLeft({ slug }: Props) {
  return (
    <aside className="hidden lg:flex flex-col justify-between items-center w-16 min-h-screen border-r border-foreground/10 bg-background/80 py-6 sticky top-0 shrink-0 select-none z-30">
      {/* Top Menu Icon */}
      <Link href={`/${slug}`} className="p-2 text-primary hover:text-contrast transition-colors" title="Menú">
        <Grid size={20} strokeWidth={2} />
      </Link>

      {/* Middle Vertical Nav Links */}
      <div className="flex flex-col items-center gap-12 my-auto py-8">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground-muted/60 [writing-mode:vertical-lr] rotate-180 hover:text-primary transition-colors cursor-pointer">
          Colección
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground-muted/60 [writing-mode:vertical-lr] rotate-180 hover:text-primary transition-colors cursor-pointer">
          Historias
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground-muted/60 [writing-mode:vertical-lr] rotate-180 hover:text-primary transition-colors cursor-pointer">
          Envíos
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground-muted/60 [writing-mode:vertical-lr] rotate-180 hover:text-primary transition-colors cursor-pointer">
          Contacto
        </span>
      </div>

      {/* Bottom Accent Icon Box */}
      <div className="bg-contrast text-white w-10 flex flex-col items-center gap-3 py-3 rounded-lg shadow-lg shadow-contrast/20">
        <Share2 size={14} className="hover:scale-110 transition-transform cursor-pointer" />
        <Globe size={14} className="hover:scale-110 transition-transform cursor-pointer" />
        <MessageCircle size={14} className="hover:scale-110 transition-transform cursor-pointer" />
        <Sparkles size={14} className="hover:scale-110 transition-transform cursor-pointer" />
      </div>
    </aside>
  );
}
