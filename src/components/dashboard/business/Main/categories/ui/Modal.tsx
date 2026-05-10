import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
  size?: 'md' | 'lg' | 'xl' | '2xl';
}

export default function Modal({ isOpen, onClose, title, children, icon, description, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={`bg-background-elevated rounded-[32px] p-6 sm:p-8 w-full mx-4 ${sizeClasses[size]} shadow-2xl shadow-black/50 border border-foreground/8 relative animate-in zoom-in-95 duration-300 flex flex-col`} style={{ maxHeight: 'calc(100dvh - 40px)' }}>
        {/* Orange accent glow top */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-contrast/8 rounded-full blur-3xl pointer-events-none" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-xl hover:bg-foreground/8 text-foreground-muted hover:text-primary transition-all z-20 active:scale-90"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="space-y-5 relative z-10 flex flex-col h-full">
          {/* Header Section (Icons + Title) */}
          <div className="flex items-center gap-4">
            {icon && (
              <div className="w-12 h-12 rounded-2xl bg-contrast/10 border border-contrast/20 flex items-center justify-center shrink-0">
                {icon}
              </div>
            )}
            <div className="space-y-0.5">
              <h3 className="text-xl sm:text-2xl font-black text-primary tracking-tight leading-none">
                {title}
              </h3>
              {description && (
                <p className="text-foreground-muted font-medium text-xs leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Content Area - Scrollable internally */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 -mr-1 overscroll-contain">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
