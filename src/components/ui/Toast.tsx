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

export function Toaster({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: string) => void }) {
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-200 flex flex-col gap-4 pointer-events-none w-full max-w-[450px] px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            pointer-events-auto flex items-center gap-4 p-4 pl-5 rounded-[28px] shadow-2xl border bg-white relative overflow-hidden
            animate-in slide-in-from-top-10 duration-500
            ${toast.type === 'success' ? 'border-green-100' : 
              toast.type === 'error' ? 'border-red-100' : 
              toast.type === 'warning' ? 'border-amber-100' : 'border-blue-100'}
          `}
        >
          <div className={`
            w-11 h-11 rounded-2xl flex items-center justify-center shrink-0
            ${toast.type === 'success' ? 'bg-green-50 text-green-600' : 
              toast.type === 'error' ? 'bg-red-50 text-red-600' : 
              toast.type === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}
          `}>
            {toast.type === 'success' && <CheckCircle2 size={22} />}
            {toast.type === 'error' && <AlertCircle size={22} />}
            {toast.type === 'warning' && <AlertTriangle size={22} />}
            {toast.type === 'info' && <Info size={22} />}
          </div>

          <div className="flex-1 pr-4">
            <h4 className="text-[15px] font-black text-primary tracking-tight leading-tight">{toast.message}</h4>
            {toast.description && <p className="text-[13px] font-medium text-secondary leading-relaxed mt-0.5">{toast.description}</p>}
          </div>

          <button 
            onClick={() => removeToast(toast.id)}
            className="p-2 hover:bg-foreground/5 rounded-xl text-secondary/40 hover:text-secondary transition-colors shrink-0"
          >
            <X size={20} />
          </button>

          {/* Progress bar */}
          <div className={`
            absolute bottom-0 left-0 h-1.5 animate-toast-progress
            ${toast.type === 'success' ? 'bg-green-500' : 
              toast.type === 'error' ? 'bg-red-500' : 
              toast.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}
          `} />
        </div>
      ))}
    </div>
  );
}
