'use client';

import { useState, useEffect, useCallback } from 'react';
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

  return { toasts, showToast, removeToast: (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)) };
}

// Global context version if needed, but for now we can use it locally or pass it.
// To make it easy, let's create a component that renders the toasts.

export function Toaster({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: string) => void }) {
  return (
    <div className="fixed top-8 right-8 z-[200] flex flex-col gap-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            pointer-events-auto flex items-start gap-4 p-5 rounded-[24px] shadow-2xl border min-w-[320px] max-w-[400px]
            animate-in slide-in-from-right-10 duration-500
            ${toast.type === 'success' ? 'bg-white border-green-100' : 
              toast.type === 'error' ? 'bg-white border-red-100' : 
              toast.type === 'warning' ? 'bg-white border-amber-100' : 'bg-white border-blue-100'}
          `}
        >
          <div className={`
            w-10 h-10 rounded-2xl flex items-center justify-center shrink-0
            ${toast.type === 'success' ? 'bg-green-50 text-green-600' : 
              toast.type === 'error' ? 'bg-red-50 text-red-600' : 
              toast.type === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}
          `}>
            {toast.type === 'success' && <CheckCircle2 size={20} />}
            {toast.type === 'error' && <AlertCircle size={20} />}
            {toast.type === 'warning' && <AlertTriangle size={20} />}
            {toast.type === 'info' && <Info size={20} />}
          </div>

          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-black text-primary leading-tight">{toast.message}</h4>
            {toast.description && <p className="text-xs font-medium text-secondary leading-relaxed">{toast.description}</p>}
          </div>

          <button 
            onClick={() => removeToast(toast.id)}
            className="p-1 hover:bg-foreground/5 rounded-lg text-secondary transition-colors"
          >
            <X size={16} />
          </button>

          {/* Progress bar */}
          <div className={`
            absolute bottom-0 left-0 h-1 rounded-full animate-toast-progress
            ${toast.type === 'success' ? 'bg-green-500' : 
              toast.type === 'error' ? 'bg-red-500' : 
              toast.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}
          `} />
        </div>
      ))}
    </div>
  );
}
