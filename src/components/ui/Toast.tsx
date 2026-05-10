'use client';

import { useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, X, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, message: string, description?: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return { toasts, showToast, removeToast };
}

const config = {
  success: {
    icon: CheckCircle2,
    iconClass: 'bg-success/10 border border-success/20 text-success',
    bar: 'bg-success',
  },
  error: {
    icon: AlertCircle,
    iconClass: 'bg-red-500/10 border border-red-500/20 text-red-400',
    bar: 'bg-red-500',
  },
  warning: {
    icon: AlertTriangle,
    iconClass: 'bg-amber-500/10 border border-amber-500/20 text-amber-400',
    bar: 'bg-amber-500',
  },
  info: {
    icon: Info,
    iconClass: 'bg-blue-500/10 border border-blue-500/20 text-blue-400',
    bar: 'bg-blue-500',
  },
};

export function Toaster({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: string) => void }) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-200 flex flex-col gap-3 pointer-events-none w-full max-w-sm px-4">
      {toasts.map((toast) => {
        const { icon: Icon, iconClass, bar } = config[toast.type];
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 p-4 rounded-2xl shadow-2xl shadow-black/40 border border-foreground/10 bg-background-elevated relative overflow-hidden animate-in slide-in-from-top-8 duration-300"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconClass}`}>
              <Icon size={18} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-primary leading-tight">{toast.message}</p>
              {toast.description && (
                <p className="text-xs font-medium text-foreground-muted leading-relaxed mt-0.5 truncate">{toast.description}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1.5 hover:bg-foreground/8 rounded-lg text-foreground-muted hover:text-primary transition-colors shrink-0"
            >
              <X size={15} />
            </button>

            {/* Progress bar */}
            <div className={`absolute bottom-0 left-0 h-0.5 animate-toast-progress ${bar}`} />
          </div>
        );
      })}
    </div>
  );
}
