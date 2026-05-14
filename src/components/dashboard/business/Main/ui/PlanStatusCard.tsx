import { CreditCard, CalendarClock } from 'lucide-react';
import { SubscriptionInfo } from '@/hooks/admin/useDashboardStats';

const COP = (n: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0,
  }).format(n);

function daysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

function statusLabel(s: string) {
  return s === 'active' ? 'Activo' : s === 'suspended' ? 'Suspendido' : 'Sin plan';
}

interface PlanStatusCardProps {
  subscription: SubscriptionInfo | null;
}

export function PlanStatusCard({ subscription }: PlanStatusCardProps) {
  const days = subscription?.endDate ? daysUntil(subscription.endDate) : null;
  const daysWarning = days !== null && days <= 10;

  return (
    <article
      className={`ov-side bg-background-elevated border p-5 rounded-3xl flex flex-col gap-3 ${
        daysWarning ? 'border-amber-500/30' : 'border-white/10'
      }`}
      aria-label="Estado del plan"
    >
      <header className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          daysWarning ? 'bg-amber-500/10' : 'bg-contrast/10'
        }`}>
          <CreditCard size={16} className={daysWarning ? 'text-amber-400' : 'text-contrast'} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground/80 tracking-tight">Plan activo</p>
          <p className="text-lg font-bold text-primary truncate">
            {subscription ? subscription.planName : 'Sin plan asignado'}
          </p>
        </div>
      </header>

      {subscription ? (
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-background/50 rounded-xl p-3.5 space-y-1">
            <dt className="text-foreground/80 text-sm font-medium tracking-tight">Estado</dt>
            <dd className={`font-bold text-base ${subscription.status === 'active' ? 'text-success' : 'text-red-400'}`}>
              {statusLabel(subscription.status)}
            </dd>
          </div>
          <div className="bg-background/50 rounded-xl p-3.5 space-y-1">
            <dt className="text-foreground/80 text-sm font-medium tracking-tight">Precio</dt>
            <dd className="font-bold text-base text-primary">
              {COP(subscription.planPrice)}
              <span className="font-normal text-sm text-foreground/60">
                /{subscription.interval === 'monthly' ? 'mes' : subscription.interval === 'yearly' ? 'año' : subscription.interval}
              </span>
            </dd>
          </div>
          {days !== null && (
            <div className={`col-span-2 rounded-xl p-3 flex items-center gap-2 ${
              daysWarning ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-background'
            }`}>
              <CalendarClock size={13} className={daysWarning ? 'text-amber-400' : 'text-foreground-muted'} aria-hidden="true" />
              <span className={`font-bold ${daysWarning ? 'text-amber-400' : 'text-foreground-muted'}`}>
                {daysWarning
                  ? `Vence en ${days} día${days !== 1 ? 's' : ''}`
                  : `${days} días restantes`}
              </span>
            </div>
          )}
        </dl>
      ) : (
        <p className="text-[11px] text-foreground-muted font-medium">
          Contacta al administrador para activar tu plan.
        </p>
      )}
    </article>
  );
}
