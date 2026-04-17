import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <article className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60 transition-all">
            <div className="bg-foreground rounded-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <header className="flex justify-between items-center p-5 border-b border-primary/10">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-primary/10 text-secondary hover:text-primary transition-all cursor-pointer"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </header>

                <div className="p-5">
                    {children}
                </div>
            </div>
        </article>
    );
}

