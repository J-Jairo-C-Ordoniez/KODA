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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy/20 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={`bg-background rounded-[40px] p-8 w-full ${sizeClasses[size]} shadow-2xl shadow-navy/20 border border-white/20 relative overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl hover:bg-foreground/5 text-secondary transition-colors z-20"
        >
          <X size={20} />
        </button>

        <div className="space-y-6 relative z-10 flex flex-col h-full">
          {/* Header Section (Icons + Title) */}
          <div className="flex items-center gap-5">
            {icon && (
              <div className="w-14 h-14 rounded-2xl bg-navy/10 flex items-center justify-center shrink-0">
                {icon}
              </div>
            )}
            <div className="space-y-0.5">
              <h3 className="text-2xl font-black text-primary tracking-tight leading-none">
                {title}
              </h3>
              {description && (
                <p className="text-secondary font-medium text-xs">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Content Area - Scrollable internally */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
