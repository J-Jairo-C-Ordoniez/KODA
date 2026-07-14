import { Share2, Copy, Check } from 'lucide-react';
import Modal from '../categories/ui/Modal';
import { useState } from 'react';

interface ShareStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenantSlug?: string;
}

export function ShareStoreModal({ isOpen, onClose, tenantSlug }: ShareStoreModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `${window.location.origin}/${tenantSlug || ''}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compartir mi tienda">
      <div className="space-y-6 px-1 py-2">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 bg-contrast/10 rounded-2xl flex items-center justify-center text-contrast">
            <Share2 size={24} aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-black text-primary">Difunde tu tienda</h3>
            <p className="text-xs text-foreground-muted mt-1">
              Cualquier persona con este enlace puede ver tus productos.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="catalog-url" className="text-sm font-medium text-foreground/80 tracking-tight">
            Enlace de tu catálogo
          </label>
          <input
            id="catalog-url"
            readOnly
            className="w-full px-4 py-3.5 rounded-2xl border border-white/10 bg-background font-medium text-contrast text-sm outline-none"
            value={`${typeof window !== 'undefined' ? window.location.origin : ''}/${tenantSlug || ''}`}
            aria-label="URL del catálogo"
          />
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
              copied ? 'bg-success text-white' : 'bg-contrast text-white hover:bg-contrast-hover'
            }`}
            aria-label={copied ? 'Enlace copiado' : 'Copiar enlace del catálogo'}
          >
            {copied ? <><Check size={18} aria-hidden="true" /> ¡Copiado!</> : <><Copy size={18} aria-hidden="true" /> Copiar enlace</>}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 text-foreground/60 text-sm font-medium hover:text-primary transition-colors"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}
