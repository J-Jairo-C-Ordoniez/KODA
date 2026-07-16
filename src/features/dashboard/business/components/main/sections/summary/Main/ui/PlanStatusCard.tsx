import { CreditCard, CalendarClock } from 'lucide-react';
import { SubscriptionInfo } from '@/features/dashboard/business/hooks/useDashboardStats';
import { formatCurrency } from '@/lib/formatters';

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
      className={`ov-side bg-[#181818] border p-5 rounded-2xl flex flex-col gap-3 ${daysWarning ? 'border-warning/30' : 'border-[#262626]'
        }`}
      aria-label="Estado del plan"
    >
      <header className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${daysWarning ? 'bg-warning/10' : 'bg-accent/10'
          }`}>
          <CreditCard size={16} className={daysWarning ? 'text-warning' : 'text-accent'} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-foreground-muted tracking-wider uppercase">Plan activo</p>
          <p className="text-base font-bold text-foreground truncate">
            {subscription ? subscription.planName : 'Sin plan asignado'}
          </p>
        </div>
      </header>

      {subscription ? (
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-[#111111]/80 border border-[#262626]/50 rounded-xl p-3.5 space-y-1">
            <dt className="text-foreground-muted text-[10px] font-bold tracking-[0.05em] uppercase">Estado</dt>
            <dd className={`font-bold text-sm ${subscription.status === 'active' ? 'text-success' : 'text-accent-red'}`}>
              {statusLabel(subscription.status)}
            </dd>
          </div>
          <div className="bg-[#111111]/80 border border-[#262626]/50 rounded-xl p-3.5 space-y-1">
            <dt className="text-foreground-muted text-[10px] font-bold tracking-[0.05em] uppercase">Precio</dt>
            <dd className="font-bold text-sm text-foreground">
              {formatCurrency(subscription.planPrice)}
              <span className="font-normal text-xs text-foreground-muted">
                /{subscription.interval === 'monthly' ? 'mes' : subscription.interval === 'yearly' ? 'año' : subscription.interval}
              </span>
            </dd>
          </div>
          {days !== null && (
            <div className={`col-span-2 rounded-xl p-3 flex items-center gap-2 ${daysWarning ? 'bg-warning/10 border border-warning/20' : 'bg-[#111111]'
              }`}>
              <CalendarClock size={13} className={daysWarning ? 'text-warning' : 'text-foreground-muted'} aria-hidden="true" />
              <span className={`text-xs font-bold ${daysWarning ? 'text-warning' : 'text-foreground-muted'}`}>
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
