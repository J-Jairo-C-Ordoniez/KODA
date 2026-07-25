'use client';

import { useCallback, useEffect, useRef } from 'react';
import { ToastType } from '@/shared/hooks/useToast';
export { default as useToast } from '@/shared/hooks/useToast';
import { CheckCircle2, AlertCircle, X, Info, AlertTriangle } from 'lucide-react';
import gsap from 'gsap';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
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

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const toastRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { icon: Icon, iconClass, bar } = config[toast.type] || config.info;

  const TOAST_DURATION = 4.5;

  const dismiss = useCallback(() => {
    const el = toastRef.current;
    if (!el) return;

    gsap.to(el, {
      opacity: 0,
      y: -15,
      scale: 0.95,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      borderWidth: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => onRemove(toast.id),
    });
  }, [onRemove, toast.id]);

  useEffect(() => {
    const el = toastRef.current;
    const barEl = barRef.current;
    if (!el || !barEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        el,
        {
          opacity: 0,
          y: -15,
          scale: 0.95,
          height: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          height: 'auto',
          marginBottom: 10,
          paddingTop: 16,
          paddingBottom: 16,
          duration: 0.45,
          ease: 'back.out(1.2)',
          clearProps: 'paddingTop,paddingBottom',
        }
      );

      tl.fromTo(
        barEl,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: TOAST_DURATION,
          ease: 'none',
          transformOrigin: 'left',
          onComplete: dismiss,
        },
        '-=0.1'
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [dismiss]);

  return (
    <div
      ref={toastRef}
      className="pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl bg-background-card border border-primary/10 shadow-xl backdrop-blur-md relative overflow-hidden"
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${iconClass}`}>
        <Icon size={18} />
      </div>

      <div className="flex-1 min-w-0 pr-2">
        <h4 className="text-sm font-bold text-primary leading-snug">{toast.message}</h4>
        {toast.description && (
          <p className="text-xs font-semibold text-primary/75 leading-relaxed mt-1 wrap-break-words">
            {toast.description}
          </p>
        )}
      </div>

      <button
        onClick={dismiss}
        className="p-1 text-primary/40 hover:text-primary hover:bg-foreground-muted/50 rounded-lg transition-colors shrink-0 cursor-pointer mt-0.5 relative z-10"
        aria-label="Cerrar notificación"
      >
        <X size={16} />
      </button>

      <div
        ref={barRef}
        className={`absolute bottom-0 left-0 w-full h-1 origin-left ${bar} opacity-80 rounded-b-2xl`}
      />
    </div>
  );
}

export default function Toaster({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col pointer-events-none w-full max-w-md px-4">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
}

export { Toaster };
