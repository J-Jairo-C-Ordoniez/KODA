'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
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
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
}

const config = {
  success: {
    icon: CheckCircle2,
    iconClass: 'bg-emerald-50 text-emerald-600 border border-emerald-200/80',
    bar: 'bg-emerald-500',
  },
  error: {
    icon: AlertCircle,
    iconClass: 'bg-red-50 text-red-600 border border-red-200/80',
    bar: 'bg-red-500',
  },
  warning: {
    icon: AlertTriangle,
    iconClass: 'bg-amber-50 text-amber-600 border border-amber-200/80',
    bar: 'bg-amber-500',
  },
  info: {
    icon: Info,
    iconClass: 'bg-blue-50 text-blue-600 border border-blue-200/80',
    bar: 'bg-blue-500',
  },
};

// Individual toast item with animated enter/exit
function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { icon: Icon, iconClass, bar } = config[toast.type] || config.info;

  // Trigger enter animation on mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const dismiss = useCallback(() => {
    if (isLeaving) return;
    setIsLeaving(true);
    timerRef.current = setTimeout(() => onRemove(toast.id), 350);
  }, [isLeaving, onRemove, toast.id]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      style={{
        transition: 'opacity 350ms ease, transform 350ms cubic-bezier(0.4, 0, 0.2, 1), max-height 350ms ease',
        opacity: isVisible && !isLeaving ? 1 : 0,
        transform: isVisible && !isLeaving ? 'translateY(0) scale(1)' : 'translateY(-12px) scale(0.96)',
        maxHeight: isLeaving ? '0px' : '200px',
        overflow: 'hidden',
        marginBottom: isLeaving ? '0px' : undefined,
      }}
      className="pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl bg-background-card border border-primary/10 shadow-xl backdrop-blur-md relative"
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${iconClass}`}>
        <Icon size={18} />
      </div>

      <div className="flex-1 min-w-0 pr-2">
        <h4 className="text-sm font-bold text-primary leading-snug">{toast.message}</h4>
        {toast.description && (
          <p className="text-xs font-semibold text-primary/75 leading-relaxed mt-1 break-words">
            {toast.description}
          </p>
        )}
      </div>

      <button
        onClick={dismiss}
        className="p-1 text-primary/40 hover:text-primary hover:bg-foreground-muted/50 rounded-lg transition-colors shrink-0 cursor-pointer mt-0.5"
        aria-label="Cerrar notificación"
      >
        <X size={16} />
      </button>

      {/* Bottom accent bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${bar} opacity-80 rounded-b-2xl`} />
    </div>
  );
}

export function Toaster({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[99999] flex flex-col gap-2.5 pointer-events-none w-full max-w-md px-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}
